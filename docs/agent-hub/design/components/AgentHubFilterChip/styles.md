# AgentHubFilterChip — 크기와 색상

[24종 실측 기록](../../references/filter-chip.figma.json)과 [변수](../../references/chips.variables.figma.json)의 Light mode 값입니다.
공용 Chip20/24px·px8·12/16px 글꼴과 다른 조작용 규격이며 이 범위에만 적용합니다.

## 크기

| 항목 | sm | md | lg |
| --- | --- | --- | --- |
| 높이 | 28px | 32px | 36px |
| 좌우 padding / 상하 | 10px / 0 | 12px / 0 | 14px / 0 |
| 항목 간 gap | 4px | 4px | 6px |
| radius | 9999px | 9999px | 9999px |
| 라벨 | Pretendard SemiBold14/20px·600·자간0 | 동일 | 동일 |
| 선택적 leading/trailing glyph frame | 16px | 16px | 16px |
| count 높이 / 최소폭 | 16px / 16px | 18px / 18px | 20px / 20px |
| count 좌우 padding / radius | 5px / 9999 | 5px / 9999 | 5px / 9999 |
| count 글꼴 | Inter Semi Bold10/16px·600 | Inter Semi Bold11/18px·600 | Inter Semi Bold12/20px·600 |

root는 가로HUG·세로FIXED·중앙 정렬이며 maxWidth는 미설정입니다. 라벨은 FILL·한 줄·ENDING 말줄임입니다.
공용 Chip의 maxWidth200/240px를 원본값으로 기재하지 않습니다. 제품의 긴 라벨/폭 정책은 별도로 채택합니다.
샘플 라벨폭25px·count ‘3’·글자 폭을 고정하지 않습니다. sm count는 저장된 폭17px이며 최소폭16px와 구분합니다.

## 선택과 상태색

| selected | state | 배경 | 라벨 | 실제 border |
| --- | --- | --- | --- | --- |
| false | enabled | #FFFFFF | #757575 | 1px INSIDE #DDDDDD |
| false | hovered | #F8F8F8 | #555555 | 1px INSIDE #DDDDDD |
| false | pressed | #F4F4F4 | #555555 | 1px INSIDE #DDDDDD |
| false | disabled | #FFFFFF | #AAAAAA | 1px INSIDE #DDDDDD |
| true | enabled | #EBF3FF | #1C1C1C | 없음 |
| true | hovered | #CCE0FF | #1C1C1C | 없음 |
| true | pressed | #99C2FF | #1C1C1C | 없음 |
| true | disabled | #F4F4F4 | #AAAAAA | 1px INSIDE #DDDDDD |

공용 blue-subtle의 글자 #0066FF나 유형 Chip assistant의 #3B82F6을 선택 라벨에 적용하지 않습니다.
선택 라벨은 #1C1C1C입니다. disabled의 공용 일괄 #EEEEEE 배경도 이 원본과 다릅니다.
공용 palette나 다른 Agent Hub 컴포넌트의 상태색을 전역 변경하지 않고 component semantic token에 연결합니다.

root의 `strokesIncludedInLayout: true`를 보존합니다. ‘전체’ 샘플의 미선택/disabled 폭은47/51/55px,
선택 enabled/hovered/pressed 폭은45/49/53px입니다. 실제 선 유무 때문에 내용 기반 폭이2px 달라집니다.
selected의 `strokeWeight: 1`만 보고 투명/실제 border를 추가하면 이 관계가 달라집니다.
이 관계는 Figma 관찰값으로 보존합니다. 아래 채택 변경은 선 공간을 예약하므로 이 폭 차이를 재현하지 않습니다.
[Pill Chip](../AgentHubPillChip/styles.md)의 선 제외 레이아웃과 혼동하지 않습니다.

## 숨겨진 slot의 저장 값

- count는 미선택에서 #EEEEEE 배경·#555555 글자, 선택 non-disabled에서 #3B82F6·#FFFFFF,
  disabled에서는 선택 여부와 무관하게 #EEEEEE·#AAAAAA입니다. 글꼴은 라벨의 Pretendard와 다른 Inter입니다.
- leading/trailing의 frame16px와 source 참조는 확인했지만 기본값은 숨김이고 내부 glyph paint/배치는 이 조합에서 렌더링 검증하지 않았습니다.
  source filter/16·chevron-down/16의 기존 자산은 선1px이며 실제 slot을 켠 상태색·정렬을 제품에서 확인합니다.
- 표시한 slot만 gap과 폭에 참여합니다. 숨겨진 count-label visible=true나 원본에 남은 x좌표를 phantom 자리로 만들지 않습니다.

root·count에 실제 shadow는 없습니다. focused·dark·slot을 켠 조합의 새 시각 값은 미제공이며
token 이름만으로 hover/disabled glyph 값을 추정하지 않습니다.

## 2026-10-21 채택 변경: 선택 전후 폭 유지

사용자 요청으로 모든 상태에1px border 공간을 예약합니다. 미선택과 disabled는 #DDDDDD,
선택 non-disabled는 transparent로 하여 같은 라벨·slot의 외곽 폭과 높이가 바뀌지 않게 합니다.
위의 선 없는 Figma 선택 상태와 시각은 같지만 내용 기반 폭은 미선택 기준으로2px 넓은 채택 변경입니다.
샘플47/51/55px를 일반 라벨의 고정 width로 사용하지 않습니다.
배경·선·글자색은 [모션 채택 계약](../../motion.md)의200ms ease를 사용하고 width나 padding은 전환하지 않습니다.

안쪽 count 배지도 자체 배경색·글자색에 각각 `200ms ease`를 직접 적용합니다. 부모 Chip의 `transition`은
자식에 상속되지 않으므로 부모에만 지정하면 배지 색이 즉시 바뀝니다. 선택·해제 시 `#EEEEEE`/`#555555`와
`#3B82F6`/`#FFFFFF` 사이를 양방향으로 전환하고, 별도의 count hover·pressed 색은 추가하지 않습니다.
크기·padding·위치는 고정하고, reduced-motion에서는 배지 자체의 전환도 해제합니다.
이 모션은 공용에서 계승한 채택값이며 Figma 실측값이 아닙니다.
