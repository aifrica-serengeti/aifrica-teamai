# Chip — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Chip.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

/* Chip 루트 — 컨테이너. data-* 속성으로 색상/치수/형태 제어. */
export const chipRoot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: 0,
  whiteSpace: "nowrap",
  userSelect: "none",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",

  selectors: {
    /* Size */
    '&[data-size="small"]': {
      height: "20px",
      maxWidth: "200px",
      paddingInline: "8px",
    },
    '&[data-size="medium"]': {
      height: "24px",
      maxWidth: "240px",
      paddingInline: "8px",
    },

    /* Shape × Size (radius) */
    '&[data-shape="pill"][data-size="small"]': { borderRadius: "10px" },
    '&[data-shape="pill"][data-size="medium"]': { borderRadius: "12px" },
    '&[data-shape="rounded"]': { borderRadius: "4px" },

    /* Variant: filled — 진한 배경 + 흰 글자. gray는 반전, default는 gray-subtle+본문 글자 */
    '&[data-variant="filled"][data-color="gray"]': {
      background: "var(--chip-filled-gray)",
      color: "var(--chip-on-fill-inverse)",
    },
    '&[data-variant="filled"][data-color="default"]': {
      background: "var(--chip-subtle-gray)",
      color: "var(--text)",
    },
    '&[data-variant="filled"][data-color="green"]': {
      background: "var(--chip-filled-green)",
      color: "var(--chip-on-fill)",
    },
    '&[data-variant="filled"][data-color="blue"]': {
      background: "var(--chip-filled-blue)",
      color: "var(--chip-on-fill)",
    },
    /* ... cyan/indigo/purple/fuchsia/navy 동일 패턴 ... */

    /* Variant: subtle — pastel 배경 + 동색 글자 */
    '&[data-variant="subtle"][data-color="default"]': {
      background: "var(--chip-subtle-gray)",
      color: "var(--text)",
    },
    '&[data-variant="subtle"][data-color="green"]': {
      background: "var(--chip-subtle-green)",
      color: "var(--chip-text-green)",
    },
    /* ... 나머지 색상 동일 패턴 ... */

    /* Variant: outlined — 투명 배경 + 동색 테두리 + 동색 글자 */
    '&[data-variant="outlined"][data-color="default"]': {
      background: "var(--element-default)",
      borderColor: "var(--border-bolder)",
      color: "var(--text)",
    },
    '&[data-variant="outlined"][data-color="green"]': {
      background: "var(--element-default)",
      borderColor: "var(--chip-border-green)",
      color: "var(--chip-text-green)",
    },
    /* ... 나머지 색상 동일 패턴 ... */

    /* Disabled — 특이성 0-3-0 으로 variant+color(0-2-0)보다 높임 */
    "&[data-disabled][data-variant][data-color]": {
      background: "var(--element-disabled)",
      borderColor: "transparent",
      color: "var(--text-disabled)",
      pointerEvents: "none",
    },
  },
});

/* leading/trailing 유무에 따른 padding+gap 제어 */
export const chipRootWithLeading = style({
  selectors: {
    '&[data-size="small"]': { paddingInline: "8px", gap: "4px" },
    '&[data-size="medium"]': { paddingInline: "8px", gap: "4px" },
  },
});

export const chipRootWithTrailing = style({
  selectors: {
    '&[data-size="small"]': {
      paddingLeft: "8px",
      paddingRight: "7px",
      gap: "3px",
    },
    '&[data-size="medium"]': {
      paddingLeft: "8px",
      paddingRight: "6px",
      gap: "2px",
    },
  },
});

export const chipRootWithBoth = style({
  selectors: {
    '&[data-size="small"]': {
      paddingLeft: "8px",
      paddingRight: "7px",
      gap: "3px",
    },
    '&[data-size="medium"]': {
      paddingLeft: "8px",
      paddingRight: "6px",
      gap: "2px",
    },
  },
});

/* Label — 텍스트. flex:1 로 채우고 ellipsis. */
export const chipLabel = style({
  flex: "1 0 0",
  minWidth: "1px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
  transition: "color 0.2s ease",
});

/* Leading icon 래퍼 — 색상은 Chip 글자색(currentColor) 상속 */
export const chipIcon = style({
  flexShrink: 0,
  display: "inline-flex",
  color: "inherit",
});

/* Trailing icon button 래퍼 — 공용 IconButton. 색상 상속 체인의 시작점 */
export const chipIconButton = style({
  flexShrink: 0,
  color: "inherit",
});
```

