# AgentHubPickerFooter

Picker 하단에서 방향키·Enter 사용법과 선택적인 “에이전트 찾기” 동작을 보여주는 조합입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 실제 탐색·선택과 키 이벤트는 Picker가 소유하고 footer는 안내를 표시합니다.
기존 구현이 있으면 재사용하고, 없으면 [구현 연결 안내](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Divider`, `Button`, `AgentHubIcon`입니다. 실제 Figma 인스턴스 재사용은 Divider이며,
Button은 native 동작 의미를, AgentHubIcon은 자산 adapter를 참고하는 계약입니다. Footer 안에 Button·TextButton·Icon 원본 인스턴스가 있다는 뜻은 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Divider/README.md`와
`DOCS_ROOT/frontend/design/components/Button/README.md`의 해당 의미·접근성 계약을 적용합니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 원본 조합](./definition.md)
- [치수·색상·배치](./styles.md)
- [안내와 실제 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [기존 구현 연결·신규 구현](./implementation.md)
- [Figma 실측](../../references/picker.figma.json), [변수](../../references/picker.variables.figma.json), [자산](../../references/picker.assets.json)
- [원본 조합 대조](../../references/picker-composition.json)

2026-10-21에 Figma [picker/footer](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2627-62004)와
두 Picker 화면의 footer 조합을 확인했습니다. 정적 Light 샘플이며 실제 키보드 탐색·라우팅·스크롤·좁은 화면 검증은 포함하지 않습니다.
