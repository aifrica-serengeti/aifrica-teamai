# Switch — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](../README.md)

## 구현 내용

### Switch track + thumb 스타일 (`switch.css.ts`)

```ts
import { style, globalStyle } from "@vanilla-extract/css";

/**
 * Switch — CSS 직접 렌더링.
 *
 * Figma 정밀 분석 (node 9849:22757, 10704:58023):
 *  - Track(pill): Small 32×18 / Medium 40×22 / Large 48×26. radius = 높이/2.
 *  - Thumb(원): Small 14 / Medium 18 / Large 22. 패딩 2px.
 *  - On enabled: track element-primary(accent-500) / thumb on-primary(white) + raised shadow.
 *  - Off enabled: track element-disabled-strong(gray-500) / thumb on-primary(white) + raised shadow.
 *  - On disabled: track element-disabled / thumb on-disabled.
 *  - Off disabled: track element-disabled + 1px 테두리 disabled-subtle / thumb on-disabled-radio.
 *  - Focus: 1px primary outline (1px gap).
 *
 * 핵심: track 박스를 고정하고 data-state/data-disabled/data-size 로 색상만 전환.
 * thumb 이동은 부모 Root 의 data-state 를 globalStyle 로 참조하여 translateX 제어.
 * 색상 전환 애니메이션 0.2s 통일. 색상은 모두 토큰 변수 참조(하드코딩 금지).
 */

/** Switch track 외형(pill). 상태별로 data-* 속성으로 전환. */
export const switchRoot = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  boxSizing: "border-box",
  // 투명 1px border 예약 — disabled off 에서만 색 부여.
  // 모든 상태에서 border 자리를 차지하게 하여 thumb 위치/외형 크기 고정.
  border: "1px solid transparent",
  // 기본 = Off enabled: track element-disabled-strong(gray-500 #8f8f8f)
  background: "var(--element-disabled-strong)",
  // 색상 전환 애니메이션
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, outline-color 0.2s ease",
  outline: "none",
  cursor: "pointer",
  selectors: {
    // Small: 32×18, radius 9
    '&[data-size="small"]': {
      width: "32px",
      height: "18px",
      borderRadius: "9px",
    },
    // Medium: 40×22, radius 11
    '&[data-size="medium"]': {
      width: "40px",
      height: "22px",
      borderRadius: "11px",
    },
    // Large: 48×26, radius 13
    '&[data-size="large"]': {
      width: "48px",
      height: "26px",
      borderRadius: "13px",
    },

    // 포커스 border — track 주변에 1px gap 떨어져서 1px primary border
    "&:focus-visible": {
      outline: "1px solid var(--element-primary)",
      outlineOffset: "1px",
    },

    // 커서 상태
    "&[data-disabled]:not([data-readonly])": { cursor: "not-allowed" },
    "&[data-readonly]": { cursor: "default" },

    // Checked: track element-primary
    '&[data-state="checked"]': { background: "var(--element-primary)" },

    // Disabled Off: track element-disabled + 1px 테두리 disabled-subtle
    '&[data-disabled]:not([data-state="checked"])': {
      background: "var(--element-disabled)",
      border: "1px solid var(--border-disabled-subtle)",
    },
    // Disabled On: track element-disabled
    '&[data-disabled][data-state="checked"]': {
      background: "var(--element-disabled)",
    },

    // Invalid On: track danger
    '&[aria-invalid="true"][data-state="checked"]': {
      background: "var(--border-danger)",
    },
    // Invalid + Disabled: disabled 우선
    '&[aria-invalid="true"][data-disabled][data-state="checked"]': {
      background: "var(--element-disabled)",
    },
  },
});

/**
 * Thumb(knob). 절대위치 + 사이즈별 지름.
 * 위치: track 이 border-box(1px border). 절대위치 top/left 는 padding box(border 내부) 기준.
 * border(1px) + top(1px) = 절대 2px gap → Figma padding 2px 와 일치.
 * 계산: (content - thumb) / 2 = (24-22)/2 = 1px (Large 기준, 모든 사이즈 동일).
 */
export const switchThumb = style({
  position: "absolute",
  top: "1px",
  left: "1px",
  borderRadius: "50%",
  // Off enabled: thumb 흰색(라이트/다크 공통). element-default 는 다크에서 반투명 검정이 되므로 사용 불가.
  background: "var(--element-on-primary)",
  boxShadow: "var(--elevation-switch-thumb)",
  transition: "transform 0.2s ease, background-color 0.2s ease",
  selectors: {
    '&[data-size="small"]': { width: "14px", height: "14px" },
    '&[data-size="medium"]': { width: "18px", height: "18px" },
    '&[data-size="large"]': { width: "22px", height: "22px" },
  },
});

// ===== Checked 시 thumb 이동 (부모 Root data-state 참조) =====
globalStyle(
  `${switchRoot}[data-size="small"][data-state="checked"] > ${switchThumb}`,
  { transform: "translateX(14px)" },
);
globalStyle(
  `${switchRoot}[data-size="medium"][data-state="checked"] > ${switchThumb}`,
  { transform: "translateX(18px)" },
);
globalStyle(
  `${switchRoot}[data-size="large"][data-state="checked"] > ${switchThumb}`,
  { transform: "translateX(22px)" },
);

// ===== Disabled 시 thumb 색상 =====
// Off disabled: on-disabled-radio (light #8f8f8f / dark #555555)
globalStyle(
  `${switchRoot}[data-disabled]:not([data-state="checked"]) > ${switchThumb}`,
  { background: "var(--element-on-disabled-radio)" },
);
// On disabled: on-disabled (light #ffffff / dark #555555)
globalStyle(
  `${switchRoot}[data-disabled][data-state="checked"] > ${switchThumb}`,
  { background: "var(--element-on-disabled)" },
);
```

