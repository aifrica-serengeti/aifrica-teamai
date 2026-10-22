# AgentHubSelect — 정의

Select의 의미와 상태 소유권을 유지하고 솔루션 표면만 합성합니다. label·값·오류·선택은 form owner가 전달합니다.
전용 export가 없으면 공용 registry의 Select와 직접 의존성을 먼저 찾아 재사용 가능한 구현부터 확보합니다.
상위 Dialog에 별도 임시 control을 복제하지 않습니다.

### 공용 baseline과 이번 키보드 채택 차이

공용 Select baseline은 Enter/Space 선택을 제공하며 방향키 목록 탐색은 미지원으로 기록되어 있습니다.
이번 Agent Hub 단일 선택 adapter는 사용자 승인 계획에 따라 ArrowUp/Down·Home/End 탐색을 **추가 채택**합니다.
따라서 geometry만 바꾼 무변경 재사용으로 주장하지 않습니다. 공용 의미·단일 값·popup150ms/scroll은 계승하되
소비 구현의 SingleSelect helper가 이 키보드 강화 계약을 제공하고 실제 제품 mapping 시 기존 onKeyDown과 충돌을 검사합니다.
검색·다중선택은 계속 미구현입니다. 공용 원본의 방향키 미지원 관찰값을 조용히 수정하지 않습니다.
