# AgentHubOutputViewer

산출물의 이름·형식과 확대/닫기 버튼, 교체 가능한 본문 슬롯을 제공하는 Agent Hub 전용 패널입니다.
[상위 적용 조건](../../README.md)을 따르며, 호환되는 기존 Viewer를 먼저 찾고 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

직접 의존 계약은 [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md),
[AgentHubScrollbar](../AgentHubScrollbar/README.md)입니다. Scrollbar는 아래 사용자 채택 viewport의 의존성입니다.
두 ghost/default/24 버튼과 실제 maximize/x 아이콘의 원본 재사용을 확인했습니다.
공용 Dialog·OpenPanel·Tab·Scrollbar나 파일 renderer를 자동 상속하는 구조는 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`의 탐색·연결·검증 절차를 함께 적용합니다.

- [정의와 실제 슬롯·하위 원본](./definition.md)
- [크기·모서리·색상·배치](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/output-viewer.figma.json), [변수](../../references/output-viewer.variables.figma.json), [자산](../../references/output-viewer.assets.json)
- [조합 대조](../../references/output-viewer-composition.json)

2026-10-21에 Figma [output-viewer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3015-24221)의
단일 COMPONENT를 확인했습니다. 세 표시 Boolean은 모두 true이고 실제 content 슬롯은 비어 있습니다.
본문 미리보기·PDF/Markdown 처리·편집·확대 화면·숨김 조합·실제 파일 조회/닫힘까지 구현된 것으로 판단하지 않습니다.

[사용자 스크롤 채택](../../motion.md)에 따라 [AgentHubScrollbar](../AgentHubScrollbar/README.md)를 본문 viewport에 조합합니다.
Header34px는 밖에 유지하고 height/maxHeight는 제품이 공급합니다. 데모560px·확대720px는 Figma977px와 구분합니다.
