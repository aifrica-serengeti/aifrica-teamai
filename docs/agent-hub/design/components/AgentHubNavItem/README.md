# AgentHubNavItem

전용28px glyph를52×52px host에 배치하는 Agent Hub 탐색 rail 항목입니다.
[상위 적용 조건](../../README.md)을 따르며 기존52px 탐색 host와 자산 adapter가 호환되면 재사용합니다.

직접 의존 계약은 [AgentHubNavIcon](../AgentHubNavIcon/README.md), `Button`, `Link`입니다.
실제 하위 source는 NavIcon이며 공용 Button/Link는 동작 의미의 참고입니다. 실제 Figma Button/Link 인스턴스가 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Button/README.md`와 `DOCS_ROOT/frontend/design/components/Link/README.md`의 채택한 host 계약을 읽습니다.
실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [원본과 상태](./definition.md)
- [치수·색상](./styles.md)
- [선택·탐색·action](./behavior.md)
- [접근성](./accessibility.md)
- [구현 연결](./implementation.md)
- [검증](./verification.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [nav-item `2611:62032`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62032)의
clock4상태를 확인했습니다. 전체 glyph×4state·disabled·focus·dark·실제 route/action을 확인한 것은 아닙니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
