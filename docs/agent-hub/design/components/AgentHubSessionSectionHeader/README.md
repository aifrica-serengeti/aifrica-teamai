# AgentHubSessionSectionHeader

세션 패널 섹션의 제목·선택적 개수·접기와 보조 동작을 조합하는 계약입니다.
[상위 적용 조건](../../README.md)을 따릅니다. [SessionPanel](../AgentHubSessionPanel/README.md)이 표시 데이터와 펼침·명령을 소유합니다.
기존 구현을 먼저 비교하고 없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md)입니다.
실제 원본 ghost/default24 버튼을 재사용하며 title/count는 일반 텍스트입니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의·속성·실제 조합](./definition.md)
- [치수·글꼴·glyph](./styles.md)
- [펼침·명령 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현·신규 구현 연결](./implementation.md)
- [실측](../../references/session.figma.json) · [변수](../../references/session.variables.figma.json) · [자산](../../references/session.assets.json) · [조합 대조](../../references/session-composition.json)

2026-10-21에 Figma [session/section-header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2986-22139)의
collapsed 두 구성과 filled/empty 패널의 실제 override를 확인했습니다. 생성 코드의 잘못된 glyph 이름은 실제 source로 구분합니다.

[사용자 모션 채택](../../motion.md)을 적용할 때 title-group과 toggle24 박스 사이 gap은2px입니다.
원본 heading gap0·title/count gap8은 실측으로 보존하고, glyph만 down0°↔right−90°로200ms ease 회전합니다.
