# AgentHubAttachIconButton

공용 IconButton의 동작·접근성을 유지하면서 Agent Hub 첨부 버튼의 원형 모양과 상태색을 연결하는 확장입니다.
적용 조건은 [상위 안내](../../README.md)를 따릅니다. 호환되는 기존 IconButton에 변형을 연결할 수 있으며,
새 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/IconButton/README.md`와 아래 문서를 함께 읽습니다.
직접 의존 계약은 `IconButton`, `AgentHubIcon`입니다. 실제 제품의 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·radius·상태색](./styles.md)
- [상태와 첨부 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [5종 Figma 실측 기록](../../references/icon-button-attach.figma.json)

출처는 Figma [icon-button/attach](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3104-27)입니다.
2026-10-20의 Light mode 5개 variant를 확인했습니다. `state5`는 색상만 확인했으며 제품에서의 의미는 미정입니다.
전체 앱 테마나 다크 모드의 확인을 뜻하지 않습니다.
