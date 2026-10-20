# Checkbox & Checkbox Group — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](../README.md)

## 구현 내용

### Checkbox box 스타일 (`checkbox.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const checkboxRoot = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  // box-sizing 을 명시하지 않으면 1px border 가 width/height 바깥으로 빠져나가
  // Small(12px)이 14×14, Medium(16px)이 18×18 처럼 찌그러진다(border-box 필수).
  boxSizing: "border-box",
  borderRadius: "2px",
  // 기본 = Unchecked enabled
  border: "1px solid var(--border-bolder)",
  background: "var(--element-default)",
  // 마크 색상 — CheckIcon/Dash 는 currentColor 로 상속.
  // enabled checked/indeterminate 와 disabled checked 모두 흰색(Figma 기준).
  color: "var(--element-on-primary)",
  // 색상 전환 애니메이션 — outline-color 포함(focus 진입/이탈 부드럽게)
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, outline-color 0.2s ease, color 0.2s ease",
  outline: "none",
  cursor: "pointer",
  selectors: {
    '&[data-size="small"]': { width: "12px", height: "12px" },
    '&[data-size="medium"]': { width: "16px", height: "16px" },

    // 포커스 border — border 바깥 1px gap 떨어진 1px primary outline.
    "&:focus-visible": {
      outline: "1px solid var(--element-primary)",
      outlineOffset: "1px",
      borderRadius: "4px",
    },
    // ===== 커서 상태 =====
    "&[data-disabled]:not([data-readonly])": { cursor: "not-allowed" },
    "&[data-readonly]": { cursor: "default" },

    // ===== Checked / Indeterminate =====
    '&[data-state="checked"], &[data-state="indeterminate"]': {
      border: "1px solid var(--element-primary)",
      background: "var(--element-primary)",
    },
    // ===== Disabled =====
    '&[data-disabled]:not([data-state="checked"]):not([data-state="indeterminate"])':
      {
        borderColor: "var(--border-disabled-subtle)",
        background: "var(--element-disabled)",
      },
    '&[data-disabled][data-state="checked"], &[data-disabled][data-state="indeterminate"]':
      {
        border: "1px solid var(--border-disabled-fill)",
        background: "var(--element-disabled)",
      },
    // ===== Invalid =====
    '&[aria-invalid="true"]:not([data-state="checked"]):not([data-state="indeterminate"])':
      {
        borderColor: "var(--border-danger)",
      },
    '&[aria-invalid="true"][data-state="checked"], &[aria-invalid="true"][data-state="indeterminate"]':
      {
        border: "1px solid var(--border-danger)",
        background: "var(--border-danger)",
      },
    // invalid + disabled (disabled 우선)
    '&[aria-invalid="true"][data-disabled]:not([data-state="checked"]):not([data-state="indeterminate"])':
      {
        borderColor: "var(--border-disabled-subtle)",
        background: "var(--element-disabled)",
      },
    '&[aria-invalid="true"][data-disabled][data-state="checked"], &[aria-invalid="true"][data-disabled][data-state="indeterminate"]':
      {
        border: "1px solid var(--border-disabled-fill)",
        background: "var(--element-disabled)",
      },
  },
});

/** 대시 마크(Indeterminate) — 흰 가로선 */
export const checkboxDash = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  background: "var(--element-on-primary)",
  transform: "translate(-50%, -50%)",
  borderRadius: "1px",
  selectors: {
    '&[data-size="small"]': { width: "6px", height: "1.5px" },
    '&[data-size="medium"]': { width: "8px", height: "2px" },
  },
});

/**
 * 체크마크(Checked 상태) — lucide CheckIcon 색상 제어.
 * currentColor 의존을 피하고 토큰 변수를 직접 참조하여 마크가 누락되지 않도록 한다.
 * (disabled checked 도 흰색 유지 — Figma 기준, 저대비 의도)
 */
export const checkboxCheckIcon = style({
  color: "var(--element-on-primary)",
});
```

### Checkbox Item(단일) 스타일 (`Checkbox.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const item = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  fontFamily: "var(--font-sans)",
});

export const itemRow = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    '&[data-size="small"]': { gap: "2px" },
    '&[data-size="medium"]': { gap: "0" },
    "&[data-disabled]": { cursor: "not-allowed" },
    "&[data-readonly]": { cursor: "default" },
  },
});

export const checkboxWrap = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  selectors: {
    '&[data-size="small"]': { padding: "6px" },
    '&[data-size="medium"]': { padding: "8px" },
  },
});

export const label = style({
  display: "flex",
  alignItems: "center",
  fontWeight: 400,
  color: "var(--text)",
  transition: "color 0.2s ease",
  selectors: {
    '&[data-size="small"]': {
      fontSize: "12px",
      lineHeight: "16px",
      paddingRight: "6px",
    },
    '&[data-size="medium"]': {
      fontSize: "14px",
      lineHeight: "20px",
      paddingRight: "8px",
    },
    "&[data-disabled]": { color: "var(--text-disabled-bold)" },
    ":where(label:not([data-disabled]):not([data-readonly])):hover &": {
      color: "var(--text-subtle)",
    },
  },
});

export const helpText = style({
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: {
    '&[data-size="small"]': {
      fontSize: "10px",
      lineHeight: "12px",
      paddingLeft: "26px",
    },
    '&[data-size="medium"]': {
      fontSize: "12px",
      lineHeight: "16px",
      paddingLeft: "32px",
    },
    "&[data-disabled]": { color: "var(--text-disabled)" },
    ":where(label:not([data-disabled]):not([data-readonly])):hover ~ &": {
      color: "var(--text-subtler)",
    },
  },
});
```

