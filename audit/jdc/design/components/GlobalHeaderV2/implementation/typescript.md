# Global Header v2 — TypeScript와 React 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](../README.md)

## 구현 내용

### `GlobalHeaderV2.tsx`

```tsx
import type { ComponentProps } from 'react'

import { cn } from './cn'
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
    <header className={cn(root, className)} {...props}>
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
import { useState } from 'react'

import { GlobalHeaderV2 } from './GlobalHeaderV2'
import {
  SNBV2,
  type SNBV2ItemData,
  type SNBV2SectionData,
} from './SNBV2'
import { appContainer, globalHeader, screen } from './ApplicationShell.css'

interface ApplicationShellProps {
  sections: readonly SNBV2SectionData[]
  utilityItems?: readonly SNBV2ItemData[]
}

export function ApplicationShell({ sections, utilityItems }: ApplicationShellProps) {
  const [snbCollapsed, setSnbCollapsed] = useState(false)
  const [activeId, setActiveId] = useState('model-agent')

  return (
    <div className={screen}>
      <SNBV2
        id="primary-snb"
        sections={sections}
        utilityItems={utilityItems}
        activeId={activeId}
        collapsed={snbCollapsed}
        onActiveChange={setActiveId}
      />

      <div className={appContainer}>
        <GlobalHeaderV2
          className={globalHeader}
          breadcrumbs={[{ label: '모델/에이전트', current: true }]}
          snbCollapsed={snbCollapsed}
          snbId="primary-snb"
          onSnbCollapsedChange={setSnbCollapsed}
        />
      </div>
    </div>
  )
}
```

