# Global Header v2 — CSS와 스타일 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v2 문서 인덱스](../README.md)

## 구현 내용

### `GlobalHeaderV2.css.ts`

```ts
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  width: '100%',
  height: '48px',
  minWidth: 0,
  alignItems: 'center',
  gap: '8px',
  boxSizing: 'border-box',
  paddingInline: '24px',
  overflow: 'hidden',
  borderBottom: '1px solid var(--border-default)',
  backgroundColor: 'var(--surface-shell)',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  '@media': {
    'screen and (max-width: 599px)': { paddingInline: '16px' },
  },
})

export const snbToggle = style({
  selectors: {
    '&&': { width: '28px', height: '28px' },
  },
})

export const divider = style({
  flexShrink: 0,
  alignSelf: 'center',
  selectors: {
    '&&[data-orientation="vertical"]': { height: '12px' },
  },
})

export const breadcrumbSlot = style({
  minWidth: 0,
  flex: '1 1 auto',
})
```

### `ApplicationShell.css.ts`

아래 조립 CSS는 Header가 SNB 위까지 늘어나지 않도록 보장한다. Radius와 clip은 `appContainer`가
소유하고 Header는 그 내부 첫 행으로만 배치한다.

```ts
import { style } from '@vanilla-extract/css'

import { vars } from '@design/tokens'

export const screen = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  minWidth: 0,
  overflow: 'hidden',
  backgroundColor: vars.color.surface.primarySubtle,
  fontFamily: vars.font.sans,
  transition: 'background-color 0.2s ease',
})

export const appContainer = style({
  display: 'flex',
  height: 'calc(100% - 8px)',
  minWidth: 0,
  flex: '1 1 0',
  flexDirection: 'column',
  marginTop: '8px',
  overflow: 'hidden',
  borderTopLeftRadius: '14px',
  backgroundColor: vars.color.surface.shell,
  transition: 'background-color 0.2s ease',
})

export const globalHeader = style({
  flexShrink: 0,
})
```

