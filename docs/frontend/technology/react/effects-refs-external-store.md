# React Effect·Ref·외부 시스템

## Effect의 정의

Effect는 React가 소유하지 않는 외부 시스템과 현재 render 결과를 동기화한다. 외부 시스템에는 network
connection, DOM widget, browser event, timer, observer, media와 third-party library가 포함된다.

다음은 Effect가 아니다.

- props/state에서 값 계산
- 사용자 click에 따른 저장
- prop 변경 시 local state reset
- data transformation chain
- 부모에게 render 완료 통지

## `useEffect`

```ts
useEffect(setup, dependencies?);
```

`setup`은 선택적으로 cleanup 함수를 반환한다. dependency가 바뀌면 이전 cleanup 후 새 setup이 실행되고,
unmount 때 마지막 cleanup이 실행된다.

```tsx
function OnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <span>{online ? "온라인" : "오프라인"}</span>;
}
```

dependency는 선택 목록이 아니라 setup이 읽는 reactive value 목록이다. lint를 속이기 위해 누락하지 않는다.
object/function이 매 render 새로 생겨 재연결된다면 해당 값을 Effect 안에서 만들거나 state 구조를 바꾼다.

## 개발 Strict Mode

Strict Mode는 개발에서 setup → cleanup → setup을 추가 실행해 대칭성 문제를 찾는다. 두 번 실행을 막는
ref flag로 숨기지 말고 cleanup이 setup을 완전히 되돌리게 한다.

```tsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
```

결제·등록 같은 사용자 action을 mount Effect에 두면 재실행 위험뿐 아니라 navigation 복구와도 맞지 않는다.
event handler나 server idempotency 경계에서 실행한다.

## Effect에서 fetch할 때

framework data layer가 있으면 그것을 우선한다. 직접 Effect fetch가 필요한 client-only 경계에서는 취소와
stale response를 처리한다.

```tsx
function useProject(projectId: string) {
  const [state, setState] = useState<AsyncState<Project>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    getProject(projectId, { signal: controller.signal })
      .then((project) => setState({ status: "ready", data: project }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setState({ status: "error", error: toAppError(error) });
        }
      });

    return () => controller.abort();
  }, [projectId]);

  return state;
}
```

이 패턴만으로 request cache, SSR, waterfall, dedupe가 해결되지 않는다. query library나 framework owner가
있으면 그 계약을 사용한다.

## `useEffectEvent` — React 19.2

Effect의 재연결 조건과 callback이 읽을 최신 값을 분리한다.

```tsx
function Chat({ roomId, muted }: { roomId: string; muted: boolean }) {
  const onMessage = useEffectEvent((message: Message) => {
    if (!muted) playSound();
    showMessage(message);
  });

  useEffect(() => {
    const channel = connect(roomId);
    channel.on("message", onMessage);
    return () => channel.disconnect();
  }, [roomId]);

  return null;
}
```

- Effect Event는 Effect 계열 안에서만 호출한다.
- 다른 component에 prop으로 전달하지 않는다.
- 진짜 reactive dependency를 숨기는 용도로 사용하지 않는다.
- React 19.2와 대응 lint 지원을 확인한다.

## `useLayoutEffect`

DOM 변경 후 browser paint 전에 layout을 읽고 동기 update가 꼭 필요할 때 사용한다.

```tsx
function Tooltip({ anchor }: { anchor: HTMLElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(ref.current?.getBoundingClientRect().height ?? 0);
  }, []);

  return <div ref={ref} style={{ transform: `translateY(${-height}px)` }} />;
}
```

paint를 막으므로 일반 Effect로 가능한 작업에는 사용하지 않는다. server render에서는 실행되지 않으므로
초기 HTML이 유효해야 한다. 반복 layout read/write로 forced layout을 만들지 않는다.

## `useInsertionEffect`

CSS-in-JS library가 layout Effect보다 먼저 style을 DOM에 삽입하기 위한 library API다. application의
일반 style이나 data flow에 사용하지 않는다. refs가 아직 attach되지 않을 수 있고 state update를 하지 않는다.

## `useRef`

```ts
const ref = useRef<T>(initialValue);
```

ref의 `current` 변경은 render를 일으키지 않는다. timer id, DOM node, 외부 instance처럼 화면 출력에 직접
쓰지 않는 mutable handle에 사용한다.

```tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>검색어로 이동</button>
    </>
  );
}
```

render 중 `ref.current`를 읽거나 쓰지 않는다. 예측 가능한 lazy initialization처럼 결과가 항상 같고
초기화 목적이 분명한 예외 외에는 event/Effect에서 다룬다.

## ref callback cleanup

동적으로 node를 추적할 때 callback ref를 사용할 수 있다. React 19에서는 ref callback이 cleanup 함수를
반환할 수 있다.

```tsx
function MeasuredRow() {
  return (
    <div
      ref={(node) => {
        const observer = new ResizeObserver(() => measure(node));
        observer.observe(node);
        return () => observer.disconnect();
      }}
    />
  );
}
```

TypeScript와 React version이 callback cleanup을 지원하는지 확인한다.

## `useImperativeHandle`

부모에 전체 DOM node보다 좁은 imperative API를 노출한다.

```tsx
export type EditorHandle = {
  focusName: () => void;
};

function Editor({ ref }: { ref: React.Ref<EditorHandle> }) {
  const nameRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusName: () => nameRef.current?.focus(),
  }), []);

  return <input ref={nameRef} name="name" />;
}
```

React 19의 ref-as-prop을 사용한 예다. React 18 consumer를 지원하는 library라면 `forwardRef` 호환 전략을
별도로 유지한다. 일반 state/action을 imperative method로 우회하지 않는다.

## `useSyncExternalStore`

React 밖 store를 concurrent rendering과 SSR에 맞게 구독한다.

```tsx
function useOnlineStatus() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("online", onStoreChange);
      window.addEventListener("offline", onStoreChange);
      return () => {
        window.removeEventListener("online", onStoreChange);
        window.removeEventListener("offline", onStoreChange);
      };
    },
    () => navigator.onLine,
    () => true,
  );
}
```

- `getSnapshot`은 store가 안 바뀌었으면 `Object.is`로 같은 값을 반환해야 한다.
- mutable store는 immutable cached snapshot을 제공한다.
- `subscribe` 함수 identity가 계속 바뀌지 않게 module scope 또는 안정된 closure에 둔다.
- `getServerSnapshot`은 hydration 시 server/client 초기 결과가 일치하게 한다.
- React state로 소유할 수 있는 값을 굳이 외부 store로 만들지 않는다.

## `useDebugValue`

custom Hook의 DevTools label을 제공하는 library 지원 API다.

```tsx
function useConnectionStatus() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useDebugValue(status, (value) => `connection:${value}`);
  return status;
}
```

모든 custom Hook에 추가하지 않고 공유 library의 관찰 가치가 있을 때 사용한다.

## 점검표

- Effect가 실제 외부 시스템을 동기화하는가?
- setup과 cleanup이 Strict Mode 재실행에도 대칭인가?
- 모든 reactive dependency가 포함됐는가?
- async request가 abort되고 stale result가 차단되는가?
- layout Effect가 paint를 막아야 할 구체적 이유가 있는가?
- ref 값이 화면 출력을 결정하고 있지 않은가?
- imperative handle이 최소 기능만 노출하는가?
- external snapshot identity와 SSR snapshot이 안정적인가?
