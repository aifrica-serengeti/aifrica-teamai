# AgentHubSessionPanel — 새 구현과 기존 구현 연결

다음은 **제안 API·조합·CSS recipe**입니다. TeamAI가 배포하는 개발 기준이며 실행 앱이나 제품에 이미 존재하는 export는 아닙니다.
제품의 framework·스타일·component token에 맞게 옮기고 실제 화면을 검증합니다.

## 1. 기존 구현과 책임을 먼저 찾습니다

소비 저장소에서 Session sidebar, 실행 조회, 예약·자료 행, 진행 표시와 public export를 조사합니다.
호환되면 이 계약의 geometry/asset adapter를 기존 구현에 연결하고, 없으면 그 기능에 가까운 범위에
`AgentHubSessionPanel`과 필요한 하위 export를 새로 개발합니다. 이름만 같은 Card/Tree/Stepper로 대체하지 않습니다.

공용을 채택한 경우에만 `DOCS_ROOT/frontend/design/component-workflow.md`와
`DOCS_ROOT/frontend/design/docs-only-build.md`의 source 탐색·검증·mapping 절차를 적용합니다.
`inheritCommon: false`이면 이 catalog와 공용 스킬을 강제하지 않고 제품 자체 절차를 따릅니다.

## 2. 데이터와 UI 상태를 분리합니다

```ts
type SessionSectionId = "schedule" | "progress" | "output" | "context";
type SessionProgressStatus = "done" | "active" | "pending";
type SessionRun = { id: string; title: string; unread: boolean };
type SessionOutput = {
  id: string;
  title: string;
  icon: "file-text" | "table" | "code" | "image";
};
type SessionContext = {
  id: string;
  label: string;
  value: string;
  countText: string;
  icon: "file-text" | "folder" | "book-open" | "wrench" | "scroll-text";
};
type SessionProgress = { id: string; label: string; indexText: string; status: SessionProgressStatus };
type SessionData = {
  schedule: { id: string; title: string; metaText: string; runs: readonly SessionRun[] } | null;
  steps: readonly SessionProgress[];
  outputs: readonly SessionOutput[];
  contexts: readonly SessionContext[];
  outputCountText: string;
};
export type AgentHubSessionPanelProps = {
  accessibleName: string;
  view: "empty" | "filled";
  data: SessionData;
  expanded: Readonly<Record<SessionSectionId, boolean>>;
  historyExpanded: boolean;
  currentRunId: string | null;
  onExpandedChange: (section: SessionSectionId, expanded: boolean) => void;
  onHistoryExpandedChange: (expanded: boolean) => void;
  onScheduleActivate: (scheduleId: string) => void;
  onRunActivate: (runId: string) => void;
  onOutputActivate: (outputId: string) => void;
  onContextActivate: (contextId: string) => void;
  onAddOutput: () => void;
  onAddContext: () => void;
};
```

view는 측정한 두 비교용 구성을 고르는 제안입니다. 네트워크 상태 enum이 아닙니다.
empty는 두 자료 목록이 빈 데이터와 함께 사용하며, 제품 owner가 데이터와 view의 일관성을 관리합니다.
filled에서 예약 부재·진행 부재·한쪽 자료만 빈 조합이 필요하면 미측정 확장으로 추가 검증합니다.
countText는 포맷된 표시 문자열이고 실제 개수 계산/권한은 데이터 owner가 관리합니다.

currentRunId와 각 run.unread를 분리합니다. onRunActivate는 실행 조회 의도를 전달하며
run.unread=false로 바꾸거나 새 작업을 실행하는 동작을 패널 내부에 감추지 않습니다.
진행 상태는 읽기 전용 데이터입니다. 단계마다 onClick이나 실행 API를 만들지 않습니다.

## 3. 실제 원본의 조합을 연결합니다

```text
이름이 있는 aside 또는 section (Panel320 / r16 / Mid)
├─ filled일 때 예약 section
│  ├─ SectionHeader: title=예약, toggle=true, action/count=false
│  └─ items: gap8
│     ├─ SessionItem: schedule16, meta=true, 제품 title/metaText
│     └─ history-wrap px4
│        └─ white/r8 history: px4/pt12/pb8/gap8
│           ├─ 기록 heading + 별도16px toggle
│           └─ history 목록: HistoryItem들, currentRunId와unread별도
├─ filled일 때 진행 상황 section (gap8)
│  ├─ SectionHeader: title=진행 상황, toggle=true
│  └─ ol px4: ProgressStep들, 마지막connector=false
├─ 출력 section (gap4)
│  ├─ SectionHeader: action=true, filled에서toggle/count=true
│  └─ filled: Item 목록 / empty: ‘출력물이 없습니다.’
└─ 컨텍스트 section (gap4)
   ├─ SectionHeader: action=true, filled에서toggle=true/count=false
   └─ filled: left4 + white/r8/p4 ContextItem 목록
      empty: ‘업로드한 컨텍스트가 없습니다.’
```

Header의 toggle과 +, history toggle은 각각 native button 한 개로 연결합니다.
Header를 다른 button 안에 넣지 않습니다. click에서 callback을 한 번 호출하고 Enter/Space는 native 동작을 사용합니다.
하위 행도 label/glyph에 중복 handler를 두지 않습니다. 제품 action이 disabled라면 실제 host·handler 모두 차단하고
추가 시각 정책은 제품 근거로 정합니다. 이 시안의19 variant에 disabled/focus 교차 상태는 없습니다.

expanded와 historyExpanded는 별도 값을 사용합니다. 펼친 영역에만 목록을 렌더하거나
검증된 disclosure primitive로 focus/읽기 노출을 차단합니다. 사라질 영역에 focus가 있었다면 trigger로 복귀합니다.
실제 keyboard·a11y 규칙은 [접근성](./accessibility.md)과 각 하위 계약을 함께 적용합니다.

## 4. 패널 CSS를 제품 token에 연결합니다

다음 recipe는 시안의 기본320px 단일 줄 비교 환경입니다. 내부 하위 행은 각각의 스타일 문서를 따릅니다.

```css
.hub-session-panel {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  width: 320px;
  padding: 16px 12px;
  border: 1px solid #eee;
  border-radius: 16px;
  background: #f6f7f9;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
  color: #1c1c1c;
  font-family: Pretendard, sans-serif;
}
.hub-session-section { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.hub-session-section[data-section="progress"] { gap: 8px; }
.hub-session-items, .hub-session-history-items, .hub-session-progress {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hub-session-schedule-body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.hub-session-history-wrap { padding: 0 4px; }
.hub-session-history {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 4px 8px;
  border-radius: 8px;
  background: #fff;
}
.hub-session-history-heading {
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 2px;
  padding: 0 8px;
  color: #757575;
  font: 600 12px/16px Pretendard, sans-serif;
}
.hub-session-history-toggle { width: 16px; height: 16px; padding: 0; }
.hub-session-history-toggle img { display: block; width: 16px; height: 16px; }
.hub-session-progress { padding: 0 4px; }
.hub-session-context-list { box-sizing: border-box; padding-left: 4px; }
.hub-session-context-body { padding: 4px; border-radius: 8px; background: #fff; }
.hub-session-empty {
  margin: 0;
  padding: 0 4px;
  color: #aaa;
  font: 400 14px/20px Pretendard, sans-serif;
}
```

history-toggle 크기 adapter는 실제 ghost/default/24 구현의 layout을16px로 재정의하는 위치입니다.
위 두 줄만으로 제품 IconButton의 min-width/size 토큰까지 덮어쓴다고 가정하지 않습니다.
제품 primitive의 검증된 size adapter에서 actual16/glyph16·radius4·paint#757575를 보존하고 native16 variant 지원을 주장하지 않습니다.
glyph를 transform scale하지 않습니다. focus-visible과 hit area 확장은 제품 근거로 연결합니다.

패널에 height934/154·overflow:hidden을 지정하지 않습니다. 목록은 실제 길이만큼 HUG하고
제품 shell이 제한한 높이에서는 실제 스크롤 영역을 제공해 모든 항목과 keyboard focus에 접근할 수 있게 합니다.
history/content의 화면 가장자리 clip은 focus가 잘리지 않게 제품에서 조정·검증합니다.
좁은 화면 폭/줄바꿈/추가 상태의 시각은 원본과 구분한 제품 확장으로 남깁니다.

## 5. 자산·제품 동작·매핑을 마무리합니다

[전용 자산](../../references/session.assets.json)을 제품이 관리하는 경로에 연결합니다.
20px source를16px로 표시한 실제 export와 선1.25px, Header chevron#757575/plus#1C1C1C를 보존합니다.
외부 img의 내부 stroke가 CSS color로 바뀐다고 가정하지 않습니다.
Progress pending은 circle SVG와 제품의 indexText를 조합하고 active에 임의 회전을 넣지 않습니다.

제품 owner가 예약 열기·실행 조회·파일 열기/다운로드·컨텍스트 추가·Flyout 연결 등을 필요한 범위만 구현합니다.
이 Session 원본에 없는 API·메뉴·선택 확정·전송 흐름을 자동으로 채택하지 않습니다.
[검증](./verification.md)을 완료한 뒤 실제 source·public export·token/asset adapter와 제품 실행 결과를 로컬 mapping에 남깁니다.
검증 전 공유 `frontend.json`의 draft와 registry의 unmapped를 유지하고 원본 serengeti를 수정하지 않습니다.

## 6. 사용자 채택 presence·scroll adapter

[명시적 채택](../../motion.md)을 사용하는 제안 API에는 선택적 `height`·`maxHeight`를 추가합니다. 없으면 자연 HUG, 있으면 border 안의 실제 viewport에 한 번 적용합니다.
공통 ScrollArea/AH scrollbar adapter는 고정 shell의 위아래12px 안에 배치합니다. content에는 py4/px12·section gap24를 연결합니다.
합계 py16과 내부294px는 원본과 같으므로 첫·마지막 행의 정적 위치와 제한 없는 filled934/empty154 HUG 높이를 보존합니다.
ScrollArea의 기본 track inset3px에 border1+shell12가 더해져 track은 패널 위아래에서16px 안쪽, 즉 radius16 곡면 끝에서 시작·종료합니다.
공용 엔진이 실제 viewport를 측정하게 하며 track CSS만 따로 이동하지 않습니다. `maxHeight`를 전달할 때는 패널 값에서 border2+shell24를 뺀 `calc(<maxHeight> - 26px)`를 adapter의 제한으로 연결합니다.
고정 `height`는 border-box 패널에 적용하고 adapter는 남은 flex 공간을 사용합니다. `maxHeight`만 적용한 경우에도 넘칠 때만 스크롤하고 내용이 적으면 HUG로 줄어듭니다.
추가 viewport radius는 적용하지 않습니다. shell의12px는 스크롤과 함께 사라지는 content padding으로 되돌리지 않습니다.
기존 외부 Gallery viewport는 제거하고 원본 row의 폭·glyph·padding은 줄이지 않습니다.560px는 데모 선택이며 Figma 패널 높이로 기록하지 않습니다.
본문은 공통 measured-height disclosure로 감싸고 body 안에 선행 gap4/8을 포함합니다. closing presence만 내부에서 관리하며 expanded를 별도 업무 state로 복제하지 않습니다.
Header toggle ref를 disclosure에 전달하고 close 시작 시 내부 focus를 복귀시킵니다. 동적 측정과 빠른 반전·취소·reduce의 cleanup을 검증합니다.

## 7. 대화 shell의 reveal과 내용 폭을 분리합니다

다음은 첫 열기에서 빈 안내의 줄바꿈·높이가 흔들리지 않도록 하는 **제품 조립 recipe**이며 Panel 공개 API가 아닙니다.
중간 reveal shell을 내용의 폭 기준으로 삼지 않고, 최종 가용 폭을 제공하는 대화 main을 query container로 사용합니다.

```css
.hub-chat-view { container-type: inline-size; }
.hub-chat-session-surface {
  width: min(320px, max(0px, calc(100cqw - 4px)));
}
.hub-chat-side {
  overflow: clip;
  overflow-clip-margin: 8px;
}
```

일반 main에서는 내용320px를 첫 프레임부터 유지하고 아주 좁으면 main 폭에서4px를 제외합니다. 바깥 shell의 기존0→324px 폭 전환250ms ease와 내용 presence150ms ease/6px는 유지합니다.
8px clip margin은 Mid shadow의 paint 여유이며 layout padding·예약 폭·내부 scroll 크기를 변경하지 않습니다. shadow 자체를 다른 효과로 교체하지 않습니다.
내용 높이는 자연 HUG로 두고 기존 height/maxHeight 제한에서만 스크롤합니다. 원본154px를 empty 고정 높이로 넣거나 별도 측정 timer·state를 추가하지 않습니다.
공용 Disclosure·ScrollArea·SessionPanel API와 부모의 열림·expanded·focus 소유권은 유지하고, 새로고침 후 첫 열기·빠른 반전·좁은 main·reduced-motion을 실제 화면에서 확인합니다.
