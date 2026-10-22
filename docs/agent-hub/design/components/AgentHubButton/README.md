# AgentHubButton

공용 Button의 동작·접근성을 유지하고 Agent Hub의 radius·색상·아이콘 크기·keycap 표현을 연결하는 확장입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 Button에 스타일을 연결할 수 있으며,
별도 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Button/README.md`와 아래 문서를 함께 읽습니다.
직접 의존 계약은 `Button`, `AgentHubIcon`입니다. 실제 제품의 source/export는 아직 `unmapped`입니다.

- [입력과 지원 조합](./definition.md)
- [radius·크기·상태별 색상](./styles.md)
- [상태·동작·단축키](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [44종 Figma 실측 기록](../../references/button.figma.json), [변수와 alias](../../references/variables.figma.json)

출처는 Figma [button](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3025-25029)입니다.
2026-10-20의 Light mode 44개 variant를 확인했습니다. 전체 앱 테마나 다크 모드의 확인을 뜻하지 않습니다.
