# AgentHubPickerItem — 크기와 색상

상위 Picker shell이 없는 독립 사용에도 focus 색 fallback을 제공합니다.
CSS 변수의 상속만 가정하지 않으며 같은 행 inset ring을 유지합니다.

[Picker 실측](../../references/picker.figma.json) 중 `picker/item` 네 variant의 Light mode 기준입니다.
색상과 radius는 [변수 기록](../../references/picker.variables.figma.json)에 따라 해당 component token으로 연결합니다.

## 행과 제목

| 항목 | 실측 |
| --- | --- |
| 행 | 샘플 폭758px·높이36px, 가로/세로 FIXED |
| padding | 좌우8px·상하6px |
| radius | 6px, `radius/control-md` |
| 정렬 | 가로 SPACE_BETWEEN·세로 CENTER, root itemSpacing4px |
| enabled 배경 | 투명, 실제 fills 없음 |
| hovered 배경 | 두 kind 모두 #F8F8F8 |
| 실제 border·shadow | 네 구성 모두 없음 |
| clipping | root와 leading-info 모두 false |
| leading-info | 180×20px 샘플, 행 안 x8·y8, 내부 gap8px |
| title | Pretendard SemiBold14/20px·600·자간0·#1C1C1C, 폭104px 샘플 |

title은 leading-info 안 x76이며 유형 Chip68px + gap8px 뒤에 위치합니다.
root의 `strokeWeight: 1`·`strokesIncludedInLayout: true`만 보고 실제 없는 border를 추가하지 않습니다.
36px는20px 콘텐츠를 중앙 정렬한 고정 높이 샘플이며, padding6px만 더해32px로 줄이지 않습니다.

chat의 저장 높이는36.00001525878906px, leading/model 묶음의 y는8.000007629394531px입니다.
이 정밀값은 스냅샷에 보존하며 이 표의36/8px은 비교를 위한 표시입니다. 모든 viewport에서 폭758px나 해당 소수 좌표를 강제하지 않습니다.

## 유형과 우측 정보

유형 Chip은 높이20px·radius4px·최대폭200px·좌우 padding8px·12/16px·600이며 실제 border/shadow가 없습니다.
agent는 assistant의 #EBF3FF/#3B82F6·HUG 폭68px 샘플, chat은 common-chat의 #EEEEEE/#1E232E·고정 폭68px 원본을 사용합니다.
assistant 텍스트52px는 x8, common-chat 텍스트45px는 x11.5에 있습니다. 두 유형의 폭 정책을 일괄 HUG나 고정으로 바꾸지 않습니다.

agent의 meta는12/16px·400·#757575이며 ‘전체 공개’의 샘플 폭45px, 행 안 x705·y10입니다.
공개 범위의 실제 의미·번역은 제품이 연결하며 폭45px를 고정하지 않습니다.

chat의 model-selector는104×20px 샘플, 행 안 x646·y8이며 내부 gap4px입니다.
모델 logo20px + gap4 + label60px + gap4 + chevron16px로104px가 됩니다.

- logo는20×20px·radius4px의 IMAGE RECTANGLE입니다. 별도 border/shadow는 없습니다.
- 모델 label은14/20px·400·#1C1C1C, 묶음 안 x24·y0입니다.
- chevron FRAME은16×16px·x88·y2이고 Vector는8×4px·x4·y6, 선1px·round cap/join·#757575입니다.
  모델 조작이라는 이유로 기존 IconButton의 배경·padding·radius를 추가하지 않습니다.

## 숨김 설명과 미확인 상태

description 노드는 네 구성에 존재하지만 모두 visible=false입니다. 저장된 글꼴은12/16px·400·#757575이며
TEXT property와 visible Boolean 연결이 있습니다. 숨김 노드의60×16px나 저장 좌표를 보이는 두 번째 줄·추가 간격으로 사용하지 않습니다.
show-description=true의 완성 배치·행 높이·줄 간격은 측정하지 않았습니다.

제목·모델·meta에는 원본 말줄임·줄 수 제한이 없습니다. 긴 값·설명 표시·좁은 폭에서 높이 증가·줄바꿈·정보 배치를
어떻게 바꿀지는 제품이 명시하고 별도로 검증합니다.36px 고정 clipping으로 내용을 숨기지 않습니다.
selected·pressed·focus·disabled·loading·dark·mobile의 추가 시각 값은 이 네 variant에 없습니다.

## 배경 전환 채택

[공용에서 계승한 모션](../../motion.md)에 따라 enabled 투명↔hovered `#F8F8F8`을
`background-color 200ms ease`로 양방향 전환합니다. 독립 모델 버튼이 있는 구조에서는 실제 배경을 그리는
행 wrapper에 직접 지정합니다. 투명한 내부 선택 버튼에만 지정하면 행 배경은 보간되지 않습니다.
disabled를 wrapper에도 연결해 hover를 차단하고, reduced-motion에서는 행의 전환을 해제합니다.
배경색·행 크기·radius·정보 배치는 유지하며, 이 시간은 Figma 모션 실측값이 아닌 공용 계승값입니다.

## Main action의 focus 소유권

공용 Menu와 같은 [행 단위 focus](../AgentHubPicker/styles.md#공용-menu에서-계승하는-focus)를 채택합니다.
선택용 main button에 키보드 focus가 오면 wrapper가 inset2px ring을 그리고 해당 button의 중복 outline은 제거합니다.
hover는 ring보다 우선하며 focus만으로 배경을 hover 색으로 바꾸지 않습니다. `box-shadow`도200ms ease로 전환합니다.
모델 버튼은 main action과 별도 focus를 유지합니다. Figma의 추가 variant라고 기록하지 않고 공용 계승 계약으로 구분합니다.
