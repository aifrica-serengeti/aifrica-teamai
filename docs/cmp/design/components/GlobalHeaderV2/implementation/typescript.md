# Global Header v2 — TypeScript와 React 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← Global Header v2 문서 인덱스](../README.md)

## 구현 내용

`./Breadcrumb`, `./Divider`, `./IconButton`은 각각 공통 registry의 public module 역할이다.
Breadcrumb은 [공개 API](../definition.md)의 `BreadcrumbItemData`와 items 모드를, Divider는 padding을
소유하는 친화적 wrapper를 사용한다. Separator primitive만으로 바꾸지 않는다.
`@components/*` 역할 alias를 사용한다면 아래 세 줄로 상대 module을 만들 수 있다.

```ts
// Breadcrumb.ts
export { Breadcrumb } from '@components/Breadcrumb'
export type { BreadcrumbItemData } from '@components/Breadcrumb'
// Divider.ts
export { Divider } from '@components/Divider'
// IconButton.ts
export { IconButton } from '@components/IconButton'
```

`SNBV2`는 CMP의 SNBV2 구현 인덱스에서 제공하는 module이며 제품 private source를 가져오지 않는다.
그 module의 내부 helper·metrics adapter까지 함께 전달한다. 별도 class 병합 helper는 필요하지 않다.

### `GlobalHeaderV2.tsx`

```tsx
import type { ComponentProps } from 'react'

import { Breadcrumb, type BreadcrumbItemData } from './Breadcrumb'
import { Divider } from './Divider'
import { IconButton } from './IconButton'
import { breadcrumbSlot, divider, root, snbToggle } from './GlobalHeaderV2.css'

export interface GlobalHeaderV2Props
  extends Omit<ComponentProps<'header'>, 'children'> {
  breadcrumbs?: BreadcrumbItemData[]
  snbCollapsed?: boolean
  snbId?: string
  onSnbCollapsedChange?: (collapsed: boolean) => void
}

export function GlobalHeaderV2({
  className,
  breadcrumbs,
  snbCollapsed,
  snbId,
  onSnbCollapsedChange,
  ...props
}: GlobalHeaderV2Props) {
  const isSnbCollapsed = snbCollapsed ?? false

  return (
    <header className={[root, className].filter(Boolean).join(' ')} {...props}>
      <IconButton
        className={snbToggle}
        icon="sidebar"
        iconSize="m"
        size="medium"
        variant="ghost"
        aria-label={isSnbCollapsed ? '사이드 내비게이션 펼치기' : '사이드 내비게이션 접기'}
        aria-controls={snbId}
        aria-expanded={!isSnbCollapsed}
        onClick={() => onSnbCollapsedChange?.(!isSnbCollapsed)}
      />
      <Divider className={divider} orientation="vertical" />
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <div className={breadcrumbSlot}>
          <Breadcrumb items={breadcrumbs} />
        </div>
      ) : null}
    </header>
  )
}
```

### `ApplicationShell.tsx`

```tsx
import { useState, type ReactNode, type ComponentProps } from 'react'

import { GlobalHeaderV2, type GlobalHeaderV2Props } from './GlobalHeaderV2'
import {
  SNBV2,
  type SNBV2ItemData,
  type SNBV2SectionData,
} from './SNBV2'
import { appContainer, appContent, globalHeader, screen } from './ApplicationShell.css'

interface ApplicationShellProps {
  sections: readonly SNBV2SectionData[]
  utilityItems?: readonly SNBV2ItemData[]
  initialActiveId?: string
  breadcrumbs: NonNullable<GlobalHeaderV2Props['breadcrumbs']>
  renderBrand?: ComponentProps<typeof SNBV2>['renderBrand']
  children?: ReactNode
}

export function ApplicationShell({ sections, utilityItems, initialActiveId, breadcrumbs, renderBrand, children }: ApplicationShellProps) {
  const [snbCollapsed, setSnbCollapsed] = useState(false)
  const [activeId, setActiveId] = useState<string | undefined>(initialActiveId)

  return (
    <div className={screen}>
      <SNBV2
        id="primary-snb"
        sections={sections}
        utilityItems={utilityItems}
        renderBrand={renderBrand}
        activeId={activeId}
        collapsed={snbCollapsed}
        onActiveChange={setActiveId}
      />

      <div className={appContainer}>
        <GlobalHeaderV2
          className={globalHeader}
          breadcrumbs={breadcrumbs}
          snbCollapsed={snbCollapsed}
          snbId="primary-snb"
          onSnbCollapsedChange={setSnbCollapsed}
        />
        <main className={appContent}>{children}</main>
      </div>
    </div>
  )
}
```

