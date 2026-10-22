# AgentHubIconButton — 접근성

- native `<button type="button">`에 ‘추가’, ‘삭제’처럼 실제 동작의 `aria-label` 또는 동등한 이름을 제공합니다.
- 아이콘 SVG는 장식으로 두고 자체 tab stop·click handler를 만들지 않습니다. Tooltip만으로 버튼 이름을 대신하지 않습니다.
- Tab·Enter·Space와 실제 disabled를 유지합니다. 색상이나 `aria-disabled`만 바꿔 동작을 남기지 않습니다.
- focus variant가 없어도 표시를 제거하지 않습니다. 공용의 1px semantic outline·1px offset과 focus 이동 기준을 유지합니다.
- 선택·열림 의미가 실제로 있을 때만 해당 ARIA 상태를 사용합니다. 시각적인 active와 접근성 상태가 서로 어긋나지 않게 합니다.
- 20/24/32px 시각 크기만으로 hit area 충족을 보증하지 않습니다. 제품의 간격·타깃 크기·zoom과 실제 surface 대비를 확인합니다.

Tooltip이 필요하면 공용 Tooltip을 한 번 조합하고 버튼 안에 중복 portal/trigger를 만들지 않습니다.
원본 색상을 보존한 참조 문서이며 실제 제품의 접근성 통과를 뜻하지 않습니다.
