# AgentHubSNBPanel — 검증

- 단일 COMPONENT `2611:63754`의 빈 root props·variant·native SLOT 부재와 하위 propertySets를 구분합니다.
- [실측](../../references/snb.figma.json)의288×1033·px16/py24·gap16·white·radius0·오른쪽만1px DDD/선 포함 layout을 대조합니다.
  세 변의 추가 border나 전체 shadow·CMP shell 크기/색을 가져오지 않습니다.
- 내부255px와 고정 header/행256px의1px 차이를 기록하고, FILL 보정은 제품 제안으로 검증합니다.
- top255×73/new-chat wrapper px8/Button239×40/Divider239×17/source2022:2와 실제 plus20·trailing 숨김·keycap 자식 부재를 확인합니다.
- list x16/y113·255×964/gap32와 섹션184/308/408, 행5/8/12·32px·행 gap0, 프로젝트 더보기20/px10/14·20·600/#656B74를 대조합니다.
- 프로젝트2depth3행의 실제 source와 평면 표시를 확인하고 부모/expanded/API를 추정하지 않습니다.
  채팅 앞10행 leading 숨김·마지막2행 folder 표시도 업무 모델과 구분합니다.
- 특수 고정 행의 sourcehovered64577·selected alias135/F4·보이는 F8 gradient와 hidden more를 함께 확인합니다.
  일반 selected 인스턴스라고 기록하거나 숨긴 more를 노출하지 않습니다.
- 원본 list bottom1077은 root보다44px 넘고 padding24까지 확보하면68px 용량이 더 필요합니다.
  제품에서 실제 viewport·스크롤을 연결해 마지막 행·더보기·focus에 도달하는지 확인합니다.
- fade303×53/x−6/y980·원본 gradientTransform과 stops를 확인합니다.
  bounds 위 alpha약.53304→아래1의 CSS 변환은 제안으로 구분하고 생성 코드의 양수114.15%를 복사하지 않습니다.
- fade가 pointer·읽기·focus를 막지 않고 실제 scroll boundary·끝 도달·keyboard focus 조건에 맞게 표시되는지 검증합니다.
  정적 fade나 overflow NONE을 실제 스크롤 완료로 취급하지 않습니다.
- 실제 Link/Button 단일 host·현재 항목/선택/펼침 분리·보조 조작 형제 구조·disabled/권한·이름·keyboard·focus 복귀를 확인합니다.
- 새 채팅의 draft 보존·route/생성 정책과 더보기의 fetch/페이지네이션·중복 요청·실패 처리를 제품 owner가 검증합니다.
  Figma label에서 backend API나 자동 전송을 만들지 않습니다.
- 좁은 높이·큰 글자·긴 번역·zoom·고대비·dark·추가 상태·모션은 채택한 근거로 검사합니다.
- 실제 제품 lint/typecheck/test/build·render/input 검증 뒤 source/public export를 로컬 mapping에 기록하고 그 전에는 unmapped/draft를 유지합니다.
  공용 off 조건을 지키고 serengeti 원본·CMP SNB·기존 Agent Hub 계약이나 Git은 수정하지 않습니다.
- 현재 채택에서는 AgentHubScrollbar/공용 ScrollArea 엔진 한 곳인지 확인하고 native thin/OS scrollbar 중복이 없는지 검사합니다.
  thumb4px·gutter11px·inset3px·radius9999·불투명 #DDD, 패널 hover/focus-within/drag/coarse pointer 노출과 reduced-motion 즉시 반영을 검증합니다.
- 숨김↔노출에서 viewport/행 폭·top 좌표가 고정되는지, wheel·PageDown·drag·resize·프로젝트 확장 후 마지막 항목과 focus가 보이는지 확인합니다.
  drag 중 포인터가 패널을 벗어나도 종료까지 thumb가 유지되고 취소/unmount 뒤 남은 capture·observer가 없는지 검사합니다.
