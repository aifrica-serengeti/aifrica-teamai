# AgentHubSearch

공용 Search·Input의 입력 의미와 상태 소유권을 유지하면서 Agent Hub의 48/32px 크기·radius·돋보기·지우기·필터 표시를
연결하는 확장입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 Search와 Input을 확장·조합하며
별도 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Search/README.md`와
`DOCS_ROOT/frontend/design/components/Input/README.md`를 함께 읽습니다.
직접 의존 계약은 `Search`, `Input`, [AgentHubIcon](../AgentHubIcon/README.md)입니다.
실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [12종 Figma 실측 기록](../../references/search.figma.json)

2026-10-20에 Figma [search](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2304-19748)의
Light mode 12개 variant와 filter 표시 참조를 확인했습니다. 입력·검색 실행·필터 팝업 API, 미제공 상태와
실제 Agent Hub 앱의 렌더링·동작까지 검증한 것은 아닙니다.
