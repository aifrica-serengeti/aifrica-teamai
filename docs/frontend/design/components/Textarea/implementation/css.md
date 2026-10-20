# Textarea — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](../README.md)

## 구현 내용

### 12.1 Textarea primitive — `textarea.css.ts`

```ts
import { style } from "@vanilla-extract/css";

export const textareaRoot = style({
  width: "100%",
  minWidth: 0,
  // 기본 3줄: lineHeight 20px × 3 + 상하 패딩 24px = 84px.
  // height 명시 고정 — 브라우저 textarea 기본 rows 계산이 인라인 height 를 주입해서
  // minHeight 를 무시하는 것을 방지.
  height: "84px",
  outline: "none",
  resize: "vertical",
  paddingTop: "12px",
  paddingBottom: "12px",
  paddingLeft: "12px",
  paddingRight: "12px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--form-text)",
  background: "var(--form-surface-active)",
  border: "1px solid var(--form-border-default)",
  borderRadius: "4px",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  // Firefox — 얇은 스크롤바
  scrollbarWidth: "thin",
  scrollbarColor: "var(--scrollbar-thumb-fill) transparent",
  selectors: {
    "&::placeholder": {
      color: "var(--form-placeholder-active)",
      transition: "color 0.2s ease",
    },

    // 내장 스크롤바 — 4px thumb (WebKit)
    "&::-webkit-scrollbar": { width: "4px", height: "4px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--scrollbar-thumb-fill)",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "var(--scrollbar-thumb-hover)",
    },

    // Create variant — 채워진 표면, border 없음
    '&[data-variant="create"]': {
      border: "1px solid transparent",
      background: "var(--form-surface-inactive)",
    },

    // Focus — default variant 만 surface #fff 전환.
    // create variant 는 surface #f8f8f8 유지(Figma: create/surface/active = #f8f8f8).
    '&[data-variant="default"]:focus:not([data-readonly]):not(:disabled)': {
      borderColor: "var(--form-border-active)",
      boxShadow: "inset 0 0 0 1px var(--form-border-active)",
      background: "var(--form-surface-active)",
    },
    '&[data-variant="create"]:focus:not([data-readonly]):not(:disabled)': {
      borderColor: "var(--form-border-active)",
      boxShadow: "inset 0 0 0 1px var(--form-border-active)",
      background: "var(--form-surface-inactive)",
    },

    // Invalid — inset 기법으로 2px 표현. disabled 시 억제.
    '&[aria-invalid="true"]:not(:focus):not(:disabled)': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },
    '&[aria-invalid="true"]:focus:not([data-readonly]):not(:disabled)': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },

    // Disabled
    "&:disabled": {
      cursor: "not-allowed",
      resize: "none",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
      color: "var(--text-disabled)",
    },
    "&:disabled::placeholder": { color: "var(--form-placeholder-inactive)" },

    // Read-only — inactive 표면, 값 텍스트는 enabled 색 유지, resize 차단
    "&[data-readonly]": {
      cursor: "default",
      resize: "none",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },
  },
});
```

### 12.4 Field wrapper 스타일 — `TextareaField.css.ts`

```ts
import { style } from "@vanilla-extract/css";

/** 루트 — Label 행 ↔ textarea ↔ help/error 4px 간격 세로. */
export const field = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "4px",
  width: "100%",
  minWidth: 0,
  fontFamily: "var(--font-sans)",
});

/** Label 행 — 좌측 그룹과 우측 counter 를 space-between 으로 분리. */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  flexWrap: "wrap",
});

/** Label 좌측 그룹 — Label · (선택사항) · * · info (gap 2px). */
export const labelGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap",
  minWidth: 0,
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
  opacity: 0.8,
  transition: "color 0.2s ease",
});

export const infoIcon = style({
  color: "var(--icon-subtle)",
  flexShrink: 0,
  transition: "color 0.2s ease",
});

export const helpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});

export const counter = style({
  fontSize: "12px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text-subtler)",
  flexShrink: 0,
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

export const errorText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-danger)",
  margin: 0,
  transition: "color 0.2s ease",
});
```

---

