# AgentHubScheduleCard — 치수와 상태

[실측](../../references/card.figma.json)의 Light 기준입니다. 폭은 부모 layout이 공급하고324px는 비교용 fixture로 사용합니다.

| 영역 | 실제 값 |
| --- | --- |
| root | 324×118px·FIXED/HUG·세로 MIN/MIN·radius24 |
| 외곽 | padding16·gap16·사방1px INSIDE·border 포함 layout·opacity1·clipping false |
| header | x17/y17·290×44px·가로 MIN/CENTER·저장 gap12 |
| info | 68×44px 샘플·HUG/HUG·세로 gap4 |
| title | 29×24px 샘플·Pretendard SemiBold16/24·600·#1C1C1C |
| meta-row | x0/y28·68×16px 샘플·가로 gap4·radius6·표면/선 없음 |
| meta/separator/meta | 28/4/28px 샘플·Regular12/16·400·#757575 |
| footer | x17/y77·290×24px·가로 space-between/MIN·저장 gap6 |
| run-status | HUG×24px·px8/py4·gap4·radius4·선/그림자 없음 |
| toggle FRAME | footer 안 x266/y0·24×24px·radius4·padding0·표면/선/그림자 없음 |

자간0입니다. title/meta/separator/status label은 ENDING/maxLines1·WIDTH_AND_HEIGHT이며 HUG 샘플입니다.
ellipsis metadata가 있어도 긴 문구의 실제 폭 제한이 검증된 것은 아닙니다. info68px·title29px를 제품 데이터의 고정 폭으로 쓰지 않습니다.
높이118 = 외곽 border2 + padding32 + header44 + gap16 + footer24입니다. 외곽 내부 폭은324−2−32=290px입니다.

| state | root 배경 | 외곽 선 | 그림자 |
| --- | --- | --- | --- |
| default | #FFFFFF | 1px #DDDDDD | 없음 |
| hovered | #F8F8F8 | 1px #DDDDDD | Mid |
| pressed | #F4F4F4 | 1px #DDDDDD | Mid |
| selected | #EBF3FF | 1px #3B82F6 | 없음 |
| disabled | #FFFFFF | 1px #DDDDDD | 없음 |

Mid는 `0 0 1px 0 rgba(9,30,66,.31)` + `0 4px 6px 0 rgba(9,30,66,.15)`입니다.
selected에 공용 Card의 inset1px를 더하지 않고 ThumbnailCard의 Overflow를 복사하지 않습니다.
root의 hover/pressed는 불투명 F8/F4이며 Session 행의 검정5%/10% overlay로 바꾸지 않습니다.

| status | run-status | status glyph14 / label | toggle glyph16 |
| --- | --- | --- | --- |
| active | 60×24px 샘플·#EEEEEE | delay·#1C1C1C / ‘label’·#1C1C1C | pause·#757575 |
| paused | 89×24px 샘플·#F4F4F4 | pause·#757575 / ‘일시 중지됨’·#757575 | circle-play·#757575 |

run-status glyph는 native16 source를 실제14×14로 재정의했으며 Vector 선0.875px·round입니다.
px8 안 x8/y5에 놓이고 label은 x26/y4·12/16·400입니다. 샘플 폭은 active16+14+4+26=60,
paused16+14+4+55=89px입니다. 실제 문자열에 맞춰 HUG하며 임의의14px 아이콘 선1px로 다시 계산하지 않습니다.
toggle glyph는16×16·FRAME 안 x4/y4·실제 선1px·round입니다.

disabled에서는 title/meta/separator/status label과 두 glyph가 #AAAAAA입니다.
active #EEE/paused #F4 run-status 표면·카드 border·opacity1은 유지합니다. 전체 자식 opacity0.4를 적용하지 않습니다.
[정확한 자산](../../references/card.assets.json)의 status/disabled별 SVG를 연결하고 부모 color로 외부 SVG stroke를 바꾼다고 가정하지 않습니다.

긴 제목·meta·상태 문구·번역·좁은 폭·focus·toggle의 독립 hover/pressed·요청 중 상태·dark·모션은 추가 제품 검증 범위입니다.
5state×2status가 이들의 모든 교차 상태를 검증한 것은 아닙니다.

## 제품 채택 완료·더보기 배치

완료 카드도 같은 padding16·radius24·제목16/24·메타12/16과 footer24px 공간을 사용합니다.
별도의 ghost Button 제목·별도 article recipe로 갈라 제목 높이·색상·간격·hover 표면이 달라지지 않게 합니다.
완료 상태는 일반 보조 텍스트로 표시하며 active/paused의 상태 glyph·chip 표면이나 pause/play button을 만들지 않습니다.
이 completed paint는 제품 채택값이며 원본의 세 번째 status 실측값이 아닙니다.

trailing action은 header의 첫24px 줄에 맞추고 콘텐츠 오른쪽 끝에 배치합니다.
외곽선 안쪽 padding16을 유지하며 제목과 action 사이8px를 확보합니다. 카드 모서리 padding 영역에
별도로 `top:10px/right:8px`를 두거나 제목 위로 겹치게 하지 않습니다. 폭이 줄어도 action24×24는 줄이지 않고 제목만 줄입니다.

주 명령의 stretched hit area는 카드 안으로 제한하고 원래 title/meta/footer 배치를 바꾸지 않습니다.
독립 action·footer button은 그 위의 hit layer에 두되 읽기용 footer 영역 전체를 가려 빈 곳의 주 명령을 막지 않습니다.
hover로 표시하는 더보기는 keyboard focus·메뉴 열림에서도 유지하고 터치 환경에서는 접근 가능한 표시 정책을 적용합니다.

## 제품 채택 독립 아이콘 버튼

하단 중지/재개는 실제 `AgentHubIconButton size=24`로 조합해 공용 ghost button의 hover 검정5%·pressed10%,
background-color·border-color·color의200ms ease와 focus-visible을 재사용합니다. glyph는 기존 pause/play 및
disabled16px 원본 SVG를 그대로 연결합니다. 카드 전용 스타일은 독립 hit layer를 위한 position·z-index·flex만 맡고
버튼 표면·focus·색상 전환을 다시 만들지 않습니다. 이는 제품 조합이며 Figma toggle FRAME이 IconButton INSTANCE였다는 뜻이 아닙니다.

상단 더보기의 기존 노출150ms opacity 전환은 공용 버튼의200ms 색상 전환과 함께 선언합니다.
`transition: opacity 150ms ease`만 쓰면 공용 transition을 덮으므로 background-color·border-color·color도 포함합니다.
카드 전체 hover와 버튼 자체 hover를 구분하고, 동작 줄이기에서는 opacity·색상 전환을 모두 해제합니다.
