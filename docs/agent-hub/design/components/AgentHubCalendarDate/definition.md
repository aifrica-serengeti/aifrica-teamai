# AgentHubCalendarDate — 정의와 지원 범위

Figma `calendar/date`는 날짜 라벨과 선택 원, 선택적으로 오늘 점을 보여 주는 셀입니다.
`type` 속성은 `default`, `today`, `selected`, `null` 네 가지입니다. 이 속성은 시각 상태이며,
공개 제품 API나 실제 날짜 값의 자료형을 정하는 근거가 아닙니다.

| 유형 | 보이는 구조 | 의미 |
| --- | --- | --- |
| default | 투명 selection + 날짜 라벨 | 현재 월의 일반 날짜 |
| today | 투명 selection + 강조 라벨 + 하단 점 | 오늘 날짜 |
| selected | 파란 selection + 흰 날짜 라벨 | 선택한 날짜 |
| null | 투명 selection만, 라벨 없음 | 월 grid 앞뒤의 빈 자리 |

selection은 별도 아이콘이 아닌 32×32px 원형 도형입니다. 모든 유형의 root와 selection에는 실제 border나 shadow가 없습니다.
`strokeWeight: 1`이 남아 있어도 `strokes: []`인 원본에 선을 추가하지 않습니다.
원본의 `day` 문자는 예시이며, 제품에서는 부모 Calendar가 계산한 실제 날짜 라벨을 넣습니다.

부모 Calendar가 표시 월·날짜 계산·선택 값·상태 우선순위·변경 통지를 소유합니다.
셀에 별도 달력 상태나 날짜 계산을 복제하지 않습니다. `null`은 실제 날짜의 disabled 상태가 아니며,
이전·다음 달 날짜를 회색으로 표시하는 유형도 아닙니다.

공용 Calendar의 의미 계약을 유지하면서 이 셀의 시각 값을 제품의 기존 날짜 셀에 연결합니다.
다른 UI primitive를 직접 조합하지 않으므로 registry의 직접 의존성은 비어 있습니다.
source/public export는 소비 저장소에서 확인한 후 로컬 매핑에 기록합니다.
