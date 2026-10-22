# AgentHubProgressAlert — 크기와 색상

아래는 [단일 시안 실측](../../references/progress-alert.figma.json)의 Light mode 기준입니다.
semantic alias와 mode는 [변수 기록](../../references/progress-alert.variables.figma.json)에 보존합니다.
색상·radius는 제품의 해당 component token에 연결하며 공용 전체 테마를 바꾸지 않습니다.

## 외곽과 안내 그룹

| 항목 | 실측 |
| --- | --- |
| 외곽 | 640×46px, 가로 FIXED·세로 HUG |
| surface | #F4F4F4, `color/surface/default-subtler` |
| border | 1px INSIDE #DDDDDD, `color/border/default` |
| radius | 8px, `radius/surface-xs` |
| padding | 좌우 12px·상하 8px |
| 배치 | 가로·SPACE_BETWEEN·세로 CENTER, 최소 gap 12px, NO_WRAP |
| clipping·shadow | root `clipsContent: false`, 실제 shadow 없음 |
| 안내 그룹 | root 기준 x13·y13, 샘플 153×20px, 아이콘↔제목 gap4px |
| 아이콘 | 20×20px, native 원본, 선1.25px·round cap/join·#1C1C1C |
| 제목 | Pretendard SemiBold 14/20px·600·자간0·#1C1C1C, 샘플 폭129px |

root의 `strokesIncludedInLayout: true` 때문에 실제 자식 시작점은 padding12px에 border1px을 더한 x13px입니다.
가장 높은 자식28px + 상하 padding16px + 상하 border2px로 샘플 높이46px가 됩니다.
`gap12`는 두 그룹 사이의 최소 간격이며, SPACE_BETWEEN으로 생긴 실제 남는 공간을 12px로 고정하지 않습니다.

## 버튼 그룹

동작 그룹은 root 기준 x462·y9, 165×28px이며 두 버튼 사이 gap은8px입니다.
아래 폭은 라벨 길이에 따른 HUG 샘플로, 번역·제품 문구가 달라져도 고정하는 값이 아닙니다.

| 항목 | 다시시도 | 프롬프트 편집 |
| --- | --- | --- |
| 버튼·label 폭 | 65px·49px | 92px·76px |
| 그룹 안 x | 0px | 73px |
| 공통 높이·radius | 28px·4px | 28px·4px |
| padding·gap | 좌우8px·상하4px·gap4px | 좌우8px·상하4px·gap4px |
| label | Pretendard SemiBold 14/20px·600·자간0·#1C1C1C | 동일 |
| surface·선 | #FFFFFF·1px INSIDE #DDDDDD | 동일 |

두 버튼은 [AgentHubButton](../AgentHubButton/README.md)의 tertiary·28·enabled와 같습니다.
실제 `strokesIncludedInLayout`은 **false**이므로 label49/76px + 좌우 padding16px가 그대로65/92px가 됩니다.
높이도 line-height20px + 상하 padding8px인28px입니다. 레이아웃에 border2px를 추가해 폭67/94px·높이30px로 만들지 않습니다.
기존 버튼의 inside border 표현을 재사용하거나 레이아웃을 차지하지 않는 선 레이어를 연결합니다.
root의 실제 CSS border와 버튼의 inside 선 표현을 같은 방식으로 일괄 처리하지 않습니다.

원본 자식 label에는 실제 strokes가 없습니다. 저장된 `strokeWeight`만 보고 글자 외곽선이나 border를 추가하지 않습니다.
버튼과 그룹에도 실제 shadow가 없고, leading/trailing/keycap으로 생기는 폭·간격도 없습니다.

## 확인하지 않은 배치

640px 폭·46px 높이·자식 좌표는 이 샘플의 기준입니다. 좁은 폭·긴 제목·긴 번역에서 제목과 동작 그룹을
어떻게 줄바꿈하거나 다음 행으로 옮길지는 제품이 명시하고 검증해야 합니다. 제목을 잘라내거나 버튼을 눌러 줄이지 않습니다.
버튼은28px 높이와 `flex-shrink: 0`을 유지하고, 필요하면 그룹 전체의 줄바꿈 등 제품이 채택한 별도 배치를 사용합니다.

현재 중단 안내의 hover·pressed·focus·disabled·loading 조합과 dark는 측정하지 않았습니다.
실제 버튼 자체의 기본 상태는 AgentHubButton 계약에 연결하되, 이 시안의 추가 상태까지 검증됐다고 기록하지 않습니다.
