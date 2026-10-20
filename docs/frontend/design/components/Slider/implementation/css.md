# Slider — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](../README.md)

## 구현 내용

### 12.1 Slider primitive 스타일 — `slider.css.ts`

shadcn primitive 레이어. Radix Slider 의 Track/Range/Thumb 외형을 정의.

```ts
import { style } from "@vanilla-extract/css";

/** Slider Root — 가로 정렬 컨테이너. relative + items-center 로 Track/Thumb 배치. */
export const sliderRoot = style({
  position: "relative",
  display: "flex",
  width: "100%",
  touchAction: "none",
  userSelect: "none",
  alignItems: "center",
  cursor: "pointer",
  selectors: {
    "&[data-disabled]": { cursor: "not-allowed" },
  },
});

/** Track — 4px 높이 회색 바. Range 가 절대위치로 채워진다. */
export const sliderTrack = style({
  position: "relative",
  flexGrow: 1,
  height: "4px",
  borderRadius: "2px",
  background: "var(--border-default)",
  overflow: "hidden",
  transition: "background-color 0.2s ease",
});

/** Range(Fill) — Track 안에서 채워지는 primary 색상 영역. 절대위치. */
export const sliderRange = style({
  position: "absolute",
  height: "100%",
  background: "var(--element-primary)",
  transition: "background-color 0.2s ease",
  selectors: {
    "[data-disabled] &": { background: "var(--element-disabled)" },
  },
});

/** Thumb(Handle) — 16×16 원. 절대위치(Radix 가 위치 제어). primary 색상. */
export const sliderThumb = style({
  display: "block",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  background: "var(--element-primary)",
  border: "1px solid var(--element-primary)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, outline-color 0.2s ease",
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&:focus-visible": {
      outline: "2px solid var(--element-primary)",
      outlineOffset: "2px",
    },
    "&:hover:not([data-disabled])": {
      outline: "2px solid var(--element-primary)",
      outlineOffset: "2px",
    },
    "&:hover:focus-visible": {
      outline: "2px solid var(--element-primary)",
      outlineOffset: "2px",
    },
    "&[data-disabled]": {
      background: "var(--element-disabled)",
      borderColor: "var(--border-disabled-subtle)",
      cursor: "not-allowed",
    },
    "&[data-disabled]:focus-visible, &[data-disabled]:hover": {
      outline: "none",
    },
  },
});
```

### 12.3 playground 조립 스타일 — `Slider.css.ts`

공용 InputField와 동일한 Label · requirement · Info · Help/Error text + Body 행 배치 +
Steps + Input 래퍼.

```ts
import { style } from "@vanilla-extract/css";

/** 전체 필드 래퍼. */
export const field = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "4px",
  width: "100%",
  minWidth: 0,
  fontFamily: "var(--font-sans)",
});

/** Label 행 — InputField와 동일한 label · optional · required · info 구조. */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap",
});

export const labelText = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "var(--text)",
  transition: "color 0.2s ease",
});

export const optionalText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtler)",
  transition: "color 0.2s ease",
});

export const requiredMark = style({
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--text-danger)",
  opacity: 0.8,
  transition: "color 0.2s ease",
});

export const infoIcon = style({
  flexShrink: 0,
  color: "var(--icon-subtle)",
  transition: "color 0.2s ease",
});

/** Slider 본문 행 — Track 영역(flex 1) + Input. */
export const bodyRow = style({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  width: "100%",
});

/** Track + Steps 를 감싸는 컬럼. Input 과 나란히 가로 배치. */
export const trackColumn = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
  gap: "6px",
});

/** Slider Root 래퍼 — Thumb(16px) 가 Track(4px) 세로 중앙에 정렬되도록 16px 높이 확보. */
export const sliderWrap = style({
  position: "relative",
  height: "16px",
  display: "flex",
  alignItems: "center",
});

/** Steps 영역 — tick 들과 숫자 라벨. */
export const steps = style({
  position: "relative",
  height: "18px",
});

/** 단일 tick — 1×4px 세로선. */
export const tick = style({
  position: "absolute",
  top: "0",
  width: "1px",
  height: "4px",
  background: "var(--border-default)",
  transition: "background-color 0.2s ease",
});

/** Step 라벨 — Body3 12px. tick 아래 4px. */
export const stepLabel = style({
  position: "absolute",
  top: "8px",
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "14px",
  color: "var(--text-subtler)",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/** Input 래퍼 — 단일 입력 박스. Range 모드에서는 Track 양쪽에 각각 배치. */
export const inputWrap = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
});

/** Input 고정 너비 — 2자리 숫자 + 패딩. number input 스피너 제거. */
export const inputEl = style({
  width: "56px",
  textAlign: "center",
  selectors: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&": { MozAppearance: "textfield" },
  },
});

/** Slider 아래 보조 설명 — InputField helpText와 동일. */
export const helpText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-subtle)",
  margin: 0,
  transition: "color 0.2s ease",
});

/** Slider 아래 오류 메시지 — InputField errorText와 동일. */
export const errorText = style({
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "var(--text-danger)",
  margin: 0,
  transition: "color 0.2s ease",
});
```

