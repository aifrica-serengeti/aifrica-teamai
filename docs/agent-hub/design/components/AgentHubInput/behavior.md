# AgentHubInput — 동작

required·invalid·read-only·disabled와 label/help/error를 공용 Input에 연결합니다. native value/onChange·IME·선택/복사는 원래 control이 소유합니다.
필수값·오류·읽기 전용·disabled를 구분합니다. disabled는 focus/변경/요청을 즉시 차단하고 read-only는 읽기·복사를 허용합니다.
form submit은 부모 한 곳만 소유합니다. 입력 중 IME·선택/복사·줄바꿈 의미는 원래 native control을 따릅니다.
