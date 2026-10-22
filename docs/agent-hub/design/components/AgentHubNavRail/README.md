# AgentHubNavRail

52px 탐색 항목과 하단 설정/사용자 표시를 배치하는 Agent Hub의68px 전용 rail입니다.
[상위 적용 조건](../../README.md)을 따릅니다. 기존 호환 탐색 영역과 실제 Button·자산 adapter를 먼저 확인하고 재사용합니다.

직접 의존 계약은 [AgentHubNavItem](../AgentHubNavItem/README.md), [AgentHubIconButton](../AgentHubIconButton/README.md), `Avatar`입니다.
실제 Figma 재사용은 NavItem4개와 설정 IconButton입니다. Avatar는 이름·대체 표현의 의미 참고이며 원본은 직접28px FRAME입니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Avatar/README.md`와 실제 host의 Button/Link 접근성 계약을 참고합니다.
CMP SNBV1/V2의 크기·테마·props·route/API를 가져오지 않습니다. 실제 제품 source/export는 `unmapped`, 공유 설정은 `draft`입니다.

- [구성과 실제 하위 source](./definition.md)
- [치수·표면·배치](./styles.md)
- [탐색과 하단 action의 책임](./behavior.md)
- [접근성](./accessibility.md)
- [기존 구현 연결과 제품 recipe](./implementation.md)
- [검증](./verification.md)
- [실측](../../references/snb.figma.json) · [변수](../../references/snb.variables.figma.json) · [자산](../../references/snb.assets.json)

2026-10-21에 Figma [nav-rail `2611:62055`](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2611-62055)의 Light 단일 COMPONENT를 확인했습니다.
보드의 전시 폭·radius100·제목·40px 간격은 앱 shell 규격이 아닙니다. panel과의 실제 제품 조합은 [전체 SNB](../AgentHubSNB/README.md)에서 따로 연결합니다.

현재 채택 동작은 [상태·모션·스크롤 계약](../../motion.md)을 함께 읽습니다. 정적 Figma 관찰과 계승 동작을 구분합니다.
