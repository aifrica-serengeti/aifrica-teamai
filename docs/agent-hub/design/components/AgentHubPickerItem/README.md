# AgentHubPickerItem

Picker 안에서 에이전트 또는 일반 채팅 항목을 보여 주는 행 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따르며, 전체 검색·열림·선택 흐름은 [Picker](../AgentHubPicker/README.md)가 소유합니다.
호환되는 기존 행을 재사용하고, 없으면 [구현 순서와 제안 API](./implementation.md)에 따라 가까운 범위에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubAgentTypeChip](../AgentHubAgentTypeChip/README.md),
[AgentHubIcon](../AgentHubIcon/README.md), `Button`입니다. 실제 Figma 인스턴스 재사용은 유형 Chip에 한정하며,
AgentHubIcon은 자산 연결, Button은 동작 의미를 채택하는 기준입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Button/README.md`도 적용합니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 하위 원본](./definition.md)
- [크기·색상·배치](./styles.md)
- [선택·모델 조작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/picker.figma.json), [변수](../../references/picker.variables.figma.json), [자산](../../references/picker.assets.json)
- [조합 대조](../../references/picker-composition.json)

2026-10-21에 Figma [picker/item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-61977)의
agent/chat × enabled/hovered 네 구성을 확인했습니다. 모델을 바꾸는 실제 팝업·선택 확정·요청 API·description 표시 상태는 별도 검증이 필요합니다.
