# React 성능·Profiler·Compiler

## 최적화 순서

1. network waterfall와 payload를 확인한다.
2. Server/Client boundary와 bundle을 확인한다.
3. React Profiler/browser performance로 느린 interaction을 재현한다.
4. 불필요한 render인지 실제 계산/DOM 비용인지 구분한다.
5. 가장 작은 경계에서 수정하고 다시 측정한다.

모든 component에 memoization을 추가하는 것은 성능 전략이 아니다. 한 번만 달라지는 prop, 매 render 새 object,
Context update 또는 항상 새 children 때문에 memo가 무효일 수 있다.

## `useMemo`

```tsx
const visibleRows = useMemo(
  () => expensiveFilter(rows, query),
  [rows, query],
);
```

render 사이 계산 결과를 cache하는 성능 최적화다. semantic correctness가 memo에 의존하면 안 된다.

- calculation은 pure해야 한다.
- dependency는 calculation이 읽는 reactive value 전체다.
- cheap 계산과 작은 배열에는 복잡도만 늘 수 있다.
- Strict Mode 개발에서 calculation이 추가 호출될 수 있다.
- React가 cache를 버릴 가능성을 API 의미로 고려한다.

object dependency가 필요하면 object를 memo 밖에서 매번 만들지 말고 계산 안에서 primitive로부터 만든다.

## `useCallback`

```tsx
const handleSelect = useCallback((projectId: string) => {
  setSelectedId(projectId);
}, []);
```

함수 결과가 아니라 function identity를 cache한다. memoized child prop, Effect dependency, custom Hook public
identity처럼 실제 identity 계약이 있을 때 사용한다. event handler라는 이유만으로 모두 감싸지 않는다.

state를 읽어 다음 state만 만드는 callback은 updater로 dependency를 줄일 수 있다.

```tsx
const addRow = useCallback((row: Row) => {
  setRows((current) => [...current, row]);
}, []);
```

## `memo`

```tsx
const ProjectRow = memo(function ProjectRow({ project, onSelect }: Props) {
  return <button onClick={() => onSelect(project.id)}>{project.name}</button>;
});
```

props가 `Object.is` 기준으로 같을 때 render를 건너뛸 수 있게 한다. 보장은 아니며 Context/state update는 여전히
render한다.

- custom comparator는 모든 prop/function을 비교해야 하며 render보다 비쌀 수 있다.
- function comparison을 누락하면 stale closure를 유지할 수 있다.
- mutable object를 같은 reference로 전달해 memo를 통과시키지 않는다.
- component purity 문제가 있으면 memo로 숨기지 않는다.

## `<Profiler>`

```tsx
<Profiler id="project-list" onRender={recordProfile}>
  <ProjectList />
</Profiler>
```

callback은 phase, actualDuration, baseDuration, startTime, commitTime 등을 제공한다. profiling 자체 비용이 있고
production profiling build가 별도일 수 있다. 사용자 식별 정보와 raw props를 analytics에 보내지 않는다.

측정할 질문 예:

- 입력 한 번에 몇 component가 commit되는가?
- actualDuration과 baseDuration 차이가 memo 효과를 보여 주는가?
- 느린 render보다 network/DOM layout이 병목인가?
- Context provider update가 너무 넓은가?

## `useDeferredValue`와 transition

render가 실제로 느리고 urgent input을 막을 때 concurrency API로 반응성을 개선한다. 계산량 자체나 request 수를
줄이지 않는다. 자세한 계약은 [비동기 UI와 Actions](./async-actions-suspense.md)를 따른다.

## code splitting과 `lazy`

route/framework split을 먼저 사용한다. 선택적으로만 쓰는 무거운 editor/chart 같은 경계에 `lazy`를 검토한다.
chunk 수, preload, error retry와 fallback shift를 측정한다.

## list 전략

- 먼저 pagination 또는 incremental fetch가 제품 흐름에 맞는지 본다.
- DOM row가 실제 병목일 때 virtualization을 검토한다.
- virtualization은 keyboard 탐색, screen reader, row height, focus 보존과 browser find를 손상시킬 수 있다.
- stable key와 item measurement cache invalidation을 설계한다.
- viewport 밖 data를 숨기는 것과 server result pagination을 구분한다.

## React Compiler

Compiler는 component와 Hook을 build time에 분석해 값/함수 memoization을 자동 적용한다. React 19 application은
runtime API가 포함되어 있지만 compiler package/plugin이 실제 build에 설정되어야 한다.

확인할 것:

- `babel-plugin-react-compiler` 또는 framework compiler 설정
- React target과 compiler version
- eslint-plugin-react-hooks의 compiler diagnostics
- third-party incompatible library
- build output과 interaction regression
- 기존 manual memoization 보존 여부

일반 React 19 예:

```js
module.exports = {
  plugins: ["babel-plugin-react-compiler"],
};
```

React 17/18 target은 compiler runtime package와 명시적 target이 필요할 수 있다. 사용자의 migration 승인 없이
compiler를 추가하거나 build chain을 바꾸지 않는다.

## Compiler directives

```tsx
function StablePanel() {
  "use memo";
  return <Panel />;
}

function UnsupportedWidget() {
  "use no memo";
  return <ThirdPartyWidget />;
}
```

- `"use memo"`: annotation mode opt-in 또는 compiler 판단 override
- `"use no memo"`: 문제 진단/호환되지 않는 코드의 임시 opt-out

directive는 function body 또는 module의 지시문 위치에 둔다. 광범위하게 붙이지 않고 이유와 제거 조건을
기록한다. project-level 설정과 purity 수정이 우선이다.

## Compiler가 요구하는 코드 품질

Compiler가 켜져도 다음 규칙은 그대로다.

- render purity
- props/state immutability
- Hook 호출 순서
- ref를 render 중 읽고 쓰지 않기
- component type을 render 안에 만들지 않기
- Effect에서 동기 파생 state 연쇄 update 피하기
- 오류 경계와 외부 library 호환성

Compiler가 특정 component를 skip해도 나머지 app을 최적화할 수 있다. diagnostic을 끄기보다 원인과 skip 범위를
확인한다.

## 자주 틀리는 최적화

- cheap JSX를 줄이려고 복잡한 comparator 작성
- prop object를 매번 만들면서 child만 memo
- stale closure를 유지하는 잘못된 dependency
- render 병목이 아닌 network 문제에 `useMemo` 적용
- 큰 client boundary 안에서 일부 component만 memo
- production profiling 없이 체감으로 virtualization
- compiler가 있으니 purity/lint 무시

## 검증

- 같은 시나리오의 최적화 전후 profile을 비교했는가?
- interaction latency와 Core Web Vitals가 실제 개선됐는가?
- bundle/chunk 수와 hydration JS가 늘지 않았는가?
- memo dependency와 custom comparator가 정확한가?
- compiler 설정이 CI/production build에도 적용되는가?
- keyboard, focus, reduced motion과 screen reader 회귀가 없는가?
