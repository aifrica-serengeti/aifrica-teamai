# Radio & Radio Group — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Radio & Radio Group 문서 인덱스](../README.md)

## 구현 내용

### RadioItem 스타일 (`radio-group.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const radioItem = style({
  position: "relative",
  display: "inline-grid",
  width: "32px",
  height: "32px",
  boxSizing: "border-box",
  placeItems: "center",
  flexShrink: 0,
  padding: 0,
  border: 0,
  background: "transparent",
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      width: "16px",
      height: "16px",
      boxSizing: "border-box",
      border: "1px solid var(--border-bolder)",
      borderRadius: "50%",
      background: "var(--element-default)",
      transition:
        "background-color 0.2s ease, border-color 0.2s ease, outline-color 0.2s ease",
    },
    "&:focus-visible::before": {
      outline: "1px solid var(--element-primary)",
      outlineOffset: "1px",
    },
    "&[data-disabled]:not([data-readonly])": { cursor: "not-allowed" },
    "&[data-readonly]": { cursor: "default" },
    '&[data-state="checked"]::before': {
      borderColor: "var(--element-primary)",
      background: "var(--element-primary)",
    },
    '&[data-disabled]:not([data-readonly]):not([data-state="checked"])::before':
      {
        borderColor: "var(--border-disabled-subtle)",
      },
    '&[data-disabled]:not([data-readonly])[data-state="checked"]::before': {
      borderColor: "var(--border-disabled-fill)",
      background: "var(--element-disabled)",
    },
    '&[aria-invalid="true"]:not([data-state="checked"]):not([data-disabled])::before':
      {
        borderColor: "var(--border-danger)",
      },
    '&[aria-invalid="true"][data-state="checked"]:not([data-disabled])::before':
      {
        borderColor: "var(--border-danger)",
        background: "var(--border-danger)",
      },
  },
});

export const radioDot = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex: 1,
  width: "7px",
  height: "7px",
  borderRadius: "50%",
  background: "var(--element-on-primary)",
  transform: "translate(-50%, -50%)",
});
```

### Radio Group 래퍼 스타일 (`RadioGroup.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

export const group = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
  fontFamily: "var(--font-sans)",
});

export const groupLabelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

export const groupLabel = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "var(--text)",
  transition: "color 0.2s ease",
});

export const groupOptional = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtler)",
  transition: "color 0.2s ease",
});

export const groupRequired = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text-danger)",
  opacity: 0.8,
  transition: "color 0.2s ease",
});

export const groupInfoIcon = style({
  color: "var(--icon-subtle)",
  transition: "color 0.2s ease",
});

export const groupHelpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});

export const groupErrorText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-danger)",
  margin: 0,
  transition: "color 0.2s ease",
});

export const groupItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0",
  cursor: "pointer",
  userSelect: "none",
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
    // read-only 면 default (선택 불가하지만 비활성 느낌은 아님).
    "&[data-readonly]": { cursor: "default" },
  },
});

export const groupItemRadioWrap = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
});

export const groupItemLabel = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text)",
  transition: "color 0.2s ease",
  selectors: {
    // 직접 부모 label[data-disabled] 만 매칭 (Radix data-disabled 간섭 차단).
    // read-only 는 label data-disabled 가 없으므로 enabled 색 유지.
    "label[data-disabled] > &": { color: "var(--text-disabled-bold)" },
    // hover 시 살짝 밝은 텍스트 톤 — disabled/read-only 제외.
    ":where(label:not([data-disabled]):not([data-readonly])):hover &": {
      color: "var(--text-subtle)",
    },
  },
});

export const groupItemHelpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  transition: "color 0.2s ease",
  selectors: {
    "label[data-disabled] &": { color: "var(--text-disabled)" },
    ":where(label:not([data-disabled]):not([data-readonly])):hover &": {
      color: "var(--text-subtler)",
    },
  },
});
```
