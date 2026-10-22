# AgentHubAgentTypeChip

어시스턴트·워크플로우·런타임·일반 채팅을 구분하는 Agent Hub의 정보 표시용 Chip입니다.
공용 Chip의 `small + rounded + subtle`을 바탕으로 유형별 색상과 폭을 연결합니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Chip/README.md`를 읽고 의미·접근성 계약을 유지합니다.
기존 제품 Chip이 아래 차이를 지원하면 해당 구현에 매핑합니다. 새 래퍼 생성을 강제하지 않습니다.
`AgentHubChip`은 이 계약의 검색 별칭이며, 별도의 범용 Chip 전체를 뜻하지 않습니다.
28px 기본형은 [Pill Chip](../AgentHubPillChip/README.md), 조건 선택형은 [Filter Chip](../AgentHubFilterChip/README.md)을 확인합니다.

- [정의와 유형](./definition.md)
- [크기·색상·공용과의 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [Figma 실측 기록](../../references/agent-type-chip.figma.json)

2026-10-20에 Figma [agent-types](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-102468)
4종을 확인한 참조 계약입니다. 실제 제품의 source/export는 아직 `unmapped`입니다.
