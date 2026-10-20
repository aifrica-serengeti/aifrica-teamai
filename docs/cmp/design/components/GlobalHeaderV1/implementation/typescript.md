# Global Header v1 — TypeScript와 React 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← Global Header v1 문서 인덱스](../README.md)

## 구현 내용

계정 데이터는 제품이 `account`로 전달한다. 계정이 없으면 계정 메뉴를 렌더하지 않으며
기본 관리자·이메일·미확인 알림을 만들지 않는다. 색은 [스타일 역할](../styles.md)의 semantic token을 따른다.
제공된 상대 import는 제품의 검증된 public export로 연결한다.

### Public dependency adapter (`design-system-components.ts`)

`@components/*`는 공통 registry leaf 문서로 구현한 public module의 역할 alias다. 제품 private source는
입력이 아니다. Menu의 문서 역할 이름을 현재 예제의 실제 export 이름에 다음처럼 연결한다.

```ts
export { Avatar } from '@components/Avatar'
export { Badge } from '@components/Badge'
export { Breadcrumb } from '@components/Breadcrumb'
export { Chip } from '@components/Chip'
export { Icon } from '@components/Icon'
export { IconButton } from '@components/IconButton'
export { Search } from '@components/Search'
export {
  DropdownMenu as Menu,
  DropdownMenuTrigger as MenuTrigger,
  DropdownMenuContent as MenuContent,
  DropdownMenuSeparator as MenuDivider,
  DropdownMenuItem as MenuItem,
} from '@components/Menu'
```

이 adapter와 아래 React·[CSS](./css.md)가 조립에 필요한 전체 로컬 module이다.
Avatar는 친화적 `Avatar.tsx` wrapper를 사용한다. primitive root만 재export하면 color/size API가 없다.
Search의 `onChange`는 input event, `onClear`는 추가 callback이므로 아래 handler에서 문자열 API로
명시적으로 변환한다.

### React (`GlobalHeaderV1.tsx`)

```tsx
import { useState, type ChangeEvent, type ComponentProps } from 'react'
import {
  Avatar, Badge, Breadcrumb, Chip, Icon, IconButton,
  Menu, MenuContent, MenuDivider, MenuItem, MenuTrigger, Search,
} from './design-system-components'
import * as styles from './GlobalHeaderV1.css'

export interface GlobalHeaderV1Account {
  initials?: string
  name: string
  color?: 'indigo' | 'primary' | 'green' | 'cyan' | 'purple' | 'fuchsia' | 'gray'
  email?: string
  roleLabel?: string
}

export interface GlobalHeaderV1Props
  extends Omit<ComponentProps<'header'>, 'children' | 'onChange'> {
  breadcrumbs?: Array<{ label: string; href?: string; current?: boolean }>
  searchValue?: string
  defaultSearchValue?: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  onSearchClear?: () => void
  hasUnreadNotifications?: boolean
  onNotificationClick?: () => void
  onHelpClick?: () => void
  onMoreClick?: () => void
  account?: GlobalHeaderV1Account
  onAccountClick?: () => void
  onLogoutClick?: () => void
  onChatbotClick?: () => void
}

export function GlobalHeaderV1({
  className,
  breadcrumbs,
  searchValue,
  defaultSearchValue,
  searchPlaceholder = '메뉴 검색',
  onSearchChange,
  onSearchClear,
  hasUnreadNotifications = false,
  onNotificationClick,
  onHelpClick,
  onMoreClick,
  account,
  onAccountClick,
  onLogoutClick,
  onChatbotClick,
  ...headerProps
}: GlobalHeaderV1Props) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.currentTarget.value)
  }
  const handleSearchClear = () => {
    onSearchChange?.('')
    onSearchClear?.()
  }
  const handleAccountMenuOpenChange = (open: boolean) => {
    setIsAccountMenuOpen(open)
    if (open) onAccountClick?.()
  }

  return (
    <header className={[styles.root, className].filter(Boolean).join(' ')} {...headerProps}>
      {breadcrumbs?.length ? (
        <div className={styles.breadcrumbSlot}>
          <Breadcrumb items={breadcrumbs} />
        </div>
      ) : null}

      <div className={styles.utilityArea}>
        <div className={styles.searchSlot}>
          <Search
            aria-label="메뉴 검색"
            size="large"
            placeholder={searchPlaceholder}
            value={searchValue}
            defaultValue={searchValue === undefined ? defaultSearchValue : undefined}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
        </div>

        <nav className={styles.actionGroup} aria-label="전역 작업">
          <span className={styles.notificationAction}>
            <IconButton icon="bell" size="xlarge" variant="ghost"
              aria-label="알림 열기" onClick={onNotificationClick} />
            {hasUnreadNotifications ? (
              <Badge className={styles.notificationBadge} variant="dot" />
            ) : null}
          </span>
          <IconButton icon="help" size="xlarge" variant="ghost"
            aria-label="도움말 열기" onClick={onHelpClick} />
          <IconButton icon="more_horizontal" size="xlarge" variant="ghost"
            aria-label="추가 메뉴 열기" onClick={onMoreClick} />
        </nav>

        {account ? <Menu open={isAccountMenuOpen} onOpenChange={handleAccountMenuOpenChange}>
          <MenuTrigger asChild>
            <button type="button" className={styles.accountButton}
              aria-label={`${account.name} 계정 메뉴 열기`}>
              <Avatar color={account.color} size="24">{account.initials}</Avatar>
              <span className={styles.accountName}>{account.name}</span>
              <Icon className={styles.accountChevron} name="chevron_down" size="s" aria-hidden />
            </button>
          </MenuTrigger>
          <MenuContent align="end" sideOffset={8} size="large" scrollable={false}
            className={styles.accountMenuContent}>
            <div className={styles.accountMenuProfile}>
              <Avatar color={account.color} size="36">{account.initials}</Avatar>
              <div className={styles.accountMenuIdentity}>
                <div className={styles.accountMenuNameRow}>
                  <span className={styles.accountMenuName}>{account.name}</span>
                  {account.roleLabel ? <Chip color="gray" size="small">{account.roleLabel}</Chip> : null}
                </div>
                {account.email ? <span className={styles.accountMenuEmail}>{account.email}</span> : null}
              </div>
            </div>
            <MenuDivider />
            <MenuItem leading={<Icon name="out" size="m" aria-hidden />}
              onSelect={() => onLogoutClick?.()}>로그아웃</MenuItem>
            <MenuItem leading={<Icon name="help" size="m" aria-hidden />}
              onSelect={() => onChatbotClick?.()}>챗봇 열기</MenuItem>
          </MenuContent>
        </Menu> : null}
      </div>
    </header>
  )
}
```

