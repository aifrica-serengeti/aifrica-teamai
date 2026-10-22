# AgentHubDialog

Agent Hub의 예약 작업 편집과 에이전트 찾기를 기존 Dialog 엔진에 연결하는 화면 조합 가이드입니다.
공용 Dialog의 모달·focus·닫힘 의미를 유지하고, 이번 시안에서 확인한 표면과 본문 배치만 한정해 적용합니다.
적용 조건은 [상위 안내](../../README.md), 전체 범위는 [Dialog 확장 안내](../../dialog.md)를 따릅니다.

2026-10-21에 확인한 원본은 [예약 작업 편집](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3192-27853)과
[에이전트 찾기](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3163-22376) **FRAME 두 개**입니다.
재사용 가능한 Dialog COMPONENT나 완전한 상태 variant, 실제 제품의 공개 API가 확인된 것은 아닙니다.
별도 Header 컴포넌트·공개 API·스킬을 새로 만들지 않습니다.

레거시 X의 상태·focus는 공용 IconButton 계약을 직접 의존하며32/r4/glyph24의 실제 원본 identity는 유지합니다.

현재 폼 adapter 의존성은 [AgentHubInput](../AgentHubInput/README.md)·[AgentHubTextarea](../AgentHubTextarea/README.md)·[AgentHubSelect](../AgentHubSelect/README.md)이며 registry에 등록합니다. 아래 기존 source 설명은 Figma 원본 관계를 보존한 기록입니다.

직접 의존 계약은 공용 `Dialog`·`Textarea`·`Divider`, [AgentHubDialogFooter](../AgentHubDialogFooter/README.md),
[AgentHubButton](../AgentHubButton/README.md), [AgentHubSearch](../AgentHubSearch/README.md),
[AgentHubItemCard](../AgentHubItemCard/README.md), [AgentHubScrollbar](../AgentHubScrollbar/README.md)입니다.
Textarea는 label·IME·입력·접근성 의미를 참고하며 실제 textarea는 FRAME입니다. Finder Divider는 공용과 일치하는 실제 원본입니다.
Footer는 조합 계약을 참고하며 실제 예약 편집 footer는 FRAME입니다. Search·ItemCard·Finder Scrollbar는 실제 하위 원본이 연결됩니다.
레거시 닫기 버튼과 예약 편집 Scrollbar를 기존 Agent Hub 컴포넌트와 같은 source로 기록하지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Dialog/README.md`,
`DOCS_ROOT/frontend/design/components/Textarea/README.md`, `DOCS_ROOT/frontend/design/components/Divider/README.md`를 읽습니다.
공용을 끄면 공용 문서·스킬의 존재를 요구하지 않고 제품의 모달·접근성 계약으로 연결합니다.
이 계약은 CMP Dialog 전체 테마·기본 size나 다른 솔루션의 화면을 바꾸지 않습니다.
현재 실제 Agent Hub source/public export는 `unmapped`, 공유 설정은 `draft`입니다.

- [정의·실제 하위 원본과 경계](./definition.md)
- [수치·색상·공용과의 차이](./styles.md)
- [상태·닫힘·요청의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [기존 엔진 연결과 새 구현](./implementation.md)
- [예약 작업 편집 recipe](./scheduled-task-recipe.md)
- [에이전트 찾기 recipe](./agent-finder-recipe.md)
- [검증](./verification.md)
- [Figma 실측](../../references/dialog.figma.json)
- [변수와 alias](../../references/dialog.variables.figma.json)
- [자산과 실제 원본](../../references/dialog.assets.json)

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.

직접 의존 graph는 두 recipe의 합집합입니다. 예약 요청에 Finder 기능까지 생성하지 않고 [recipe 범위](./implementation.md)의 선택 절차를 따릅니다.
