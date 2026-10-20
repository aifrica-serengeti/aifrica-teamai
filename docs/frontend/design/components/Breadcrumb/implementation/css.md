# Breadcrumb — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Breadcrumb 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Breadcrumb.css.ts`)

```ts
import { style } from "@vanilla-extract/css";

/** List — compound 모드 전체 경로 컨테이너. */
export const list = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  fontFamily: "var(--font-sans)",
});

/** Container — 자동 축약 모드 바깥 컨테이너. overflow hidden 으로 한 줄 유지. */
export const container = style({
  display: "block",
  minWidth: 0,
  overflow: "hidden",
});

/** Collapsible list — container 내부의 실제 item 행 (nowrap). */
export const collapsibleList = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
  fontFamily: "var(--font-sans)",
});

/** Measure layer — 측정용 숨김 레이어. offsetWidth 측정을 위해 렌더는 되지만 보이지 않음. */
export const measureLayer = style({
  position: "absolute",
  left: "-9999px",
  top: "0",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  whiteSpace: "nowrap",
  visibility: "hidden",
  fontFamily: "var(--font-sans)",
  pointerEvents: "none",
});

/** Item base — Body2 타이포 공유. */
export const itemBase = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  whiteSpace: "nowrap",
  flexShrink: 0,
});

/**
 * Item link — 상위 depth 링크.
 * 밑줄은 항상 underline, 색상(text-decoration-color)으로 노출 제어 → 부드러운 페이드인.
 */
export const itemLink = style([
  itemBase,
  {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--breadcrumb-default)",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationSkipInk: "none",
    textUnderlinePosition: "from-font",
    textDecorationColor: "transparent", // Enabled: 투명 → 안 보임
    cursor: "pointer",
    transition: "color 0.2s ease, text-decoration-color 0.2s ease",
    selectors: {
      "&:hover": {
        color: "var(--breadcrumb-hovered)",
        textDecorationColor: "currentColor",
      },
      "&:active": {
        color: "var(--breadcrumb-pressed)",
        textDecorationColor: "currentColor",
      },
      "&:focus-visible": {
        outline: "1px solid var(--breadcrumb-focus-border)",
        outlineOffset: "1px",
      },
    },
  },
]);

/** Item current — 현재(마지막) depth. 비상호작용 텍스트. */
export const itemCurrent = style([
  itemBase,
  {
    color: "var(--breadcrumb-active)",
    transition: "color 0.2s ease",
  },
]);

/** Separator — "/" 구분자. 장식(aria-hidden). 색상 고정, 상태 전환 없음. */
export const separator = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--breadcrumb-border)",
  flexShrink: 0,
  userSelect: "none",
});

/*
 * 참고: 축약 `...` 버튼은 별도 스타일 없이 IconButton(size="tiny", variant="outlined")
 * 컴포넌트를 재사용. Figma node 7865:106116 이 Icon button 인스턴스이므로.
 * tiny = 20×20px 터치영역 + 12px icon → Figma 치수와 정확히 일치.
 */
```

