# Text Button — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`TextButton.css.ts`)

```ts
import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

/**
 * Base — 모든 size 가 공유하는 구조/상태 스타일.
 * 테두리 없음. enabled 배경 투명. hover/pressed 만 회색 오버레이.
 */
export const textButtonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: "4px",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  cursor: "pointer",
  userSelect: "none",
  background: "var(--text-btn-fill)",
  color: "var(--text-btn-label)",
  transition: "background-color 0.2s ease, color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--text-btn-fill-hover)" },
    "&:active:not(:disabled)": { background: "var(--text-btn-fill-pressed)" },
    "&:disabled": {
      color: "var(--text-btn-label-disabled)",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    // Focus — Figma "Focused" state. 1px outline + 1px gap.
    // Button/Radio/Checkbox 와 동일한 패턴.
    "&:focus-visible": {
      outline: "1px solid var(--text-btn-focus-border)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
  },
});

/**
 * Size — height / padding / gap / font-size / line-height.
 */
export const textButtonSize = styleVariants({
  tiny: {
    height: "24px",
    padding: "4px",
    gap: "2px",
    fontSize: "12px",
    lineHeight: "16px",
  },
  small: {
    height: "28px",
    padding: "4px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  medium: {
    height: "32px",
    padding: "4px 8px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  large: {
    height: "40px",
    padding: "4px 8px",
    gap: "4px",
    fontSize: "16px",
    lineHeight: "24px",
  },
});

/* 아이콘(svg) — Icon 컴포넌트가 size/strokeWidth 를 직접 제어하므로
 * TextButton 은 flexShrink 만 보장한다. */
globalStyle(`${textButtonBase} svg`, { flexShrink: 0 });
```

