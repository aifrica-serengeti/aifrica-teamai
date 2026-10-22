# AgentHubCalendarDate

Agent Hub 캘린더의 날짜 셀 참조 계약입니다. 공용 Calendar와 같은 32px 선택 원·16/24px 글꼴·4px 오늘 점을
사용하며, 오늘 표시와 선택 배경의 primary를 `#3B82F6`으로 연결합니다. 적용 조건은 [상위 안내](../../README.md)를 따릅니다.
기존 Calendar의 날짜 셀과 토큰을 재사용할 수 있고, 새 컴포넌트나 래퍼 생성을 강제하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Calendar/README.md`도 함께 읽습니다.
이 셀 자체에는 다른 UI primitive나 아이콘 자산에 대한 직접 의존성이 없습니다. 실제 제품 source/export는 아직 `unmapped`입니다.

- [정의와 지원 범위](./definition.md)
- [크기·색상·공용 대비 차이](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증](./verification.md)
- [4종 Figma 실측 기록](../../references/calendar-date.figma.json)

2026-10-20에 Figma [calendar/date](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3149-19150)의
Light mode `default`·`today`·`selected`·`null` 네 유형을 확인했습니다. 날짜 계산·범위 선택·hover·disabled·dark나
실제 Agent Hub 앱 구현까지 검증했다는 뜻은 아닙니다.
