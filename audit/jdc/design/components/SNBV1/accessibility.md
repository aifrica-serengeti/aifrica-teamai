# SNB v1 — 접근성

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](README.md)

## 10. 접근성

| 항목 | 요구사항 |
| --- | --- |
| Landmark | Shell은 `<aside aria-label="Side navigation">`, 각 mode navigation은 고유 label |
| 메뉴 item | native `<button>` 사용. button 중첩 금지; favorite은 sibling button |
| 현재 위치 | active leaf에 `aria-current="page"` |
| 부모 item | `aria-expanded` |
| 숨긴 subtree | 닫힌 panel은 `aria-hidden="true"` + `inert` |
| Favorite | `aria-label`은 추가/해제, `aria-pressed` 설정 |
| Focus | mouse focus가 아닌 `:focus-visible`에만 2px `#0066ff` ring |
| Tooltip | collapsed leaf의 이름을 오른쪽에 제공, delay 300ms |
| Disabled | native `disabled`, `not-allowed` cursor, opacity .5 |
| 최소 hit target | collapsed icon 32×32, header toggle 24×24, favorite 24×24 |

