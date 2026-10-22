# AgentHubFilterChip

목록·검색 조건을 선택하는 Agent Hub의 Filter Chip 계약입니다. 공용 Chip의 표시 기반을 참고하되,
28/32/36px 크기와 독립적인 선택·hover·pressed·disabled 표현, 선택적 아이콘·count를 추가합니다.
공용의 정보 표시용 Chip이나 기존 에이전트 유형 Chip의 본체 동작을 바꾸지 않습니다.

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
