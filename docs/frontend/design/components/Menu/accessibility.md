# Menu — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](./README.md)

## 11. 접근성

| 항목            | 스펙                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| 역할            | `role="menu"`, `role="menuitem"` (Radix 자동)                           |
| 키보드 탐색     | ↑↓ 이동, Home/End 처음/끝, Enter 선택                                   |
| 포커스 관리     | 메뉴 열림 시 첫 item으로 포커스, 닫힘 시 trigger로 복원                 |
| 포커스 링       | 키보드 시 `inset 0 0 0 2px var(--border-primary)`, 마우스 hover 시 숨김 |
| ESC 닫기        | Radix 기본                                                              |
| 외부 클릭       | Radix 기본                                                              |
| Roving tabindex | Radix 관리                                                              |

---

