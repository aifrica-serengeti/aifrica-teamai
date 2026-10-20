# Breadcrumb — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](./README.md)

## 12. 접근성

| 항목            | 스펙                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------- |
| 컨테이너        | `<nav aria-label="Breadcrumb">`                                                                    |
| 현재 페이지     | `<span aria-current="page">` (스크린 리더가 현재 위치 인식)                                        |
| 상위 depth      | `<a href>` (또는 `asChild` 로 react-router `<Link>` 합성)                                          |
| Separator       | `aria-hidden` (장식 요소, 스크린 리더에서 숨김)                                                    |
| 키보드          | Tab 으로 Item/`...` 버튼 이동, Enter 로 상위 depth 이동                                            |
| 포커스 표시     | `:focus-visible` 시 1px outline + 1px gap                                                          |
| 축약 `...` 버튼 | `aria-label="{N}개 축약된 경로 펼치기"` (축약 개수 명시)                                           |
| 축약 항목 접근  | `...` 버튼 → Menu 열기 → 화살표/Enter 로 축약된 depth 선택 (핵심: 축약으로 접근성이 훼손되지 않음) |

> **축약과 접근성**: 단순 CSS `text-overflow: ellipsis` 는 축약된 항목을 스크린 리더와
> 키보드에서 접근 불가하게 만든다. 이 컴포넌트는 항목 단위 축약 + Menu 노출로 이를 복구한다.

---

