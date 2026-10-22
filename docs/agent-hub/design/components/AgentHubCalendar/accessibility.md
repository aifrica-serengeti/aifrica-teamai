# AgentHubCalendar — 접근성

공용 Calendar의 날짜 grid 의미·키보드·focus와 재사용 primitive의 native semantics를 유지합니다.

- 이전/다음 월·월 선택·취소·선택에 목적을 알 수 있는 이름을 연결합니다. chevron SVG는 장식으로 처리합니다.
  아이콘 이름이나 `month-label`을 그대로 접근성 이름으로 쓰지 않습니다.
- month-select에 상호작용 소유자는 하나만 둡니다. 중첩 button·중복 tab stop·한 번 조작에 두 이벤트를 만들지 않습니다.
  열림/전환 상태 속성은 실제 소유 API와 연결합니다.
- 날짜 grid·주·셀 관계와 표시 월·연도 문맥을 유지합니다. 실제 날짜는 공용 Calendar의 Tab·Enter/Space 선택을
  지원하며 기존 제품이 지원하는 방향키 등 추가 탐색도 유지합니다. grid 의미만 붙이고 키보드 처리를 생략하지 않습니다.
- 선택은 실제 grid 모델의 `aria-selected`, 오늘은 `aria-current="date"`로 노출합니다.
  오늘과 선택이 겹쳐 점이 사라져도 오늘 의미를 유지하고 빈 `null`에는 선택 button·tab stop을 만들지 않습니다.
- focus-visible은 공용의1px semantic outline·1px offset을 유지하고 날짜 원·파란 선택 배경·패널 clipping에
  가려지지 않게 합니다. Figma에 focus variant가 없다는 이유로 제거하지 않습니다.
- disabled가 있으면 native 의미·입력 차단·변경 통지 차단을 함께 검증합니다. 색이나 빈 날짜 셀로 대체하지 않습니다.
- 실제 배경의 대비, 인접 날짜/24px 아이콘 버튼의 타깃 크기와 간격, 긴 월 라벨·번역·확대 상태를 제품에서 확인합니다.
- 팝오버/dialog로 사용하면 열림 시 focus 이동, Escape 닫기와 trigger 복원은 해당 기존 계약에 연결합니다.

Figma의 정적 모양 대조는 보조 기술·키보드·대비 통과 증거가 아닙니다. 채택한 월/연도·범위 기능도 제품에서 검증합니다.
