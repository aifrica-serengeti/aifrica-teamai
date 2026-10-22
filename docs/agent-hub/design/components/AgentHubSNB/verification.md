# AgentHubSNB — 검증

- [실측](../../references/snb.figma.json)의 원본6개와 보드 recipe를 구분합니다. 전시 FRAME의 제목·radius100·40px 공백을 앱에 넣지 않습니다.
- rail68·항목52/radius8·전용28px glyph와 panel288·오른쪽1px 선·32px 행·20px header를 대조합니다.
- [자산](../../references/snb.assets.json)의 실제 source·paint·native 크기·callsite를 확인합니다. 이름이 같은 일반 아이콘으로 대체하지 않습니다.
- 원본 clock4상태·glyph4·header2상태·row8조합·실제 rail/panel override를 구분합니다. 전체 glyph×state·다크·focus까지 검증했다고 기록하지 않습니다.
- pinned62907의 hovered source·selected alias·#F8 gradient·숨긴 more control을 확인합니다. 실제 제품의 selected/current data와 시각 adapter를 분리합니다.
- 현재 rail·현재 leaf·ancestor 확장·일시적 pressed가 독립적으로 갱신되는지 확인합니다. 직접 URL·뒤로/앞으로에서도 일치해야 합니다.
- route는 실제 href/router, action은 하나의 intent로 연결하고 새 채팅·검색·설정·계정·섹션 action·항목 menu·프로젝트 더보기를 구분합니다.
- 프로젝트 parent/children·section 펼침·더보기 data owner가 한 곳인지 확인합니다. 접힌 subtree의 Tab/보조기술 노출과 focus 복귀를 검증합니다.
- link/button 안에 보조 버튼이 중첩되지 않고 hover 외 keyboard/touch에서도 명령에 접근할 수 있는지 확인합니다.
- 긴 label·동명이인·반복 제목·번역·다양한 데이터 수에서 ID와 의미가 유지되는지 확인합니다. label을 라우팅 키로 사용하지 않습니다.
- 실제 viewport가 마지막 chat 행·더보기·focus를 드러내는지 확인합니다. 원본 overflow NONE/clipping/fade를 작동하는 scroll로 간주하지 않습니다.
- 가용 높이·화면 확대·큰 글자·reduced-motion·고대비와 필요한 모바일 보완을 검증합니다. source의 샘플 높이를 고정하지 않습니다.
- 추가 loading/error/empty·disabled·permission·async·popup·collapse 정책은 제품에서 채택한 근거와 테스트를 별도로 남깁니다.
- 공용 on에서만 catalog/의미 계약을 적용하고 공용 off·다른 솔루션에 이 SNB나 CMP 계약이 강제되지 않는지 확인합니다.
- 소비 저장소의 lint/typecheck/test/build·실제 화면·router·입력 검증 후 source/public export를 기록합니다.
  이 저장소의 정적 문서·자산 검사나 CLI 수신 결과는 제품 실행 검증을 대신하지 않습니다.
