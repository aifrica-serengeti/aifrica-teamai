# AgentHubTextButton

공용 TextButton의 tiny 기준을 유지하면서 Agent Hub의 16px trailing 아이콘을 연결하는 확장입니다.
높이·radius·글꼴·상태별 색상은 공용 tiny와 같고, 아이콘 크기와 선 두께가 다릅니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 TextButton을 재사용할 수 있습니다.

공용을 켠 UI 작업에서 `DOCS_ROOT/frontend/design/components/TextButton/README.md`도 함께 읽습니다.
직접 의존 계약은 `TextButton`, `AgentHubIcon`입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [4종 실측 기록](../../references/text-button.figma.json), [변수와 alias](../../references/switch-text.variables.figma.json)

2026-10-20에 Figma [text-button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2427-25177)의
enabled·hovered·pressed·disabled 네 상태를 확인했습니다. 새로운 UI 구현이나 실제 앱 검증을 뜻하지 않습니다.
