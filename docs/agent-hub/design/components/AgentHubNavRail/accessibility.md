# AgentHubNavRail — 접근성

- 실제 목적에 맞는 nav/aside landmark와 제품 locale의 이름을 제공합니다. 같은 페이지의 다른 탐색 영역과 구분합니다.
  Figma 이름 nav-rail만으로 role=menu/tree/tablist를 자동 부여하지 않습니다.
- 각 NavItem은 대상/동작을 설명하는 이름을 가진 한 anchor 또는 button입니다. glyph는 장식으로 숨기고 current/selected/expanded 의미를 구분합니다.
- 설정 Button은 실제 동작에 맞는 이름과 native keyboard를 유지합니다. 아이콘만으로 의미를 전달하거나 avatar와 하나의 button으로 합치지 않습니다.
- 사용자 표시의 읽을 수 있는 이름·대체 표현은 제품 데이터로 제공합니다. ‘김’ 샘플과 색상은 실제 인증 사용자나 role의 증거가 아닙니다.
  공용 Avatar의 이름/대체 표현 의미를 참고해도 원본은 직접 FRAME이라는 사실을 유지합니다.
- 정적 avatar에 불필요한 Tab·클릭을 만들지 않습니다. 계정 메뉴를 채택하면 실제 trigger·expanded/controls·Escape·바깥 클릭·focus 복귀를 별도로 검증합니다.
- 실제 현재 목적지에만 aria-current=page를 적용합니다. home 선택을 기본 current로 고정하거나 모든 selected 영역을 페이지로 읽지 않습니다.
- 모든 조작에 키보드로 도달할 수 있어야 하며 native 동작을 중복 keydown으로 실행하지 않습니다.
  추가 disabled/권한 처리와 링크 비활성 의미를 제품에서 명시하고 실제 실행도 차단합니다.
- focus-visible을 rail 경계·panel·전체 shell clipping에서 확인합니다.52/32/28px 시각 크기를 접근성 검증 완료로 취급하지 않습니다.
- 작은 높이·zoom·큰 글자에서도 설정/사용자 표시와 탐색 action이 가려지지 않아야 합니다. hover만이 유일한 정보나 접근 경로가 되지 않게 합니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Avatar/accessibility.md`,
`DOCS_ROOT/frontend/design/components/IconButton/accessibility.md`와 실제 Button/Link 계약의 관련 의미를 함께 읽습니다.
실제 popup·스크롤·초기 focus·모션은 제품이 선택한 패턴으로 검증하고 정적 rail에서 확인한 기능으로 기록하지 않습니다.
