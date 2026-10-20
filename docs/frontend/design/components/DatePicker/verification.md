# Date Picker — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](./README.md)

## 12. 검증 체크리스트

- [ ] 팝업에 Menu와 같은 그림자가 적용되고 1px spread 외곽 링은 없는지 확인한다. 기본 border와 focus ring은 유지한다.
- [ ] 열림/닫힘 모두 150ms ease 페이드·6px 이동이며, 위로 펼쳐질 때 이동 방향이 반전되는지 확인한다.
- [ ] 닫힘 동안 Content가 inert이고 애니메이션 종료/취소 뒤 제거되는지 `DatePicker.test.tsx`로 검증한다.
- [ ] 모션 감소 설정에서 즉시 열고 닫히며 날짜 선택·Escape·포커스 복원이 동일한지 확인한다.
- [ ] Dialog 안의 popup이 본문·scrim 위에 보이고 날짜 버튼이 실제 포인터 입력을 받는지 확인한다.
- [ ] Dialog/ScrollArea 경계를 넘어가는 Calendar가 잘리지 않고 기존 충돌 회피를 유지하는지 확인한다.
- [ ] 실제 브라우저 200% 확대·낮은 viewport에서 위/아래로 열리는 popup이 12px 충돌 여백 안에 있고, 공용 ScrollArea로 마지막 주까지 접근하는지 확인한다.
- [ ] 일/월/연도 view 전환 시 동일한 ScrollArea를 유지하고 날짜 선택 후 trigger로 복귀하는지 검증한다.
- [ ] 날짜 선택·Escape 후 trigger로 포커스가 돌아오고 상위 Dialog와 작성값을 유지하는지 확인한다.
- [ ] popup 외부의 다른 입력을 클릭하면 Calendar만 닫히고 해당 입력의 포커스가 유지되는지 확인한다.

- [ ] 솔루션 calendar 정책이 지정한 공휴일·대체공휴일과 일요일 강조만 표시하며, 미지정 국가를 KR로 가정하지 않는지 확인한다.
- [ ] 월/연도 이동 후 공휴일이 갱신되고 `holidayCountry={null}`/`highlightSundays={false}`가 각각 동작하는지 확인한다.
- [ ] 4/5/6주 달에서 빈 마지막 주가 없고 선택된 휴일은 솔루션의 selected/on-primary 토큰을 유지하는지 확인한다.

- [ ] `selectionUnit="month"`가 유효한 입력값 연도의 월 12개를 기본 표시하는지 확인한다.
- [ ] 월 선택 즉시 callback에 해당 월 1일을 전달하고 popup이 닫히는지 확인한다.
- [ ] 다른 연도 선택은 값을 확정하지 않으며, 재열기 시 선택한 연도의 월 목록인지 확인한다.
- [ ] 기본 `day`는 입력값의 월로 열리고 월 선택 후 일자 선택을 유지하는지 확인한다.
- [ ] controlled text, disabled/read-only, Escape 무변경을 `DatePicker.test.tsx`로 검증한다.

- [ ] Single과 Range의 label/input/help 간격이 각각 4px인지 확인한다.
- [ ] Range가 `YYYY.MM.DD - YYYY.MM.DD` 순으로 붙어 보이며, 두 날짜 input이 균등 분할되지 않는지 확인한다.
- [ ] small: 28px field, 20px calendar button, 16px icon, 우측 5px인지 확인한다.
- [ ] medium 이상: 24px calendar button, 우측 3px인지 확인한다.
- [ ] input 클릭으로 Calendar가 열리지 않고, schedule button으로만 열리는지 확인한다.
- [ ] `2026.12.11`은 유효, `20261211`, `2026/12/11`, `2026.13.41`, `2026.02.29`는 자동 Invalid인지 확인한다.
- [ ] 정상 기본값·직접 입력·Calendar 선택값의 native `patternMismatch`가 false이며, submit 버튼 클릭·`requestSubmit()`이 실제 form 제출까지 도달하는지 확인한다. synthetic submit 이벤트만으로 통과 판정하지 않는다.
- [ ] 잘못된 형식과 빈 required 값은 native validation에서 막고, 스케줄 이력의 존재하지 않는 날짜·빈 날짜·역전된 기간은 page 검증에서 조회를 막고 입력을 보존하는지 확인한다.
- [ ] 미완성 `2026.12.1`에는 error가 표시되지 않고, 올바르게 수정하거나 Calendar 선택 시 error가 해제되는지 확인한다.
- [ ] read-only에서 text는 유지되고 calendar button은 disabled 색·동작인지 확인한다.
- [ ] disabled가 invalid보다 시각적으로 우선하는지 확인한다.
- [ ] `.dark`에서 form surface, focus `var(--accent-400)`, invalid `#f52424`, error text `#fec3c3`으로 전환되는지 확인한다.
- [ ] Tab/Enter/Space, `aria-invalid`, `role="alert"`, Range 시작/종료 `aria-label`을 확인한다.

## 13. 새 프로젝트 재현 잠금 계약

이 계약은 DatePicker을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 portal surface, focus return, Escape와 keyboard interaction, open/close animation을 소유한다. 부모는 문서의 open callback/controlled API로만 연결한다.
- **변형 금지**: 임의 z-index, 다른 overlay primitive, browser 기본 popup, 문서에 없는 viewport 재배치는 사용하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
