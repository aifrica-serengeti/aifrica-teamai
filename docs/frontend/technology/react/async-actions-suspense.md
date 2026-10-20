# React 비동기 UI와 Actions

## 비동기 상태를 먼저 분리한다

비동기 기능은 최소한 다음 상태를 구분한다.

- initial loading
- 기존 content가 있는 background refresh
- mutation pending
- success data / success empty
- recoverable error / terminal error
- optimistic state / rollback / conflict
- cancelled 또는 newer request로 대체됨

Suspense, transition과 Action은 이 상태 모델을 대신하지 않는다. 어떤 경계가 어떤 상태를 보여 줄지
구체적으로 결정한 뒤 API를 선택한다.

## `<Suspense>`

```tsx
<Suspense fallback={<ProjectListSkeleton />}>
  <ProjectList />
</Suspense>
```

Suspense가 인식하는 source는 Suspense-enabled framework data, `lazy` component, `use`로 읽는 Promise 등이다.
Effect 안에서 시작한 fetch는 자동으로 Suspense에 연결되지 않는다.

- 처음 mount 전에 suspend하면 React는 해당 tree의 state를 보존하지 않는다.
- 이미 보이는 content가 다시 suspend하면 transition/deferred update가 아니면 fallback이 다시 보일 수 있다.
- fallback 자체가 suspend하면 상위 Suspense가 처리한다.
- layout Effect가 있는 content가 다시 숨으면 React가 cleanup하고 다시 보일 때 setup한다.
- Error Boundary는 reject/error를 소유하고 Suspense는 pending을 소유한다.

Boundary는 전체 page를 하나로 감싸거나 모든 작은 text마다 나누지 않는다. 사용자에게 함께 나타나야 하는
content 단위와 layout shift를 기준으로 둔다.

## `use(resource)` — React 19

```tsx
function ProjectName({ projectPromise }: { projectPromise: Promise<Project> }) {
  const project = use(projectPromise);
  return <h1>{project.name}</h1>;
}
```

Promise가 pending이면 suspend하고, reject하면 가장 가까운 Error Boundary로 전달된다. Client Component
render에서 매번 Promise를 생성하지 않는다.

`use`는 Context도 읽는다.

```tsx
function ThemeName({ show }: { show: boolean }) {
  if (!show) return null;
  const theme = use(ThemeContext);
  return <span>{theme.name}</span>;
}
```

다른 Hook과 달리 조건문과 loop에서 호출할 수 있지만 component/Hook render 안에서만 호출한다. `try/catch`
안에서 suspend Promise를 읽어 제어 흐름을 가로채지 않는다.

## `lazy`

```tsx
const AuditPanel = lazy(() => import("./AuditPanel.js"));

function AuditTab() {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <AuditPanel />
    </Suspense>
  );
}
```

- `lazy(load)`는 module의 default export를 component로 사용한다.
- `load`와 반환 Promise는 첫 render까지 실행되지 않고 결과가 cache된다.
- component 내부에서 `lazy`를 선언하면 type이 매번 새로 생기므로 module scope에 둔다.
- chunk load 실패를 복구할 Error Boundary와 retry/navigation을 제공한다.
- 작은 component를 무조건 쪼개 request 수와 loading flash를 늘리지 않는다.

## `useTransition`

```ts
const [isPending, startTransition] = useTransition();
```

```tsx
function SearchResults() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  function handleChange(value: string) {
    setInput(value); // urgent controlled input
    startTransition(() => setQuery(value)); // interruptible result update
  }

  return (
    <section aria-busy={pending}>
      <input value={input} onChange={(event) => handleChange(event.currentTarget.value)} />
      <ResultList query={query} />
    </section>
  );
}
```

- controlled text input 자체의 state를 transition으로 업데이트하지 않는다.
- transition update는 다른 urgent update에 의해 interrupt/restart될 수 있다.
- `startTransition` callback은 즉시 실행되고 그 안의 synchronous setter가 transition으로 표시된다.
- `await` 뒤의 setter는 현재 React에서 다시 `startTransition`으로 감싸야 할 수 있다.
- transition은 debounce가 아니며 network request 수를 자동으로 줄이지 않는다.
- pending UI는 기존 content를 완전히 가리기보다 진행 중임을 전달한다.

## `startTransition`

Hook을 쓸 수 없는 module/API 경계에서 transition update를 표시한다.

```tsx
startTransition(() => {
  store.setSelectedProject(projectId);
});
```

pending 상태가 필요하면 `useTransition`을 사용한다. 외부 store가 React와 올바르게 연동되지 않았다면
transition만 추가한다고 tearing 문제가 해결되지 않는다.

## `useDeferredValue`

```tsx
function SearchPage({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query, "");
  const stale = query !== deferredQuery;

  return (
    <div aria-busy={stale}>
      <ResultList query={deferredQuery} />
    </div>
  );
}
```

중요한 source state는 즉시 업데이트하고 느린 subtree가 소비하는 값만 지연한다.

- background render는 interruptible하다.
- Effect는 deferred render가 commit될 때 실행된다.
- 고정 delay를 지정하는 debounce가 아니다.
- 매 render 새 object를 전달하면 계속 달라질 수 있으므로 primitive/stable object를 전달한다.
- network request 자체를 줄이지 않으므로 cache 또는 debounce 요구와 구분한다.

## Action의 의미

React 19에서 transition 안의 async function을 Action으로 부르는 패턴이 확장되었다. Action은 pending,
optimistic update, form 제출과 결과 state를 조합할 수 있다. 예상 가능한 오류는 typed result로 반환하고,
예상 밖 오류는 Error Boundary/관측 경계로 보낸다.

## `useActionState`

개념 signature:

```ts
const [state, dispatchAction, isPending] = useActionState(
  action,
  initialState,
  permalink?,
);
```

Action은 이전 state를 첫 인자로 받는다.

```tsx
type State =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; projectId: string };

async function createProject(previous: State, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { status: "error", message: "프로젝트명을 입력하세요." };

  const project = await projectApi.create({ name });
  return { status: "success", projectId: project.id };
}

function CreateProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, { status: "idle" });

  return (
    <form action={formAction}>
      <label htmlFor="project-name">프로젝트명</label>
      <input id="project-name" name="name" aria-describedby="form-message" />
      <button disabled={pending}>{pending ? "생성 중…" : "생성"}</button>
      <p id="form-message" role={state.status === "error" ? "alert" : undefined}>
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
```

- dispatch를 form action으로 쓰거나 Action context/transition 안에서 호출한다.
- 여러 dispatch는 이전 결과를 다음 입력으로 사용하는 queue 성격이 있으므로 독립 병렬 요청과 구분한다.
- `permalink`는 hydration 전 progressive enhancement navigation에 쓰는 고급 인자다. 같은 form/component가
  목적 URL에도 렌더되어야 한다.
- server function을 쓰면 state와 payload가 직렬화 가능해야 한다.
- Action이 throw하면 예상 가능한 입력 오류도 사라질 수 있으므로 field/form 오류는 union으로 반환한다.

## `useOptimistic`

```ts
const [optimisticState, addOptimistic] = useOptimistic(
  authoritativeState,
  updateFn?,
);
```

```tsx
function Messages({ messages, send }: Props) {
  const [optimistic, addOptimistic] = useOptimistic(
    messages,
    (current, text: string) => [
      ...current,
      { id: crypto.randomUUID(), text, status: "sending" as const },
    ],
  );

  async function handleSend(text: string) {
    startTransition(async () => {
      addOptimistic(text);
      await send(text);
    });
  }

  return <MessageComposer messages={optimistic} onSend={handleSend} />;
}
```

`updateFn`은 pure해야 한다. Action이 끝나면 authoritative prop/state가 다시 기준이 된다.

- 임시 identity와 server identity 매핑
- 실패 표시, retry와 rollback
- 중복 submit과 ordering
- server normalization/permission conflict
- 낙관적으로 보여 주면 위험한 파괴적 action

을 먼저 설계한다.

## `<Activity>` — React 19.2

```tsx
<Activity mode={activeTab === "details" ? "visible" : "hidden"}>
  <ProjectDetails />
</Activity>
```

`hidden` mode는 subtree state와 DOM을 보존하지만 표시를 숨기고 Effect를 cleanup한다. 다시 visible이면 Effect를
재설정한다. 숨긴 content update는 낮은 priority로 처리될 수 있다.

- 완전 reset이 필요하면 조건부 unmount/key를 사용한다.
- DOM 자체가 계속 동작하는 media/iframe은 별도 pause가 필요할 수 있다.
- 접근성 tree와 focus가 숨김 상태에서 올바른지 확인한다.
- memory 비용이 큰 여러 화면을 모두 보존하지 않는다.

## 오류 경계와 비동기 오류

Error Boundary는 render, lifecycle와 Suspense source의 오류를 처리하지만 일반 event handler의 async rejection을
자동으로 잡지 않는다. event/API owner가 catch해 typed state로 변환하거나 framework error 경계로 명시적으로
전달한다.

Boundary fallback은 다음을 제공한다.

- 안전한 오류 설명
- retry 또는 다른 화면으로 이동
- focus 위치
- 로그 correlation에 필요한 비민감 식별자
- 반복 실패 시 무한 retry 방지

## 선택표

| 요구 | 우선 후보 |
| --- | --- |
| Promise 기반 render loading | Suspense + `use`/framework source |
| component code split | `lazy` + Suspense |
| 입력은 즉시, 결과는 지연 | `useTransition` 또는 `useDeferredValue` |
| async mutation 결과/pending state | `useActionState` |
| mutation 중 임시 결과 | `useOptimistic` |
| 숨긴 화면 state 보존 + Effect 정리 | `<Activity>` |
| request 수 제한 | debounce/cache/data layer; transition 아님 |

## 검증

- fallback, error, empty와 retry owner가 분리됐는가?
- 빠른 연속 Action의 queue/order가 요구와 일치하는가?
- optimistic 실패 후 authoritative state로 복구되는가?
- transition 중 input과 focus가 즉시 반응하는가?
- hydration 전 form 동작과 hydration 후 상태가 일치하는가?
- Activity hidden subtree가 network/media를 계속 사용하지 않는가?
