# Tooltip — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](./README.md)

## 9. 접근성

| 항목        | 구현                                                                |
| ----------- | ------------------------------------------------------------------- |
| 트리거      | `TooltipTrigger asChild`로 의미 요소(button/icon)를 직접 래핑       |
| 키보드      | Tab으로 트리거 focus 시 툴팁 표시 (Radix 기본 동작)                 |
| 키보드 닫기 | Esc 키 또는 포커스 이탈 시 닫힘                                     |
| ARIA        | Radix가 `aria-describedby` 자동 설정. 화살표는 `aria-hidden="true"` |
| 지연        | `delayDuration`으로 hover 후 표시까지의 지연 제어 (기본 0ms)        |
| 화면 확대   | Portal + Radix collision detection으로 viewport 밖으로 안 나감      |

Tooltip은 accessible name의 유일한 출처가 아니다. icon-only trigger는 자체 `aria-label`을 가지며
Tooltip에는 같은 핵심 동작명을 쓴다. Page Header처럼 화면 맥락이 명확한 곳은 Tooltip을 `새로고침`,
`수정`, `삭제`로 짧게 유지하고, `aria-label`에는 필요할 때 대상명을 더할 수 있다. pending 중에도
name/content를 안정적으로 유지하고 진행 상태는 `aria-busy` 또는 별도 live region으로 전달한다.

---
