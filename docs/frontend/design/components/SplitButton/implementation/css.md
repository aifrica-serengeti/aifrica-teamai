# Split Button — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](../README.md)

## 구현 내용

### 12-1. SplitButton 스타일 (`SplitButton.css.ts`)

```ts
import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

/* ===== Root — Primary + Secondary 를 한 줄로 묶는 컨테이너 ===== */
export const root = style({
  display: "inline-flex",
  alignItems: "stretch",
  flexShrink: 0,
  position: "relative",
  borderRadius: "4px",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

/* ===== Action 공통 base — Primary/Secondary 양쪽이 공유 =====
 * Tertiary Button 토큰으로 fill/border/color/hover/pressed/disabled 제어.
 * focus 시 z-index 로 형제 위에 올려 outline 이 가려지지 않게 한다. */
const actionBase = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontFamily: "var(--font-sans)",
  fontWeight: 400 /* Pretendard Regular — Button(600)과 다름 */,
  whiteSpace: "nowrap",
  cursor: "pointer",
  userSelect: "none",
  borderWidth: "1px",
  borderStyle: "solid",
  background: "var(--btn-tertiary-fill)",
  borderColor: "var(--btn-tertiary-border)",
  color: "var(--btn-on-tertiary)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--btn-tertiary-fill-hover)" },
    "&:active:not(:disabled)": {
      background: "var(--btn-tertiary-fill-pressed)",
    },
    "&:disabled": {
      background: "var(--btn-tertiary-fill-disabled)",
      color: "var(--btn-on-tertiary-disabled)",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    /* Focus — 1px outline + 1px gap.
     * z-index 로 형제 action/분할선 위에 올려 outline 이 온전히 보이게. */
    "&:focus-visible": {
      outline: "1px solid var(--btn-focus-border)",
      outlineOffset: "1px",
      position: "relative",
      zIndex: 1,
    },
    "&::-moz-focus-inner": { border: 0 },
  },
});

/* ===== Primary action — 아이콘만 있는 정사각 버튼 =====
 * 좌측만 radius. marginRight:-1px 로 Secondary 좌측 border 와 겹쳐 분할선 생성. */
export const primaryAction = style([
  actionBase,
  {
    borderRadius: "4px 0 0 4px",
    marginRight: "-1px",
  },
]);

export const primaryActionSize = styleVariants({
  tiny: { width: "24px", height: "24px", padding: 0 },
  small: { width: "28px", height: "28px", padding: 0 },
  medium: { width: "32px", height: "32px", padding: 0 },
  large: { width: "40px", height: "40px", padding: 0 },
});

/* ===== Secondary action — leading icon + Label + chevron =====
 * 우측만 radius. 좌측 border 는 Primary 의 margin:-1px 로 겹쳐 분할선이 됨. */
export const secondaryAction = style([
  actionBase,
  {
    borderRadius: "0 4px 4px 0",
  },
]);

export const secondaryActionSize = styleVariants({
  tiny: {
    paddingInline: "8px",
    paddingBlock: 0,
    height: "24px",
    gap: "2px",
    fontSize: "12px",
    lineHeight: "16px",
  },
  small: {
    paddingInline: "8px",
    paddingBlock: 0,
    height: "28px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  medium: {
    paddingInline: "12px",
    paddingBlock: 0,
    height: "32px",
    gap: "4px",
    fontSize: "14px",
    lineHeight: "20px",
  },
  large: {
    paddingInline: "16px",
    paddingBlock: 0,
    height: "40px",
    gap: "4px",
    fontSize: "16px",
    lineHeight: "24px",
  },
});

/* ===== Active (메뉴 열림) — Secondary 가 pressed 색상 유지 ===== */
export const secondaryActionActive = style({
  selectors: {
    /* Radix 가 trigger(button) 에 data-state="open" 설정. hover 보다 뒤에 선언되어 우선. */
    '&[data-state="open"]': { background: "var(--btn-tertiary-fill-pressed)" },
  },
});

/* ===== Label 텍스트 — 색상은 부모 action 에서 상속 ===== */
export const label = style({
  color: "inherit",
  transition: "color 0.2s ease",
});

/* ===== Icon(svg) — 축소 방지(flexShrink: 0)로 chevron/아이콘 잘림 방지 ===== */
globalStyle(`${root} svg`, { flexShrink: 0 });

/* ===== Chevron 회전 — 메뉴 열림 시 down→up (180°) ===== */
export const chevron = style({
  transition: "transform 0.15s ease",
  selectors: {
    /* 부모 button[data-state="open"] > chevron 매칭 */
    'button[data-state="open"] > &': { transform: "rotate(180deg)" },
  },
});
```
