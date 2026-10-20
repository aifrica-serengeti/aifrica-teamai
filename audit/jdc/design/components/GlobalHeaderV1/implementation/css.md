# Global Header v1 — CSS와 스타일 구현

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← Global Header v1 문서 인덱스](../README.md)

## 구현 내용

### vanilla-extract 스타일 (`GlobalHeaderV1.css.ts`)

```ts
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  width: '100%', minHeight: '56px', paddingInline: '32px', gap: '24px', overflow: 'hidden',
  backgroundColor: 'var(--surface-shell)', borderBottom: '1px solid var(--border-default)',
  fontFamily: 'var(--font-sans)',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  '@media': { 'screen and (max-width: 899px)': { paddingInline: '16px', gap: '16px' } },
})
export const breadcrumbSlot = style({ flex: '1 1 0', minWidth: 0 })
export const utilityArea = style({
  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '0 1 auto', minWidth: 0, gap: '24px',
  '@media': { 'screen and (max-width: 899px)': { gap: '16px' } },
})
export const searchSlot = style({
  width: '400px', minWidth: '240px', flex: '0 1 400px',
  '@media': {
    'screen and (max-width: 899px)': { width: '280px', flexBasis: '280px', minWidth: '180px' },
    'screen and (max-width: 679px)': { display: 'none' },
  },
})
export const actionGroup = style({ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 })
export const notificationAction = style({ position: 'relative', display: 'inline-flex' })
export const notificationBadge = style({ position: 'absolute', top: '2px', left: '24px', zIndex: 1, pointerEvents: 'none' })

export const accountButton = style({
  display: 'inline-flex', alignItems: 'center', width: 'auto', minWidth: '156px', minHeight: '36px',
  padding: '6px 10px', gap: '8px', flexShrink: 0, border: 0, borderRadius: '8px',
  backgroundColor: 'transparent', color: 'var(--text)', cursor: 'pointer', fontFamily: 'var(--font-sans)',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': { backgroundColor: 'var(--surface-hover)' },
    '&:active:not(:disabled)': { backgroundColor: 'var(--surface-pressed)' },
    '&[data-state="open"]': { backgroundColor: 'var(--surface-pressed)' },
    '&:focus-visible': { outline: '1px solid var(--border-primary)', outlineOffset: '1px' },
    '&:disabled': { color: 'var(--text-disabled)', cursor: 'not-allowed' },
  },
  '@media': { 'screen and (max-width: 519px)': { width: '44px', minWidth: '44px', padding: '6px 10px' } },
})
export const accountName = style({
  flex: '0 0 auto', color: 'inherit', fontSize: '14px', fontWeight: 400, lineHeight: '20px',
  textAlign: 'left', whiteSpace: 'nowrap', transition: 'color 0.2s ease',
  '@media': { 'screen and (max-width: 519px)': { display: 'none' } },
})
export const accountChevron = style({
  flexShrink: 0, color: 'var(--icon)', transition: 'color 0.2s ease',
  selectors: { [`${accountButton}[data-state="open"] > &`]: { transform: 'rotate(180deg)' } },
  '@media': { 'screen and (max-width: 519px)': { display: 'none' } },
})

export const accountMenuContent = style({
  selectors: { '&&': { width: '216px', minWidth: '216px', maxWidth: 'calc(100vw - 16px)', padding: 0 } },
})
export const accountMenuProfile = style({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' })
export const accountMenuIdentity = style({ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 })
export const accountMenuNameRow = style({ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 })
export const accountMenuName = style({
  color: 'var(--text)', fontSize: '14px', fontWeight: 400, lineHeight: '20px', whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
})
export const accountMenuEmail = style({
  color: 'var(--text-subtler)', fontSize: '12px', fontWeight: 400, lineHeight: '16px', whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
})
```

---

