# Select — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`select.css.ts`)

```ts
import { style, globalStyle, keyframes } from "@vanilla-extract/css";

/* ===== Trigger 컨테이너 ===== */
export const trigger = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  width: "100%",
  minWidth: 0,
  padding: "0 6px 0 12px",
  borderRadius: "4px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text)",
  background: "var(--form-surface-active)",
  border: "1px solid var(--form-border-default)",
  cursor: "pointer",
  userSelect: "none",
  textAlign: "left",
  outline: "none",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  selectors: {
    '&[data-size="small"]': { height: "28px" },
    '&[data-size="medium"]': { height: "32px" },
    '&[data-size="large"]': { height: "36px" },
    '&[data-size="xlarge"]': { height: "40px" },

    /* Multi 모드 — chip 이 들어가 min-height 로 전환.
     * ⚠️ padding 은 chip 높이 + padding × 2 + border(2px) = min-height 가 되도록 설정.
     * chip small(20px): 20 + 4×2 + 2 = 30 > 28(min) → OK (small 은 chip 없을 때 28px).
     * chip small(20px): 20 + 5×2 + 2 = 32 (medium). chip medium(24px): 24 + 5×2 + 2 = 36 (large). */
    '&[data-multiple="true"]': {
      height: "auto",
      minHeight: "28px",
      padding: "4px 6px 4px 12px",
    },
    '&[data-multiple="true"][data-size="medium"]': {
      minHeight: "32px",
      padding: "5px 6px 5px 12px",
    },
    '&[data-multiple="true"][data-size="large"]': {
      minHeight: "36px",
      padding: "5px 6px 5px 12px",
    },
    '&[data-multiple="true"][data-size="xlarge"]': {
      minHeight: "40px",
      padding: "7px 6px 7px 12px",
    },

    /* Create variant */
    '&[data-variant="create"]': {
      border: "1px solid transparent",
      background: "var(--form-surface-inactive)",
    },

    /* Open/Focused — inset box-shadow 로 2px 표현(밀림 방지) */
    '&[data-state="open"]:not([data-disabled]):not([data-readonly])': {
      borderColor: "var(--form-border-active)",
      boxShadow: "inset 0 0 0 1px var(--form-border-active)",
      background: "var(--form-surface-active)",
    },
    '&[data-variant="create"][data-state="open"]:not([data-disabled]):not([data-readonly])':
      {
        background: "var(--form-surface-active)",
      },

    /* Invalid */
    '&[aria-invalid="true"]:not([data-state="open"]):not([data-disabled])': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },

    /* Disabled */
    "&[data-disabled]": {
      cursor: "not-allowed",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
      color: "var(--text-disabled)",
    },

    /* Read-only */
    "&[data-readonly]": {
      cursor: "default",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },
  },
});

export const triggerValue = style({
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--text)",
  transition: "color 0.2s ease",
});

export const triggerPlaceholder = style({
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--form-placeholder-active)",
  transition: "color 0.2s ease",
});

globalStyle(
  `[data-disabled] .${triggerValue}, [data-disabled] .${triggerPlaceholder}`,
  {
    color: "var(--form-placeholder-inactive)",
  },
);

/* ===== Chip 컨테이너 (Multi) ===== */
export const chipContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
});

/* ===== Overflow chip (+N) ===== */
export const overflowChip = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "20px",
  padding: "0 8px",
  flexShrink: 0,
  borderRadius: "10px",
  background: "var(--element-primary-subtle)",
  color: "var(--text-primary)",
  font: "var(--text-title3)",
  whiteSpace: "nowrap",
  userSelect: "none",
  transition: "background-color 0.2s ease, color 0.2s ease",
});

/* ===== Clear button (Search close button 과 동일) ===== */
export const clearButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  padding: 0,
  border: "none",
  borderRadius: "50%",
  background: "var(--icon-subtle)",
  color: "var(--icon-inverse)",
  cursor: "pointer",
  outline: "none",
  transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
  selectors: {
    "&:hover": { opacity: 0.8 },
    "&:active": { opacity: 0.6 },
    "&:focus-visible": {
      outline: "2px solid var(--border-primary)",
      outlineOffset: "2px",
    },
    "[data-disabled] &, [data-readonly] &": {
      cursor: "not-allowed",
      opacity: 0.4,
    },
  },
});

/* ===== 검색 input ===== */
export const searchInput = style({
  flex: "1 1 auto",
  minWidth: 0,
  height: "100%",
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text)",
  cursor: "inherit",
  selectors: {
    "&::placeholder": {
      color: "var(--form-placeholder-active)",
      transition: "color 0.2s ease",
    },
    "&:disabled": { color: "var(--text-disabled)", cursor: "not-allowed" },
    "&:disabled::placeholder": { color: "var(--form-placeholder-inactive)" },
  },
});

/* ===== Chevron ===== */
export const chevron = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  color: "var(--icon)",
  pointerEvents: "none",
  transition: "transform 0.2s ease, color 0.2s ease",
  selectors: {
    '[data-state="open"] &': { transform: "rotate(180deg)" },
    "[data-disabled] &, [data-readonly] &": { color: "var(--icon-disabled)" },
  },
});

/* ===== Empty message ===== */
export const emptyMessage = style({
  padding: "8px 16px",
  font: "var(--text-body2)",
  color: "var(--text-subtle)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* ===== 드롭다운 Content (Menu 시각 공유) ===== */
const SLIDE = "6px";
const fadeInDown = keyframes({
  from: { opacity: "0", transform: `translateY(-${SLIDE})` },
  to: { opacity: "1", transform: "translateY(0)" },
});
const fadeInUp = keyframes({
  from: { opacity: "0", transform: `translateY(${SLIDE})` },
  to: { opacity: "1", transform: "translateY(0)" },
});
const fadeOutDown = keyframes({
  from: { opacity: "1", transform: "translateY(0)" },
  to: { opacity: "0", transform: `translateY(-${SLIDE})` },
});
const fadeOutUp = keyframes({
  from: { opacity: "1", transform: "translateY(0)" },
  to: { opacity: "0", transform: `translateY(${SLIDE})` },
});

export const content = style({
  minWidth: "140px",
  width: "var(--radix-popper-anchor-width)",
  maxWidth: "var(--radix-popper-available-width)",
  maxHeight: "var(--radix-popper-available-height)",
  padding: "4px 0",
  borderRadius: "4px",
  border: "1px solid var(--border-default)",
  background: "var(--menu-surface)",
  boxShadow: "var(--menu-shadow)",
  overflow: "hidden",
  zIndex: 50,
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  animationDuration: "0.15s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  transformOrigin: "var(--radix-popper-transform-origin)",
  selectors: {
    '&[data-state="open"][data-side="top"]': { animationName: fadeInUp },
    '&[data-state="open"][data-side="bottom"]': { animationName: fadeInDown },
    '&[data-state="open"]:not([data-side])': { animationName: fadeInDown },
    '&[data-state="closed"][data-side="top"]': { animationName: fadeOutUp },
    '&[data-state="closed"][data-side="bottom"]': {
      animationName: fadeOutDown,
    },
    '&[data-state="closed"]:not([data-side])': { animationName: fadeOutDown },
  },
});

export const viewport = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

/* ===== Item ===== */
export const item = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "0 16px",
  width: "100%",
  font: "var(--text-body2)",
  color: "var(--text)",
  background: "var(--menu-surface)",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  outline: "none",
  transition:
    "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:hover": { background: "var(--menu-item-hovered)" },
    "&:active": { background: "var(--menu-item-pressed)" },
    "&:focus-visible": {
      background: "var(--menu-item-hovered)",
      boxShadow: "inset 0 0 0 2px var(--border-primary)",
      zIndex: 1,
    },
    '&[data-selected="true"]': {
      background: "var(--menu-item-selected)",
      color: "var(--text-primary)",
    },
    '&[data-selected="true"]:hover': {
      background: "var(--menu-item-selected)",
    },
    "&[data-disabled], &:disabled": {
      color: "var(--text-disabled)",
      background: "transparent",
      cursor: "not-allowed",
      boxShadow: "none",
    },
    '&&[data-selected="true"][data-disabled]': {
      background: "transparent",
      color: "var(--text-disabled)",
    },
  },
});

export const itemSmall = style({ minHeight: "28px", padding: "4px 16px" });
export const itemMedium = style({ minHeight: "32px", padding: "6px 16px" });
export const itemLarge = style({ minHeight: "36px", padding: "8px 16px" });

export const itemContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  alignItems: "flex-start",
  justifyContent: "center",
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
});

export const checkIcon = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  color: "var(--text-primary)",
  marginLeft: "auto",
  transition: "color 0.2s ease",
});

export const itemLeading = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  pointerEvents: "none",
});

export const selectAllItem = style({});

export const divider = style({
  height: "1px",
  width: "100%",
  background: "var(--border-subtle)",
  margin: "2px 0",
  border: "none",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});
```

### Markup 스타일 (`Select.css.ts`)

> Label 행, Help text, field 래퍼를 정의. primitive 가 트리거/드롭다운 시각을 담당하면
> 여기서는 폼 필드 조립 레이아웃만 정의한다.

```ts
import { style } from "@vanilla-extract/css";

/* field — Label ↔ Trigger ↔ Help text 세로 정렬, gap 4px, width 320px. */
export const field = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "4px",
  width: "320px",
  maxWidth: "100%",
  selectors: { "&[data-full-width]": { width: "100%", minWidth: 0 } },
});

/* labelRow — Label + (선택사항) + * + info icon 가로 정렬, gap 2px. */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

/* Label 텍스트 — Title2 (14px SemiBold #1c1c1c). */
export const labelText = style({
  font: "var(--text-title2)",
  color: "var(--text)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* (선택사항) — Body3 (12px Regular #757575). */
export const optionalText = style({
  font: "var(--text-body3)",
  color: "var(--text-subtler)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* required(*) — Body2 (14px Regular #e81919). */
export const requiredMark = style({
  font: "var(--text-body2)",
  color: "var(--text-danger)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* info icon — 14px #757575. */
export const infoIcon = style({
  display: "inline-flex",
  alignItems: "center",
  width: "14px",
  height: "14px",
  color: "var(--icon-subtler)",
  flexShrink: 0,
  transition: "color 0.2s ease",
});

/* Help text — Body3 (12px Regular #555). invalid 시 helpTextInvalid 사용. */
export const helpText = style({
  font: "var(--text-body3)",
  color: "var(--text-subtle)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

export const helpTextInvalid = style({
  font: "var(--text-body3)",
  color: "var(--text-error)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});
```
