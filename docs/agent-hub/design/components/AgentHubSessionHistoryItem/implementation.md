# AgentHubSessionHistoryItem — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS recipe**입니다. 실제 제품 export나 실행 기록 조회/읽음 API가 아닙니다.

## 1. 기존 실행 기록 행을 확인합니다

소비 저장소의 source·registry·public export에서 기록 목록·현재 실행·확인 상태 owner를 찾습니다.
호환되면 스타일/데이터 adapter를 연결하고, 없으면 [Session Panel](../AgentHubSessionPanel/implementation.md)의 가까운 범위에 새 export를 만듭니다.
동작은 단일 활성화이며 Card·Checkbox·Menu·Status 의미로 자동 변환하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

## 2. 현재 실행과 확인 여부를 따로 받습니다

```ts
export type AgentHubSessionHistoryItemProps = {
  executionId: string;
  title: string;
  current?: boolean;
  unread?: boolean;
  unreadDescription?: string;
  disabled?: boolean;
  onActivate: (executionId: string) => void;
};
```

current는 Figma selected, unread는 dot 표시를 연결하는 제안 이름입니다. unread 기본값은 false입니다.
true이면 제품 locale의 실제 unreadDescription을 제공하고 읽음 정책·서버 저장은 제품 owner에 남깁니다.
timestamp·timezone·정렬·실제 조회·확인 API·자동 스크롤을 이 타입의 title 문자열에서 추론하지 않습니다.

## 3. 한 action과 상태 설명으로 조합합니다

```text
button type=button, 실제 disabled, current에 맞는 상태
├─ title 평문
├─ unread일 때 장식 dot6, aria-hidden
└─ unread일 때 읽을 수 있는 상태 설명 연결
```

실제 current 의미를 채택한 native button에는 aria-current를 연결할 수 있습니다.
선택한 패턴이 listbox라면 option과 aria-selected 등 부모의 계약으로 연결하며 button을 중첩하지 않습니다.
unread 설명에는 안정적인 ID를 사용해 aria-describedby 등으로 연결하고 시각적으로 숨긴 설명도 필요한 경우에만 렌더합니다.
숨긴 설명은 제품의 검증된 visually-hidden helper로 일반 흐름에서 제외해 세 번째 flex 항목·추가 gap을 만들지 않습니다.

click에서 disabled guard 후 onActivate(executionId)를 한 번 호출합니다. native Enter/Space와 별도 keydown에서 재실행하지 않습니다.
title·dot·wrapper에 같은 callback을 등록하지 않고 dot을 클릭 가능한 읽음 토글로 만들지 않습니다.
callback 후 내부에서 unread=false를 자동 저장하지 않습니다. 제품이 정한 조회·확인 시점과 실패 복구는 해당 owner가 담당합니다.

## 4. title과 점을 배치합니다

literal은 Light 비교값이며 제품 token에 연결합니다. 폭은 부모가 공급하고 standalone 비교에만278px를 줍니다.

```css
.hub-session-history-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 32px;
  padding: 6px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  box-shadow: none;
  color: #1c1c1c;
  text-align: left;
  font: 400 14px/20px Pretendard, sans-serif;
}
.hub-session-history-item:hover:not(:disabled):not([data-current]) { background: rgb(0 0 0 / 5%); }
.hub-session-history-item:active:not(:disabled):not([data-current]) { background: rgb(0 0 0 / 10%); }
.hub-session-history-item[data-current] { background: #ebf3ff; }
.hub-session-history-item:focus-visible {
  outline: 1px solid var(--hub-session-focus);
  outline-offset: 1px;
}
.hub-session-history-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hub-session-history-dot { flex: 0 0 6px; width: 6px; height: 6px; }
```

unread=false는 dot과 설명 노드를 제거해 빈6px/gap8을 남기지 않습니다. 위 title 폭은 자동 FILL이므로262/248px를 고정하지 않습니다.
data-current는 false일 때 속성을 제거합니다. 현재 보기 배경을 hover/pressed보다 유지하는 것은 **제안 우선순위**이며 교차 상태 실측이 아닙니다.
focus token과 추가 disabled 시각은 제품에서 채택합니다. 다른 primitive는 aria-disabled/data-disabled와 실제 실행 guard도 연결합니다.
긴 제목·locale·확대에서 전체 정보에 접근하는 방법과 높이/폭 정책을 제품이 검증합니다.

## 5. 정확한 표시와 실제 매핑을 검증합니다

[6px dot 자산](../../assets/session/history-unread-dot-6.svg)은 원형 전체입니다.
장식 indicator로 연결하거나 같은6px/#3B82F6 ELLIPSE를 표현하며 추가 border·별도 아이콘을 겹치지 않습니다.
[자산 기록](../../references/session.assets.json)과 [자산 안내](../../assets.md)에 따라 제품 소유 경로를 사용하고 임시 Figma URL은 runtime에 두지 않습니다.
standalone/부모의 서로 다른 selected·dot semantic alias도 제품 token mapping에 근거와 함께 기록합니다.

[검증 항목](./verification.md)과 제품 lint/typecheck/test/build·keyboard·읽음/조회 정책·가변 문구를 확인한 뒤 로컬 mapping을 기록합니다.
실제 source/public export 확인 전 `unmapped`/`draft`를 유지하고 원본 제품을 수정하지 않습니다.
