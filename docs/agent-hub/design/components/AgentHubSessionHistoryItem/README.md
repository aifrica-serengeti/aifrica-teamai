# AgentHubSessionHistoryItem

예약 작업의 실행 기록 한 개를 보여 주는 행입니다. selected는 지금 보고 있는 실행,
dot은 확인하지 않은 실행의 표시입니다. [상위 적용 조건](../../README.md)을 따르며 실제 실행 ID·현재 보기·확인 상태는
[Session Panel](../AgentHubSessionPanel/README.md)과 제품 owner가 관리합니다.
기존 행이 없으면 [구현 안내](./implementation.md)에 따라 소비 저장소에 새 export를 만들 수 있습니다.

직접 의존 계약은 `Button`입니다. 단일 활성화·keyboard·focus 의미를 참고하며 실제 Figma Button 인스턴스를 재사용한 것은 아닙니다.
dot은 ELLIPSE로 별도 AgentHubIcon 의존성을 만들지 않습니다. 공용을 켠 UI 작업에서만
`DOCS_ROOT/frontend/design/components/Button/README.md`도 적용합니다.
제품 source/export는 `unmapped`, 공유 채택 설정은 `draft`입니다.

- [정의와 실제 표시](./definition.md)
- [크기·색상·읽지 않은 점](./styles.md)
- [현재 보기와 확인 상태](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [새 구현·기존 구현 연결](./implementation.md)
- [Figma 실측](../../references/session.figma.json), [변수](../../references/session.variables.figma.json), [자산](../../references/session.assets.json)
- [조합 대조](../../references/session-composition.json)

2026-10-21에 Figma [session/history-item](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=2995-22304)의
default/hovered/pressed/selected 네 상태와 실제 Panel의 다섯 기록을 확인했습니다.
클릭 시 자동 읽음 처리·실행 재시도·예약 성공/실패·기록 API까지 검증한 것은 아닙니다.
