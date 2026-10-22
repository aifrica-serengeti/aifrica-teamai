# AgentHubCalendar — 정의와 조합

헤더의 표시 월·월 이동, 요일·날짜 grid, 하단 취소·선택으로 구성하는 날짜 선택 패널입니다.
Figma root는 `calendar` 단일 COMPONENT이며 공개 앱 props를 정의하지 않습니다.
`month-label`, 일~토, 1~30일과 5주는 샘플입니다. 특정 월·연도·locale·공휴일 정책을 고정하지 않습니다.

## 실제 재사용 관계

아래 다섯 인스턴스는 기존 Agent Hub primitive 원본 ID와 연결돼 있습니다.
치수·radius·색상·테두리·글꼴·glyph를 독립 실측 기록과 대조한 결과는 [조합 검증 기록](../../references/calendar-composition.json)에 있습니다.

| 위치 / 인스턴스 | Agent Hub 원본 variant | 실제 내용 |
| --- | --- | --- |
| 취소 `3149:117355` | Button tertiary / 32 / enabled, `3073:390` | 취소, 아이콘 없음 |
| 선택 `3149:117363` | Button primary / 32 / enabled, `3073:366` | 선택, 아이콘 없음 |
| 월 펼침 `3149:117331` | IconButton ghost / 24 / default, `2427:25108` | chevron-down/16 |
| 이전 월 `3149:117336` | IconButton ghost / 32 / default, `2427:25106` | chevron-left/20 |
| 다음 월 `3149:117340` | IconButton ghost / 32 / default, `2427:25106` | chevron-right/20 |

하단 버튼은 라벨에 따른 폭57px이며 고정 폭 규격이 아닙니다. leading/trailing은 false입니다.
전역 keycap 속성 기본값이 true여도 size32의 실제 자식에는 keycap이 없으므로 추가하지 않습니다.
아이콘은 [manifest](../../asset-manifest.json)의 정확한 이름·크기·출처와 로컬 SVG를 재사용합니다.

`month-select`(`3149:117326`)는 높이28px의 **캘린더 내부 조합**입니다.
16/24px 월 라벨과 ghost24 chevron-down을 담으며 독립 TextButton 인스턴스가 아닙니다.
기존 AgentHubTextButton tiny24 규격을 전체 적용하면 높이·글꼴이 달라집니다.
공용 Calendar의 월 헤더 조합을 확장하되 공용 `triangle_down` 매핑 대신 원본 `icon/chevron-down/16`을 연결합니다.
공용 매핑도 lucide ChevronDown을 사용하므로 이름만으로 도형이 달라졌다고 단정하지 않고 실제 자산·크기·선을 비교합니다.

날짜 grid는 [AgentHubCalendarDate](../AgentHubCalendarDate/README.md)의 네 시각 유형을 조합합니다.
월 계산·선택 값·확정/취소는 Calendar 또는 기존 호출자의 상태 소유권을 유지합니다.
입력 필드·Popover·ScrollArea를 포함한 DatePicker 조립은 이번 두 노드의 확장 범위에 포함하지 않습니다.
