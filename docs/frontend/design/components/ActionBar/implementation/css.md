# Action bar — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Action bar 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`ActionBar.css.ts`)

```ts
import { style, globalStyle } from '@vanilla-extract/css'

/* ============================================================
 * ActionBar 컨테이너
 * ============================================================ */
export const actionBar = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '24px',
  height: '48px',
  paddingInline: '12px',
  borderRadius: '4px',
  background: 'var(--surface-inverse)',
  /* Figma "Mid" elevation: 2단 그림자 */
  boxShadow:
    '0 0 0 1px rgba(9, 30, 66, 0.31), 0 4px 6px 0 rgba(9, 30, 66, 0.15)',
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
})

export const leadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
})

export const actionsContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
})

export const actionGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  flexShrink: 0,
})

export const countText = style({
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '20px',
  color: 'var(--text-inverse)',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
})

/* ============================================================
 * Divider — 내부 세로 구분선 (1px, h16, 좌우 px8)
 * ============================================================ */
export const actionBarDivider = style({
  display: 'flex',
  alignItems: 'center',
  height: '16px',
  paddingInline: '8px',
  flexShrink: 0,
})

export const dividerLine = style({
  width: '1px',
  height: '100%',
  background: 'var(--border-inverse)',
  transition: 'background-color 0.2s ease',
})

/* ============================================================
 * Action — 텍스트 버튼 (inverse 컬러)
 * ============================================================ */
export const action = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  height: '32px',
  paddingInline: '16px',
  paddingBlock: '4px',
  borderRadius: '4px',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '20px',
  color: 'var(--text-inverse)',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
  border: 'none',
  background: 'transparent',
  flexShrink: 0,
  transition:
    'background-color 0.2s ease, color 0.2s ease, outline-color 0.2s ease',
  selectors: {
    /* 정적 상태(data-state) — 스펙 시트 전시용 */
    '&[data-state="hovered"]': { background: 'var(--action-inverse-hover)' },
    '&[data-state="pressed"], &[data-state="active"]': {
      background: 'var(--action-inverse-pressed)',
    },
    /* 동적 상태 — 실제 마우스/키보드 조작 */
    '&:hover:not(:disabled)': { background: 'var(--action-inverse-hover)' },
    '&:active:not(:disabled)': { background: 'var(--action-inverse-pressed)' },
    '&[data-state="disabled"]': {
      color: 'var(--text-disabled-bold)',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    /* Focus — 1px outline + 1px offset */
    '&[data-state="focused"]': {
      outline: '1px solid var(--border-primary)',
      outlineOffset: '1px',
    },
    '&:focus-visible': {
      outline: '1px solid var(--border-primary)',
      outlineOffset: '1px',
    },
    '&::-moz-focus-inner': { border: 0 },
  },
})

/* ============================================================
 * IconButton — 아이콘 정사각 버튼 (inverse 컬러)
 * ============================================================ */
export const iconButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  paddingInline: '6px',
  paddingBlock: '4px',
  borderRadius: '4px',
  color: 'var(--icon-inverse)',
  cursor: 'pointer',
  userSelect: 'none',
  border: 'none',
  background: 'transparent',
  flexShrink: 0,
  transition:
    'background-color 0.2s ease, color 0.2s ease, outline-color 0.2s ease',
  selectors: {
    '&[data-state="hovered"]': { background: 'var(--action-inverse-hover)' },
    '&[data-state="pressed"], &[data-state="active"]': {
      background: 'var(--action-inverse-pressed)',
    },
    '&:hover:not(:disabled)': { background: 'var(--action-inverse-hover)' },
    '&:active:not(:disabled)': { background: 'var(--action-inverse-pressed)' },
    '&[data-state="disabled"]': {
      color: 'var(--icon-disabled)',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&[data-state="focused"]': {
      outline: '1px solid var(--border-primary)',
      outlineOffset: '1px',
    },
    '&:focus-visible': {
      outline: '1px solid var(--border-primary)',
      outlineOffset: '1px',
    },
    '&::-moz-focus-inner': { border: 0 },
  },
})

/* 아이콘(svg) 스케일 — globalStyle 로 자식 svg 타겟팅.
 * IconButton 내부: 20px / Action 내부 leading: 18px. */
globalStyle(`${iconButton} svg`, { width: '20px', height: '20px', flexShrink: 0 })
globalStyle(`${action} svg`, { width: '18px', height: '18px', flexShrink: 0 })
```

