# AgentHubMenuItem — 크기와 상태별 색상

[실측 기록](../../references/menu.figma.json)의 Light mode 기준입니다.
[변수 기록](../../references/menu.variables.figma.json)의 semantic alias를 항목의 각 역할에 연결하고 전체 공용 테마를 바꾸지 않습니다.

## root와 명령 영역

| 항목 | 실측 |
| --- | --- |
| standalone root | 폭160px FIXED·높이28px HUG, 세로 배치·padding0·gap0 |
| content | 폭 FILL·높이28px HUG, 가로·세로 CENTER·gap8px |
| content padding | 왼쪽16px·오른쪽12px·상하4px |
| radius | root·content 모두0 |
| 실제 border·shadow | 없음·없음 |
| clipping | root false, content true |
| label | Pretendard Regular14/20px·400·자간0, FILL 폭132px 샘플·x16/y4 |
| label 넘침 | ENDING·maxLines1, 한 줄 말줄임 |

content의20px label + 상하 padding8px로28px가 됩니다.160px는 standalone 폭이며 부모 Menu의 실제 내부 폭에 맞춰 연결합니다.
저장된 `strokeWeight: 1`만 보고 실제 `strokes: []`인 항목에 선을 추가하지 않습니다.
공용 small의28px·왼쪽16px·gap8은 같지만 오른쪽은 공용16px 대신12px입니다. 공용 header32px·label 색상·divider 여백도 그대로 상속하지 않습니다.

## 상태와 역할별 paint

| type·state | content 배경 | label·edit·check | value·chevron |
| --- | --- | --- | --- |
| default·enabled | 투명, fills 없음 | #1C1C1C | #757575 |
| default·hovered | #F8F8F8 | #1C1C1C | #757575 |
| default·pressed | #F4F4F4 | #1C1C1C | #757575 |
| default·disabled | 투명, fills 없음 | #AAAAAA | #AAAAAA |
| destructive·enabled | 투명, fills 없음 | #D00A0A | #757575 |
| destructive·hovered | #F8F8F8 | #D00A0A | #757575 |
| destructive·pressed | #F4F4F4 | #D00A0A | #757575 |
| destructive·disabled | 투명, fills 없음 | #AAAAAA | #AAAAAA |

value와 아이콘의 표는 **숨김 노드에 저장된 paint**입니다. 현재 노출된 상태로 검증했다는 뜻은 아닙니다.
destructive도 hover/pressed 배경은 중립색이며 value/chevron까지 빨갛게 만들지 않습니다.
disabled를 전체 opacity로 처리하지 않습니다. 숨김 header label은 모든 상태에서 #1C1C1C, divider 선은 #DDDDDD로 남아 있습니다.

## 선택 slot과 계산 범위

- edit·check·chevron은16px box·실제 Vector 선1px·round cap/join입니다. edit 인스턴스 root에 저장된0.8px만 보고 Vector의 실제1px 선을 바꾸지 않습니다.
- value는12/16px·400이고 숨김 샘플29×16px입니다. 표시를 켠 제품의 실제 문구를29px에 고정하지 않습니다.
- section-header는 숨김 FRAME의 폭160px·높이28px, padding top8/bottom4/left16/right12입니다.
  텍스트12/16px·600·#1C1C1C로, 높이는8+16+4=28px입니다.
- divider는 숨김 FRAME의 상하 padding4px + 1px #DDDDDD line으로9px입니다. 가로 padding은0입니다.

header와 divider의 자식 label/line은 visible=true여도 조상 false 때문에 보이지 않습니다.
실제 기본 root 높이는28px입니다. header28 + content28 + divider9 =65px는 세 branch를 모두 켠 경우의 계산이며,
해당 조합을 별도 렌더링해 측정한 높이로 기록하지 않습니다. 숨김 값·아이콘의 모든 교차 조합도 미검증입니다.

focused·selected·checked·loading·dark와 긴 label/좁은 화면의 추가 시각은 제공되지 않았습니다.
focus·비활성·명령 의미는 유지하고 제품이 채택한 추가 표현을 별도 검증합니다.

## 배경 전환 채택

[공용에서 계승한 모션](../../motion.md)에 따라 명령 content의 배경을 `200ms ease`로 전환합니다.
투명↔hover `#F8F8F8`과 기존 pressed `#F4F4F4`의 진입·이탈에 `background-color`를 지정합니다.
header/divider를 포함한 group이나 부모 popup에만 transition을 두지 않습니다. 실제 배경을 그리는 content가 소유합니다.
disabled hover 차단·destructive의 중립 배경·행 크기를 유지하고 reduced-motion에서는 전환을 해제합니다.
이 시간은 Figma 모션 실측값이 아닌 공용 계승값이며, 부모 Menu의 열림·닫힘150ms와 별개입니다.

## 공용 focus와 hover 우선순위

공용 Menu(`DOCS_ROOT/frontend/design/components/Menu/styles.md`, 공용 묶음 선택 시)의 `data-highlighted:not(:hover)` 정책을 계승합니다.
키보드로 강조된 행은 배경을 hover 색으로 바꾸지 않고 content 안쪽에2px focus ring만 표시합니다.
primitive의 highlighted 또는 단일 선택 adapter의 실제 active target에 연결하며, native 버튼에서는 `:focus-visible`을 사용할 수 있습니다.
원래 outline과 inset shadow가 겹치지 않게 명령 host의 outline을 제거하고 기본 shadow는 투명 inset2px로 예약합니다.
이 제거 규칙은 hover 중에도 유지하고, 앱의 전역 `button:focus-visible`·`[tabindex]:focus-visible`보다 우선해야 합니다.
컴포넌트 CSS 뒤에 전역 CSS가 로드되는 경우에도 명시도나 cascade layer로 한 곳의 focus 소유권을 보장합니다.
같은 행에 pointer가 있으면 hover 배경을 우선하고 ring을 숨깁니다. disabled는 hover·ring·실행을 모두 차단합니다.
글자색과 `box-shadow`도200ms ease로 전환하며, reduced-motion에서는 즉시 표시합니다.
forced-colors에서는 shadow 대신 시스템 Highlight 색의2px 내부 outline을 사용합니다.
선택 값과 현재 탐색 target은 별개이며 기존 선택 배경·명령 의미는 그대로 유지합니다. focus 색·교차 상태는 Figma 실측이 아닙니다.
