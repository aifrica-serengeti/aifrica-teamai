# AgentHubScrollbar — 기존 구현 연결과 새 구현

아래는 **제품 adapter 제안과 구현 recipe**입니다. 실제 Agent Hub source/export나 Figma 공개 API가 아닙니다.
원본은 `3155:20473`의 정적 gutter와 thumb이며, 완성 ScrollArea 또는 native SLOT이 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와
`DOCS_ROOT/frontend/design/components/Scrollbar/implementation/README.md`를 함께 읽습니다.

## 1. 호환 구현을 먼저 확인해 주세요

1. 현재 소비 저장소의 ScrollArea·native viewport·thumb part·공개 export·token 범위를 찾습니다.
   공용 문서의 코드나 serengeti-cmp의 source 존재를 이 제품의 구현 증거로 사용하지 않습니다.
2. 실제 DOM scroll owner·resize 측정·drag·공개 위치 API·키보드 경로가 호환되면 기존 구현에 필요한 시각 adapter만 추가합니다.
   전역 공용 token과 다른 Menu·Picker·Flyout에 영향을 주지 않는 범위를 선택합니다.
3. 호환 구현이 없을 때만 가장 가까운 제품 UI 범위에 새 ScrollArea export를 개발합니다.
   native overflow를 기능 owner로 두고 자체 thumb는 같은 viewport를 측정·조작하는 overlay로 만듭니다.
4. 제품의 실제 렌더·키보드·포인터·크기 변화·시각 검증 뒤 source/public export를 로컬 mapping에 기록합니다.
   검증 전에는 `unmapped`/`draft`를 유지하며 source 원본을 수정하거나 공용 스킬을 같은 이름으로 덮어쓰지 않습니다.

기존 ScrollArea의 `type`, `orientation`, `thumbWidth`, `verticalThumbOffset`, `contentClassName`,
`stickToEnd`, `onScrollMetricsChange`, `scrollTo`가 필요한지는 실제 사용처에서 판단합니다.
그 API 전체를 새 Figma 속성으로 등록하거나 채택하지 않은 기능을 새 컴포넌트의 필수 props로 강제하지 않습니다.

## 2. DOM과 시각 책임을 나눠 연결합니다

```text
제품 ScrollArea wrapper: 부모가 실제 폭·높이·표면을 공급
├─ native viewport: 실제 overflow·위치·콘텐츠
│  └─ content: 제품이 채택한 padding/레이아웃
└─ overlay gutter: 오른쪽에 둔11px 비교 part
   └─ thumb: 두께4·radius9999·기본 fill #DDD·측정된 길이/위치
```

gutter는 viewport의 형제이며 함께 스크롤되지 않습니다. 기존 구현이 wrapper 직계 thumb를 사용하면
새 gutter DOM을 억지로 추가하지 말고 기존 part·geometry adapter에서 같은 시각 경계를 표현합니다.
wrapper 전체를11px로 줄이거나 원본 gutter에 없던 r8·선·배경·content padding16을 추가하지 않습니다.
필요한 wrapper 표면은 이를 사용하는 Menu·패널 등의 별도 계약이 소유합니다.

```css
/* 기존 part에 연결하는 시각 예시이며 실제 export나 완성 스크롤 엔진이 아닙니다. */
.hub-scrollbar-gutter {
  position: absolute;
  inset-inline-end: 0;
  top: 0;
  bottom: 0;
  width: 11px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  pointer-events: none;
}
.hub-scrollbar-thumb {
  position: absolute;
  inset-inline-start: 3px;
  inset-inline-end: auto;
  width: 4px;
  border: 0;
  border-radius: 9999px;
  background: var(--agent-hub-scrollbar-default, #ddd);
  opacity: 1;
  box-shadow: none;
  pointer-events: auto;
}
.hub-scrollbar-thumb:hover {
  background: var(--agent-hub-scrollbar-hover, var(--agent-hub-scrollbar-default, #ddd));
}
```

이 CSS는 세로 LTR part의 교차축 x3와 표시 중인 기본 paint를 설명합니다. 기존 반대 inset이나 물리적 left/right·inline style이 남아
오른쪽3px를 다시 적용하지 않도록 adapter에서 정리합니다.11px 안 x3·width4의 오른쪽 잔여는4px입니다.
RTL·가로/양방향의 배치는 별도 제품 정책으로 확인합니다. 실제 `top`/`transform`·height·표시 여부·drag·focus는 기존 기능 adapter가 공급합니다.
`opacity:1`을 항상 표시하라는 상태로 사용하지 않고 기존 노출 timing의 opacity 규칙과 연결합니다.
hover 변수의 기본색 유지 fallback은 **제품 제안**입니다. Agent Hub hover가 측정됐다는 뜻이 아니며,
기존 전역 `--scrollbar-thumb-hover`가 이 adapter에서 묵시적으로 #555/55%로 바꾸지 않도록 part selector와 token 범위를 확인합니다.
다른 hover 정책을 채택하면 로컬 변수·기대값·근거를 명시하고 검증하며 공용 전역 token은 바꾸지 않습니다.
thumb x3/y3는 원본 fixture의 시작 좌표로 대조하며, runtime 이동값·길이를 `3px/160px` 상수로 고정하지 않습니다.
원본 root padding top1/right1을 thumb의 절대 좌표에 다시 더하지 않습니다.
gutter의11px 폭과 시작 x3를 재현할 때 샘플 잔여4px를 알고리즘의 모든 방향 inset으로 복제하지 않습니다.
위 예시의 `pointer-events` 분리는 콘텐츠 조작을 막지 않기 위한 제품 제안이며 실제 사용처에서 검증합니다.
기존 z-index와 clipping·부모 outline을 확인해 같은 viewport 내부 레이어 위에서 표시되게 합니다.

## 3. 측정과 상태는 기존 기능을 유지합니다

공용/CMP baseline의 세로 계산은 다음과 같습니다. 이 공식은 Figma 샘플의160px 길이를 도출한 식이 아닙니다.

```text
inset = thumbWidth × 0.75
leading = inset + max(0, verticalThumbOffset)
trailing = inset
track = max(0, clientSize − leading − trailing)
thumbSize = min(track, max(track × clientSize / scrollSize, 24))
thumbOffset = leading + scrollPosition / (scrollSize − clientSize) × max(0, track − thumbSize)
```

`scrollSize <= clientSize`이면 thumb를 렌더하지 않습니다. 실제 track·표시 폭·부모 border와 좌표계를 함께 확인합니다.
11px gutter를 채택해도 content viewport 크기와 이동 범위를 같은 수치로 대체하지 않습니다.
드래그 delta는 같은 track 길이를 사용해 native viewport 위치로 환산하며 Pointer capture·취소·observer·timer 정리를 유지합니다.
ResizeObserver·초기 측정·스크롤 이벤트에서 실제 geometry와 공개 측정 callback을 함께 갱신합니다.

기존 노출 timing·방향·최하단 유지·명시적 위치 이동을 채택했다면 [동작](./behavior.md)의 책임과 검증을 유지합니다.
이 원본은 hover·scroll·drag 중 paint를 제공하지 않습니다. 기존 hover/표시 계약을 임의로 없애지 말고
제품이 채택한 기대값과 Figma 미측정 범위를 구분해 기록합니다.
기본 #DDD를 해당 adapter에만 연결하고 다른 ScrollArea의 `--scrollbar-thumb-fill`을 전역 치환하지 않습니다.

## 4. 비교 source를 복사할 때의 주의점

읽기 전용 CMP의 실제 경로는 `src/core/components/layout/scrollbar/ScrollArea.tsx`, `ScrollArea.css.ts`이고
`src/core/components/index.ts`에서 export됩니다. 이 사실은 Agent Hub 로컬 mapping의 검증을 대신하지 않습니다.
공용 TypeScript 예시와 실제 source의 props 확장·callback dependency 등 세부 내용도 같다고 가정하지 않습니다.

비교 source의 thumb에는 role/orientation과 Pointer drag가 있지만 자체 keyboard/range/대상 연결은 완성되지 않았고,
viewport에 명시적인 tabIndex가 없습니다. [접근성](./accessibility.md)의 실제 제품 조작을 검증해 연결합니다.
공용 문서의 전역 reduced-motion 설명과 달리 확인한 CMP ScrollArea·global 스타일에는 해당 전역 transition 해제 규칙이 없었습니다.
채택하는 제품의 실제 처리와 기대값을 확인하고 이 원본에서 모션이 측정됐다고 기록하지 않습니다.

[검증](./verification.md)을 마친 뒤 실제 source·export·token/part adapter와 적용 사용처만 로컬에 기록합니다.
실측 gutter와 기능 viewport를 분리하고, 기존 Menu·Picker의 원본과 스크롤 동작을 자동 변경하지 않습니다.

## 5. 2026-10-21 채택: 공용 엔진과 시각 adapter

소비 구현은 native viewport·관측·축별 thumb 계산·drag·cleanup·키보드 노출을 한 ScrollArea 엔진이 소유하도록 합니다.
Agent Hub adapter는 그 엔진을 감싸고 fill #DDD·hover fallback #DDD·gutter11px만 해당 범위에 연결합니다.
여러 컨테이너에서 사용해도 관측·drag 알고리즘을 각 컴포넌트에 다시 만들지 않습니다.

부모가 필요한 경우 height/maxHeight·orientation·viewport/content class/style과 측정 callback을 전달합니다.
공개 handle의 `scrollTo(ScrollToOptions)`는 명시적 위치 의도, `ensureVisible(HTMLElement)`는 같은 viewport 안의
focus 대상 노출에 사용합니다. 가로·세로 측정값을 native viewport에서 받고 resize 뒤 유효 범위로 보정합니다.
이는 제품 API 제안이며 Figma props나 원본 전체 API의 필수 복제가 아닙니다.
시각적인 fade는 실제 남은 콘텐츠에만 표시하고 pointer를 통과시킵니다. [모션 채택 계약](../../motion.md)에 따라
reduced-motion에서는 시각 전환·smooth 위치 이동을 즉시 완료하되 휠·터치·키보드·drag 기능은 유지합니다.

SNB를 연결하는 엔진의 선택적 `visibility:"always"|"hover"`는 runtime API이며 기존 소비자의 기본값은 always입니다.
SNB만 hover를 선택합니다. 이 부분 구현을 공용 baseline의 hover/always/scroll/auto 전체 API 완료로 표시하지 않습니다.
hover는 영역 hover·focus-within·drag 중 노출하고 coarse pointer에서는 상시 노출합니다. SNB 패널 hover도 같은 track 표시 조건에 연결합니다.
노출 opacity는200ms ease이며 reduce에서는 즉시 적용합니다. 숨김 중에도 실제 viewport와 gutter 공간을 제거하지 않습니다.


## 6. 선택적 수직 track 끝 여백

현재 부분 API에 `verticalTrackPaddingEnd?: number`를 연결합니다. 기본0이고 음수·NaN·무한대는0으로 정규화합니다.
SNB는24를 전달하며 엔진이 같은 정규화 값을 아래 두 경로에 사용합니다.

```text
수직 track top = 3px
수직 track bottom = 3px + verticalTrackPaddingEnd
track = max(0, clientHeight − 6 − verticalTrackPaddingEnd)
thumbSize = min(track, max(24, track × clientHeight / scrollHeight))
travel = max(0, track − thumbSize)
thumbOffset = scrollTop / (scrollHeight − clientHeight) × travel
scrollPerTrackPixel = (scrollHeight − clientHeight) / max(1, travel)
```

native viewport·content padding·scroll range는 바꾸지 않으며 가로축은 기존 계산을 유지합니다.
기본0에서는 기존 CSS inset override를 덮는 inline style을 만들지 않습니다. 같은 엔진의 현재 props와 측정값으로 계산하므로 별도 listener·observer·상태를 추가하지 않습니다.
SNB는 style/variant 경로로 gutter27px와 track right2px를 연결하고 목록 영역 margin-right−16px로 행 폭을 보존합니다.
패널 border1px를 포함한 오른쪽 경계↔thumb 끝은3px입니다. 그 외 사용처는 기존11px gutter를 유지합니다.
이 부분 API 추가는 호환 변경이며 baseline 전체 ScrollArea API나 Figma 속성으로 기록하지 않습니다.
