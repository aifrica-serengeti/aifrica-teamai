# SNB v1 — TypeScript와 React 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](../README.md)

## 구현 내용

### 구현 entry lock

SNB root를 렌더하는 module이 아래 CSS를 **직접 import**해야 한다. Story, page, preview frame의
CSS에 SNB layout/color를 두면 실제 화면에서 누락되어 첨부 화면처럼 흰색·분산된 UI가 된다.

```tsx
// SNB.tsx의 module scope. render 함수 안이나 story 전용 파일에 두지 않는다.
import './SNB.css'
```

CSS Modules를 쓸 경우에도 `snb`, `snb-item`, `snb-menu` 등의 selector가 실제 DOM class로
매핑되어야 한다. reference mount **후** 아래 검사를 실행하고, 하나라도 거짓이면 실제 서비스
데이터 연결을 중단한다.

```ts
function assertSNBStylesMounted() {
  const root = document.querySelector<HTMLElement>('aside.snb')
  if (!root || getComputedStyle(root).backgroundColor !== 'rgb(30, 35, 46)') {
    throw new Error('SNB v1 styles are missing: do not render an unstyled fallback.')
  }
}
```

### React 핵심 구조

```tsx
function useHoverMenu() {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancel = () => { if (timer.current) clearTimeout(timer.current); timer.current = null }
  const openMenu = () => { cancel(); setOpen(true) }
  const closeLater = () => { cancel(); timer.current = setTimeout(() => setOpen(false), 250) }
  const handleOpenChange = (next: boolean) => next ? openMenu() : closeLater()
  useEffect(() => cancel, [])
  return { open, openMenu, closeLater, handleOpenChange }
}

function SNBItem({ depth, label, icon, expandable, expanded, selected, current, starred, onSelect, onStar }) {
  const [hovered, setHovered] = useState(false)
  // expanded는 selection을 만들지 않는다. selected는 실제 leaf 또는 접힌 active-path만 받는다.
  const state = selected ? 'selected' : 'enabled'
  const leaf = !expandable
  const showFavorite = leaf && (hovered || starred || state === 'selected')

  return (
    <div className="snb-item-root" data-state={state} data-starred={starred}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button className="snb-item" data-depth={depth} data-state={state}
        data-expanded={expandable ? expanded : undefined}
        data-has-favorite={leaf || undefined}
        aria-current={current ? 'page' : undefined}
        aria-expanded={expandable ? expanded : undefined} onClick={onSelect}>
        {depth === 1 && <span className="snb-leading"><Icon name={icon} size="m" /></span>}
        {depth === 3 && <span className="snb-tree" aria-hidden />}
        <span className="snb-label">{label}</span>
        {expandable && <span className="snb-trailing"><Icon name="chevron_down" size="m" /></span>}
      </button>
      {leaf && <button className="snb-favorite" data-visible={showFavorite} data-starred={starred || undefined}
        aria-label={starred ? '즐겨찾기 해제' : '즐겨찾기 추가'} aria-pressed={starred}
        onClick={() => onStar?.(!starred)}><Icon name="star" size="m" style={{ color: 'inherit' }} /></button>}
    </div>
  )
}

function CollapsedItem({ item, activeId, onActiveChange }) {
  const hover = useHoverMenu()
  const hasChildren = Boolean(item.children?.length)
  const selectedPath = item.id === activeId || item.children?.some((child) => contains(child, activeId))
  const trigger = <IconButton icon={item.icon ?? 'dashboard'} size="xlarge" variant="ghost"
    iconSize="l" className="snb-collapsed-item" data-state={selectedPath ? 'selected' : 'enabled'}
    aria-label={item.label} onPointerEnter={hasChildren ? hover.openMenu : undefined}
    onPointerLeave={hasChildren ? hover.closeLater : undefined}
    onClick={!hasChildren ? () => onActiveChange(item.id) : undefined} />

  if (!hasChildren) return <Tooltip><TooltipTrigger asChild>{trigger}</TooltipTrigger>
    <TooltipContent side="right">{item.label}</TooltipContent></Tooltip>

  return <Menu open={hover.open} modal={false} onOpenChange={hover.handleOpenChange}>
    <MenuTrigger asChild>{trigger}</MenuTrigger>
    <MenuContent side="right" align="start" sideOffset={8} size="large" className="snb-menu"
      onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater}>
      <MenuSectionHeader>{item.label}</MenuSectionHeader>
      <CollapsedMenuItems items={item.children} activeId={activeId} />
    </MenuContent>
  </Menu>
}

export function SNB({ sections, favorites, collapsed, onCollapsedChange, activeId, onActiveChange }: SNBProps) {
  const [openIds, setOpenIds] = useState<readonly string[]>([])
  const [favoritesExpanded, setFavoritesExpanded] = useState(false)
  const isCollapsed = collapsed ?? false
  const toggle = (id: string) => setOpenIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])

  if (isCollapsed) return <aside className="snb snb--collapsed" aria-label="Side navigation">
    <CollapsedHeader onExpand={() => onCollapsedChange?.(false)} />
    <ScrollArea type="always" orientation="vertical" className="snb-collapsed-scroll">
      <nav className="snb-collapsed-groups" aria-label="Collapsed navigation">
        {favorites && <CollapsedFavoritesMenu favorites={favorites} activeId={activeId} onActiveChange={onActiveChange} />}
        {sections.map((section) => <CollapsedGroup key={section.id} section={section}
          activeId={activeId} onActiveChange={onActiveChange} />)}
      </nav>
    </ScrollArea>
  </aside>

  return <aside className="snb" aria-label="Side navigation">
    <ExpandedHeader onCollapse={() => onCollapsedChange?.(true)} />
    <ScrollArea type="always" orientation="vertical" className="snb-scroll">
      <nav className="snb-nav" aria-label="Expanded navigation">
        {favorites && <FavoritesSection favorites={favorites} expanded={favoritesExpanded}
          onExpandedChange={setFavoritesExpanded} activeId={activeId} onActiveChange={onActiveChange} />}
        {sections.map((section) => <Section key={section.id} section={section} activeId={activeId}
          openIds={openIds} onToggle={toggle} onActiveChange={onActiveChange} />)}
      </nav>
    </ScrollArea>
  </aside>
}
```

`MenuSub`도 root popup과 같은 handoff를 적용한다. submenu를 기본 Menu theme로 두거나, pointer
event를 연결하지 않으면 3depth로 이동할 때 다시 흰색으로 보이거나 close/open을 반복한다.

```tsx
<MenuSub>
  <MenuSubTrigger
    data-snb-ancestor-selected={hasSelectedDescendant || undefined}
    onPointerEnter={hover.openMenu}
  >
    {twoDepth.label}
  </MenuSubTrigger>
  <MenuSubContent
    className="snb-menu"
    size="small"
    onPointerEnter={hover.openMenu}
    onPointerLeave={hover.closeLater}
  >
    {threeDepthItems}
  </MenuSubContent>
</MenuSub>
```

### 12.2 고정 DOM 및 portal 적용 예시

이 DOM의 순서는 overflow, header border, section gap, scroll track 위치를 결정한다. `aside`를
흰색 wrapper로 한 번 더 감싸거나, `ScrollArea`를 각 section마다 만들지 않는다.

```tsx
<aside
  className={cn('snb', collapsed && 'snb--collapsed')}
  aria-label="Side navigation"
>
  {collapsed ? (
    <>
      <header className="snb-collapsed-header">
        <img className="snb-collapsed-logo" src={compactSymbol} alt="Aifrica Functions" />
        <IconButton className="snb-toggle" icon="chevrons_right" iconColor="inherit" />
        <Separator className="snb-collapsed-header__separator" />
      </header>
      <ScrollArea className="snb-collapsed-scroll" contentClassName="scroll-content" type="always">
        <nav className="snb-collapsed-groups" aria-label="Collapsed navigation">...</nav>
      </ScrollArea>
    </>
  ) : (
    <>
      <header className="snb-expanded-header" data-scrolled={hasUserScrolled || undefined}>
        <div className="snb-expanded-logo">
          <img className="snb-expanded-logo__symbol" src={symbol} alt="" aria-hidden />
          <img className="snb-expanded-logo__wordmark" src={wordmark} alt="Aifrica" />
          <img className="snb-expanded-logo__subtitle" src={subtitle} alt="Functions" />
        </div>
        <IconButton className="snb-toggle" icon="chevrons_left" iconColor="inherit" />
      </header>
      <ScrollArea className="snb-scroll" contentClassName="scroll-content" type="always">
        <nav className="snb-nav" aria-label="Expanded navigation">...</nav>
      </ScrollArea>
    </>
  )}
</aside>

{/* Radix portal content. snb-menu를 root와 submenu 양쪽에 부여한다. */}
<MenuContent className="snb-menu" side="right" sideOffset={8} align="start">...</MenuContent>
<MenuSubContent className="snb-menu" side="right" sideOffset={8}>...</MenuSubContent>
```
