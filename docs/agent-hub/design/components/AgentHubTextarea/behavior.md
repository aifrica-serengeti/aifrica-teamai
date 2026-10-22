# AgentHubTextarea — 동작

공용 Textarea의 입력·IME·상태 계약에 toolbar slot을 조합합니다. 공용 기본84px를 표면140에 중복 강제하지 않습니다. toolbar는 read-only/disabled 상태에서 조작할 수 없어야 합니다.
필수값·오류·읽기 전용·disabled를 구분합니다. disabled는 focus/변경/요청을 즉시 차단하고 read-only는 읽기·복사를 허용합니다.
form submit은 부모 한 곳만 소유합니다. 입력 중 IME·선택/복사·줄바꿈 의미는 원래 native control을 따릅니다.

입력 focus의 소유자는 textarea와 toolbar를 묶은140px 표면 한 곳입니다. 내부 textarea에 별도 사각형 outline을 만들지 않습니다.
입력 focus 진입·이탈에는 전체 외곽 경계를200ms ease로 전환하고 reduced-motion에서는 즉시 표시합니다.
toolbar로 focus가 이동하면 각 버튼의 focus-visible을 표시하며 입력 focus 외곽선을 계속 켜 두지 않습니다.
toolbar 배경이 표면의 좌우·하단 경계나 입력 focus를 덮지 않게 합니다. read-only·disabled의 조작 차단은 모션 완료를 기다리지 않습니다.
