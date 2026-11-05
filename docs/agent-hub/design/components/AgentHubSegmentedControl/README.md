# AgentHubSegmentedControl

공용 SegmentedControl의 단일 선택·키보드 계약에 Agent Hub의 라벨형/아이콘형 시각을 추가합니다. 개별 segment는 이 계약의 compound part이며 별도 공개 컴포넌트 등록을 강제하지 않습니다.

[상위 적용 조건](../../README.md)에 따라 frontend-common과 agent-hub를 함께 선택할 때 적용합니다. 실제 제품 source/export는 unmapped이며 공용 기본 계약을 덮어쓰지 않습니다.

- [정의와 범위](./definition.md)
- [치수와 표면](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [2026-11-05 근거](../../references/runtime-controls-refresh.figma.json)

출처: [segmented-control](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3592-22853). 개별 child context·metadata·스크린샷과 기존 공용 계약을 대조했습니다. native property ID·binding·prototype timing은 확인하지 않은 값을 만들지 않습니다.

직접 의존 계약은 `SegmentedControl`·`AgentHubIcon`입니다. 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 각 공용 의존 계약을 함께 읽습니다.
