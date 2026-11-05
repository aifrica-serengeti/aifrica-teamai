# AgentHubFilterChip

목록·검색 조건을 선택하는 Agent Hub의 Filter Chip 계약입니다. 공용 Chip의 표시 기반을 참고하되,
28/32/36px 크기와 독립적인 선택·hover·pressed·disabled 표현, 선택적 아이콘·count를 추가합니다.
공용의 정보 표시용 Chip이나 기존 에이전트 유형 Chip의 본체 동작을 바꾸지 않습니다.

예약 목록의 날짜 프리셋은 이 선택형 계약을 쓰고, 적용 조건 label과 독립 X는 정보 표시용 Chip으로 조합합니다.
[예약 작업 도구 모음](../../schedules.md)의 neutral28 recipe와 구분하며 이 FilterChip의 공개 API·크기를 바꾸지 않습니다.

적용 조건은 [상위 안내](../../README.md)를 따릅니다. 공용을 켠 UI 작업에서는
`DOCS_ROOT/frontend/design/components/Chip/README.md`도 읽고, 현재 제품의 호환 가능한 Chip·조작 primitive를 확장·조합합니다.
직접 의존 계약은 `Chip`, [AgentHubIcon](../AgentHubIcon/README.md)입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [선택과 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [24종 Figma 실측 기록](../../references/filter-chip.figma.json)
- [Filter Chip Group](../AgentHubFilterChipGroup/README.md)

2026-10-20에 Figma [filter-chip](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3092-25329)의
Light mode24개 variant와 숨겨진 선택 slot의 기록을 확인했습니다. 실제 앱·slot을 켠 모든 조합·focus·dark를 검증한 것은 아닙니다.

2026-11-05 [갱신 근거](../../references/existing-components-refresh.figma.json)에서는 같은24개 source를 다시 대조했습니다.
최신 ‘전체’ 샘플은 모든 상태의 폭이 sm45/md49/lg53px이며 높이28/32/36px입니다.
과거 native flag·선 포함 폭 기록과 현재 생성 context의 padding을 분리하고, 제품이 채택한 선 공간 예약·색상 전환은 유지합니다.

MCP 조건식과 exact SVG8개에서 확인한 [선택적 아이콘 상태색](./styles.md#2026-11-05-optional-glyph의-실제-상태색)은 label과 별도로 연결합니다. 선택 non-disabled의 glyph는 #3B82F6이고 label은 #1C1C1C입니다. 숨김 slot의 렌더링 배치 검증과 실제 반환 파일의 paint 확인을 구분합니다.
