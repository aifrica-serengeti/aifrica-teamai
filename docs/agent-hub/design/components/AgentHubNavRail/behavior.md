# AgentHubNavRail — 탐색과 하단 action의 책임

제품 shell/router가 실제 목적지·현재 route·선택된 영역·panel 콘텐츠·권한·사용자 데이터를 소유합니다.
rail은 그 값을 배치와 host에 연결하며 별도 인증·메뉴 API·대화 상태를 만들지 않습니다.
home 선택은 단일 샘플이며 첫 항목을 항상 현재 route로 만드는 기본 동작이 아닙니다.

목적지가 있는 항목은 실제 링크, 검색 열기 같은 현재 화면 action은 native button에 연결합니다.
검색 action이 존재한다는 이유로 특정 Search·Picker·Menu를 자동 생성하지 않습니다.
selected 영역과 aria-current의 현재 페이지·순간 pressed·열린 popup은 별도 상태로 연결합니다.
panel이 보이는 경우 실제 대상/expanded/controls를 연결하며, 원본에 collapsed toggle이나 TabList 패턴이 있다고 가정하지 않습니다.

항목 활성화는 한 host의 한 경로에서 처리합니다. NavItem과 내부 glyph·rail wrapper에 같은 callback을 중복 등록하지 않습니다.
설정 Button의 실제 결과가 route 이동·Dialog·Menu 중 무엇인지는 제품이 결정하고 해당 의미·focus·닫힘 복귀를 연결합니다.
avatar 원본은 정적 사용자 표시입니다. 계정 메뉴·로그아웃·role 전환·사용자 전환 action을 자동 추가하지 않습니다.
제품이 avatar action을 채택한다면 한 host와 이름·popup owner를 별도 제안으로 검증합니다.

샘플에는 실제 스크롤 구현이 없습니다.1037px보다 짧은 shell에서 내용이 가려지면 제품이 상/하단 공간과 실제 viewport를 조정해 모든 조작에 접근하게 합니다.
overflow NONE·clipping false를 스크롤 완료나 내용 숨김 정책으로 해석하지 않습니다.
필요한 scrollbar도 해당 사용처에서 채택한 근거로 연결하며 기존 AgentHubScrollbar·CMP SNB를 자동 삽입하지 않습니다.

navigation이 대화·draft·첨부·검색어·Session 상태를 임의로 초기화하거나 새 요청을 자동 전송하지 않게 제품 정책을 연결합니다.
로딩·실패·숨김/disabled 권한·선택 보존·responsive·모션·접힘은 제품 채택 범위를 명시해 검증합니다.
