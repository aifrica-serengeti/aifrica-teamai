# Skeleton — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Skeleton 문서 인덱스](./README.md)

## 검증 체크리스트

- [ ] public barrel에서 `Skeleton`, `SkeletonProps`를 import할 수 있음
- [ ] root가 native `div`이고 `data-slot="skeleton"`을 유지함
- [ ] `className`, `aria-*`, `data-*`, `role` 등 native props를 root에 전달함
- [ ] 공용 surface는 `var(--element-disabled)`, 기본 radius는 `4px`임
- [ ] width와 height는 Skeleton이 고정하지 않고 호출부 class가 소유함
- [ ] pulse가 opacity만 바꾸며 layout geometry를 움직이지 않음
- [ ] `prefers-reduced-motion: reduce`에서 animation이 제거됨
- [ ] decorative 사용은 `aria-hidden`, loading owner는 `aria-busy` 또는 단일 status를 사용함
- [ ] Page Header와 메뉴 reference loading이 local surface 구현 없이 공용 Skeleton을 사용함
- [ ] light/dark theme에서 semantic token surface가 자연스럽게 전환됨
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm verify:guidelines` 통과

## 재현 잠금 계약

- **분류:** dependency 없는 content-feedback primitive
- **상태 소유권:** query/loading/error 상태는 소비자가 소유하고 Skeleton은 presentation만 소유
- **금지:** local pulse keyframes, local loading surface, 고정된 전역 geometry의 재구현
- **검증 기준:** native prop forwarding, semantic token, reduced-motion, 소비처 geometry를 함께 확인
