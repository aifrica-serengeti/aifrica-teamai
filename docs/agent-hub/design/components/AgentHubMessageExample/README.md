# AgentHubMessageExample

예시 문구를 하나의 동작으로 선택하는 Agent Hub UI 계약입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 예시 문구 컴포넌트를 재사용하고, 없으면 [구현 순서와 제안 API](./implementation.md)에 따라
소비 저장소의 가까운 범위에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Button`과 [AgentHubIcon](../AgentHubIcon/README.md)입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Button/README.md`의 native action·접근성 계약을 적용합니다.
Figma에서 Button 인스턴스를 재사용했다는 뜻은 아닙니다. 실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 재사용 경계](./definition.md)
- [크기·색상·아이콘](./styles.md)
- [선택 동작과 제품 연결](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/message-example.figma.json), [변수](../../references/message-example.variables.figma.json), [자산](../../references/message-example.assets.json)
- [하위 조합 대조](../../references/message-example-composition.json)

2026-10-21에 Figma [message/example](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2320-28612)의
Light mode enabled·hovered·pressed 세 구성을 확인했습니다. 예시를 누른 뒤 draft를 바꿀지·추가할지·바로 실행할지는 제품이 정합니다.
발송된 사용자 메시지·선택 완료·송신 성공 상태나 실제 요청 동작까지 확인한 것은 아닙니다.
