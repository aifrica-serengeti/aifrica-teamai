# AgentHubFlyoutHeader

Flyout의 제목·개수·설명을 표시하는 전용 조합입니다. [상위 적용 조건](../../README.md)을 따릅니다.
기존 구현을 먼저 비교하고 없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 만들 수 있습니다.
직접 컴포넌트 의존성은 없습니다. MenuLabel·Tooltip header 등의 원본을 재사용한 것으로 기록하지 않습니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

후속 채택에서 shell은 `withDivider:true`로 내용54px 아래 고정 구분9px을 Header에 연결합니다.
standalone 기본false/54px은 유지하고, 구분선은 body를 스크롤해도 사라지지 않습니다.

- [정의와 텍스트 속성](./definition.md)
- [치수·글꼴·색상](./styles.md)
- [데이터와 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현·신규 구현 연결](./implementation.md)
- [실측](../../references/flyout.figma.json) · [변수](../../references/flyout.variables.figma.json) · [자산](../../references/flyout.assets.json) · [조합 대조](../../references/flyout-composition.json)

2026-10-21에 Figma [flyout/header](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3005-23089)와
[Flyout](../AgentHubFlyout/README.md) 내부의 실제 header 인스턴스를 확인했습니다.
정적 Light 한 줄 샘플이며 긴 제목·다국어·실제 데이터 갱신·보조 기술 동작은 제품 검증 범위입니다.
