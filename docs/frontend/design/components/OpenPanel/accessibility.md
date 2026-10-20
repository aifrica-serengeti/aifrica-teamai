# Open panel — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](./README.md)

## 10. 접근성

| 항목          | 스펙                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| 역할          | Radix Dialog 기반 — `role="dialog"`, `aria-modal="true"` 자동 설정                    |
| 포커스 트랩   | 패널 열림 시 포커스가 패널 내부로 이동, Tab 순환이 패널 내에 갇힘                     |
| 포커스 복원   | 패널 닫힘 시 trigger 요소로 포커스 복원                                               |
| 키보드 닫기   | `ESC` 키로 패널 닫기 (Radix 기본)                                                     |
| 닫기 버튼     | `aria-label="패널 닫기"` (Icon Button)                                                |
| Resize handle | `role="separator"`, `aria-orientation`, `aria-label="패널 크기 조절"`, `tabIndex={0}` |
| Scrim 클릭    | Overlay 타입에서 scrim 클릭으로 닫기 (`modal=true` 시)                                |

---

