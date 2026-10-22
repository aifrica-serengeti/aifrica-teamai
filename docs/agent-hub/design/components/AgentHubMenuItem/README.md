# AgentHubMenuItem

Agent Hub 명령 메뉴의 한 항목을 표현하는 계약입니다. 적용 조건은 [상위 안내](../../README.md)를 따르며,
열림·포지셔닝·키보드 탐색·닫힘은 [Menu](../AgentHubMenu/README.md)와 제품의 메뉴 owner가 관리합니다.
호환되는 기존 항목을 재사용하고, 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Menu`와 [AgentHubIcon](../AgentHubIcon/README.md)입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Menu/README.md`의 명령·키보드·비활성 계약을 함께 적용합니다.
공용 시각 값을 그대로 상속한다는 뜻은 아닙니다. 실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 표시 속성](./definition.md)
- [크기·상태별 색상](./styles.md)
- [명령과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/menu.figma.json), [변수](../../references/menu.variables.figma.json), [자산](../../references/menu.assets.json)
- [조합 대조](../../references/menu-composition.json)

2026-10-21에 Figma [menu/item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3135-16031)의
default/destructive × enabled/hovered/pressed/disabled 여덟 구성을 확인했습니다.
선택·토글·submenu·숨김 slot을 켠 모든 조합이나 실제 삭제·탐색·요청 동작까지 검증한 것은 아닙니다.
