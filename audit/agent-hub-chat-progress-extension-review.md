# Agent Hub 생각 중 진행 표시 확장 — 독립 검증

검증일: 2026-10-21. 대상은 [진행 표시 안내](../docs/agent-hub/design/chat-progress.md),
[ChatHeader motion](../docs/agent-hub/design/components/AgentHubChatHeader/motion.md)과
[ThinkingStatus 7문서](../docs/agent-hub/design/components/AgentHubThinkingStatus/README.md), 참조4종·registry·탐색/규칙·first-use 격리다.
독립 검토자는 이 감사만 작성했다. 제품 source·Figma·개인 홈 스킬·Git 원격을 변경하지 않았다.

## 판정

현재 문서·계약 확장에 남은 차단 사항은 없다. 기존 Header는 static을 기본값으로 유지하고,
명시적으로 thinking을 채택한 제품만 추가 motion을 연결한다. ThinkingStatus는 새로운 FRAME 조합 계약이며
Header·BrandMark·ProgressAlert의 전역 기본값이나 기존 Figma API를 덮어쓰지 않는다.
실제 source/public export는 `unmapped`/null이고 공유 설정은 `draft`다.

검토 중 발견한 상위 규칙의 “미제공15조합” 및 참조 인덱스의 “단일 all-true만 제공” 문구는
기본 COMPONENT의 범위로 한정하고 새 진행 예시를 별도로 연결하도록 통합 담당자가 보완했다. 최종 반영을 확인했다.
기존 자동 motion 금지는 기본 static·미채택 동작에 한정됐으며 opt-in 문서와 충돌하는 전면 금지는 남기지 않았다.

## 실측과 제안값의 경계

Figma FRAME3016:118094의 붉은 개발 주석3016:118113은 사고 중 Header 하단 gradient가 흐르는 효과를 요구한다.
이 문구는 디자인 의도이며 timing·easing·방향·반복·keyframe의 측정 증거가 아니다.
기존 감사의 root/header/status `get_motion_context` 결과는 모두 nodes=[]이며 추가 header/status 재조회도 같은 결과였다는 통합 담당자의 기록을 확인했다.
원본 ChatHeader 참조의 animationMeasured=false·325px 샘플·isProgressMeter=false도 유지됐다.

[추가 실측](../docs/agent-hub/design/references/chat-progress.figma.json)의 Header15·ThinkingStatus4·기존 BrandMark source2,
총21개 노드를 raw와 비교했다. layout·최소/최대 크기·좌표·모서리·paint·effect·text·source/variant/속성·mode를 포함한
1,152개 항목과 gradient9개 stop의 원본 RGBA에서 불일치가 없었다. 별도21개 reaction·transform도 일치한다.
직접 변수6개는10개로 닫히며 미해결 alias는 없다.5개 collection에는 node mode를 보존하기 위한 imported collection도 포함된다.
숨김 instance 자식은 기본 skip 필터에서 생략될 수 있다는 한계를 기록하고 부재를 visible=false나 전체 상태 검증으로 바꾸지 않았다.

1800ms·linear·delay0·물리적 LTR·infinite·fill:none, B=min(325,W), 이동/clip/reduce 및 외부1000ms 시간 갱신은
[별도 proposal](../docs/agent-hub/design/references/chat-progress.motion.proposal.json)에만 구현 제안으로 기록했다.
회사 공통 motion token이나 Figma 측정값으로 재분류하지 않는다.325px의 정적 실측과 협소 폭 clamp 제안도 구분한다.

## Header motion과 정리

기본 미지정/static은 기존 직접 indicator를 사용한다. thinking에만 안정적인 request 세션 키를 요구하며,
showActiveIndicator=false가 우선해 track·observer를 제거하고 기본 하단선은 유지한다.
부모가 request/phase를 소유하고 완료·중단·실패·대화 전환에서 track을 정리한다. 경과시간 tick마다 키를 바꾸지 않고
indicator slot만 교체해 Header·버튼·대화 log의 focus와 생명주기를 유지한다.

W는 layout CSS px의 track 폭, B는 min(325,W)다. 시작−B에서 오른쪽 끝은0, 종점W에서 왼쪽 끝은W여서 양 끝 모두 완전 이탈한다.
CSS 시작 translateX(−100%)는 band 폭을 사용하고 종점은 측정한 Wpx를 사용한다.
종점을 band 자체의100%나 W−B로 잘못 계산하지 않으며 loop 반복을 업무 완료·진행100%에 연결하지 않는다.

기존48px border-box·bottom1px·root overflow:visible을 유지하고, bottom−1/height1인 하단 track만 clip한다.
추가 intrinsic 높이·border·focus 대상이나 정적/이동 band 이중 렌더를 만들지 않는다.
reduce에서는 animation:none·transform:none으로 x0 정적 band가 남고 상태 문구·업무 phase는 바뀌지 않는다.
RTL에서도 이번 physical LTR 제안임을 명시하며 자동 방향 반전을 측정값으로 취급하지 않는다.

[실행 문서 예시](../docs/agent-hub/design/components/AgentHubChatHeader/motion-example.mjs)는 timer·네트워크·업무 callback을 만들지 않는다.
ResizeObserver contentRect의 float 폭을 유지하고0·음수·NaN·Infinity는 미준비 상태로 돌린다.
observer 미지원·측정 전에는 정적 fallback을 사용하며 unmount 때 disconnect·속성/변수를 정리한다.
중복 cleanup과 늦은 이전 callback의 재시작 방어도 확인했다. CSS 변수는 transform만 바꾸므로 측정용 별도 loop를 추가하지 않는다.
이 계산·정리 검사는 실제 소비 제품의 한 반복 렌더·resize 연속성·focus ring·zoom·reduce 시각 검증과 구분한다.

## ThinkingStatus와 접근성

실제 status/in-progress는136×32/HUG·gap8의 FRAME이며 BrandMark32와96×20 TEXT로 구성된다.
텍스트는 x40/y6·Pretendard14/20·400·LEFT/CENTER, opacity0.69의 정적5-stop gradient다.
회색 원본 채널0.8413461446762085와 위치0/.25/.46963563561439514/.6842105388641357/.9149797558784485를 보존했다.
CSS의 퍼센트 RGB·stop·한 번의 text opacity가 일치하고 로고/root/stop alpha에 다시 곱하지 않는다.
gradient 미지원·제품 readable 모드·forced-colors의 단색 대안을 명시하며 forced-colors의 selector 우선순위도 확인했다.

elapsedSeconds는 부모가 공급하는 유한한0 이상 값만 floor한다. undefined·음수·NaN·Infinity는 시간 suffix를 제외하고
상태 라벨을 유지한다. 샘플4초를 시작값·완료 기준·타이머 주기로 고정하거나 invalid 값을0으로 위장하지 않는다.
새 timer/phase/request 상태를 만들지 않고 기존 clock에서 경과값을 재계산하는 제품 연결을 요구한다.

로고와 텍스트는 정적이며 Header 요구를 shimmer·로고 회전·GIF/APNG로 확대하지 않는다.
Header band는 aria-hidden/pointer-events:none인 장식이고 progressbar·status·live region이 아니다.
상태 안내는 기존 transcript 또는 semantic status 한 owner만 담당하며 초 갱신을 매번 낭독하지 않는다.
제안 TSX는 시각 문구와 고정 accessible 라벨을 분리하고 필요한 AT 시간 확인 경로는 제품에서 별도로 연결하도록 명시한다.
focus·IME·scroll·후속 오류/완료 UI의 owner를 침범하지 않는다.

## 자산·탐색·격리

[자산 기록](../docs/agent-hub/design/references/chat-progress.assets.json)의 file16·more16·BrandMark PNG3개를 직접 읽어
bytes·SHA256·native 치수와 PNG SHA1/imageHash를 확인했다. 새 자산은0개다.
BrandMark는 기존2048² RGBA PNG를32px로 비율 보존해 표시하며 원본 해상도·component180px·표시32px를 구분한다.
gradient와 붉은 개발 주석을 runtime 이미지·제품 UI로 만들지 않는다. 제품 소유 경로로 연결하며 TeamAI 문서 경로를 runtime import/asset 기본값으로 쓰지 않는다.

ThinkingStatus의 유일한 dependency는 AgentHubBrandMark다. ChatHeader의 기존 dependency는 그대로이며 상태 행을 강제로 포함하지 않는다.
공용51+Agent Hub56=107개 catalog와 단독 ThinkingStatus→BrandMark closure, 다른 조합의 비포함/CMP·PaaS/off 격리 검사를 확인했다.
공용 off에는 extendsCommon catalog·공용 문서/스킬을 강제하지 않고 공통 스킬7종·기존 source/역할을 자동 설치·변경하지 않는다.
시작 안내·README·reference 인덱스·상위 rules에서 새 계약과 별도 motion 제안으로 탐색할 수 있다.
검토 당시 읽기 전용 serengeti-cmp 작업 트리는 clean이었다.

## 통합 확인 결과

최종 문구 보완 후 다음 검사를 완료했다.

- `npm run verify`: PASS. 로컬 링크3,924개·공용51 + 솔루션60개 계약·스킬7개·역할/솔루션9조합·스키마3개·namespace 격리.
- `npm test`: 56/56 PASS. 생각 중 band의 넓은/좁은/fractional 범위, 정적 fallback, observer 해제와 늦은 callback 방어 및 단독 선택/공용off 격리를 포함한다.
- 문서 전용 Ego 브라우저 fixture:640/1560/120/240.5px에서 CSS 실제 위치를0/450/900/1350/1799/1800ms에 대조해 허용 오차.01px 이내였다.
  1.95초 동안 실제 한 반복을 관찰했고 y47/height1·header48/overflow visible·track만 hidden을 확인했다.
  폭0 숨김 시 animation 중지·재표시 재측정, mode hidden/static/생각 중 전환·focus 대상 유지,
  reduce의 animation0/transform none/x0·문구 보존 및 forced-colors/readable 조합의 단색/opacity1을 확인했다.
  브라우저 결과는 임시 `aifrica-chat-progress/browser-results.json`, 화면은 `proposal-browser.png`에 기록했고 테스트 TaskSpace는 정리했다.
  이는 문서 CSS·측정 helper의 fixture 검증이며 실제 소비 제품의 폰트·keyboard/AT 전체·렌더 일치를 보증하지 않는다.
- 실제 격리 TeamAI CLI: 공용on은 Codex·Claude 각각 스킬7개와 문서/자산1,369개, off는 스킬0개와 namespace823개다.
  on에서 frontend 문서/hook 존재·off에서 제거, 양쪽 로컬 제품 스킬 보존 및 mirror byte 일치를 확인했다.
  최종 common10/frontend546/agent-hub813파일이 현재 원본과 snapshot SHA256까지 모두 일치했고 추가/제거/변경0개다.
  결과 fixture는 `aifrica-chat-progress-delivery-8n50m8au/results.json`이다.
- `git diff --check` PASS, 읽기 전용 `serengeti-cmp` 작업 트리 clean. Figma canvas·제품 저장소·원격 게시·개인 홈 스킬 설치 변경은 없다.

이는 문서·계약·실행 예시의 검증이며 실제 consuming repository의 제품 구현·요청 API·시간원·animation timing 선호·픽셀 일치·
모든 접근성/반응형/dark 상태가 완료됐다는 뜻이 아니다. 실제 source/public export와 제품 채택 값은 해당 저장소 검증 후 기록한다.
