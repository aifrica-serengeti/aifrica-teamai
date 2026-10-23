# AgentHubSNBPanel — 제품 API와 배치 연결

아래는 **제품 구현 제안**이며 실행 앱·기존 public export·Figma root props가 아닙니다.
소비 저장소에서 호환 패널·header·행·primary40·Divider·실제 스크롤 viewport를 먼저 찾고 재사용합니다.
없으면 제품 shell/UI의 가장 좁은 범위에 새 export를 개발하되 router·인증·메뉴 API를 패널 내부에 복제하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 해당 의존 계약을 함께 읽습니다.

## 제품 입력과 하위 렌더러

```ts
import type { ReactNode } from "react";

// 표시용 조합 입력이며 실제 데이터 요청과 각 host의 동작은 제품이 연결합니다.
export type AgentHubSNBPanelProps = {
  label: string;
  newChatLabel: string;
  onNewChat: () => void;
  newChatDisabled?: boolean;
  sections: readonly {
    id: string;
    title: string;
    renderHeader: () => ReactNode;
    rows: readonly { id: string; render: () => ReactNode }[];
    more?: { label: string; onActivate: () => void; disabled?: boolean };
  }[];
};
```

root에 native SLOT이 있다는 뜻이 아닙니다. 위 renderer와 callback은 제품 adapter 제안입니다.
header·행은 각 [SectionHeader](../AgentHubSNBSectionHeader/implementation.md)·[SNBItem](../AgentHubSNBItem/implementation.md)의
실제 호환 API에 연결하고 안정적인 section/row ID를 key로 사용합니다.
행 renderer는 링크/action·현재 항목·보조 조작을 한 owner에 연결합니다. renderer가 반환한 host 밖에 중복 button을 만들지 않습니다.
새 채팅과 더보기는 type=button·실제 disabled·한 click 경로를 사용하고 glyph·keydown·부모에서 같은 요청을 다시 실행하지 않습니다.
새 채팅 생성/이동·draft 보존·더보기 정책·ACL·요청과 실패는 호출부가 소유합니다.

## 원본과 제품 viewport를 구분합니다

```text
패널 표면288: 오른쪽 선1·px16/위24/아래0·gap16 (아래24는 콘텐츠 끝)
├─ top73: 새 채팅40 + gap16 + Divider17
└─ relative 목록 영역: flex1/min-height0
   ├─ AgentHubScrollbar: height100%·visibility hover
   │  └─ 공용 엔진의 native viewport 하나
   │     └─ section 목록: gap32·원본 행/제목 조합·끝 padding24
   ├─ 장식 top fade53: canScrollUp
   └─ 장식 bottom fade53: canScrollDown
```

원본에는 viewport/Scrollbar 인스턴스가 없고 list가 root 아래44px까지 잘립니다.
위 실제 viewport는 정보 손실을 막기 위한 제품 배치 제안입니다. 원본 구조가 이미 스크롤된다고 기록하지 않습니다.
아래 part 스타일은 width288 비교 기준과 기능 배치를 연결하는 예시이며1033px는 reference host에서만 사용합니다.

```css
.hub-snb-panel {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 0 0 288px;
  width: 288px;
  height: 100%;
  min-height: 0;
  /* 원본 py24 중 하단24는 스크롤 콘텐츠 끝으로 옮긴 현재 채택입니다. */
  padding: 24px 16px 0;
  gap: 16px;
  border: 0;
  border-right: 1px solid #ddd;
  border-radius: 0;
  background: #fff;
  box-shadow: none;
  overflow: hidden;
}
.hub-snb-panel-top { display: flex; flex-direction: column; flex: 0 0 auto; gap: 16px; }
.hub-snb-panel-inset { padding: 0 8px; }
.hub-snb-panel-new-chat { width: 100%; height: 40px; }
.hub-snb-panel-scroll-region { position: relative; flex: 1 1 auto; min-height: 0; min-width: 0; margin-right: -16px; }
.hub-snb-panel-scroll { height: 100%; min-height: 0; min-width: 0; }
.hub-snb-panel-scroll > .common-scroll-track-y { right: 2px; }
.hub-snb-panel-viewport { min-height: 0; min-width: 0; }
.hub-snb-panel-list { display: flex; flex-direction: column; gap: 32px; padding-bottom: 24px; }
.hub-snb-panel-section { display: flex; flex-direction: column; gap: 4px; }
.hub-snb-panel-section-body { display: flex; flex-direction: column; gap: 8px; }
.hub-snb-panel-rows { display: flex; flex-direction: column; gap: 0; }
.hub-snb-panel-more {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: #656b74;
  text-align: left;
  font: 600 14px/20px Pretendard, sans-serif;
}
.hub-snb-panel-fade {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 27px;
  height: min(53px, 50%);
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 200ms ease;
}
.hub-snb-panel-fade[data-edge="top"] {
  top: 0;
  background: linear-gradient(to bottom, #fff, rgb(255 255 255 / 53.304%));
}
.hub-snb-panel-fade[data-edge="bottom"] {
  bottom: 0;
  background: linear-gradient(to bottom, rgb(255 255 255 / 53.304%), #fff);
}
.hub-snb-panel-scroll-region[data-can-scroll-up="true"] [data-edge="top"],
.hub-snb-panel-scroll-region[data-can-scroll-down="true"] [data-edge="bottom"] { opacity: 1; }
.hub-snb-panel-scroll-region:has(:focus-visible) .hub-snb-panel-fade { opacity: 0; transition: none; }
@media (prefers-reduced-motion: reduce) {
  .hub-snb-panel-fade { transition: none; }
}
@media (forced-colors: active), print {
  .hub-snb-panel-fade { display: none; }
}
```

하단 gradient는 원본 gradientTransform을 bounds 안의 alpha로 바꾼 수학적 adapter입니다.
원본303px/x−6/y980와 하단 장식 한 개는 [실측](../../references/snb.figma.json)에 보존합니다.
현재 runtime에서는 목록 영역 안에서 오른쪽 gutter27px를 제외해 실제 thumb를 덮지 않습니다.
상단 gradient는 하단의 반전 표현이며 이번 사용자 채택입니다. 좁은 높이에서는 각각 높이를 영역의50% 이하로 제한합니다.
정적 원본에 상단·스크롤 조건·opacity timing API가 있는 것으로 기록하지 않습니다.

한 metrics callback에서 `canScrollUp`·`canScrollDown`만 장식 표시로 반영합니다.
소비 엔진의 검증한 `onScrollMetricsChange` 또는 동등한 공개 callback을 사용하고 별도 측정 listener를 만들지 않습니다.
초기 두 값은 false이며 상위 props나 선택 상태가 아닙니다. 같은 flag면 상태를 갱신하지 않아 불필요한 재렌더를 피합니다.
두 장식은 `aria-hidden="true"`이고 공개 props·export를 추가할 필요가 없습니다.
공용 API의 canScrollUp/Down·측정값·observer cleanup을 재사용하고, snapshot 숫자를 실제 runtime 측정으로 사용하지 않습니다.

SNB는 엔진에 `verticalTrackPaddingEnd={24}`를 전달하고, wrapper의 `--scroll-gutter`를27px로 재정의합니다.
Agent Hub adapter가 inline 기본11px를 공급한다면 상위 stylesheet만으로 덮지 말고 검증한 style/variant 경로로27px를 전달합니다.
위 CSS의 margin-right−16px와 track right2px를 함께 적용해 영역 폭271px·행 폭244px·행↔thumb21px를 연결합니다.
패널 오른쪽 border1px를 포함하면 thumb 오른쪽 끝은 외곽 경계에서3px 안쪽입니다.
이전 SNB 채택보다 thumb만10px 오른쪽으로 이동하며, 기본 gutter11px 배치보다는18px 오른쪽입니다.
수직 track bottom은 엔진이 `3+24=27px`로 공급하고, 기하 함수도 y축 track 길이를 같은 값으로 줄입니다.
CSS에서 bottom만27px로 바꾸거나 content padding을48px로 늘리지 않습니다. 이 선택적 엔진 입력의 기본0은 기존 사용처를 보존합니다.

현재 채택은 공용 엔진을 감싼 [AgentHubScrollbar](../AgentHubScrollbar/implementation.md)의 metrics callback·viewport를 사용합니다.
`height="100%"`와 flex/min-height0로 남은 높이에 연결하고 `visibility="hover"`·orientation vertical을 선택합니다.
스크롤 wrapper·viewport·content는 공개 class/style 경로로 연결하며 standalone 표면/r8/p16을 추가하지 않습니다.
native overflow 예시 컨테이너와 ScrollArea를 중첩하거나 별도 thumb를 그려 scroll owner를 둘로 만들지 않습니다.
Agent Hub skin4px/#DDD/gutter27px와 native scrollbar 숨김은 adapter 한 곳에서 적용합니다. gutter는 숨김 중에도 예약합니다.
패널 hover에서 track를 노출하고, 엔진의 focus-within·drag 유지·coarse pointer 노출을 함께 보존합니다.
thumb 노출과 경계 장식의 opacity200ms는 공용 계승이며 reduced-motion에서는 즉시 표시합니다. forced-colors·print에서는 장식만 제거합니다. 기존 다른 소비자의 기본 always 모드는 바꾸지 않습니다.

원본 header/행은256px이고 부모는255px입니다. reference 대조에서는 이1px 차이를 보존합니다.
위 runtime viewport 예시에서는 하위 header/행도 부모 폭 FILL로 연결하는 adapter를 함께 채택합니다.
실측256px를 전역 수정하지 않고 제품 보완으로 기록하며,1px 차이가 불필요한 가로 스크롤이나 잘린 조작을 만들지 않게 합니다.
glyph·trailing·focus outline과 긴 label의 접근을 검증하고 단순 overflow-x 숨김만으로 내용 손실을 덮지 않습니다.
1033px fixture에서 top24+73·gap16을 제외한 list viewport는920px입니다. list964px에 끝 padding24를 더한988px를 보려면68px의 이동 범위가 필요합니다.
마지막 행을 삭제하거나 root 높이에 맞춰 강제 clipping하지 않습니다.

## 실제 하위 source와 override

새 채팅은 [AgentHubButton](../AgentHubButton/styles.md)의 primary40/r8·leading plus20/white를 연결하고 trailing·keycap은 렌더하지 않습니다.
Divider source는 `2022:2`의 Horizontal239×17/py8/line1입니다. 독립 `3155:20478`이나 세로 Divider 원본으로 identity를 바꾸지 않습니다.
top과 Divider wrapper의 좌우8px는 한 번만 적용합니다.

특수 고정 행 `2611:62907`은 hovered source `2611:64577`의 실제 #F4 fill·보이는 #F8 trailing gradient·숨김 more를 로컬 조합 adapter로 유지합니다.
일반 selected source나 전체 hovered 상태를 수정하지 말고 해당 인스턴스 차이로 기록합니다.
위 문단은 원본 비교용 조합 기록입니다. 현재 일반 runtime은 [SNBItem의 투명20px slot 채택](../AgentHubSNBItem/styles.md)을 따르며
특수 pinned의 gradient를 일반 프로젝트의 더보기 배경에 적용하지 않습니다.
프로젝트의2depth3행은 들여쓴 평면 표시입니다. 부모/expanded 모델을 채택한다면 제품 데이터·토글·숨김 group과 keyboard를 새 요구로 검증합니다.
모든 glyph·자산의 source·표시 여부는 [manifest](../../references/snb.assets.json)와 각 하위 계약을 따릅니다.

전체 SNB와의 배치는 [상위 recipe](../AgentHubSNB/implementation.md)에서 연결하고 보드의40px 간격·radius100·전시 폭을 사용하지 않습니다.
실제 데이터·요청·route·keyboard·focus·viewport·긴 번역과 추가 상태 검증 뒤 source/public export를 로컬에 기록하며 검증 전에는 unmapped/draft를 유지합니다.


## 호환성과 마이그레이션

2026-10-23 채택은 내부 표현 보완이며 기존 props·export·선택·요청·펼침 상태의 공개 계약을 바꾸지 않습니다.
기존 하단-only 장식은 상하 두 장식으로 확장하고, root의 bottom24를 content 끝으로 옮깁니다.
기존 외부의 별도 bottom fade·padding24·scroll observer를 함께 남기지 않습니다.
공용을 끈 프로젝트에는 이 엔진을 강제하지 않되 동일한 경계 표시·끝 행 접근·focus 계약을 자체 엔진으로 연결합니다.
