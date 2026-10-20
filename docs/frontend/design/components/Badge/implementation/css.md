# Badge — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Badge.css.ts`)

```ts
import { style, styleVariants } from "@vanilla-extract/css";

/* Dot badge — 단순 원형 알림. */
export const badgeDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "var(--element-point)",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition: "background-color 0.2s ease",
});

/* Counter badge — 공통 박스 규칙. */
export const badgeCounterBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "16px",
  minWidth: "16px",
  paddingInline: "4px",
  borderRadius: "8px",
  background: "var(--element-point)",
  color: "var(--element-on-point)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "10px",
  lineHeight: "12px",
  textAlign: "center",
  whiteSpace: "nowrap",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition: "background-color 0.2s ease, color 0.2s ease",
});

/* Counter variant 차분 — 캡핑 여부와 무관하게 동일 박스 규칙. */
export const badgeCounter = styleVariants({
  counter: { flexShrink: 0 },
  counterMax: { flexShrink: 0 },
});
```

