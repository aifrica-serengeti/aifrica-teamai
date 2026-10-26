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

## 제품 채택 전체 카드 활성화와 완료 상태

`onActivate`를 제공하면 기존 제목 button의 pseudo-element hit area를 카드 표면까지 확장할 수 있습니다.
제목·메타·여백·읽기용 상태를 누르면 같은 주 명령을 한 번 호출합니다. root의 click/keydown에 같은 callback을 추가하지 않습니다.
더보기·메뉴 명령·중지/재개는 주 명령 button 바깥의 형제 control로 두고 각 명령만 실행합니다.
단순히 모든 root click을 가로채거나 모든 자식에서 전파를 중단하는 방식으로 실행 경계를 대신하지 않습니다.

`trailingAction`의 메뉴 열림·실행·편집·공유·삭제는 제품 owner가 관리합니다. 더보기 클릭은 메뉴만 열고,
‘지금 실행’이나 중지/재개가 조회·편집 Dialog를 함께 열지 않아야 합니다. 메뉴 닫힘과 focus 복귀는 기존 Menu 계약을 유지합니다.

`completed`는 원본 active/paused 외의 제품 업무 상태입니다. 읽기용 완료 문구를 같은 footer 공간에 표시하고
중지/재개 control은 생략합니다. 완료 카드도 `onActivate`가 있고 disabled가 아니면 조회·편집을 열 수 있습니다.
disabled일 때는 카드 주 명령과 제품이 공급한 trailing action 모두 실제 native 입력을 차단합니다.

하단 중지/재개는 기존 `AgentHubIconButton`24px에 상태별 원본 glyph·disabled·단일 요청을 연결합니다.
공용 버튼이 hover/pressed·focus-visible·색상 전환을 소유하고, 카드 owner는 주 명령과 겹치지 않는 hit layer만 공급합니다.
상단 더보기는 노출 opacity150ms와 공용 색상200ms를 함께 유지해 opacity 전용 shorthand가 색상 전환을 지우지 않게 합니다.
이 버튼 조합은 제품 채택이며 원본 toggle FRAME의 독립 hover/pressed를 Figma에서 측정했다는 증거로 쓰지 않습니다.


## 공용 색상 모션

공용을 채택한 경우 [Card 모션 적용](../../cards.md#공용-색상-모션-계승)과 [공용 모션](../../motion.md)을 따릅니다.
root의 background-color·border-color·box-shadow·color와 해당 텍스트 color는200ms ease로 전환합니다.
이 값은 공용 계승 계약이며 Figma 정적 시안의 motion 실측값이 아닙니다. 원본에 없는 상태·표면을 자동 추정하지 않고
공용 버튼에서 채택한 추가 조작 표면은 위 제품 조합과 구분해 기록합니다.
disabled 입력은 즉시 차단하고 이 계약의 paint·opacity·정확한 SVG를 유지합니다. reduced motion에서는 전환을 해제합니다.
