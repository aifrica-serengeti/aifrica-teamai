# AgentHubScheduleCard — 구현 연결

다음은 **제품 제안 API·조합·CSS recipe**입니다. 실제 source/export·예약 서비스 API가 아닙니다.
기존 카드·예약 조회/제어 owner를 먼저 조사하고 호환되면 재사용하며 없으면 가까운 제품 기능 범위에 새 export를 개발합니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`, `DOCS_ROOT/frontend/design/components/Card/README.md`,
`DOCS_ROOT/frontend/design/components/Button/README.md`의 관련 절차·의미를 적용합니다.

아래 시각 recipe에도 [공용 Card 색상 모션](../../cards.md#공용-색상-모션-계승)을 함께 연결합니다.
root의 background-color/border-color/box-shadow/color와 텍스트 color에200ms ease를 적용하고,
pseudo border·상태 표면은 변하는 속성만 지정합니다. reduced motion을 명시적으로 해제하며 geometry·SVG src에는 새 모션을 만들지 않습니다.

```ts
import type { ReactNode } from "react";

export type AgentHubScheduleCardProps = {
  scheduleId: string;
  title: string;
  metaPrimary: string;
  metaSecondary: string;
  status: "active" | "paused" | "completed";
  statusText: string;
  selected: boolean;
  disabled: boolean;
  pauseLabel: string;
  resumeLabel: string;
  trailingAction?: ReactNode;
  onActivate?: (scheduleId: string) => void;
  onRequestStatusChange: (scheduleId: string, nextStatus: "active" | "paused") => void;
};
```

제품이 status/선택/disabled/표시 문구를 공급합니다. statusText는 실제 업무 의미를 확인해 제공하고 active 샘플‘label’을 고정하지 않습니다.
onRequestStatusChange는 해당 예약의 다음 상태를 요청하는 제안이며 성공 전에 내부 status를 별도로 토글하지 않습니다.
권한·동시 요청 차단·실패 복구·낙관적 반영 정책은 제품 owner가 구현하고 검증합니다.
원본의 두 VARIANT 외에 이 TEXT·callback props가 Figma에 있다고 주장하지 않습니다.
위 제안의 `completed`와 `trailingAction`은 예약 페이지에서 채택한 추가 범위입니다.
기존 active/paused 호출부와 다음 상태 callback을 보존하며 완료에서 없는 pause/play 자산을 조합하지 않습니다.

```text
비대화형 Card root
├─ header row
│  ├─ 일반 info 또는 onActivate용 단일 native control
│  │  ├─ title
│  │  └─ metaPrimary + 장식‘·’ + metaSecondary
│  └─ 선택적 trailingAction: 형제 독립 button24
└─ footer
   ├─ 읽기용 run-status: active/paused 장식 glyph14 + statusText, completed 일반 텍스트
   └─ active/paused일 때만 독립 native button24: status별 장식 glyph16
```

toggle은 실제 FRAME의 시각에 native button 의미를 연결합니다. Figma의 toggle 원본을 AgentHubIconButton INSTANCE 재사용으로 기록하지 않습니다.
Card interactive button 안에 toggle을 넣지 않고 header control과 toggle을 형제로 둡니다.
toggle click은 disabled guard 후 `status === "active" ? "paused" : "active"`를 한 번만 요청합니다.
native Enter/Space에 별도 keydown·glyph/root callback을 더하지 않습니다. header 활성화는 별도 의도이며 toggle과 함께 실행하지 않습니다.
실제 FRAME만으로 독립 hover/pressed·모션을 확인했다고 주장하지 않습니다.

제품 구현에서는 기존 [AgentHubIconButton](../AgentHubIconButton/README.md)의24px 조합을 재사용할 수 있습니다. `icon`에 `agentHubImage`로 해석한
원본 pause/play·disabled control16 SVG를 전달해 glyph의 정확한 선·paint를 유지합니다.
버튼의 hover 검정5%·pressed10%, focus-visible과 background-color·border-color·color200ms는 공용 구현에 맡깁니다.
카드 전용 control CSS는 position·z-index·flex만 두고 공용 버튼의 표면·focus·transition을 덮지 않습니다.
더보기의 노출150ms opacity를 별도 채택한 경우에도 기존200ms 색상 속성들과 함께 선언하고 reduced motion에서 모두 해제합니다.

### 제품의 카드 전체 activation 조합

주 명령 button의 `::after`를 relative card의 `inset:0`까지 확장하면 padding·footer의 읽기용 영역도
같은 native click 경로를 사용합니다. 주 명령의 제목·메타는 정상 흐름으로 유지하고 전체 overlay용 별도 button을 만들지 않습니다.
header trailing action과 footer 상태 변경 button만 더 높은 hit layer에 둡니다. footer 전체에 높은 layer를 주면
읽기용 상태와 빈 공간이 overlay를 막을 수 있으므로 실제 독립 control에만 적용합니다.
root의 onClick·keydown으로 같은 명령을 재호출하거나 button 안에 trailing action을 넣지 않습니다.

trailing action이 있으면 header는 남은 폭을 쓰는 info와24px action을8px 간격으로 배치합니다.
카드 padding16 안에 두어 제목 줄과 top/right가 맞고, 별도 모서리 absolute offset으로 padding을 침범하지 않게 합니다.
completed도 같은 카드·제목·메타·footer24 공간을 쓰며 statusText만 일반 보조 텍스트로 표시합니다.
확장한 hit area의 focus 외곽·disabled 차단·메뉴 portal click 분리·터치 조작을 실제 제품에서 검증합니다.

다음 width100%는 부모가 폭을 공급한다는 뜻이며 reference host만324px로 둡니다.
긴 문구·번역·반응형 변경은 실제 데이터로 검증하는 제품 확장입니다.

```css
.hub-schedule-card {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  min-width: 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #fff;
  box-shadow: none;
}
.hub-schedule-card:hover:not([data-disabled]):not([data-selected]) {
  background: #f8f8f8;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
}
.hub-schedule-card:active:not([data-disabled]):not([data-selected]) {
  background: #f4f4f4;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
}
.hub-schedule-card[data-selected]:not([data-disabled]) { background: #ebf3ff; border-color: #3b82f6; }
.hub-schedule-heading { display: flex; align-items: flex-start; gap: 8px; width: 100%; min-width: 0; }
.hub-schedule-action { position: relative; z-index: 1; display: inline-flex; flex: 0 0 24px; width: 24px; height: 24px; }
.hub-schedule-header { display: flex; align-items: center; flex: 1; gap: 12px; min-width: 0; }
button.hub-schedule-header::after { content: ""; position: absolute; inset: 0; z-index: 0; border-radius: 24px; }
button.hub-schedule-header:disabled::after { pointer-events: none; }
.hub-schedule-info { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; flex: 1; min-width: 0; gap: 4px; }
.hub-schedule-title { margin: 0; color: #1c1c1c; font: 600 16px/24px Pretendard, sans-serif; white-space: nowrap; }
.hub-schedule-meta-row { display: flex; align-items: center; gap: 4px; border-radius: 6px; color: #757575; font: 400 12px/16px Pretendard, sans-serif; }
.hub-schedule-meta-row > * { margin: 0; white-space: nowrap; }
.hub-schedule-footer { display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; width: 100%; min-width: 0; }
.hub-schedule-run-status {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  background: #eee;
  color: #1c1c1c;
  font: 400 12px/16px Pretendard, sans-serif;
  white-space: nowrap;
}
.hub-schedule-card[data-status="paused"] .hub-schedule-run-status { background: #f4f4f4; color: #757575; }
.hub-schedule-card[data-status="completed"] .hub-schedule-run-status { background: transparent; color: #757575; padding-inline: 0; }
.hub-schedule-run-icon { display: block; flex: 0 0 14px; width: 14px; height: 14px; }
.hub-schedule-run-label { margin: 0; }
.hub-schedule-toggle {
  position: relative;
  z-index: 1;
  flex: 0 0 24px;
}
.hub-schedule-card[data-disabled] .hub-schedule-title,
.hub-schedule-card[data-disabled] .hub-schedule-meta-row,
.hub-schedule-card[data-disabled] .hub-schedule-run-status { color: #aaa; }
```

원본 info/title/meta는 HUG이고 실제 긴 문구 폭 제한이 없습니다. 위 recipe는 샘플 기본 배치이며
제목29px·info68px·run-status60/89px·카드118px를 고정하지 않습니다. 좁은 폭에서 줄바꿈/생략이 필요하면 제품 정책을 별도로 검증합니다.
header를 native control로 쓸 때는 기본 button의 padding·border·background·font를 초기화해 이 geometry를 보존합니다.
유효한 비대화형 텍스트 자식으로 구성하고 focus token·실제 disabled를 연결합니다.

[자산 기록](../../references/card.assets.json)에서 status/disabled에 맞는 정확한 SVG를 제품 소유 경로에 연결합니다.
active status는 delay14/#1C, paused status는 pause14/#757575이며 두 자산의 실제 선은0.875px입니다.
toggle은 active pause16/paused circle-play16·선1px·#757575이고 disabled는 모두 정확한 #AAA 자산을 선택합니다.
img의 alt는 빈 값·aria-hidden=true로 두고 CSS 부모 color·임의 배율로 경로/선/색을 재계산하지 않습니다.

data-selected/data-disabled는 false일 때 속성을 제거하고 data-status는 제품의 실제 status에 연결합니다.
선택을 hover/pressed보다 유지하는 것은 **제안 우선순위**이며 교차 상태 실측이 아닙니다.
disabled에서 요청과 header 활성화를 차단하고 카드 전체·자식 opacity를 낮추지 않습니다. selected inset이나 Overflow도 추가하지 않습니다.
pauseLabel/resumeLabel을 실제 button 이름에 연결하고 상태 변경 후 focus·목록 제거 시 복귀를 [접근성](./accessibility.md)에 맞춰 검증합니다.
[검증 항목](./verification.md)과 제품 실행 검사 후 source/public export·자산/token adapter를 로컬에 기록하며 `unmapped`/`draft`를 유지합니다.
