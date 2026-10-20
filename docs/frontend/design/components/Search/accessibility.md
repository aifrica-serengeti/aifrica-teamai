# Search — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](./README.md)

## 10. 접근성

| 항목                    | 구현                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Label 연결**          | `<label htmlFor={id}>` 로 input 과 명시적 연결. id 필수                                                     |
| **키보드**              | Tab 으로 input focus 이동. Disabled 는 focus 불가(HTML 표준)                                                |
| **Focus 표시**          | 2px 파란 링(enabled). Input 스펙 상속                                                                       |
| **Search icon**         | `aria-hidden`(장식용). label 이 의미 전달                                                                   |
| **Close button 라벨**   | `aria-label="검색어 지우기"` 필수                                                                           |
| **Close button 포커스** | `tabIndex={-1}` — input 다음으로 Tab 이동하지 않고, 마우스/터치로만 조작. 값 지운 뒤 input 으로 포커스 복귀 |
| **Input type**          | `type="text"` + `inputMode="search"` — 모바일 키보드 힌트                                                   |

---

