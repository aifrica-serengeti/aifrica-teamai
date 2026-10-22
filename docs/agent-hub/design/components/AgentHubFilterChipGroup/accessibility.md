# AgentHubFilterChipGroup — 접근성

그룹의 필터 목적을 알 수 있는 이름을 제공합니다. 필요하면 이름이 있는 `fieldset`/`legend` 또는
`role="group"`을 사용하되 실제 선택 컨트롤의 의미와 일치시킵니다.
공용의 정보 표시용 Chip을 클릭 가능한 span으로 바꾸지 않고
[AgentHubFilterChip](../AgentHubFilterChip/accessibility.md)의 컨트롤 계약을 적용합니다.

- 토글 버튼 방식이면 각 칩의 native button·이름·`aria-pressed`·Tab·Enter/Space를 유지합니다.
- 단일 선택을 radio 방식으로 구현한다면 실제 radio/radiogroup의 이름·선택·방향키·focus 계약을 함께 구현합니다.
  모양이 비슷하다는 이유로 radio role만 붙이거나 서로 다른 키보드 규칙을 혼합하지 않습니다.
- 단일/다중 선택 의미, 선택 상태와 disabled를 보조 기술에도 전달합니다. 색상만으로 선택을 표현하지 않습니다.
- 감춰진 아이콘·count는 접근성 트리에 불필요하게 남기지 않습니다. count를 표시하면 제품에서 그 의미와 읽기 순서를 정합니다.
- wrap에서도 DOM 읽기·Tab 순서를 유지합니다. CSS order나 absolute 배치로 필터 순서를 뒤집지 않습니다.
- scroll에서도 잘린 칩이 키보드로 도달 가능하고 focus 시 충분히 보이도록 합니다. 선택을 바꾸는 키를 단순 스크롤 동작으로 가로채지 않습니다.
- scroll container에 별도 tab stop이 필요한지는 제품의 칩 탐색 방식과 함께 결정하고, 중복 focus 지점을 무조건 추가하지 않습니다.
- fade는 `aria-hidden="true"`, `pointer-events: none`인 장식으로 두고 자체 tab stop·label·click handler를 만들지 않습니다.

Figma scroll root의 clipping 때문에 focus outline까지 잘리지 않도록 별도 공간이나 제품 구조를 검증합니다.
fade가 글자·선택 표시·focus를 가리지 않아야 하며 마지막 칩까지 완전히 드러낼 수 있어야 합니다.
32px 샘플 높이와 8px gap만으로 타깃 크기·zoom·대비 충족을 보증하지 않습니다.
필터 결과 변경의 로딩·오류·빈 결과·안내는 페이지가 소유하며 그룹 자체를 무조건 live region으로 만들지 않습니다.
