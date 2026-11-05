# AgentHubFileTree

검색 입력과 Agent Hub 파일 트리 행을 조합하여 폴더·파일을 탐색하는 전용 패널입니다.

[Agent Hub 적용 조건](../../README.md)을 따르는 솔루션 참조 계약입니다.
**제품 source/export는 `unmapped`, 채택 상태는 `draft`, 런타임 검증은 미수행**입니다.
2026-11-05 Figma [file-tree](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3746-99265)의 메타데이터·생성 디자인 context을 대조했습니다.

공용 Tree의 탐색 의미를 재사용하며 AgentHubFileTreeEntry의 직선 guide·28px 행, Search32px, AH 표면/테두리를 조합하는 솔루션 계약입니다. 새로운 범용 Tree나 파일 시스템 API를 만드는 계약이 아닙니다.

- [정의와 공용 비교](./definition.md)
- [스타일과 실측](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [제품 구현 연결](./implementation.md)
- [측정·variant·자산 관찰 기록](../../references/file-code-refresh.figma.json)
- [공용/기존 Agent Hub 대조](../../references/file-code-refresh.comparison.json)

직접 의존 계약: Tree (`DOCS_ROOT/frontend/design/components/Tree/README.md`, 공용 선택 시), [AgentHubFileTreeEntry](../AgentHubFileTreeEntry/README.md), [AgentHubSearch](../AgentHubSearch/README.md), [AgentHubScrollbar](../AgentHubScrollbar/README.md).
공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`를 읽습니다.
문서 예시를 소비 제품 구현 증거로 사용하지 않으며 공용을 제외한 묶음에는 해당 문서가 자동 포함되지 않습니다.

생성 참조의 입력·출력은 native 속성 ID·binding 전체를 보증하지 않습니다. 정적 Figma geometry와 제품 제안 API·행동을 구분하며,
샘플 데이터·폭·높이를 제품 전역 API의 고정값으로 만들지 않습니다.
