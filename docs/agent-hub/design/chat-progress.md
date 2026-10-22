# Agent Hub 생각 중 진행 표시

AI가 생각하는 동안 헤더 하단 gradient를 흐르게 하고, 대화 안에 생각 중 상태와 경과시간을 표시하는 안내입니다.
`frontend-common`과 `agent-hub`를 함께 선택하고 공용을 채택한 frontend 작업에서 적용합니다.
공용을 끄면 이 catalog와 공용 문서를 강제하지 않고 제품 자체 계약을 사용합니다.

| 구분 | Figma에서 확인한 내용 | 추가 구현 기준 |
| --- | --- | --- |
| Header |48px·하단1px·325px band·4stop gradient, 주석의 ‘사고 중 하단선을 따라 흐름’ | [ChatHeader motion](./components/AgentHubChatHeader/motion.md). 기본 static, 명시 thinking 선택 |
| 상태 행 | BrandMark32·gap8·14/20 정적 gradient text·opacity.69, ‘생각하는 중 · 4초’ 표본 | [ThinkingStatus](./components/AgentHubThinkingStatus/README.md). 현재 채택은 균일한 글자+주기적 두 띠이며 부모가 phase·request·경과값 공급 |
| 모션 시간 | 원본 motion 조회 결과 `nodes:[]` | **1800ms·linear·물리적 좌→우·무한 반복·delay0은 구현 제안값** |
| 협소 폭·축소 동작 | 별도 시안 미제공 | band=min(325,track폭), track만 clip, reduce에서 정적 band는 제안 |
| 경과시간 갱신 |4초는 표본 문구 | 유효 초는 floor·잘못된 값은 suffix 제외·외부1000ms cadence는 제품 제안 |

1. [실측](./references/chat-progress.figma.json)과 [변수](./references/chat-progress.variables.figma.json)에서 원본 값을 확인합니다.
2. [별도 제안 JSON](./references/chat-progress.motion.proposal.json)과 Header motion의 CSS·측정/cleanup 예시를 읽습니다.
3. ThinkingStatus의 [정의](./components/AgentHubThinkingStatus/definition.md)·[스타일](./components/AgentHubThinkingStatus/styles.md)·
   [동작](./components/AgentHubThinkingStatus/behavior.md)·[구현](./components/AgentHubThinkingStatus/implementation.md)·
   [접근성](./components/AgentHubThinkingStatus/accessibility.md)·[검증](./components/AgentHubThinkingStatus/verification.md)을 연결합니다.
4. 제품의 실제 요청 owner·BrandMark·header를 확인하고 채택값과 source/public export를 로컬 mapping에 기록합니다.
   확인 전에는 `unmapped`/`draft`를 유지합니다.

기존 Header는 `indicatorMode` 미지정 시 static입니다. thinking mode는 안정적인 active request 키와 함께 명시적으로 채택합니다.
`showActiveIndicator=false`이면 mode와 관계없이 track·observer를 제거하고 기본 하단선만 유지합니다.
Header 자체의 overflow는 visible로 두고 **하단1px track만** 잘라 action의 focus ring을 보존합니다.
생각 중 종료·요청 교체·대화 전환에서 track을 정리하고, animation이 반복됐다는 이유로 요청을 완료 처리하지 않습니다.

상태 행과 Header는 같은 부모의 phase를 읽습니다. ThinkingStatus가 독립 timer·요청 상태를 만들거나 Header의 animation callback으로
초를 올리지 않습니다. 외부 갱신 주기는1.8초 band 반복과 별개이며 기존 제품 clock을 재사용합니다.
로고는 정적 PNG를 유지합니다. 상태 글자의 원본5-stop gradient는 비교 자료이며 현재 소비 recipe에는 고정 배경으로 적용하지 않습니다.
ThinkingStatus의 기본은 별도로 채택한 `shimmer`입니다. 균일한 #000/opacity.69 글자 위에서 폭28%·중심 간격50%인 두 띠의
주기적 패턴만1800ms linear로 움직입니다. static/reduced에는 띠와 고정 흐림을 없애고 균일한 문구를 남깁니다.
읽기·forced-colors·print 대안과 비율·이음새 검사는 [현재 채택](./components/AgentHubThinkingStatus/styles.md)을 따릅니다.
이 수치는 Figma 실측이 아닌 사용자 채택·구현 제안값입니다. Header의 기본 static은 그대로이며 로고 회전·GIF·streaming·송신 버튼의 stop 전환으로 확대하지 않습니다.

[자산 기록](./references/chat-progress.assets.json)의 기존 PNG와 file/more16 SVG를 재사용합니다. 새 자산은 없습니다.
Figma 화면의 빨간 박스와 설명은 개발 주석이므로 제품 UI에서 제외합니다.
이 예시는 Composer enabled와 사용자 발화 이후의 thinking 조합이며, typing 효과나 실제 응답 본문 renderer의 규격은 아닙니다.

이 문서는 기존 정적 Header와 생각 중 조합을 함께 사용할 수 있도록 확장한 계약입니다.
실제 제품의 timing 선호·reduce·keyboard focus·경과시간·장기 요청·좁은 화면·CSS animation과 픽셀 일치는 제품에서 검증합니다.
