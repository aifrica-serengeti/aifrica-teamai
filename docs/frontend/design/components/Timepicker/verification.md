# Timepicker — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Timepicker 문서 인덱스](./README.md)

## 11. Verification: 새 환경에서 반드시 촬영할 상태

아래 화면을 모두 확인해야 구현 완료로 판단한다.

- [ ] medium single empty / filled / open을 나란히 확인한다. open panel에 150ms fade+up motion이 있다.
- [ ] open panel의 302px body 아래에 panel 전체 폭의 1px divider가 있고, 그 아래 footer가 44px인지 확인한다.
- [ ] 2열 및 3열에서 각 ScrollArea가 개별 카드처럼 보이지 않고, 마지막 열을 제외한 vertical divider만 있는지 확인한다.
- [ ] option click 후 선택된 시/분/초가 light blue #ebf3ff와 blue text #0066ff인지 확인한다.
- [ ] selected option을 hover/press해도 selected blue 효과가 유지되는지 확인한다.
- [ ] Range empty가 `hh:mm - hh:mm`처럼 인접한 6px gap 구조인지 확인한다. 두 값이 field 양끝으로 벌어지면 실패다.
- [ ] Range open 초기에는 start text, 첫 선택 버튼 뒤에는 end text만 blue인지 확인한다.
- [ ] Range 종료가 시작보다 이르면 즉시 red ring 및 `종료 시간이 시작 시간보다 빠릅니다`가 나오는지 확인한다.
- [ ] field focus/open, invalid를 번갈아 확인해 field 크기·clock left/right 위치·placeholder baseline이 변하지 않는지 확인한다.
- [ ] readOnly/disabled에서 clock이 실제 native disabled이고 popover가 열리지 않는지 확인한다.
- [ ] Now가 outline 없이 text action이며, 취소/선택이 공용 medium Button인지 확인한다.
- [ ] Enter/Space/ArrowDown open, Escape close, option keyboard selection, outside click draft discard를 확인한다.
- [ ] dark mode에서 focus var(--accent-400), invalid #f52424, dialog #1c1c1c, selected blue subtle이 적용되는지 확인한다.

## 12. 새 프로젝트 전달 묶음

이 가이드라인만 복사하고 의존성 컴포넌트를 대체 구현하면 Button, Icon, ScrollArea의 세부 상호작용이 달라질 수 있다. 다음 파일을 하나의 closure로 전달한다.

1. 이 문서와 [Reproduction Protocol](../../reproduction.md)
2. [Input](../Input/README.md), [Icon](../Icon/README.md), [Button](../Button/README.md), [Text Button](../TextButton/README.md), [Scrollbar](../Scrollbar/README.md)
3. Pretendard font asset 및 이 문서의 token 정의
4. Radix Popover 또는 동일한 portal/presence/data-state 계약을 충족하는 primitive

Timepicker 코드에서는 공용 컴포넌트를 다시 구현하지 않고, 이 문서에 명시된 field, range layout, dialog body/footer, column reset, option state, draft state machine만 소유한다.
