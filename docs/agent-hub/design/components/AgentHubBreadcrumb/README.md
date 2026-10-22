# AgentHubBreadcrumb

공용 Breadcrumb의 경로·현재 위치·키보드·축약 계약을 유지하면서 Agent Hub의 16/24px 텍스트와
slash/arrow 구분자를 연결하는 확장입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 제품 Breadcrumb를 확장·조합하며 새 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Breadcrumb/README.md`도 읽습니다.
직접 의존 계약은 `Breadcrumb`, [AgentHubBreadcrumbSeparator](../AgentHubBreadcrumbSeparator/README.md)입니다.
실제 제품의 source/export는 아직 `unmapped`입니다.

- [정의와 재사용 관계](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 축약](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [Figma 실측 기록](../../references/breadcrumb.figma.json)
- [내부 구분자 조합 대조](../../references/breadcrumb-composition.json)

2026-10-20에 Figma [Breadcrumb](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25430)의
Light mode slash·arrow 두 구성을 확인했습니다. 실제 라우팅·축약·hover/pressed·focus·dark나 앱 렌더링까지 검증한 것은 아닙니다.
