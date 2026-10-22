# AgentHubCalendarDate — 접근성

시각 확장 후에도 공용 Calendar의 날짜 선택 의미와 키보드·focus 계약을 유지합니다.

- 실제 날짜는 native button 등 기존 Calendar의 선택 primitive를 재사용하고 Tab으로 이동하며 Enter·Space로 선택합니다.
  키보드와 click 처리가 겹쳐 중복 선택되지 않도록 확인합니다.
- 숫자만으로 날짜가 모호하지 않도록 부모의 월·연도 문맥과 날짜 이름을 연결합니다. Figma의 예시 `day`를 읽기용 이름으로 쓰지 않습니다.
- 오늘은 `aria-current="date"`, 선택은 실제 선택 모델에 맞는 `aria-selected`를 부모의 grid 구조와 함께 노출합니다.
  오늘과 선택이 겹쳐 점이 숨겨져도 오늘 의미를 제거하지 않습니다.
- 공용의 날짜 grid·주·셀 구조를 유지합니다. `null`은 빈 grid 자리만 유지하고, 선택 button·tab stop·가짜 날짜 이름을 만들지 않습니다.
- selection 도형과 오늘 점은 장식입니다. 따로 읽히거나 focus되는 요소로 만들지 않습니다.
- focus variant가 Figma에 없어도 표시를 제거하지 않습니다. 공용의 1px semantic outline·1px offset이 원형을 따라 보이며,
  부모 clipping이나 선택 배경에 가려지지 않는지 확인합니다.
- disabled 날짜를 제품이 지원하면 실제 입력과 변경 통지를 차단합니다. `null`이나 기본색 변경만으로 disabled를 표현하지 않습니다.
- 32px 시각 원만으로 제품의 타깃 크기·간격·대비 충족을 보증하지 않습니다. 실제 배경·인접 셀·확대 환경에서 확인합니다.

이번 확인은 정적 Light mode 네 유형의 모양과 값에 한정됩니다. 실제 focus·보조 기술·키보드·대비 통과 여부는
소비 제품에서 검증하고, 범위 선택 등 채택한 기능의 접근성도 함께 확인합니다.
