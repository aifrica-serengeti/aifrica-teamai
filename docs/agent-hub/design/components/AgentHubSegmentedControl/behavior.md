# AgentHubSegmentedControl — 상태와 동작

value·onValueChange는 상위 owner가 제공하고 focus/roving tabindex는 기존 공용 엔진이 소유합니다. 항목별 selected Boolean을 따로 변경하여 동시에 두 개가 선택되는 상태를 만들지 않습니다.

hover/pressed/disabled의 새 팔레트와 이동하는 indicator timing은 이 원본에서 미확인입니다. 기존 상호작용·focus-visible·reduced-motion 계약을 유지하고 필요한 시각은 제품 채택으로 명시합니다. 선택에 따라 글꼴 굵기가 변해도 주변 레이아웃이 흔들리지 않게 실제 label을 검증합니다.
