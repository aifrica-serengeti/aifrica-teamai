# AgentHubSessionHistoryItem — 검증

2026-10-21의 [실측](../../references/session.figma.json)·[변수](../../references/session.variables.figma.json)·
[조합 대조](../../references/session-composition.json)를 확인합니다. 정적 match는 실제 읽음/조회 API의 실행 검증이 아닙니다.

- `2995:22304`의 네 state와 title TEXT·dot BOOLEAN 기본false를 확인합니다. standalone 네 dot은 존재하지만 숨겨져 있습니다.
- 278×32·px8/py6·gap8·r6·CENTER·root clipping false·border/shadow 없음을 비교합니다.
- title14/20·400·#1C1C1C·ENDING/maxLines1, dot=false 폭262px와 actual true 폭248px를 확인합니다.
- default 투명·hover 검정5%·pressed 검정10%·selected #EBF3FF를 비교합니다.
  standalone selected의 element/primary-subtle와 부모 actual selected의 action/default-selected alias를 구분합니다.
- 실제 기록 다섯 개에서 selected 한 개·default 네 개, dot=true 두 개·false 세 개를 확인합니다.
  현재 기록은 dot=false라는 샘플만으로 선택 즉시 읽음 처리 정책을 만들지 않습니다.
- dot6×6·x264/y13·#3B82F6·선/그림자 없음과 [정확한 자산](../../assets/session/history-unread-dot-6.svg)을 확인합니다.
  숨김 icon/information와 actual true의 element/primary alias는 결과색이 같아도 별도로 보존합니다.
- dot=false의 원형·빈 gap·접근성 상태 설명 제거, true의 읽을 수 있는 상태 문구·단일 host를 검증합니다.
- 실제 execution ID·현재 보기·확인 여부의 owner를 분리하고 자동 읽음·예약 실행·재시도·전송이 추가되지 않았는지 검사합니다.
- 단일 callback·native keyboard·focus-visible·전체 title·추가 disabled guard·긴 locale 문구·좁은 폭·확대를 검증합니다.
- dot=true의 나머지 state·교차 상태·focus/disabled/loading/dark/mobile는 별도 채택·검증 범위로 남깁니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build를 마친 뒤 실제 source/public export를 로컬 mapping에 기록합니다.
  확인 전 `unmapped`/`draft`를 유지하고 문서 수신만으로 구현 완료를 선언하지 않습니다.
