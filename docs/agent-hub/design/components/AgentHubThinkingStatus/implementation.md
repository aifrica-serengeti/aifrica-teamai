# AgentHubThinkingStatus — 기존 구현 연결과 제안 API

아래는 **제품 API 제안·DOM/CSS recipe**입니다. 실제 export·Figma FRAME 속성·타이머 API가 아닙니다.
소비 저장소의 assistant 상태 행·경과시간 owner·BrandMark 공개 구현을 먼저 확인합니다.
호환되면 재사용하고 없을 때만 가까운 대화 UI 범위에 가장 좁은 새 export를 개발합니다.
실제 source/public export와 제품 검증 뒤 로컬 mapping에 기록하며 그전에는 `unmapped`/`draft`를 유지합니다.
공용을 켠 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`를 추가로 적용합니다.

## 1. 상태와 시간은 부모에서 공급합니다

```ts
// 기존 제품 API가 있으면 같은 책임의 입력에 연결합니다.
export type AgentHubThinkingStatusProps = {
  requestId: string;
  label: string;
  elapsedSeconds?: number;
  formatElapsed: (wholeSeconds: number) => string;
  brandMarkSrc: string; // 실제 제품이 소유한 동일 PNG 경로입니다.
  motion?: "static" | "shimmer";
  readable?: boolean;
};

// 제품 경계에서 검증하고, 유효한 값만 정수 초로 표시합니다.
export function toWholeElapsedSeconds(value: number | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : null;
}
```

label은 locale의 ‘생각하는 중’, formatElapsed는 locale에 맞는 초·분 표현을 공급합니다.
예를 들어 표본의4를 공급하고 결과를 ‘4초’로 만들면 `label + " · " + formatElapsed(4)`가 원문이 됩니다.
문자열 ‘4초’를 상수로 고정하지 않습니다. undefined 또는 잘못된 elapsedSeconds이면 경과 문구를 제외해 상태 라벨은 보존하고,
제품의 데이터 오류 처리로 연결합니다. NaN·음수·Infinity를0으로 위장하거나 timer를 새로 시작하지 않습니다.

부모가 request ID·phase를 한 곳에서 관리하고 실제 thinking일 때만 이 조합을 렌더합니다.
phase enum 자체는 소비 제품의 타입을 사용합니다. 새 Figma variant나 이 표시 컴포넌트의 독립 phase 상태를 만들지 않습니다.
현재 request의 기존 경과값을 전달하고 오래된 요청 값은 제품 owner에서 걸러냅니다.
Header motion도 같은 처리 값을 사용하되 서로의 표시 callback으로 요청 상태를 갱신하지 않습니다.
갱신 수치가 필요한 제품에는 외부 owner의1000ms cadence를 **제안값**으로 사용할 수 있습니다. Figma 실측 주기가 아닙니다.
기존 clock을 재사용하고 매 갱신마다 현재 경과값 또는 시작 시각에서 다시 계산합니다. tick마다 초를1씩 더해 drift를 누적하지 않습니다.

## 2. 시각과 live 안내를 분리합니다

```text
제품의 현재 요청/phase/경과값 owner
├─ 기존 semantic status owner: 진입·종료 등 필요한 변화만 안내
└─ thinking일 때 상태 행
   ├─ 장식 BrandMark32
   ├─ 시각 문구: label · formattedElapsed (실시간 live 읽기 제외)
   └─ 읽기 가능한 고정 상태 label 또는 제품의 기존 상태 텍스트 연결
```

시각 문구의 시간 갱신이 live region을 매번 바꾸지 않게 연결합니다.
예를 들어 시각 문구만 aria-hidden으로 두고 같은 위치의 읽기 가능한 상태 라벨을 제공할 수 있습니다.
이때 부모가 이미 적절한 상태 텍스트를 제공한다면 중복 읽기 요소를 만들지 않습니다.
aria-hidden의 시각 시간만 제공하고 필요한 AT 시간 확인 경로까지 구현됐다고 주장하지 않습니다.
상태 행 자체에 button·새 focus 대상·자동 scroll을 추가하지 않습니다.

다음 TSX는 기존 구현이 없는 소비 저장소에 연결할 **새 export 제안의 완전한 작은 DOM 예시**입니다.
위 타입과 정규화 helper를 같은 모듈에 두고, 기존 BrandMark export가 있으면 img 자리에 그 호환 구현을 연결합니다.
brandMarkSrc는 제품 경로로 제공하되 원본 PNG를 유지합니다. 임시 URL이나 공용 문서 경로를 기본값으로 사용하지 않습니다.

```tsx
export function AgentHubThinkingStatus({
  requestId,
  label,
  elapsedSeconds,
  formatElapsed,
  brandMarkSrc,
  motion = "shimmer",
  readable = false,
}: AgentHubThinkingStatusProps) {
  const seconds = toWholeElapsedSeconds(elapsedSeconds);
  const elapsedText = seconds === null ? "" : formatElapsed(seconds);
  const visualText = elapsedText ? `${label} · ${elapsedText}` : label;

  return (
    <div
      className="hub-thinking-status"
      data-request-id={requestId}
      data-motion={motion}
      data-readable={readable || undefined}
    >
      <img
        className="hub-thinking-status-mark"
        src={brandMarkSrc}
        width={32}
        height={32}
        alt=""
        aria-hidden="true"
      />
      <span
        className="hub-thinking-status-text"
        aria-hidden="true"
        data-visual-text={visualText}
      >
        {visualText}
      </span>
      <span className="hub-thinking-status-accessible">{label}</span>
    </div>
  );
}
```

이 예시는 자체 live region·timer·phase state·effect가 없는 순수 표시 조합입니다.
제품의 기존 semantic status owner가 진입·종료만 안내합니다. accessible 라벨 자체를 초마다 바꾸지 않습니다.
부모가 이미 같은 위치의 읽기 가능한 라벨을 제공한다면 예시의 accessible span 대신 그 연결을 재사용해 중복 읽기를 피합니다.
AT에서 경과값 확인이 필요하면 제품의 비-live 시간 경로를 별도로 연결합니다. 숨김 visualText만으로 그 기능까지 구현됐다고 보지 않습니다.

## 3. 균일한 글자와 주기적인 두 띠를 연결합니다

다음 CSS는 [현재 사용자 채택](./styles.md)을 연결하는 recipe입니다. 원본5-stop gradient는 비교 표와 JSON에 보존하며
소비 구현의 정적 배경으로 사용하지 않습니다. 고정된 밝은 얼룩을 제거한 단색 글자 위에서만 흰 띠를 움직입니다.

```css
.hub-thinking-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  overflow: visible;
}
.hub-thinking-status-mark {
  display: block;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  object-fit: contain;
}
.hub-thinking-status-text {
  position: relative;
  margin: 0;
  min-width: 0;
  font: 400 14px/20px Pretendard, sans-serif;
  letter-spacing: 0;
  background: none;
  color: #000;
  -webkit-text-fill-color: currentColor;
  opacity: 0.69;
  white-space: normal;
  overflow-wrap: anywhere;
}
.hub-thinking-status-accessible {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@supports ((background-clip: text) or (-webkit-background-clip: text)) {
  .hub-thinking-status[data-motion="shimmer"]:not([data-readable])
    .hub-thinking-status-text::after {
    content: attr(data-visual-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      90deg,
      rgb(255 255 255 / 0) 0%,
      rgb(255 255 255 / 0) 22%,
      #fff 50%,
      rgb(255 255 255 / 0) 78%,
      rgb(255 255 255 / 0) 100%
    );
    background-size: 50% 100%;
    background-repeat: repeat-x;
    background-position: 0% 0;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: hub-thinking-shimmer 1800ms linear infinite;
  }
}
@keyframes hub-thinking-shimmer {
  from { background-position: 0% 0; }
  to { background-position: 100% 0; }
}
.hub-thinking-status[data-readable="true"] .hub-thinking-status-text {
  background: none;
  color: #1c1c1c;
  -webkit-text-fill-color: currentColor;
  opacity: 1;
}
@media (forced-colors: active) {
  .hub-thinking-status .hub-thinking-status-text,
  .hub-thinking-status[data-readable="true"] .hub-thinking-status-text {
    background: none;
    color: CanvasText;
    -webkit-text-fill-color: CanvasText;
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce), (forced-colors: active), print {
  .hub-thinking-status[data-motion="shimmer"]:not([data-readable])
    .hub-thinking-status-text::after {
    content: none;
    display: none;
    animation: none;
  }
}
@media print {
  .hub-thinking-status .hub-thinking-status-text {
    background: none;
    color: #1c1c1c;
    -webkit-text-fill-color: currentColor;
    opacity: 1;
  }
}
```

text clipping 미지원 환경·static·reduced-motion에는 균일한 기본 글자가 남고 흰 띠가 없습니다.
`data-readable`은 제품의 읽기/대비 adapter 제안이며 Figma Boolean이 아닙니다.
opacity.69는 텍스트에 한 번만 적용하고 root·로고·각 stop에 나눠 중복 적용하지 않습니다.
읽기 모드·forced-colors·print에는 각각 위의 단색/opacity1 대안을 적용합니다. 어느 대안에도 고정 gradient를 남기지 않으며 logo spin은 추가하지 않습니다.

같은 라벨96px에서는32+8+96=136px·높이32·텍스트y6을 비교합니다.
폭136·문구96을 고정하지 않습니다. 긴 번역·큰 경과값의 줄바꿈/재배치가 필요하면 제품 제안으로 별도 검증하고 내용을 자르지 않습니다.
이미지는 [기존 BrandMark 자산](../../assets/brand/agent-hub-mark.png)을 제품 소유 경로에 연결합니다.
문서 경로나 임시 Figma URL을 제품 런타임 자산 경로로 사용하지 않습니다.

## 4. 완료 조건

[검증 항목](./verification.md)과 소비 저장소의 실제 lint/typecheck/test/build를 수행합니다.
실제 phase 전환·다른 요청의 늦은 경과값·locale·AT 읽기·대비·초 갱신·focus/scroll 보존을 검증한 후 source/export를 로컬에 기록합니다.
문서·정적 PNG 전달만으로 처리 상태·시간 갱신·streaming 구현이 완료됐다고 기록하지 않으며 원본 serengeti는 수정하지 않습니다.

## 5. 명시적 모션 채택을 연결합니다

[사용자 채택과 제안값](../../motion.md)에 따라 기본 `shimmer`를 연결하고 `static`도 제공합니다.
`readable`·forced-colors·reduced-motion·print가 모션보다 우선합니다. 원본 로고·font·HUG는 유지합니다.
50% 폭 타일을 repeat-x로 반복하므로 밝은 중심의 간격은 문구 폭의50%, 각 띠 폭은28%, 띠 사이 맑은 간격은22%입니다.
position0%→100%는 실제로 문구 폭의50%를 이동해 한 타일 주기로 매끄럽게 이어집니다.1800ms·linear·폭·간격은 Figma 실측이 아닌 제안값입니다.
양끝의 띠 조각은 잘려 이어지므로 항상 온전한 봉우리 두 개가 보인다고 가정하지 않습니다.
장식층은 `aria-hidden`인 시각 문구 안에 두고 pointer-events:none을 적용합니다. 글자가 바뀌어도 key를 교체해 animation을 재시작하지 않습니다.
정적·읽기·감소/강제 색상·print 조건에서는 장식층과 animation을 함께 제거하고 균일한 글자를 표시합니다.
이 구현에 경과 시간 interval·별도 request phase·자동 scroll을 추가하지 않습니다.
