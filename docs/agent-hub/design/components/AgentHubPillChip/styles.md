# AgentHubPillChip — 크기와 색상

[5종 실측 기록](../../references/pill-chip.figma.json)의 Light mode 기준입니다.
아래 값은 이 pill Chip에만 연결하고 공용 Chip이나 Agent Hub 전체 팔레트를 바꾸지 않습니다.

## 크기와 배치

| 항목 | Agent Hub 확인값 | 공용 Chip 대비 |
| --- | --- | --- |
| 높이 | 28px, FIXED | 공용20/24px와 다름 |
| 폭 | HUG, 샘플50px | 라벨에 따라 결정, 50px 고정 아님 |
| 최대 폭 | 200px | 공용 small과 같음 |
| radius | 9999px, `radius/full` | 공용 pill10/12px와 표현·높이가 다름 |
| 패딩 | 상하4px·좌우12px | 공용 좌우8px와 다름 |
| 글꼴 | Pretendard SemiBold14/20px·600·자간0 | 공용12/16px와 다름 |
| 정렬 | 가로 MIN·세로 CENTER, 라벨 왼쪽 정렬 | 공용의 중앙 정렬과 구분 |
| 실제 테두리 | 모든 상태1px INSIDE #DDDDDD | 공용 disabled의 투명 테두리와 다름 |
| 그림자 | 모든 상태 없음 | 실제 shadow 추가하지 않음 |

현재 `text` 라벨은26×20px, root 내부 x12/y4이며 전체 폭은26+12+12=50px입니다.
Figma `strokesIncludedInLayout: false`인 inside 선을 CSS 실제 border로 더해 폭이52px가 되거나
28px 높이 안의 라벨 공간이 줄지 않게 합니다. inset/overlay 선 등 검증한 방식으로 원본의 외곽·패딩·글꼴 배치를 함께 유지합니다.
9999px는 완전한 pill 토큰 표현이며 이 높이에서 같은 모양인 radius14px를 썼다는 이유만으로 새 구현을 만들 필요는 없습니다.

root의 gap3px는 기록돼 있지만 현재 자식이 하나라 보이는 간격을 만들지 않습니다.
이를 라벨 앞뒤 여백이나 미확인 아이콘 slot으로 추가하지 않습니다.
라벨은 `textTruncation: ENDING`, `maxLines: 1`이며 제품에서 최대폭200px 안의 실제 말줄임을 확인합니다.

## 상태색

| 원본 state | 배경 | 글자 | 실제 테두리 |
| --- | --- | --- | --- |
| enabled | #FFFFFF | #1C1C1C | 1px #DDDDDD |
| hovered | #F8F8F8 | #1C1C1C | 1px #DDDDDD |
| pressed | #F4F4F4 | #1C1C1C | 1px #DDDDDD |
| selected | #FFFFFF | #1C1C1C | 1px #DDDDDD |
| disalbed | #FFFFFF | #AAAAAA | 1px #DDDDDD |

enabled와 selected의 확인된 배경·글자·테두리·치수는 같습니다. selected를 Agent Hub의 파란 선택 배경으로 바꾸거나
두 variant의 시각 일치를 근거로 실제 선택 의미도 같다고 판단하지 않습니다.
disabled로 채택한 원본 `disalbed`는 공용의 #EEEEEE 배경·투명 border 대신 흰 배경·회색 border를 유지합니다.
전체 opacity를 줄이면 원본의 배경·border까지 바뀌므로 글자색을 개별 연결합니다.

배경 변수는 `color/button/tertiary-fill`·`tertiary-fill-hovered`·`tertiary-fill-pressed`,
테두리는 `color/button/tertiary-border`입니다. 활성 라벨은 `color/text/default`, `disalbed` 라벨은
`color/button/on-tertiary-disabled`에 연결됩니다. 같은 변수값을 사용해도 이 노드를 기존 Button 인스턴스로 취급하지 않습니다.
dark·focus-visible·아이콘·제거·다른 크기는 이번 노드에서 확인하지 않았습니다.
