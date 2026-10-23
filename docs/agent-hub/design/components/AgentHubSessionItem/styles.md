# AgentHubSessionItem — 크기와 색상

[실측](../../references/session.figma.json)의 Light mode 기준입니다.
비교 수치는 제품 semantic/component token에 연결하고 실제 Panel의 FILL 폭을 사용합니다.

| 항목 | 확인한 값 |
| --- | --- |
| standalone | 294×36px, 폭 FIXED·높이 HUG |
| 실제 Panel | 폭294px FILL·높이36px 샘플 |
| root | 가로 MIN·세로 CENTER, 사방 padding4px·gap8px |
| radius / clipping | 6px, `radius/item` / false |
| 실제 border·shadow | 없음·없음 |
| icon-box | 28×28px·r4·white, CENTER·clipping true·선/그림자 없음 |
| icon | 16×16px, box 안 x6/y6 |
| content | x40/y8, 250×20px 샘플·FILL/HUG·gap4px·clipping true |
| title | Pretendard Regular14/20px·400·자간0·#1C1C1C·FILL·ENDING/maxLines1 |
| meta | Regular12/16px·400·자간0·#757575·말줄임 제한 없음 |

28px icon-box + 상하4px로36px가 됩니다. icon-box는 별도 IconButton이 아닌 장식 FRAME이며
hover/pressed/selected에서도 white를 유지합니다. root에 저장된 strokeWeight1만 보고 실제 없는 선을 추가하지 않습니다.
component set 바깥 장식 radius5는 제품 행의 radius가 아닙니다.

| state | root 배경 | title / meta / icon |
| --- | --- | --- |
| default | 투명, fills 없음 | #1C1C1C / #757575 / #757575 |
| hovered | rgba(0,0,0,0.05) | 동일 |
| pressed | rgba(0,0,0,0.1) | 동일 |
| selected | #EBF3FF | 동일 |

hover/pressed는 `color/action/opacity-hovered`·`opacity-pressed`, selected는 `color/action/default-selected`입니다.
alpha는 부모 표면과 합성되므로 hover를 불투명 #F8F8F8, pressed를 #F4F4F4로 치환하지 않습니다.
선택에서도 title을 파랑으로 바꾸거나 Card의 선택 선·Tree의 왼쪽 막대를 추가하지 않습니다.
선택과 hover/pressed의 교차 시각은 별도 완성 시안이 없습니다.

## meta와 정확한 자산

standalone meta=false에서 title은250px 전체 폭을 사용합니다. 숨김 meta는55×16px·content 안 x195/y2에 저장돼 있지만
이 좌표·폭을 빈 공간으로 남기지 않습니다. 실제 예약 meta=true는 ‘매시간’32×16px·x218/y2,
title214px와 gap4로250px 콘텐츠를 구성합니다.55/32px는 각 문자열의 샘플이며 모든 반복 주기를 고정 폭으로 만들지 않습니다.

file-text16은 native20 source에서 표시16으로 조정한 실제 인스턴스이고 내부5개 Vector 선1.25px·round·#757575입니다.
예약 schedule16도 native20 source의 표시16·내부2개 Vector 선1.25px·round·#757575입니다.
같은 schedule 원본을 사용하더라도 UserMessage의12px·선0.75px·#555 자산과 다릅니다.
기본 [file-text16](../../assets/session/file-text-16.svg)과 [schedule16](../../assets/session/schedule-16.svg),
table/code/image까지 [자산 기록](../../references/session.assets.json)의 정확한16px 내보내기 결과를 연결하고,
source 크기나20→16 배율만으로 선 두께·색을 다시 계산하지 않습니다.

294px는 standalone/현재 Panel 샘플입니다. 긴 제목·meta·번역·좁은 폭의 배치와
focus·disabled·loading·dark·mobile·전체 icon×state 조합은 제품에서 추가 채택·검증합니다.


## 현재 채택: 말줄임표 대신 끝 흐림

원본 글꼴·색상·높이·glyph·padding과 선택 배경은 유지합니다. 제목만 한 줄 viewport와 원문 레이어로 나눕니다.
`…`를 추가하거나 원문을 자르지 않고, 실제 넘침에서만 오른쪽24px mask를 적용합니다. 이동 중 양끝, 끝에서는 왼쪽만 흐립니다.
mask와 transform은 제목에만 적용해 행 배경·focus ring·아이콘·형제 조작을 가리지 않습니다.
이는 [사용자 채택](../../title-overflow.md)이며 위 Figma 측정값을 덮어쓰지 않습니다.
