# Open panel — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Open panel 문서 인덱스](../README.md)

## 구현 내용

### 12-1. Sheet primitive 스타일 (`sheet.css.ts`)

```ts
import { style, keyframes } from "@vanilla-extract/css";

/* ===== Scrim (Overlay 배경) ===== */
export const sheetOverlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.25)",
  transition: "background-color 0.2s ease",
  zIndex: 40,
});

/* ===== Panel 본체 ===== */
export const sheetContent = style({
  position: "fixed",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  background: "var(--surface)",
  color: "var(--text)",
  boxShadow: "var(--elevation-overlay)",
  transition:
    "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  overflow: "hidden",
  selectors: {
    /* 위치는 type 과 무관하게 동일 */
    '&[data-side="top"]': {
      top: 0,
      left: 0,
      right: 0,
      height: "386px",
      borderBottom: "1px solid var(--border-default)",
      borderRadius: "0 0 8px 8px",
    },
    '&[data-side="right"]': {
      top: 0,
      right: 0,
      bottom: 0,
      width: "424px",
      borderLeft: "1px solid var(--border-default)",
      borderRadius: "8px 0 0 8px",
    },
    '&[data-side="bottom"]': {
      bottom: 0,
      left: 0,
      right: 0,
      height: "386px",
      borderTop: "1px solid var(--border-default)",
      borderRadius: "8px 8px 0 0",
    },
    '&[data-side="left"]': {
      top: 0,
      left: 0,
      bottom: 0,
      width: "424px",
      borderRight: "1px solid var(--border-default)",
      borderRadius: "0 8px 8px 0",
    },
    /* Inline 타입 — 그림자 제거(평면) */
    '&[data-type="inline"]': { boxShadow: "none" },
  },
});

/* ===== 방향별 slide 애니메이션 ===== */
const slideInTop = keyframes({
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" },
});
const slideOutTop = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(-100%)" },
});
const slideInBottom = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});
const slideOutBottom = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(100%)" },
});
const slideInLeft = keyframes({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" },
});
const slideOutLeft = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-100%)" },
});
const slideInRight = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});
const slideOutRight = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(100%)" },
});
const fadeIn = keyframes({ from: { opacity: "0" }, to: { opacity: "1" } });
const fadeOut = keyframes({ from: { opacity: "1" }, to: { opacity: "0" } });

export const animatableContent = style({
  animationDuration: "0.25s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    '&[data-state="open"][data-side="top"]': { animationName: slideInTop },
    '&[data-state="open"][data-side="bottom"]': {
      animationName: slideInBottom,
    },
    '&[data-state="open"][data-side="left"]': { animationName: slideInLeft },
    '&[data-state="open"][data-side="right"]': { animationName: slideInRight },
    '&[data-state="closed"][data-side="top"]': { animationName: slideOutTop },
    '&[data-state="closed"][data-side="bottom"]': {
      animationName: slideOutBottom,
    },
    '&[data-state="closed"][data-side="left"]': { animationName: slideOutLeft },
    '&[data-state="closed"][data-side="right"]': {
      animationName: slideOutRight,
    },
  },
});

export const animatableOverlay = style({
  animationDuration: "0.25s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    '&[data-state="open"]': { animationName: fadeIn },
    '&[data-state="closed"]': { animationName: fadeOut },
  },
});

/* ===== Header (56px) ===== */
export const sheetHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  height: "56px",
  minHeight: "56px",
  padding: "0 24px",
  borderBottom: "1px solid var(--border-subtle)",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
});

export const sheetHeaderMain = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flex: "1 1 auto",
  minWidth: 0,
});

export const sheetTitle = style({
  fontFamily: "var(--font-sans)",
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "24px",
  color: "var(--text)",
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

export const sheetHeaderActions = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
});

/* ===== Body (24px padding, 스크롤) ===== */
export const sheetBody = style({
  flex: "1 1 auto",
  padding: "24px",
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "var(--scrollbar-thumb-fill) transparent",
  transition: "background-color 0.2s ease",
  selectors: {
    "&::-webkit-scrollbar": { width: "4px", height: "4px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--scrollbar-thumb-fill)",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "var(--scrollbar-thumb-hover)",
    },
  },
});

/* ===== Resize handle ===== */
export const sheetResizeHandle = style({
  position: "absolute",
  zIndex: 51,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  transition: "background-color 0.2s ease",
  selectors: {
    '&[data-side="right"]': {
      left: 0,
      top: 0,
      bottom: 0,
      width: "20px",
      cursor: "col-resize",
    },
    '&[data-side="left"]': {
      right: 0,
      top: 0,
      bottom: 0,
      width: "20px",
      cursor: "col-resize",
    },
    '&[data-side="bottom"]': {
      left: 0,
      right: 0,
      top: 0,
      height: "20px",
      cursor: "row-resize",
    },
    '&[data-side="top"]': {
      left: 0,
      right: 0,
      bottom: 0,
      height: "20px",
      cursor: "row-resize",
    },
  },
});

export const sheetResizeLine = style({
  background: "var(--border-default)",
  borderRadius: "1000px",
  transition: "background-color 0.2s ease",
  pointerEvents: "none",
  selectors: {
    '&[data-orientation="vertical"]': { width: "4px", height: "20px" },
    '&[data-orientation="horizontal"]': { width: "20px", height: "4px" },
    '[data-slot="sheet-resize-handle"]:hover &': {
      background: "var(--border-bold)",
    },
    '[data-slot="sheet-resize-handle"]:active &': { background: "var(--icon)" },
  },
});
```

