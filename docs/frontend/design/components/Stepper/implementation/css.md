# Stepper — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](../README.md)

## 구현 내용

### 12.3 CSS — Stepper.css.ts (전체)

```typescript
import { style } from "@vanilla-extract/css";

/* ── Stepper 컨테이너 ── */

export const stepperHorizontal = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "16px",
  fontFamily: "var(--font-sans)",
});

export const stepperVertical = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  fontFamily: "var(--font-sans)",
});

/* ── Stepper-item ── */

export const hItem = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flex: 1,
  minWidth: 0,
  selectors: {
    "&:last-child": { flex: "0 0 auto" },
  },
});

export const vItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flex: 1,
  minHeight: "64px",
  position: "relative",
});

export const stepRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "16px",
  width: "100%",
  flexShrink: 0,
});

export const iconLabelRow = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
});

/* ── Divider ── */

export const hDivider = style({
  flex: 1,
  height: "1px",
  minWidth: "8px",
  background: "var(--stepper-divider-incomplete)",
  transition: "background-color 0.2s ease",
});

export const vDividerWrap = style({
  flex: 1,
  display: "flex",
  // ⚠️ 반드시 stretch. center 로 두면 자식 vDivider 가 stretch 되지 않아
  // height: 100% 가 0px 로 계산되어 세로선이 보이지 않음 (§4 경고 참조).
  alignItems: "stretch",
  paddingLeft: "9.5px",
  paddingRight: "9.5px",
  paddingTop: "6px",
  paddingBottom: "6px",
  minHeight: "32px",
  alignSelf: "stretch",
});

export const vDivider = style({
  width: "1px",
  // ⚠️ height 속성 설정 금지. height: 100% 를 쓰면 flex 에서 부모 명시 height 가
  // 없을 때 0px 로 계산됨. 부모(align-items: stretch)가 자동으로 높이를 할당함 (§4 경고 참조).
  flexShrink: 0,
  background: "var(--stepper-divider-incomplete)",
  transition: "background-color 0.2s ease",
});

export const dividerCompleted = style({
  background: "var(--border-primary)",
});

/* ── Stepper-icon — 항상 20px ── */

export const iconSmall = style({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderWidth: "1px",
  borderStyle: "solid",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

export const iconMedium = style({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderWidth: "1.25px",
  borderStyle: "solid",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

/* 상태별 icon — semantic 토큰 참조 */
export const iconCompleted = style({
  background: "var(--stepper-icon-completed-bg)",
  borderColor: "var(--stepper-icon-completed-border)",
});

export const iconActive = style({
  background: "var(--stepper-icon-active-bg)",
  borderColor: "var(--stepper-icon-active-bg)",
});

export const iconIncomplete = style({
  background: "var(--stepper-icon-incomplete-bg)",
  borderColor: "var(--stepper-icon-incomplete-border)",
});

export const iconInvalid = style({
  background: "var(--stepper-icon-invalid-bg)",
  borderColor: "var(--stepper-icon-invalid-bg)",
});

export const iconDisabled = style({
  background: "var(--stepper-icon-disabled-bg)",
  borderColor: "var(--stepper-icon-disabled-border)",
});

/* ── Icon 내부 콘텐츠 (숫자/체크/X) ── */

export const iconContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "color 0.2s ease",
});

/* Small 숫자 — Bold(700) 10px/15px */
export const numberSmall = style({
  fontFamily: "var(--font-sans)",
  fontSize: "10px",
  fontWeight: 700,
  lineHeight: "15px",
  width: "8px",
  height: "16px",
});

/* Medium 숫자 — SemiBold(600) 12px/20px */
export const numberMedium = style({
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "20px",
  width: "12px",
  height: "20px",
});

export const numberInverse = style({
  color: "var(--stepper-number-inverse)",
});

export const numberDefault = style({
  color: "var(--stepper-number-default)",
});

export const numberDisabled = style({
  color: "var(--stepper-number-disabled)",
});

/* 체크/X SVG 마크 */
export const svgMark = style({
  display: "block",
});

/* ── Stepper-base (라벨) ── */

/* Small — Title2: SemiBold 14px/20px */
export const baseSmall = style({
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "20px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
});

/* Medium — Title1: SemiBold 16px/24px */
export const baseMedium = style({
  fontFamily: "var(--font-sans)",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
});

export const baseDefault = style({
  color: "var(--stepper-label-default)",
});

export const basePrimary = style({
  color: "var(--stepper-label-active)",
});

export const baseError = style({
  color: "var(--stepper-text-error)",
});

export const baseDisabledColor = style({
  color: "var(--stepper-number-disabled)",
});

/* ── 클릭 가능한 라벨 ── */

/* labelButton — font 속성 설정 금지! baseSmall/baseMedium 폰트가 적용되어야 함.
 * font: 'inherit' 이나 fontSize: 'inherit' 넣으면 vanilla-extract 후순위 클래스가
 * baseSmall 값을 덮어써서 버튼이 브라우저 기본 폰트(16px/400)로 렌더됨. */
export const labelButton = style({
  cursor: "pointer",
  background: "none",
  border: "none",
  padding: 0,
  outlineOffset: "2px",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      color: "var(--stepper-label-active)",
    },
    "&:focus-visible": {
      outline: "2px solid var(--stepper-icon-completed-border)",
      borderRadius: "2px",
    },
  },
});

export const labelButtonDisabled = style({
  cursor: "default",
  selectors: {
    "&:hover": {
      color: "var(--stepper-number-disabled)",
    },
  },
});

/* ── Help Text ── */

export const helpText = style({
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
});

export const helpTextDefault = style({
  color: "var(--text-subtle)",
});

export const helpTextDisabled = style({
  color: "var(--text-disabled)",
});

export const hHelpTextWrap = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "28px",
  flexShrink: 0,
});

export const vHelpText = style({
  position: "absolute",
  left: "28px",
  top: "20px",
});
```
