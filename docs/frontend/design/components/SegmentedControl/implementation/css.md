# Segmented Control — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](../README.md)

## 구현 내용

### 13-1. ToggleGroup primitive 스타일 (`toggle-group.css.ts`)

```ts
import { style, globalStyle } from "@vanilla-extract/css";

/* ===== Item list(컨테이너) ===== */
export const group = style({
  display: "inline-flex",
  alignItems: "stretch",
  gap: "0",
  padding: "0",
  borderRadius: "4px",
  border: "1px solid var(--border-default)",
  background: "var(--surface-default-subtler)",
  overflow: "hidden",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

export const groupFullWidth = style({
  display: "flex",
  width: "100%",
});

/* ===== 개별 item ===== */
export const item = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  borderRadius: "4px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400, // Unselected = Regular. Selected 는 아래 셀렉터에서 600.
  color: "var(--text-subtle)",
  background: "transparent",
  border: "1px solid transparent",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  outline: "none",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    /* Selected */
    '&[data-state="on"]': {
      background: "var(--action-default)",
      border: "1px solid var(--border-bold)",
      color: "var(--text)",
      fontWeight: 600,
    },
    /* Hovered/Pressed — unselected 에만 */
    '&:where(:not([data-state="on"]):not([disabled]):not([data-disabled])):hover':
      {
        boxShadow: "inset 0 0 0 9999px var(--action-opacity-hovered)",
      },
    '&:where(:not([data-state="on"]):not([disabled]):not([data-disabled])):active':
      {
        boxShadow: "inset 0 0 0 9999px var(--action-opacity-pressed)",
      },
    /* Focused — inset box-shadow 링, border 투명화 */
    "&:where(:not([disabled]):not([data-disabled])):focus-visible": {
      borderColor: "transparent",
      boxShadow: "inset 0 0 0 2px var(--border-primary)",
      zIndex: 1,
    },
    /* Disabled */
    "&[data-disabled], &:disabled": {
      color: "var(--text-disabled)",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    '&&[data-state="on"][data-disabled]': {
      background: "var(--action-default)",
      borderColor: "var(--border-default)",
    },
  },
});

/* 사이즈 변형 */
export const itemSmall = style({ height: "28px", padding: "4px 8px" });
export const itemMedium = style({ height: "32px", padding: "6px 10px" });
export const itemLarge = style({ height: "36px", padding: "8px 12px" });

/* Icon 형 — 정사각형 */
export const itemIconOnlySmall = style({
  width: "28px",
  height: "28px",
  padding: "0",
});
export const itemIconOnlyMedium = style({
  width: "32px",
  height: "32px",
  padding: "0",
});
export const itemIconOnlyLarge = style({
  width: "36px",
  height: "36px",
  padding: "0",
});

export const itemFullWidth = style({ flex: "1 1 0", width: "auto" });

/* ===== Divider ===== */
export const divider = style({
  position: "absolute",
  right: "-1px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "1px",
  height: "12px",
  background: "var(--border-default)",
  pointerEvents: "none",
  transition: "background-color 0.2s ease",
});

/* 부모가 selected/disabled 면 divider 숨김 */
globalStyle(`[data-state="on"] > .${divider}`, { display: "none" });
globalStyle(`[data-disabled] > .${divider}`, { display: "none" });
/* 직전 형제가 focus-visible 이면 divider 숨김 (focus 링 가림 방지) */
globalStyle(
  `[class*="toggle-group_item"]:has(+ :focus-visible) > .${divider}`,
  {
    display: "none",
  },
);
```

### 13-3. SegmentedControl 조립 스타일 (`SegmentedControl.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const root = style({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
  fontFamily: "var(--font-sans)",
});
export const rootFullWidth = style({ display: "flex", width: "100%" });

export const container = style({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
});
export const containerFullWidth = style({ display: "flex", width: "100%" });

export const labelRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
});
export const label = style({
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "var(--text)",
  transition: "color 0.2s ease",
});
export const helpText = style({
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});

export const infoIconTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  color: "var(--icon-subtle)",
  cursor: "help",
  background: "transparent",
  border: "none",
  padding: "0",
  transition: "color 0.2s ease",
  selectors: { "&:hover": { color: "var(--icon)" } },
});

export const itemContent = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

/* ===== 라벨 너비 점핑 방지(ghost 레이어) ===== */
export const itemLabelWrap = style({
  position: "relative",
  display: "inline-grid",
  alignItems: "center",
  gridTemplateAreas: '"label"',
});
export const itemLabelGhost = style({
  gridArea: "label",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  visibility: "hidden",
  whiteSpace: "nowrap",
});
export const itemLabelReal = style({
  gridArea: "label",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
  // fontWeight 는 부모 item 에서 400 또는 600 으로 상속(inherit).
});
```

