# React 테스트·Lint·Rules of React

## Rules of React

### Component와 Hook은 pure하다

- 같은 props/state/context에 같은 JSX를 반환한다.
- render 중 DOM, network, timer, storage와 전달받은 객체를 변경하지 않는다.
- side effect는 event handler 또는 Effect에 둔다.
- idempotent하지 않은 `Date.now()`/random을 render 판단에 직접 사용하지 않는다.

### React가 Component와 Hook을 호출한다

component 함수를 일반 함수처럼 직접 호출하지 않는다.

```tsx
// 잘못된 방식
const content = ProjectRow({ project });

// 올바른 방식
const content = <ProjectRow project={project} />;
```

Hook을 callback 값처럼 전달해 임의 호출하지 않는다. component type과 JSX를 public API로 구분한다.

### Hook 호출 규칙

대부분의 Hook은 component/custom Hook 최상위에서 같은 순서로 호출한다.

금지:

- 조건문, loop, early return 뒤
- event handler/callback 안
- async function 안
- class/module scope 안

`use(resource)`는 조건문/loop에서 사용할 수 있는 예외지만 component/Hook render 안이어야 하고 try/catch로
suspension을 감싸지 않는다.

## eslint-plugin-react-hooks

권장 preset은 기본 Hook 규칙뿐 아니라 Compiler가 발견하는 purity 문제도 진단한다.

핵심 lint:

| rule | 잡는 문제 |
| --- | --- |
| `rules-of-hooks` | Hook 호출 순서 위반 |
| `exhaustive-deps` | Effect/memo dependency 누락 |
| `immutability` | props/state 등 immutable 값 mutation |
| `purity` | render 중 알려진 impure 함수 호출 |
| `refs` | render 중 ref 읽기/쓰기 |
| `set-state-in-render` | render 중 state update |
| `set-state-in-effect` | 불필요한 동기 Effect state 연쇄 update |
| `static-components` | render마다 component type 재생성 |
| `component-hook-factories` | nested component/Hook factory 문제 |
| `error-boundaries` | child 오류를 try/catch로 잡으려는 패턴 |
| `incompatible-library` | Compiler memoization과 호환되지 않는 library |
| `preserve-manual-memoization` | 기존 memo 계약이 compiler로 깨질 위험 |
| `unsupported-syntax` | Compiler가 안전하게 분석하지 못하는 syntax |
| `use-memo` | 값을 반환하지 않는 잘못된 `useMemo` |

lint를 끄기 전에 코드 구조를 고친다. custom Effect Hook이 있다면 plugin이 제공하는 shared setting/version을
확인해 dependency 검사를 연결한다.

## 테스트 층위

| 층위 | 검증 대상 |
| --- | --- |
| pure unit | reducer, adapter, validator, formatter |
| component | semantic output, props/state interaction, focus |
| integration | form + mutation + error/optimistic/retry |
| browser/E2E | route, hydration, real focus, layout, network |
| performance | profiler, user timing, Core Web Vitals |

implementation detail state나 Hook 호출 횟수보다 사용자가 보는 role/name/state와 결과를 assert한다.

## `act`

```tsx
import { act } from "react";

await act(async () => {
  root.render(<Counter />);
});
```

render와 interaction으로 발생한 React update가 assertion 전에 처리되도록 한다. React Testing Library 같은
도구는 일반 interaction을 이미 act로 감쌀 수 있으므로 중복 사용하지 않는다.

- async update면 async act를 사용한다.
- production code에서 사용하지 않는다.
- warning을 숨기기 위해 timer/Promise를 무작정 flush하지 않는다.
- fake timer와 scheduler가 Effect/transition에 미치는 영향을 확인한다.

## 상태별 component test

Create form 예:

- label과 field accessible name
- initial/default value
- client validation error와 focus
- pending 중 duplicate submit 차단
- server field/form error와 입력 보존
- success 후 reset/navigation 정책
- keyboard submit과 cancel
- unsaved changes confirmation

List 예:

- initial loading / refresh 구분
- data/empty/filtered empty/error/retry
- sort/filter/page URL ownership
- selection과 권한
- stable row action accessible name

Detail 예:

- loading/not-found/forbidden/error
- read/edit 전환과 draft
- save conflict/rollback
- destructive confirmation
- refresh 중 content 보존

## Effect와 cleanup test

- subscription이 정확히 한 번 활성 상태인가?
- dependency 변경 시 이전 연결이 정리되는가?
- unmount 후 state update가 없는가?
- abort signal이 downstream으로 전달되는가?
- Strict Mode setup/cleanup/setup에서 leak이 없는가?

## Suspense/transition test

- pending fallback과 resolved content
- reject 시 Error Boundary
- 기존 content가 transition 중 유지되는지
- urgent input이 pending render에 막히지 않는지
- optimistic 실패 후 rollback
- Action rapid dispatch ordering

## hydration과 browser test

jsdom만으로 실제 hydration, layout, focus trap, media query와 browser navigation을 완전히 검증할 수 없다.
다음은 real browser에서 확인한다.

- server/client console hydration warning
- streaming/Suspense boundary
- focus 이동과 portal/modal
- ResizeObserver/layout measurement
- keyboard Tab/Escape/arrow behavior
- browser back/forward와 scroll restoration
- reduced motion, forced colors, 200% zoom

## test anti-pattern

- component 내부 state 직접 읽기
- CSS class 이름만 snapshot으로 고정
- 모든 화면을 거대한 snapshot 하나로 검증
- pending/error/permission 상태 생략
- timer와 Promise를 이유 없이 모두 mock
- act warning을 console mock으로 숨김
- implementation Hook을 mock해 실제 integration 제거

## 완료 기준

- lint/typecheck가 실제 repository config로 통과한다.
- 변경된 상태 전이와 실패 경로 test가 있다.
- accessibility query로 주요 control을 찾을 수 있다.
- async test가 race 없이 사용자 결과를 기다린다.
- hydration/layout/focus가 필요한 기능은 browser test 또는 수동 증거가 있다.
- 실행하지 않은 test는 통과로 보고하지 않는다.
