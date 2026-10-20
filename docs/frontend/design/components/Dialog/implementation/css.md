# Dialog — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dialog 문서 인덱스](../README.md)

## 구현 내용

### 13-1. Dialog primitive 스타일 (`dialog.css.ts`)

```ts
import { style, keyframes, globalStyle } from "@vanilla-extract/css";

/* ===== Scrim (Overlay 배경) ===== */
export const dialogOverlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.25)",
  transition: "background-color 0.2s ease",
  zIndex: 40,
});

/* ===== Dialog 본체 (카드) — 중앙 정렬 ===== */
export const dialogContent = style({
  position: "fixed",
  zIndex: 50,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  maxWidth: "calc(100vw - 32px)",
  maxHeight: "calc(100vh - 32px)",
  background: "var(--surface)",
  color: "var(--text)",
  border: "1px solid var(--border-default)",
  borderRadius: "8px",
  boxShadow: "var(--dialog-shadow)",
  overflow: "hidden",
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    /* Small — 400px, auto height */
    '&[data-size="small"]': { width: "400px" },
    /* Confirmation profile — Small과 같은 400px을 보장하는 action 확인 profile */
    '&[data-profile="confirmation"]': { width: "400px" },
    /* Medium — 580px, max 640px height */
    '&[data-size="medium"]': { width: "580px", maxHeight: "640px" },
    /* Large — 720px, max 640px height */
    '&[data-size="large"]': { width: "720px", maxHeight: "640px" },
    /* X-Large — 920px, max 760px height. 표·탐색 결과용 workflow dialog */
    '&[data-size="xlarge"]': {
      width: "920px",
      maxHeight: "min(760px, calc(100vh - 32px))",
    },
  },
});

/* ===== 애니메이션 — fade + scale ===== */
const fadeIn = keyframes({ from: { opacity: "0" }, to: { opacity: "1" } });
const fadeOut = keyframes({ from: { opacity: "1" }, to: { opacity: "0" } });
const scaleIn = keyframes({
  from: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
  to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
});
const scaleOut = keyframes({
  from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
  to: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
});

export const animatableContent = style({
  animationDuration: "0.2s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    '&[data-state="open"]': { animationName: scaleIn },
    '&[data-state="closed"]': { animationName: scaleOut },
  },
});

export const animatableOverlay = style({
  animationDuration: "0.2s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    '&[data-state="open"]': { animationName: fadeIn },
    '&[data-state="closed"]': { animationName: fadeOut },
  },
});

/* ===== Header — pt24 pb18 px24. close 버튼 우측 절대 위치. ===== */
export const dialogHeader = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "24px 24px 18px",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});

/* close 버튼(IconButton)을 Header 우측에 절대 위치 */
globalStyle('[data-slot="dialog-header"] [data-slot="icon-button"]', {
  position: "absolute",
  right: "24px",
  top: "50%",
  transform: "translateY(-50%)",
});

export const dialogTitle = style({
  flex: "1 1 0",
  minWidth: 0,
  fontFamily: "var(--font-sans)",
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "24px",
  color: "var(--text)",
  margin: "0 32px 0 0",
  paddingRight: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

export const dialogDescription = style({
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});

/* ===== Body — 스크롤 가능한 본문 =====
 * dialogBody: padding 없음(전체 너비). border/fade 는 data-scroll-position 으로 분기.
 * ScrollArea 가 이 안에 들어가며, thumb 가 dialog 우측 끝에 위치. */
export const dialogBody = style({
  position: "relative",
  flex: "1 1 auto",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderTop: "1px solid transparent",
  borderBottom: "1px solid transparent",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  selectors: {
    '&[data-scroll-position="top"]': {
      borderTop: "1px solid transparent",
      borderBottom: "1px solid var(--border-default)",
    },
    '&[data-scroll-position="middle"]': {
      borderTop: "1px solid var(--border-default)",
      borderBottom: "1px solid var(--border-default)",
    },
    '&[data-scroll-position="bottom"]': {
      borderTop: "1px solid var(--border-default)",
      borderBottom: "1px solid transparent",
    },
  },
});

/* 상단 fade — 콘텐츠가 상단으로 갈수록 surface 색으로 페이드 */
globalStyle(`.${dialogBody}::before`, {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "16px",
  background: "linear-gradient(to bottom, var(--surface) 0%, transparent 100%)",
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0,
  transition: "opacity 0.2s ease",
});
/* 하단 fade — 콘텐츠가 하단으로 갈수록 surface 색으로 페이드 */
globalStyle(`.${dialogBody}::after`, {
  content: '""',
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "16px",
  background: "linear-gradient(to top, var(--surface) 0%, transparent 100%)",
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0,
  transition: "opacity 0.2s ease",
});
/* 상단 fade 표시 — middle / bottom 일 때 */
globalStyle(
  `.${dialogBody}[data-scroll-position="middle"]::before, .${dialogBody}[data-scroll-position="bottom"]::before`,
  { opacity: 1 },
);
/* 하단 fade 표시 — top / middle 일 때 */
globalStyle(
  `.${dialogBody}[data-scroll-position="top"]::after, .${dialogBody}[data-scroll-position="middle"]::after`,
  { opacity: 1 },
);
/* 어두운 코드 뷰어처럼 기본 fade 대비가 과도한 본문의 완화 변형 */
globalStyle(
  `.${dialogBody}[data-scroll-fade-tone="subtle"][data-scroll-position="middle"]::before, .${dialogBody}[data-scroll-fade-tone="subtle"][data-scroll-position="bottom"]::before, .${dialogBody}[data-scroll-fade-tone="subtle"][data-scroll-position="top"]::after, .${dialogBody}[data-scroll-fade-tone="subtle"][data-scroll-position="middle"]::after`,
  { opacity: 0.5 },
);

/* ===== ScrollArea wrapper — chrome 제거 + flex 로 Body 공간 채우기 =====
 * 핵심: height:100% 대신 flex:1 1 auto + minHeight:0 을 사용한다.
 * flex chain 을 끊기지 않게 하면 scrollContainer 가 flex 공간을 기반으로
 * 스크롤 영역을 정상 계산한다. */
export const bodyScrollAreaWrap = style({
  flex: "1 1 auto",
  minHeight: 0,
  width: "100%",
  border: "none",
  borderRadius: "0",
  background: "transparent",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});
/* ScrollArea 내부 scrollContainer 도 flex:1 + minHeight:0 */
globalStyle(`.${bodyScrollAreaWrap} > div`, {
  flex: "1 1 auto",
  minHeight: 0,
});

/* ScrollArea content — 좌우 24px 패딩 + flex gap */
export const bodyScrollAreaContent = style({
  padding: "0 24px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

/* ===== Footer — pt24 px24 gap8 ===== */
export const dialogFooter = style({
  display: "flex",
  alignContent: "flex-end",
  justifyContent: "flex-end",
  gap: "8px",
  padding: "24px",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});
```

### 13-4. Subheader 스타일 (`Dialog.css.ts` — markup 단)

```ts
import { style } from "@vanilla-extract/css";

/* Subheader — Segmented control 영역. pt12 pb16 px24. */
export const dialogSubheader = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "12px 24px 16px",
  flexShrink: 0,
  transition: "background-color 0.2s ease",
});
```
