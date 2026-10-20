# CardAccordion — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](./README.md)

## 10. 접근성

| 항목            | 구현                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------- |
| **키보드**      | Tab 으로 Trigger 포커스 이동. Enter/Space 로 펼침/접힘 전환 (Radix 내장).                 |
| **ARIA**        | `aria-expanded="true"\|"false"` (Radix Trigger 자동 설정). `aria-disabled` (disabled 시). |
| **포커스 링**   | `:focus-visible` 시 파랑 outline 표시 (Trigger 영역만). 색: `--border-focused`.           |
| **Info icon**   | `role="img"`, `aria-label` 속성 필수.                                                     |
| **IconButton**  | Actions 내 IconButton은 `aria-label` 필수 (아이콘만 있으므로).                            |
| **Action 구조** | Actions는 Trigger의 형제로 렌더해 중첩 button을 만들지 않고 독립적인 Tab 순서를 제공한다. |
| **Title meta**  | Trigger 내부에는 비상호작용 요약만 두며 Button·Link를 넣지 않는다.                        |
| **Disabled**    | Trigger `disabled` prop + Button/IconButton `disabled` prop 전파.                         |

---
