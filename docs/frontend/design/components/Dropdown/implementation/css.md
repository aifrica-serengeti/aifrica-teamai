# Dropdown — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](../README.md)

## 구현 내용

### Dropdown.css.ts

```ts
import { style, globalStyle } from "@vanilla-extract/css";

/* ===== Root 컨테이너 ===== */
export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
  width: "100%",
  minWidth: 0,
});

/* ===== Label 행 ===== */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

export const labelText = style({
  font: "var(--text-title2)",
  color: "var(--text)",
  transition: "color 0.2s ease",
});

export const optionalText = style({
  font: "var(--text-body3)",
  color: "var(--text-subtler)",
  transition: "color 0.2s ease",
});

export const requiredText = style({
  font: "var(--text-body2)",
  color: "var(--text-danger)",
  transition: "color 0.2s ease",
});

export const labelDisabled = style({
  color: "var(--text-disabled)",
  transition: "color 0.2s ease",
});

/* ===== Container (필드 + help text) ===== */
export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
  width: "100%",
});

/* ===== Field (trigger) =====
 * width: 100% + minWidth: fit-content 로 콘텐츠에 맞춰 자동 조정. */
export const field = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  width: "100%",
  minWidth: "fit-content",
  paddingLeft: "12px",
  paddingRight: "6px",
  borderRadius: "4px",
  border: "1px solid var(--btn-tertiary-border)",
  background: "var(--btn-tertiary-fill)",
  cursor: "pointer",
  outline: "none",
  font: "var(--text-body2)",
  color: "var(--btn-on-tertiary)",
  userSelect: "none",
  whiteSpace: "nowrap",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  selectors: {
    /* Size 변형 — 높이만 차등 */
    '&[data-size="small"]': { height: "28px" },
    '&[data-size="medium"]': { height: "32px" },
    '&[data-size="large"]': { height: "36px" },
    '&[data-size="xlarge"]': { height: "40px" },

    /* Hovered — disabled/read-only 제외.
       disabled 는 div 로 렌더되므로 :disabled 대신 [data-disabled] 속성 사용. */
    "&:hover:not([data-disabled]):not([data-readonly])": {
      background: "var(--btn-tertiary-fill-hover)",
    },

    /* Pressed */
    "&:active:not([data-disabled]):not([data-readonly])": {
      background: "var(--btn-tertiary-fill-pressed)",
    },

    /* Invalid — 실제 border-width 2px(Figma border-2 스펙) */
    '&[data-invalid="true"]': {
      border: "2px solid var(--border-error)",
    },

    /* Disabled — fill 유지, 흐린 텍스트 */
    "&[data-disabled]": {
      cursor: "not-allowed",
      background: "var(--btn-tertiary-fill-disabled)",
      borderColor: "var(--btn-tertiary-border)",
      color: "var(--btn-on-tertiary-disabled)",
    },

    /* Read-only — inactive 표면, 값 표시 */
    "&[data-readonly]": {
      cursor: "default",
      background: "var(--btn-tertiary-fill-readonly)",
      borderColor: "var(--btn-tertiary-border)",
    },
  },
});

/* ===== Focused line — 메뉴 열림(data-state="open")일 때 표시 ===== */
export const focusedLine = style({
  position: "absolute",
  top: "50%",
  left: "-3px",
  right: "-3px",
  transform: "translateY(-50%)",
  borderRadius: "6px",
  border: "1px solid var(--border-focused)",
  pointerEvents: "none",
  opacity: 0,
  transition: "border-color 0.2s ease, opacity 0.2s ease",
  selectors: {
    '&[data-size="small"]': { height: "32px" },
    '&[data-size="medium"]': { height: "36px" },
    '&[data-size="large"]': { height: "40px" },
    '&[data-size="xlarge"]': { height: "44px" },
  },
});

/* button[data-state="open"] 일 때 자식 focusedLine 노출 */
globalStyle(`[data-state="open"] > .${focusedLine}`, {
  opacity: "1",
});

/* invalid(field border 2px)일 때 focusedLine offset 을 넓힘 */
globalStyle(`[data-invalid="true"][data-state="open"] > .${focusedLine}`, {
  left: "-4px",
  right: "-4px",
});

/* ===== Placeholder / Selected text =====
 * color: inherit 로 field 의 color 를 상속(currentColor).
 * field 가 disabled 면 --btn-on-tertiary-disabled(#aaa),
 * enabled 면 --btn-on-tertiary(#1c1c1c) 가 자동 적용.
 * flex: '0 1 auto' 로 텍스트가 강제로 줄어들지 않게 한다(너비 자동 조정). */
export const fieldText = style({
  display: "flex",
  alignItems: "center",
  font: "var(--text-body2)",
  color: "inherit",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: "0 1 auto",
  minWidth: 0,
  transition: "color 0.2s ease",
});

/* placeholder 색상 — enabled 일 때만 덮어쓰기.
 * disabled field 의 currentColor(--btn-on-tertiary-disabled) 가 우선됨. */
export const placeholderText = style({
  color: "var(--text-subtler)",
  transition: "color 0.2s ease",
});

/* ===== Dropdown icon =====
 * color: inherit 로 field 의 색상을 상속.
 * Icon 컴포넌트에 style={{ color: 'inherit' }} 전달로 currentColor 강제. */
export const dropdownIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "inherit",
  transition: "transform 0.2s ease, color 0.2s ease",
  selectors: {
    '[data-state="open"] &': {
      transform: "rotate(180deg)",
    },
  },
});

/* ===== Help text / Error text ===== */
export const helpText = style({
  font: "var(--text-body3)",
  color: "var(--text-subtle)",
  transition: "color 0.2s ease",
});

export const errorText = style({
  font: "var(--text-body3)",
  color: "var(--text-error)",
  transition: "color 0.2s ease",
});
```

