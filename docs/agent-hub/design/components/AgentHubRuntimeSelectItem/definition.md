# AgentHubRuntimeSelectItem — 정의와 범위

확인한 state는 default·hovered·selected 3종입니다. selected는 현재 사용 중인 런타임이며 hover나 키보드 탐색 위치와 다릅니다.

구조는 leading 아이콘20 → label → 선택 체크16입니다. 원본 폭236px는 RuntimeSelect 내부 예시이며 실제 행은 목록 폭을 채웁니다. label은 데이터이고 표시 문자열을 식별자로 쓰지 않습니다.

일반 명령 실행용 MenuItem28px나 PickerItem36px와 서로 대체하지 않습니다. 공용 Select의 option 동작을 재사용하고 시각 차이만 확장합니다.

키보드 강화와 포인터 focus 분리는 [기존 AgentHubSelect](../AgentHubSelect/README.md)의 채택을 계승합니다. 공용 Select 원본의 방향키 미지원 관찰을 바꾸거나 새 엔진을 복제하는 계약이 아닙니다.
