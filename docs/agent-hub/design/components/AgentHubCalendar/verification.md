# AgentHubCalendar — 검증

Figma 일자 패널 한 구성과 날짜 셀4종을 읽고, 내부 Button2개·IconButton3개의 원본 ID·스타일을 기존 Agent Hub
독립 실측 기록과 대조했습니다. [조합 결과](../../references/calendar-composition.json)의5개 항목은 일치합니다.
원본 IconButton 기록에 없는 gap은 비교값을 추정하지 않고 현재 단일 glyph 조합의0px를 별도 검사했습니다.
이는 Figma 기본/enabled 조합 검증이며 실제 제품 source/export·전체 상태·브라우저 동작 검증은 아닙니다.

- 패널 폭288px·radius12·흰 배경·inside border1 #DDDDDD·위아래4px·gap4와 두 shadow를 비교합니다.
  첫 shadow는 blur1/spread0이며 공용 CSS의 blur0/spread1을 그대로 적용하지 않습니다.
- border 때문에 자식 폭288px나 내부7열 폭256px가 줄지 않는지 확인합니다. 샘플5주에서362px,
  실제4/6주에서도 필요한 행 수에 맞는 HUG 높이인지 검사합니다.
- 헤더52px·px16/py10, month-select28px·p2/4/2/12·radius4·글꼴16/24/600인지 확인합니다.
  실제 chevron-down16/선1과 이전·다음 chevron20/선1.25의 manifest 출처·로컬 파일·렌더 크기를 대조합니다.
- 취소/선택은 AgentHubButton32 tertiary/primary의 radius6·px16/py4·글꼴14/20/600·상태별 색상을 사용합니다.
  라벨에 맞는 HUG 폭, 실제 아이콘 없음과 size32 keycap 없음, 하단 gap8·px16·pb12를 확인합니다.
- 월 이동은 ghost32 radius6, 월 펼침은 ghost24 radius4입니다. 전체 month-select에 tiny TextButton 규격을
  적용하거나 native button을 중첩하지 않습니다. 실제 조작은 한 번만 처리하고 접근성 이름을 확인합니다.
- 요일 행38px와 날짜 행32px·gap8·px16·pb16, 날짜4유형·색상·점·빈 자리는
  [날짜 셀 검증](../AgentHubCalendarDate/verification.md)과 함께 비교합니다.
- 실제 월·윤년·locale·월/연도 전환·single/range·확정/취소·disabled·focus/keyboard를 채택 API에 맞게 검증합니다.
  이번 샘플의1~30일·일요일 시작·5주를 제품 정책으로 고정하지 않습니다.
- 제품의 hover/pressed/disabled는 재사용 primitive 계약을 확인합니다. 이 정적 Calendar 샘플이 모든 상태나
  미제공 dark·range 스타일을 검증했다고 표시하지 않습니다.
- 실제 제품에서 확인한 source/public export만 로컬 매핑에 기록합니다. TeamAI 문서 전달만으로 implemented로 바꾸지 않습니다.

공용 원본에서는 `npm run verify`와 `npm test`로 registry·문서 경로·primitive 실측 대조·솔루션 격리를 검사합니다.
실제 제품의 화면 비교·동작 검사는 해당 제품에서 수행합니다.

- [공용 모션](../../motion.md)을 채택한 날짜/선택 원의 computed transition이200ms ease이며 geometry 전환이 없는지 확인합니다.
  선택 전후 같은 selection DOM 원이 유지되는지, today/selected/disabled 의미와 원본 paint가 보존되는지 검사합니다.
  prefers-reduced-motion:reduce에서는 transition:none이어야 합니다. 이 결과를 Figma의 motion 실측이라고 기록하지 않습니다.
