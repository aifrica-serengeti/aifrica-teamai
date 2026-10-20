# React Context·Identity·재사용

## Context를 쓰기 전

Context는 prop 전달을 줄이는 도구가 아니라 subtree가 공유하는 값을 제공하는 수명 계약이다. 먼저 다음을
검토한다.

1. children composition이나 명시적 prop이 더 단순한가?
2. 실제 소비자가 같은 provider 수명과 update 빈도를 공유하는가?
3. page state를 공용 component가 몰래 읽게 만들고 있지 않은가?
4. provider value 변화가 넓은 subtree를 다시 그려도 되는가?

theme, locale, authenticated actor, router 같은 app/subtree 수명 값은 적합하다. 한 Dialog open 상태나 특정
form draft를 전역 Context에 넣지 않는다.

## `createContext`

```tsx
type ThemeContextValue = {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
```

default value는 provider가 없을 때의 고정 fallback이며 시간이 지나도 바뀌지 않는다. 의미 없는 no-op 함수를
default로 넣어 provider 누락을 숨기지 않는다.

```tsx
export function useTheme() {
  const value = useContext(ThemeContext);
  if (value === null) throw new Error("ThemeProvider가 필요합니다.");
  return value;
}
```

## React 19 provider shorthand

```tsx
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
```

React 19에서는 Context object 자체를 provider로 렌더할 수 있다. React 18 호환 codebase/library에서는
`<ThemeContext.Provider>`를 유지한다. `useMemo`는 실제로 value identity가 소비자 렌더 계약에 영향을 줄
때 사용한다. 무조건 provider value를 memoize하지 않는다.

## `useContext`

`useContext(Context)`는 호출 component 위쪽에서 가장 가까운 provider 값을 읽고 구독한다. 같은 component가
반환하는 provider의 영향을 받지 않는다.

```tsx
function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <button
      aria-pressed={mode === "dark"}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      어두운 테마
    </button>
  );
}
```

provider value는 `Object.is` 비교로 변경을 판단한다. module duplication으로 provider와 consumer가 서로
다른 Context object를 import하지 않게 monorepo/bundler 설정을 확인한다.

## Context를 나누는 기준

state와 action의 소비자가 다르고 state가 자주 변하면 Context를 나눌 수 있다.

```tsx
const SelectionStateContext = createContext<SelectionState | null>(null);
const SelectionDispatchContext = createContext<Dispatch<SelectionAction> | null>(null);
```

하지만 provider 수를 늘리는 것이 자동 최적화는 아니다. 실제 render 측정과 API 응집도를 함께 본다. selector
기능이 필요하면 검증된 external store adapter를 검토한다.

## custom Hook

custom Hook은 React stateful logic을 재사용한다. state 자체를 component 사이에서 공유하는 것은 아니다.

```tsx
function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
```

- 이름은 `use`로 시작한다.
- Hook도 최상위 호출 규칙과 purity를 따른다.
- lifecycle이 다른 관심사를 이름만으로 합치지 않는다.
- event callback을 받으면 reactive인지 Effect Event인지 계약을 분명히 한다.
- return object가 매번 새로 생기는 것이 public identity 계약에 영향을 주는지 확인한다.

## component 재사용과 composition

공용 component는 domain object보다 표현에 필요한 최소 prop을 받는다.

```tsx
type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};
```

slot/children은 owner가 markup과 action을 조립할 필요가 있을 때 사용한다. 모든 구조를 `renderX` prop으로
만들어 API를 추상화하지 않는다. 서로 다른 의미를 boolean prop 조합으로 한 component에 합치지 않는다.

결정 순서:

- `reuse`: 의미와 상태 계약이 같다.
- `extend`: 같은 의미에 호환 가능한 variant/slot만 필요하다.
- `compose`: 기존 leaf component의 조합으로 해결된다.
- `create`: 독립된 의미와 interaction 계약이다.

## `<Fragment>`

`<>...</>`는 DOM wrapper 없이 자식을 묶는다. key가 필요하면 명시적 Fragment를 사용한다.

```tsx
import { Fragment } from "react";

function DescriptionList({ items }: Props) {
  return items.map((item) => (
    <Fragment key={item.id}>
      <dt>{item.label}</dt>
      <dd>{item.value}</dd>
    </Fragment>
  ));
}
```

Fragment는 semantic grouping element가 아니다. section/list/form 의미가 필요하면 native element를 사용한다.

## `useId`

server/client에 걸쳐 안정적인 accessibility 연결 id를 만든다.

```tsx
function Field({ label }: { label: string }) {
  const id = useId();
  const descriptionId = `${id}-description`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={descriptionId} />
      <p id={descriptionId}>최대 50자</p>
    </div>
  );
}
```

- list key 생성에 사용하지 않는다. key는 data identity에서 나온다.
- CSS selector나 test selector로 남용하지 않는다.
- 여러 root의 `identifierPrefix`가 hydration과 일치해야 한다.

## state 보존과 component identity

- 같은 위치와 같은 type은 state를 보존한다.
- 다른 key/type은 state를 reset한다.
- JSX branch 모양이 달라도 최종 위치가 같으면 state가 보존될 수 있다.
- component 정의를 render 안에 중첩하지 않는다.
- 목록 reorder에는 안정적인 resource key를 사용한다.
- tab을 조건부 unmount할지 Activity로 보존할지는 제품 요구로 결정한다.

## `<StrictMode>`

개발 전용 추가 검사를 켠다.

```tsx
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

개발에서 pure render를 찾기 위한 추가 render, Effect/ref callback 재실행과 deprecated API 검사를 수행할 수
있다. production 동작을 바꾸는 feature flag로 사용하지 않는다. Strict Mode에서만 실패하면 재실행을 막기보다
purity/cleanup 문제를 수정한다.

## 금지 패턴

- provider가 없을 때 no-op default로 오류 숨기기
- Context에 거대한 mutable object 전달
- page별 form/query/modal 상태의 무조건 전역화
- custom Hook 이름 아래 unrelated lifecycle 결합
- component 안에서 component type 정의
- domain DTO 전체를 디자인 시스템 prop으로 전달
- list key에 `useId`, index, random 값 사용

## 검증

- provider가 빠졌을 때 명확히 실패하거나 유효한 fallback이 있는가?
- provider value update가 필요한 consumer만 다시 그리는가?
- custom Hook을 두 component에서 호출했을 때 state가 독립적인가?
- key 변경 시 보존/reset되는 state와 focus가 요구에 맞는가?
- public component prop이 domain/API 변경에 불필요하게 결합되지 않았는가?
