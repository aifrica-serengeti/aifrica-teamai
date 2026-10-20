# SNB v1 — 접근성

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

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
| Focus | mouse focus가 아닌 `:focus-visible`에만 2px `var(--solution-primary)` ring |
| Tooltip | collapsed leaf의 이름을 오른쪽에 제공, delay 300ms |
| Disabled | native `disabled`, `not-allowed` cursor, opacity .5 |
| 최소 hit target | collapsed icon 32×32, header toggle 24×24, favorite 24×24 |

