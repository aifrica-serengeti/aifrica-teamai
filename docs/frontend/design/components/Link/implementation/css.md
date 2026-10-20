# Link — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](../README.md)

## 구현 내용

### 스타일 (`Link.css.ts`)

```ts
import { style, styleVariants, globalStyle } from "@vanilla-extract/css";

/**
 * Base — 모든 링크가 공유하는 구조/상태 스타일.
 * <a> 요소를 인라인 플렉스로 배치하여 텍스트 + 아이콘을 가로 정렬한다.
 */
export const linkBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  flexShrink: 0,
  fontFamily: "var(--font-sans)",
  fontWeight: 400,
  whiteSpace: "nowrap",
  textDecorationLine: "underline",
  textDecorationStyle: "solid",
  textDecorationSkipInk: "none",
  textUnderlinePosition: "from-font",
  // 기본(default/enabled) 색상. 하위 상태 의사 클래스가 덮어쓴다.
  color: "var(--link-default)",
  // 색상 전환만 — 절대 transition: all 쓰지 않음 (다크 모드 부드러운 전환).
  transition: "color 0.2s ease",
  cursor: "pointer",
  selectors: {
    "&:hover": { color: "var(--link-hovered)" },
    "&:active": { color: "var(--link-pressed)" },
    '&[aria-disabled="true"], &:disabled': {
      color: "var(--link-disabled)",
      // Disabled 는 밑줄 제거 — Figma 스펙(밑줄 없는 disabled).
      textDecorationLine: "none",
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    // Focus — Figma "Focused" state. default 색상 유지 + 1px 외곽선.
    // Button/Checkbox/Radio 와 동일한 1px stroke + 1px offset 패턴.
    "&:focus-visible": {
      outline: "1px solid var(--link-default)",
      outlineOffset: "1px",
    },
  },
});

/**
 * Size — Figma 치수 정확 반영 (Body3/Body2/Body1 타이포그래피 매핑).
 */
export const linkSize = styleVariants({
  small: {
    fontSize: "12px",
    lineHeight: "16px",
  },
  medium: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  large: {
    fontSize: "16px",
    lineHeight: "24px",
  },
});

/* 아이콘(svg) 스케일 — data-size 속성으로 링크 크기별 아이콘 px 적용.
 * Large 만 18px, Small/Medium 은 16px (Figma System icon 치수).
 * Icon 컴포넌트가 자체 size 를 지정하지만, 임의 svg 에도 크기를 보장하는 방어막 역할. */
globalStyle(`${linkBase} svg`, {
  flexShrink: 0,
});

globalStyle(`${linkBase}[data-size="small"] svg`, {
  width: "16px",
  height: "16px",
});
globalStyle(`${linkBase}[data-size="medium"] svg`, {
  width: "16px",
  height: "16px",
});
globalStyle(`${linkBase}[data-size="large"] svg`, {
  width: "18px",
  height: "18px",
});
```

