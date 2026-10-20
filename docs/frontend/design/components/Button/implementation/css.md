# Button — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Button.css.ts`)

```ts
import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

/**
 * Base — 모든 variant/size 가 공유하는 구조/상태 스타일.
 */
export const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: "4px",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  cursor: "pointer",
  userSelect: "none",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  selectors: {
    "&:disabled, &[data-disabled]": {
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    // Focus — Figma "Focused" state.
    // 4개 사이즈 모두 버튼보다 위아래 각 2px 큰 outline = 1px gap + 1px 선 두께.
    // outline-offset 은 border-box 에서 outline 시작점(빈 gap)까지 거리 → 1px.
    // Radio/Checkbox 와 동일한 1px stroke + 1px offset 패턴.
    "&:focus-visible": {
      outline: "1px solid var(--btn-focus-border)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
  },
});

/**
 * Size — height / padding-x / gap / font-size / line-height.
 * 아이콘 사이즈는 Icon 컴포넌트가 size prop 으로 직접 제어한다 (Button 이 관여 X).
 */
export const buttonSize = styleVariants({
  tiny: {
    height: "24px",
    paddingInline: "8px",
    gap: "2px",
    fontSize: "12px",
    lineHeight: "16px",
  },
  small: {
    height: "28px",
    paddingInline: "8px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  medium: {
    height: "32px",
    paddingInline: "16px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  large: {
    height: "40px",
    paddingInline: "16px",
    gap: "4px",
    fontSize: "16px",
    lineHeight: "24px",
  },
});

/**
 * Variant — 4 가지 타입별 fill/text/border 및 상태(hover/pressed/disabled) 색상.
 * Disabled 가 시각적으로 최우선(:disabled 로 가장 뒤에 선언).
 */
export const buttonVariant = styleVariants({
  primary: {
    background: "var(--btn-primary-fill)",
    color: "var(--btn-on-primary)",
    selectors: {
      "&:hover:not(:disabled):not([data-disabled])": { background: "var(--btn-primary-fill-hover)" },
      "&:active:not(:disabled):not([data-disabled])": {
        background: "var(--btn-primary-fill-pressed)",
      },
      "&:disabled, &[data-disabled]": {
        background: "var(--btn-primary-fill-disabled)",
        color: "var(--btn-on-primary-disabled)",
      },
    },
  },
  secondary: {
    background: "var(--btn-secondary-fill)",
    borderColor: "var(--btn-secondary-border)",
    color: "var(--btn-on-secondary)",
    selectors: {
      "&:hover:not(:disabled):not([data-disabled])": {
        background: "var(--btn-secondary-fill-hover)",
      },
      "&:active:not(:disabled):not([data-disabled])": {
        background: "var(--btn-secondary-fill-pressed)",
      },
      "&:disabled, &[data-disabled]": {
        background: "var(--btn-secondary-fill-disabled)",
        color: "var(--btn-on-secondary-disabled)",
        borderColor: "var(--btn-on-secondary-disabled)",
      },
    },
  },
  tertiary: {
    background: "var(--btn-tertiary-fill)",
    borderColor: "var(--btn-tertiary-border)",
    color: "var(--btn-on-tertiary)",
    selectors: {
      "&:hover:not(:disabled):not([data-disabled])": {
        background: "var(--btn-tertiary-fill-hover)",
      },
      "&:active:not(:disabled):not([data-disabled])": {
        background: "var(--btn-tertiary-fill-pressed)",
      },
      "&:disabled, &[data-disabled]": {
        background: "var(--btn-tertiary-fill-disabled)",
        color: "var(--btn-on-tertiary-disabled)",
        borderColor: "var(--btn-tertiary-border)",
      },
    },
  },
  negative: {
    background: "var(--btn-negative-fill)",
    color: "var(--btn-on-negative)",
    selectors: {
      "&:hover:not(:disabled):not([data-disabled])": {
        background: "var(--btn-negative-fill-hover)",
      },
      "&:active:not(:disabled):not([data-disabled])": {
        background: "var(--btn-negative-fill-pressed)",
      },
      "&:disabled, &[data-disabled]": {
        background: "var(--btn-negative-fill-disabled)",
        color: "var(--btn-on-negative-disabled)",
      },
    },
  },
});

/* 아이콘(svg) — Icon 컴포넌트가 size/strokeWidth 를 직접 제어하므로
 * Button 은 flexShrink 만 보장한다. */
globalStyle(`${buttonBase} svg`, { flexShrink: 0 });
```

