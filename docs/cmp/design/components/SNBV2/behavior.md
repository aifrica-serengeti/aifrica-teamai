# SNB v2 — 상태와 동작

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← SNB v2 문서 인덱스](README.md)

## 3. 데이터 계약과 상태 모델

~~~ts
import * as React from 'react'

export type SNBV2IconName =
  | 'dashboard' | 'monitoring' | 'usage-monitoring' | 'reports'
  | 'workspace' | 'workflow' | 'job-scheduling' | 'schedule'
  | 'model-agent' | 'dataset' | 'volume' | 'annotation' | 'user-image'
  | 'service-management' | 'software'
  | 'cloud-resources' | 'settings' | 'support' | 'notification'

export interface SNBV2ItemData {
  id: string
  label: string
  icon?: SNBV2IconName // 1depth only
  children?: readonly SNBV2ItemData[] // maximum depth: 3
  disabled?: boolean
}

export interface SNBV2SectionData {
  id: string
  title?: string
  items: readonly SNBV2ItemData[]
}

export interface SNBV2User {
  initials: string
  name: string
  email: string
}

export interface SNBV2Props extends Omit<React.ComponentProps<'aside'>, 'children'> {
  sections: readonly SNBV2SectionData[]
  utilityItems?: readonly SNBV2ItemData[]
  activeId?: string
  collapsed?: boolean
  onActiveChange?: (id: string) => void
  expandedIds?: readonly string[]
  defaultExpandedIds?: readonly string[]
  onExpandedChange?: (ids: readonly string[]) => void
  user?: SNBV2User
}
~~~

상태 불변식:

1. children이 있고 depth가 1 또는 2이면 click은 expandedIds만 바꾼다. onActiveChange는 호출하지 않는다.
2. leaf만 activeId를 변경하고 aria-current=page를 갖는다.
3. 선택된 leaf의 parent는 text만 기본색으로 강조한다. parent 전체에 selected background 또는 active indicator를 넣지 않는다.
4. Collapsed rail에서는 inline children을 렌더하지 않는다. root branch는 Menu, grandchild는 MenuSub로 탐색한다.
5. disabled item은 click, disclosure, menu selection을 수행하지 않는다.

## 7. 상태와 모션

| 대상 | 동작 | 시각 상태 |
| --- | --- | --- |
| Expanded 1·2depth branch | expandedIds toggle | chevron 회전 + children height/opacity; selected fill 없음 |
| Leaf | onActiveChange(id) | selected fill + active indicator + aria-current |
| Selected leaf의 ancestor | 변화 없음 | text만 강조; branch를 닫아도 selection 보존 |
| Collapsed leaf | Tooltip 후 click select | selected path 표시 |
| Collapsed branch | hover/click/keyboard로 Menu open | Menu와 MenuSub에서 leaf select |
| Scroll | top/middle/bottom update | header/frame divider 전환 |

| 대상 | transition |
| --- | --- |
| Shell width/min-width, header padding | 0.24s ease |
| Branch height / margin | grid-template-rows 0.24s ease, margin-top 0.24s ease |
| Branch opacity | opacity 0.2s ease; close visibility delay 0s linear 0.24s |
| Chevron | transform 0.2s ease |
| Item, popup, divider colors | 해당 color property만 0.2s ease |
| Logo and label hide | opacity 0.16s ease |

transition: all 또는 전역 star selector transition은 사용하지 않는다. prefers-reduced-motion 전역 정책을 존중한다.

### Item UI/UX 상태 매트릭스 — 구현 필수

아래 표의 상태를 하나라도 합치거나 생략하면 플레이그라운드 SNB v2와 다른 컴포넌트가 된다.
hover는 pointer over, pressed는 pointer를 누르고 있는 동안의 native active 상태다. branch의
open 상태는 선택 상태가 아니다.

| mode / item | 기본 | hover | pressed | selected leaf | selected leaf hover / pressed |
| --- | --- | --- | --- | --- | --- |
| Expanded 1depth leaf | transparent, text/icon var(--text-subtler), radius 4 | var(--cmp-nav-hover) | var(--cmp-nav-selected) | var(--cmp-nav-selected), text/icon var(--text), radius 6, 왼쪽 4×24 accent indicator | var(--cmp-nav-selected-hover) / var(--cmp-nav-selected-pressed) |
| Expanded 1·2depth branch | transparent, text/icon var(--text-subtler) | var(--cmp-nav-hover) | var(--cmp-nav-selected) | 해당 없음. open 자체에는 selected fill 없음 | 해당 없음 |
| Expanded active-descendant branch | transparent, text/icon var(--text) | var(--cmp-nav-hover) | var(--cmp-nav-selected) | 해당 없음 | 해당 없음 |
| Expanded 2·3depth leaf | transparent, text var(--text-subtler), radius 0 6 6 0 | var(--cmp-nav-hover) | var(--cmp-nav-selected) | var(--cmp-nav-selected) + 2×32 selected anchor, text var(--text) | var(--cmp-nav-selected-hover) / var(--cmp-nav-selected-pressed) |
| Collapsed leaf | transparent 32×32 icon target | var(--cmp-nav-hover) | var(--cmp-nav-selected) | var(--cmp-nav-selected), radius 0 6 6 0, left 2×32 accent anchor | var(--cmp-nav-selected-hover) / var(--cmp-nav-selected-pressed) |
| Collapsed branch with selected descendant | transparent when no active child | var(--cmp-nav-hover) | var(--cmp-nav-selected) | leaf가 아니라도 selected path를 표시: collapsed leaf와 같은 fill/radius/anchor | var(--cmp-nav-selected-hover) / var(--cmp-nav-selected-pressed) |
| Disabled | text/icon var(--text-disabled), cursor not-allowed | 변화 없음 | 변화 없음 | 선택하지 않음 | 해당 없음 |

Expanded mode에서 active descendant branch는 글자색만 var(--text)로 바뀐다. branch 전체에
selected fill, active indicator, aria-current를 주지 않는다. 반대로 collapsed mode에서는
현재 leaf로 이어지는 1depth branch가 selected path로 보이는 것이 의도된 차이다.

### 상태 계산과 이벤트 소유권

이 코드를 그대로 사용한다. 특히 visualSelected와 selected를 하나로 합치면 branch를 접을 때
하위 leaf의 활성 상태가 사라지거나, expanded parent 전체가 선택색으로 채워지는 회귀가 생긴다.

~~~tsx
const itemHasChildren = hasChildren(itemData)
const canExpand = itemHasChildren && depth < 3
const collapsedMenuEnabled = collapsed && depth === 1 && canExpand && !itemData.disabled
const isExpanded = canExpand && !collapsed && expandedIds.has(itemData.id)
const isCurrent = activeId === itemData.id
const hasActiveDescendant =
  itemHasChildren &&
  !isCurrent &&
  containsActiveItem(itemData, activeId)

// route selection은 leaf에만 귀속된다.
const selected = !canExpand && isCurrent

// collapsed rail에서만 branch path를 selected처럼 보이게 한다.
const visualSelected =
  selected ||
  (collapsed && itemHasChildren && containsActiveItem(itemData, activeId))

const activateItem = () => {
  if (canExpand) {
    onToggleExpanded?.(itemData.id) // activeId를 바꾸지 않는다.
    return
  }
  onSelect?.(itemData.id)
}
~~~

button에는 다음 data/ARIA contract를 그대로 준다.

~~~tsx
<button
  data-selected={visualSelected}
  data-has-active-descendant={hasActiveDescendant || undefined}
  aria-current={isCurrent && selected ? 'page' : undefined}
  aria-label={collapsed && depth === 1 ? itemData.label : undefined}
  aria-expanded={canExpand && !collapsedMenuEnabled ? isExpanded : undefined}
  disabled={itemData.disabled}
  onClick={collapsedMenuEnabled ? undefined : activateItem}
/>
~~~

### 정확한 selector 우선순위

아래 순서가 background와 text state를 결정한다. selected hover/pressed override selector를
일반 hover/pressed **뒤에 두지 않으면**, 또는 active-descendant에 background를 주면 UI가 달라진다.

~~~ts
selectors: {
  '&[data-selected="true"]': {
    borderRadius: '6px',
    backgroundColor: 'var(--snb-v2-item-selected)',
    color: 'var(--text)',
  },
  '&[data-has-active-descendant="true"]': {
    color: 'var(--text)', // background를 절대 넣지 않는다.
  },
  '&:hover:not(:disabled)': {
    backgroundColor: 'var(--snb-v2-item-hover)',
  },
  '&:active:not(:disabled)': {
    backgroundColor: 'var(--snb-v2-item-pressed)',
  },
  '&[data-selected="true"]:hover:not(:disabled)': {
    backgroundColor: 'var(--snb-v2-item-selected-hover)',
  },
  '&[data-selected="true"]:active:not(:disabled)': {
    backgroundColor: 'var(--snb-v2-item-selected-pressed)',
  },
  '&:focus-visible': {
    outline: '1px solid var(--border-primary)',
    outlineOffset: '1px',
  },
  '&:disabled': {
    color: 'var(--text-disabled)',
    cursor: 'not-allowed',
  },
}
~~~

2·3depth button은 같은 color/background selector를 사용하되 base radius가 0 6 6 0이고,
focus outline은 outlineOffset -1px이다. 2depth selected anchor는 2×32 blue bar, 3depth
base connector는 1×32 divider이며 selected일 때만 2×32 blue bar로 굵어진다.

### Collapsed popup과 tooltip

| root item | 출력 | open/close contract |
| --- | --- | --- |
| leaf | Tooltip, side right | item click으로 activeId 변경 |
| children가 있는 1depth | MenuTrigger + MenuContent | hover, click, keyboard로 open. MenuContent는 side right, align start, sideOffset 8, size large |
| popup leaf | MenuItem selected={activeId === item.id} | select로 activeId 변경 |
| popup branch | MenuSub / MenuSubTrigger / MenuSubContent | 재귀적으로 3depth까지 표시 |

trigger와 portal Menu 사이의 pointer 이동은 250ms close delay를 사용한다. trigger나 popup에
pointer가 다시 들어오면 close timer를 취소한다. popup의 selected 3depth 조상은
item-hover surface var(--cmp-nav-hover)와 text var(--text)만 적용한다.

collapsed popup에는 Menu의 기본 gray interaction을 쓰지 않는다. popup root와 모든
MenuSubContent에 아래 token override class를 준다.

~~~ts
export const collapsedSubmenuContent = style({
  vars: {
    '--menu-surface': 'var(--surface)',
    '--menu-item-hovered': 'var(--snb-v2-item-hover)',
    '--menu-item-pressed': 'var(--snb-v2-item-pressed)',
    '--menu-item-selected': 'var(--snb-v2-item-selected)',
    '--text': 'var(--text)',
    '--text-primary': 'var(--text)',
    '--text-subtle': 'var(--text-subtle)',
    '--text-subtler': 'var(--text-subtler)',
    '--text-disabled': 'var(--text-disabled)',
    '--border-default': 'var(--border-default)',
    '--border-primary': 'var(--border-primary)',
  },
  backgroundColor: 'var(--surface)',
  borderColor: 'var(--border-default)',
  color: 'var(--text)',
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
})
~~~

## 보조 메뉴 trigger 조합

utility leaf에 popover를 연결할 때 클릭은 panel을 열고 내부 명시적 이동 버튼이 route를 변경한다. Slot을 제공하지 않은 소비자의 선택 동작은 바뀌지 않는다. 접힌 rail에서도 같은 slot을 사용한다.


## 계정 메뉴 슬롯

계정 메뉴를 제공하면 펼친 상태의 more 버튼과 접힌 상태의 사용자 아바타로 같은 메뉴를 연다. 슬롯 소비자는 공통 Menu로 열림·dismiss·focus를 처리하고 API·locale·theme 동작은 앱에서 소유한다.
