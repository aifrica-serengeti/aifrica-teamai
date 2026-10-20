# Async Content State 검증

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 8. 검증 체크리스트

- [ ] 최초 loading에 빈 content overlay가 아닌 state card/Table loading이 보이는가?
- [ ] 모든 Detail 최초 loading이 medium Spinner, 14px/20px regular 문구, 16px gap, 최소 높이 280px인가?
- [ ] 같은 size의 Table loading이 같은 Spinner·문구 profile을 사용하는가?
- [ ] refresh 중 기존 data가 사라지지 않는가?
- [ ] 빠른 response에서도 refresh control의 loading 상태와 overlay 400ms가 인지되는가?
- [ ] List/Detail icon refresh는 최소 600ms disabled + 회전을 유지하고 overlay lifecycle과 timer를 공유하지 않는가?
- [ ] fade 중 다시 refresh하면 overlay가 끊기지 않고 복구되는가?
- [ ] Page가 요청 event에서 loading copy reason을 소유하고, 최초 loading 종료의 fade-out 중 문구를
      `새로고침 중`으로 바꾸어 두 요청처럼 보이게 하지 않는가?
- [ ] edit/saving 중 refresh action이 disabled되는가?
- [ ] Table loading과 page-level overlay가 동시에 노출되지 않는가?
- [ ] light/dark surface mix, `prefers-reduced-motion`, screen reader status를 확인했는가?

## 9. 재현 잠금 계약

- **State:** data/loading/error/refresh 권한은 page/query hook 소유. button/overlay는 controlled UI다.
- **Geometry:** overlay parent가 `position: relative`와 content height를 소유하며 Overlay는 `inset: 0`만 소유한다.
- **Detail initial loading:** `DetailLoadingState`가 state card geometry와 status owner를 소유한다.
- **Copy:** 요청 원인과 fade-out까지 유지할 문구는 page가 소유하며 Overlay는 이전 prop을 state로 복제하지 않는다.
- **Interaction:** overlay는 click을 막지 않는다. mutation-safe disable policy는 parent가 소유한다.
- **Timing:** visible 400ms, fade 240ms를 임의로 단축하지 않는다.
