# AgentHubCheckbox

공용 Checkbox의 선택·mixed·form·접근성 계약을 유지하면서 Agent Hub의12/16/20px 박스·radius3/4/5·마크 도형을
연결하는 확장입니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환 가능한 기존 Checkbox를 확장하며
새 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Checkbox/README.md`도 읽습니다.
직접 의존 계약은 `Checkbox`입니다. 마크는 이 컴포넌트 내부 도형이며 일반 AgentHubIcon을 조합한 인스턴스가 아닙니다.
실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [선택과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [18종 Figma 실측 기록](../../references/checkbox.figma.json)
- [원본 SVG12개와 출처·해시](../../references/checkbox.assets.json)

2026-10-20에 Figma [Checkbox-icon](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3074-98892)의
Light mode18종을 확인했습니다. 이 노드는 Box·Mark만 포함하며 label·hit area·group·focus·실제 앱 동작까지 확인한 것은 아닙니다.
