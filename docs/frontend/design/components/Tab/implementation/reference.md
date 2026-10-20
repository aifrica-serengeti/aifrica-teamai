# Tab — 기타 구현 참조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](../README.md)

## 구현 내용

### 핵심 설계 원칙 (구현 전 필독)

1. **하단 인디케이터/배경은 `box-shadow inset` 으로 렌더** — `border-bottom` 을 쓰면
   상태 전환 시 height 가 1px↔2px 로 흔들린다. box-shadow 는 레이아웃에 영향 없음.
2. **Focus 는 `outline` 으로 렌더** — box-shadow 인디케이터와 독립적이라 충돌 없음.
   `outline-offset: -2px` 로 내부에 배치.
3. **Selected Chip 색상 전환은 `globalStyle` + 높은 특이성(0-4-0)** 으로 처리 —
   Chip 기본 variant 셀렉터(0-2-0)를 안정적으로 이겨야 함.

