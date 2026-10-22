# AgentHubPickerItem — 검증

독립 PickerItem도 상위 Picker shell 없이 키보드 focus가 보여야 합니다. focus 색 변수를 사용하면
leaf의 fallback을 제공해 미정의 변수로 inset ring이 사라지지 않게 합니다. 모델 버튼 focus는 주행 ring과 분리합니다.

2026-10-21의 picker/item agent/chat × enabled/hovered 네 구성 기준입니다.
[조합 대조](../../references/picker-composition.json)는 실제 원본·시각·property 연결을 확인하며 앱 선택 동작 검증이 아닙니다.

- 원본 `2627:61977`의 title/meta/model/description TEXT property와 show-description Boolean을 확인합니다.
  chat title도 같은 property의 ‘회의록 작성 도우미’ 샘플이며 Qwen은 실제 모델 기본값을 정하지 않습니다.
- 폭758·높이36·r6·padding6/8·SPACE_BETWEEN·leading gap8, enabled 투명·hovered #F8F8F8,
  실제 border/shadow 없음·root clipping false를 비교합니다. chat의 소수 높이·y는 스냅샷 정밀값으로 보존합니다.
- Chip68×20 + gap8 + title104px의 leading180px 샘플, title14/20px·600·#1C1C1C를 확인합니다.
- agent assistant 두 개는 `3016:102467`, chat common-chat 두 개는 `3016:102480` 원본 재사용인지 확인합니다.
  Chip의 배경·텍스트·무테두리·폭 정책을 유지하고 일반 Chip이나 유형 미확정 정보로 바꾸지 않습니다.
- meta12/16px·400·#757575, 샘플45px·x705/y10을 확인합니다. 폭·공개 범위·권한은 제품 데이터와 구분합니다.
- model-selector FRAME104×20px·gap4, logo20/r4·model label14/20px·400·#1C1C1C·폭60,
  chevron FRAME16·Vector8×4/x4/y6·선1px·round·#757575를 비교합니다.
- [자산 기록](../../references/picker.assets.json)의 샘플 logo와 전용 chevron을 연결하고,
  모델 묶음을 Select/Dropdown/Button 또는 독립 System icon 인스턴스 재사용으로 기록하지 않습니다.
- 네 description 노드는 존재하지만 false인지 확인합니다. 글꼴12/16px·400·#757575와 두 property 연결을 보존하되,
  숨김 좌표·60×16px를 보이는 행·공간·읽기 요소로 복원하지 않습니다. true 배치는 미검증입니다.
- 모델 표시 전용이면 단일 option/action을, 독립 조작이면 비상호작용 행 안의 형제 control을 사용합니다.
  option/button 안에 모델 button을 중첩하지 않고, 단일 입력의 행 선택·모델 변경이 중복 실행되지 않는지 검사합니다.
- 실제 keyboard·선택 의미·focus-visible·popup 열림/복귀·장식 숨김·설명 읽기·부모의 한 상태 안내를 검증합니다.
- 긴 제목·meta·모델명·description 표시·좁은 폭·확대의 배치는 제품 채택 후 검사하며,
  selected/pressed/focus/disabled/loading/read-only/dark/mobile의 새 시각을 원본 확인값으로 표시하지 않습니다.
- [구현 안내](./implementation.md)에 따라 실제 source/public export와 제품 검증 결과를 로컬 mapping에 기록합니다.
  문서·자산 수신만으로 `implemented`를 선언하지 않습니다.
- [배경 전환](./styles.md#배경-전환-채택)은 실제 행 wrapper에서 투명↔`#F8F8F8`을200ms ease로 보간해야 합니다.
  agent/chat 양쪽에서 진입·이탈 중간 프레임과 빠른 반전을 확인하고, 내부 투명 버튼의 transition만으로 완료로 판단하지 않습니다.
  행 크기·focus는 고정이며 disabled wrapper에는 hover가 없고 reduced-motion에서는 즉시 완료해야 합니다.
- 키보드로 main action에 진입하면 행 전체 inset2px ring 한 곳만 나타나고 내부20px 버튼에 네모 outline이 중복되지 않는지 검사합니다.
  같은 행 hover에서 ring이 숨겨지고 model 버튼의 독립 focus가 보존되는지, forced-colors에서 시스템색 내부 outline으로 대체되는지 확인합니다.
