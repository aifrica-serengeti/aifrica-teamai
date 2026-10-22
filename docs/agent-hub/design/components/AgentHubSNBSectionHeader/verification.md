# AgentHubSNBSectionHeader — 검증

- [실측](../../references/snb.figma.json)의 set2611:62413·enabled2611:62411/hovered2611:62412를 확인합니다.
  root props는 state 하나이며 title/count/collapsed/action Boolean을 추가로 추출했다고 기록하지 않습니다.
- root256×20·left8/나머지0·SPACE_BETWEEN/CENTER·실제 fill/stroke/effect 없음과 제목12/16·400·#656B74를 대조합니다.
  보라색 set 외곽선·저장 gap10을 Header border나 추가 여백으로 가져오지 않습니다.
- enabled에는 title-group만 있고 hovered에는 collapse FRAME20과 보조 ghost20 세 개가 실제 존재하는지 확인합니다.
  subtree 부재를 visible=false 노드로 바꾸어 기록하지 않습니다.
- collapse FRAME과 실제 IconButton INSTANCE를 구분하고 down16/direct16/filter16/plus16 source·선1·#656B74를 보존합니다.
  hovered Header 안의 ghost source state는 default입니다.
- Panel의 고정됨/프로젝트 enabled·채팅 hovered와 실제 문자열 override를 구분합니다. 제품의 고정 섹션 목록으로 사용하지 않습니다.
- [자산](../../references/snb.assets.json)·[변수](../../references/snb.variables.figma.json)의 역할별 실제 paint/alias를 연결합니다.
  일반 아이콘 색으로 바꾸거나 SVG 경로·선·크기를 임의 제작하지 않습니다.
- 펼침·명령의 단일 callback, 형제 host, 실제 이름·expanded/controls·keyboard·focus·touch와 popup 복귀를 검증합니다.
  포인터 hover 없이도 채택한 기능에 접근하고 focus 중 버튼이 사라지지 않는지 확인합니다.
- 긴 제목·번역·큰 글자·좁은 폭·접힘·독립 control 상태·disabled/dark/모션은 채택한 제품 기대값으로 추가 검증합니다.
- 현재 채택에서는 실제 제목 박스 오른쪽과20px toggle 박스 왼쪽 차이가2px인지 확인합니다. root SPACE_BETWEEN·왼쪽8px·actions 간격은 별도로 유지합니다.
  고정됨·프로젝트·채팅 및 긴 제목에서 높이20px·glyph16px·focus가 보존되는지 확인합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build·실제 render/input 후 source/public export를 로컬에 기록합니다.
  확인 전 unmapped/draft를 유지하며 공용·CMP·SessionSectionHeader를 수정하거나 같은 스킬 이름을 덮어쓰지 않습니다.
