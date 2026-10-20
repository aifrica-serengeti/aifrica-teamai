# SNB v1 — 기타 구현 참조

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v1 문서 인덱스](../README.md)

## 구현 내용

### 12.3 고정 reference fixture — 이 데이터로 먼저 렌더한다

새 환경의 첫 구현은 제품 메뉴 이름이나 임의의 dashboard/설정 메뉴로 시작하지 않는다. 아래
fixture는 1·2·3depth, 긴 label, 즐겨찾기 overflow, active path를 한 화면에 검증하기 위한 고정
데이터다. **이 fixture에서 제품 navigation shell이 나오기 전에는 실제 서비스 데이터를 연결하지 않는다.**

```tsx
const REFERENCE_SECTIONS: readonly SNBSectionData[] = [
  {
    id: 'first',
    title: 'Title',
    items: [
      { id: 'first-1', label: '1depth', icon: 'globe' },
      {
        id: 'first-2', label: '1depth', icon: 'globe',
        children: [
          { id: 'first-2-1', label: '2depth 메뉴 이름이 긴 항목 예시입니다' },
          {
            id: 'first-2-2', label: '2depth',
            children: [
              { id: 'first-2-2-1', label: '3depth' },
              { id: 'first-2-2-2', label: '3depth' },
              { id: 'first-2-2-3', label: '3depth' },
            ],
          },
          { id: 'first-2-3', label: '2depth' },
        ],
      },
      { id: 'first-3', label: '1depth', icon: 'globe' },
      { id: 'first-4', label: '1depth', icon: 'globe' },
    ],
  },
  {
    id: 'second', title: 'Title',
    items: [
      { id: 'second-1', label: '1depth', icon: 'globe' },
      { id: 'second-2', label: '1depth', icon: 'globe' },
      { id: 'second-3', label: '1depth', icon: 'globe' },
    ],
  },
]

const REFERENCE_FAVORITES: SNBFavoritesData = {
  title: '즐겨찾기',
  items: [
    { id: 'first-1', label: '1depth', icon: 'globe' },
    { id: 'second-2', label: '1depth', icon: 'globe' },
    { id: 'first-3', label: '1depth', icon: 'globe' },
    { id: 'first-4', label: '1depth', icon: 'globe' },
  ],
}

function SNBV1Reference({ brand }: { brand: SNBV1BrandAssets }) {
  return (
    <div className="snb-reference-frame">
      <SNB
        brand={brand}
        sections={REFERENCE_SECTIONS}
        favorites={REFERENCE_FAVORITES}
        defaultOpenIds={['first-2', 'first-2-2']}
        defaultActiveId="first-2-2-1"
      />
      <main className="snb-reference-content" />
    </div>
  )
}
```

```css
/* Story/preview도 SNB root를 card로 감싸지 않는다. SNB는 좌측 edge에 직접 붙는다. */
.snb-reference-frame {
  display: flex;
  width: 1920px;
  height: 930px;
  overflow: hidden;
  background: var(--surface-primary-subtle);
}
.snb-reference-content { min-width: 0; flex: 1 1 0; background: var(--surface-shell); }
```

### 12.4.1 고정 runtime scenario — 정적 화면만 맞추고 끝내지 않는다

12.3의 reference fixture를 사용해 아래 순서를 자동화하거나 수동으로 모두 확인한다. 각 행은
가이드에 없는 임의 상태를 만들지 않고, SNB v1의 state ownership/색상/motion을 한 번에 검증한다.

| 순서 | 조작 | 반드시 남는 결과 | 금지되는 결과 |
| ---: | --- | --- | --- |
| 1 | `first-2`, `first-2-2`가 열린 초기 fixture에서 active `first-2-2-1` 확인 | 3depth leaf만 selected fill `var(--cmp-nav-selected)` 및 label/icon `var(--cmp-nav-selected-text)`; 열린 1/2depth는 enabled surface | parent가 열린 이유만으로 selected fill |
| 2 | 3depth를 가진 `first-2-2` 2depth를 클릭해 닫기 | active leaf를 감춘 이 2depth **하나만** selected; `aria-current`는 없음 | 3depth와 1depth가 함께 selected, activeId가 parent id로 변경 |
| 3 | `first-2` 1depth를 다시 클릭해 닫기 | 1depth만 selected; 2depth/3depth panel은 0fr으로 닫힘 | 닫힌 panel의 top/bottom padding, 2→3 connector, 남은 4/8px sliver |
| 4 | selected 1depth에 hover/press | fill `var(--cmp-nav-selected)`, label/leading icon/chevron `var(--cmp-nav-selected-text)` 유지 | hover의 `var(--cmp-on-nav)`이 selected text/icon을 덮음 |
| 5 | header toggle을 클릭해 collapsed 후 즉시 expanded | 동일한 aside root가 `240 ↔ 60` width transition(0.24s)을 수행; header glyph의 대비 역할, idle rail icon `var(--cmp-nav-text)` | root remount/순간 전환, header·rail icon의 검정/기본 theme color |
| 6 | collapsed selected rail icon에 hover/press | `var(--cmp-nav-collapsed-selected)` fill과 대비 glyph 유지 | ghost IconButton hover가 rail의 선택 fill을 일반 hover fill로 변경 |
| 7 | child가 있는 collapsed rail icon → popup → MenuSub 이동 | 제품 navigation popup, 250ms handoff로 flicker 없음, selected leaf의 `--cmp-nav-collapsed-selected` / ancestor `var(--cmp-nav-hover)` | 일반 Menu surface의 popup, trigger를 떠날 때 즉시 close, icon이 popup item 앞에 노출 |

위 7개 중 하나라도 틀리면 새 layout 또는 sample data를 추가하지 말고, **Icon inherit props → SNB
adapter CSS import → stable root motion → state priority** 순으로 원인을 수정한다.

### 12.5 Playground와 다른 레이아웃을 막는 구현 불변식

아래 규칙은 선택지가 아니다. 실패 화면처럼 child가 오른쪽에 떠 있거나, 모든 leaf에
star가 보이거나, 임의 text placeholder가 보이면 이 절을 위반한 것이다.

#### A. Header / brand는 placeholder가 없다

- Expanded header는 78px 안의 **브랜드 asset 3개**와 `chevrons_left` IconButton만 가진다.
  generic avatar, 임의 색 원, 임의 text logo를 CSS로 새로 만들지 않는다.
- Collapsed header는 compact brand asset(32×32), `chevrons_right` IconButton, 32px divider만 가진다.
- brand asset이 전달되지 않았다면 component를 대체 디자인으로 렌더하지 않는다. asset 누락으로
  보고하고 렌더를 중단한다. 임의 placeholder는 SNB v1이 아니다.

#### B. Tree는 normal flow만 사용한다

각 item node는 반드시 `button` 뒤에 child panel을 **같은 column flow**로 둔다. child panel,
2depth, 3depth에 `position: absolute|fixed|sticky`, `left`, `right`, `translateX`를 사용하지 않는다.
SNB에서 absolute positioning이 허용되는 것은 leaf의 favorite button(`right:32px`)과 header logo/
toggle뿐이다.

```tsx
function renderExpandedItem(item: SNBItemData, depth: 1 | 2 | 3): React.ReactNode {
  const hasChildren = (item.children?.length ?? 0) > 0
  const expanded = hasChildren && openIds.includes(item.id)
  const currentLeaf = !hasChildren && activeId === item.id
  const hasHiddenActiveDescendant =
    hasChildren && !expanded && item.children!.some((child) => itemContainsId(child, activeId))

  return (
    <div className="snb-item-node" key={item.id}>
      <SNBItem
        depth={depth}
        label={item.label}
        icon={depth === 1 ? item.icon : undefined}
        expandable={hasChildren}
        expanded={expanded}
        selected={currentLeaf || hasHiddenActiveDescendant}
        current={currentLeaf}
        starred={starredIds.has(item.id)}
        showFavoriteControl={!hasChildren}
        onSelect={() => {
          if (hasChildren) toggleOpenId(item.id)
          else setActiveId(item.id)
        }}
      />
      {hasChildren ? (
        <div className="snb-panel" data-open={expanded} aria-hidden={!expanded} inert={!expanded}>
          <div className={depth === 1 ? 'snb-panel__inner snb-panel__inner--from-depth-1' : 'snb-panel__inner'}>
            {item.children!.map((child) => renderExpandedItem(child, depth === 1 ? 2 : 3))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
```

```css
.snb-item-node { display: block; width: 100%; min-width: 0; position: static; }
.snb-panel { position: static; display: grid; width: 100%; grid-template-rows: 0fr; overflow: hidden; }
.snb-panel[data-open="true"] { grid-template-rows: 1fr; }
.snb-panel__inner { position: static; display: flex; width: 100%; min-height: 0; flex-direction: column; overflow: hidden; }
```

#### C. Favorites section과 leaf star는 서로 다른 기능이다

`favorites.items`는 expanded top section과 collapsed top star popup에만 쓰는 **1depth shortcut**이다.
shortcut item에는 `showFavoriteControl={false}`를 전달하므로 별 button이 없다. 이것을 tree item의
`starred` 상태와 혼동하면 기준과 달리 shortcut 전부에 노란 star가 붙는다.

| 데이터 | 렌더 위치 | star control |
| --- | --- | --- |
| `favorites.items` | expanded `즐겨찾기` section / collapsed star popup | **없음** |
| `sections[].items[]` leaf + `starred: true` | 일반 tree item | 활성 star만 보임 |
| `sections[].items[]` branch | 일반 tree item | **없음** |

```tsx
function renderFavoriteShortcut(item: SNBFavoriteItemData) {
  return <SNBItem key={item.id} depth={1} label={item.label} icon={item.icon}
    selected={activeId === item.id}
    showFavoriteControl={false}
    onSelect={() => setActiveId(item.id)} />
}
```

#### D. No fallback visual layer

SNB 내부에 `Card`, `Panel`, `section` background, generic Button variant, `max-width`, horizontal
demo grid를 넣지 않는다. preview page가 필요할 때도 `<SNB />` 자체는 frame의 좌측 edge에 붙고
그 너비는 언제나 240px 또는 60px이다. `SNB` component가 `Expanded (240px) — Accordion` 같은
설명 title이나 demo control을 렌더해서는 안 된다.

#### E. 실패 화면 판정표

| 보이는 결과 | 위반한 규칙 | 수정 위치 |
| --- | --- | --- |
| 임의 원 + 글자, text logo | A | placeholder 삭제 후 exact brand asset 전달 |
| 2/3depth가 오른쪽 떠 있거나 겹침 | B | panel의 absolute/translate 제거, 재귀 DOM을 button 다음 sibling으로 복원 |
| 모든 row에 star가 보임 | C | favorites shortcut에 `showFavoriteControl={false}` 전달 |
| root 또는 panel이 흰 card | D | Card wrapper 제거, `aside.snb`에 `--snb-bg` 적용 |
| selected rail hover가 gray | 상태 우선순위 | `[data-state="selected"]:hover/:active`가 `var(--cmp-nav-collapsed-selected)`을 유지하도록 수정 |
