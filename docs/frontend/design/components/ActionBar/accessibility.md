# Action bar — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](./README.md)

## 9. 접근성

| 항목 | 스펙 |
| --- | --- |
| 키보드 탐색 | Tab 으로 Action / Icon button 간 이동 |
| 활성화 | Enter / Space 로 실행 (`<button>` 요소 사용) |
| 포커스 표시 | `:focus-visible` 시 1px gap 떨어진 1px `var(--accent-500)`(dark: `var(--accent-400)`) outline |
| 비활성 | `disabled` 속성 + `aria-disabled`. `pointer-events: none` |
| Icon button 라벨 | `aria-label` 필수 (시각적 텍스트 없음) |
| Divider | `role="separator"` + `aria-orientation="vertical"` |
| 히트 영역 | Action 32px 높이 / Icon button 32×32 — 최소 히트 영역 확보 |

---

