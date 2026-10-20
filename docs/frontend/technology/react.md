# React 로컬 적용 기준

> 마지막 공식 확인: 2026-08-12  
> 스냅샷 기준: React 19.2 · npm latest 관찰 `19.2.8`  
> 일반 작업: 이 문서와 [React 상세 지식 팩](./react/README.md)을 사용하며 최신성 확인을 위한 인터넷 검색 금지

## 이 문서의 사용법

먼저 `package.json`과 lockfile의 실제 React, `react-dom`, type package, framework version을 확인한다.
이 문서의 19.2 기준은 최신 관찰 스냅샷이지 현재 프로젝트의 채택 선언이 아니다. 설치 버전에 없는 API는
사용하지 않으며 업그레이드는 별도 요청으로 처리한다.

이 파일은 버전 변화와 Aifrica 적용 결정을 빠르게 찾는 상위 guide다. Hook·DOM·SSR·RSC·Compiler·test의
상세 signature와 조합은 [React 19.2 상세 지식 팩](./react/README.md)에서 작업 종류에 맞는 파일을 선택해
읽는다. 상위 guide만 읽고 React API 조사를 끝내지 않는다.

## 최신 지식 주입: React 19·19.2

AI는 React 19 이상이 실제 설치된 작업에서 아래 API를 후보로 알고 있어야 한다. 단, “새 API”라는
이유만으로 사용하지 말고 문제와 API의 수명·경계가 일치할 때 선택한다.

| API | 도입 기준 | 해결하는 문제 | 사용하지 않을 때 |
| --- | --- | --- | --- |
| `use(resource)` | React 19 | Promise 또는 Context 값을 render에서 읽고 Suspense와 연결 | Effect fetch의 일반 대체가 필요 없을 때 |
| `useActionState` | React 19 | 비동기 Action의 결과 state, queue, pending 관리 | 독립 요청을 병렬 실행해야 하거나 단순 local reducer일 때 |
| `useOptimistic` | React 19 | Action 진행 중 즉시 보이는 낙관 상태 | rollback/authoritative result 정책이 없을 때 |
| `useFormStatus` | React DOM 19 | 부모 form 제출의 pending/data/method/action 구독 | form 바깥 또는 같은 component가 만든 form을 추적할 때 |
| `useEffectEvent` | React 19.2 | Effect의 연결 조건과 최신 값을 읽는 비반응 로직 분리 | dependency를 숨기려는 목적일 때 |
| `<Activity>` | React 19.2 | UI와 내부 state를 보존하며 숨기고 Effect는 정리 | 완전한 unmount/reset이 필요한 UI |
| `cache` | RSC, React 19 | 한 server render/request 안의 중복 계산·읽기 공유 | Client Component 또는 영구 application cache |
| `cacheSignal` | RSC, React 19.2 | server render/cache 수명이 끝난 비동기 작업 취소 | client 요청 취소 또는 render 밖의 작업 |
| Actions/Transition | React 19 | async update를 non-blocking transition으로 추적 | text input 자체의 controlled update |

### `use(resource)`: Promise·Context 읽기

`use`는 Hook과 달리 component 최상위뿐 아니라 조건문 안에서도 호출할 수 있지만 render 중에만 사용한다.
Promise가 pending이면 가장 가까운 Suspense fallback, reject면 Error Boundary로 제어가 이동한다.

```tsx
import { Suspense, use } from "react";

type User = { id: string; name: string };

function UserName({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <strong>{user.name}</strong>;
}

export function UserSummary({ userPromise }: { userPromise: Promise<User> }) {
  return (
    <Suspense fallback={<span>사용자 로딩 중…</span>}>
      <UserName userPromise={userPromise} />
    </Suspense>
  );
}
```

- Client Component render에서 `fetch()`로 새 Promise를 만들지 않는다. re-render마다 Promise identity가
  달라져 반복 suspend될 수 있다.
- Server Component나 framework cache에서 만든 안정적인 Promise를 client에 전달하는 방식을 우선한다.
- Promise의 내부 `status`/`value`를 직접 읽지 말고 `use(promise)`에 전달한다.
- loading과 error UI는 각각 Suspense와 Error Boundary owner가 책임진다.

Context도 읽을 수 있으므로 조건부 구독이 필요한 경우 사용할 수 있다.

```tsx
function Heading({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  const theme = use(ThemeContext);
  return <h2 data-theme={theme}>설정</h2>;
}
```

일반적인 무조건 Context 구독은 익숙한 `useContext`를 계속 사용해도 된다.

### `useActionState`: 비동기 Action 결과와 pending

Action 함수는 이전 state를 첫 인자로 받고 dispatch payload를 다음 인자로 받는다. dispatch는
`action`/`formAction` prop으로 전달하거나 `startTransition` 안에서 호출해야 pending이 올바르게 추적된다.

```tsx
import { startTransition, useActionState } from "react";

type SaveState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

async function saveName(
  _previous: SaveState,
  name: string,
): Promise<SaveState> {
  try {
    await updateProfile({ name });
    return { status: "success", message: "저장했습니다." };
  } catch {
    return { status: "error", message: "저장하지 못했습니다." };
  }
}

function NameEditor() {
  const [state, dispatchSave, isPending] = useActionState<SaveState, string>(
    saveName,
    { status: "idle" },
  );

  function handleSave(name: string) {
    startTransition(() => dispatchSave(name));
  }

  // handleSave를 실제 field/action에 연결한다.
  return <SaveView state={state} pending={isPending} onSave={handleSave} />;
}
```

- 여러 dispatch는 이전 결과가 다음 Action의 입력이 되므로 기본적으로 queue되어 순차 실행된다.
- 독립 요청 병렬성이 필요하면 Action queue가 맞는지 다시 판단한다.
- Action이 throw하면 queued Action이 취소되고 Error Boundary로 전달될 수 있다. 예상 가능한 field/server
  오류는 typed state로 반환한다.
- server function을 사용할 때 initial state와 payload는 serializable해야 한다.

Form Action에서는 반환된 dispatcher를 직접 `action`에 연결할 수 있다.

```tsx
function CreateForm() {
  const [state, formAction, pending] = useActionState(createProject, initialState);
  return (
    <form action={formAction}>
      <label htmlFor="project-name">프로젝트명</label>
      <input id="project-name" name="name" aria-invalid={Boolean(state.fieldErrors?.name)} />
      <button type="submit" disabled={pending}>생성</button>
    </form>
  );
}
```

이 경우 Action의 signature는 `(previousState, formData) => nextState`다. 기존 server action이
`(formData) => result`였다면 첫 인자가 추가되는 점을 놓치지 않는다.

### `useOptimistic`: 즉시 반영 후 authoritative state로 복귀

낙관 update는 Action 안에서 실행한다. 서버 요청이 끝나면 기본값으로 전달된 authoritative state가 다시
기준이 된다.

```tsx
import { startTransition, useOptimistic } from "react";

type Todo = { id: string; title: string; pending?: boolean };

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, title: string) => [
      ...current,
      { id: `pending-${title}`, title, pending: true },
    ],
  );

  function add(title: string) {
    startTransition(async () => {
      addOptimisticTodo(title);
      await createTodo({ title });
    });
  }

  return <TodoView todos={optimisticTodos} onAdd={add} />;
}
```

- 임시 id 충돌, 중복 submit, 실패 message와 재시도, server 정렬·정규화 결과를 설계한다.
- 파괴적 작업이나 권한이 불확실한 작업은 무조건 낙관 반영하지 않는다.
- 복잡한 rollback과 충돌 merge가 필요하면 query/cache library의 mutation 기능이 더 적합할 수 있다.

### `useFormStatus`: 제출 버튼을 form 상태에 연결

이 Hook은 추적할 `<form>`의 자손 component에서 호출해야 한다. 같은 component가 반환하는 form이나 자식
form의 상태는 추적하지 않는다.

```tsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending, data } = useFormStatus();
  const name = data?.get("name");
  return (
    <button type="submit" disabled={pending}>
      {pending ? `${String(name ?? "항목")} 저장 중…` : "저장"}
    </button>
  );
}

function ProjectForm({ action }: { action: (data: FormData) => void }) {
  return (
    <form action={action}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}
```

`data`, `method`, `action`도 제공하지만 민감한 form 값을 화면이나 log에 노출하지 않는다.

### `useEffectEvent`: Effect 재연결 없이 최신 값 읽기

외부 연결을 결정하는 reactive 값과 연결 callback이 읽을 최신 UI 값을 분리한다.

```tsx
import { useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, theme }: { roomId: string; theme: string }) {
  const onConnected = useEffectEvent(() => {
    showToast("연결되었습니다.", { theme });
  });

  useEffect(() => {
    const connection = connectToRoom(roomId);
    connection.on("connected", () => onConnected());
    connection.open();
    return () => connection.close();
  }, [roomId]);

  return null;
}
```

- Effect Event는 Effect, Layout Effect, Insertion Effect 또는 다른 Effect Event 안에서만 호출한다.
- 다른 component/Hook에 전달하거나 dependency array에 넣지 않는다.
- 함수 identity는 안정적이지 않다.
- 진짜 reactive dependency를 빼기 위한 escape hatch로 사용하지 않는다.

### `<Activity>`: state 보존 + Effect cleanup

```tsx
import { Activity } from "react";

function TabPanel({ active }: { active: "info" | "history" }) {
  return (
    <>
      <Activity mode={active === "info" ? "visible" : "hidden"}>
        <InfoPanel />
      </Activity>
      <Activity mode={active === "history" ? "visible" : "hidden"}>
        <HistoryPanel />
      </Activity>
    </>
  );
}
```

hidden이면 DOM/state는 보존되지만 `display: none`으로 숨고 Effect가 cleanup된다. 다시 visible이 되면 state를
복원하고 Effect를 다시 설정한다. video/audio/iframe처럼 DOM 자체가 side effect를 지속할 수 있는 요소는
cleanup에서 pause/정지를 명시한다. 완전한 reset이 필요하면 조건부 unmount를 사용한다.

### RSC의 `cache`와 `cacheSignal`

```tsx
import { cache, cacheSignal } from "react";

const getUser = cache(async (userId: string) => {
  const response = await fetch(`/internal/users/${userId}`, {
    signal: cacheSignal() ?? undefined,
  });
  if (!response.ok) throw new Error("사용자를 불러오지 못했습니다.");
  return response.json() as Promise<User>;
});
```

- `cache`는 React Server Components 전용이며 같은 memoized function과 같은 argument identity를 사용하는
  한 server request/render 범위에서 중복 작업을 공유한다.
- component 안에서 매번 `cache(fn)`을 만들지 말고 module scope에서 같은 함수를 공유한다.
- 성공뿐 아니라 같은 argument의 throw 결과도 cache될 수 있다.
- `cacheSignal()`은 server render/cache 수명이 끝날 때 abort되는 signal이며 Client Component에서는
  현재 `null`일 수 있다.
- framework의 cross-request data cache와 React request memoization을 같은 것으로 취급하지 않는다.

### React 19 문법·DOM 변경 지식

- Context는 `<ThemeContext.Provider value={theme}>`뿐 아니라 React 19에서
  `<ThemeContext value={theme}>` 형태로 provider를 렌더할 수 있다. 기존 codebase 관례와 version을 따른다.
- function component는 React 19에서 `ref`를 prop으로 받을 수 있다. library/public component migration은
  React 18 consumer 호환성과 type package를 함께 확인한다.
- `<form action={function}>`과 button의 `formAction`은 Action을 연결하며 성공 후 uncontrolled field를
  reset할 수 있다. controlled form state와 server error 보존 정책은 별도로 관리한다.
- document metadata와 stylesheet/resource hint API는 framework의 metadata, font, script 기능과 충돌하지
  않는지 확인한다. Next.js에서는 framework API를 우선한다.

## 컴포넌트 설계

- 컴포넌트는 같은 props, state, context에 대해 같은 JSX를 반환하는 pure function으로 유지한다.
- render 중 DOM, network, storage, timer, 외부 store 또는 전달받은 객체를 변경하지 않는다.
- prop은 표현에 필요한 최소 계약으로 설계한다. domain DTO 전체 전달과 boolean prop의 조합 폭발을 피한다.
- 동일한 의미는 variant·slot·children으로 확장하고, 서로 다른 의미는 별도 계약으로 분리한다.
- 공용 컴포넌트는 controlled API를 우선한다. 편의용 uncontrolled 모드가 필요하면 한 수명 중 모드를
  전환하지 않고 `defaultValue`와 `value` 계약을 명확히 분리한다.
- 이벤트 prop은 발생한 사실을 표현하고 내부 구현을 노출하지 않는다. 예: `onValueChange`, `onOpenChange`.

## 상태 모델링

- 저장할 state를 최소화한다. props/state로 계산 가능한 값은 render에서 계산한다.
- 서로 항상 함께 바뀌는 값은 하나의 state 또는 reducer로 묶는다.
- 배타적인 상태를 여러 boolean으로 만들지 말고 status union 또는 state machine으로 표현한다.
- state는 필요한 가장 가까운 공통 owner에 둔다. 무조건 끌어올리거나 전역화하지 않는다.
- 서버 데이터, URL query, form draft, UI presentation state를 같은 state로 복제하지 않는다.
- server response 원본과 편집 draft를 분리하고 mutation 성공 전 원본을 변경하지 않는다.
- 컴포넌트 위치와 `key`가 state identity를 결정한다. reset은 Effect보다 명시적 key나 초기화 이벤트를
  우선한다.
- list key는 안정적인 resource id를 사용한다. 삽입·삭제·정렬되는 목록에 index를 사용하지 않는다.

## 이벤트와 Effect 결정

사용자의 클릭·입력 때문에 실행되는 작업은 event handler에서 처리한다. 컴포넌트가 화면에 존재하는
동안 외부 시스템과 동기화해야 하는 작업만 Effect로 처리한다.

Effect를 쓰기 전에 다음을 확인한다.

1. props/state에서 계산할 수 있는가? render에서 계산한다.
2. 비싼 계산인가? 먼저 측정하고 필요하면 memoization한다.
3. 사용자 이벤트의 결과인가? 해당 event handler에서 처리한다.
4. 특정 prop 변경에 state를 reset해야 하는가? key 또는 데이터 구조를 재설계한다.
5. 외부 system 구독·DOM widget·network synchronization인가? Effect를 사용하고 cleanup한다.

- Effect dependency를 거짓으로 줄이지 않는다. lint 경고를 끄기보다 reactive value 구조를 고친다.
- timer, subscription, observer, event listener와 요청은 cleanup하거나 stale result를 무시한다.
- 개발 환경의 Strict Mode 재실행에도 setup/cleanup 대칭이 유지되어야 한다.
- Effect에서 파생 state를 연쇄 갱신해 추가 render와 race를 만들지 않는다.
- `useEffectEvent`는 설치 버전과 lint 지원을 확인한 뒤 Effect의 비반응 로직 분리에만 사용한다.

## Reducer, Context와 외부 store

- 업데이트 규칙이 여러 이벤트에 분산되거나 state transition을 독립 검증해야 하면 reducer를 사용한다.
- reducer도 pure해야 하며 side effect를 실행하지 않는다.
- Context는 subtree 전체가 같은 수명으로 공유하는 안정적인 계약에 사용한다.
- 자주 변하는 큰 context value는 소비자 전체를 재렌더링할 수 있으므로 state/action 또는 관심사를 나눈다.
- 전역 store는 auth, theme, 전역 작업 context처럼 실제 앱 수명 상태에 사용한다. page form과 modal open을
  전역화하지 않는다.
- 외부 store 연결은 tearing과 subscription lifecycle을 고려해 검증된 adapter를 사용한다.

## Ref와 imperative API

- ref는 focus, selection, scroll, measurement, media control, third-party widget 연결에 제한한다.
- render 판단에 필요한 값은 ref가 아니라 state로 둔다.
- 부모에 DOM 전체를 노출하기보다 필요한 최소 imperative handle을 제공한다.
- ref callback과 observer는 node 교체와 unmount 시 정리한다.
- focus는 오류, dialog open/close, route/page transition에서 사용자의 위치와 복귀 대상을 고려한다.

## 비동기 UI와 동시성

- 최초 loading, 기존 UI를 유지하는 refresh, mutation pending을 서로 다른 상태로 표현한다.
- Suspense는 지원되는 data source와 framework integration에 사용한다. 임의 Effect fetch를 Promise로 던져
  Suspense처럼 만들지 않는다.
- transition은 긴급한 입력 업데이트와 지연 가능한 결과 렌더를 구분할 때 사용한다. 오류·취소·접근성
  feedback을 대신하지 않는다.
- optimistic UI는 실패 rollback, 중복 submit, 서버 충돌과 최종 authoritative response를 설계한 후 사용한다.
- `<Activity>`는 숨긴 subtree의 state 유지와 Effect 정리 특성이 실제 요구와 맞고 현재 runtime이 지원할
  때만 사용한다.
- View Transition은 motion 없이도 기능이 완전해야 하며 focus와 `prefers-reduced-motion`을 검증한다.

## Server와 Client 경계

- React Server Components는 framework가 제공하는 경계에서만 사용한다.
- server 전용 module, secret, database client가 client dependency graph로 넘어가지 않게 한다.
- client에 전달하는 props는 직렬화 가능하고 최소한이어야 한다.
- server와 client가 다른 값으로 render하지 않게 날짜, random, browser-only state의 hydration 경계를 둔다.
- hydration warning을 숨기기보다 원인을 제거한다. 억제가 불가피하면 해당 불일치가 안전한 이유를 문서화한다.

## 성능 기준

- 먼저 React Profiler, browser performance, network와 bundle 근거를 수집한다.
- `memo`, `useMemo`, `useCallback`은 측정된 병목, expensive calculation 또는 하위 API의 안정적인 identity
  계약이 있을 때 사용한다.
- memoized value의 dependency는 완전하게 유지한다. 모든 함수에 `useCallback`을 붙이지 않는다.
- 긴 목록은 pagination, incremental rendering, virtualization 중 사용자 경험에 맞는 전략을 선택한다.
- Client Component boundary를 크게 잡아 불필요한 JS와 hydration 범위를 늘리지 않는다.
- React Compiler가 켜져 있어도 purity, Hook, identity 규칙은 그대로 지킨다.

## 접근성과 상태 보존

- 조건부 렌더가 focus된 element를 제거할 때 다음 focus 위치를 결정한다.
- loading 중 전체 UI를 지우기보다 가능한 경우 기존 정보와 진행 상태를 유지한다.
- 오류는 Error Boundary, route boundary, page content state 중 책임이 가장 가까운 곳에서 처리한다.
- error fallback은 재시도 또는 안전한 이동 경로를 제공한다.
- screen reader 공지는 실제 사용자에게 필요한 결과만 간결하게 전달하고 모든 render를 live region으로
  만들지 않는다.

## 금지 패턴

- Effect로 props를 state에 복사하기
- render 중 state 변경 또는 부모 callback 호출
- 컴포넌트 내부에서 다른 컴포넌트 함수를 일반 함수처럼 호출하기
- 조건문·반복문·nested function에서 Hook 호출하기
- 의미 없는 index key, random key, 매 render 새 key 사용
- 상태 조합을 설명할 수 없는 다수의 boolean prop
- context/provider를 재사용의 기본 수단으로 사용하기
- 성능 근거 없이 memoization과 virtualization 추가하기
- 최신 React 문서에 있다는 이유로 설치 버전에 없는 API 사용하기

## 구현 전 체크리스트

- [ ] 실제 React/framework/type/lint 버전을 확인했다.
- [ ] 기존 component와 Hook을 의미로 검색했다.
- [ ] state owner와 state identity가 명확하다.
- [ ] derived value를 불필요하게 state로 저장하지 않았다.
- [ ] Effect가 외부 system synchronization에만 사용된다.
- [ ] async의 loading, refresh, error, retry, cancellation을 모델링했다.
- [ ] keyboard/focus와 error recovery를 확인했다.
- [ ] 관련 test와 typecheck/lint/build를 실행했다.

## 공식 source 기록

- [React Reference](https://react.dev/reference/react)
- [React Versions](https://react.dev/versions)
- [React 19.2 release](https://react.dev/blog/2025/10/01/react-19-2)

이 링크는 스냅샷의 출처다. 일반 작업 중 다시 열지 않으며 사용자가 업데이트를 요청한 경우에만
`$aifrica-frontend-docs`로 확인한다.
