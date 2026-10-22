# AgentHubAgentTypeChip — 동작

유형을 보여주는 읽기 전용 요소입니다. 데이터의 유형을 라벨과 색상에 연결하는 책임은 호출부에 있습니다.
이 노드에서 확인한 variant는 assistant·workflow·runtime·common-chat 네 가지입니다.

Chip 자체에 click·선택·toggle·Tab 이동을 추가하지 않습니다. 카드나 목록 행이 동작을 가지면
그 컨트롤이 활성화·focus·선택 상태를 소유하고 Chip은 유형 정보로 남습니다.
실행 중·완료·오류를 유형 색상으로 대신 표현하지 않습니다.

이 Figma 노드에는 hover·pressed·disabled·selected·focus·닫기·다크 variant가 없습니다.
제품에서 해당 상태가 필요하면 공용 Chip의 의미·접근성 계약과 제품의 추가 디자인 근거를 함께 확인합니다.
이 네 유형의 색상을 근거 없이 상태색이나 다크 색상으로 확장하지 않습니다.

현재 계약에는 제거 버튼이 없습니다. 향후 제거 기능을 채택한다면 별도 버튼의 의미 라벨·키보드·focus와
disabled 활성화 차단을 포함한 공용 Chip의 trailing-button 계약을 함께 적용합니다.
