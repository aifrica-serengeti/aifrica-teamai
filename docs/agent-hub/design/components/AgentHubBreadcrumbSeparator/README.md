# AgentHubBreadcrumbSeparator

Agent Hub Breadcrumb 사이의 slash·dash·arrow 장식 구분자 참조 계약입니다.
높이24px·좌우8px 여백·#757575를 소유합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 Separator 구현이 이 규격을 지원하면 재사용하며 새 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Breadcrumb/README.md`도 읽고 구분자의 장식 의미를 유지합니다.
직접 의존하는 다른 UI 컴포넌트는 없습니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·자산](./styles.md)
- [배치와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [Figma 실측 기록](../../references/breadcrumb-separator.figma.json), [자산 출처](../../references/breadcrumb.assets.json)

2026-10-20에 Figma [BreadcrumbSeparator](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25423)의
Light mode 세 유형을 확인했습니다. 이 primitive의 dash가 Breadcrumb 전체 set에서도 확인됐다는 뜻은 아닙니다.
