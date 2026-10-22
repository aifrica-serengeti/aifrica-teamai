# AgentHubIconButton

공용 IconButton의 동작·접근성을 유지하고 Agent Hub의 radius·아이콘 크기·primary·active 표현을
연결하는 확장입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 제품의 호환되는 IconButton을 재사용할 수 있으며 새 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서 `DOCS_ROOT/frontend/design/components/IconButton/README.md`도 함께 읽습니다.
직접 의존 계약은 `IconButton`, `AgentHubIcon`입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 조합](./definition.md)
- [크기·radius·색상](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [33개 variant 실측](../../references/icon-button.figma.json), [변수와 alias](../../references/icon-buttons.variables.figma.json)

2026-10-20에 Figma [icon-button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25105)을 확인했습니다.
32px 원형 첨부 버튼은 [AgentHubAttachIconButton](../AgentHubAttachIconButton/README.md)에서 관리합니다.
