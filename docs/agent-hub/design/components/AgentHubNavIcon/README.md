# AgentHubNavIcon

NavRail에서 사용하는 home·book·clock·search의 전용28px 아이콘 계약입니다.
[상위 적용 조건](../../README.md)을 따르며 기존 AgentHubIcon의16/20/24px 도형을 확대해 대체하지 않습니다.
호환되는 자산 adapter가 있으면 재사용하고 새 SVG 엔진이나 래퍼를 강제하지 않습니다.

직접 의존 컴포넌트는 없습니다. glyph 자체는 action이 아니며 동작·이름은 [NavItem](../AgentHubNavItem/README.md)이 소유합니다.
실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [원본과 지원 범위](./definition.md)
- [크기·색상·도형](./styles.md)
- [상태와 책임](./behavior.md)
- [접근성](./accessibility.md)
- [자산 연결과 구현](./implementation.md)
- [검증](./verification.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [icon set `2611:62007`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62007)의 Light4종과
NavItem/Rail의 실제 색상 override를 확인했습니다. 전체 glyph×상태 matrix·dark·disabled를 측정한 것은 아닙니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
