# AgentHubFileItem — 치수·배치·선·색상

[실측](../../references/card.figma.json)의 Light 단일 샘플 기준입니다.

| 항목 | 확인한 값 |
| --- | --- |
| root | 512×68px·폭 FIXED/높이 HUG·가로 MIN/CENTER |
| padding·gap | 왼쪽12·오른쪽16·상하12px·gap12px |
| 표면·radius | white, `color/action/default`·radius12 |
| 실제 선·효과 | INSIDE1px #DDD·shadow 없음 |
| border layout / clipping | strokesIncludedInLayout=false / false |
| FileIcon | x12/y12·44×44·radius6·clipping true |
| info | x68/y14·331×40px·FILL/HUG·세로 gap0·clipping false |
| 다운로드 버튼 | x411/y20·85×28px·HUG/FIXED·radius4 |

68=padding12+타일44+padding12이고512=좌우padding28+타일44+gap12+info331+gap12+버튼85입니다.
root의 inside 선은 layout에 포함되지 않습니다. 실제 CSS border를 기본 흐름에 더해70px 높이나 추가2px inset을 만들지 않습니다.
512px는 독립 비교 폭이고 원본 설명의 부모 FILL 의도에 따라 실제 소비 제품에서 가변 폭을 검증합니다.

## 파일 타일과 텍스트

spreadsheet 타일은 #079455·선1px #EEE·r6, sheet44×44·r6·white→#E9E9E9 gradient입니다.
sheet의 raw 위치는 타일 외곽 기준 x8/y8이며 glyph24는 sheet 안 x5/y5·선1.5px·#079455입니다.
생성 context의 CSS left/top7px는 border 안쪽 좌표 표현과 구분합니다. raw의8px를 실제7px override로 바꿔 기록하지 않습니다.
완성 FileIcon 자산을 쓸 때 타일·sheet·glyph를 CSS로 중복 조립하지 않습니다.
현재 spreadsheet는 [기존44px 완성 SVG](../../assets/files/spreadsheet.svg)를 그대로 연결할 수 있습니다.

title은 Pretendard SemiBold14/20px·600·자간0·#1C1C1C·FILL·ENDING/maxLines1입니다.
meta는 title 아래 y20에 놓이며 file-type은 Regular14/20·400·#555, extension은 같은 글꼴·#8F8F8F입니다.
둘은 HUG·truncation DISABLED·maxLines 없음입니다.

## meta의 음수 간격과 두 선

meta는 HUG123×20px이며 **itemSpacing=-4px**입니다. 기본 표시의 좌표는 다음과 같습니다.

| 요소 | meta 안 위치·크기 |
| --- | --- |
| file-type | x0/y0·53×20px |
| Vertical Divider 전체 | x49/y6·17×8px, 좌우 padding8px |
| 실제 Divider 선 | Divider 안 x8/y0·1×8px·#DDD |
| extension | x62/y0·61×20px |

53+17+61−4×2=123px입니다. 전체 Divider17px에는 좌우 padding8이 포함되므로 별도 px8을 또 더하지 않습니다.
CSS에서는 [구현 안내](./implementation.md)의 양수 간격 adapter로 같은 텍스트·선 좌표를 연결합니다.
17px wrapper와 음수 간격을 모든 메타 항목에 복제하지 않습니다.

숨김 file-size는12/16px·400·#555·43×16px 샘플입니다.
같이 숨겨진 size-divider는 VECTOR0×10px·stroke CENTER1px #AAA·opacity1·저장 x0/y3입니다.
현재 둘 다 false여서 폭·선·여백을 남기지 않습니다. size=true의 완성 배치는 별도 검증합니다.
제공된 [size-divider SVG](../../assets/cards/file-size-divider-1x10.svg)는 보이는 선의1×10px 영역이며 raw VECTOR의0폭 frame과 구분합니다.

## 2026-10-21 채택 보강: 용량 표시와 겹침 방지

`size=true`는 숨김 원본의 위치를 그대로 켜는 대신 다음 레이아웃을 채택합니다. Figma 실측 JSON은 변경하지 않습니다.

- 용량+용량 구분선과 파일 종류+Divider+확장자를 각각 한 그룹으로 배치합니다. 그룹 내부와 그룹 사이 간격은4px입니다.
- 용량 구분선은 제공된1×10px SVG에 **실제1px 흐름 폭**을 예약합니다. 폭0 wrapper·절대 위치·음수 margin으로 다음 글자를 당기지 않습니다.
- 종류/확장자 구분선도 흐름 폭1px에 양쪽 gap4px을 사용합니다. 기존 기본형의 `53+4+1+4+61=123px`와
  실제 선 x57·확장자 x62를 유지하는 CSS adapter이며, 원본 wrapper17px/padding8px 실측을 수정한 것이 아닙니다.
- meta는 info 폭 안으로 제한합니다(`min-width:0; max-width:100%`). 좁으면 그룹 단위로 줄바꿈하고 행 높이는 HUG로 늘립니다.
  각 그룹도 남은 폭을 넘지 않게 하며, 긴 개별 값은 한 줄 말줄임하되 원문은 DOM과 title에 유지합니다.
- 파일명·용량·종류·확장자가 다운로드 영역을 침범하지 않게 합니다. 다운로드는 축소하지 않으며,
  좁은 화면에서 다음 행으로 보내는 제품 배치를 채택하면 카드 높이를 함께 늘립니다.
- `size=false`에서는 용량 그룹 전체를 제거해 구분선·여분 간격을 남기지 않습니다. 기본형의68px 높이·타일44px·버튼28px은 유지합니다.

이는 용량 표시 조합의 구현 보강입니다. 원본에서 제공되지 않은 상태·색상·모션을 새로 측정했다고 표시하지 않습니다.

## 다운로드 버튼

기존 [AgentHubButton](../AgentHubButton/styles.md)의 tertiary28을 연결합니다.
배경 white·inside1px #DDD·padding 좌우8/상하4·gap4·label14/20/600/#1C1C1C, 선은 layout 미포함입니다.
label49+gap4+chevron16+px16=85px, label20+py8=28px이며 CSS border 때문에87×30px로 늘리지 않습니다.
chevron은 버튼 안 x61/y6·Vector8×4/x4y6·**선1px**·round·#1C1C1C입니다.
버튼의 명시20 변수 mode나 설명의1.25만으로 실제 chevron 선을 바꾸지 않습니다.

root hover/pressed/selected/disabled·button 숨김·size 표시·긴 메타·다른 타일 조합·dark/mobile의 추가 Figma 시안은 확인되지 않았습니다.
위 용량 표시·긴 메타 레이아웃은 별도 채택 계약이며, 소비 제품의 source/export와 다운로드 동작은 그 제품에서 검증합니다.
각 역할의 실제 token·자산은 [변수](../../references/card.variables.figma.json)와 [자산](../../references/card.assets.json)을 따릅니다.
