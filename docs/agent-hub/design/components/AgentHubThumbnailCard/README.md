# AgentHubThumbnailCard

4:3 썸네일 영역과 제목·점·메타·선택적 설명을 보여 주는 Agent Hub 카드입니다.
[상위 적용 조건](../../README.md)을 따르고, 기존 제품 카드가 호환되면 adapter로 연결합니다.
없으면 [구현 안내](./implementation.md)에 따라 소비 제품에 새 export를 개발할 수 있습니다.
실제 제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

직접 의존 계약은 `Card`입니다. 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Card/README.md`의
활성화·접근성·상태 소유권을 함께 읽고 이 문서의 시각 차이를 적용합니다.
실제 Figma Card 인스턴스 재사용을 확인한 것은 아닙니다. 공용392px/r8·220px 이미지·선택 inset·자식 opacity0.4를 가져오지 않습니다.

- [정의와 실제 속성](./definition.md)
- [치수·상태·그림자](./styles.md)
- [동작과 데이터 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [실측](../../references/card.figma.json) · [변수](../../references/card.variables.figma.json) · [자산](../../references/card.assets.json) · [조합 대조](../../references/card-composition.json)

2026-10-21에 Figma [thumbnail-card](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3100-114430)의
5개 state를 확인했습니다. 세 표시 Boolean은 모두 true인 샘플이고 thumbnail은 이미지가 없는 placeholder입니다.
실제 이미지 로딩·이동·선택·dot의 업무 의미까지 구현된 결과가 아닙니다.
