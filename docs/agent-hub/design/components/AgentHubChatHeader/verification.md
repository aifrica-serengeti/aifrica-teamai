# AgentHubChatHeader — 검증

- [실측](../../references/chat-header.figma.json)의 실제 이름 chat-header·단일 COMPONENT `2967:34438`·variant=null·19개 reactions=[]를 확인합니다.
  대화 상단의 참조 계약이며 실제 제품 export 확인과 구분합니다.
- active-indicator/pause/file/more의 네 BOOLEAN 기본 true와 각 visible 참조를 대조합니다.
  모두 true인 단일 시안과16개 이론 조합을 구분하고 노출값을 실행·진행률·선택 상태로 취급하지 않습니다.
- root640×48·px16py0·SPACE_BETWEEN/CENTER·저장 gap4·흰색·r0·하단만DDD1px INSIDE·layout border=true를 확인합니다.
  내부47px·Breadcrumb/actions y11.5, actions x544·80×24·gap4와 버튼 x0/28/56을 대조합니다.
- Breadcrumb source2427:25431 slash와 현재 Item2372:36927·separator=false,88×24·Pretendard16/24/400·1C1C1C를 확인합니다.
  ‘breadcrumb’·88px를 제품 고정 제목/폭으로 쓰거나 기본 구분자·상위 경로·href를 만들지 않습니다.
- 실제8개 INSTANCE의 source를 확인합니다. 세 버튼은2427:25108 ghost/default/24·r4·무테두리·투명이며 glyph16은 x4/y4입니다.
  pause2751:14602/file2916:58366/more2751:16967과 icon16 모드·실제 선1px를 대조하고 stale 이름 plus24를 따르지 않습니다.
- [자산](../../references/chat-header.assets.json)의 실제16px·paint·선·원본/재사용·제품 경로를 확인합니다.
  more의 실제 fill/stroke를 보존하고 단순 점이나 다른 크기 아이콘으로 다시 그리지 않습니다.
- indicator x0/y47·325×1·ABSOLUTE·MIN/MAX,4개 stop과 identity gradientTransform을 대조합니다.
  CSS border-box48/border-bottom1의 adapter에서 bottom=-1px로 같은 행을 재현하며 bottom0·임의50%·진행률을 추가하지 않습니다. 기본은 static이며 thinking 채택은 [별도 motion 검증](./motion.md)을 따릅니다.
- BACKGROUND_BLUR radius11.5와 생성 코드 backdrop-filter5.75px를 구분합니다. 불투명 흰색을 바꾸지 않고 CSS 시각 등가·브라우저 적용은 별도로 검증합니다.
- [변수](../../references/chat-header.variables.figma.json)의10개 변수·3개 collection·아이콘16 mode·alias를 확인합니다.
  다른 icon mode의1.25/1.5 값이나 미제공 dark를 현재16px/Light 상태에 적용하지 않습니다.
- 실제 현재 위치·이름 있는 native button·한 callback·키보드·focus-visible·추가 disabled 차단을 확인합니다.
  실제 popup을 채택할 때만 정확한 open/ARIA/닫힘/복귀와 제품 명령을 연결합니다.
- action=false일 때 DOM·Tab·보조 기술·빈 gap을 제거하고 전부 false이면 빈 actions wrapper를 제거합니다.
  indicator=false에서도 기본 하단선은 유지합니다. indicator는 장식이며 pointer-events none·aria-hidden 상태여야 합니다.
- 긴 제목·축약·협소 폭·zoom·실제 font 로드에서 현재 위치와 모든 action에 접근할 수 있는지 검사합니다.
  헤더 전체 hover/pressed·loading·dark·반응형·sticky·scroll·실제 요청은 원본 미검증 범위로 구분합니다.
- 공용 on에서만 관련 Breadcrumb/IconButton 의미 계약을 적용합니다. off에 공용 문서나 이 추가 catalog를 강제하지 않습니다.
  source/public export와 제품 실행을 검증하기 전에는 unmapped/draft를 유지하고 원본 serengeti·Git·다른 컴포넌트를 수정하지 않습니다.


생각 중 채택에서는 mode 미지정/static의 이전 결과 유지, showActiveIndicator=false 우선, thinking+안정적인 request key,
종료/교체 cleanup, 폭0·120·240.5·1560·resize, reduce와 observer 미지원 fallback을 확인합니다.
1800ms/linear/LTR/infinite와1000ms 외부 elapsed 갱신은 [제안값](../../references/chat-progress.motion.proposal.json)이며 Figma timing 측정이 아닙니다.
