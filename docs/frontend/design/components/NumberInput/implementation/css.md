# Number Input — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](../README.md)

## 구현 내용

### NumberInput.css.ts

```ts
import { style } from "@vanilla-extract/css";

/** 루트 — Label ↔ container ↔ help 4px 간격 세로. */
export const field = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "4px",
  width: "100%",
  minWidth: 0,
  fontFamily: "var(--font-sans)",
});

/** Label 행 — label + (선택사항) + * + info icon. gap 2px. */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap",
});

export const labelText = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "var(--text)",
  transition: "color 0.2s ease",
});

export const optionalText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtler)",
  transition: "color 0.2s ease",
});

export const requiredMark = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text-danger)",
  transition: "color 0.2s ease",
});

export const infoIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "14px",
  height: "14px",
  color: "var(--icon)",
  flexShrink: 0,
  transition: "color 0.2s ease",
});

/** Container — input + trailing 증감 버튼을 품는 박스. */
export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minWidth: 0,
  paddingLeft: "12px",
  paddingRight: "4px",
  borderRadius: "4px",
  background: "var(--form-surface-active)",
  border: "1px solid var(--form-border-default)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    '&[data-size="small"]': { height: "28px", paddingRight: "6px" },
    '&[data-size="medium"]': { height: "32px" },
    '&[data-size="large"]': { height: "36px" },
    '&[data-size="xlarge"]': { height: "40px" },

    '&[data-variant="create"]': {
      border: "1px solid transparent",
      background: "var(--form-surface-inactive)",
    },

    // Focus — 2px = border 1px + inset 1px (밀림 방지)
    '&[data-focused="true"]:not([data-readonly="true"]):not([data-disabled="true"])':
      {
        borderColor: "var(--form-border-active)",
        boxShadow: "inset 0 0 0 1px var(--form-border-active)",
        background: "var(--form-surface-active)",
      },

    // Invalid — disabled 가 최우선
    '&[data-invalid="true"]:not([data-disabled="true"]):not([data-focused="true"])':
      {
        borderColor: "var(--form-border-invalid)",
        boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
      },
    '&[data-invalid="true"][data-focused="true"]:not([data-disabled="true"])': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },

    '&[data-disabled="true"]': {
      cursor: "not-allowed",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },

    '&[data-readonly="true"]': {
      cursor: "default",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },
  },
});

/** 숨은 input — container 안에서 실제 입력. 배경/보더는 container 담당. */
export const input = style({
  flex: 1,
  minWidth: 0,
  height: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  padding: 0,
  margin: 0,
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--form-text)",
  transition: "color 0.2s ease",
  selectors: {
    "&::placeholder": {
      color: "var(--form-placeholder-active)",
      transition: "color 0.2s ease",
    },
    // 브라우저 기본 number spinner 제거
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    '&[type="number"]': { MozAppearance: "textfield" },
    "&:disabled": { color: "var(--text-disabled)", cursor: "not-allowed" },
    "&:disabled::placeholder": { color: "var(--form-placeholder-inactive)" },
  },
});

/**
 * Trailing — 증감 버튼 그룹. IconButton(ghost variant) 사용.
 * −/+ 버튼은 모든 사이즈에서 서로 붙어 있어야 함(gap 없음).
 */
export const trailing = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

export const helpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: { '&[data-invalid="true"]': { color: "var(--text-error)" } },
});
```

