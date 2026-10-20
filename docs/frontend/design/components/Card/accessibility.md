# Card — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](./README.md)

## 10. 접근성

| 항목            | 구현                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **키보드 접근** | `interactive` prop 시 `<button>`으로 렌더. Tab으로 이동, Enter/Space로 클릭.                                                                       |
| **포커스 링**   | `:focus-visible` 시 focus outline span 표시 (1px 파랑, -3px offset, radius 10px). 마우스 클릭 시에는 표시 안 함.                                   |
| **ARIA**        | `aria-disabled="true"` (disabled 상태). Icon Button에 `aria-label="더 보기"`.                                                                      |
| **히트 영역**   | Icon Button 24×24px (최소 히트 영역 확보).                                                                                                         |
| **이미지 alt**  | Thumbnail 이미지에 `alt` prop 전달.                                                                                                                |
| **요약 정보**   | Summary label과 value는 DOM 순서에서도 한 행씩 인접하게 배치한다. 생략된 값은 `title`로 전체 값을 제공한다.                                        |
| **보조 설명**   | 대표 날짜는 Description 바로 다음 DOM 순서의 SubDescription 한 줄에 두고, 말줄임 시 `title`로 전체 날짜를 제공한다. 날짜 외 정보는 Summary에 둔다. |

---
