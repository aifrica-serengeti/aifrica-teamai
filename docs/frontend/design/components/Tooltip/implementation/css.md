# Tooltip — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](../README.md)

## 구현 내용

### 11.3 tooltip.css.ts (전체)

```ts
import { style, keyframes } from "@vanilla-extract/css";

const SLIDE = "6px";

// 등장 애니메이션
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

// 퇴장 애니메이션
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

export const tooltipContent = style({
  borderRadius: "4px",
  background: "var(--surface-inverse)",
  color: "var(--text-inverse)",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: 0,
  textAlign: "center",
  padding: "4px 8px",
  whiteSpace: "nowrap",
  transition: "background-color 0.2s ease, color 0.2s ease",
  zIndex: 50,
  boxSizing: "border-box",
  animationDuration: "0.15s",
  animationTimingFunction: "ease",
  animationFillMode: "both",
  selectors: {
    // Standard variant
    '&[data-variant="standard"]': {
      padding: "8px 12px",
      maxWidth: "320px",
      maxHeight: "160px",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },
    // 등장
    '&[data-state="delayed-open"][data-side="top"], &[data-state="instant-open"][data-side="top"]':
      { animationName: fadeInUp },
    '&[data-state="delayed-open"][data-side="bottom"], &[data-state="instant-open"][data-side="bottom"]':
      { animationName: fadeInDown },
    '&[data-state="delayed-open"][data-side="left"], &[data-state="instant-open"][data-side="left"]':
      { animationName: fadeInLeft },
    '&[data-state="delayed-open"][data-side="right"], &[data-state="instant-open"][data-side="right"]':
      { animationName: fadeInRight },
    // 퇴장 (Radix는 닫힐 때 data-side 유지)
    '&[data-state="closed"][data-side="top"]': { animationName: fadeOutUp },
    '&[data-state="closed"][data-side="bottom"]': {
      animationName: fadeOutDown,
    },
    '&[data-state="closed"][data-side="left"]': { animationName: fadeOutLeft },
    '&[data-state="closed"][data-side="right"]': {
      animationName: fadeOutRight,
    },
  },
});

export const tooltipArrow = style({
  position: "absolute",
  display: "flex",
  width: "20px",
  height: "11px",
  color: "var(--surface-inverse)",
  transition: "color 0.2s ease",
  pointerEvents: "none",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    // Top — content 하단에서 아래로. 뾰족한 끝이 위(content).
    '&[data-side="top"]': {
      bottom: "-4px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    '&[data-side="top"][data-align="start"]': {
      left: "8px",
      transform: "none",
    },
    '&[data-side="top"][data-align="end"]': {
      left: "auto",
      right: "8px",
      transform: "none",
    },
    // Bottom — content 상단에서 위로. 뾰족한 끝이 아래(content).
    '&[data-side="bottom"]': {
      top: "-4px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    '&[data-side="bottom"][data-align="start"]': {
      left: "8px",
      transform: "none",
    },
    '&[data-side="bottom"][data-align="end"]': {
      left: "auto",
      right: "8px",
      transform: "none",
    },
    // Left — content 우측에서 오른쪽으로. 세로 래퍼(11×20). 뾰족한 끝이 왼쪽(content).
    '&[data-side="left"]': {
      width: "11px",
      height: "20px",
      right: "-4px",
      top: "50%",
      transform: "translateY(-50%)",
    },
    '&[data-side="left"][data-align="start"]': {
      top: "8px",
      transform: "none",
    },
    '&[data-side="left"][data-align="end"]': {
      top: "auto",
      bottom: "8px",
      transform: "none",
    },
    // Right — content 좌측에서 왼쪽으로. 세로 래퍼(11×20). 뾰족한 끝이 오른쪽(content).
    '&[data-side="right"]': {
      width: "11px",
      height: "20px",
      left: "-4px",
      top: "50%",
      transform: "translateY(-50%)",
    },
    '&[data-side="right"][data-align="start"]': {
      top: "8px",
      transform: "none",
    },
    '&[data-side="right"][data-align="end"]': {
      top: "auto",
      bottom: "8px",
      transform: "none",
    },
  },
});
```

