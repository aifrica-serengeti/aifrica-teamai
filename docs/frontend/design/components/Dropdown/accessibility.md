# Dropdown — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](./README.md)

## 10. 접근성

| 항목               | 구현                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| 키보드로 열기/닫기 | Field 는 `<button>` → Tab 으로 이동, Enter/Space 로 메뉴 열기. ESC 로 닫기(Radix 기본).                                   |
| 옵션 탐색          | 메뉴 열린 상태에서 ↑/↓ 로 이동, Enter 로 선택(Radix DropdownMenu 기본).                                                   |
| ARIA               | field 에 `aria-haspopup="menu"`, `aria-invalid`(invalid 시), `aria-disabled`(disabled 시), `aria-readonly`(read-only 시). |
| 포커스 링          | 외곽 outline 링(1px `--border-focused`). 시각적으로 명확.                                                                 |
| Disabled           | 메뉴가 열리지 않음. cursor not-allowed.                                                                                   |
| Read-only          | 메뉴가 열리지 않음. 값은 읽을 수 있으나 수정 불가.                                                                        |

---

