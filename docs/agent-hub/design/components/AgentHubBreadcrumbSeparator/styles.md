# AgentHubBreadcrumbSeparator — 크기와 색상

[실측](../../references/breadcrumb-separator.figma.json)의 Light mode 값입니다.
원본 부모 컨테이너가 좌우 여백을 소유하며 전체 Breadcrumb의 root·Item gap은0px입니다.

| 유형 | 전체 frame | 내부 도형·텍스트 | 내부 위치 |
| --- | --- | --- | --- |
| slash | 22×24px | `/`, 6×24px | x8/y0 |
| dash | 24×24px | `–`, 8×24px | x8/y0 |
| arrow | 21.557498931884766×24px | vector5.557499885559082×9px | x7.999999523162842/y7.5 |

공통 padding은 좌우8px·상하0, 가로 HUG, radius0입니다. 세로는 slash·dash가 HUG, arrow가 FIXED이며 높이는 모두24px입니다.
실제 bg·border·shadow는 없습니다.
component set의 보라색 border·radius5는 편집기 장식이며 화면 스타일에 포함하지 않습니다.
기록된 gap10px는 자식이 하나인 각 frame 안에 추가 여백을 만들지 않습니다.

slash·dash는 Pretendard Regular16/24px·400·자간0입니다. 공용 Breadcrumb의14/20px·구분자 #8F8F8F와 달리
세 유형 모두 #757575, `color/text/default-subtler`를 사용합니다. arrow는 이 색상의 채운 도형이며 실제 stroke가 없습니다.
글자나 도형에 남은 strokeWeight만 보고 border·외곽 stroke를 추가하지 않습니다.

## Arrow 자산과 간격

[separator-arrow.svg](../../assets/breadcrumb/separator-arrow.svg)는 전체21.5575×24px frame으로 export돼 있습니다.
SVG 안에 이미 vector의 위치와 좌우8px 여백이 들어 있습니다. 전체 SVG를 다시 px8 wrapper로 감싸거나,
공용 Breadcrumb의 gap8px를 양쪽에 더하면 원본보다 넓어집니다.

원본 frame의 소수점 치수와 SVG의 export 정밀도를 보존합니다. 이를 임의의16px·20px 아이콘 box로 맞추거나
vector를 full-frame 크기로 늘리지 않습니다. 공용 slash의14px 글꼴·바깥 gap 배치와 혼합하지 않습니다.

자동 생성된 디자인 코드가 arrow 구성을 slash로 반환한 경우에도 시각 원본·Plugin API 실측·정확한 SVG를 우선합니다.
외부 중복 원본의 dark alias가 변수 기록에 있어도 Agent Hub의 dark 구성을 검증했다는 뜻은 아닙니다.
이번 원본에는 hover·pressed·focus·disabled·dark 색상 변형이 없으며, 다른 상태를 이 값에서 추정하지 않습니다.
