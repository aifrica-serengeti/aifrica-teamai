# Async Content State 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 6. 접근성

- visible overlay root는 `role="status"`, `aria-live="polite"`; Spinner SVG는 `aria-hidden`이다.
- label은 “최신 정보를 불러오는 중입니다.”처럼 사용자가 이해할 도메인명으로 만든다.
- refresh control은 loading 여부에 맞는 접근 가능한 이름과 disabled 상태를 가진다. IconButton이면 Tooltip을 함께 사용한다.
- revalidation은 기존 content를 유지하므로 focus를 강제로 옮기지 않는다.
- initial error와 loading은 state card/Table에서 별도 `role="alert"`/`role="status"`로 나타낸다.
- `DetailLoadingState`와 Table loading은 부모 하나만 `role="status"`와 읽을 문구를 소유하고, 내부 Spinner는 decorative로 숨긴다.
- 같은 조회에 page overlay와 Table status를 동시에 노출하지 않는다.
