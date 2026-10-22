# AgentHubFlyoutItem — 검증

2026-10-21의 item set `3005:23146` 기준입니다.
[조합 대조](../../references/flyout-composition.json)는 원본·paint·property와 조립 관계의 정적 검사이며 실제 앱의 선택·확장 검증이 아닙니다.

- item 네 상태와 folder/folder-open/child 각 두 상태의 **총10개**를 확인합니다. 네 종류×네 상태 전체 지원으로 표시하지 않습니다.
- standalone280×28px·r0·gap8·CENTER·상하 padding0, item 좌우8·folder 좌8/우16·child 좌56/우16을 비교합니다.
  원본은 MIN 정렬이며 FILL label이 count/meta를 우측으로 밀어냅니다. 280px를 모든 viewport에 고정하지 않습니다.
- 실제 border/shadow 없음·root clipping false와 저장 strokeWeight를 구분합니다.
  label12/16px·400·자간0·#1C1C1C·ENDING/maxLines1과 y6을 확인합니다.
- default 투명·hover #F8F8F8·item pressed 검정10% overlay·item selected #EBF3FF를 비교합니다.
  Menu의 pressed #F4F4F4, Tree의 선택 막대, 선택 label 파랑을 추가하지 않습니다.
- item icon x8/label x32, folder chevron x8/icon x32/label x56/count x257,
  child label x56/meta x219의 샘플 좌표와 FILL/HUG 정책을 확인합니다. count7px·meta45px는 샘플입니다.
- item과 폴더의 기본 아이콘은 file-text/20 `2762:73887`의16px 인스턴스인지 확인합니다.
  preferred key8개나 kind 이름만으로 folder glyph를 자동 선택하지 않습니다.
- [자산 기록](../../references/flyout.assets.json)의 정확한 file-text16 export·16×16 viewBox·선1.25px·#757575를 사용합니다.
  PluginAPI 내부5개 Vector도 선1.25px인지 확인하며20→16 비율로 선을 재계산하지 않습니다.
- folder chevron-right `2842:38917`, folder-open chevron-down `2372:37015`의 native16·선1px·round·#1C1C1C를 확인합니다.
  child에는 별도 glyph·connector·marker·Checkbox가 없습니다.
- label/count TEXT, icon INSTANCE_SWAP, 같은 이름의 meta BOOLEAN과 TEXT를 구분합니다.
  count12/16px·400·#757575, child meta12/16px·400·#3B82F6와 Boolean true를 확인합니다.
- meta=false를 채택했다면 DOM·읽기 요소·빈 gap이 남지 않는지 검사합니다. 해당 false 배치를 원본 완성 시안으로 주장하지 않습니다.
- 실제 데이터의 flat 목록 또는 tree 패턴, 안정적인 ID·읽기 이름·선택/확장 분리·keyboard·focus-visible·접힌 자식 제외를 검증합니다.
  공용 Tree 문서를 받았다는 이유로 roving focus가 구현됐다고 선언하지 않습니다.
- 폴더 확장·파일 선택·열기·확정은 제품 정책에 맞는 한 실행 경로로 연결합니다.
  한 입력에서 click·keydown·wrapper callback이 중복 실행되거나 폴더 확장이 파일 열기를 함께 실행하지 않는지 확인합니다.
- 긴 label·큰 count·긴 meta·좁은 폭·확대·추가 disabled/loading과 선택/hover 교차 상태는 제품 채택 후 검사합니다.
  folder/child pressed/selected·focus·dark·mobile은 원본 미제공 범위를 유지합니다. 자식 확장 모션은 Figma 실측이 아닌 채택 runtime으로 검증합니다.
- 부모 패널의 [Menu 모션 적용](../AgentHubFlyout/motion.md)과 항목 확장을 구분합니다.
  실제 source/public export·제품 검증 결과를 로컬 mapping에 기록하기 전에는 `unmapped`/`draft`를 유지합니다.
- [배경 전환](./styles.md#배경-전환-채택)은 실제 행에서200ms ease로 동작해야 합니다. 네 kind의 hover 진입·이탈 중간 프레임과
  빠른 반전, item pressed/selected 우선순위를 확인합니다. 버튼·정적 div의 disabled hover를 모두 차단하고
  reduced-motion에서는 즉시 완료합니다. 행 크기·아이콘·focus를 움직이거나 부모150ms presence를 항목에 복제하지 않습니다.
- 폴더 recipe의 parent expandedIds·native 버튼의 aria-expanded/controls·중첩 ul을 확인합니다. children:[]도 폴더이고,
  disclosure 누락·disabled이면 파일 선택이나 확장이 실행되지 않아야 합니다. 파일 선택과 펼침 callback은 각각 한 번만 발생합니다.
- child selected는 item의#EBF3FF와 aria-pressed를 재사용한 채택값으로 구분하고, 선택 label·아이콘·직접 child L56을 유지합니다.
  깊은 계층의 추가24px 들여쓰기는 runtime 배치로 검증하며 원본 child selected·Tree 지원으로 표시하지 않습니다.
- 같은 down glyph의 open0°↔closed−90°/200ms와 자식 높이250ms의 중간 프레임을 검사합니다. 빠른 재토글·재열기·unmount·reduce 변경에서
  이전 완료 처리가 남지 않아야 합니다. 닫는 subtree는 즉시 inert/aria-hidden이며 내부 focus를 부모 폴더로 복귀한 뒤 종료 시 제거합니다.
- 공용 Menu와 같은 inset2px keyboard ring 한 곳만 표시되는지 확인합니다. 같은 행 hover에서는 ring이 숨겨지고
  focus만으로 hover 배경이 생기지 않아야 합니다. 기본 outline 중복·scroll clipping·200ms ring 전환·forced-colors 대안도 검사합니다.
