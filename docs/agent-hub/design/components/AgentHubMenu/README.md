# AgentHubMenu

공용 Menu의 명령·키보드·focus 계약을 유지하면서 Agent Hub의 compact 행과 패널 표현을 연결하는 확장입니다.
공용을 채택하고 `frontend-common` 역할을 선택한 frontend 작업에서 적용합니다.
공용을 끈 제품에는 공용 Menu 문서나 이 catalog를 요구하지 않습니다.

패널 radius12, 항목의 왼쪽16/오른쪽12px 여백, 항목별 선택적인 제목·구분선과 destructive 색상을 추가합니다.
실제 source/export는 `unmapped`입니다. 이 문서는 소비 제품의 실행 코드나 이미 구현된 variant를 뜻하지 않습니다.

## 문서와 조합

- [구조·공용 대비 차이](./definition.md)
- [크기·색상·레이아웃](./styles.md)
- [열림·명령·선택·서브메뉴](./behavior.md)
- [키보드·focus·접근성](./accessibility.md)
- [제품 검증 항목](./verification.md)
- [기존 Menu 연결·신규 구현 안내](./implementation.md)

항목의8개 구성은 [AgentHubMenuItem](../AgentHubMenuItem/README.md)을 함께 읽습니다.
공용 채택 시 `DOCS_ROOT/frontend/design/components/Menu/README.md`와
`DOCS_ROOT/frontend/design/components/Scrollbar/README.md`의 의미·동작을 연결합니다.
검색·모델·보조 조작이 있는 [Picker](../AgentHubPicker/README.md)와 이 명령 Menu는 별개의 조합입니다.

## 출처

2026-10-21에 [menu/item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3135-16031)8종과
[menu](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3135-16036) 단일 컴포넌트를 확인했습니다.
현재 메뉴는 default/enabled 항목11개를 조합하며 제목·구분선·glyph·value·스크롤바는 숨겨져 있습니다.

[실측](../../references/menu.figma.json) · [변수](../../references/menu.variables.figma.json) ·
[자산](../../references/menu.assets.json) · [조합 대조](../../references/menu-composition.json)

정적 Light 샘플과 숨김 노드 metadata를 확인한 범위입니다.
표시 옵션을 켠 전체 조합·실제 스크롤·서브메뉴·dark·협소 화면·명령 실행은 제품에서 검증합니다.
