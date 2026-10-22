# AgentHubCalendarDate — 검증

Figma Light mode `default`·`today`·`selected`·`null` 네 유형의 치수·내부 좌표·색상·글꼴을 확인했습니다.
실제 Agent Hub 앱의 source/export·브라우저 동작은 아직 미검증입니다.

- 네 유형의 셀이 높이 32px이며, 부모의 7열 분할을 유지하는지 확인합니다. 원본 폭 36.57143020629883px를
  37px로 반올림해 일곱 열이 259px가 되거나 모든 viewport에서 같은 폭을 강제하지 않습니다.
- selection은 32×32px, 원본 x2/y0, radius9999px이며 실제 border·shadow가 없는지 비교합니다.
  공용의 50% radius로 같은 원형을 구현한 경우 새 래퍼를 만들 필요는 없습니다.
- 라벨은 원본 x0/y4, 37×24px, Pretendard 16/24px·자간0입니다. 원본의 selection/라벨/셀 중심 차이를
  기록하고 유동 grid의 정렬 결과를 실제 제품에서 비교합니다.
- default는 Regular400·`#1C1C1C`, today는 SemiBold600·`#3B82F6`·하단 점,
  selected는 Regular400·`#FFFFFF`·`#3B82F6` 선택 원인지 확인합니다.
- 오늘 점은 4×4px, x16/y26, 하단 여유2px이며 선택된 오늘에서는 숨겨지는지 확인합니다.
  점을 숨겨도 `aria-current="date"`는 실제 날짜에 맞게 유지합니다.
- `null`에는 날짜 라벨·dot·실제 border가 없고, 빈 grid 자리만 유지하며 tab stop이나 선택 이벤트가 없는지 확인합니다.
- 날짜 순서·Tab·Enter/Space·선택 의미·focus-visible 1px outline과 offset1px·부모 clipping을 검사합니다.
- 제품이 범위·disabled·휴일·월/연도 view를 지원하면 공용 Calendar의 해당 동작과 우선순위를 별도로 검증합니다.
  이번 네 유형의 실측을 그 기능이나 dark·hover·pressed 색상의 검증 증거로 사용하지 않습니다.
- 검증한 source/public export만 제품의 로컬 mapping에 기록합니다. 문서와 Figma JSON의 전달은 실행 구현 완료를 뜻하지 않습니다.

- [공용 모션](../../motion.md)을 채택한 날짜/선택 원의 computed transition이200ms ease이며 geometry 전환이 없는지 확인합니다.
  선택 전후 같은 selection DOM 원이 유지되는지, today/selected/disabled 의미와 원본 paint가 보존되는지 검사합니다.
  prefers-reduced-motion:reduce에서는 transition:none이어야 합니다. 이 결과를 Figma의 motion 실측이라고 기록하지 않습니다.
