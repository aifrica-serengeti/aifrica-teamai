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
패널 표면288: 오른쪽 선1·px16/py24·gap16
├─ top73: 새 채팅40 + gap16 + Divider17
├─ AgentHubScrollbar: min-height0·남은 높이·visibility hover
│  └─ 공용 엔진의 native viewport 하나
│     └─ section 목록: gap32·원본 행/제목 조합
└─ 필요한 때만 장식 bottom fade
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
  padding: 24px 16px;
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
.hub-snb-panel-scroll { flex: 1 1 auto; min-height: 0; min-width: 0; }
.hub-snb-panel-viewport { min-height: 0; min-width: 0; }
.hub-snb-panel-list { display: flex; flex-direction: column; gap: 32px; }
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
  left: -6px;
  right: -10px;
  bottom: 0;
  width: auto;
  height: 53px;
  background: linear-gradient(to bottom, rgb(255 255 255 / 53.304%), #fff);
  pointer-events: none;
  opacity: 0;
}
.hub-snb-panel[data-can-scroll-more="true"] .hub-snb-panel-fade { opacity: 1; }
.hub-snb-panel:has(.hub-snb-panel-viewport :focus-visible) .hub-snb-panel-fade { opacity: 0; }
```

fade의 CSS는 원본 gradientTransform을 bounds 안의 alpha로 바꾼 수학적 adapter입니다. 원본 stops/변환은 [실측](../../references/snb.figma.json)에 따로 보존합니다.
원본은303px/x−6입니다. 바깥 폭288px에서 오른쪽 선1px를 제외한 absolute containing block은287px입니다.
위 left−6/right−10은287+6+10=303px를 재현하는 제품 배치 제안입니다. 바깥 border-box를 기준으로 한15px를
CSS의100%에 그대로 더하면302px가 되므로 좌표계를 섞지 않습니다. 작은 폭에서도 결과를 별도로 검증합니다.
실제 can-scroll-more와 focus 중 fade 숨김은 **제품 제안**입니다. 정적 Figma에 이 상태 API가 있다는 뜻이 아닙니다.
viewport의 실제 scrollHeight/clientHeight/scrollTop으로 값을 갱신하고 끝에 도달하면 가림을 해제합니다. fade로 전체 제목이나 focus를 감추지 않습니다.
현재 채택은 공용 엔진을 감싼 [AgentHubScrollbar](../AgentHubScrollbar/implementation.md)의 metrics callback·viewport를 사용합니다.
`height="100%"`와 flex/min-height0로 남은 높이에 연결하고 `visibility="hover"`·orientation vertical을 선택합니다.
스크롤 wrapper·viewport·content는 공개 class/style 경로로 연결하며 standalone 표면/r8/p16을 추가하지 않습니다.
native overflow 예시 컨테이너와 ScrollArea를 중첩하거나 별도 thumb를 그려 scroll owner를 둘로 만들지 않습니다.
Agent Hub skin4px/#DDD/gutter11px와 native scrollbar 숨김은 adapter 한 곳에서 적용합니다. gutter는 숨김 중에도 예약합니다.
패널 hover에서 track를 노출하고, 엔진의 focus-within·drag 유지·coarse pointer 노출을 함께 보존합니다.
opacity200ms는 공용 계승이며 reduced-motion에서는 즉시 표시합니다. 기존 다른 소비자의 기본 always 모드는 바꾸지 않습니다.

원본 header/행은256px이고 부모는255px입니다. reference 대조에서는 이1px 차이를 보존합니다.
위 runtime viewport 예시에서는 하위 header/행도 부모 폭 FILL로 연결하는 adapter를 함께 채택합니다.
실측256px를 전역 수정하지 않고 제품 보완으로 기록하며,1px 차이가 불필요한 가로 스크롤이나 잘린 조작을 만들지 않게 합니다.
glyph·trailing·focus outline과 긴 label의 접근을 검증하고 단순 overflow-x 숨김만으로 내용 손실을 덮지 않습니다.
1033px fixture에서 top73·gap16·py48을 제외한 list viewport는896px이고 list964px를 보려면68px의 이동 범위가 필요합니다.
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
