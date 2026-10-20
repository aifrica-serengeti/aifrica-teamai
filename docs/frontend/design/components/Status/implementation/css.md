# Status — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Status 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Status.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

/* Status 컨테이너 — icon + label 가로 정렬. */
export const status = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontFamily: "var(--font-sans)",
});

/* 아이콘 래퍼 — 20×20 고정. Status 는 단일 사이즈만 지원.
 * SVG 가 박스를 채운다(width/height 100%). */
export const statusIcon = style({
  width: "20px",
  height: "20px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition: "color 0.2s ease",
});

/* SVG 자체는 width/height 100% 로 래퍼에 맞춤. */
export const statusSvg = style({
  width: "100%",
  height: "100%",
  display: "block",
});

/* In progress 전용 Spinner 래퍼 — 공용 Spinner(size=small)의 실제 크기는 유지하고,
 * 다른 Status 아이콘과 같은 20×20px 레이아웃 영역을 차지한다. */
export const statusSpinner = style({
  width: "20px",
  height: "20px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

/* Label — Body2 (Pretendard Regular 14px / 20px). 색상 --text. */
export const statusLabel = style({
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: "0",
  color: "var(--text)",
  whiteSpace: "nowrap",
  margin: 0,
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition: "color 0.2s ease",
});
```

