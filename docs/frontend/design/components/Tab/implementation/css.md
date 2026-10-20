# Tab — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](../README.md)

## 구현 내용

### Trigger 스타일 (`tabs.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const tabsRoot = style({
  display: "flex",
  gap: "0",
  fontFamily: "var(--font-sans)",
  selectors: {
    '&[data-orientation="horizontal"]': { flexDirection: "column" },
    '&[data-orientation="vertical"]': { flexDirection: "row" },
  },
});

export const tabsList = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "stretch",
  gap: "0",
  padding: "0",
  selectors: {
    '&[data-orientation="horizontal"]': {
      flexDirection: "row",
      borderBottom: "1px solid var(--border-default)",
      transition: "border-color 0.2s ease",
    },
    '&[data-orientation="vertical"]': {
      flexDirection: "column",
      borderRight: "1px solid var(--border-default)",
      transition: "border-color 0.2s ease",
    },
  },
});

export const tabsListFullWidth = style({
  display: "flex",
  width: "100%",
});

export const scrollButton = style({
  position: "absolute",
  insetBlock: 0,
  width: "24px",
  border: 0,
  borderBottom: "1px solid var(--border-default)",
  borderRadius: 0,
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  transition:
    "opacity 0.2s ease, transform 0.2s ease, visibility 0s linear 0.2s",
  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      transitionDelay: "0s",
    },
  },
});

export const scrollButtonStart = style({
  insetInlineStart: 0,
  borderRight: "1px solid var(--border-default)",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      insetBlock: 0,
      insetInlineEnd: "-6px",
      width: "6px",
      background: "var(--tab-overflow-shadow-start)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent, #000 6px, #000 calc(100% - 6px), transparent)",
      maskImage:
        "linear-gradient(to bottom, transparent, #000 6px, #000 calc(100% - 6px), transparent)",
      pointerEvents: "none",
    },
  },
});

export const scrollButtonEnd = style({
  insetInlineEnd: 0,
  borderLeft: "1px solid var(--border-default)",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      insetBlock: 0,
      insetInlineStart: "-6px",
      width: "6px",
      background: "var(--tab-overflow-shadow-end)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent, #000 6px, #000 calc(100% - 6px), transparent)",
      maskImage:
        "linear-gradient(to bottom, transparent, #000 6px, #000 calc(100% - 6px), transparent)",
      pointerEvents: "none",
    },
  },
});

export const tabsTrigger = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  minWidth: "120px",
  height: "44px",
  padding: "0 16px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  outline: "none",
  transition:
    "color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    // Selected — primary 텍스트 + SemiBold + 2px primary 인디케이터
    '&[data-state="active"]': {
      fontWeight: 600,
      color: "var(--text-primary)",
    },
    '&[data-state="active"][data-orientation="horizontal"]': {
      boxShadow: "inset 0 -2px 0 0 var(--border-primary)",
    },
    // Hovered (unselected 만)
    '&:where([data-state="inactive"]:not(:disabled):not([data-disabled])):hover':
      {
        background: "var(--surface-hover)",
        boxShadow: "inset 0 -2px 0 0 var(--border-default-hovered)",
      },
    // Pressed (unselected 만)
    '&:where([data-state="inactive"]:not(:disabled):not([data-disabled])):active':
      {
        background: "var(--surface-pressed)",
        boxShadow: "inset 0 -2px 0 0 var(--border-default-pressed)",
      },
    // Focused — 모든 trigger. 2px primary 직사각형 outline (내부)
    "&:focus-visible": {
      outline: "2px solid var(--border-focused)",
      outlineOffset: "-2px",
      borderRadius: "2px",
      zIndex: 1,
    },
    // Disabled
    "&[data-disabled], &:disabled": {
      color: "var(--text-disabled)",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    '&&[data-state="active"][data-disabled], &&[data-state="active"]:disabled':
      {
        color: "var(--text-disabled)",
        boxShadow: "inset 0 -2px 0 0 var(--border-default)",
      },
  },
});

export const tabsTriggerFullWidth = style({
  flex: "1 1 0",
  width: "auto",
});

export const tabsContent = style({
  flex: 1,
  outline: "none",
  paddingTop: "16px",
});
```

### Tab markup 조립 (`Tab.css.ts`)

```ts
import { style, globalStyle } from "@vanilla-extract/css";

export const triggerContent = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

export const triggerIcon = style({
  flexShrink: 0,
  display: "inline-flex",
  color: "inherit",
  transition: "color 0.2s ease",
});

export const triggerLabel = style({
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

export const triggerCount = style({
  display: "inline-flex",
  alignItems: "center",
  lineHeight: 0,
});

// ===== Selected 상태 Chip 색상 전환 =====
// 토큰: --tab-count-selected-surface / --tab-count-selected-text (라이트/다크 정확 매핑).
// 특이성 0-4-0 으로 Chip 기본 variant 셀렉터(0-2-0)를 안정적으로 이김.
globalStyle(
  `[data-slot="tabs-trigger"][data-state="active"] [data-slot="chip"][data-color]`,
  {
    background: "var(--tab-count-selected-surface)",
    color: "var(--tab-count-selected-text)",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
);

// ===== Disabled 상태 Chip 색상 전환 =====
globalStyle(
  `[data-slot="tabs-trigger"][data-disabled] [data-slot="chip"][data-color], [data-slot="tabs-trigger"]:disabled [data-slot="chip"][data-color]`,
  {
    background: "var(--element-disabled)",
    color: "var(--text-disabled)",
  },
);
```
