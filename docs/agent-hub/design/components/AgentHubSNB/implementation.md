# AgentHubSNB — 신규 구현과 제품 연결

이 문서는 **신규 구현 recipe와 제안 모델**입니다. 실행 컴포넌트·공개 export·백엔드 endpoint가 제공된 것은 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 관련 접근성 계약을 함께 적용합니다.

## 구현 순서

1. 소비 저장소의 router·탐색 데이터·공개 UI export·token/asset 방식을 조사합니다. 호환되는 Button/IconButton·Divider·native viewport를 재사용합니다.
2. [NavIcon](../AgentHubNavIcon/README.md)·[NavItem](../AgentHubNavItem/README.md)·[NavRail](../AgentHubNavRail/README.md)의 원본과 자산을 연결합니다.
3. [SectionHeader](../AgentHubSNBSectionHeader/README.md)·[SNBItem](../AgentHubSNBItem/README.md)·[SNBPanel](../AgentHubSNBPanel/README.md)을 구현합니다.
   보조 버튼·더보기·flat 하위 행·선택 override와 실제 scroll viewport를 먼저 검증합니다.
4. 이 두 영역을 제품 shell에 조합하고 route·expanded·데이터·intent를 연결합니다. 보드의 전시용 위치·제목·모서리를 복사하지 않습니다.
5. 실제 render·입력·라우팅·직접 URL 진입·긴 데이터·스크롤·접근성을 검증한 뒤 source/public export와 채택 범위를 로컬에 기록합니다.

제품 소유 경로를 확인한 뒤 UI 표시·상태 연결·도메인 조회를 나눕니다. 아래 이름은 **책임 예시**이며 폴더를 강제하지 않습니다.

| 책임 | 포함할 내용 |
| --- | --- |
| SNB presentation | 전용6개 하위 UI·상태별 시각·native host·asset 연결 |
| navigation adapter | router 현재 ID·href·link interception·section/project 펼침 상태·intent 전달 |
| domain adapter | 고정/프로젝트/채팅 데이터·권한·조회·더보기·생성 정책 |
| app shell | 레일·패널의 실제 위치·가용 높이·다른 콘텐츠와의 배치 |

CMP의 menu roots API·ACL 자료형·route index·즐겨찾기·저장 키를 가져오지 않습니다.
표시 레이어에서 fetch·router navigation·localStorage를 직접 결정하지 않고 제품이 확인한 adapter를 연결합니다.

## 표시 모델 제안

```ts
// 실제 export가 아닌 제안입니다. ID·URL·행별 action은 제품 데이터로 공급합니다.
export type SNBIntent =
  | { type: "request-search" }
  | { type: "new-chat" }
  | { type: "settings" }
  | { type: "account" }
  | { type: "item-menu"; itemId: string }
  | { type: "section-action"; sectionId: string; actionId: string }
  | { type: "more-projects" };

export type SNBTarget =
  | { kind: "route"; href: string }
  | { kind: "intent"; value: SNBIntent };

export type SNBNode = {
  id: string;
  label: string;
  target?: SNBTarget;
  leading?: "folder" | "chat";
  children?: readonly SNBNode[];
  hasMenu?: boolean;
};

export type SNBSection = {
  id: string;
  label: string;
  items: readonly SNBNode[];
  collapsible: boolean;
  actions: readonly { id: string; label: string }[];
};

export type AgentHubSNBProps = {
  labels: {
    primaryNavigation: string;
    contentNavigation: string;
    newChat: string;
    settings: string;
  };
  account: { initials: string; accessibleName: string };
  railItems: readonly {
    id: string;
    label: string;
    glyph: "home" | "book" | "clock" | "search";
    target: SNBTarget;
  }[];
  sections: readonly SNBSection[];
  currentRailId?: string;
  currentItemId?: string;
  expandedSectionIds: ReadonlySet<string>;
  expandedProjectIds: ReadonlySet<string>;
  onSectionExpandedChange: (id: string, expanded: boolean) => void;
  onProjectExpandedChange: (id: string, expanded: boolean) => void;
  onIntent: (intent: SNBIntent) => void;
};
```

위 모델의 현재 ID는 URL과 데이터를 소유한 제품에서 공급합니다.
현재 route와 따로 갱신되는 local selected state를 중복 저장하지 않습니다.
영역 이름·새 채팅·설정의 label과 계정 initial도 locale·제품 데이터로 공급하며 원본의 ‘김’을 하드코딩하지 않습니다.

실제 Figma API는 glyph/state/depth와 행의 leading/trailing Boolean입니다.
위 `sections`·ID·href·callback·expanded model은 제품 구현 제안이며 원본 props나 기존 백엔드 계약이 아닙니다.

## DOM과 이벤트 연결

route target은 native anchor와 제품 router adapter에 연결하고, intent target은 native button의 한 handler에 연결합니다.
행 전체와 자식 control에서 페이지 이동·상태 갱신을 두 번 실행하지 않습니다. 새 채팅 생성이나 저장의 성공 여부는 제품 owner가 확정합니다.

```text
navigation region
├─ nav "Agent Hub 기본 탐색": rail links/actions
└─ nav "Agent Hub 콘텐츠 탐색"
   ├─ 새 채팅 button
   └─ section
      ├─ heading + sibling toggle/actions
      └─ list
         └─ row: sibling disclosure / link or action / more button
```

leaf의 current와 branch의 expanded를 따로 연결하고, 숨긴 children은 focus·보조기술 탐색 대상에서도 제외합니다.
제품이 실제 popup을 채택했을 때만 해당 Menu/Dialog를 연결합니다. 모든 행에 Menu/Tree 역할을 부여하지 않습니다.

## 배치와 스크롤

다음은 rail과 panel을 붙여 배치하는 **제품 배치 제안**입니다. 전시 보드에 이 완성 wrapper가 있다는 뜻은 아닙니다.

```css
.agent-hub-snb {
  display: flex;
  align-items: stretch;
  gap: 0;
  min-height: 0;
}
.agent-hub-snb-rail { flex: 0 0 68px; min-height: 0; }
.agent-hub-snb-panel { flex: 0 0 288px; min-height: 0; }
```

부모 shell이 실제 가용 높이를 공급하며1037/1033px를 고정하지 않습니다.
새 채팅과 목록을 고정/스크롤 영역 중 어디에 둘지는 제품에서 결정하고 계약의 내부 여백·내용 순서를 유지합니다.
목록에는 실제 overflow viewport를 두고 더 읽을 내용이 있을 때만 fade를 표시합니다. 마지막 행·focus를 덮지 않고 포인터 입력을 통과시킵니다.
원본 gradient transform과 표시 영역의 차이는 [Panel](../AgentHubSNBPanel/styles.md)을 참조합니다.

## 완료 시 기록

공개 source/export·token/asset adapter·router/데이터 owner·추가 상태·검증 결과를 로컬 mapping과 제품 문서에 기록합니다.
그 전에는 공유 설정을 draft, implementation을 unmapped로 유지합니다. 이 문서를 기술 API 최신화 결과로 취급하지 않습니다.
