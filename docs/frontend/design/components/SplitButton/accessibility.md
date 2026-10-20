# Split Button — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](./README.md)

## 10. 접근성

| 항목                  | 스펙                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Primary action 역할   | `<button type="button">`. 스크린 리더용 `aria-label` 필수(아이콘만 있으므로)             |
| Secondary action 역할 | `<button type="button">`. 키보드 Enter/Space 로 메뉴 토글 (Radix 기본)                   |
| 메뉴 탐색             | Radix DropdownMenu — 방향키(↑↓), Home/End, Enter 선택, ESC 닫기                          |
| 포커스 관리           | 메뉴 열림 시 첫 번째 item 으로 포커스, 닫힘 시 Secondary action 으로 복원                |
| 포커스 링             | 키보드 포커스 시 `1px var(--accent-500)` outline + 1px gap (`:focus-visible`). 마우스 클릭 시 숨김 |
| ESC 닫기              | `ESC` 키로 메뉴 닫기 (Radix 기본)                                                        |
| 외부 클릭             | 메뉴 외부 클릭으로 닫기 (Radix 기본)                                                     |
| Disabled              | 양쪽 action 모두 `disabled` 속성. `cursor: not-allowed`, 포커스 불가                     |
| 키보드 순서           | Tab 으로 Primary → Secondary 순서로 이동 가능 (각각 별도 focusable button)               |

> **aria-label 필수**: Primary action 은 아이콘만 있으므로 `primaryAriaLabel` prop 으로
> 접근 가능한 이름(예: "저장")을 제공해야 한다. Secondary action 은 Label 텍스트가 이름 역할.

`menuScrollable`은 시각적 높이와 overflow만 선택한다. 어느 모드에서도 Radix의 메뉴 role,
방향키 탐색, ESC 닫기와 Secondary action으로의 포커스 복원 계약은 동일하다.

---
