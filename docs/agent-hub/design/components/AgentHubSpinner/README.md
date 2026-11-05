# AgentHubSpinner

공용 Spinner의 로딩 의미와 상태 안내를 유지하면서 Agent Hub Figma의 크기별 정확한 SVG를 사용하는 확장입니다. Tiny 선 두께가 공용 baseline과 달라 별도로 기록합니다.

[상위 적용 조건](../../README.md)에 따라 frontend-common과 agent-hub를 함께 선택할 때 적용합니다. 실제 제품 source/export는 unmapped이며 공용 기본 계약을 덮어쓰지 않습니다.

- [정의와 범위](./definition.md)
- [치수와 표면](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [2026-11-05 근거](../../references/runtime-controls-refresh.figma.json)

출처: [Agent Hub spinner](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3801-98448). 개별 child context·metadata·스크린샷과 기존 공용 계약을 대조했습니다. native property ID·binding·prototype timing은 확인하지 않은 값을 만들지 않습니다.

직접 의존 계약은 `Spinner`입니다. 공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 각 공용 의존 계약을 함께 읽습니다.
