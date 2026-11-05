# AgentHubSpinner — 상태와 동작

loading 여부와 완료/실패 결과는 요청 owner가 소유합니다. Spinner는 자체 timeout으로 완료 상태를 만들지 않습니다. 모션 timing은 정적 Figma에서 확인되지 않았습니다. 회전은 기존 공용 구현의 모션을 연결하되 Figma 측정값으로 기록하지 않습니다.

여러 요청이 동시에 진행될 때 모든 spinner가 반복 live announcement를 만들지 않도록 상위 상태 안내 한 곳을 선택합니다. reduced-motion에서는 공용 Spinner 계약대로 회전을 멈춘 정지 도형으로 남깁니다. 부모의 loading이 계속되는 동안 표시와 로딩 중이라는 텍스트 의미를 유지합니다. 전역 규칙이 이 요소에도 적용된다고 가정하지 않고, 누락된 경우 컴포넌트 범위에서 회전을 정지합니다.
