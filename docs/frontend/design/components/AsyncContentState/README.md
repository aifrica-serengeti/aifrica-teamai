# Async Content State

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> Design System: Aifrica Design System
> 구현 컴포넌트: `DetailLoadingState`, `RefreshContentOverlay`, `useMinimumVisibleAttribute`
> 최종 갱신: 2026-09-22

Async Content State는 데이터를 처음 불러올 때와 **기존 내용을 유지한 채 다시 불러올 때**를 다르게
보여 주는 UI 계약이다. 빠른 API 응답에서도 새로고침 동작이 보이게 하고, 재조회 중 기존 화면이
깜빡이거나 사용자가 같은 요청을 반복하지 않게 한다.

상세 페이지의 최초 조회는 `DetailLoadingState`로 통일한다. 조회 상태와 요청 수명은 계속 page/query
hook이 소유하고, 공용 컴포넌트는 state card의 geometry와 접근성만 소유한다.

Header의 새로고침 trigger는 화면에 이미 채택된 `IconButton` 또는 `SplitButton`을 그대로 사용한다.
공용 계약은 trigger의 모양이 아니라 controlled `loading`/`disabled` 상태와 content overlay 수명에 있다.

---

## 문서

- [정의와 상태 모델](./definition.md)
- [시각·timing 규칙](./styles.md)
- [동작과 lifecycle](./behavior.md)
- [접근성](./accessibility.md)
- [검증·재현 잠금](./verification.md)
- [복사 가능한 원문 예시](./implementation/reference.md)
