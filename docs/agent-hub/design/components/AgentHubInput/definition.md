# AgentHubInput — 정의

Input의 의미와 상태 소유권을 유지하고 솔루션 표면만 합성합니다. label·값·오류·선택은 form owner가 전달합니다.
전용 export가 없으면 공용 registry의 Input와 직접 의존성을 먼저 찾아 재사용 가능한 구현부터 확보합니다.
상위 Dialog에 별도 임시 control을 복제하지 않습니다.
