# Spinner — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Spinner 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Spinner.css.ts`)

```ts
import { style, styleVariants, keyframes } from "@vanilla-extract/css";

/** 시계 방향 무한 회전 keyframes. */
const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

/* Spinner 루트 — 인라인 SVG 컨테이너. 회전 애니메이션 적용. */
export const spinner = style({
  display: "inline-flex",
  flexShrink: 0,
  animationName: spin,
  animationDuration: "var(--spinner-speed)",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});

/* 인라인 SVG — viewBox 48×48 고정, CSS 로 크기만 조절. */
export const spinnerSvg = style({
  display: "block",
  width: "100%",
  height: "100%",
});

/* Track circle stroke — 다크 모드 전환(색상만, 0.2s). */
export const spinnerTrackStroke = style({
  stroke: "var(--spinner-track)",
  transition: "stroke 0.2s ease",
});

/* Indicator path stroke — 다크 모드 전환(색상만, 0.2s). */
export const spinnerIndicatorStroke = style({
  transition: "stroke 0.2s ease",
});

/* Size variants — 박스 크기 + stroke 두께(물리 px, non-scaling-stroke). */
export const spinnerSize = styleVariants({
  tiny: {
    width: "16px",
    height: "16px",
    vars: { "--spinner-stroke-width": "2" },
  },
  small: {
    width: "20px",
    height: "20px",
    vars: { "--spinner-stroke-width": "2" },
  },
  medium: {
    width: "24px",
    height: "24px",
    vars: { "--spinner-stroke-width": "2" },
  },
  large: {
    width: "36px",
    height: "36px",
    vars: { "--spinner-stroke-width": "3" },
  },
  xlarge: {
    width: "48px",
    height: "48px",
    vars: { "--spinner-stroke-width": "4" },
  },
});
```

