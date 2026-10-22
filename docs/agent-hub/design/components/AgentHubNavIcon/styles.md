# AgentHubNavIcon — 크기·색상·도형

각 glyph의 실제 frame은28×28px·FIXED/FIXED·radius0·opacity1·clipping true입니다.
frame에는 fill/stroke/effect가 없고 실제 glyph는 불투명 채움 #757575입니다.
저장된 strokeWeight 약1.1667은 metadata입니다. strokes가 비어 있으므로 그 두께의 외곽선을 새로 그리지 않습니다.

| glyph | 실제 채움 Vector의 x/y | 실제 채움 Vector의 폭/높이 |
| --- | --- | --- |
| home | 2.33203125 /2.33203125 | 23.33765793 /23.33308411 |
| book | 2.3359375 /4.42578125 | 23.33333397 /18.90724182 |
| clock | 2.3359375 /2.328125 | 23.33304596 /23.33333778 |
| search | 2.333984375 /2.33203125 | 23.31821632 /23.31947517 |

이 소수 좌표는 원본 비교값입니다. 제공된 전체28px SVG를 연결해 보존하며 path를 임의의 정수 좌표로 다시 만들지 않습니다.
28px frame의 빈 Vector도 별도 색상 도형이 아닙니다. 기본 fill binding은 `VariableID:3081:186`입니다.
NavItem의 neutral/selected binding은 별도이며 해석과 원본별 override는 [실측](../../references/snb.figma.json)·[변수](../../references/snb.variables.figma.json)를 따릅니다.

selected clock/home의 실제 paint는 #3B82F6입니다. 원본 set에 color state enum이 있다는 뜻은 아닙니다.
외부 SVG img는 부모 CSS color만으로 내부 fill이 바뀐다고 가정하지 않습니다. 정확한 자산 또는 검증한 semantic SVG adapter를 사용합니다.
일반 AgentHubIcon의16/20/24px glyph나 선형 아이콘을28px로 늘려 대체하지 않습니다.
추가 크기·disabled·dark·focus·전환 모션은 미측정입니다.

## 현재 채택: 원본 alpha mask의 색상 전환

위 수치와 자산은 Figma 실측입니다. 현재 구현은 같은28px neutral 원본 SVG의 alpha 도형을 한 층의 mask로 연결하고
`background-color: currentColor`로 채웁니다. `color`를 #757575↔#3B82F6 사이 `200ms ease`로 전환합니다.
home/clock의 neutral·selected 원본은 같은 path와 다른 fill이며, book/search의 선택색은 제품 채택값입니다.
이는 원본 path 재작성이나 SVG 파일 변경이 아닙니다. 이전 두 레이어 opacity 교차 방식은 이 채택으로 대체합니다.
mask·box·도형 위치와 불투명도는 고정하며 배경색 전환과 아이콘 색상 전환을 각각 확인합니다.
reduced-motion에서는 즉시 최종 색을 표시하고 forced-colors의 식별·현재 선택은 실제 host와 함께 검증합니다.
