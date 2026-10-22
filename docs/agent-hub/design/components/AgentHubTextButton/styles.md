# AgentHubTextButton — 크기와 색상

[실측 기록](../../references/text-button.figma.json)의 Light mode 기준입니다.
공용 TextButton을 전역 변경하지 않고 Agent Hub에서 사용하는 tiny 조합에 연결합니다.

| 항목 | Agent Hub | 공용 tiny와 비교 |
| --- | --- | --- |
| 높이 | 24px | 동일 |
| 폭 | 콘텐츠 기준 HUG, 현재 예시48px | label·slot에 따라 결정 |
| radius | 4px (`radius/control-sm`) | 동일 |
| 패딩 | 사방4px | 동일 |
| label–icon 간격 | 2px | 동일 |
| 글꼴 | Pretendard SemiBold, 600, 12/16px, 자간0 | 동일 |
| 보이는 trailing icon | 16×16px, 선1px | 공용 tiny의 아이콘14px·선1.25px와 다름 |
| 실제 테두리·그림자 | 없음 | 동일 |

label과 아이콘을 가로·세로 중앙 정렬하고 한 줄로 표시합니다.
아이콘 source는 arrow-right/16이며 round cap/join을 유지합니다.
공용의 14px glyph로 축소하거나 부모 CSS에서 선을 1.25px로 일괄 보정하지 않습니다.

| state | 배경 | label·보이는 아이콘 | 외곽선 |
| --- | --- | --- | --- |
| enabled | 투명 | #1C1C1C | 없음 |
| hovered | #F8F8F8 | #1C1C1C | 없음 |
| pressed | #F4F4F4 | #1C1C1C | 없음 |
| disabled | 투명 | #AAAAAA | 없음 |

상태색은 공용 라이트 baseline과 같습니다. 앞서 추가한 AgentHubButton secondary의 파랑 채움이나
tertiary의 외곽선을 이 TextButton에 적용하지 않습니다. root에 strokeWeight1이 있어도 `strokes: []`이므로 선은 없습니다.
제품에서는 label과 아이콘을 같은 semantic 상태색에 연결하고, disabled를 전체 opacity만으로 표현하지 않습니다.

원본 배경 변수는 `color/button/tertiary-fill-hovered`, `tertiary-fill-pressed`,
label은 `color/button/on-tertiary`, `on-tertiary-disabled`입니다. glyph 바인딩은 별도 icon token일 수 있으므로
정확한 alias는 [변수 기록](../../references/switch-text.variables.figma.json)을 확인합니다.
다크·focus·loading·긴 label 말줄임 정책은 이 노드에서 확인하지 않았습니다.
