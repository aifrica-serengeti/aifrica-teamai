# AgentHubSNBRuntime — 상태와 동작

선택 runtime id·현재 route·대화 목록은 페이지/도메인 owner가 소유합니다. 패널은 런타임 선택, 새 대화, 기존 대화 열기 의도만 전달합니다. 미선택 시 임의 runtime을 자동 생성하지 않습니다.

모드 전환·런타임 변경 시 기존 대화 draft를 처리하는 정책은 제품에서 명시합니다. 렌더 중 데이터 fetch·route 변경을 수행하지 않고 단순 mock API 요구를 이 패널의 서버 계층 설계로 확대하지 않습니다.
