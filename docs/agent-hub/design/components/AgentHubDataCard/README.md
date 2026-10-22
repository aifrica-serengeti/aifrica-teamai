# AgentHubDataCard

데이터 이름·보조 설명과 유형 Chip을 보여 주는 작은 정사각형 카드입니다.
[상위 적용 조건](../../README.md)과 [Card 선택 안내](../../cards.md)를 따릅니다.
기존 제품의 호환 구현이 없으면 [구현 안내](./implementation.md)에 따라 가까운 범위에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Card`, `Chip`입니다. Card는 정보·단일 action·focus 등의 의미 기준이며 실제 Figma Card 인스턴스를 사용한 것은 아닙니다.
실제 nested source 재사용은 일반 Chip 원본에 한정합니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Card/README.md`와 `DOCS_ROOT/frontend/design/components/Chip/README.md`를 함께 적용합니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 Chip 원본](./definition.md)
- [크기·Raised·글꼴·색상](./styles.md)
- [활성화와 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/card.figma.json), [변수](../../references/card.variables.figma.json), [자산](../../references/card.assets.json)
- [조합 대조](../../references/card-composition.json)

2026-10-21에 Figma [data-item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25252)의
enabled/hovered/pressed 세 상태를 확인했습니다. 선택·비활성·실제 데이터 열기·권한·요청·긴 문구 동작은 별도 검증 범위입니다.
