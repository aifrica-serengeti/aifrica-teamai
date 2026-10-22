# AgentHubSwitch

공용 Switch의 의미·상태 소유권·접근성을 유지하면서 Agent Hub의 파란 On 색상과 확인한 22px 크기를 연결하는 확장입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 기존 Switch의 medium 크기와 토큰 매핑을 재사용할 수 있으며,
새 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Switch/README.md`와 아래 문서를 함께 읽습니다.
직접 의존 계약은 `Switch`입니다. 실제 제품의 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·radius·상태색](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [4종 Figma 실측 기록](../../references/switch.figma.json)

출처는 Figma [switch](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3145-17067)입니다.
2026-10-20의 Light mode `size=22` × On/Off × enabled/disabled 4종을 확인했습니다.
라벨·dark·focus·read-only·invalid·loading의 시각 변형이나 실제 앱 구현을 확인한 것은 아닙니다.
