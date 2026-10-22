# AgentHubBreadcrumb — 크기와 색상

[실측](../../references/breadcrumb.figma.json)과 [변수](../../references/breadcrumb.variables.figma.json)의 Light mode 기준입니다.

| 항목 | Agent Hub 확인값 | 공용 Breadcrumb 대비 |
| --- | --- | --- |
| Item·현재 위치 글꼴 | Pretendard Regular16/24px·400·자간0 | 공용14/20px보다 큼 |
| 경로·현재 위치 글자 | 모두 #1C1C1C, `color/text/default` | 공용 상위 경로 기본 #757575와 다름 |
| Item 라벨 정렬 | 텍스트 가로 중앙, 한 줄 | 라벨과 구분자는 별도 역할 |
| root 높이 | 24px HUG | 현재 글꼴 line box에 맞춤 |
| root·Item gap | 0px | 공용의 Item↔Separator gap8px를 중복 적용하지 않음 |
| 구분자 간격 | Separator 내부 좌우8px | 간격 소유자가 Separator로 이동 |
| 실제 배경·테두리·그림자 | 없음, radius0 | 보이는 텍스트와 구분자만 조합 |

라이브러리 component set의 보라색 경계선·radius5는 편집기 장식입니다. 화면의 Breadcrumb 외곽선이나 radius로 옮기지 않습니다.
Item의 `strokeWeight: 1`만 보고 실제 `strokes: []`인 노드에 선을 추가하지 않습니다.

slash 전체 폭315px, arrow 전체 폭313.22998046875px는 다섯 샘플 라벨의 측정값입니다.
`Link 1`41px·`Link 2`43px·`Link 3/4`각44px·`Current`55px의 합과 네 구분자 폭으로 결정되며 제품 고정 폭이 아닙니다.
별도 TextButton의 padding4px·radius4px·hover 배경을 기본값으로 추가하지 않습니다.

slash Separator는22×24px, arrow는21.557498931884766×24px이며 색은 #757575입니다.
세부 도형·좌우 여백은 [Separator 규격](../AgentHubBreadcrumbSeparator/styles.md)을 따릅니다.
arrow SVG는 전체 구분자 frame과 좌우8px 여백을 포함하므로 바깥에 padding8px나 공용 gap8px를 다시 더하지 않습니다.

두 구성은 모든 경로와 현재 위치에 같은 기본색·글꼴을 사용합니다. 이 시각 일치를 현재 페이지도 링크라는 의미로 해석하지 않습니다.
공용의 hover/pressed 밑줄·focus 의무는 유지하되 Agent Hub의 해당 상태색·dark·축약 버튼 시각 값은 이번 노드에서 확인되지 않았습니다.
