# AgentHubSNBItem

SNB 목록의1/2depth 항목과 선택적 더보기 조작을 배치하는 계약입니다.
[상위 적용 조건](../../README.md)과 [SNBPanel](../AgentHubSNBPanel/README.md)의 데이터·스크롤·내비게이션 책임을 따릅니다.
기존 구현을 먼저 조사하고 없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 만들 수 있습니다.

직접 의존 계약은 [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md), `Link`, `Button`입니다.
Link/Button은 native 이동·명령의 의미 기준이며 실제 Figma Link/Button 인스턴스를 재사용한 것은 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Link/README.md`와 `DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 적용합니다.
원본 이름 menu-item과 depth/connector만으로 공용 Menu/Tree의 역할·keyboard 패턴을 자동 상속하지 않습니다.
제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [정의·속성·실제 재사용](./definition.md)
- [수치·색상·gradient·connector](./styles.md)
- [이동·펼침·더보기의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현·새 구현 연결](./implementation.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [menu-item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62441)의2depth×4state를 확인했습니다.
이는 실제 route·대화 선택·계층 펼침·더보기 메뉴·요청이 구현됐다는 증거가 아닙니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
