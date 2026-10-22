# AgentHubTextarea — 구현

공용 Textarea의 native control·IME·선택/복사·값과 상태 계약을 먼저 확보합니다.
AgentHubTextarea는 surface140 / toolbar37 / label gap4 / radius8을 합성하며 공용 기본84px를 중복 강제하지 않습니다.
toolbar와 입력은 flex로 분리하고 140px 안에서 본문103·toolbar37을 확보합니다. 외곽 stroke는 layout을 추가하지 않습니다.
textarea는 container-owned focus를 사용하고 toolbar button은 독립 focus-visible을 유지합니다.
readOnly/disabled toolbar는 disabled fieldset 또는 동등한 native 처리로 keyboard와 pointer를 함께 막습니다.
현재 fixture의 forms.tsx→common/controls.tsx는 부분 API의 소비 예시이며 실제 제품 source/export는 unmapped입니다.
공용 count·모든 size/variant 등 전체 API가 완료됐다고 주장하지 않습니다. 공용 off는 자체 계약을 사용합니다.

## 연속 외곽 경계층

표면을 `position:relative`로 두고 `::after` 같은 장식층에 `position:absolute; inset:0; border-radius:inherit;
pointer-events:none; z-index:1`을 연결합니다. 이 층의 inset shadow로 선을 그리면 불투명한 toolbar 자식 위에도
좌우·하단 경계가 연속해서 남고,140px 전체 높이에 실제 border 공간을 추가하지 않습니다.
자식 아래에 그리는 부모 inset shadow만으로 외곽선을 구현하지 않습니다. 장식층은 접근성 이름·focus·클릭을 소유하지 않습니다.

default는 inset1px #DDD, `:has(textarea:focus-visible)`는 inset2px #3B82F6입니다.
invalid는1px #E81919, invalid+입력 focus는2px #E81919이며 read-only focus는 기본1px 경계를 유지합니다.
toolbar 자체의 위 #EEE1px divider·37px 높이·pY4/pX8과 입력 본문의103px를 보존합니다.
toolbar button focus는 그 버튼만 표시하고 전체 앱의 outline reset으로 textarea focus를 처리하지 않습니다.
reduced-motion에서는 외곽선의200ms 전환을 해제합니다.
