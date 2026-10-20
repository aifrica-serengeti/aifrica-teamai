# Action bar — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`ActionBar.tsx`)

```tsx
import * as React from 'react'
import { Slot } from 'radix-ui'
import { cn } from './utils' // clsx + tailwind-merge
import {
  actionBar,
  leadingContainer,
  actionsContainer,
  actionGroup,
  countText,
  actionBarDivider,
  dividerLine,
  action,
  iconButton,
} from './ActionBar.css'

/** 시각 상태. 'active' 는 Icon button 전용(pressed 와 동일 시각). */
export type ActionBarState =
  | 'enabled' | 'hovered' | 'pressed' | 'focused' | 'disabled' | 'active'

function ActionBarRoot({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn(actionBar, className)} {...props}>
      {children}
    </div>
  )
}

function ActionBarLeading({
  count, icon, className, children, ...props
}: React.ComponentProps<'div'> & {
  count?: string           // "N개 선택됨"
  icon?: React.ReactNode   // <ActionBar.IconButton />
}) {
  return (
    <div className={cn(leadingContainer, className)} {...props}>
      {icon}
      {count ? <span className={countText}>{count}</span> : null}
      {children}
    </div>
  )
}

function ActionBarActions({ className, children, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn(actionsContainer, className)} {...props}>{children}</div>
}

function ActionBarGroup({ className, children, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn(actionGroup, className)} {...props}>{children}</div>
}

function ActionBarAction({
  className, state = 'enabled', asChild = false, children, disabled, ...props
}: React.ComponentProps<'button'> & {
  state?: ActionBarState
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : 'button'
  const isDisabled = disabled || state === 'disabled'
  return (
    <Comp
      data-slot="action-bar-action"
      data-state={state}
      type={asChild ? undefined : 'button'}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled || undefined}
      className={cn(action, className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

function ActionBarIconButton({
  className, state = 'enabled', asChild = false, children, disabled,
  'aria-label': ariaLabel, ...props
}: React.ComponentProps<'button'> & {
  state?: ActionBarState
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : 'button'
  const isDisabled = disabled || state === 'disabled'
  return (
    <Comp
      data-slot="action-bar-icon-button"
      data-state={state}
      type={asChild ? undefined : 'button'}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-label={ariaLabel}
      className={cn(iconButton, className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

function ActionBarDivider({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn(actionBarDivider, className)} role="separator"
      aria-orientation="vertical" {...props}>
      <span className={dividerLine} />
    </div>
  )
}

/* Compound 조립 */
export const ActionBar = Object.assign(ActionBarRoot, {
  Leading: ActionBarLeading,
  Actions: ActionBarActions,
  Group: ActionBarGroup,
  Action: ActionBarAction,
  IconButton: ActionBarIconButton,
  Divider: ActionBarDivider,
})
```

