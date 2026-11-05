# AgentHubRuntimeSelect — 정의와 범위

open=false/true 2종을 확인했습니다. 구조는 트리거의 아이콘20·이름·chevron16과 팝업의 RuntimeSelectItem 목록입니다. Figma 사용 설명은 실행 중인 런타임 목록 최대4개를 명시합니다.

open은 팝업 표시이고 value는 현재 런타임입니다. 이를 하나의 selected Boolean으로 합치지 않습니다. 목록 빈 상태·로딩·오류·5개 이상 처리 정책은 이 원본에서 확인되지 않았으며 제품 요구로 결정합니다.

키보드 강화와 포인터 focus 분리는 [기존 AgentHubSelect](../AgentHubSelect/README.md)의 채택을 계승합니다. 공용 Select 원본의 방향키 미지원 관찰을 바꾸거나 새 엔진을 복제하는 계약이 아닙니다.
