# AgentHubCalendar — 상태와 동작

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/components/Calendar/behavior.md`의 상태 소유권·일자/월/연도
전환·single/range·확정/취소 계약을 유지합니다. 이번 확장은 정적 일자 view의 시각 값이며 공개 API를 교체하지 않습니다.

Calendar와 호출자의 기존 계약에 따라 표시 월·선택 draft·확정 값을 관리합니다. 하단의 취소는 해당 draft를
되돌리고 선택은 허용된 값을 확정하도록 기존 모델에 연결합니다. Figma의 enabled 두 버튼만 보고 검증 전 값도
확정하거나 닫기·변경 이벤트를 중복 발생시키지 않습니다. 로컬 구현이 즉시 선택형이면 차이와 채택 근거를 기록합니다.

이전·다음은 표시 월을 이동합니다. month-select는 기존 월/연도 선택 전환에 연결하며 라벨은 실제 표시 월을 사용합니다.
전체 month-select를 하나의 trigger로 만들면 안쪽 chevron은 장식으로 처리합니다.
제품 API가 별도 toggle을 요구하면 바깥 label은 비상호작용 요소로 두고 안쪽 toggle만 조작 주체로 만듭니다.
바깥 button 안에 또 IconButton button을 넣지 않으며 `asChild` 등 미확인 API를 가정하지 않습니다.

요일 순서·locale·시간대·공휴일/일요일 강조는 제품 adapter가 정합니다. 일~토 샘플이나 샘플 날짜 배치를 정책 기본값으로
고정하지 않습니다. 월 앞뒤 빈 `null`은 grid 자리를 유지하되 실제 disabled 날짜로 바꾸지 않습니다.
실제 필요한4~6주만 만들고 샘플5주·높이362px 또는 빈6주를 강제하지 않습니다.

날짜는 부모가 계산한 today·selected·disabled 등 상태를 표현합니다. 선택된 오늘에서는 선택 원·흰 글자 우선,
오늘 점 숨김을 유지하되 실제 오늘 의미는 보존합니다. hover/range preview, grid 이탈 해제와 disabled/휴일 우선순위는
공용·제품 계약을 따릅니다. 이번 네 날짜 유형만으로 range·disabled의 새 시각 값을 만들어 확인값으로 기록하지 않습니다.

바깥 팝오버의 열기·닫기·바깥 클릭·focus 복원은 기존 소유 컴포넌트의 책임입니다.
이 패널 자료만으로 DatePicker 입력·Popover나 range API를 새로 정의하지 않습니다.


## 공용 색상 모션 계승

공용을 채택한 경우 [색상 모션](../../motion.md)의200ms ease를 이어받습니다. Figma 정적 state의 animation 실측값은 아닙니다.
패널의 background-color/border-color/box-shadow/color, 날짜 글자 color와 선택 원·오늘 점의 background-color 등
변하는 속성만 전환하며 geometry·크기·위치를 애니메이션하지 않습니다. 실제 날짜 셀의 selection 원은 항상 mount해
투명과 선택 배경 사이를 전환하고 selected마다 새 도형을 mount하는 방식으로 색상 전환을 끊지 않습니다.
오늘 점의 표시 여부·빈 null 셀·disabled 의미는 기존 계약을 유지합니다. native 입력 차단은 즉시 적용하고
reduced motion에서는 해당 transition을 명시적으로 해제합니다.
