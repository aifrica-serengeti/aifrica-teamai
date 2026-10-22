# AgentHubDataCard — 검증

2026-10-21의 [실측](../../references/card.figma.json)·[변수](../../references/card.variables.figma.json)·[조합 대조](../../references/card-composition.json)를 비교합니다.
원본·paint match는 실제 데이터 조회/선택 구현을 검증한 결과가 아닙니다.

- root set `2427:25252`의 속성은 state 하나·enabled/hovered/pressed 세 종류임을 확인합니다.
  title/description/Chip 문구의 root TEXT property·selected·disabled가 있다고 기록하지 않습니다.
- 120×120/r12/p12·border1DDD layout=true·SPACE_BETWEEN/MIN·clip false를 확인합니다.
- text-group x13/y13·94×36/gap4, title14/20/400/1C·description10/12/400/7575·자간0을 비교합니다.
  둘 다 원본 ellipsis/maxLines가 없으며 title20+gap4+description12=36입니다.
- Chip x13/y87과 실제 가운데 공간38px를 확인하고 저장 gap18을 추가 margin으로 쓰지 않습니다.
- enabled white·hoverF8·pressedF4와 세 상태 모두 같은 Raised0/0/r1/.31+0/1/r1/.10을 비교합니다.
  공용 Card의 enabled 무그림자·hover Mid를 자동 상속하지 않습니다.
- Chip 세 개 모두 source `2079:12042`의 Pill/Small/Enabled·아이콘/삭제 버튼 없음인지 확인합니다.
  source42×20 대비 실제44×20·r10·max200·px8·white/inside1DDD·border layout=false를 구분합니다.
- Chip label‘Type’28px·12/16/600/1C·ENDING/maxLines1을 확인하고46px로 border 공간을 추가하지 않습니다.
  AgentHubAgentTypeChip·AgentHubPillChip으로 대체하지 않습니다.
- 실제 Card instance가 없으며 Card 의존은 의미 참조라는 경계를 유지합니다.
- 표시 전용/실제 단일 action을 구분하고 단일 callback·keyboard·focus·추가 disabled guard·정보용 Chip·중첩 control 부재를 검사합니다.
- 긴 문구·유형·번역·확대·grid 가변 폭·추가 focus/disabled/loading/selected/dark/mobile는 제품 채택 후 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build 후 실제 source/public export·실행 결과만 로컬 mapping에 기록합니다.
  검증 전 `unmapped`/`draft`를 유지하고 원본 제품을 수정하지 않습니다.

- [공용 색상 모션](../../cards.md#공용-색상-모션-계승)의 root/텍스트에200ms ease와 property별 transition이 연결되는지 확인합니다.
  hover/pressed/disabled 진입·해제 뒤 시각값과 입력 차단을 검사하고, reduced motion에서 transition:none인지 확인합니다.
  원본 미제공 상태의 paint·전체 opacity0.4·SVG crossfade·geometry 전환을 새로 추가하지 않습니다.
