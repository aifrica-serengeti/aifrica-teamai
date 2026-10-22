# AgentHubNavItem — 접근성

- 실제 URL 이동은 anchor/검증한 Link, action은 type=button의 native button 한 개를 사용합니다. host를 중첩하지 않습니다.
- icon-only이므로 제품 locale로 대상/동작을 설명하는 이름을 제공합니다. glyph 이름이나 Tooltip만으로 이름을 대신하지 않습니다.
- glyph는 장식으로 숨기고 부모 host가 이름을 소유합니다. 내부 img/SVG에 별도 Tab·click을 추가하지 않습니다.
- 실제 현재 목적지에만 aria-current=page를 연결합니다. selected paint·순간 pressed·검색 popup 열림을 현재 페이지로 읽지 않습니다.
- disclosure를 채택하면 실제 expanded/controls·대상 popup과 일치시킵니다. 원본에 submenu가 있다는 뜻으로 기록하지 않습니다.
- Button은 Enter/Space, 링크는 native 탐색과 브라우저 기본 동작을 유지합니다. 한 이벤트를 추가 keydown으로 다시 실행하지 않습니다.
- 추가 disabled의 의미와 처리 경로를 제품이 정합니다. 링크를 pointer-events만으로 비활성화하거나 button의 색만 바꾸지 않습니다.
- focus-visible을 제공하고 rail·panel·viewport clipping에 잘리지 않게 합니다. Figma에 focus 상태가 없다는 이유로 링을 제거하지 않습니다.
- Tooltip을 채택해도 label과 키보드 조작을 유지하며 hover만이 유일한 정보/조작 경로가 되지 않게 합니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Button/accessibility.md`와
`DOCS_ROOT/frontend/design/components/Link/accessibility.md`의 실제 host에 맞는 의미를 적용합니다.
전체 nav를 Menu·Tree·TabList로 자동 선언하지 않고 제품 정보 구조에 맞는 landmark와 키보드 패턴을 선택합니다.
