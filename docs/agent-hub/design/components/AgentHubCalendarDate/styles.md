# AgentHubCalendarDate — 크기와 색상

[4종 실측 기록](../../references/calendar-date.figma.json)의 Light mode 기준입니다.
공용 Calendar의 날짜 셀 구조는 유지하고, 오늘·선택 색상을 Agent Hub Calendar 범위에 매핑합니다.

## 크기와 배치

좌표는 각 날짜 셀 root 기준입니다. 원본은 auto layout이 아닌 내부 좌표로 배치돼 있습니다.

| 요소 | 원본 크기 | x / y | radius·글꼴 |
| --- | --- | --- | --- |
| 셀 root | 36.57143020629883×32px | 부모 grid에서 결정 | radius 0, padding 0 |
| selection | 32×32px | 2 / 0px | 9999px (`radius/full`) |
| 날짜 라벨 | 37×24px | 0 / 4px | Pretendard 16/24px, 중앙 정렬, 자간 0 |
| 오늘 점 | 4×4px | 16 / 26px | 9999px, 셀 하단 여유 2px |

셀 폭은 캘린더 본문의 256px를 7열로 나눈 결과입니다. 모든 화면에서 셀 폭을 이 소수점 상수로
고정하지 않고 부모 grid의 7열 분할을 유지합니다. 공용과 동일하게 셀 높이는 32px, 선택 원은 32px입니다.
radius 9999px와 공용의 50%는 이 정사각형에서 같은 원형을 만듭니다.

원본 라벨은 셀보다 약 0.42857px 넓습니다. selection과 오늘 점의 중심 x는 18px,
셀의 기하학적 중심은 약 18.285715px, 라벨 중심은 18.5px입니다.
원본 좌표를 모두 정확한 중앙 정렬이었다고 기록하거나 셀 폭을 37px로 반올림하지 않습니다.
제품에서 유동 grid·기존 정렬 구현과 연결할 때 이 미세 차이를 시각 비교하고 채택한 배치 근거를 남깁니다.

## 상태별 색상

| type | selection 배경 | 라벨 | weight | 오늘 점 |
| --- | --- | --- | --- | --- |
| default | 투명 | #1C1C1C | 400 | 없음 |
| today | 투명 | #3B82F6 | 600 | #3B82F6 |
| selected | #3B82F6 | #FFFFFF | 400 | 없음 |
| null | 투명 | 없음 | 해당 없음 | 없음 |

라벨의 변수는 default `color/text/default`, today `color/text/primary`, selected `color/text/on-primary`입니다.
선택 원과 오늘 점은 같은 값이어도 `color/element/primary`에 바인딩됩니다. 값이 같다는 이유로 텍스트와 도형의
semantic 역할을 하나로 합치지 않습니다. 이 primary 매핑을 공용 palette나 Agent Hub 전체 테마 변경으로 확대하지 않습니다.

공용 대비 날짜 글꼴·선택 원·오늘 점의 크기·하단 간격·기본/선택 글자색은 같습니다.
공용에서 의미 토큰으로 남긴 primary를 이 Light mode에서 `#3B82F6`으로 확인한 점과 내부 좌표의 미세 차이가 추가 근거입니다.
root·selection 모두 border·shadow가 없으며, 이 네 유형에 hover·pressed·disabled·range·dark 색상은 없습니다.
없는 상태를 네 유형 중 하나로 대체하거나 새 색상을 Figma 확인값으로 기록하지 않습니다.
