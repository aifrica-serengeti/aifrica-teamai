# Icon Button — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`IconButton.css.ts`)

```ts
import { style, styleVariants } from "@vanilla-extract/css";

/**
 * Base — 모든 variant/size 가 공유하는 구조/상태 스타일.
 */
export const iconButtonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: 0,
  borderRadius: "4px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  backgroundColor: "transparent",
  cursor: "pointer",
  userSelect: "none",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음 */
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    // Focus — Button/Radio/Checkbox 와 동일한 1px stroke + 1px offset 패턴.
    "&:focus-visible": {
      outline: "1px solid var(--icon-btn-focus-border)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
  },
});

/**
 * Size — Figma 치수 정확 반영.
 *   Tiny (20px) / Medium (24px) / XLarge (32px)
 */
export const iconButtonSize = styleVariants({
  tiny: { width: "20px", height: "20px" },
  medium: { width: "24px", height: "24px" },
  xlarge: { width: "32px", height: "32px" },
});

/**
 * Variant — Outlined(테두리 있음) / Ghost(테두리 없음).
 * 두 variant 모두 hover/pressed 배경(반투명 overlay)은 동일.
 * Outlined 만 추가로 테두리를 가진다.
 */
export const iconButtonVariant = styleVariants({
  outlined: {
    borderColor: "var(--icon-btn-outlined-border)",
    selectors: {
      "&:hover:not(:disabled)": { backgroundColor: "var(--icon-btn-hover-bg)" },
      "&:active:not(:disabled)": {
        backgroundColor: "var(--icon-btn-pressed-bg)",
      },
      "&:disabled": { borderColor: "var(--icon-btn-outlined-border)" },
    },
  },
  ghost: {
    borderColor: "transparent",
    selectors: {
      "&:hover:not(:disabled)": { backgroundColor: "var(--icon-btn-hover-bg)" },
      "&:active:not(:disabled)": {
        backgroundColor: "var(--icon-btn-pressed-bg)",
      },
    },
  },
});
```

