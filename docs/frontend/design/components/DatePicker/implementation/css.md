# Date Picker — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](../README.md)

## 구현 내용

### Range/Popover 전용 CSS

```ts
import { style, keyframes, globalStyle } from "@vanilla-extract/css";

const calendarEnter = keyframes({
  from: { opacity: 0, transform: "translateY(var(--date-picker-slide-y))" },
  to: { opacity: 1, transform: "translateY(0)" },
});
const calendarExit = keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(var(--date-picker-slide-y))" },
});

export const inputWrap = style({
  position: "relative",
  width: "100%",
  minWidth: 0,
});

export const singleInput = style({ paddingRight: "40px" });

export const calendarButton = style({
  position: "absolute",
  top: "50%",
  right: "3px",
  transform: "translateY(-50%)",
  zIndex: 1,
});

export const smallCalendarButton = style({ right: "5px" });

// Dialog보다 뒤에 생성되는 body Portal. Calendar의 외곽 링만 Menu 그림자로 대체한다.
export const calendarPopover = style({
  zIndex: 50,
  maxHeight: "var(--radix-popover-content-available-height)",
  borderRadius: "8px",
  boxShadow: "var(--menu-shadow)",
  vars: {
    "--cal-shadow": "none",
    "--date-picker-slide-y": "-6px",
  },
  transformOrigin: "var(--radix-popover-content-transform-origin)",
  animationDuration: "0.15s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    '&[data-side="top"]': { vars: { "--date-picker-slide-y": "6px" } },
    '&[data-state="open"]': { animationName: calendarEnter },
    '&[data-state="closed"]': {
      animationName: calendarExit,
      pointerEvents: "none",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: { "&[data-state]": { animation: "none" } },
    },
  },
});

export const calendarScrollArea = style({
  width: "max-content",
  height: "auto",
  maxHeight: "var(--radix-popover-content-available-height)",
  border: 0,
  background: "transparent",
});
export const calendarScrollContent = style({ padding: 0 });
globalStyle(`${calendarScrollArea} > [data-slot="scroll-container"]`, {
  maxHeight: "var(--radix-popover-content-available-height)",
  overscrollBehavior: "contain",
});

export const rangeControl = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  width: "100%",
  minWidth: 0,
  height: "32px",
  paddingLeft: "12px",
  paddingRight: "36px",
  border: "1px solid var(--form-border-default)",
  borderRadius: "4px",
  background: "var(--form-surface-active)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  selectors: {
    '&[data-size="small"]': { height: "28px" },
    '&[data-size="large"]': { height: "36px" },
    '&[data-size="xlarge"]': { height: "40px" },
    "&:focus-within:not([data-readonly]):not([data-disabled])": {
      borderColor: "var(--form-border-active)",
      boxShadow: "inset 0 0 0 1px var(--form-border-active)",
    },
    '&[aria-invalid="true"]:not([data-disabled])': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },
    "&[data-disabled], &[data-readonly]": {
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },
  },
});

export const rangeInput = style({
  flex: "0 0 88px",
  width: "88px",
  minWidth: 0,
  height: "100%",
  padding: 0,
  border: 0,
  outline: 0,
  background: "transparent",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  color: "var(--form-text)",
  transition: "color 0.2s ease",
  selectors: {
    "&::placeholder": { color: "var(--form-placeholder-active)", opacity: 1 },
  },
});

export const rangeDivider = style({
  flexShrink: 0,
  width: "6px",
  height: "1px",
  background: "var(--border-inverse)",
  transition: "background-color 0.2s ease",
});

export const errorText = style({
  margin: 0,
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  lineHeight: "16px",
  color: "var(--text-error)",
  transition: "color 0.2s ease",
});
```
