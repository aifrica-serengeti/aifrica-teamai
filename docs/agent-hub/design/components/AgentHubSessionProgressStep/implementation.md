# AgentHubSessionProgressStep — 구현 연결

기존 진행 단계 표시를 먼저 조사하고 의미·glyph·연결선을 지원하면 adapter로 재사용합니다.
없으면 SessionPanel 기능 범위에 새 export를 만들 수 있습니다. 일반 Stepper·Spinner 원본 재사용을 주장하지 않습니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`와 실제 Divider 구현을 함께 확인합니다.

다음은 **제안 API**입니다. Figma에 같은 이름의 제품 export가 이미 있다는 뜻이 아닙니다.

```ts
export type AgentHubSessionProgressStepProps = {
  id: string;
  label: string;
  status: "done" | "active" | "pending";
  indexText: string;
  showConnector: boolean;
};
```

status는 실제 작업 owner가 명시적으로 공급하며 원본 기본 done을 요청의 초기값으로 복사하지 않습니다.
indexText는 pending에서만 표시하고 마지막 단계의 showConnector=false는 부모 목록이 결정합니다.

```text
비대화형 step
├─ track20
│  ├─ status별 indicator20
│  └─ showConnector일 때 wrapper20/py4 안 Vertical Divider17×4
└─ label + 필요한 읽기용 상태 설명
```

done/active/pending의 [정확한 자산](../../references/session.assets.json)을 사용합니다.
pending 자산은 원만 포함합니다. 실제 index 문자열은 별도 텍스트로 연결하고 Figma의 샘플3을 모든 단계에 고정하지 않습니다.
indicator 전체를 쓸 때 circle/check를 다시 겹쳐 만들지 않습니다. active 자산은 정적20px이며 아래 채택 adapter로 중심만 노출하고 spin keyframes를 추가하지 않습니다.

```css
.session-progress-step { display: flex; align-items: flex-start; gap: 8px; min-width: 0; }
.session-progress-track { display: flex; flex-direction: column; align-items: center; flex: 0 0 20px; }
.session-progress-indicator { position: relative; width: 20px; height: 20px; flex: 0 0 20px; }
.session-progress-indicator img { display: block; width: 20px; height: 20px; }
.session-progress-index {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #8f8f8f;
  font: 400 12px/16px Pretendard, sans-serif;
}
.session-progress-connector { display: flex; justify-content: center; width: 20px; padding: 4px 0; }
.session-progress-label {
  flex: 1 1 auto;
  align-self: stretch;
  min-width: 0;
  margin: 0;
  font: 400 14px/20px Pretendard, sans-serif;
  color: #1c1c1c;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.session-progress-step[data-status="pending"] .session-progress-label { color: #8f8f8f; }
```

Divider adapter는17px 전체 폭·높이4px·좌우8px·선1px을 보존합니다. wrapper py4를 한 번만 적용해 connector12px,
indicator와 함께32px가 되게 합니다. showConnector=false에서는 wrapper도 제거해20px를 유지합니다.
pending에서만 circle 이미지 위에 indexText를 별도 span으로 배치합니다. 위 중앙 정렬은 현재8×16px 글자의
x6/y2를 재현하며 index를 자산에 새기거나 done/active에도 겹쳐 표시하지 않습니다. 여러 자리 순번은 제품에서 추가 검증합니다.
폭286px와 label258px는 샘플이며 실제 부모 폭·긴 문구는 제품에서 검증합니다. 위 recipe는 비교용이며 literal은 제품 token으로 연결합니다.

부모가 목록의 단계 의미와 선택적 aria-current·상태 설명·공지 빈도를 연결합니다. 이 부품에는 click·timer·별도 요청·전역 listener를 만들지 않습니다.
[검증 항목](./verification.md)과 제품 검사를 마친 뒤 실제 source/export를 mapping에 기록하며 `unmapped`와 공유 설정의 `draft`를 유지합니다.

## 사용자 채택 halo adapter

[모션 계약](../../motion.md)은 전체 active SVG의 정적 테두리와 별도 파동을 함께 표시하던 이전 recipe를 대체합니다.
원본 SVG·manifest·측정 JSON을 보존하고, active 이미지에만 중앙 반지름6px clip을 적용해 파란 내부12px를 노출합니다.
이미지와 indicator wrapper는20×20px를 유지합니다. 원본의 정적 #CCE0FF stroke4px는 화면에 남기지 않습니다.
active indicator wrapper 뒤에 장식 pseudo-element 한 개를 연결합니다.20px 박스·4px #CCE0FF ring을
중앙 기준 scale1→1.08→1.6, opacity0→.6→0으로1600ms ease-out 반복하며 노출한 파란 중심은 앞에 고정합니다.

```css
/* 기존20px 이미지·wrapper 크기는 유지합니다. */
.session-progress-indicator > img { position: relative; z-index: 1; }
.session-progress-step[data-status="active"] .session-progress-indicator > img {
  clip-path: circle(6px at 50% 50%);
}
.session-progress-step[data-status="active"] .session-progress-indicator::before {
  content: "";
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: 4px solid #cce0ff;
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
  animation: session-active-halo 1600ms ease-out infinite;
}
@keyframes session-active-halo {
  0% { transform: scale(1); opacity: 0; }
  22% { transform: scale(1.08); opacity: .6; }
  100% { transform: scale(1.6); opacity: 0; }
}
@media (prefers-reduced-motion: reduce), (forced-colors: active), print {
  .session-progress-step[data-status="active"] .session-progress-indicator::before {
    display: none;
    animation: none;
  }
}
```

이 clip·ring·모션은 채택 adapter이고 새 원본 asset이 아닙니다. 다른 status에는 clip과 pseudo-element를 적용하지 않습니다.
reduced-motion·forced-colors·print는 pseudo-element만 제거하며 clip은 계속 적용해 파란 중심만 표시합니다.
실제 클래스·자식 구조에 맞춰 selector를 연결하고 전역 이미지 clip으로 확대하지 않습니다.
기존 status props로 파생하므로 별도 진행 상태·timer·새 public action API가 필요하지 않습니다.
