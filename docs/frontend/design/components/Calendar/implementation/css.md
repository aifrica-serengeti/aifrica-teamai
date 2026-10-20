# Calendar — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](../README.md)

## 구현 내용

### 12-1. Calendar.css.ts (vanilla-extract)

> 모든 색상이 `--cal-*` 전용 토큰을 참조한다. 전역 `--surface`/`--text` 등을 직접
> 사용하지 않는다 (다크 모드에서 Figma 값이 다르기 때문).

```ts
import { style } from "@vanilla-extract/css";

/* 컨테이너 */
export const calendar = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "288px",
  paddingBlock: "4px",
  borderRadius: "8px",
  border: "1px solid var(--cal-border)",
  background: "var(--cal-surface)",
  boxShadow: "var(--cal-shadow)",
  overflow: "clip",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
});

/* Header */
export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 16px",
  flexShrink: 0,
});

export const headerLabel = style({
  background: "var(--cal-default-mid)",
  padding: "2px 4px 2px 12px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--cal-default-mid-hovered)" },
    "&:active:not(:disabled)": { background: "var(--cal-default-mid-pressed)" },
  },
});

export const headerNav = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
});

/* Divider */
export const divider = style({
  height: "0",
  width: "100%",
  flexShrink: 0,
  borderTop: "1px solid var(--cal-border)",
  transition: "border-color 0.2s ease",
});

/* Weekdays */
export const weekdays = style({
  display: "flex",
  alignItems: "flex-start",
  height: "38px",
  padding: "8px 16px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "20px",
  color: "var(--cal-text)",
  flexShrink: 0,
});

export const weekdayCell = style({
  flex: "1 0 0",
  minWidth: 0,
  textAlign: "center",
  transition: "color 0.2s ease",
  selectors: {
    '&[data-sunday="true"]': { color: "var(--text-danger)" },
  },
});

/* Date grid */
export const dateGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "0 16px 16px",
  flexShrink: 0,
});

export const week = style({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
});

export const dateCell = style({
  position: "relative",
  flex: "1 0 0",
  height: "32px",
  minWidth: 0,
});

export const dateButton = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "32px",
  height: "32px",
  zIndex: 1 /* range fill 의사요소 위에 원형 */,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  borderRadius: "50%",
  border: "none",
  background: "transparent",
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "var(--cal-text)",
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color 0.2s ease, color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--cal-date-hover)" },
    "&:active:not(:disabled)": { background: "var(--cal-date-pressed)" },
    "&:disabled": {
      cursor: "default",
      pointerEvents: "none",
      color: "var(--text-disabled)",
    },
    "&:focus-visible": {
      outline: "1px solid var(--border-primary)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
    '&[data-state="selected"]': {
      background: "var(--cal-selected-fill)",
      color: "var(--text-on-primary)",
    },
    '&[data-state="selected"]:hover': {
      background: "var(--cal-selected-fill)",
    },
    '&[data-state="range-start"], &[data-state="range-end"]': {
      background: "var(--cal-selected-fill)",
      color: "var(--text-on-primary)",
    },
    '&[data-state="range-start"]:hover, &[data-state="range-end"]:hover': {
      background: "var(--cal-selected-fill)",
    },
    '&[data-state="current"]': {
      color: "var(--cal-text-primary)",
      fontWeight: 600,
    },
    /* range-middle hover/pressed — alpha overlay */
    '&[data-state="range-middle"]:hover:not(:disabled)': {
      background: "var(--cal-range-hover)",
    },
    '&[data-state="range-middle"]:active:not(:disabled)': {
      background: "var(--cal-range-pressed)",
    },
    /* holiday */
    '&[data-state="default"][data-holiday="true"]:not(:disabled)': { color: "var(--text-danger)" },
    '&[data-state="current"][data-holiday="true"]:not(:disabled)': {
      color: "var(--text-danger)",
      fontWeight: 600,
    },
  },
});

/* Current-indicator 점 */
export const currentDot = style({
  position: "absolute",
  bottom: "2px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2 /* dateButton(zIndex:1) 위 */,
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: "var(--element-primary)",
  transition: "background-color 0.2s ease",
  pointerEvents: "none",
  selectors: {
    '&[data-hidden="true"]': { display: "none" },
  },
});

/* Range fill — dateCell 의 의사요소 */
export const dateCellRangeMiddle = style({
  background: "var(--cal-range-fill)",
  transition: "background-color 0.2s ease",
});

export const dateCellRangeStart = style({
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      top: 0,
      right: 0,
      width: "50%",
      height: "100%",
      background: "var(--cal-range-fill)",
      transition: "background-color 0.2s ease",
      pointerEvents: "none",
    },
  },
});

export const dateCellRangeEnd = style({
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      width: "50%",
      height: "100%",
      background: "var(--cal-range-fill)",
      transition: "background-color 0.2s ease",
      pointerEvents: "none",
    },
  },
});

/* Month / Year view */
export const monthYearBody = style({
  display: "flex",
  flex: "1 1 0",
  flexDirection: "column",
  padding: "8px 16px 16px",
  flexShrink: 0,
});

export const monthYearRow = style({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  flex: "1 0 0",
});

export const monthYearCell = style({
  position: "relative",
  flex: "1 0 0",
  minWidth: 0,
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 4px",
  whiteSpace: "nowrap",
  borderRadius: "8px",
  border: "none",
  background: "transparent",
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  color: "var(--cal-text)",
  textAlign: "center",
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color 0.2s ease, color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--cal-date-hover)" },
    "&:active:not(:disabled)": { background: "var(--cal-date-pressed)" },
    "&:focus-visible": {
      outline: "1px solid var(--border-primary)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
    '&[data-current="true"]': {
      color: "var(--cal-text-primary)",
      fontWeight: 600,
    },
    "&:disabled": { color: "var(--text-disabled)", cursor: "not-allowed" },
  },
});

export const monthYearDot = style({
  position: "absolute",
  bottom: "4px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: "var(--element-primary)",
  transition: "background-color 0.2s ease",
  pointerEvents: "none",
});

/* Footer */
export const footer = style({
  display: "flex",
  gap: "8px",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: "0 16px 12px",
  flexShrink: 0,
});
```
