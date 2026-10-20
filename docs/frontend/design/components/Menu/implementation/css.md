# Menu — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](../README.md)

## 구현 내용

### 13-1. Menu 스타일 (`dropdown-menu.css.ts`)

```ts
import { style, keyframes, globalStyle } from "@vanilla-extract/css";

/* ===== 애니메이션 keyframes ===== */
const SLIDE = "6px";

const fadeInUp = keyframes({
  from: { opacity: "0", transform: `translateY(${SLIDE})` },
  to: { opacity: "1", transform: "translateY(0)" },
});
const fadeInDown = keyframes({
  from: { opacity: "0", transform: `translateY(-${SLIDE})` },
  to: { opacity: "1", transform: "translateY(0)" },
});
const fadeInLeft = keyframes({
  from: { opacity: "0", transform: `translateX(${SLIDE})` },
  to: { opacity: "1", transform: "translateX(0)" },
});
const fadeInRight = keyframes({
  from: { opacity: "0", transform: `translateX(-${SLIDE})` },
  to: { opacity: "1", transform: "translateX(0)" },
});
const fadeOutUp = keyframes({
  from: { opacity: "1", transform: "translateY(0)" },
  to: { opacity: "0", transform: `translateY(${SLIDE})` },
});
const fadeOutDown = keyframes({
  from: { opacity: "1", transform: "translateY(0)" },
  to: { opacity: "0", transform: `translateY(-${SLIDE})` },
});
const fadeOutLeft = keyframes({
  from: { opacity: "1", transform: "translateX(0)" },
  to: { opacity: "0", transform: `translateX(${SLIDE})` },
});
const fadeOutRight = keyframes({
  from: { opacity: "1", transform: "translateX(0)" },
  to: { opacity: "0", transform: `translateX(-${SLIDE})` },
});

/* ===== MenuContent (컨테이너) =====
 * maxHeight / overflow 를 content 에 두지 않는다(★중요).
 * contentScrollable / contentNoScroll 로 분리. */
export const content = style({
  minWidth: "140px",
  width: "max-content",
  maxWidth: "var(--radix-dropdown-menu-content-available-width)",
  padding: "4px 0",
  borderRadius: "4px",
  border: "1px solid var(--border-default)",
  background: "var(--menu-surface)",
  boxShadow: "var(--menu-shadow)",
  zIndex: 50,
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  animationDuration: "0.15s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
  selectors: {
    '&[data-state="open"][data-side="top"]': { animationName: fadeInUp },
    '&[data-state="open"][data-side="bottom"]': { animationName: fadeInDown },
    '&[data-state="open"][data-side="left"]': { animationName: fadeInLeft },
    '&[data-state="open"][data-side="right"]': { animationName: fadeInRight },
    '&[data-state="open"]:not([data-side])': { animationName: fadeInDown },
    '&[data-state="closed"][data-side="top"]': { animationName: fadeOutUp },
    '&[data-state="closed"][data-side="bottom"]': {
      animationName: fadeOutDown,
    },
    '&[data-state="closed"][data-side="left"]': { animationName: fadeOutLeft },
    '&[data-state="closed"][data-side="right"]': {
      animationName: fadeOutRight,
    },
    '&[data-state="closed"]:not([data-side])': { animationName: fadeOutDown },
  },
});

/* scrollable=true — overflow hidden 으로 ScrollArea 를 clip. */
export const contentScrollable = style({
  maxHeight: "var(--radix-dropdown-menu-content-available-height)",
  overflow: "hidden",
});

/* scrollable=false — 제한 없이 전부 펼침. 빈 클래스. */
export const contentNoScroll = style({});

/* ===== ScrollArea wrapper (scrollable=true 시) =====
 * ScrollArea 기본 스타일(border/radius/bg/padding) 초기화.
 * thumb(role=scrollbar) 는 :not([role]) 로 제외 — width/maxHeight 왜곡 방지(★중요). */
export const scrollAreaWrap = style({
  height: "auto",
  maxHeight: "296px",
  width: "max-content",
  minWidth: "100%",
  border: "none",
  borderRadius: "0",
  background: "transparent",
  overflow: "hidden",
});

globalStyle(`.${scrollAreaWrap} > div:not([role])`, {
  width: "max-content",
  minWidth: "100%",
  maxHeight: "296px",
});

globalStyle(`.${scrollAreaWrap} > div > div`, {
  width: "max-content",
  minWidth: "100%",
});

export const scrollAreaContent = style({ padding: "0" });

/* ===== Section ===== */
export const section = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

/* ===== Section header ===== */
export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  height: "32px",
  padding: "0 16px",
  font: "var(--text-title3)",
  color: "var(--text-subtle)",
  userSelect: "none",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* ===== Item =====
 * ★ 상태 셀렉터 작성 규칙(버그 방지):
 *  - :hover → 배경만, 링 없음
 *  - [data-highlighted]:not(:hover) → 링만, 배경 유지
 *  - [data-selected="true"] → 배경 + 텍스트
 *  - [data-selected="true"]:hover → selected 배경 유지(덮어쓰기 방지)
 *  - [data-disabled] → 최우선, boxShadow none
 *  - &&[data-selected][data-disabled] → disabled 우선(명시도 &&) */
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
  overflow: "hidden",
  transition:
    "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:hover": { background: "var(--menu-item-hovered)" },
    "&:active": { background: "var(--menu-item-pressed)" },
    "&[data-highlighted]:not(:hover)": {
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

/* ===== Leading ===== */
export const itemLeading = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
});

/* ===== Content (label + description) ===== */
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

/* ===== Description ===== */
export const itemDescription = style({
  font: "var(--text-body3)",
  color: "var(--text-subtler)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});
globalStyle(`[data-disabled] .${itemDescription}`, {
  color: "var(--text-disabled)",
});

/* ===== Trailing ===== */
export const itemTrailing = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
  marginLeft: "auto",
});

/* ===== Shortcut ===== */
export const itemShortcut = style({
  font: "var(--text-body2)",
  color: "var(--text-subtler)",
  whiteSpace: "nowrap",
  flexShrink: 0,
  transition: "color 0.2s ease",
});
globalStyle(`[data-disabled] .${itemShortcut}`, {
  color: "var(--text-disabled)",
});

/* ===== Check icon (selected) ===== */
export const checkIcon = style({
  width: "16px",
  height: "16px",
  color: "var(--text-primary)",
  flexShrink: 0,
  transition: "color 0.2s ease",
});

/* ===== Chevron icon (submenu) — 폰트 색상과 동일 ===== */
export const chevronIcon = style({
  width: "16px",
  height: "16px",
  color: "var(--text)",
  flexShrink: 0,
  transition: "color 0.2s ease",
});

/* ===== Divider ===== */
export const divider = style({
  height: "1px",
  width: "100%",
  background: "var(--border-default)",
  margin: "2px 0",
  border: "none",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});
```

