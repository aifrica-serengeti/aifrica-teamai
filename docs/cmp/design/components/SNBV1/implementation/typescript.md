# SNB v1 — TypeScript와 React 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v1 문서 인덱스](../README.md)

## 구현 입력과 public dependency adapter

아래 `SNB.tsx`는 이 문서 안에 모든 내부 helper·controlled/default state·재귀 조립을 정의한다.
제품 source의 `ExpandedSNBMenu`, `CollapsedSNBMenu`, private hook을 열람할 필요가 없다.
외부 입력은 [공통 registry의 leaf 문서](../definition.md)에 따라 구현한 public component,
[CSS](./css.md), [제품 token adapter](../styles.md), `brand` 자산·접근 가능한 이름뿐이다.
이 문서는 실행 package를 배포하거나 실제 제품 구현·브라우저 검증을 보증하지 않는다.

`@components/*`는 leaf 문서로 만든 public module의 역할 alias다. 다음 `dependencies.ts`로
문서의 역할 이름을 실제 공통 예제의 export에 연결한다. 특히 `MenuSectionHeader`·`MenuDivider`는
별도 primitive가 아니라 `DropdownMenuLabel`·`DropdownMenuSeparator`의 alias다.

```ts
// dependencies.ts — public module 위치만 소비 프로젝트에서 매핑한다.
export { Icon } from '@components/Icon'
export { IconButton } from '@components/IconButton'
export { ScrollArea } from '@components/Scrollbar'
export type { ScrollAreaScrollMetrics } from '@components/Scrollbar'
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@components/Tooltip'
export {
  DropdownMenu as Menu,
  DropdownMenuTrigger as MenuTrigger,
  DropdownMenuContent as MenuContent,
  DropdownMenuLabel as MenuSectionHeader,
  DropdownMenuItem as MenuItem,
  DropdownMenuSub as MenuSub,
  DropdownMenuSubTrigger as MenuSubTrigger,
  DropdownMenuSubContent as MenuSubContent,
} from '@components/Menu'
```

공용 `IconButtonProps`에는 `iconColor`가 없다. 이 예제는 공용 버튼의 native event·disabled·ref·
keyboard 의미를 재사용하고 `.snb-icon-inherit`의 좁은 CSS adapter로 내부 Icon의 inline 기본 색만
상속으로 바꾼다. 이 adapter와 [computed-style gate](./css.md)는 함께 적용한다.
`ScrollArea`는 `onScrollMetricsChange`의 `scrollTop`으로 divider를 계산하며 private DOM selector나
존재하지 않는 user-scroll callback을 요구하지 않는다.

## 완전한 내부 조립: `SNB.tsx`

```tsx
import * as React from 'react'
import {
  Icon, IconButton, ScrollArea, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent,
  Menu, MenuTrigger, MenuContent, MenuSectionHeader, MenuItem,
  MenuSub, MenuSubTrigger, MenuSubContent,
  type ScrollAreaScrollMetrics,
} from './dependencies'
import './SNB.css'

type SystemIconName = React.ComponentProps<typeof Icon>['name']
type Depth = 1 | 2 | 3

export interface SNBItemData {
  id: string
  label: string
  icon?: SystemIconName
  children?: readonly SNBItemData[]
  starred?: boolean
  disabled?: boolean
}
export interface SNBSectionData { id: string; title?: string; items: readonly SNBItemData[] }
export interface SNBFavoriteItemData {
  id: string; label: string; icon?: SystemIconName; disabled?: boolean
}
export interface SNBFavoritesData { title?: string; items: readonly SNBFavoriteItemData[] }
export interface SNBV1BrandAssets {
  symbol: string; wordmark: string; subtitle: string; compactSymbol: string
  expandedLabel: string; compactLabel: string
}
export interface SNBProps {
  brand: SNBV1BrandAssets
  sections: readonly SNBSectionData[]
  favorites?: SNBFavoritesData
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  openIds?: readonly string[]
  defaultOpenIds?: readonly string[]
  onOpenIdsChange?: (ids: readonly string[]) => void
  activeId?: string
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}

function itemContainsId(item: SNBItemData, id?: string): boolean {
  return id !== undefined && (item.id === id || Boolean(item.children?.some((child) => itemContainsId(child, id))))
}
function initialStarredIds(sections: readonly SNBSectionData[]) {
  const ids = new Set<string>()
  const visit = (item: SNBItemData) => {
    if (item.children?.length) item.children.forEach(visit)
    else if (item.starred) ids.add(item.id)
  }
  sections.forEach((section) => section.items.forEach(visit))
  return ids
}
function validateSections(sections: readonly SNBSectionData[]) {
  const ids = new Set<string>()
  const visit = (item: SNBItemData, depth: number) => {
    if (ids.has(item.id) || depth > 3) throw new Error('SNB items require unique ids and at most three depths')
    ids.add(item.id)
    item.children?.forEach((child) => visit(child, depth + 1))
  }
  sections.forEach((section) => section.items.forEach((item) => visit(item, 1)))
}
function useHoverMenu() {
  const [open, setOpen] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancel = () => { if (timer.current !== null) clearTimeout(timer.current); timer.current = null }
  const openMenu = () => { cancel(); setOpen(true) }
  const closeLater = () => { cancel(); timer.current = setTimeout(() => setOpen(false), 250) }
  React.useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current) }, [])
  return { open, openMenu, closeLater, onOpenChange: (next: boolean) => {
    if (next) openMenu()
    else { cancel(); setOpen(false) } // Escape·선택·바깥 클릭은 즉시 닫는다. pointer handoff만 지연한다.
  } }
}

interface SNBItemProps {
  depth: Depth; label: string; icon?: SystemIconName; expandable?: boolean; expanded?: boolean
  selected?: boolean; current?: boolean; starred?: boolean; disabled?: boolean; panelId?: string
  showFavoriteControl?: boolean; onSelect: () => void; onStar?: () => void
}
function SNBItem({ depth, label, icon, expandable = false, expanded = false, selected = false,
  current = false, starred = false, disabled = false, panelId, showFavoriteControl = true,
  onSelect, onStar }: SNBItemProps) {
  const [hovered, setHovered] = React.useState(false)
  const canFavorite = !expandable && showFavoriteControl
  const showFavorite = canFavorite && (hovered || starred || selected)
  return <div className="snb-item-root" data-state={selected ? 'selected' : 'enabled'}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <button type="button" className="snb-item" data-depth={depth}
      data-state={selected ? 'selected' : 'enabled'} data-expanded={expandable ? expanded : undefined}
      data-has-favorite={canFavorite || undefined} disabled={disabled}
      aria-current={current ? 'page' : undefined}
      aria-expanded={expandable ? expanded : undefined} aria-controls={expandable ? panelId : undefined}
      onClick={onSelect}>
      {depth === 1 && icon ? <span className="snb-leading"><Icon name={icon} size="m" style={{ color: 'inherit' }} aria-hidden /></span> : null}
      {depth === 3 ? <span className="snb-tree" aria-hidden /> : null}
      <span className="snb-label">{label}</span>
      {expandable ? <span className="snb-trailing"><Icon name="chevron_down" size="m" aria-hidden
        style={{ color: 'inherit', transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s ease' }} /></span> : null}
    </button>
    {canFavorite ? <button type="button" className="snb-favorite" data-visible={showFavorite}
      data-starred={starred || undefined} disabled={disabled} aria-pressed={starred}
      aria-label={`${label} ${starred ? '즐겨찾기 해제' : '즐겨찾기 추가'}`} onClick={onStar}>
      <Icon name="star" size="m" style={{ color: 'inherit' }} aria-hidden />
    </button> : null}
  </div>
}
interface ExpandedItemProps {
  item: SNBItemData; depth: Depth; visible: boolean; activeId?: string; openIds: readonly string[]
  starredIds: ReadonlySet<string>; onToggle: (id: string) => void; onSelect: (id: string) => void
  onStar: (id: string) => void
}
function ExpandedItem({ item, depth, visible, activeId, openIds, starredIds, onToggle, onSelect, onStar }: ExpandedItemProps) {
  const panelId = React.useId()
  const hasChildren = Boolean(item.children?.length)
  const expanded = hasChildren && openIds.includes(item.id)
  const currentLeaf = visible && !hasChildren && activeId === item.id
  const hiddenActive = visible && hasChildren && !expanded && Boolean(item.children?.some((child) => itemContainsId(child, activeId)))
  return <div className="snb-item-node">
    <SNBItem depth={depth} label={item.label} icon={item.icon} disabled={item.disabled}
      expandable={hasChildren} expanded={expanded} panelId={panelId} selected={currentLeaf || hiddenActive}
      current={currentLeaf} starred={starredIds.has(item.id)} onStar={() => onStar(item.id)}
      onSelect={() => hasChildren ? onToggle(item.id) : onSelect(item.id)} />
    {hasChildren ? <div id={panelId} className="snb-panel" data-open={expanded}
      role="group" aria-label={item.label} aria-hidden={!expanded} inert={!expanded}>
      <div className={`snb-panel__inner${depth === 1 ? ' snb-panel__inner--from-depth-1' : ''}`}>
        {item.children?.map((child) => <ExpandedItem key={child.id} item={child} depth={depth === 1 ? 2 : 3}
          visible={visible && expanded} activeId={activeId} openIds={openIds} starredIds={starredIds}
          onToggle={onToggle} onSelect={onSelect} onStar={onStar} />)}
      </div>
    </div> : null}
  </div>
}
function FavoriteShortcut({ item, activeId, onSelect }: {
  item: SNBFavoriteItemData; activeId?: string; onSelect: (id: string) => void
}) {
  return <SNBItem depth={1} label={item.label} icon={item.icon} disabled={item.disabled}
    selected={activeId === item.id} current={activeId === item.id} showFavoriteControl={false}
    onSelect={() => onSelect(item.id)} />
}
function FavoritesSection({ favorites, activeId, onSelect, expanded, onExpandedChange }: {
  favorites: SNBFavoritesData; activeId?: string; onSelect: (id: string) => void
  expanded: boolean; onExpandedChange: (next: boolean) => void
}) {
  const titleId = React.useId()
  const panelId = React.useId()
  return <section className="snb-section" aria-labelledby={titleId}>
    <p className="snb-section-title" id={titleId}>{favorites.title ?? '즐겨찾기'}</p>
    <div className="snb-section-items">{favorites.items.slice(0, 3).map((item) =>
      <FavoriteShortcut key={item.id} item={item} activeId={activeId} onSelect={onSelect} />)}</div>
    {favorites.items.length > 3 ? <>
      <div id={panelId} className="snb-panel" data-open={expanded} aria-hidden={!expanded} inert={!expanded}>
        <div className="snb-panel__inner snb-panel__inner--favorites">{favorites.items.slice(3).map((item) =>
          <FavoriteShortcut key={item.id} item={item} activeId={activeId} onSelect={onSelect} />)}</div>
      </div>
      <button type="button" className="snb-favorites-toggle" aria-expanded={expanded} aria-controls={panelId}
        aria-label={expanded ? '즐겨찾기 접기' : '즐겨찾기 더 보기'} onClick={() => onExpandedChange(!expanded)}>
        <Icon name={expanded ? 'chevrons_up' : 'more_horizontal'} size="s" style={{ color: 'inherit' }} aria-hidden />
      </button>
    </> : null}
  </section>
}
function CollapsedMenuBranch({ item, activeId, onSelect }: {
  item: SNBItemData; activeId?: string; onSelect: (id: string) => void
}) {
  const hover = useHoverMenu()
  return <MenuSub open={hover.open} onOpenChange={hover.onOpenChange}>
    <MenuSubTrigger disabled={item.disabled} data-snb-ancestor-selected={itemContainsId(item, activeId) || undefined}
      onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater}>{item.label}</MenuSubTrigger>
    <MenuSubContent className="snb-menu snb-theme" size="small" sideOffset={8}
      onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater}>
      <CollapsedMenuItems items={item.children ?? []} activeId={activeId} onSelect={onSelect} />
    </MenuSubContent>
  </MenuSub>
}
function CollapsedMenuItems({ items, activeId, onSelect }: {
  items: readonly SNBItemData[]; activeId?: string; onSelect: (id: string) => void
}) {
  return <>{items.map((item) => item.children?.length ?
    <CollapsedMenuBranch key={item.id} item={item} activeId={activeId} onSelect={onSelect} /> :
    <MenuItem key={item.id} disabled={item.disabled} selected={activeId === item.id}
      onSelect={() => onSelect(item.id)}>{item.label}</MenuItem>)}</>
}
function CollapsedItem({ item, activeId, onSelect }: {
  item: SNBItemData; activeId?: string; onSelect: (id: string) => void
}) {
  const hover = useHoverMenu()
  const hasChildren = Boolean(item.children?.length)
  const trigger = <IconButton icon={item.icon ?? 'dashboard'} size="xlarge" variant="ghost" iconSize="m"
    className="snb-collapsed-item snb-icon-inherit" data-state={itemContainsId(item, activeId) ? 'selected' : 'enabled'}
    disabled={item.disabled} aria-label={item.label} aria-current={!hasChildren && activeId === item.id ? 'page' : undefined}
    onPointerEnter={hasChildren ? hover.openMenu : undefined} onPointerLeave={hasChildren ? hover.closeLater : undefined}
    onClick={hasChildren ? undefined : () => onSelect(item.id)} />
  if (!hasChildren) return <Tooltip><TooltipTrigger asChild>{trigger}</TooltipTrigger>
    <TooltipContent side="right">{item.label}</TooltipContent></Tooltip>
  return <Menu open={hover.open} modal={false} onOpenChange={hover.onOpenChange}>
    <MenuTrigger asChild>{trigger}</MenuTrigger>
    <MenuContent className="snb-menu snb-theme" side="right" align="start" sideOffset={8} size="large"
      onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater}>
      <MenuSectionHeader>{item.label}</MenuSectionHeader>
      <CollapsedMenuItems items={item.children ?? []} activeId={activeId} onSelect={onSelect} />
    </MenuContent>
  </Menu>
}
function CollapsedFavoritesMenu({ favorites, activeId, onSelect }: {
  favorites: SNBFavoritesData; activeId?: string; onSelect: (id: string) => void
}) {
  const hover = useHoverMenu()
  return <Menu open={hover.open} modal={false} onOpenChange={hover.onOpenChange}>
    <MenuTrigger asChild><IconButton icon="star" size="xlarge" variant="ghost" iconSize="m"
      className="snb-collapsed-item snb-icon-inherit" aria-label={favorites.title ?? '즐겨찾기'}
      data-state={favorites.items.some((item) => item.id === activeId) ? 'selected' : 'enabled'}
      onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater} /></MenuTrigger>
    <MenuContent className="snb-menu snb-theme snb-menu--favorites" side="right" align="start" sideOffset={8}
      size="large" scrollable={favorites.items.length > 5} onPointerEnter={hover.openMenu} onPointerLeave={hover.closeLater}>
      <MenuSectionHeader>{favorites.title ?? '즐겨찾기'}</MenuSectionHeader>
      {favorites.items.map((item) => <MenuItem key={item.id} disabled={item.disabled} selected={activeId === item.id}
        onSelect={() => onSelect(item.id)}>{item.label}</MenuItem>)}
    </MenuContent>
  </Menu>
}
function Brand({ brand, collapsed }: { brand: SNBV1BrandAssets; collapsed: boolean }) {
  if (collapsed) return <img className="snb-collapsed-logo" src={brand.compactSymbol} alt={brand.compactLabel} />
  return <div className="snb-expanded-logo">
    <img className="snb-expanded-logo__symbol" src={brand.symbol} alt="" aria-hidden />
    <img className="snb-expanded-logo__wordmark" src={brand.wordmark} alt={brand.expandedLabel} />
    <img className="snb-expanded-logo__subtitle" src={brand.subtitle} alt="" aria-hidden />
  </div>
}

export function SNB({ brand, sections, favorites, collapsed, defaultCollapsed = false, onCollapsedChange,
  openIds, defaultOpenIds = [], onOpenIdsChange, activeId, defaultActiveId, onActiveChange, className }: SNBProps) {
  React.useMemo(() => validateSections(sections), [sections])
  const [localCollapsed, setLocalCollapsed] = React.useState(defaultCollapsed)
  const [localOpenIds, setLocalOpenIds] = React.useState<readonly string[]>(defaultOpenIds)
  const [localActiveId, setLocalActiveId] = React.useState(defaultActiveId)
  const [starredIds, setStarredIds] = React.useState<ReadonlySet<string>>(() => initialStarredIds(sections))
  const [hasUserScrolled, setHasUserScrolled] = React.useState(false)
  const [favoritesExpanded, setFavoritesExpanded] = React.useState(false)
  const isCollapsed = collapsed ?? localCollapsed
  const resolvedOpenIds = openIds ?? localOpenIds
  const resolvedActiveId = activeId ?? localActiveId
  React.useEffect(() => setHasUserScrolled(false), [isCollapsed])
  const updateBoundary = React.useCallback((metrics: ScrollAreaScrollMetrics) => setHasUserScrolled(metrics.scrollTop > 0), [])
  const setCollapsed = (next: boolean) => {
    setHasUserScrolled(false)
    if (collapsed === undefined) setLocalCollapsed(next)
    onCollapsedChange?.(next)
  }
  const toggleOpen = (id: string) => {
    const next = resolvedOpenIds.includes(id) ? resolvedOpenIds.filter((value) => value !== id) : [...resolvedOpenIds, id]
    if (openIds === undefined) setLocalOpenIds(next)
    onOpenIdsChange?.(next)
  }
  const select = (id: string) => { if (activeId === undefined) setLocalActiveId(id); onActiveChange?.(id) }
  const toggleStar = (id: string) => setStarredIds((current) => {
    const next = new Set(current)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })
  return <TooltipProvider delayDuration={300}>
    <aside className={['snb', 'snb-theme', isCollapsed ? 'snb--collapsed' : '', className].filter(Boolean).join(' ')}
      aria-label="Side navigation">
      {isCollapsed ? <>
        <header className="snb-collapsed-header"><Brand brand={brand} collapsed />
          <IconButton className="snb-toggle snb-icon-inherit" icon="chevrons_right" size="medium" variant="outlined"
            iconSize="s" aria-label="Side navigation 펼치기" aria-expanded={false} onClick={() => setCollapsed(false)} />
          <span className="snb-collapsed-header__separator" aria-hidden />
        </header>
        <ScrollArea key="collapsed-scroll" className="snb-collapsed-scroll" contentClassName="scroll-content" type="always">
          <nav className="snb-collapsed-groups" aria-label="Collapsed navigation">
            {favorites ? <><div className="snb-collapsed-group"><CollapsedFavoritesMenu favorites={favorites}
              activeId={resolvedActiveId} onSelect={select} /></div><span className="snb-collapsed-divider" aria-hidden /></> : null}
            {sections.map((section, index) => <div key={section.id} className="snb-collapsed-group">
              {index > 0 ? <span className="snb-collapsed-divider" aria-hidden /> : null}
              {section.items.map((item) => <CollapsedItem key={item.id} item={item} activeId={resolvedActiveId} onSelect={select} />)}
            </div>)}
          </nav>
        </ScrollArea>
      </> : <>
        <header className="snb-expanded-header" data-scrolled={hasUserScrolled || undefined}>
          <Brand brand={brand} collapsed={false} />
          <IconButton className="snb-toggle snb-icon-inherit" icon="chevrons_left" size="medium" variant="outlined"
            iconSize="s" aria-label="Side navigation 접기" aria-expanded={true} onClick={() => setCollapsed(true)} />
        </header>
        <ScrollArea key="expanded-scroll" className="snb-scroll" contentClassName="scroll-content" type="always"
          onScrollMetricsChange={updateBoundary}>
          <nav className="snb-nav" aria-label="Expanded navigation">
            {favorites ? <FavoritesSection favorites={favorites} activeId={resolvedActiveId} onSelect={select}
              expanded={favoritesExpanded} onExpandedChange={setFavoritesExpanded} /> : null}
            {sections.map((section) => <section className="snb-section" key={section.id} aria-label={section.title}>
              {section.title ? <p className="snb-section-title">{section.title}</p> : null}
              <div className="snb-section-items">{section.items.map((item) => <ExpandedItem key={item.id} item={item}
                depth={1} visible activeId={resolvedActiveId} openIds={resolvedOpenIds} starredIds={starredIds}
                onToggle={toggleOpen} onSelect={select} onStar={toggleStar} />)}</div>
            </section>)}
          </nav>
        </ScrollArea>
      </>}
    </aside>
  </TooltipProvider>
}
```

## CSS와 검증 연결

`SNB.css`는 [12.1 adapter CSS](./css.md)와 그 문서의 primitive 호환·normal-flow 보완 블록을
함께 포함한다. `.snb-theme`의 token을 aside와 모든 portal content에 적용한다.
[reference fixture](./reference.md)를 먼저 사용하고 [computed-style gate](./css.md)로 mount·선택색·
색 상속·root identity를 검사한다. source 코드나 다른 제품의 구현 경로는 입력이 아니다.

`starred`는 leaf의 초기 표시 상태이며 `favorites.items`는 제품이 주입한 별도 shortcut 목록이다.
별표를 누른다고 별도 목록을 임의 수정하거나 API를 호출하지 않는다. 제품에서 영속화가 필요하면
그 공개 callback 계약을 명시적으로 확장한다. controlled/default 상태, disabled, branch/leaf와
keyboard·Escape·focus 복원은 [검증 matrix](../verification.md)를 실제 브라우저에서 확인한다.
