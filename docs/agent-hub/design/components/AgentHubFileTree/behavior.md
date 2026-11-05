# AgentHubFileTree — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

검색어·원본 nodes·선택 nodeId·expanded set·현재 파일은 제품/트리 owner가 소유합니다.
Search는 query 변경을 전달하고 Tree는 선택/토글 요청만 전달합니다.
로컬 배열 검색·지연 fake API·서버 검색 중 어느 방식을 사용하는지는 제품 기능 범위에서 정하며 이 계약은 새 HTTP client를 요구하지 않습니다.

검색 결과에서 조상을 유지할지·자동 펼칠지는 제품 정책으로 명시하고, 실제 visible tree와 키보드 탐색 대상이 일치해야 합니다.
검색어 변경·데이터 교체로 선택/focus가 사라지면 가까운 유효 노드 또는 검색 입력으로 복구합니다.
열린 파일과 선택 트리 행이 다른 제품에서는 하나의 state로 합치지 않습니다.

한 native viewport와 AgentHubScrollbar를 조합하고 위치·thumb를 독립 가짜 상태로 관리하지 않습니다.
필터/펼침·닫힘·폰트 로드·패널 resize 후 실제 scroll metrics를 갱신합니다.
새 문서가 표시될 때마다 목록 스크롤을 임의 초기화하지 않습니다. 상태 전환/모션은 각 Search·TreeEntry·Scrollbar 계약을 따릅니다.
