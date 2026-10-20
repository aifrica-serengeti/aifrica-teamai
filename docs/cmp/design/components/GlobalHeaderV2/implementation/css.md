# Global Header v2 — CSS와 스타일 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

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

export const screen = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
  backgroundColor: 'var(--surface-primary-subtle)',
  fontFamily: 'var(--font-sans)',
  transition: 'background-color 0.2s ease',
})

export const appContainer = style({
  display: 'flex',
  height: 'calc(100% - 8px)',
  minWidth: 0,
  minHeight: 0,
  flex: '1 1 0',
  flexDirection: 'column',
  marginTop: '8px',
  overflow: 'hidden',
  borderTopLeftRadius: '14px',
  backgroundColor: 'var(--surface-shell)',
  transition: 'background-color 0.2s ease',
})

export const globalHeader = style({
  flexShrink: 0,
})
export const appContent = style({ minWidth: 0, minHeight: 0, flex: '1 1 auto', overflow: 'hidden' })
```

