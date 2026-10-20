# Global Header v1 — TypeScript와 React 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v1 문서 인덱스](../README.md)

## 구현 내용

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

const DEFAULT_ACCOUNT: Required<GlobalHeaderV1Account> = {
  initials: 'A',
  name: 'Administrator',
  color: 'indigo',
  email: 'administrator@example.com',
  roleLabel: '관리자',
}

export function GlobalHeaderV1({
  breadcrumbs,
  searchValue,
  defaultSearchValue,
  searchPlaceholder = '메뉴 검색',
  onSearchChange,
  onSearchClear,
  hasUnreadNotifications = true,
  onNotificationClick,
  onHelpClick,
  onMoreClick,
  account = DEFAULT_ACCOUNT,
  onAccountClick,
  onLogoutClick,
  onChatbotClick,
  ...headerProps
}: GlobalHeaderV1Props) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const resolvedAccount = { ...DEFAULT_ACCOUNT, ...account }

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
    <header className={styles.root} {...headerProps}>
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

        <Menu open={isAccountMenuOpen} onOpenChange={handleAccountMenuOpenChange}>
          <MenuTrigger asChild>
            <button type="button" className={styles.accountButton}
              aria-label={`${resolvedAccount.name} 계정 메뉴 열기`}>
              <Avatar color={resolvedAccount.color} size="24">{resolvedAccount.initials}</Avatar>
              <span className={styles.accountName}>{resolvedAccount.name}</span>
              <Icon className={styles.accountChevron} name="chevron_down" size="s" aria-hidden />
            </button>
          </MenuTrigger>
          <MenuContent align="end" sideOffset={8} size="large" scrollable={false}
            className={styles.accountMenuContent}>
            <div className={styles.accountMenuProfile}>
              <Avatar color={resolvedAccount.color} size="36">{resolvedAccount.initials}</Avatar>
              <div className={styles.accountMenuIdentity}>
                <div className={styles.accountMenuNameRow}>
                  <span className={styles.accountMenuName}>{resolvedAccount.name}</span>
                  {resolvedAccount.roleLabel ? <Chip color="gray" size="small">{resolvedAccount.roleLabel}</Chip> : null}
                </div>
                {resolvedAccount.email ? <span className={styles.accountMenuEmail}>{resolvedAccount.email}</span> : null}
              </div>
            </div>
            <MenuDivider />
            <MenuItem leading={<Icon name="out" size="m" aria-hidden />}
              onSelect={() => onLogoutClick?.()}>로그아웃</MenuItem>
            <MenuItem leading={<Icon name="help" size="m" aria-hidden />}
              onSelect={() => onChatbotClick?.()}>챗봇 열기</MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </header>
  )
}
```

