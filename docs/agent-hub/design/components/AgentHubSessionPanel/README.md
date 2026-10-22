# AgentHubSessionPanel

예약·실행 기록·진행 상황·출력·컨텍스트를 모아 보여 주는 Agent Hub 전용 Session 패널입니다.
공용에 같은 역할의 컴포넌트는 없으므로 기존 제품에서 호환 구현을 찾고, 없다면 이 계약을 기준으로 새로 개발합니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [구성과 상태](./definition.md)
- [크기·색상·표면](./styles.md)
- [상태와 동작 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현과 기존 구현 연결](./implementation.md)
- [실측 원본](../../references/session.figma.json), [변수](../../references/session.variables.figma.json), [자산](../../references/session.assets.json), [조합 대조](../../references/session-composition.json)

직접 의존 계약은 [SessionItem](../AgentHubSessionItem/README.md), [SessionProgressStep](../AgentHubSessionProgressStep/README.md),
[SessionContextItem](../AgentHubSessionContextItem/README.md), [SessionSectionHeader](../AgentHubSessionSectionHeader/README.md),
[SessionHistoryItem](../AgentHubSessionHistoryItem/README.md), [AgentHubIconButton](../AgentHubIconButton/README.md),
[AgentHubScrollbar](../AgentHubScrollbar/README.md)입니다. Scrollbar는 아래 사용자 채택의 실제 viewport adapter이며 Figma 하위 원본 재사용과 구분합니다.
다섯 Session 하위 원본과 IconButton의 실제 인스턴스 재사용을 확인했습니다. 공용 Card·CardAccordion·Tree의 시각·역할을 자동 상속하지 않습니다.

2026-10-21에 Figma [session-panel](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2975-69460)의
empty/filled 두 상태와 다섯 하위 set을 포함한 **19개 variant**를 확인했습니다.
정적인 Light 시안의 개발 기준이며 앱의 요청·스크롤·선택·접기 동작까지 실행 검증한 결과는 아닙니다.

[사용자 모션·스크롤 채택](../../motion.md)은 section/history의250ms height presence와 glyph200ms 회전, 내부 viewport를 추가합니다.
직접 조합에는 [AgentHubScrollbar](../AgentHubScrollbar/README.md)를 추가합니다. 무제한 높이에서는 기존 HUG934/154px를 유지하고,
제품이 height/maxHeight를 공급할 때만 내부에서 스크롤합니다.560px는 소비 데모의 제안 제한값입니다.
스크롤 track은 [곡면 회피 조립](./styles.md#사용자-채택-둥근-모서리를-피하는-scroll-track)으로 패널 위아래16px 안쪽을 사용하며 원본 py16/HUG 배치는 유지합니다.
