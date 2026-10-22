# AgentHubSNBItem — 검증

- [실측](../../references/snb.figma.json)의 set2611:62441·1/2depth×enabled/hovered/pressed/selected8종을 확인합니다.
  leading/trailing Boolean2개와 root TEXT/URL/expanded/disabled API 부재를 구분합니다.
- root256×32/r6·Y6/R8·L8 또는36·실제 선/효과 없음·opacity1과 제목14/20/400/#1C·HUG/ellipsis 없음을 대조합니다.
  set 외곽선·저장 strokeWeight를 row border로 추가하지 않습니다.
- 1depth leading16과 gap8, 2depth leading subtree 부재·장식 connector의 약180도 transform을 확인합니다.
  connector를 공용 Tree 재사용·Tree 역할·실제 하위 데이터의 증거로 기록하지 않습니다.
- enabled 투명·hover F8·press/selected F4와 서로 다른 fill/text alias identity를 유지합니다.
  selected에 blue 면·outline·shadow를 추가하지 않습니다.
- trailing은 hover/pressed에만 있으며36×20/x220/y6·pL16·more20/glyph16입니다.
  원본 gradient transform/stop과 CSS 화면상76.786/82.797/100% 표현을 구분하고 렌더를 비교합니다.
- more source는 ghost/default20 `2909:49139`/glyph16 `2751:16967`이며1depth pressed만 실제 FRAME입니다.
  모든 control을 실제 IconButton instance로 기록하지 않습니다. glyph #757575·실제 선1을 보존합니다.
- Panel2611:62907은 hovered source/state·selected fill alias·hidden more INSTANCE·visible gradient의 override입니다.
  source selected 치환·gradient F4 교정·숨김 자식 재노출을 하지 않습니다.
- [자산](../../references/snb.assets.json)·[변수](../../references/snb.variables.figma.json)에서 실제 source/paint와 alias를 연결합니다.
  source 이름 forder를 이유로 다른 glyph를 제작하거나 일반 색상 파일로 일괄 치환하지 않습니다.
- 실제 native leaf/disclosure/action과 aria-current/expanded·형제 more·단일 callback·keyboard/touch·focus 복귀를 검사합니다.
  포인터 hover 없이 채택한 기능을 사용하고 다른 명령이 row 활성화를 함께 실행하지 않는지 확인합니다.
- Panel의 긴 제목·content255/row256·마지막 항목·clipping/scroll을 실제 제품에서 검증합니다.
  Boolean false 조합·focus/disabled/dark·모션·다른 depth는 추가 채택 근거로 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/input 후 source/public export만 로컬에 기록합니다.
  unmapped/draft를 유지하며 공용 Menu/Tree·CMP·다른 SNB 하위 계약을 일괄 변경하지 않습니다.
- 현재 채택한 runtime은 more wrapper20×20/transparent/padding0·right2이며 main의 padding-right20은 more가 있을 때 항상 유지합니다.
  행 끝↔more host 오른쪽이2px인지 depth1/2·hover·선택·focus-within에서 측정하고, 노출 전후 행·제목 위치가 같아야 합니다.
  hover·focus·selected·pressed 조합에서 F8/F4 사각형 불일치가 없고, 제목 너비·이웃 위치가 움직이지 않는지 확인합니다.
- 버튼 자체 hover #EEE·pressed #DDD/200ms, 행 fill transparent/F8/F4, 긴 제목 말줄임·focus 가시성을 각각 확인합니다.
  more를 누를 때 행의 선택/펼침이 중복 실행되지 않고 more가 없는 행에는 공간·Tab target이 없는지 검사합니다.
