# AgentHubFilterChip — 검증

sm/md/lg × selected2 × enabled/hovered/pressed/disabled4의 실제24종을 확인했습니다.
설명의 focused·md 기본과 실제 정의(focused 없음·sm 기본) 차이를 기록했습니다. 제품 구현 검증은 별도입니다.

- 높이28/32/36·px10/12/14·gap4/4/6·radius9999·Pretendard14/20/600·한 줄 말줄임을 대조합니다.
  공용의20/24px·font12/16·기본 maxWidth200/240을 이 원본의 규격으로 쓰지 않습니다.
- 미선택의 white→#F8F8F8→#F4F4F4, 라벨 #757575→#555555, border1 #DDDDDD를 비교합니다.
- 선택의 #EBF3FF→#CCE0FF→#99C2FF·라벨 #1C1C1C·실제 border 없음과, 선택disabled의 #F4F4F4·#AAAAAA·border 복원을 확인합니다.
  미선택disabled는 white·#AAAAAA·border1입니다. selected와 순간 pressed를 합치지 않습니다.
- Figma 관찰에서는 strokesIncludedInLayout=true와 내용 폭의2px 차이를 확인합니다. ‘전체’ 샘플은47/51/55px 대45/49/53px입니다.
  [2026-10-21 채택 구현](./styles.md)은 모든 상태에1px 공간을 예약하고 선택 non-disabled의 선을 투명하게 합니다.
  같은 라벨·count·아이콘에서 선택 전후 폭이 같고 인접 Chip이 움직이지 않는지 확인합니다. 샘플 폭은 고정하지 않습니다.
- leading/trailing/count는 Booleanfalse로 숨겨져 있습니다. 부모가 숨긴 count-label의 visible=true를 실제 노출로 읽지 않습니다.
  slot을 켠 제품에서 추가 gap·늘어나는 폭·말줄임·glyph 상태색을 별도로 대조합니다.
- count 높이/최소폭16/18/20·px5·Inter10/16,11/18,12/20·600과 상태별 배경/글자색을 확인합니다.
  sm의 저장 폭17px·예시 ‘3’을 최소폭·실제 count 정책과 구분합니다.
- 기본 filter/16·chevron-down/16의 source·기존 로컬 파일·native16px 규격을 확인합니다.
  x 제거형 등 swap은 실제 선택 자산·상태·조작 의미를 확인한 뒤 매핑합니다.
- native button/선택 모델·단일 변경 통지·disabled 차단·이름·selected 노출·Tab/Enter/Space·focus-visible을 검사합니다.
  count/아이콘은 별도 조작을 만들지 않으며 독립 제거가 있으면 중첩 button이 없어야 합니다.
- group의18개 md 인스턴스는 [group 계약](../AgentHubFilterChipGroup/verification.md)과 함께 원본 variant·override를 확인합니다.
  실제 필터 API·pagination·focus 복원·조회 상태는 제품에서 검증합니다.
- focused·dark·read-only/loading·slot 활성화 조합의 미확인 시각 값을 이번 검증에 포함하지 않습니다.
  실제 source/public export를 확인한 뒤에만 로컬 매핑을 implemented로 바꿉니다.

공용 원본에서는 `npm run verify`·`npm test`로 registry·문서 탐색·자산 참조·group 조합과 솔루션 격리를 검증합니다.

색상 전환200ms ease와 reduced-motion 즉시 완료를 검사합니다. border 공간 예약을 Figma 실측값으로 기록하지 않습니다.

- count 슬롯을 켠 sm/md/lg에서 배지 자체의 `background-color`·`color` 전환을 확인합니다. 부모의 transition만으로
  완료로 판단하지 않습니다. 선택·해제 양방향의 중간 프레임에서 배경과 글자색이 시작·종료색 사이로 보간되어야 합니다.
- 선택 전후와 빠른 재전환 중에도 Chip·count의 폭·높이·padding과 인접 Chip 좌표가 고정되어야 합니다.
  count 전용 hover·pressed 색이나 추가 Tab stop을 만들지 않습니다.
- disabled count는 선택 여부와 무관하게 `#EEEEEE`/`#AAAAAA`이고 실제 조작은 즉시 차단됩니다.
  reduced-motion에서는 부모뿐 아니라 count 배지에도 진행 중인 색상 전환이 없어야 합니다.
