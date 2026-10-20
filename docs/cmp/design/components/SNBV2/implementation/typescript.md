# SNB v2 — TypeScript와 React 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v2 문서 인덱스](../README.md)

## 구현 내용

### SNBV2.tsx

~~~~tsx
import {
  Fragment,
  cloneElement,
  useCallback,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react'

import { cn } from '@design/cn'
import { IconButton } from '@components/IconButton'
import { Icon, type SystemIconName } from '@components/Icon'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSectionHeader,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from './dependencies'
import {
  ScrollArea,
  type ScrollAreaScrollMetrics,
} from '@components/Scrollbar'
import { useHoverMenu } from '@design/useHoverMenu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/Tooltip'
import { snbV2SystemIconByName } from './data/snb-v2-icon.data'
import {
  accountOverflow,
  accountTrigger,
  activeIndicator,
  branch,
  branchChildren,
  branchChildrenContent,
  collapsedDivider,
  collapsedSubmenuContent,
  depth2ActiveIndicator,
  depth2Row,
  depth3ActiveIndicator,
  depth3Row,
  expandIcon,
  item,
  itemIcon,
  itemLabel,
  itemRow,
  logo,
  menuScrollArea,
  menuScrollFrame,
  menuScrollContent,
  nestedItem,
  navigation,
  onlineBadge,
  root,
  section,
  sectionTitle,
  userAvatar,
  userContainer,
  userEmail,
  userName,
  userSummary,
  userText,
  utilityContainer,
  utilitySection,
  footer,
  header,
  headerContainer,
} from './SNBV2.css'

export type SNBV2IconName = keyof typeof snbV2SystemIconByName

export interface SNBV2ItemData {
  id: string
  label: string
  /** 2·3 depth 항목은 재현 잠금 계약에 따라 leading icon을 생략한다. */
  icon?: SNBV2IconName | SystemIconName
  /** 최대 3 depth까지 지원하는 재귀 메뉴 구조. */
  children?: readonly SNBV2ItemData[]
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

export interface SNBV2Props extends Omit<ComponentProps<'aside'>, 'children'> {
  sections: readonly SNBV2SectionData[]
  utilityItems?: readonly SNBV2ItemData[]
  activeId?: string
  /** Global Header v2와 부모 application shell이 함께 소유하는 controlled state. */
  collapsed?: boolean
  onActiveChange?: (id: string) => void
  /** 부모가 펼침 상태를 제어할 때 사용하는 1·2 depth id 목록. */
  expandedIds?: readonly string[]
  /** 비제어 사용 시 처음 펼쳐 둘 1·2 depth id 목록. */
  defaultExpandedIds?: readonly string[]
  onExpandedChange?: (expandedIds: readonly string[]) => void
  user?: SNBV2User
  renderBrand?: (collapsed: boolean) => ReactNode
  renderUtilityTrigger?: (item: SNBV2ItemData, trigger: ReactElement) => ReactNode
  renderUserMenu?: (trigger: ReactElement) => ReactNode
  userMenuLabel?: string
}

type SNBV2Depth = 1 | 2 | 3
type MenuScrollBoundary = 'none' | 'top' | 'middle' | 'bottom'

interface SNBV2ItemProps {
  item: SNBV2ItemData
  activeId?: string
  collapsed: boolean
  depth: SNBV2Depth
  expandedIds: ReadonlySet<string>
  onSelect?: (id: string) => void
  onToggleExpanded?: (id: string) => void
  renderTrigger?: (item: SNBV2ItemData, trigger: ReactElement) => ReactNode
}

function isSnbV2IconName(icon: string): icon is SNBV2IconName {
  return Object.hasOwn(snbV2SystemIconByName, icon)
}

function resolveIcon(icon?: SNBV2ItemData['icon']): SystemIconName {
  if (!icon) return 'circle'
  return isSnbV2IconName(icon) ? snbV2SystemIconByName[icon] : icon
}

function hasChildren(itemData: SNBV2ItemData): itemData is SNBV2ItemData & {
  children: readonly SNBV2ItemData[]
} {
  return (itemData.children?.length ?? 0) > 0
}

function containsActiveItem(itemData: SNBV2ItemData, activeId?: string): boolean {
  if (!activeId) return false
  return itemData.id === activeId || itemData.children?.some((child) => containsActiveItem(child, activeId)) === true
}

interface CollapsedMenuItemsProps {
  items: readonly SNBV2ItemData[]
  activeId?: string
  onSelect?: (id: string) => void
  onPointerEnter: () => void
  onPointerLeave: () => void
}

/** SNB v1과 동일하게 collapsed rail의 2·3depth는 Menu/MenuSub로 탐색한다. */
function CollapsedMenuItems({
  items,
  activeId,
  onSelect,
  onPointerEnter,
  onPointerLeave,
}: CollapsedMenuItemsProps) {
  return items.map((itemData) => {
    if (hasChildren(itemData)) {
      const hasSelectedDescendant = itemData.id !== activeId && containsActiveItem(itemData, activeId)

      return (
        <MenuSub key={itemData.id}>
          <MenuSubTrigger
            disabled={itemData.disabled}
            data-snb-v2-ancestor-selected={hasSelectedDescendant || undefined}
            onPointerEnter={onPointerEnter}
          >
            {itemData.label}
          </MenuSubTrigger>
          <MenuSubContent
            className={collapsedSubmenuContent}
            size="small"
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
          >
            <CollapsedMenuItems
              items={itemData.children}
              activeId={activeId}
              onSelect={onSelect}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            />
          </MenuSubContent>
        </MenuSub>
      )
    }

    return (
      <MenuItem
        key={itemData.id}
        disabled={itemData.disabled}
        selected={activeId === itemData.id}
        onSelect={() => onSelect?.(itemData.id)}
      >
        {itemData.label}
      </MenuItem>
    )
  })
}

function SNBV2Item({
  item: itemData,
  activeId,
  collapsed,
  depth,
  expandedIds,
  onSelect,
  onToggleExpanded,
  renderTrigger,
}: SNBV2ItemProps) {
  const itemHasChildren = hasChildren(itemData)
  const canExpand = itemHasChildren && depth < 3
  const collapsedMenuEnabled = collapsed && depth === 1 && canExpand && !itemData.disabled
  const hoverMenu = useHoverMenu()
  const isExpanded = canExpand && !collapsed && expandedIds.has(itemData.id)
  const isCurrent = activeId === itemData.id
  const hasActiveDescendant = itemHasChildren
    && !isCurrent
    && containsActiveItem(itemData, activeId)
  /*
   * 펼침 가능한 1·2 depth는 메뉴 이동이 아닌 disclosure control이다.
   * 활성 상태는 실제 이동 가능한 leaf에만 귀속되므로, parent를 닫아도
   * 이미 선택된 하위 메뉴의 activeId는 변경하지 않는다.
   */
  const selected = !canExpand && isCurrent
  /* 축소 rail에서는 현재 선택된 leaf의 1depth 경로만 visual selected로 표시한다. */
  const visualSelected = selected || (collapsed && itemHasChildren && containsActiveItem(itemData, activeId))
  /* MenuTrigger가 collapsed branch의 aria-expanded를 소유하도록 prop 자체를 생략한다. */
  const expandedAriaProps = canExpand && !collapsedMenuEnabled ? { 'aria-expanded': isExpanded } : {}

  const activateItem = () => {
    if (canExpand) {
      /* Parent는 순수 disclosure control: navigation selection을 바꾸지 않는다. */
      onToggleExpanded?.(itemData.id)
      return
    }
    onSelect?.(itemData.id)
  }

  const button = (
    <button
      type="button"
      className={depth === 1 ? item : nestedItem}
      data-selected={visualSelected}
      data-has-active-descendant={hasActiveDescendant || undefined}
      aria-current={isCurrent && selected ? 'page' : undefined}
      aria-label={collapsed && depth === 1 ? itemData.label : undefined}
      {...expandedAriaProps}
      disabled={itemData.disabled}
      onClick={collapsedMenuEnabled ? undefined : activateItem}
      onPointerEnter={collapsedMenuEnabled ? hoverMenu.openMenu : undefined}
      onPointerLeave={collapsedMenuEnabled ? hoverMenu.scheduleClose : undefined}
    >
      {depth === 1 && itemData.icon ? (
        <Icon
          className={itemIcon}
          name={resolveIcon(itemData.icon)}
          size="m"
          style={{ color: 'currentColor' }}
          aria-hidden
        />
      ) : null}
      <span className={itemLabel}>{itemData.label}</span>
      {canExpand ? (
        <Icon
          className={expandIcon}
          data-expanded={isExpanded}
          name="chevron_right"
          size="m"
          style={{ color: 'currentColor' }}
          aria-hidden
        />
      ) : null}
    </button>
  )

  // 제품 utility slot만 native leaf trigger를 감싼다. branch/일반 navigation에는 적용하지 않는다.
  // Popover asChild와 합성되어도 패널 열림과 route 이동이 동시에 일어나지 않는다.
  // slot이 원래 trigger만 반환하면 아래의 원본 button으로 돌아가 기존 선택 동작을 유지한다.
  const slotButton = renderTrigger && !canExpand ? cloneElement(button, { onClick: undefined }) : button
  const customTrigger = !canExpand ? renderTrigger?.(itemData, slotButton) : undefined
  const leafTrigger = customTrigger && customTrigger !== slotButton ? customTrigger : undefined

  const row = depth === 1 ? (
    <div className={itemRow} data-selected={visualSelected}>
      <span className={activeIndicator} aria-hidden />
      {collapsedMenuEnabled ? (
        <Menu
          open={hoverMenu.open}
          /* Hover trigger와 portal menu 사이의 pointer 이동을 허용한다. */
          modal={false}
          onOpenChange={hoverMenu.handleOpenChange}
        >
          <MenuTrigger asChild>{button}</MenuTrigger>
          <MenuContent
            side="right"
            align="start"
            sideOffset={8}
            size="large"
            className={collapsedSubmenuContent}
            aria-label={`${itemData.label} 하위 메뉴`}
            onPointerEnter={hoverMenu.openMenu}
            onPointerLeave={hoverMenu.scheduleClose}
          >
            <MenuSectionHeader>{itemData.label}</MenuSectionHeader>
            <CollapsedMenuItems
              items={itemData.children}
              activeId={activeId}
              onSelect={onSelect}
              onPointerEnter={hoverMenu.openMenu}
              onPointerLeave={hoverMenu.scheduleClose}
            />
          </MenuContent>
        </Menu>
      ) : leafTrigger ? leafTrigger : collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">{itemData.label}</TooltipContent>
        </Tooltip>
      ) : button}
    </div>
  ) : depth === 2 ? (
    <div className={depth2Row} data-selected={visualSelected}>
      <span className={depth2ActiveIndicator} aria-hidden />
      {button}
    </div>
  ) : (
    <div className={depth3Row} data-selected={visualSelected}>
      <span className={depth3ActiveIndicator} aria-hidden />
      {button}
    </div>
  )

  if (!canExpand) return row

  const childDepth = (depth + 1) as SNBV2Depth

  return (
    <div className={branch} data-open={isExpanded}>
      {row}
      <div
        className={branchChildren}
        data-depth={depth}
        data-open={isExpanded}
        role="group"
        aria-label={`${itemData.label} 하위 메뉴`}
        aria-hidden={!isExpanded}
        inert={!isExpanded}
      >
        <div className={branchChildrenContent}>
          {itemData.children.map((child) => (
            <SNBV2Item
              key={child.id}
              item={child}
              activeId={activeId}
              collapsed={collapsed}
              depth={childDepth}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SNBV2Section({
  section: sectionData,
  activeId,
  collapsed,
  expandedIds,
  onActiveChange,
  onToggleExpanded,
  utility = false,
  renderTrigger,
}: {
  section: SNBV2SectionData
  activeId?: string
  collapsed: boolean
  expandedIds: ReadonlySet<string>
  onActiveChange?: (id: string) => void
  onToggleExpanded?: (id: string) => void
  utility?: boolean
  renderTrigger?: (item: SNBV2ItemData, trigger: ReactElement) => ReactNode
}) {
  const className = utility ? utilitySection : section

  return (
    <section className={className} aria-label={sectionData.title}>
      {sectionData.title ? <h2 className={sectionTitle}>{sectionData.title}</h2> : null}
      {sectionData.items.map((itemData) => (
        <SNBV2Item
          key={itemData.id}
          item={itemData}
          activeId={activeId}
          collapsed={collapsed}
          depth={1}
          expandedIds={expandedIds}
          onSelect={onActiveChange}
          onToggleExpanded={onToggleExpanded}
          renderTrigger={utility ? renderTrigger : undefined}
        />
      ))}
    </section>
  )
}

/** Closed SNB v2 has a 36px divider before each 1-depth group. */
function SNBV2CollapsedDivider() {
  return <div className={collapsedDivider} aria-hidden />
}

/**
 * SNB v2 — portable canonical expanded/collapsed implementation.
 *
 * Expanded state is pixel-matched to the supplied frame: 240px semantic navigation shell,
 * 32px items, r4 default/r6 selected item, and 4×24px active indicator. The
 * collapsed state is its own 60px rail layout: 32px logo/targets, 36px dividers,
 * a 2px in-item active anchor, and an absolute 82px account footer.
 * `collapsed` is controlled by the parent so Global Header v2 can share one
 * source of truth without SNB owning duplicate layout state.
 */
export function SNBV2({
  sections,
  utilityItems = [],
  activeId,
  collapsed = false,
  onActiveChange,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  user,
  renderBrand,
  renderUtilityTrigger,
  renderUserMenu,
  userMenuLabel = '계정 메뉴',
  className,
  ...props
}: SNBV2Props) {
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = useState<readonly string[]>(defaultExpandedIds)
  const [menuScrollBoundary, setMenuScrollBoundary] = useState<MenuScrollBoundary>('none')
  const currentExpandedIds = expandedIds ?? uncontrolledExpandedIds
  const expandedIdSet = new Set(currentExpandedIds)

  const handleMenuScrollMetricsChange = useCallback((metrics: ScrollAreaScrollMetrics) => {
    const maximum = metrics.scrollHeight - metrics.clientHeight
    const nextBoundary: MenuScrollBoundary = maximum <= 0
      ? 'none'
      : metrics.scrollTop <= 0
        ? 'top'
        : metrics.scrollTop >= maximum - 1
          ? 'bottom'
          : 'middle'

    setMenuScrollBoundary((current) => current === nextBoundary ? current : nextBoundary)
  }, [])

  const toggleExpanded = (itemId: string) => {
    const nextExpandedIds = currentExpandedIds.includes(itemId)
      ? currentExpandedIds.filter((id) => id !== itemId)
      : [...currentExpandedIds, itemId]

    if (expandedIds === undefined) setUncontrolledExpandedIds(nextExpandedIds)
    onExpandedChange?.(nextExpandedIds)
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(root, className)}
        data-collapsed={collapsed}
        aria-label="Side navigation"
        {...props}
      >
        <div
          className={headerContainer}
          data-collapsed={collapsed}
          data-scroll-boundary={menuScrollBoundary}
        >
          <div className={header}>
            <div className={logo}>
              {renderBrand?.(collapsed)}
            </div>
          </div>
        </div>

        <nav className={navigation} aria-label="Primary navigation">
          <div className={menuScrollFrame} data-scroll-boundary={menuScrollBoundary}>
            <ScrollArea
              className={menuScrollArea}
              contentClassName={menuScrollContent}
              type="auto"
              onScrollMetricsChange={handleMenuScrollMetricsChange}
            >
              {sections.map((sectionData, sectionIndex) => (
                <Fragment key={sectionData.id}>
                  {/* 첫 섹션 앞에는 divider를 두지 않는다. */}
                  {collapsed && sectionIndex > 0 ? <SNBV2CollapsedDivider /> : null}
                  <SNBV2Section
                    section={sectionData}
                    activeId={activeId}
                    collapsed={collapsed}
                    expandedIds={expandedIdSet}
                    onActiveChange={onActiveChange}
                    onToggleExpanded={toggleExpanded}
                  />
                </Fragment>
              ))}
            </ScrollArea>
          </div>
        </nav>

        {utilityItems.length > 0 ? (
          <div className={utilityContainer}>
            <SNBV2Section
              section={{ id: 'utility', items: utilityItems }}
              activeId={activeId}
              collapsed={collapsed}
              expandedIds={expandedIdSet}
              onActiveChange={onActiveChange}
              onToggleExpanded={toggleExpanded}
              utility
              renderTrigger={renderUtilityTrigger}
            />
          </div>
        ) : null}

        {user ? (
          <footer className={footer}>
            <div className={userContainer}>
              <div className={userSummary}>
                {collapsed && renderUserMenu ? renderUserMenu(
                  <button type="button" className={accountTrigger} aria-label={userMenuLabel}>
                    <span className={userAvatar} aria-hidden>
                      {user.initials}
                      <span className={onlineBadge} />
                    </span>
                  </button>
                ) : (
                  <div className={userAvatar} aria-label={`${user.name} avatar`}>
                    {user.initials}
                    <span className={onlineBadge} role="img" aria-label="온라인" />
                  </div>
                )}
                <div className={userText}>
                  <p className={userName}>{user.name}</p>
                  <p className={userEmail}>{user.email}</p>
                </div>
              </div>
              {!collapsed && (renderUserMenu ? renderUserMenu(
                <IconButton className={accountOverflow} icon="more_vertical" iconSize="m"
                  size="medium" variant="ghost" aria-label={userMenuLabel} />
              ) : (
                <IconButton className={accountOverflow} icon="more_vertical" iconSize="m"
                  size="medium" variant="ghost" aria-label={userMenuLabel} />
              ))}
            </div>
          </footer>
        ) : null}
      </aside>
    </TooltipProvider>
  )
}
~~~~

### data/snb-v2-icon.data.ts

~~~~ts
import type { SystemIconName } from '@components/Icon'

/** SNBV2 의미 아이콘을 공용 Icon registry의 glyph로 연결한다. */
export const snbV2SystemIconByName = {
  dashboard: 'dashboard',
  monitoring: 'desktop',
  'usage-monitoring': 'desktop_code',
  reports: 'manual',
  workspace: 'table',
  workflow: 'branch',
  'job-scheduling': 'calendar_clock',
  schedule: 'schedule',
  'model-agent': 'cpu',
  dataset: 'database',
  volume: 'volume',
  annotation: 'edit',
  'user-image': 'doc_code',
  'service-management': 'briefcase_business',
  software: 'app_window',
  'cloud-resources': 'cloud',
  settings: 'settings',
  support: 'support',
  notification: 'bell',
} as const satisfies Readonly<Record<string, SystemIconName>>
~~~~

### dependencies.ts

~~~~ts
// 공용 문서의 실제 DropdownMenu* export를 SNB 내부의 Menu* 역할 이름으로 연결한다.
export {
  DropdownMenu as Menu,
  DropdownMenuTrigger as MenuTrigger,
  DropdownMenuContent as MenuContent,
  DropdownMenuItem as MenuItem,
  DropdownMenuLabel as MenuSectionHeader,
  DropdownMenuSub as MenuSub,
  DropdownMenuSubTrigger as MenuSubTrigger,
  DropdownMenuSubContent as MenuSubContent,
} from '@components/Menu'

/**
 * SNB v2의 실제 재사용 의존성 등록부.
 *
 * - 목록 overflow와 overlay scrollbar는 ScrollArea에 위임한다.
 * - 축소 상태의 leaf 이름 보충은 Tooltip에 위임하고, child가 있는 icon은
 *   Menu/MenuSub와 공용 useHoverMenu로 2·3depth popup 탐색을 제공한다.
 * - Footer의 overflow action은 IconButton을 그대로 사용한다.
 * - 1·2 depth branch의 chevron은 공용 Icon을 사용한다.
 *
 * 모든 navigation·utility·chevron glyph는 공용 Icon을 사용한다. 브랜드 이미지만
 * 별도 brand slot에 렌더하며, 새 환경에서는 같은 geometry의 임시 브랜드로 바꿀 수 있다.
 * Avatar는 원형 공용 Avatar와 달리 10px radius라 SNB 전용 account summary로 유지한다.
 */
export const SNB_V2_DEPENDENCIES = [
  'IconButton',
  'Icon',
  'ScrollArea',
  'Tooltip',
  'Menu',
] as const
~~~~

### useHoverMenu.ts

~~~~ts
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Trigger와 portal menu 사이를 이동하는 동안 열림 상태를 유지하는 공용 hover-menu 제어기.
 *
 * SNB v1·v2의 collapsed rail처럼, 아이콘에서 우측 popup으로 포인터를 옮길 때
 * 즉시 닫히지 않도록 짧은 close delay를 둔다. 클릭/키보드로 Menu가 상태를 바꿀 때도
 * `onOpenChange`를 통해 같은 state를 사용한다.
 */
export function useHoverMenu(closeDelay = 250) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelScheduledClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const openMenu = useCallback(() => {
    cancelScheduledClose()
    setOpen(true)
  }, [cancelScheduledClose])

  const scheduleClose = useCallback(() => {
    cancelScheduledClose()
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      closeTimer.current = null
    }, closeDelay)
  }, [cancelScheduledClose, closeDelay])

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    cancelScheduledClose()
    setOpen(nextOpen)
  }, [cancelScheduledClose])

  useEffect(() => cancelScheduledClose, [cancelScheduledClose])

  return { open, openMenu, scheduleClose, handleOpenChange }
}
~~~~

## 제품 통합 확장

`renderUtilityTrigger`·`renderUserMenu`·`renderBrand`는 위 portable source에 포함했다.
제품의 API·계정·브랜드 입력만 주입하고 navigation의 branch/leaf·popup 상태 계산을 변경하지 않는다.
slot은 전달된 native trigger의 props/ref를 유지하며 button을 중첩하지 않는다.
custom slot에 전달하는 trigger는 route onClick을 제거한 사본이다. 감싸지 않고 trigger를 그대로
반환하면 원본 선택 button으로 되돌아가 기존 onActiveChange 동작을 유지한다.
브랜드 자산이 없으면 동일 geometry의 빈 slot을 유지하고 임의 제품명·로고를 기본값으로 넣지 않는다.
`user`를 제공하지 않으면 footer를 렌더하지 않는다. 위 snapshot은 consuming repository의 구현 증거가 아니다.

### Utility popover 연결

```tsx
import { Popover as PopoverPrimitive } from 'radix-ui'

<SNBV2
  sections={sections}
  utilityItems={utilityItems}
  onActiveChange={onNavigate}
  renderUtilityTrigger={(item, trigger) => item.id === 'notification' ? (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content side="right" sideOffset={8} aria-label="알림">
          <p>알림</p>
          <button type="button" onClick={() => onNavigate(item.id)}>알림 페이지로 이동</button>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  ) : trigger}
/>
```

이 예제는 공용 Menu와 같은 `radix-ui` 패키지의 Popover primitive를 사용하며 공용 Popover
컴포넌트가 있다고 가정하지 않는다. 설치 버전과 제품의 popup 스타일·token scope를 확인한다.
utility native trigger는 패널만 열고 명시적 이동 button만 onNavigate를 호출한다.
렌더 함수 안에서 API를 호출하지 않는다.


## 계정 메뉴 슬롯 연결

```tsx
<SNBV2 sections={sections} user={user} userMenuLabel="계정 메뉴" renderUserMenu={(trigger) => (
  <Menu>
    <MenuTrigger asChild>{trigger}</MenuTrigger>
    <MenuContent side="top" align="end" size="medium">
      <MenuItem onSelect={onLogout}>로그아웃</MenuItem>
    </MenuContent>
  </Menu>
)} />
```

API 호출과 인증 상태는 onLogout을 전달하는 앱이 소유한다.
