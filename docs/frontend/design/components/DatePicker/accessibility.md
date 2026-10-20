# Date Picker — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](./README.md)

## 9. 접근성

트리거 이름은 기본 `달력에서 날짜 선택`, 월 선택에서는 `달력에서 월 선택`이다.
월 버튼은 native button으로 Tab·Enter·Space를 지원하고 Escape는 값 변경 없이 닫는다.
disabled/read-only 상태에서는 월 선택도 열 수 없다.
빈 주 제거 후에도 모든 실제 날짜의 Tab 순서·Enter/Space 선택을 유지한다. 휴일은 비활성 상태가
아니므로 클릭/키보드 선택이 가능하며, 기존 선택 상태 표시를 휴일 색상으로 덮지 않는다.

schedule 버튼은 Radix Popover Trigger로 등록해 `aria-controls`와 popup ID를 연결한다.
날짜 선택·Escape로 닫을 때 버튼으로 포커스가 돌아오며, 상위 Dialog를 함께 닫거나 배경으로 포커스를 보내지 않는다.
Enter/Space로 열고 Escape로 닫는 동작은 일반 화면과 Dialog 내부에서 모두 동일하다.
스크롤이 필요한 확대 환경에서도 Tab으로 마지막 날짜에 접근할 수 있으며, 날짜 선택·Escape 후
trigger로 돌아오는 포커스 계약은 동일하다.
닫힘 모션 동안 `inert`로 더 이상 날짜를 선택하거나 팝업 내부로 Tab 이동할 수 없게 한다.
모션 감소 설정에서는 열림·닫힘 애니메이션을 끈다. 외곽 그림자를 바꾸더라도 입력·달력 버튼의
키보드 focus ring은 제거하지 않는다.

| 항목             | 구현                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| Label            | `<label htmlFor={startInputId}>`로 Single 또는 Range 시작일 input에 연결  |
| Range            | 시작/종료 input에 각각 `aria-label="{label} 시작일/종료일"`               |
| Required         | native `required`; 시각용 `*`는 `aria-hidden`                             |
| Invalid          | 각 input과 Range container에 `aria-invalid="true"`; 오류는 `role="alert"` |
| Calendar trigger | schedule button에 `aria-label`, `aria-haspopup="dialog"`, `aria-expanded` |
| Disabled         | native `disabled`로 Tab/클릭 차단                                         |
| Read-only        | text input의 `readOnly`; schedule button은 native `disabled`              |
| Focus            | Enabled input은 blue focus ring, read-only/disabled는 focus ring 없음     |
