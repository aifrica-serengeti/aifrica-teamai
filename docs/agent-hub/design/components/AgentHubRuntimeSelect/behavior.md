# AgentHubRuntimeSelect — 상태와 동작

페이지가 runtime 목록·value·onValueChange를 제공하고 선택기가 open·탐색 상태를 기존 Select 엔진에 연결합니다. 데이터 요청이나 런타임 생성은 선택기 내부 책임이 아닙니다.

포인터로 열 때 선택 항목과 focus 시각을 혼동하지 않습니다. 방향키·선택·Escape·바깥 클릭·트리거 focus 복귀는 기존 AgentHubSelect 채택을 유지합니다. 문자 탐색은 이 시안과 기존 단일 선택 adapter에서 확인되지 않았으므로 제공한다면 제품 확장으로 검증합니다. 화면 가장자리에서 팝업을 뒤집거나 이동할 때 트리거 높이가 흔들리지 않아야 합니다.

별도 원본 timing은 없습니다. 기존 팝업 모션을 재사용하고 reduced-motion에서는 이동을 줄입니다.
