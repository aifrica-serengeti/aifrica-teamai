# AgentHubCodeLine

행 번호, 선택적 접기 화살표, 들여쓰기 가이드와 코드 한 줄을 표시하는 Agent Hub 전용 코드 행입니다.

[Agent Hub 적용 조건](../../README.md)을 따르는 솔루션 참조 계약입니다.
**제품 source/export는 `unmapped`, 채택 상태는 `draft`, 런타임 검증은 미수행**입니다.
2026-11-05 Figma [code-line](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3684-20432)의 메타데이터·생성 디자인 context을 대조했습니다.

공용 Tree의 노드 행이나 일반 Textarea는 코드 gutter·현재 행·코드 전용 가이드의 의미를 소유하지 않습니다. 신규 Agent Hub 표시 계약으로 추가하며 편집기 엔진까지 새로 정의하지 않습니다.

- [정의와 공용 비교](./definition.md)
- [스타일과 실측](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [제품 구현 연결](./implementation.md)
- [측정·variant·자산 관찰 기록](../../references/file-code-refresh.figma.json)
- [공용/기존 Agent Hub 대조](../../references/file-code-refresh.comparison.json)

직접 의존 계약: [AgentHubIndentGuide](../AgentHubIndentGuide/README.md), [AgentHubIcon](../AgentHubIcon/README.md).
공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`를 읽습니다.
문서 예시를 소비 제품 구현 증거로 사용하지 않으며 공용을 제외한 묶음에는 해당 문서가 자동 포함되지 않습니다.

생성 참조의 입력·출력은 native 속성 ID·binding 전체를 보증하지 않습니다. 정적 Figma geometry와 제품 제안 API·행동을 구분하며,
샘플 데이터·폭·높이를 제품 전역 API의 고정값으로 만들지 않습니다.
