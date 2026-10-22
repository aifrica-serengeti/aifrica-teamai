# AgentHubChatHeader

대화 영역의 현재 위치와 pause·file·more action을 배치하는 Agent Hub 전용 헤더입니다.
Figma 원본 이름은 `chat-header`입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 제품의 대화 헤더를 먼저 확인하고, 호환되면 해당 영역에 시각과 동작을 연결합니다. 새 wrapper를 강제하지 않습니다.

직접 의존 계약은 [AgentHubBreadcrumb](../AgentHubBreadcrumb/README.md), [AgentHubIconButton](../AgentHubIconButton/README.md)입니다.
원본에서 실제 slash Breadcrumb와 ghost/default/24 IconButton3개의 source 재사용을 확인했습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Breadcrumb/README.md`와
`DOCS_ROOT/frontend/design/components/IconButton/README.md`의 의미·키보드·focus 계약을 함께 읽습니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의·표시 속성과 실제 source](./definition.md)
- [치수·색상·그라데이션과 blur](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [생각 중 진행 효과·실측과 제안값](./motion.md)
- [접근성](./accessibility.md)
- [기존 헤더 연결과 새 구현](./implementation.md)
- [검증](./verification.md)
- [Figma 실측](../../references/chat-header.figma.json)
- [변수와 alias](../../references/chat-header.variables.figma.json)
- [아이콘 자산과 재사용 근거](../../references/chat-header.assets.json)

2026-10-21에 Figma [chat-header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2967-34438)의
Light 단일 COMPONENT와 네 표시 Boolean을 확인했습니다.640×48px는 샘플이며 실제 대화 진행 상태·요청·파일·메뉴 내용은 포함하지 않습니다.
공용 PageHeader·Table·Chart나 CMP shell, GlobalHeader·Session·OutputViewer를 자동 조합하는 계약이 아닙니다.


추가 [생각 중 예시](../../chat-progress.md)에서 하단 gradient 흐름 의도와 pause=false 조합을 확인했습니다.
기본 static은 유지하고 명시적으로 thinking mode를 채택한 경우에만 [motion 제안](./motion.md)을 적용합니다.
1800ms·linear·좌→우 반복은 Figma timing 실측이 아닙니다. 상태 문구는 [ThinkingStatus](../AgentHubThinkingStatus/README.md)가 별도로 제공할 수 있습니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
