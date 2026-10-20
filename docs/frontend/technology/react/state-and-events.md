# React 상태와 이벤트

## 먼저 결정할 것

React state는 “나중에 필요할지도 모르는 값”의 저장소가 아니다. render 사이에 보존되어야 하고
변경 시 다시 그려야 하는 최소 정보만 state로 둔다. 다음 순서로 판단한다.

1. props와 현재 state에서 계산할 수 있으면 render에서 파생한다.
2. event 하나에서만 필요한 값이면 local variable로 둔다.
3. render와 무관한 mutable handle이면 ref를 검토한다.
4. 여러 event가 같은 전이 규칙을 공유하면 reducer를 검토한다.
5. server data, URL, form draft, presentation state를 서로 복제하지 않는다.

## `useState`

개념 signature:

```ts
function useState<S>(initialState: S | (() => S)):
  [S, (next: S | ((previous: S) => S)) => void];
```

초깃값 함수는 mount 때만 계산해야 하는 비싼 초기화에 사용한다.

```tsx
function ProjectFilter({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(() => initialQuery.trim());

  return (
    <input
      aria-label="프로젝트 검색"
      value={query}
      onChange={(event) => setQuery(event.currentTarget.value)}
    />
  );
}
```

현재 state를 바탕으로 다음 state를 만들면 updater를 사용한다. 같은 event 안의 update는 batch될 수 있고,
handler가 캡처한 값은 해당 render의 snapshot이다.

```tsx
function Quantity() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount((value) => value + 1);
    setCount((value) => value + 1);
    setCount((value) => value + 1);
  }

  return <button onClick={addThree}>{count}</button>;
}
```

### 객체와 배열

state object를 직접 변경하지 않는다. 변경 경로에 새 identity를 만든다.

```tsx
setDraft((current) => ({
  ...current,
  owner: { ...current.owner, name: nextName },
}));

setRows((current) => current.filter((row) => row.id !== removedId));
```

무조건 deep clone하지 않는다. state owner와 update 경계가 모호하다는 신호일 수 있다.

## `useReducer`

여러 event가 같은 state machine을 변경하거나 전이를 독립 test해야 할 때 사용한다.

```tsx
type DraftState =
  | { status: "editing"; name: string; error: null }
  | { status: "invalid"; name: string; error: string }
  | { status: "submitting"; name: string; error: null };

type DraftAction =
  | { type: "nameChanged"; value: string }
  | { type: "submitStarted" }
  | { type: "validationFailed"; message: string };

function draftReducer(state: DraftState, action: DraftAction): DraftState {
  switch (action.type) {
    case "nameChanged":
      return { status: "editing", name: action.value, error: null };
    case "submitStarted":
      return { status: "submitting", name: state.name, error: null };
    case "validationFailed":
      return { status: "invalid", name: state.name, error: action.message };
    default:
      return assertNever(action);
  }
}
```

- reducer는 pure해야 한다. fetch, navigation, analytics를 실행하지 않는다.
- action은 “어떻게 바꿀지”보다 “무슨 일이 일어났는지”를 표현한다.
- reducer가 domain/API owner가 되지 않게 한다.
- 단순 boolean 하나를 reducer로 감싸지 않는다.

## 파생 state를 저장하지 않기

```tsx
function ProjectList({ projects, query }: Props) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleProjects = projects.filter((project) =>
    project.name.toLocaleLowerCase().includes(normalizedQuery),
  );

  return <ProjectRows projects={visibleProjects} />;
}
```

`visibleProjects`를 Effect로 state에 복사하면 stale state와 추가 render가 생긴다. 계산이 실제로 비싸고
측정되었다면 `useMemo`를 검토한다.

## state identity와 reset

React는 JSX 위치, component type과 `key`로 state identity를 판단한다.

```tsx
function ProjectEditor({ projectId }: { projectId: string }) {
  return <Editor key={projectId} projectId={projectId} />;
}
```

resource가 바뀌면 draft를 완전히 새로 시작해야 하는 요구에는 key reset이 명확할 수 있다. 단, 입력 중인
값과 focus까지 모두 사라지므로 의도해야 한다. key를 random 값이나 render마다 새 값으로 만들지 않는다.

같은 위치에 다른 type을 조건부로 렌더하면 subtree state가 reset될 수 있다. component 함수를 다른
component 안에서 정의하면 매 render 새 type이 되어 state가 반복 reset되므로 금지한다.

## controlled와 uncontrolled

controlled input은 owner가 `value`와 update callback을 제공한다.

```tsx
type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
};

function SearchField({ value, onValueChange }: SearchFieldProps) {
  return (
    <input
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
    />
  );
}
```

uncontrolled input은 `defaultValue`로 초기값만 제공하고 현재 값은 DOM이 소유한다. 한 component 수명 중
`undefined` value에서 string value로 바꾸는 방식으로 모드를 전환하지 않는다.

## 이벤트 처리

- event handler는 전달하며 호출하지 않는다: `onClick={handleClick}`.
- 현재 화면 action은 Button, navigation은 Link를 사용한다.
- event propagation을 막기 전에 중첩 interactive 구조가 잘못되지 않았는지 확인한다.
- `preventDefault`는 browser 기본 동작을 의도적으로 대체할 때만 사용한다.
- async handler의 Promise 오류 owner를 정하고 중복 실행을 막는다.

```tsx
function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  async function handleClick() {
    if (status === "saving") return;
    setStatus("saving");
    try {
      await onSave();
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <button disabled={status === "saving"} onClick={handleClick}>
      {status === "saving" ? "저장 중…" : "저장"}
    </button>
  );
}
```

## state 구조 점검

- 관련 state가 항상 함께 바뀌면 object/reducer로 결합한다.
- 서로 모순될 수 있는 boolean은 discriminated union으로 바꾼다.
- 동일 데이터의 id와 전체 object를 동시에 저장하지 않는다.
- props를 초기 state로 복사했다면 이후 prop 변경을 반영할지 계약을 명시한다.
- tree가 같은 정보를 여러 state로 들고 있으면 가장 가까운 공통 owner를 찾는다.
- form draft와 server 원본을 분리하고 저장 성공 전 원본을 덮지 않는다.

## 사용하지 말아야 할 해결법

- props 변화마다 Effect로 state 복사
- state setter 직후 변수가 즉시 바뀐다고 가정
- 배열 index/random 값을 list key로 사용
- reducer 내부 side effect
- 모든 local state를 Context/store로 승격
- `forceUpdate`를 위한 무의미한 counter
- object mutation 후 같은 reference를 setter에 전달

## 검증

- 같은 event에서 연속 update가 의도대로 누적되는가?
- resource id 변경 시 draft 보존/reset 정책이 맞는가?
- 빠른 연속 입력과 submit에서 stale state가 없는가?
- controlled/uncontrolled warning이 없는가?
- reducer의 모든 action과 불가능한 상태가 test되는가?
- keyboard와 screen reader에 pending/error가 전달되는가?
