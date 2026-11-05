# AgentHubFileTab

열린 파일 이름과 닫기 조작을 보여 주는 Agent Hub 파일 패널 전용 탭입니다.

[Agent Hub 적용 조건](../../README.md)을 따르는 솔루션 참조 계약입니다.
**제품 source/export는 `unmapped`, 채택 상태는 `draft`, 런타임 검증은 미수행**입니다.
2026-11-05 Figma [file-tab](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=4056-17720)의 메타데이터·생성 디자인 context을 대조했습니다.

공용 Tab과 같은 선택/패널 전환 의미를 유지하는 AH 전용 확장입니다. 공용44px·최소폭120px·밑줄 표현을 파일용24px·radius4·반투명 선택 배경으로 바꿉니다. 기존 Tab의 closable adapter 계약을 참조하며 이미 실행 구현이 있다는 뜻은 아닙니다.

- [정의와 공용 비교](./definition.md)
- [스타일과 실측](./styles.md)
- [동작과 상태 소유권](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [제품 구현 연결](./implementation.md)
- [측정·variant·자산 관찰 기록](../../references/file-code-refresh.figma.json)
- [공용/기존 Agent Hub 대조](../../references/file-code-refresh.comparison.json)

직접 의존 계약: Tab (`DOCS_ROOT/frontend/design/components/Tab/README.md`, 공용 선택 시), [AgentHubIconButton](../AgentHubIconButton/README.md), [AgentHubIcon](../AgentHubIcon/README.md).
공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`를 읽습니다.
문서 예시를 소비 제품 구현 증거로 사용하지 않으며 공용을 제외한 묶음에는 해당 문서가 자동 포함되지 않습니다.

생성 참조의 입력·출력은 native 속성 ID·binding 전체를 보증하지 않습니다. 정적 Figma geometry와 제품 제안 API·행동을 구분하며,
샘플 데이터·폭·높이를 제품 전역 API의 고정값으로 만들지 않습니다.
