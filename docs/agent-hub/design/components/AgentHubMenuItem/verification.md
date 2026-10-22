# AgentHubMenuItem — 검증

2026-10-21의 default/destructive × enabled/hovered/pressed/disabled 여덟 구성 기준입니다.
[조합 대조](../../references/menu-composition.json)는 정적 원본·property·paint·자산의 근거이며 실제 명령 실행 검증은 아닙니다.

- root `3135:16031`의 type2종·state4종, 여섯 표시 Boolean 기본 false와 실제 숨김 branch를 확인합니다.
  label/section label은 TEXT property, value는 Boolean뿐임을 구분합니다.
- standalone 폭160px FIXED·높이28px HUG, content28px·padding top/bottom4/left16/right12·gap8·radius0,
  root padding/gap0·실제 border/shadow 없음·content clipping true를 비교합니다.
- label14/20px·400·자간0·한 줄 ENDING, 기본 노출 label132px·x16/y4를 확인합니다.
  숨김 icon/value/check/chevron의 저장 좌표나 gap을 phantom slot으로 남기지 않습니다.
- enabled/disabled 투명·hover #F8F8F8·pressed #F4F4F4와 역할별 paint를 [스타일](./styles.md) 표와 비교합니다.
  destructive label/edit/check만 #D00A0A이며 value/chevron은 #757575, disabled는 #AAAAAA인지 확인합니다.
- 숨김 header label의 모든 상태 #1C1C1C·12/16px·600과 padding8/4/16/12, divider line1px #DDDDDD·상하 padding4를 확인합니다.
  header28·divider9·전체65px는 branch를 켠 계산과 실제 기본28px 실측을 구분합니다.
- 실제 기본 원본 edit16 `3018:24803`, check16 `3074:98929`, chevron-right16 `2842:38917`과 기존 자산을 대조합니다.
  Vector1px·round와 역할별 색상을 유지하고, icon-swap preferred62개를 모두 검증한 것으로 기록하지 않습니다.
- 실제 primitive의 `onSelect` 한 경로·disabled guard·keyboard/focus·닫힘과 복귀·전체 이름 보존을 제품에서 확인합니다.
  header/divider와 glyph가 명령을 중복 실행하지 않아야 합니다.
- pressed를 selected·checked·요청 성공으로 바꾸거나 check를 독립 Checkbox/토글로 만들지 않습니다.
  submenu·체크형 의미를 채택하면 실제 역할·선택 값·popup owner를 별도로 검증합니다.
- slot true 교차 조합·긴 value/label·새 swap·focused/selected/loading/read-only/dark/mobile은 추가 채택 범위입니다.
  소스에 저장된 숨김 paint만으로 노출 상태와 앱 접근성까지 검증됐다고 주장하지 않습니다.
- [구현 안내](./implementation.md)에 따라 실제 source/public export와 제품 검증 결과를 로컬 mapping에 기록합니다.
  문서·자산 수신만으로 `implemented`를 선언하지 않습니다.
- [배경 전환](./styles.md#배경-전환-채택)은 header/divider group이 아닌 명령 content에서200ms ease로 동작해야 합니다.
  default/destructive의 hover 진입·이탈 중간 프레임·빠른 반전·pressed 색 복귀를 확인합니다.
  disabled 차단과 focus 표시를 유지하고 reduced-motion에서는 전환을 해제합니다. 부모 popup150ms와 혼동하지 않습니다.
- 키보드 강조에서 배경은 유지되고 inset2px ring 한 곳만 보이는지, 같은 행 hover에서 ring이 숨겨지는지 확인합니다.
  Select의 active option도 동일한 정책을 사용하되 selected와 active를 같은 상태로 저장하지 않습니다.
  ring의200ms 중간 프레임·포인터 이탈·스크롤 clipping·forced-colors outline을 확인합니다.
- 앱의 전역 focus CSS를 컴포넌트 CSS보다 뒤에 로드한 상태에서도 키보드 focus→같은 항목 hover→이탈을 확인합니다.
  hover에서는 바깥 outline과 내부 ring이 모두 없어지고, 이탈 후 키보드 focus의 내부 ring만 복귀해야 합니다.
  standalone·popup·Select option 조합을 비교하며 forced-colors에서는 시스템 색의 내부 outline을 유지합니다.
