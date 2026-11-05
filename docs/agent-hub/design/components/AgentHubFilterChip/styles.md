# AgentHubFilterChip — 크기와 색상

아래 역사 표는 [2026-10-20 실측 기록](../../references/filter-chip.figma.json)과 [변수](../../references/chips.variables.figma.json)의 Light mode 값입니다.
2026-11-05 metadata·생성 context의 변경은 다음 별도 절에서 구분합니다.
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

### 2026-11-05 확인: 상태별 토큰 연결

[토큰 변경표](../../references/tokens.figma.json)의 `3478:22817`·`3478:22846`·`3478:22875`는
다음 alias를 추가합니다. resolved 색은 위의 기존 Light 실측과 같으며 sm·md·lg에 공통으로 적용합니다.

| selected / state | semantic token | 변경표의 primitive alias | resolved 색 |
| --- | --- | --- | --- |
| false / disabled | `color/action/default-disabled` | `Monochrome/white` | #FFFFFF |
| true / hovered | `color/action/default-selected-hovered` | `blue/100` | #CCE0FF |
| true / pressed | `color/action/default-selected-pressed` | `blue/200` | #99C2FF |

`color/action/default-disabled`의 적용 대상은 미선택 disabled입니다. 선택된 disabled의 기존 `#F4F4F4` 배경까지
흰색으로 바꾸지 않습니다. [resolved 기록](../../references/tokens.variables.figma.json)과
[토큰 foundation](../../foundations/Tokens.md)에서 확인 범위를 읽고, 과거24종 실측·변수 JSON은 원본 근거로 보존합니다.

과거 스냅샷의 `strokesIncludedInLayout: true`를 역사 근거로 보존합니다. 당시 ‘전체’ 샘플의 미선택/disabled 폭은47/51/55px,
선택 enabled/hovered/pressed 폭은45/49/53px입니다. 실제 선 유무 때문에 내용 기반 폭이2px 달라집니다.
selected의 `strokeWeight: 1`만 보고 투명/실제 border를 추가하면 이 관계가 달라집니다.
이 관계는 Figma 관찰값으로 보존합니다. 아래 채택 변경은 선 공간을 예약하므로 이 폭 차이를 재현하지 않습니다.
[Pill Chip](../AgentHubPillChip/styles.md)의 선 제외 레이아웃과 혼동하지 않습니다.

## 숨겨진 slot의 저장 값

- count는 미선택에서 #EEEEEE 배경·#555555 글자, 선택 non-disabled에서 #3B82F6·#FFFFFF,
  disabled에서는 선택 여부와 무관하게 #EEEEEE·#AAAAAA입니다. 글꼴은 라벨의 Pretendard와 다른 Inter입니다.
- leading/trailing은 기본 숨김이며 slot을 켠 실제 배치·클리핑·상태 조합의 렌더링은 별도 검증합니다.2026-11-05 MCP 조건식이 참조한 exact SVG8개의 native16px·선1px·상태별 paint는 아래 표처럼 확인했습니다. 숨김 slot의 렌더링 확인과 반환 파일의 도형/색 확인을 구분합니다.
- 표시한 slot만 gap과 폭에 참여합니다. 숨겨진 count-label visible=true나 원본에 남은 x좌표를 phantom 자리로 만들지 않습니다.

root·count에 실제 shadow는 없습니다. focused·dark·slot을 켠 조합의 추가 배치·focus 시각은 미제공입니다. 아래 glyph 색은 token 이름으로 추정하지 않고 실제 반환 SVG와 조건식을 대조한 값입니다.

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

## 2026-11-05 metadata와 생성 context의 구분

최신 metadata에서는 같은24개 source의 ‘전체’ 샘플 외곽 폭이 선택·상태에 관계없이 sm45/md49/lg53px이고,
높이는 여전히28/32/36px입니다. 과거 미선택/disabled의47/51/55px와 구분합니다. 이 폭은 예시 글자의 결과이므로 고정 width가 아닙니다.
생성 context의 좌우 padding은10/12/14px, 상하 padding은4/6/8px로 표현됩니다.
이 코드는 native layout getter 결과가 아니며 `strokesIncludedInLayout`의 현재 값을 확인한 근거가 아닙니다.
생성 코드의 border·상하 padding을 자동 높이로 그대로 합쳐30/34/38px로 키우지 않습니다.
제품은 확인한 외곽28/32/36px를 유지하고 기존1px border 공간 예약·선택 시 transparent·색상200ms 전환을 유지합니다.
과거 제품 채택의 기준 폭이2px 넓었다는 설명을 최신 Figma의2px 상태 변화로 오해하지 않습니다.
현재 native flag는 미수집이며 추후 실측 전에는 과거 flag를 현재 값으로 덮어쓰지 않습니다.

## 2026-11-05 optional glyph의 실제 상태색

| selected | state | leading/trailing SVG paint | label |
| --- | --- | --- | --- |
| false | enabled | #757575 | #757575 |
| false | hovered / pressed | #555555 | #555555 |
| true / false | disabled | #AAAAAA | #AAAAAA |
| true | enabled / hovered / pressed | #3B82F6 | #1C1C1C |

선택 non-disabled의 filter·chevron은 파란색이고 label은 검정이므로 glyph를 label의 `currentColor`로 무조건 묶지 않습니다. source filter/chevron 모양과 native16px·선1px를 보존하고, 상태별 전용 파일 또는 검증된 glyph 전용 color adapter에 연결합니다. label·count·glyph가 같은 역할의 token이라는 뜻은 아닙니다.

[현재 관찰](../../references/existing-components-refresh.figma.json)의 optionalGlyphPaint는 MCP의 조건식과 exact SVG8개의 source asset/path를 연결합니다. label과 달리 glyph paint의 native variable ID·alias binding은 이번 자료로 확정하지 않습니다. 다른 swap glyph의 상태색도 이 예시에서 자동 상속했다고 주장하지 않습니다.
