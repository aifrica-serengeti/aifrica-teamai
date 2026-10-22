# AgentHubOutputViewer — 새 구현과 기존 구현 연결

다음은 **제안 API·조합·CSS recipe**입니다. 실제 제품 export·파일 조회 API·형식별 renderer가 이미 존재한다는 뜻이 아닙니다.
소비 저장소의 산출물 preview·panel·공개 export를 먼저 조사하고 호환되면 adapter로 재사용합니다.
없으면 해당 제품 기능 범위에 새 export를 개발할 수 있습니다. 공용 Card/Modal의 시각과 동작을 일괄 상속하지 않습니다.

공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`와
`DOCS_ROOT/frontend/design/docs-only-build.md`의 source 탐색·검증·매핑 절차를 적용합니다.
공용을 끄면 해당 문서·스킬을 요구하지 않고 제품 자체 절차를 따릅니다.

## 1. 콘텐츠와 두 명령을 제품이 제어합니다

```ts
type ViewerAction = {
  label: string;
  disabled?: boolean;
  onRequest: () => void;
};
export type AgentHubOutputViewerProps<TContent> = {
  open: boolean;
  outputId: string;
  title: string;
  typeText: string;
  showType: boolean;
  content: TContent;
  expandAction?: ViewerAction;
  closeAction?: ViewerAction;
};
```

이 이름은 제품 제안이며 Figma의 실제 속성 이름을 대신하는 추출 결과가 아닙니다.
title/typeText는 TEXT, showType은 점+형식 Boolean, content는 `content#3015:5` SLOT에 대응합니다.
action 객체 유무가 show expand/show close를 연결합니다. 두 원본 Boolean의 기본 true를 실제 명령이 없는 버튼으로 복사하지 않습니다.
open과 outputId는 제품이 소유하는 추가 API입니다. open=false면 Viewer를 표시하지 않고 내부에 독립 open·파일 선택·요청 상태를 만들지 않습니다.

Session의 `onOutputActivate(outputId)` → 제품의 ID 확인·선택/조회 → Viewer props 공급 순서로 연결합니다.
서버 응답과 현재 outputId의 일치·지원 형식·조회 중/오류 본문·재시도 정책은 제품 owner가 관리합니다.
SLOT의 빈 자식이나 type="PDF"/"MD" 문자열만으로 renderer·요청 상태를 생성하지 않습니다.

expandAction은 제품이 채택한 확대 배치를 요청하고 closeAction은 표시 종료를 요청합니다.
각 native button의 click 한 경로에서 실제 disabled를 확인한 뒤 onRequest를 한 번 호출합니다.
별도의 Enter/Space keydown·glyph·header handler에서 중복 실행하지 않습니다.
확대/복원의 실제 상태와 새 컨트롤이 필요하면 제품이 별도 근거로 연결하며 기본 API가 브라우저 fullscreen을 호출하지 않습니다.

닫기 owner는 열었던 output 행의 안정적인 ID/ref를 보존합니다. Viewer를 제거한 뒤 그 유효 trigger로 focus를 복귀시키고,
행이 사라졌으면 출력 섹션의 가까운 유효 대상으로 이동합니다. 비동기 파일 전환·실패·확대 복원 때의 focus 정책도 제품이 정합니다.

## 2. header와 SLOT을 조합합니다

```text
이름이 있는 Viewer section
├─ header (정상 흐름 높이34)
│  ├─ title-area: pr44
│  │  └─ HUG title-group: title + showType일 때 dot3/typeText
│  └─ absolute actions: expand/close의 독립 native IconButton
└─ content SLOT (header 다음·남은 높이 FILL)
   └─ 제품 소유 콘텐츠 / 필요할 때 실제 scroll viewport
```

[AgentHubIconButton](../AgentHubIconButton/README.md)의 ghost/default24·radius4에 연결합니다.
glyph는 [자산 기록](../../references/output-viewer.assets.json)의 실제 maximize16 `3015:24201`, x16 `2311:46284`이며
둘 다 버튼 안 x4/y4·선1px·#1C1C1C입니다. 생성 코드의 `icon/plus/24` 이름을 실제 source로 사용하지 않습니다.
외부 SVG img의 내부 stroke가 부모 CSS color로 자동 변경된다고 가정하지 않습니다.
dot도 제공된 `assets/output-viewer/type-divider-dot-3.svg`를 제품 소유 자산 경로에 연결한 img로 사용하고
`alt=""`·`aria-hidden="true"`를 제공합니다. CSS 원을 다시 그리거나 정확한 SVG 위에 배경을 겹치지 않습니다.

## 3. 기본 geometry를 제품 token으로 연결합니다

다음은540×977px 비교 환경입니다. 실제 폭·높이는 제품 shell이 공급하며977px 고정 화면을 강제하지 않습니다.

```css
.hub-output-viewer {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  width: var(--hub-output-viewer-width, 540px);
  height: var(--hub-output-viewer-height, 977px);
  min-width: 0;
  min-height: 0;
  border: 0;
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
}
.hub-output-viewer-header {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  min-width: 0;
  padding: 8px 16px 4px;
  border: 1px solid #ddd;
  border-radius: 16px 16px 0 0;
  background: #f6f7f9;
}
.hub-output-viewer-title-area {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 0;
  min-width: 0;
  padding-right: 44px;
}
.hub-output-viewer-title-group { display: flex; align-items: center; flex: 0 0 auto; gap: 4px; white-space: nowrap; }
.hub-output-viewer-title, .hub-output-viewer-type {
  flex: 0 0 auto;
  margin: 0;
  color: #1c1c1c;
  font: 600 14px/20px Pretendard, sans-serif;
}
.hub-output-viewer-dot { display: block; flex: 0 0 3px; width: 3px; height: 3px; }
.hub-output-viewer-actions {
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
}
.hub-output-viewer-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
  gap: 24px;
  min-width: 0;
  min-height: 0;
  padding: 16px 8px;
  border: 1px solid #ddd;
  border-top: 0;
  border-radius: 0 0 16px 16px;
  background: #fff;
  overflow: hidden;
}
```

**그림자 adapter:** Figma root는 radius0·fills/strokes 없음이며 header의 위 모서리와 content의 아래 모서리가 실제16px 실루엣을 만듭니다.
위 root의 radius16은 CSS box-shadow에 그 실루엣을 연결하는 제안 adapter입니다. 원본 root radius 실측을16으로 고쳐 기록하지 않습니다.
Mid는 Figma blur1/6을 CSS box-shadow blur1/6으로 연결한 한 쌍입니다. filter 방식의 drop-shadow(.5/3)와 동시에 적용하지 않습니다.
root에 surface·border를 한 번 더 그리거나 header/content 각각에 Mid를 추가하지 않습니다.

Header의 높이는 텍스트20 + pt8 + pb4 + 위아래 border2 =34px입니다.
actions24는 absolute이므로 header의 정상 흐름 높이를 늘리지 않습니다. title-area는 x17/y9·506×20이며 pr44를 포함합니다.
actions는 header border를 포함한 좌표 x483/y5·52×24입니다. CSS right4/top50%는 border 안쪽 containing block에서 이 위치를 만듭니다.
보이는 두 버튼은24+gap4+24=52px입니다. 한 버튼을 숨기면 slot·간격도 함께 제거하고 두 버튼을 숨기면 actions를 렌더하지 않습니다.
title-group의106px은 샘플 문자열의 HUG 결과이며 title26 + gap4 + dot3 + gap4 + type69입니다.
원본에 ellipsis는 없습니다. 긴 이름과 좁은 폭의 줄바꿈·생략·버튼 충돌 방지 정책은 제품 확장으로 검증합니다.

Content는 y34부터 남은943px를 채우며 위 border는0, 좌우·아래만1px입니다.
표면의 padding·border가 실제 남은 높이 안에 포함되게 유지하고 root에 별도 header 높이를 더하지 않습니다.
gap24는 SLOT 배치의 실측값이고 실제 문서 섹션 수·형식·내용은 지정하지 않습니다.

## 4. 실제 콘텐츠의 접근을 검증합니다

원본의 clipping과 실제 scroll 구현을 구분합니다. 내용이 가용 높이를 넘으면 제품 소유 SLOT 내부에 다음처럼 실제 viewport를 연결할 수 있습니다.
이는 **제품 제안**이며 비어 있는 Figma SLOT에서 관찰한 스크롤 상태가 아닙니다.

```css
.hub-output-viewer-viewport {
  align-self: stretch;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow: auto;
}
```

실제 renderer가 자체 viewport를 갖는 경우 중복 스크롤을 만들지 않고 해당 viewport에 높이·focus 가시성을 연결합니다.
[접근성](./accessibility.md)에 따라 전체 제목·버튼 이름·단일 활성화·닫기 후 focus 복귀·본문 끝 접근을 확인합니다.
[검증 항목](./verification.md)과 제품 lint/typecheck/test/build·실제 문서 렌더를 검증한 뒤 source/public export와 adapter를 로컬에 매핑합니다.
현재 `unmapped`/`draft`를 유지하고 문서 예시를 실제 구현 증거로 취급하거나 원본 serengeti를 수정하지 않습니다.

## 5. 사용자 채택 ScrollArea adapter

[모션·스크롤 채택](../../motion.md)을 사용하는 제안 API에 `height?: CSSProperties["height"]`, `maxHeight?: CSSProperties["maxHeight"]`를 연결할 수 있습니다.
원본 비교 기본977px는 유지하고 소비 제품이 제한한 높이에서 header34px를 제외한 본문 공간을 FILL합니다.
기존 native viewport를 공통 ScrollArea/AH scrollbar adapter로 교체할 때 한 번만 조합하고 content padding16/8·gap24·border 소유권을 중복하지 않습니다.
본문 자체가 viewport를 이미 제공하면 해당 구현에 AH 시각 adapter만 연결합니다. renderer·조회·문서 상태를 ScrollArea에 옮기지 않습니다.
