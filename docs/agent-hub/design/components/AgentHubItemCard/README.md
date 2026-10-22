# AgentHubItemCard

제목·보조 정보·설명·도구 로고와 더보기/고정/대화 조작을 묶는 Agent Hub 항목 카드입니다.
다른 유형과의 선택 기준은 [Card 안내](../../cards.md), 적용 조건은 [디자인 확장](../../README.md)을 따릅니다.
호환 구현이 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 개발할 수 있습니다.

직접 의존 계약은 `Card`, `Button`, [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md)입니다.
Card·Button은 의미·접근성·단일 활성화 기준입니다. 이 시안에 공용 Card/일반 Button 인스턴스가 있는 것은 아닙니다.
실제 IconButton 재사용은20px 더보기입니다.24px 고정·대화 조작은 직접 FRAME 조합입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Card/README.md`와
`DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 읽습니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 지원 상태](./definition.md)
- [수치·색상·자산](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [구현 연결](./implementation.md)
- [실측](../../references/card.figma.json), [변수](../../references/card.variables.figma.json), [자산](../../references/card.assets.json), [조합 대조](../../references/card-composition.json)

2026-10-21에 Figma [item-card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3095-143)의
default/hovered/pressed/selected/disabled/accent6종을 확인했습니다. 선택·고정·대화·더보기 API의 실제 실행까지 확인한 결과는 아닙니다.
