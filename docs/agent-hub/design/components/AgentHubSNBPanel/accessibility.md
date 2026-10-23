# AgentHubSNBPanel — 접근성

- 제품 정보 구조에 맞는 탐색 landmark와 섹션 이름을 제공합니다. 행·섹션을 단어 menu-item만 보고 role=menu/tree로 바꾸지 않습니다.
- header 제목과 목록의 관계를 읽을 수 있게 연결하고 실제 collapsed 상태를 채택했을 때만 expanded/controls·숨김 group을 동기화합니다.
  원본의 들여쓴3행은 계층 탐색 keyboard가 완성됐다는 뜻이 아닙니다.
- 실제 URL 이동은 anchor/제품 Link, 새 채팅·더보기·현재 화면 action은 native button 한 개를 사용합니다.
  glyph·wrapper·추가 keydown에서 같은 callback을 중복 실행하지 않습니다.
- row 주 action과 more·header collapse·보조 조작은 형제 host로 구성하고 button/link를 중첩하지 않습니다.
  원본에서 visible=false이거나 제공하지 않는 more·leading/trailing glyph는 Tab·접근성 트리에서도 제거합니다.
  실제 기능이 있고 hover를 기다리는 more는 키보드로 접근할 때도 표시하며, 이를 원본 미제공 slot과 혼동하지 않습니다.
- icon-only 조작은 대상과 동작이 드러나는 이름을 제공하고 glyph는 장식으로 숨깁니다. 현재 페이지에만 aria-current를 연결합니다.
- #F4의 특수 행 시각·hovered source·selected token 이름만으로 aria-selected/pressed/current를 자동 부여하지 않습니다.
- 긴 제목이 gradient에 가려져도 전체 의미를 확인할 수 있어야 합니다. Tooltip이나 hover만이 유일한 정보 접근 방법이 되지 않게 합니다.
- 실제 viewport와 keyboard focus 이동을 연결해 마지막 두 행·더보기·focus outline이 root/fade 아래에 남지 않게 합니다.
  fade는 장식·pointer-events:none이며 이름·live region·독립 Tab target을 갖지 않습니다.
  현재 채택의 상하 두 장식은 모두 aria-hidden이며, viewport 또는 내부 항목이 :focus-visible이면 숨깁니다.
  이 장식이 엔진의 항목 노출·PageUp/Down·Home/End·wheel·drag를 대체하거나 차단하지 않습니다.
  오른쪽27px gutter를 덮지 않으며 forced-colors·print에서는 제거하고 reduced-motion에서는 opacity 전환을 생략합니다.
  행↔thumb21px·패널 오른쪽 경계↔thumb 끝3px 간격은 SNB만의 채택입니다. track가 하단 빈24px를 피하더라도 실제 끝 항목·키보드·drag 접근을 줄이지 않습니다.
- 좁은 높이·zoom·큰 글자에서 실제 scroll 경로를 제공하고 top action과 필요한 보조 조작이 접근 가능한지 확인합니다.
  가로255/256px 차이를 처리할 때 label·glyph·focus 정보를 조용히 잘라 해결하지 않습니다.
- 추가 disabled/권한·로딩·실패는 실제 host와 callback을 함께 제어합니다. 입력·대화 draft와 focus를 임의 초기화하지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Button/accessibility.md`,
`DOCS_ROOT/frontend/design/components/Link/accessibility.md`, `DOCS_ROOT/frontend/design/components/Scrollbar/accessibility.md`의 해당 의미를 참고합니다.
실제 스크롤·Tab/Enter/Space·팝업 Escape와 복귀·스크린리더·focus·고대비·reduced-motion은 제품에서 검증합니다.
