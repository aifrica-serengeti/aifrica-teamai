# AgentHubThinkingStatus — 상태와 시간의 책임

한 제품 owner가 request ID·처리 phase·경과시간과 결과를 관리합니다.
ThinkingStatus와 Header는 같은 현재 요청의 값을 표시하며 독립적인 request/phase·timer를 복제하지 않습니다.
이 상태 행은 요청·retry·abort·stream 구독·네트워크 호출을 시작하지 않습니다.

## 표시와 전환

제품이 실제 thinking phase일 때 상태 행을 표시합니다. 화면 이름이나 로고만 보고 생성 중이라고 판정하지 않습니다.
응답 본문 시작·완료·중단·실패에서 유지할지 제거할지와 후속 UI는 제품이 명시합니다.
원본 한 장에서 전체 lifecycle·자동 재시도·진행률·완료 시간 예측을 만들지 않습니다.
현재 요청과 다른 늦은 응답·경과값이 표시를 덮지 않게 request ID를 확인합니다.

상태 표시와 Header motion의 시작/종료는 [같은 처리 owner](../AgentHubChatHeader/motion.md)에 연결합니다.
이 컴포넌트는 Header action을 호출하거나 motion 상태를 새로 만들지 않습니다.
처리 중에도 Composer의 실제 입력·첨부·송신 허용 여부는 제품의 독립 정책입니다.

## 경과시간 입력

`elapsedSeconds`는 기존 시간원 또는 요청 owner가 공급하는 controlled number입니다.
유한하고0 이상인 값만 허용하고, 표시할 때 Math.floor로 정수 초를 얻습니다.
소수점·음수·NaN·Infinity를 문구에 그대로 붙이지 않습니다. undefined나 잘못된 값이면 시간 suffix를 제외하고 상태 라벨을 유지합니다.
잘못된 값은 제품 경계에서 처리하고 ‘0초’로 성공처럼 숨기지 않습니다.
최소 단위·locale·분/시간 전환·요청 시작 기준·일시 중단 시간 포함 여부·갱신 주기는 제품이 정합니다.

‘4초’를 초기값·고정 timer 간격·4초 뒤 종료 조건으로 사용하지 않습니다.
새 setInterval·requestAnimationFrame·Date.now 기반 시간원을 상태 행에 만들지 않습니다.
기존 owner의 경과값을 전달하고 새 request로 바뀔 때 기준값·표시를 일관되게 전환합니다.
주기가 필요한 제품에는 외부 owner의1000ms 갱신을 제안할 수 있지만 Figma 실측값은 아닙니다.
기존 clock을 사용해 현재 경과값 또는 시작 시각에서 다시 계산하며 tick마다1초씩 더하는 누적 오차를 만들지 않습니다.
unmount 뒤 남는 timer·구독도 이 컴포넌트가 추가하지 않습니다.

## 정적 표현과 접근성 안내

Figma의 로고와5-stop 텍스트 gradient는 정적 비교 근거입니다. 원본만으로 shimmer·로고 회전·깜빡임을 추정하지 않습니다.
현재 소비 표현은 아래의 명시적 채택을 따릅니다. static/reduced에서는 균일한 단색 라벨과 정적 로고를 유지합니다.
Header의 default static과 감소 동작 정책은 Header motion 계약이 소유하며 ThinkingStatus의 기본 shimmer와 구분합니다.
시간이 갱신돼도 focus나 대화 scroll을 자동으로 이동시키지 않습니다.
생각 중 진입·종료 등 필요한 상태 변화는 제품의 한 semantic status owner가 안내하고, 초 단위 갱신을 매번 live announce하지 않습니다.

## 이번 요청으로 채택한 shimmer

[명시적 채택](../../motion.md)은 균일한 글자 위에서만 두 흰 띠의 주기적 패턴이 일정 간격으로 움직이도록 허용합니다.
고정5-stop 아래층과 기존 단일 띠 recipe를 대체하며, Figma 원본에 shimmer가 존재했다는 뜻이 아닙니다.
제품 API의 `motion`은 `static | shimmer`, 채택 기본값은 `shimmer`입니다. 현재 thinking 여부·request ID·elapsed는 기존 부모가 계속 소유합니다.
문구/초 변경마다 key를 바꿔 모션·focus를 다시 만들지 않습니다. 표시 종료·요청 교체·unmount 시 이전 시각층도 정리합니다.
띠 중심 간격은 문구 폭의50%, 띠 폭28%, 맑은 간격22%입니다. 타일 한 주기를1800ms linear로 이동하는 값은 구현 제안입니다.
경계에서 띠 조각이 나뉘어 보일 수 있으며 온전한 봉우리 두 개의 상시 노출을 강제하지 않습니다.
읽기 모드·감소 동작·forced-colors·print가 모션 선택보다 우선합니다. 장식층과 반복을 함께 없애고 고정된 밝은 얼룩 없이 균일한 글자를 표시합니다.
로고·상태 라벨·필요한 비-live 시간 확인 경로는 남깁니다.
