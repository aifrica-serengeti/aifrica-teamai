# AgentHubSNB — 상태와 조작

원본의 state 이름은 시각 상태입니다. prototype reactions가 없으므로 클릭 결과나 서버 정책을 의미하지 않습니다.
아래 동작은 새 컴포넌트를 제품에 연결하기 위한 구현 계약이며 실제 source/export 검증과 구분합니다.

| 입력 | 제품에 연결할 동작 | 유지할 경계 |
| --- | --- | --- |
| 목적지 링크 | 실제 href/router 이동 | 현재 위치는 최종 URL에서 파생 |
| 검색·새 채팅·설정·계정 | 명시된 intent 한 번 전달 | 자동 popup·저장·세션 생성 API 추정 금지 |
| 섹션 toggle | 해당 section의 expanded 변경 | hovered와 expanded 분리 |
| 프로젝트 disclosure | 해당 children의 노출 변경 | label 이동과 독립 조작 주체 |
| 항목 더보기 | 해당 ID의 명령 메뉴 요청 | 행 링크·메뉴 버튼 중첩 금지 |
| 프로젝트 ‘더보기’ | 제품이 정한 전체 보기/추가 조회 | 항목 명령 메뉴와 다른 intent |

현재 rail 목적지와 현재 콘텐츠 항목은 서로 다른 차원의 상태입니다. 클릭 순간 pressed를 현재 위치로 저장하지 않습니다.
router의 현재 항목과 ancestor의 펼침을 동기화할 때 읽던 스크롤·사용자 펼침 상태를 매번 초기화하지 않습니다.
외부 URL 변경·뒤로/앞으로 이동에서도 현재 leaf를 갱신하며 다른 branch를 선택한 것처럼 표시하지 않습니다.

섹션 헤더의 펼침 glyph와 보조 조작은 hovered 시안에만 있습니다.
키보드 focus·터치에서도 필요한 명령에 접근할 수 있게 제품 보완을 제공합니다. 숨김 버튼을 보이지 않는 클릭 영역으로 남기지 않습니다.
프로젝트의 보이는 자식3개는 작동하는 disclosure 모델의 증거가 아닙니다. 제품이 parent/child ID와 펼침 정책을 명시합니다.

더보기 조회를 채택하면 중복 요청·진행·실패·재시도·끝 도달을 데이터 owner가 관리합니다.
Figma의 반복 label 수를 page size나 총 개수로 사용하지 않습니다. load/error/empty UI가 필요하면 제품 기준으로 추가하고 별도 검증합니다.

Panel의 정적 clipping과 fade를 실제 스크롤로 취급하지 않습니다.
native viewport가 scroll 위치·크기를 소유하고 끝 항목·포커스를 드러냅니다. 상하 fade는 해당 방향에 숨은 내용이 있을 때 각각 표시하며 입력을 가로막지 않습니다.
레이아웃·데이터·폰트가 바뀌었을 때 측정과 fade를 갱신하고 새 데이터마다 상단으로 강제 이동하지 않습니다.
현재 채택에서는 하단24px를 목록 콘텐츠 끝에 두고, 상하53px 장식은 목록 영역에 고정합니다.
고정 top·레일·제품 footer·thumb gutter27px를 덮지 않으며 keyboard focus에서는 장식을 숨깁니다.
하단 Figma 표현과 사용자 요청의 상단 반전·실제 표시 조건은 [Panel 계약](../AgentHubSNBPanel/behavior.md)에서 구분합니다.

전체 SNB 접힘·rail-only 모드·모바일 drawer·검색 overlay·animation·저장 위치는 제공되지 않았습니다.
채택한다면 제품 제안으로 범위와 focus/복귀·스크롤 정책을 기록합니다. CMP의 지연 시간이나 같은 API 이름을 자동으로 가져오지 않습니다.
