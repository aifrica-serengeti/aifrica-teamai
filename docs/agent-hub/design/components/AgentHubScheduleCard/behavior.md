# AgentHubScheduleCard — 상태와 명령

예약 ID·제목·meta·status·selected·disabled·중지/재개 요청 수명은 제품의 예약 owner가 관리합니다.
카드 내부에 별도의 active/paused 상태를 두어 서버 결과·표시·button 이름이 어긋나게 하지 않습니다.
원본 state는 시각적 상호작용이며 active/paused와 같은 업무 상태가 아닙니다.

제품이 중지/재개 명령을 채택하면 active의 pause glyph는 paused 요청, paused의 circle-play glyph는 active 요청으로 명시적으로 연결합니다.
이 연결은 실제 API·권한·실패 복구를 제품에서 확인하는 구현 계약이며 원본에 예약 서비스가 들어 있다는 뜻이 아닙니다.
circle-play를 “지금 새 작업 실행”으로 자동 해석하거나 카드 선택/열기와 동시에 실행하지 않습니다.
active의 ‘label’은 샘플이므로 실제 상태 문구를 제품 데이터에서 제공합니다.

toggle-button FRAME은 native button 한 개로 연결합니다. click 한 경로에서 실제 disabled를 확인한 뒤 한 요청만 보냅니다.
native Enter/Space 외에 keydown·glyph·footer·root에서 같은 요청을 중복 호출하지 않습니다.
카드 조회/선택이 별도로 필요하면 비대화형 root 아래 header의 독립 control과 footer toggle을 형제로 배치합니다.
공용 interactive Card button 안에 toggle button을 중첩하지 않습니다.

카드의 선택과 예약 status 변경은 별개의 의도입니다. toggle 활성화가 카드 선택·상세 열기·실행 시작을 함께 수행하지 않게 합니다.
run-status FRAME은 읽기용 표시이며 toggle이나 Chip으로 만들지 않습니다.
서버 응답 전 낙관적 변경 여부·중복 요청 차단·실패 후 복구·요청 중 추가 시각은 제품이 채택하고 검증합니다.
disabled는 두 status에서 모두 실제 명령을 차단하며 paused와 같은 값으로 취급하지 않습니다.

명령 후 focus는 안정적인 해당 button에 유지하는 것을 기본 흐름으로 검토합니다.
목록 갱신으로 카드가 사라지면 owner가 가까운 유효 위치를 정하고, 상태 변경마다 페이지 첫 항목으로 focus를 보내지 않습니다.
자동 polling·실행 timer·재시도·toast·progressbar·전환 모션은 이 원본에 없으므로 자동 추가하지 않습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면은 새로 만들지 않습니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
