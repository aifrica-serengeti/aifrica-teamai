# AgentHubNavIcon — 접근성

- NavItem 안의 glyph는 장식입니다. img라면 빈 alt와 `aria-hidden="true"`를 사용하고 SVG adapter도 장식으로 숨깁니다.
  실제 host가 대상과 동작을 설명하는 접근성 이름을 제공합니다.
- glyph 자체에 button·link·Tab target·중복 label·별도 click을 추가하지 않습니다.
- #3B82F6만으로 현재 위치·선택·실행 완료를 전달하지 않습니다. 해당 host의 실제 current/expanded/선택 의미를 제품 패턴에 맞춰 연결합니다.
- 의미 있는 독립 이미지로 쓰려면 그 문맥의 이름을 별도로 제공해야 하며, 이 문서의 기본 장식 사용과 구분해 검증합니다.
- 실제 host의 focus 표시·대비·키보드 조작을 유지합니다. frame clipping을 이유로 NavItem의 focus를 숨기지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/IconButton/accessibility.md` 또는
`DOCS_ROOT/frontend/design/components/Link/accessibility.md`의 실제 host에 맞는 계약을 참고합니다.
이 참고가 NavIcon을 공용 IconButton 인스턴스로 바꾸는 것은 아닙니다.
