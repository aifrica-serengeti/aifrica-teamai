# AgentHubFlyoutItem

Flyout 안에서 파일·폴더·폴더 안 파일을 보여 주는 행 계약입니다.
적용 조건은 [상위 안내](../../README.md)를 따르고, 전체 열림·탐색·선택 흐름은 [Flyout](../AgentHubFlyout/README.md)과 제품 owner가 관리합니다.
호환되는 행을 재사용하고, 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 가까운 범위의 새 export를 만들 수 있습니다.

기본 평면 행의 직접 의존 계약은 `Button`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
Button은 독립 파일 동작의 의미 기준이며 실제 Figma Button 인스턴스를 재사용한 것은 아닙니다.
AgentHubIcon은 실제 하위 아이콘 원본과 제품 자산 adapter를 연결하는 기준입니다.
공용을 켠 기본 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Button/README.md`를 함께 적용합니다.
`Tree`는 standalone folder/open/child 모양의 과거 의미 비교 참고입니다. 제품이 별도 계층 탐색을 채택할 때만
`DOCS_ROOT/frontend/design/components/Tree/README.md`를 추가로 확인하며 기본 Flyout의 필수 탐색 문서가 아닙니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

후속 사용자 요청의 폴더 recipe는 부모 소유 펼침 상태와 native disclosure 목록을 사용합니다.
본문250ms·down glyph 회전200ms는 [채택 모션](../AgentHubFlyout/motion.md#폴더-펼침접힘-채택)이며 Figma 실측이 아닙니다.
평면 목록은 이 상태 없이 유지하고, child selected의 기존 item 배경 재사용도 별도 runtime 채택으로 구분합니다.

- [정의와 실제 지원 조합](./definition.md)
- [크기·색상·자산](./styles.md)
- [파일 선택과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/flyout.figma.json), [변수](../../references/flyout.variables.figma.json), [자산](../../references/flyout.assets.json)
- [조합 대조](../../references/flyout-composition.json)

2026-10-21에 Figma [flyout/item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23146)의
10개 variant를 확인했습니다. item은 default/hovered/pressed/selected 네 상태,
folder·folder-open·child는 각각 default/hovered 두 상태입니다.
모든 종류의 선택·누름·비활성 시각, 실제 파일 열기·폴더 요청·트리 키보드 구현을 확인한 것은 아닙니다.
