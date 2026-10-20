# Input — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Input 문서 인덱스](../README.md)

## 구현 내용

### 12.1 Input primitive — `input.css.ts`

`reserveDescriptionSpace`를 지원할 때는 기존 `helpText`와 같은 typography를 적용한
`reservedDescription` 클래스에 `visibility: hidden`을 준다. 빈 내용은 `\u00a0`으로 한 줄 높이를
유지하며, 실제 Help/Error가 없으므로 접근성 설명에는 연결하지 않는다.

```ts
import { style } from "@vanilla-extract/css";

export const inputRoot = style({
  width: "100%",
  minWidth: 0,
  outline: "none",
  borderRadius: "4px",
  paddingLeft: "12px",
  paddingRight: "12px",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--form-text)",
  background: "var(--form-surface-active)",
  border: "1px solid var(--form-border-default)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  selectors: {
    "&::placeholder": {
      color: "var(--form-placeholder-active)",
      transition: "color 0.2s ease",
    },
    "&:-webkit-autofill": {
      WebkitTextFillColor: "var(--form-text)",
      transition: "background-color 9999s ease-out",
    },

    /* Size 변형 — 높이만 차등 */
    '&[data-size="small"]': { height: "28px" },
    '&[data-size="medium"]': { height: "32px" },
    '&[data-size="large"]': { height: "36px" },
    '&[data-size="xlarge"]': { height: "40px" },

    /* Create variant — 채워진 표면, border 없음 */
    '&[data-variant="create"]': {
      border: "1px solid transparent",
      background: "var(--form-surface-inactive)",
    },

    /* Focus — border 1px + inset shadow 1px = 시각적 2px (밀림 방지).
       read-only/disabled 는 시각적 focus 링 없음. */
    "&:focus:not([data-readonly]):not(:disabled)": {
      borderColor: "var(--form-border-active)",
      boxShadow: "inset 0 0 0 1px var(--form-border-active)",
      background: "var(--form-surface-active)",
    },
    '&[data-variant="create"]:focus:not([data-readonly]):not(:disabled)': {
      background: "var(--form-surface-active)",
    },

    /* Invalid — 동일 inset 기법. disabled 는 invalid 표시 억제. */
    '&[aria-invalid="true"]:not(:focus):not(:disabled)': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },
    '&[aria-invalid="true"]:focus:not([data-readonly]):not(:disabled)': {
      borderColor: "var(--form-border-invalid)",
      boxShadow: "inset 0 0 0 1px var(--form-border-invalid)",
    },

    /* Disabled */
    "&:disabled": {
      cursor: "not-allowed",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
      color: "var(--text-disabled)",
    },
    "&:disabled::placeholder": {
      color: "var(--form-placeholder-inactive)",
    },

    /* Read-only — inactive 표면, 값 텍스트는 enabled 색 유지 */
    "&[data-readonly]": {
      cursor: "default",
      background: "var(--form-surface-inactive)",
      borderColor: "var(--form-border-default)",
    },
  },
});
```
