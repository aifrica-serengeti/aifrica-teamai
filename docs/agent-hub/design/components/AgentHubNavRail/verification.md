# AgentHubNavRail — 검증

- 단일 COMPONENT `2611:62055`·빈 root props/variant·실제 reactions 없음·native SLOT 없음과 nested propertySets를 구분합니다.
- [실측](../../references/snb.figma.json)의68×1037/p18·8·16·SPACE_BETWEEN/CENTER/gap32·F6F7F9·r0·실제 선/효과 없음을 확인합니다.
- 상단 x8/y18·52×232/네52px 항목/gap8과 하단 x18/y945·32×76/gap16을 대조합니다.
  실제695px 여유를 gap32로 고정하거나1037px 높이를 모든 viewport에 강제하지 않습니다.
- selected NavItem home와 enabled search/book/clock의 실제 source·nested swap·paint를 확인합니다.
  전체 glyph×state matrix·disabled·dark·focus·collapsed/mobile을 검증했다고 확대하지 않습니다.
- 설정의 실제 ghost/default/32 source `2427:25106`·r6와 glyph source `3065:48565` native24→표시20·x6/y6·757575 채움을 확인합니다.
- avatar가 INSTANCE가 아닌 FRAME28/r9999/3235EC, 이름 TEXT가 ‘김’·28px ABSOLUTE·10.5/14/600·흰색·가로/세로 CENTER임을 확인합니다.
  공용 Avatar는 의미 참고이며 실제 source 재사용이나 인증/계정 메뉴 증거가 아닙니다.
- [자산](../../references/snb.assets.json)의 정확한28px glyph·실제20px settings·원본/override와 제품 경로를 검증합니다.
- 링크/action의 단일 host·실제 current와 selected 분리·이름·native keyboard·focus·추가 disabled/권한 차단을 확인합니다.
  route/API/user/role·검색 popup·설정 결과는 제품 owner가 구현합니다.
- 작은 높이·zoom·큰 글자·panel 조합에서 모든 action에 접근할 수 있는지 검사합니다. 보드 전시 프레임/40px 간격을 shell 규격으로 복사하지 않습니다.
- source/public export·실제 입력/시각 검증 후 로컬 mapping에 기록합니다. 그 전에는 unmapped/draft를 유지하고 CMP source·Git·기존 Agent Hub 계약을 수정하지 않습니다.
