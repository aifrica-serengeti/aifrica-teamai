# AgentHubCalendar

Agent Hub의 날짜 선택 패널 참조 계약입니다. 공용 Calendar의 의미·동작을 유지하고 패널 radius12px,
실제 shadow, Agent Hub Button·IconButton과 날짜 셀을 연결합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 Calendar를 확장·조합할 수 있으며 별도 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Calendar/README.md`도 함께 읽습니다.
직접 의존 계약은 `Calendar`, [AgentHubCalendarDate](../AgentHubCalendarDate/README.md),
[AgentHubButton](../AgentHubButton/README.md), [AgentHubIconButton](../AgentHubIconButton/README.md),
[AgentHubIcon](../AgentHubIcon/README.md)입니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 조합](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [패널 Figma 실측 기록](../../references/calendar.figma.json)
- [재사용 컴포넌트 대조 결과](../../references/calendar-composition.json)

2026-10-20에 Figma [calendar](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3149-117371)의
Light mode 일자 view 한 구성을 확인했습니다. 입력 필드를 포함한 DatePicker, 월·연도 view, 범위·disabled·dark의
새 시각 규격이나 실제 앱 구현까지 확인한 것은 아닙니다.
