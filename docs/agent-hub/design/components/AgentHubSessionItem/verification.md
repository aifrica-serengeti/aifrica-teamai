# AgentHubSessionItem — 검증

2026-10-21의 [실측](../../references/session.figma.json)과 [조합 대조](../../references/session-composition.json)를 비교합니다.
정적 source·치수·property 일치는 실제 파일/예약 동작의 검증이 아닙니다.

- 원본 `2986:22114`의 state 네 종류와 title TEXT·meta BOOLEAN/TEXT·icon INSTANCE_SWAP를 확인합니다.
- 294×36·p4·gap8·r6·root clipping false·border/shadow 없음, white28/r4 icon-box와 내부16px를 확인합니다.
- content x40/y8·250×20/gap4·FILL/HUG·clip true, title14/20·400·#1C1C1C·ENDING/maxLines1을 비교합니다.
- default 투명·hover 검정5%·pressed 검정10%·selected #EBF3FF를 확인하고 불투명 F8/F4나 선택 선을 추가하지 않습니다.
- standalone meta는 존재하지만 false이며12/16·400·#757575·55px 저장값을 빈 공간으로 남기지 않습니다.
  실제 예약의 meta=true·‘매시간’32px·title214px·gap4와 source/default 재사용을 별도로 비교합니다.
- file-text native20/source `2762:73887`·표시16·선1.25·#757575와 schedule `2053:5271`의 실제16/선1.25/같은 paint를 확인합니다.
  UserMessage의 schedule12 자산과 혼동하지 않습니다.
- Panel 출력의 table `2762:73885`·code `2886:54298`·image `2057:16192`와 기본 file-text를 [자산 기록](../../references/session.assets.json)에 따라 연결합니다.
  preferred key5개와 전체 icon×state 검증을 동일시하지 않습니다.
- 실제 부모 FILL 폭·title/meta의 가변 문구·좁은 폭·확대·전체 이름·focus-visible을 검사합니다.
- 선택과 실제 파일 열기/다운로드/예약 편집을 제품 정책으로 구분하고 한 입력당 callback 한 번·disabled guard를 검증합니다.
- 추가 focus/disabled/loading/dark/mobile·교차 상태를 원본 확인값으로 표시하지 않습니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build를 마친 뒤 실제 source/public export를 로컬 mapping에 기록합니다.
  검증 전 `unmapped`/`draft`를 유지하고 문서 수신만으로 구현 완료를 선언하지 않습니다.
