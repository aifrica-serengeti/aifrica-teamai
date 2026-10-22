# AgentHubSessionHistoryItem — 크기와 색상

[실측](../../references/session.figma.json)의 Light mode 기준입니다. 실제 부모가 폭을 공급합니다.

| 항목 | 확인한 값 |
| --- | --- |
| standalone / 실제 Panel | 278×32px 샘플, standalone 폭 FIXED·실제 폭 FILL·높이 HUG |
| root | 가로 MIN·세로 CENTER, 좌우8px·상하6px·gap8px |
| radius / clipping | 6px, `radius/item` / false |
| 실제 border·shadow | 없음·없음 |
| title | Pretendard Regular14/20px·400·자간0·#1C1C1C |
| title 배치·넘침 | x8/y6·FILL/HUG·ENDING/maxLines1 |
| dot | 6×6px ELLIPSE·#3B82F6·선/그림자 없음·x264/y13 |

title20px+상하6px로32px가 됩니다. dot=false에서는 title 폭262px, 실제 dot=true 두 행에서는248px입니다.
후자의 산식은 좌우 padding16 + title248 + gap8 + dot6 =278px입니다.
숨김 dot의 저장 위치를 기본 행의 예약 공간으로 쓰지 않습니다. component set 바깥 radius5는 제품 행의 radius가 아닙니다.

| state | root 배경 | title |
| --- | --- | --- |
| default | 투명, fills 없음 | #1C1C1C |
| hovered | rgba(0,0,0,0.05) | 동일 |
| pressed | rgba(0,0,0,0.1) | 동일 |
| selected | #EBF3FF | 동일 |

hover/pressed는 부모 surface 위의 검정 alpha5%/10%이며 불투명 F8/F4로 치환하지 않습니다.
선택에서도 title을 파랗게 바꾸거나 border·왼쪽 선택 막대를 추가하지 않습니다.

## 원본과 실제 Panel의 alias 차이

| 역할 | standalone | 실제 Panel | 결과값 |
| --- | --- | --- | --- |
| selected 배경 | `color/element/primary-subtle` | 현재 기록 `2975:69424`의 `color/action/default-selected` override | #EBF3FF |
| dot | 숨김 노드의 `color/icon/information` | 보이는 두 dot의 `color/element/primary` override | #3B82F6 |

결과색이 같아도 alias ID와 역할을 하나로 기록하지 않습니다. 실제 source와 instance override는
[변수](../../references/session.variables.figma.json)·[조합 대조](../../references/session-composition.json)에 따라 연결합니다.

점은 [정확한6px SVG](../../assets/session/history-unread-dot-6.svg)를 장식으로 연결하거나 동일한 ELLIPSE를 표현할 수 있습니다.
파일은 전체6px 원형이며 위에 추가 border·아이콘·focus 링을 중복으로 그리지 않습니다.
색만으로 확인 상태를 설명하지 않고 접근성 문구를 함께 연결합니다.

278px·시간 제목은 샘플입니다. 긴 locale 문구·확대·좁은 폭·focus·disabled/loading·dark/mobile,
selected와 hover/pressed 교차·dot=true의 나머지 시각 조합은 제품에서 추가 채택·검증합니다.
