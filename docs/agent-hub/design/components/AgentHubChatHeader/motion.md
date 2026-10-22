# AgentHubChatHeader — 생각 중 진행 효과

기본 `static` 헤더는 기존 [구현](./implementation.md)을 유지합니다. 이 문서는 Agent Hub가 생각 중 진행 효과를 **명시적으로 채택할 때만** 읽습니다.
Figma에서 확인한 외형·의도와 아래 구현 제안을 구분하며, 공용 motion token이나 모든 헤더의 기본값을 변경하지 않습니다.

## 확인한 근거와 제안값

Figma [진행 중 예시](https://www.figma.com/design/cUKHT2PdHjAKRXZlzulnO5/?node-id=3016-118094)의 주석3016:118113은
AI가 사고하는 동안 헤더 하단선을 따라 그라데이션이 흐르는 효과를 요구합니다.
실제 header3016:118101은1560×48, 하단 indicator는 x0/y47·325×1이며 기존4개 color stop을 사용합니다.
root·header·status에 대한 재귀 motion 조회 결과는 모두 `nodes:[]`였습니다. 반응의 빈 배열과 작성된 동작 의도는 서로 다른 근거입니다.

| 항목 | 값 | 구분 |
| --- | --- | --- |
| 헤더/선 | 높이48·하단1px·indicator y47 | Figma 실측 |
| band 기본 폭·색상 |325px·기존4stop gradient | Figma 정적 실측 |
| 생각 중에 하단 gradient 흐름 | 주석에 명시 | 디자인 의도, keyframe 실측 아님 |
| duration / delay |1800ms /0ms | 구현 제안 |
| easing / 방향 |linear / 물리적 좌→우 | 구현 제안. RTL에서도 같은 방향을 채택한 예시 |
| 반복 / fill mode |infinite /none | 구현 제안 |
| band 폭 / 이동 | `B=min(325,W)`, `x=-B`에서 `x=W`까지 | 협소 폭·이동 범위 제안 |
| 축소 동작 | animation 없음·x0의 정적 band | 접근성 구현 제안 |
| elapsed 표시 갱신 | 외부 owner의1000ms 갱신을 권장할 수 있음 | 별도 제품 제안.1.8초 animation과 동기화하지 않음 |

W는 **track의 layout CSS px 폭**입니다.325px를 진행률이나 전체 헤더의50%로 해석하지 않습니다.
모든 수치의 출처는 [제안 JSON](../../references/chat-progress.motion.proposal.json), 원본 외형은 [실측 JSON](../../references/chat-progress.figma.json)에 따로 보존합니다.
디자인이 실제 timing을 제공하면 이 제안의 버전·제품 채택 값을 함께 갱신하고 측정값으로 조용히 재분류하지 않습니다.

## 제품 상태와 연결합니다

아래는 **제안 API**입니다. Figma의 네 표시 Boolean·실제 제품 export에 이 속성이 있다는 뜻이 아닙니다.

```ts
type IndicatorMode = "static" | "thinking";
type ThinkingIndicatorOptions =
  | { indicatorMode?: "static"; indicatorSessionKey?: never }
  | { indicatorMode: "thinking"; indicatorSessionKey: string }; // 안정적인 active request ID
// indicatorMode 미지정은 static으로 정규화합니다.
```

`showActiveIndicator=false`를 먼저 적용하면 mode와 관계없이 표시·track·observer를 제거하고 기본 하단선만 남깁니다.
미지정 또는 static이면 기존 정적 indicator를 사용합니다. thinking을 선택한 경우에만 아래 track을 만듭니다.
부모가 active request와 실제 phase를 관리하고 thinking일 때 명시적으로 mode를 매핑합니다.
완료·중단·실패·대화 전환에서는 thinking track을 제거하거나 static으로 전환합니다. animation 반복이 끝났다고 업무를 완료 처리하지 않습니다.
실제 상태 행은 [AgentHubThinkingStatus](../AgentHubThinkingStatus/README.md)와 같은 부모 phase를 사용하며 별도 요청 상태를 복제하지 않습니다.

세션 키는 thinking indicator에만 적용합니다. 시간 표시의 매 tick마다 키를 바꾸거나 헤더 전체·버튼·대화 log를 remount하지 않습니다.
phase가 같은 채 새 request가 시작되면 새 active ID로 track만 교체하고 이전 observer를 정리합니다.
pause·Composer 전송을 stop 명령으로 바꾸거나 retry·실패 안내를 자동 생성하는 계약은 아닙니다.

## 하단 track만 자릅니다

기존 header의 `position:relative`, 높이48·하단 border1px, `overflow:visible`과 action의 focus ring을 유지합니다.
static에서는 기존 indicator를 그대로 사용합니다. thinking에서는 **그 indicator를 대체**하고 아래 구조를 한 번만 렌더합니다.

```html
<!-- thinking mode일 때만 렌더하는 제안 구조. React면 className을 사용합니다. -->
<div class="hub-chat-header-thinking-track" aria-hidden="true">
  <span class="hub-chat-header-thinking-band"></span>
</div>
```

```css
.hub-chat-header-thinking-track {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px; /* border-box48/bottom border1의 실제 y47 */
  height: 1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  pointer-events: none;
}
.hub-chat-header-thinking-band {
  position: absolute;
  top: 0;
  left: 0;
  width: min(325px, 100%);
  height: 1px;
  transform: none;
  background: linear-gradient(90deg,
    rgba(69, 196, 214, 0) 0%,
    #45c4d6 35.576921701431274%,
    #9f83ef 71.15384340286255%,
    rgba(159, 131, 239, 0) 100%);
}
/* 이하 시간·이동 규칙은 Figma 실측이 아닌 구현 제안입니다. */
.hub-chat-header-thinking-track[data-motion-ready="true"] > .hub-chat-header-thinking-band {
  animation: hub-thinking-flow 1800ms linear 0ms infinite normal none;
}
@keyframes hub-thinking-flow {
  from { transform: translateX(-100%); }
  to { transform: translateX(var(--hub-thinking-track-width)); }
}
@media (prefers-reduced-motion: reduce) {
  .hub-chat-header-thinking-track[data-motion-ready="true"] > .hub-chat-header-thinking-band {
    animation: none;
    transform: none;
  }
}
```

종점의 `translateX(100%)`는 band 자신의 폭이므로 W까지 이동하지 않습니다. 측정한 track 폭을 px custom property로 전달합니다.
시작 −B와 끝 W에서는 band 전체가 clip 밖에 있어 반복 경계에서 보이는 선이 순간 이동하지 않습니다.
root overflow를 hidden으로 바꾸거나325px band와 기존 정적 indicator를 함께 그리지 않습니다.
색상·선 높이·위치는 실측을 유지하고, 시간·이동·clamp·clip wrapper는 새 제안입니다.

## 측정과 정리 예시

[motion-example.mjs](./motion-example.mjs)는 문서용 실행 예시입니다. 실제 제품 source/export mapping이나 설치된 motion library가 아닙니다.
그 함수는 dedicated track 한 곳을 ResizeObserver로 읽고 `--hub-thinking-track-width`와 ready 표시만 소유합니다.
0/음수/NaN 폭은 준비되지 않은 상태로 두며, observer 미지원·측정 전에는 x0 정적 band를 사용합니다.
fractional 폭을 보존하고 ancestor transform의 시각 크기와 layout 폭을 혼동하지 않습니다.

다음은 기존 React 프로젝트에서 채택할 수 있는 **연결 제안**입니다. 사용 중인 프레임워크의 mount/unmount에 맞춰 옮깁니다.
helper를 제품 소유 모듈에 연결한 뒤 import 경로를 정합니다. TeamAI 문서 경로를 제품 runtime import로 사용하지 않습니다.

```tsx
// React와 bindThinkingTrack은 소비 제품이 확인한 경로에서 import합니다.
function ThinkingIndicator() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    return bindThinkingTrack(track);
  }, []);
  return (
    <div ref={trackRef} className="hub-chat-header-thinking-track" aria-hidden="true">
      <span className="hub-chat-header-thinking-band" />
    </div>
  );
}

// 기존 header 내부의 indicator slot만 교체하는 제안입니다.
const visible = showActiveIndicator ?? true;
const mode = indicatorMode ?? "static";
const indicator = !visible ? null
  : mode === "thinking"
    ? <ThinkingIndicator key={indicatorSessionKey} />
    : <span className="hub-chat-header-indicator" aria-hidden="true" />;
```

ref/effect를 경과시간 갱신마다 다시 생성하지 않습니다. unmount·static/hidden 전환·세션 교체에서 observer를 disconnect하고 custom property를 정리합니다.
늦게 도착한 이전 observer callback은 제거된 track을 되살리지 않습니다. resize에서는 새 layout 폭으로 종점을 갱신하며 실제 브라우저의 연속 재배치를 검증합니다.
브라우저의 background tab 동작을 업무 시간의 기준으로 사용하지 않습니다. 경과시간·실행 완료는 별도 제품 상태와 clock이 소유합니다.

## 검증과 접근성

- mode 미지정/static, thinking, indicator=false, terminal phase·대화/요청 교체를 각각 확인합니다.
- 640·1560·325·120·fractional240.5px track에서 B와 양 끝 이동·y47·추가 높이 없음·focus ring을 확인합니다.
- reduce를 켜거나 동작 중 변경해 animation이 정지하고 band가 x0에 보이는지 확인합니다. 상태 문구는 유지합니다.
- observer 미지원·폭0→가시화·resize·unmount 후 늦은 callback과 중복 구독을 확인합니다.
- 헤더 track은 `aria-hidden`·pointer-events none이며 progressbar/status/live region이 아닙니다.
  상태 문구는 ThinkingStatus 또는 기존 제품의 한 안내 owner가 제공하고 초 단위 갱신마다 중복 낭독하지 않습니다.
- 제품 lint/typecheck/test와 실제 브라우저 한 반복·클리핑·reduce·zoom 확인 후 채택 값을 기록합니다.
  이 문서의 계산·cleanup 검사가 실제 제품의 animation·픽셀·요청 동작 검증을 대신하지 않습니다.
