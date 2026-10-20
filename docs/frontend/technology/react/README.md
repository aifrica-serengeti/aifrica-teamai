# React 19.2 상세 지식 팩

이 디렉터리는 [React 로컬 적용 기준](../react.md)의 상세 레퍼런스다. 상위 문서가 버전과
Aifrica 적용 원칙을 정한다면, 여기서는 학습 시점이 오래된 AI가 안정 API의 정확한 역할과 조합을
작업 중 바로 복원할 수 있도록 signature, 상태 전이, 실패 조건과 예제를 제공한다.

공식 문서를 그대로 복제한 mirror가 아니다. React 19.2의 stable reference를 Aifrica 작업에 필요한
형태로 다시 설명한 로컬 지식베이스다. canary 전용 API는 stable 기능처럼 사용하지 않는다.

## 로딩 규칙

AI는 React 작업마다 이 파일 전체와 상위 `react.md`를 먼저 읽고, 아래 표에서 관련 지식 팩만 추가로
읽는다. 모든 파일을 매번 읽지 않는다. 여러 관심사가 실제로 교차하면 두 개 이상을 읽는다.

| 작업 신호 | 필수 지식 팩 |
| --- | --- |
| state, reducer, derived state, controlled input | [상태와 이벤트](./state-and-events.md) |
| Effect, subscription, DOM 측정, ref, 외부 store | [Effect·Ref·외부 시스템](./effects-refs-external-store.md) |
| Suspense, Promise, Action, optimistic, transition, 숨긴 UI | [비동기 UI와 Actions](./async-actions-suspense.md) |
| Context, provider, custom Hook, state identity, 재사용 | [Context와 재사용](./context-identity-reuse.md) |
| form, input, portal, metadata, resource preload | [React DOM과 Form](./dom-forms-resources.md) |
| root, hydration, SSR stream, static render, RSC cache | [렌더링과 서버 API](./rendering-server-hydration.md) |
| memo, profiler, lazy, bundle, React Compiler | [성능과 Compiler](./performance-compiler.md) |
| Hook 규칙, lint, act, test 전략 | [테스트와 정적 검증](./testing-lint-rules.md) |

## 안정 API 커버리지

### `react` Hooks

| 분류 | API | 지식 팩 |
| --- | --- | --- |
| state | `useState`, `useReducer`, `useActionState`, `useOptimistic` | 상태 / 비동기 |
| context | `useContext`, `use` | Context / 비동기 |
| refs | `useRef`, `useImperativeHandle` | Effect·Ref |
| effects | `useEffect`, `useLayoutEffect`, `useInsertionEffect`, `useEffectEvent` | Effect·Ref |
| performance | `useMemo`, `useCallback`, `useTransition`, `useDeferredValue` | 성능 / 비동기 |
| library support | `useDebugValue`, `useId`, `useSyncExternalStore` | Effect·Ref / Context |

### `react` Components와 API

| 분류 | API |
| --- | --- |
| built-in components | `<Fragment>`, `<Profiler>`, `<Suspense>`, `<StrictMode>`, `<Activity>` |
| component APIs | `createContext`, `lazy`, `memo`, `startTransition`, `act`, `use` |
| RSC APIs | `cache`, `cacheSignal` |

### `react-dom` API

| entry point | API |
| --- | --- |
| `react-dom` | `createPortal`, `flushSync`, resource preload/preinit APIs |
| `react-dom` Hooks | `useFormStatus` |
| `react-dom/client` | `createRoot`, `hydrateRoot` |
| `react-dom/server` | Web/Node streaming render와 resume API, legacy string render |
| `react-dom/static` | Web/Node prerender와 partial prerender resume API |

### 함께 주입하는 계약

- render purity와 state identity
- Hook 호출 순서와 `use`의 예외
- controlled/uncontrolled lifetime
- event와 Effect의 책임 분리
- Suspense source와 Error Boundary ownership
- hydration 일치 조건
- RSC와 Client Component 직렬화 경계
- Action queue, pending, optimistic rollback
- React Compiler 도입 gate와 lint 신호
- accessibility, focus, loading/refresh/error 상태

## API 지식 카드 형식

각 상세 항목은 가능한 범위에서 다음 질문에 답한다.

1. import와 호출 signature는 무엇인가?
2. 어떤 상태 또는 lifecycle을 소유하는가?
3. 언제 선택하고 언제 선택하지 않는가?
4. 실행 가능한 최소 조합은 무엇인가?
5. Strict Mode, concurrent rendering, SSR, hydration에서 무엇이 달라지는가?
6. version/framework/browser/tooling gate와 fallback은 무엇인가?

## 버전 판정

- React와 `react-dom`의 major/minor를 함께 확인한다.
- `@types/react`, ESLint plugin, framework integration이 같은 API를 이해하는지 확인한다.
- React Server Components API는 RSC를 실제 지원하는 framework 안에서만 사용한다.
- React Compiler 문서가 있다고 compiler가 켜진 것은 아니다. build 설정과 lint 결과를 확인한다.
- `react.dev`의 canary 문서나 canary component를 React 19.2 stable API로 오인하지 않는다.

## 공식 근거

- [React Hooks](https://react.dev/reference/react/hooks)
- [React Components](https://react.dev/reference/react/components)
- [React APIs](https://react.dev/reference/react/apis)
- [React DOM](https://react.dev/reference/react-dom)
- [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)

공식 링크는 provenance다. 일반 구현에서는 열지 않고 이 로컬 지식 팩을 사용한다.
