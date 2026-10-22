# AgentHubChatHeader — 접근성

대화 영역 안의 지역 header로 연결합니다. 기존 지역 header를 재사용하거나 해당 section/article 안에 header를 두며,
이름이 header라는 이유로 새 전역 banner·h1·navigation shell을 만들지 않습니다.

- Breadcrumb는 [기존 접근성 계약](../AgentHubBreadcrumb/accessibility.md)을 유지합니다.
  현재 항목은 링크가 아닌 텍스트로 제공하고 실제 현재 페이지이면 `aria-current="page"` 등 맞는 현재 위치 의미를 연결합니다.
  ‘breadcrumb’ 샘플 문구나 TEXT 노드 이름 BreadcrumbLink에서 href·router 목적지를 만들지 않습니다.
- pause·file·more는 실제 동작을 설명하는 이름이 있는 native `button type="button"`입니다.
  이름에는 필요한 대화/항목 맥락을 포함하며, 아이콘 이름만으로 중단·다운로드·삭제 동작을 확정하지 않습니다.
  Tooltip을 추가해도 버튼 자체의 이름을 대신하지 않으며 같은 trigger/portal을 중복하지 않습니다.
- 내부16px glyph는 장식입니다. SVG 자체의 Tab 정지·click handler·중복 접근성 이름을 만들지 않습니다.
  [AgentHubIconButton](../AgentHubIconButton/accessibility.md)의 Tab·Enter·Space·native disabled·focus-visible을 유지합니다.
- 공용을 켠 경우 `DOCS_ROOT/frontend/design/components/Breadcrumb/accessibility.md`와
  `DOCS_ROOT/frontend/design/components/IconButton/accessibility.md`를 함께 따릅니다.
  이 헤더의 default 샘플만으로 focus 표시를 없애거나1px outline·1px offset 계약을 약화하지 않습니다.
- 실제 popup을 채택할 때만 종류에 맞는 haspopup·expanded·controls와 Escape·닫힘·focus 복귀를 연결합니다.
  more를 단순 명령으로 쓰는 경우 menu 속성을 강제하지 않습니다. pause를 toggle로 채택했다는 근거 없이 `aria-pressed`를 붙이지 않습니다.
- 숨긴 action과 indicator는 보조 기술·Tab 순서에서 제거합니다. 숨김과 disabled를 혼동하지 않습니다.
  disabled를 추가하면 native 상태와 handler 차단을 함께 연결하고 스타일만 흐리게 해 활성 동작을 남기지 않습니다.
- indicator는 static/thinking 모두 장식으로 `aria-hidden="true"`·`pointer-events:none` 처리합니다.
  progressbar·status·alert·읽음 badge나 시간에 따른 live 안내를 부여하지 않습니다. 실제 상태 안내는 [ThinkingStatus](../AgentHubThinkingStatus/accessibility.md) 또는 기존 제품의 한 owner가 제공합니다.
  thinking 모션을 채택하면 [motion](./motion.md)의 reduced-motion 정적 대체를 유지하고 track만 clip해 버튼 focus를 보존합니다.

640px 샘플 밖의 긴 제목·zoom·작은 대화 영역·실제 font 로드에서 제목과 남은 버튼을 읽고 조작할 수 있는지 검사합니다.
24px 버튼·gap4만으로 모든 환경의 타깃 크기와 대비가 충족됐다고 단정하지 않습니다.
추가 dark·고대비·모바일·popup·요청 실패 접근성은 제품에서 별도로 검증합니다.
