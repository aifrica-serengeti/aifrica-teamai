# AgentHubRuntimeSelectItem — 상태와 동작

value와 변경 요청은 RuntimeSelect/페이지 owner가 소유합니다. 행은 안정적인 runtime id로 선택을 요청하며 자체 runtime 배열이나 API를 만들지 않습니다.

포인터 탐색·키보드 active option·현재 selected를 분리합니다. 현재 선택된 항목을 다시 누른 경우 불필요한 런타임 재생성이나 페이지 초기화를 하지 않습니다. disabled 시각은 미확인입니다. 제품이 비활성 항목을 제공하면 공용 엔진에서 선택을 실제 차단하고 그 이유를 연결합니다.
