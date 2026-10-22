# AgentHubPillChip

Agent Hub의 28px 높이 pill Chip 참조 계약입니다. 공용 Chip과 비교해 14/20px 글꼴·좌우12px 패딩·중립색 테두리를
사용하고 hovered·pressed·selected 시각 샘플을 추가합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 제품 Chip이 이 규격을 지원하면 재사용하며 별도 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Chip/README.md`도 읽습니다.
직접 의존 계약은 `Chip`입니다. 실제 제품의 source/export는 아직 `unmapped`이며,
Figma의 상태 이름만으로 선택·검색·필터 동작이나 앱 API가 확인됐다고 판단하지 않습니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [5종 Figma 실측 기록](../../references/pill-chip.figma.json)

2026-10-20에 Figma [chip](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25194)의
Light mode enabled·hovered·pressed·selected·`disalbed` 다섯 variant를 확인했습니다.
마지막 이름은 원본 오타이며, 제품에서 disabled 의미로 채택할 때 실제 입력 차단을 별도로 연결합니다.
