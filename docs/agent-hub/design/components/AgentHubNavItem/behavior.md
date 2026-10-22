# AgentHubNavItem — 탐색과 action의 책임

현재 채택한 상태 전환은 host 배경과 [NavIcon](../AgentHubNavIcon/behavior.md)의 단일 mask 색상을 각각 `200ms ease`로 처리합니다.
선택 owner는 계속 부모에 두며 색상 전환을 위해 glyph를 remount하거나 이전 상태를 timer로 유지하지 않습니다.
reduced-motion에서는 상태를 즉시 반영하고 native 입력·current 의미는 유지합니다.

항목 ID·label·glyph·실제 목적지·선택된 탐색 영역·현재 route·popup 상태는 제품 owner가 제공합니다.
원본 state enum을 router나 요청 단계 enum으로 저장하지 않습니다.
URL로 이동하는 항목은 제품이 검증한 anchor/router Link에, 현재 화면의 검색 열기 같은 action은 native button에 연결합니다.
검색 glyph만으로 입력창·Picker·Menu·전체 검색 API가 이미 제공된다고 추정하지 않습니다.

링크의 실제 current와 영역의 selected는 별도일 수 있습니다. `aria-current="page"`는 실제 현재 목적지일 때만 사용합니다.
action에 selected 색이 보인다고 aria-current·aria-pressed를 자동 부여하지 않습니다. 명시적으로 채택한 toggle/disclosure 패턴은 그 의미 전체를 연결합니다.
pressed는 누르는 동안의 상태이며 클릭 후 선택·이동 성공으로 저장하지 않습니다.

action은 한 native button의 click에서 한 번 전달하고 label·glyph·wrapper·keydown에서 중복 실행하지 않습니다.
일반 action은 type=button을 유지합니다. 링크는 실제 href와 제품 라우터의 기본 동작을 보존하고 동일 이동 callback을 중복 등록하지 않습니다.
별도 메뉴나 popup이 필요하면 실제 open owner·Escape·바깥 클릭·focus 복귀를 제품에서 연결하며 단순 glyph를 menu trigger로 확정하지 않습니다.

추가 disabled가 필요하면 실제 host·키보드·callback을 함께 차단하고 paint는 제품 채택 범위를 별도로 검증합니다.
원본에 disabled가 없다는 이유로 실제 비허용 action을 실행 가능하게 두지 않습니다.
선택과 hover/pressed의 우선순위·탐색 후 패널 갱신·읽던 위치·모션은 제품이 명시합니다.
선택만으로 기존 대화·draft·첨부·Session을 자동 삭제하거나 새 요청을 시작하지 않습니다.
