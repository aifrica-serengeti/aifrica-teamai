# AgentHubSpinner — 접근성

독립 로딩 안내는 role=status와 실제 문맥의 이름을 제공합니다. 이미 버튼·영역에서 로딩 상태를 안내하면 Spinner를 aria-hidden 처리하고 중복 안내를 막습니다. 정확한 진행률을 알지 못하는 상태에 aria-valuenow를 지정하지 않습니다.

로딩 중에도 focus를 Spinner로 강제 이동하지 않습니다. 색상·회전만으로 상태를 전달하지 않고 필요한 경우 보이는 대체 텍스트를 둡니다.
