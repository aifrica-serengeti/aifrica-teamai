# AgentHubFileItem — 검증

2026-10-21의 [실측](../../references/card.figma.json)·[자산](../../references/card.assets.json)·[조합 대조](../../references/card-composition.json)를 비교합니다.
정적 source·수치 match는 파일 API·다운로드 메뉴의 실행 검증이 아닙니다.

- root는 단일 COMPONENT이며 TEXT4개·size BOOLEAN false·button BOOLEAN true의 정의6개를 확인합니다.
  button의 visible 연결/false 렌더 미확인을 유지하고 state/size enum을 만들지 않습니다.
- 512×68/r12·L12/R16/Y12/gap12·white·inside1DDD·border layout=false·shadow 없음·clipping false를 확인합니다.
  기본 흐름에 border2px를 더해 높이70이나 타일 위치14px를 만들지 않습니다.
- exposed spreadsheet 타일 `3128:25501`·44/r6·sheet rawx8/y8·glyph24/선1.5를 확인합니다.
  CSS border 안쪽7px 표현을 raw7px override로 기록하지 않습니다.
- info x68/y14/331×40, title14/20/600/#1C·FILL/ENDING1줄·meta14/20/400/filetype#555·extension#8F8F8F를 비교합니다.
- meta HUG123·gap−4, type53·Divider17·extension61과 두 번의−4를 재현합니다.
  실제 Vertical source `2874:45712`·17×8/px8/선1×8 DDD를 다른 예시 source `2019:118`과 혼동하지 않습니다.
- 숨김 file-size12/16/#555와 size-divider VECTOR0×10/선1AAA/opacity1이 같은 size Boolean에 연결됐는지 확인합니다.
  true 배치·파일 크기 계산은 별도 검증하고 false에서 노드·선·빈 간격을 남기지 않습니다.
- [용량 표시 채택 보강](./styles.md#2026-10-21-채택-보강-용량-표시와-겹침-방지)은 실측과 별도로 확인합니다.
  `2.4 MB`와 파일 종류 사이에 선1px·양쪽4px 간격이 있고 글자 영역이 교차하지 않아야 합니다.
  size=true/false·다운로드 유무·긴 파일명/용량/종류/확장자·좁은 카드·200% 확대에서 info와 다운로드 영역의
  경계·수평 overflow를 확인합니다. 좁으면 그룹 단위 줄바꿈과 개별 값 말줄임으로 카드 안에 유지합니다.
  size=false 기본형의 높이68px·종류/선/확장자 최종 좌표를 보존하며 원본 JSON을 채택값으로 덮어쓰지 않습니다.
- 버튼 source `3109:144` tertiary28/enabled·실제85×28·r4·inside 선 layout=false·label‘다운로드’49px를 확인합니다.
  leading/keycap=false·trailing=true와 chevron source `2372:37015` 표시16/실제 선1/round/1C를 보존합니다.
- 단일 명령·native keyboard·접근성 이름·focus-visible·실제 disabled/pending guard·메뉴를 채택한 경우의 focus 복귀를 검사합니다.
- 긴 정보·번역·가변 폭·확대·추가 상태·버튼 숨김·다른 파일 타일 조합을 제품에서 검증합니다.
- [구현 안내](./implementation.md)와 제품 lint/typecheck/test/build 후 실제 source/public export·결과를 로컬 mapping에 기록합니다.
  그 전에는 `unmapped`/`draft`를 유지하고 원본 제품을 수정하지 않습니다.

- [공용 색상 모션](../../cards.md#공용-색상-모션-계승)의 root/텍스트에200ms ease와 property별 transition이 연결되는지 확인합니다.
  hover/pressed/disabled 진입·해제 뒤 시각값과 입력 차단을 검사하고, reduced motion에서 transition:none인지 확인합니다.
  원본 미제공 상태의 paint·전체 opacity0.4·SVG crossfade·geometry 전환을 새로 추가하지 않습니다.
