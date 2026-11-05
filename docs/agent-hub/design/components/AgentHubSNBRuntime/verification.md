# AgentHubSNBRuntime — 검증

문서와 exact export를 대조한 참조 계약입니다. 제품 구현·브라우저 동작 검증을 대신하지 않습니다.

- 양쪽 상태 모두 헤더·선택기·새 채팅 버튼이 보이고, 선택 후에만 해당 대화 목록이 추가되는지 확인합니다.
- 두 상태 공통의 title-group px8/gap8, header gap16, Divider wrapper px8, Divider py8/선1px/전체17px와 select-wrapper px8을 대조합니다. 제목·선·선택기가 같은 안쪽 경계에 정렬되고 선택기 폭을 독립238px로 고정하지 않아야 합니다.
- 288px 샘플·실제 viewport 높이·목록 스크롤·상하 fade를 확인합니다.
- runtime 변경과 채팅 선택 이벤트가 각각 한 번 실행되고, 상위 owner가 정한 route·draft 전환 정책을 따르는지 검증합니다. 이 패널이 현재 route 유지를 일괄 강제하지 않습니다.
- focus-visible·확대·긴 문자열·reduced-motion과 실제 API/export를 제품에서 검증한 뒤 로컬 매핑에 기록합니다.
- 새로운 state나 timing이 필요하면 원본 확인값과 제품 채택값을 구분합니다.

- 미선택/선택 모두 오른쪽 런타임 segment가 선택되고 왼쪽 chat은 비선택인지 대조합니다. RuntimeSelect의 value와 모드값을 한 Boolean으로 합치지 않습니다.
- 선택 후 Header의 좌우8px·filter/plus20 두 개·direct 숨김과 Header→목록 gap4를 확인합니다. 기존 Header의 오른쪽0·actions3개 기본 예시를 그대로 복제하지 않습니다.
- 대화 행은32px·px8/py6·r6·font14/20·label-only인지 확인합니다. leading 기본true나 샘플9개를 제품 필수값으로 가져오지 않습니다.
- 원본에는 하단53px 장식만 있고 상단fade·실제 overflow반응은 제품 채택임을 구분합니다. 생성 양수stop을 그대로 적용해 하단흐림이 사라지지 않는지 검사합니다.

- 모드 glyph는 스크린샷(오른쪽 folder/code)과 생성 참조(양쪽 chat SVG) 사이 불일치를 확인 범위에 남깁니다. 정확한 오른쪽 source·native 크기를 추가 확인하기 전에는18px chat 또는20px leading folder/code와 동일한 원본으로 매핑하지 않습니다.
