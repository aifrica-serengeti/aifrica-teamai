# AgentHubNavItem — host와 자산 연결

아래는 **제품 API·CSS 제안**입니다. 기존 export나 Figma root API가 아닙니다.
기존 탐색 host와28px 자산 adapter를 먼저 확인하고 호환되면 재사용하며 없으면 가까운 제품 UI 범위에 새 export를 개발합니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 채택한 Button/Link 계약을 읽습니다.

```ts
// 실제 router/링크 타입은 소비 제품에서 확인합니다.
type NavItemBase = {
  id: string;
  label: string;
  icon: "home" | "book" | "clock" | "search";
  selected: boolean;
};
export type AgentHubNavItemProps = NavItemBase & (
  | { kind: "link"; href: string; current: boolean }
  | { kind: "action"; onActivate: () => void; expanded?: boolean; controlsId?: string }
);
```

state만 실제 Figma root 속성입니다. id·label·glyph 선택·href·callback·current·disclosure는 제품 제안입니다.
kind=link는 실제 anchor/제품 Link 하나, kind=action은 type=button 하나로 렌더합니다.
selected는 시각 선택값이며 링크의 current나 action의 expanded와 별도로 공급합니다.
제품이 검증한 host에 하나의 callback만 연결하고 glyph에는 handler를 등록하지 않습니다.

```text
anchor 또는 native button52
└─ 장식 AgentHubNavIcon28
```

```css
.hub-nav-item {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  padding: 0;
  gap: 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
  text-decoration: none;
  transition: background-color 200ms ease;
}
.hub-nav-item:hover:not([data-selected]):not([aria-disabled="true"]):not(:disabled) { background: rgb(0 0 0 / 5%); }
.hub-nav-item:active:not([data-selected]):not([aria-disabled="true"]):not(:disabled) { background: rgb(0 0 0 / 10%); }
.hub-nav-item[data-selected] { background: #cce0ff; }
```

glyph는 [NavIcon](../AgentHubNavIcon/implementation.md)의 정확한 neutral28px alpha mask 한 층에 선택색을 연결합니다.
`background-color`를 보간하는 host만으로 glyph의 색상 전환을 대신하지 않고 내부 `color 200ms ease`도 연결합니다.
reduced-motion에서는 host와 glyph 모두 transition을 제거합니다.
이 예시에서 selected를 hover/pressed보다 유지하는 우선순위는 제품 제안이며 원본 교차 상태의 실측이 아닙니다.
data-selected가 false이면 속성을 제거합니다. 추가 disabled의 paint·우선순위는 미측정이며, 제공한다면 native/링크 의미와 실행 guard도 제품에서 검증합니다.
위 CSS만으로 disabled 구현이 완료됐다고 판단하지 않습니다. focus-visible도 기존 host의 semantic token에 연결해 유지합니다.

52px host와28px glyph의 중앙 배치로 x12/y12를 재현하고 set 전시 테두리·추가 label·Badge·Menu를 자동 추가하지 않습니다.
route/API/검색 입력·전송·인증 role은 NavItem 밖의 owner에 연결합니다.
실제 renderer·keyboard·route/action 결과·추가 상태를 검증한 뒤 source/public export를 로컬 mapping에 기록하고 그 전에는 unmapped/draft를 유지합니다.
