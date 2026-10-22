# AgentHubSessionSectionHeader — 접근성

- title은 섹션을 설명하는 텍스트/heading입니다. heading 단계와 제목 id는 부모의 정보 구조에 맞춥니다.
- toggle과 action은 각각 native button 하나이며 서로 형제입니다. Header 전체를 button으로 감싸 두 버튼을 중첩하지 않습니다.
- toggle의 `aria-expanded`는 `!collapsed`, `aria-controls`는 실제 본문 id에 연결합니다.
  “출력 접기/펼치기”처럼 대상과 동작을 알 수 있는 이름을 제공합니다.
- action은 실제 보조 명령을 설명하는 별도의 `aria-label`을 갖습니다. plus 모양만으로 이름을 대신하지 않습니다.
- Tab·Enter/Space·focus-visible·실제 disabled 차단을 IconButton과 함께 유지합니다. SVG는 장식으로 숨깁니다.
- showToggle/action이 false인 경우 해당 button과 접근성 상태·Tab target을 남기지 않습니다.
- count는 일반 문자열입니다. 별도 버튼·독립 상태 역할이나 매 변경 자동 live region을 만들지 않습니다.
- 제목·count와 연결된 컨트롤의 순서가 시각 순서와 일치하고 긴 제목·zoom에서 읽히는지 확인합니다.

접힘으로 본문이 사라질 때 focus가 숨긴 자식에 남지 않도록 부모가 관리합니다.
24px 시각 박스만으로 hit area·대비·모든 기기 조작을 보증하지 않습니다. 주변 간격과 실제 컨트롤 상태를 제품에서 검증합니다.

[채택한 회전](../../motion.md)은 glyph에만 적용합니다. toggle의 native hitbox·이름·expanded/controls·focus는 고정하고
reduced-motion에서는 회전을 즉시 완료합니다. 닫히는 본문의 focus 복귀와 inert/aria-hidden은 부모 disclosure가 관리합니다.
