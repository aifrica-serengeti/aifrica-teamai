# AgentHubBreadcrumbSeparator — 배치와 동작

구분자는 경로 사이에만 표시하고 마지막 현재 위치 뒤에는 만들지 않습니다.
표시 여부·경로 개수·현재 route·축약은 부모 Breadcrumb가 소유합니다.
구분자가 자체적으로 route·선택 값·팝업 상태를 관리하거나 이벤트를 발생시키지 않습니다.

slash·dash·arrow는 정적 시각 유형입니다. 라벨 hover나 현재 위치에 따라 구분자를 버튼처럼
누르거나 선택 상태로 바꾸지 않습니다. 제품에서 별도 디자인을 채택하면 그 근거를 명시합니다.

전체 Breadcrumb에서 확인한 조합은 slash·arrow입니다. Separator primitive에 dash가 있다는 이유만으로
상위 Breadcrumb API의 세 번째 지원 옵션이 검증됐다고 표시하지 않습니다.

arrow는 원본 full-frame SVG를 보이는 크기로 재사용합니다. 여백을 자산과 wrapper 양쪽에서 중복 소유하지 않습니다.
구분자의 폭과 padding을 측정·축약 계산에 한 번만 반영하며, 실제 긴 경로와 폰트 로드 이후 폭을 확인합니다.

이 primitive에는 실제 상호작용·애니메이션 API가 없습니다. hover·focus·메뉴·Escape·키보드 이동은
부모 Breadcrumb와 채택한 링크·메뉴 primitive가 기존 계약대로 소유합니다.
