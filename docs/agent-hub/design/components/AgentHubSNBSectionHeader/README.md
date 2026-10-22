# AgentHubSNBSectionHeader

SNB 섹션의 작은 제목과 선택적 접기·보조 조작을 배치하는 계약입니다.
[상위 적용 조건](../../README.md)을 따르며 [SNBPanel](../AgentHubSNBPanel/README.md)이 목록·표시 데이터와 실제 동작을 소유합니다.
기존 구현을 먼저 확인하고 없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md)입니다.
실제 hovered 구성의 보조 버튼3개는 ghost/default/20 인스턴스입니다. 접기 제어20은 glyph16을 담은 FRAME입니다.
[SessionSectionHeader](../AgentHubSessionSectionHeader/README.md)의24px·14/20 제목·count/collapsed API와는 다른 원본입니다.
제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [정의와 실제 구성](./definition.md)
- [수치·색상·자산](./styles.md)
- [펼침과 명령의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현·새 구현 연결](./implementation.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [section-header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62413)의 enabled/hovered 두 구성을 확인했습니다.
state는 표시 시각이며 실제 펼침·필터·추가·이동 API나 전체 SNB의 실행 검증을 뜻하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`의 조사·검증 절차를 함께 적용합니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
