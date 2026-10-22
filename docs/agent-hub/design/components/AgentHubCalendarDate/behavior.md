# AgentHubCalendarDate — 상태와 동작

부모 Calendar가 실제 날짜와 오늘·선택 여부를 판단합니다. 셀은 전달받은 상태를 표현하며,
부모의 선택 값을 별도 내부 상태로 복제하거나 포인터·키보드 한 번에 변경 통지를 두 번 보내지 않습니다.
Figma의 `type` 네 가지를 제품의 controlled/uncontrolled API로 단정하지 않습니다.

실제 날짜는 부모 Calendar의 날짜 순서와 선택 정책을 따릅니다. `null`은 표시 월의 앞뒤 빈 자리로,
날짜 라벨·클릭·키보드 선택·tab stop을 만들지 않습니다. 빈 자리를 없애 grid 열이 당겨지거나,
없는 날짜를 `disabled`인 실제 날짜로 변환하지 않습니다.

오늘 날짜를 선택한 경우 공용 Calendar의 선택 우선순위를 유지합니다. 선택 원과 흰 라벨을 표시하고
오늘 점은 숨깁니다. 시각적으로 점을 숨겨도 실제 오늘 여부는 부모의 날짜 정보로 유지합니다.
공용의 disabled/휴일 우선순위도 시각 확장으로 바꾸지 않습니다.

이 노드는 범위 선택·hover preview·disabled·휴일·월/연도 view의 시각 계약을 제공하지 않습니다.
제품이 공용 Calendar의 범위 기능을 채택하면 첫 날짜 선택 후 preview, 앞뒤 날짜 정렬, grid 이탈 시 preview 해제와
선택/비활성 우선순위를 그대로 유지합니다. start/end/middle의 시각 값은 공용·제품의 근거를 함께 확인하고,
이번 네 유형만으로 범위 상태가 검증됐다고 표시하지 않습니다.

주 수·월 이동·locale·공휴일 정책·확정/취소는 부모 Calendar의 소유입니다.
네 유형에 없는 상태·모션은 제품에서 추가 근거를 확인하고, 이 셀을 이유로 공용의 상태나 기능을 제거하지 않습니다.


## 공용 색상 모션 계승

공용을 채택한 경우 [색상 모션](../../motion.md)의200ms ease를 이어받습니다. Figma 정적 state의 animation 실측값은 아닙니다.
패널의 background-color/border-color/box-shadow/color, 날짜 글자 color와 선택 원·오늘 점의 background-color 등
변하는 속성만 전환하며 geometry·크기·위치를 애니메이션하지 않습니다. 실제 날짜 셀의 selection 원은 항상 mount해
투명과 선택 배경 사이를 전환하고 selected마다 새 도형을 mount하는 방식으로 색상 전환을 끊지 않습니다.
오늘 점의 표시 여부·빈 null 셀·disabled 의미는 기존 계약을 유지합니다. native 입력 차단은 즉시 적용하고
reduced motion에서는 해당 transition을 명시적으로 해제합니다.
