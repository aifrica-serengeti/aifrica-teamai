# AgentHubNavIcon — 상태와 책임

NavIcon은 정적 glyph를 표시합니다. 자체 click·선택·펼침·라우팅·검색 실행·키보드 handler를 갖지 않습니다.
glyph 종류와 paint 선택은 제품의 NavItem/탐색 adapter가 공급하며 아이콘 내부에 별도 active 상태를 저장하지 않습니다.

현재 route·열린 패널·선택된 탐색 영역·요청 상태는 서로 다를 수 있습니다.
home/book/clock/search라는 이름만으로 이 상태나 API를 연결하지 않습니다.
NavItem의 순간 hovered/pressed와 지속 selected도 구분하며 icon 자체를 toggle button으로 만들지 않습니다.

단독4종·clock4상태·Rail의 실제 override 범위만 원본에서 확인했습니다.
다른 glyph의 selected/hover/disabled 조합이 필요하면 제품이 채택한 범위와 자산 provenance를 기록해 검증합니다.
자산을 받았다는 사실은 사용처·상태별 렌더나 사용자 동작을 검증한 결과가 아닙니다.

## 현재 채택: 색상 모션

색상 상태는 계속 부모 NavItem이 공급합니다. glyph를 선택값으로 재생성하거나 img의 `src`만 교체하지 않습니다.
하나의 원본 alpha mask를 유지하고 #757575↔#3B82F6를 `color 200ms ease`로 보간합니다.
빠른 선택 전환은 현재 보이는 색부터 다음 목표색으로 이어지며 별도 timer·selected state를 복제하지 않습니다.
hover/pressed의 neutral glyph 색은 원본 #757575를 유지합니다. reduce에서는 상태를 즉시 표시합니다.
