# Scrollbar & ScrollArea — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](../README.md)

## 구현 내용

### ScrollArea.css.ts (vanilla-extract)

```ts
import { style, globalStyle } from "@vanilla-extract/css";

/** wrapper — 외부에서 고정 height/width 부여. 시각적 테두리/배경. thumb 위치 기준. */
export const wrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  background: "var(--surface)",
  border: "1px solid var(--border-default)",
  overflow: "hidden", // thumb 가 wrapper 밖으로 나가지 않게
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

/** 스크롤 컨테이너 — 실제 스크롤이 일어나는 요소. wrapper 를 가득 채운다. */
export const scrollContainer = style({
  width: "100%",
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none", // Firefox 네이티브 스크롤바 숨김
});
globalStyle(`${scrollContainer}::-webkit-scrollbar`, {
  width: "0",
  height: "0",
  display: "none", // WebKit 네이티브 스크롤바 숨김
});
// 방향별 오버플로우
globalStyle(`${wrapper}[data-orientation="horizontal"] ${scrollContainer}`, {
  overflowY: "hidden",
  overflowX: "auto",
});
globalStyle(`${wrapper}[data-orientation="both"] ${scrollContainer}`, {
  overflow: "auto",
});

/** 콘텐츠 패딩. */
export const content = style({
  padding: "16px",
  fontFamily: "var(--font-sans)",
  color: "var(--text)",
});

/** 공통 thumb 베이스 — 위치/두께는 JS 인라인. 색상·둥근 캡·transition 만. */
const thumbBase = style({
  position: "absolute",
  transition: "opacity 0.2s ease, background-color 0.2s ease",
  background: "var(--scrollbar-thumb-fill)",
  borderRadius: "9999px",
  pointerEvents: "auto",
  cursor: "pointer",
  zIndex: 4, // Tree·Table 내부 레이어보다 위에 떠 있도록
  selectors: {
    "&:hover": {
      background: "var(--scrollbar-thumb-hover)",
    },
  },
});

/** 세로/가로 thumb — 방향별로 빈 style(thumbBase 상속). 두께/위치는 JS 인라인. */
export const thumbVertical = style([thumbBase, {}]);
export const thumbHorizontal = style([thumbBase, {}]);

/** 노출 타이밍(type) — 기본 숨김, 조건 충족 시 opacity 1. */
// 기본 숨김
globalStyle(`${wrapper} > ${thumbVertical}, ${wrapper} > ${thumbHorizontal}`, {
  opacity: 0,
});
// hover/auto — wrapper hover 시 자신이 직접 소유한 thumb만 표시
globalStyle(
  `${wrapper}[data-type="hover"]:hover > ${thumbVertical}, ${wrapper}[data-type="auto"]:hover > ${thumbVertical}`,
  {
    opacity: 1,
  },
);
globalStyle(
  `${wrapper}[data-type="hover"]:hover > ${thumbHorizontal}, ${wrapper}[data-type="auto"]:hover > ${thumbHorizontal}`,
  {
    opacity: 1,
  },
);
// scroll/auto — is-scrolling 클래스 시
globalStyle(
  `${wrapper}[data-type="scroll"].is-scrolling > ${thumbVertical}, ${wrapper}[data-type="auto"].is-scrolling > ${thumbVertical}`,
  {
    opacity: 1,
  },
);
globalStyle(
  `${wrapper}[data-type="scroll"].is-scrolling > ${thumbHorizontal}, ${wrapper}[data-type="auto"].is-scrolling > ${thumbHorizontal}`,
  {
    opacity: 1,
  },
);
// always — 항상
globalStyle(
  `${wrapper}[data-type="always"] > ${thumbVertical}, ${wrapper}[data-type="always"] > ${thumbHorizontal}`,
  {
    opacity: 1,
  },
);
```
