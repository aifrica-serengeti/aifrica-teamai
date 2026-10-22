# AgentHubSNB — 배치와 시각 적용

전체 보드의 x/y·white surface·radius100은 전시용입니다. 제품 shell은 실제 부모 영역에 레일과 패널을 배치합니다.
보드에서 레일 x80/w68, 패널 x188이어서 생긴40px 공백을 제품의 기본 gap으로 채택하지 않습니다.
레일과 패널을 붙여 배치한다면 합계356px이지만, 이 조합 폭은 **제품 배치 제안**이며 원본의 완성 shell 실측값이 아닙니다.

| 부분 | 적용할 원본 계약 |
| --- | --- |
| rail | 폭68·배경#F6F7F9·px8/pt18/pb16 |
| rail 항목 | 52×52·radius8·28px 전용 채움 glyph |
| panel | 폭288·white·오른쪽만1px #DDD·px16/py24 |
| panel 행 | 높이32·radius6·1단계left8/2단계left36·font14/20/400 |
| section header | 높이20·left8·font12/16/400·#656B74 |
| 새 채팅 | 실제 AgentHubButton40/radius8·선행 white plus20 |

정확한 내부 배치·변수·자산은 [NavRail](../AgentHubNavRail/styles.md), [SNBPanel](../AgentHubSNBPanel/styles.md),
[실측](../../references/snb.figma.json), [자산 기록](../../references/snb.assets.json)을 따릅니다.
일반 AgentHubIcon16/20/24를28px로 늘려 전용 glyph를 대체하지 않습니다.

| 상태 | 레일 항목 | 콘텐츠 행 |
| --- | --- | --- |
| enabled | 투명 | 투명 |
| hovered | 검정5% overlay | #F8F8F8 |
| pressed | 검정10% overlay | #F4F4F4 |
| selected | #CCE0FF·실측 selected glyph blue | #F4F4F4·pressed와 다른 의미 token |

각 상태는 원본에서 확인한 조합만 뜻합니다. clock의4상태와 rail의 selected home을 전체 glyph×상태 matrix로 확대하지 않습니다.
Panel의 고정 항목2611:62907은 hovered 원본에 selected fill을 덮고 더보기 아이콘을 숨긴 별도 조합입니다.
루트의#F4 선택 배경과 그대로 남은#F8 fade를 같은 색으로 정리하거나 standalone selected 원본으로 출처를 바꾸지 않습니다.

selected·expanded·hovered·focus를 같은 값으로 표현하지 않습니다. 미제공 focus·disabled·dark·모바일 화면은 제품에서 별도 정의하고 검증합니다.
긴 label을 HUG 그대로 넘겨 잘리는 구현도 완료로 보지 않습니다. 줄임·전체 이름 접근·보조 조작 공간은 제품 보완으로 명시합니다.
source1037/1033px 높이를 앱 고정값으로 쓰지 않으며 실제 가용 높이와 끝 항목 접근성을 확인합니다.
