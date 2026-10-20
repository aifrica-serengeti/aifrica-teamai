# Search — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](../README.md)

## 구현 내용

### 12.1 Search 스타일 — `Search.css.ts`

```ts
import { style } from "@vanilla-extract/css";

/** 루트 — Label ↔ input ↔ help 4px 간격 세로. */
export const field = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "4px",
  width: "100%",
  minWidth: 0,
  fontFamily: "var(--font-sans)",
});

/** Label 행. */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap",
});

/** Label 텍스트 — 14px SemiBold #1c1c1c. */
export const labelText = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "var(--text)",
  transition: "color 0.2s ease",
});

/** Input 래핑 — leading icon · close button 절대배치 기준. */
export const inputWrap = style({
  position: "relative",
  width: "100%",
  minWidth: 0,
});

/** Leading search icon — 좌측 절대배치, 세로 중앙. */
export const leadingIcon = style({
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--icon)",
  pointerEvents: "none",
  zIndex: 1,
  transition: "color 0.2s ease",
});

/** Trailing close button 컨테이너 — 우측 절대배치, 세로 중앙. */
export const trailing = style({
  position: "absolute",
  top: "50%",
  right: "8px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  pointerEvents: "none", // close button 이 pointer-events auto 로 클릭 회복
});

/** Close button — 원형 배경 + X 아이콘.
 *  회색 원형 배경(--icon-subtle, 라이트 #555555) + 흰 X(--icon-inverse, #ffffff). */
export const closeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  pointerEvents: "auto",
  cursor: "pointer",
  border: "none",
  padding: 0,
  background: "var(--icon-subtle)",
  color: "var(--icon-inverse)",
  flexShrink: 0,
  transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
  selectors: {
    "&:hover": { opacity: 0.8 },
    "&:active": { opacity: 0.6 },
    "&:focus-visible": {
      outline: "2px solid var(--border-primary)",
      outlineOffset: "2px",
    },
    "&:disabled": { cursor: "not-allowed", opacity: 0.4 },
  },
});

/** Help text — 12px #555. */
export const helpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});
```

