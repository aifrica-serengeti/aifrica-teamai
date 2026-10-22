# AgentHubCalendar — 크기와 색상

[패널 실측 기록](../../references/calendar.figma.json)과 [변수](../../references/calendar.variables.figma.json)의 Light mode 값입니다.
JSON의 각 노드는 `styleRef`로 `styles` 항목을 참조합니다. 전체 Agent Hub palette 변경으로 확대하지 않습니다.

## 패널과 공용 대비 차이

| 항목 | Agent Hub 확인값 | 공용 대비 |
| --- | --- | --- |
| 외곽 | 샘플288×362px, 가로FIXED·세로HUG | 폭288 유지, 5주 높이는 예시 |
| radius | 12px, `radius/surface-sm` | 공용8px에서 변경 |
| 배경 / border | #FFFFFF / 1px INSIDE #DDDDDD | 공용 색·두께 유지 |
| padding / gap | 위아래4px·좌우0 / 세로4px | 공용 유지 |
| 첫 shadow | 0 0 1px 0 rgba(9,30,66,.31) | 공용 CSS의 0 0 0 1px과 blur/spread 차이 |
| 둘째 shadow | 0 4px 6px 0 rgba(9,30,66,.15) | 공용 유지 |

첫 shadow를 공용의 외곽 1px spread로 바꾸지 않습니다.
[Agent Hub Elevation](../../foundations/Elevation.md)의 Mid effect와 같은 값입니다. 보드 샘플의 opacity0.9는
이 패널의 opacity1에 상속하지 않습니다.

Figma는 INSIDE border여도 자식 FILL 폭이288px입니다.
CSS `border-box`의 실제 border가 자식 content 폭을286px로 줄이면 원본과 달라집니다.
inset/overlay border 또는 검증한 보정으로 외곽288px·본문 내부256px를 함께 유지합니다.
원본 `clipsContent: true`를 그대로 옮겨 focus 표시를 자르지 않습니다.

## 헤더와 하단

| 요소 | 크기·간격 | 시각 값 |
| --- | --- | --- |
| 헤더 | 288×52px, px16·py10, space-between | 중앙 정렬 |
| month-select | 샘플131×28px HUG, p2px 4px 2px 12px, gap0 | radius4, #FFFFFF, 실제 border 없음 |
| 월 라벨 | Pretendard SemiBold16/24px, 600, 자간0 | #1C1C1C |
| 월 펼침 | ghost24, glyph16, 선1px | radius4, 투명, glyph #1C1C1C |
| 이전·다음 묶음 | 68×32px, gap4 | 각각 ghost32, radius6, glyph20·선1.25px |
| 구분선 | 288px, 레이어 높이0·CENTER stroke1px | #EEEEEE |
| 하단 | 288×44px, px16·pb12·pt0, gap8, 오른쪽 정렬 | Button32 두 개 |
| 취소 | 높이32, px16·py4, gap4, radius6 | #FFFFFF / border1 #DDDDDD / 글자 #1C1C1C |
| 선택 | 높이32, px16·py4, gap4, radius6 | #3B82F6 / 실제 border 없음 / 글자 #FFFFFF |

두 하단 라벨은 Pretendard SemiBold14/20px·600·자간0입니다. 공용 Button32의 radius4 대신
기존 AgentHubButton의 radius6을 사용합니다. 월 이동도 기존 AgentHubIconButton32 radius6을 사용합니다.
month-select의 샘플 폭131px·버튼57px는 번역/실제 월 라벨에 따라 달라집니다.
구분선은 별도 1px 레이아웃 행이 아니므로 원본의 gap과 높이에 1px를 추가하지 않습니다.

## 본문과 날짜

- 샘플 본문은288×246px입니다. 요일 행은288×38px·px16·py8이며 라벨은14/20px·600·#1C1C1C입니다.
- 날짜 영역은 샘플288×208px·px16·pb16·pt0, 행 간격8px입니다. 내부256px를 같은 폭7열로 나눕니다.
- 각 행은32px이며 샘플은5행입니다. 실제 월의 필요한4~6주에 따라 본문과 패널 높이가 HUG로 달라집니다.
- 날짜 라벨16/24px, 선택 원32px, 오늘 점4px와 내부 좌표는 [날짜 셀 규격](../AgentHubCalendarDate/styles.md)을 따릅니다.
  오늘 글자·점과 선택 배경은 #3B82F6이며 선택 글자는 #FFFFFF입니다.

이 노드에는 hover·pressed·disabled·range·focus·월/연도 view·dark 시각 변형이 없습니다.
기존 primitive에 제공된 상태는 그 계약을 사용하고, 새 Calendar 상태가 검증됐다고 확대하지 않습니다.
