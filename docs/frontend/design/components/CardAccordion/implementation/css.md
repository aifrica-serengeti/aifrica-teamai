# CardAccordion — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← CardAccordion 문서 인덱스](../README.md)

## 구현 내용

### 파일 2: `accordion.css.ts` (Radix Header/Item/Trigger/Content 스타일)

```ts
import { keyframes, style } from "@vanilla-extract/css";

/* AccordionHeader — Radix <h3> 래퍼 스타일.
 * 브라우저 기본 <h3> 스타일(margin, font-size, font-weight)을 리셋한다.
 * display: flex 로 설정해야 자식 Trigger 가 flex: 1 1 0 으로 전체 너비 차지.
 *
 * 이 스타일이 없으면 header 가 비정상적으로 커짐 (h3 기본 margin + font-size). */
export const accordionHeader = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  margin: "0",
  padding: "0",
  font: "inherit",
  width: "100%",
  minWidth: 0,
  height: "56px",
  boxSizing: "border-box",
  borderBottom: "1px solid transparent",
  borderRadius: "8px",
  background: "var(--ca-header-bg)",
});

/* AccordionItem — 카드 컨테이너 */
export const accordionItem = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  background: "var(--ca-surface)",
  border: "1px solid var(--ca-border)",
  borderRadius: "8px",
  /* overflow: visible — focus outline(-3px)이 잘리지 않도록.
   * Content animation 시 넘치는 콘텐츠는 Content 자체의 overflow:hidden 으로 처리. */
  overflow: "visible",
  position: "relative",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
});

/* AccordionTrigger — Header 안의 제목 토글 영역 */
export const accordionTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  flex: "1 1 0",
  width: "auto",
  minWidth: 0,
  height: "100%",
  padding: "12px 24px 12px 14px",
  background: "transparent",
  /* font: inherit 필수 — 없으면 button 기본 serif 폰트로 렌더됨 */
  font: "inherit",
  color: "var(--text)",
  textAlign: "left",
  cursor: "pointer",
  position: "relative",
  outline: "none",
  border: 0,
  borderRadius: "8px",
  transition: "color 0.2s ease",
  selectors: {
    "&:disabled": { cursor: "not-allowed" },
    "&:focus-visible": { outline: "none" },
  },
});

/* open border/radius와 trigger hover/pressed surface는 Header가 소유한다. */

/* keyframes — 펼침/접힘 애니메이션.
 * Radix 가 --radix-accordion-content-height 변수에 실제 콘텐츠 높이를 주입한다. */
const accordionDown = keyframes({
  from: { height: "0" },
  to: { height: "var(--radix-accordion-content-height)" },
});

const accordionUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: "0" },
});

/* AccordionContent — 본문 (펼침/접힘 애니메이션) */
export const accordionContent = style({
  overflow: "hidden",
  background: "var(--ca-surface)",
  borderRadius: "0 0 8px 8px",
  selectors: {
    '&[data-state="open"]': { animation: `${accordionDown} 0.25s ease` },
    '&[data-state="closed"]': { animation: `${accordionUp} 0.25s ease` },
  },
});

export const accordionContentInner = style({
  padding: "24px 24px 22px",
});
```

### 파일 3: `CardAccordion.css.ts` (Header 내부 요소 + globalStyle)

> **이 파일이 누락되면 focus outline, expand icon 회전, title 텍스트 스타일,
> actions 배치가 모두 깨진다.** 반드시 포함해야 한다.
>
> 이 파일은 `data-slot` 속성 셀렉터로 Radix 요소를 참조한다.
> `data-slot="accordion-trigger"` 등은 파일 1(accordion.tsx)에서 설정된다.

```ts
import { globalStyle, style } from "@vanilla-extract/css";

/* ============================================================
 * Focus outline — Trigger(헤더) 내부에 배치.
 * 표시/숨김은 globalStyle 로 제어 (정적 데모 + :focus-visible).
 * ============================================================ */
export const accordionFocusOutline = style({
  position: "absolute",
  inset: "-3px",
  border: "1px solid var(--border-focused)",
  /* Collapsed: 카드 외곽선과 정렬 */
  borderRadius: "10px",
  pointerEvents: "none",
  zIndex: 1,
  display: "none",
  transition: "border-radius 0.2s ease",
});

/* Expanded — 상단만 둥글게(10px), 하단 직각(0px) */
globalStyle(
  `[data-slot="accordion-trigger"][data-state="open"] > .${accordionFocusOutline}`,
  { borderRadius: "10px 10px 0 0" },
);

/* 정적 데모 — data-interactive="focused" 시 항상 표시 */
globalStyle(
  `[data-slot="accordion-trigger"][data-interactive="focused"] > .${accordionFocusOutline}`,
  { display: "block" },
);

/* Live — :focus-visible 시 표시 */
globalStyle(
  `[data-slot="accordion-trigger"]:focus-visible > .${accordionFocusOutline}`,
  { display: "block" },
);

/* ============================================================
 * Title 그룹 — expand 아이콘 + Title + optional + info
 * ============================================================ */
export const accordionTitleGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  minWidth: 0,
  flex: "1 1 auto",
});

/* Expand/Collapse 아이콘 컨테이너 — 회전 애니메이션 */
export const accordionExpandButton = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "4px",
  background: "transparent",
  color: "var(--icon)",
  transition:
    "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
  /* 기본: collapsed (-90deg = 오른쪽 ▶) */
  transform: "rotate(-90deg)",
  selectors: {
    "&[data-disabled]": { color: "var(--icon-disabled)" },
  },
});

/* Trigger[data-state="open"] 하위 expandButton → 0deg (아래 ▼) */
globalStyle(
  '[data-slot="accordion-trigger"][data-state="open"] .' +
    accordionExpandButton.split(" ")[0],
  { transform: "rotate(0deg)" },
);

/* Title 텍스트 + optional + info 묶음 */
export const accordionTitleText = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  minWidth: 0,
});

/* Title 텍스트 — Title1 (16px SemiBold) */
export const accordionTitle = style({
  font: "var(--text-title1)",
  color: "var(--text)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: {
    "&[data-disabled]": { color: "var(--text-disabled)" },
  },
});

/* Optional 텍스트 — Body3 (12px Regular) */
export const accordionOptional = style({
  font: "var(--text-body3)",
  color: "var(--text-subtler)",
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: {
    "&[data-disabled]": { color: "var(--text-disabled)" },
  },
});

/* Button Group — header 우측 액션 영역 */
export const accordionActions = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
  height: "100%",
  boxSizing: "border-box",
  paddingRight: "24px",
});

/* Panel placeholder (데모용 빈 패널) */
export const accordionPanelPlaceholder = style({
  width: "100%",
  minHeight: "157px",
  background: "var(--surface-subtle)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  font: "var(--text-headline1)",
  color: "var(--text-disabled)",
  transition: "background-color 0.2s ease, color 0.2s ease",
});

/* ============================================================
 * 정적 데모 globalStyle — data-interactive 로 강제 상태 표시
 * ============================================================ */

/* hovered → header 배경 강제 */
globalStyle('[data-slot="accordion-trigger"][data-interactive="hovered"]', {
  background: "var(--ca-header-bg-hover)",
});

/* pressed → header 배경 강제 */
globalStyle('[data-slot="accordion-trigger"][data-interactive="pressed"]', {
  background: "var(--ca-header-bg-pressed)",
});

/* disabled → hover/pressed 무시 */
globalStyle('[data-slot="accordion-trigger"][data-interactive="disabled"]', {
  cursor: "not-allowed",
});
globalStyle(
  '[data-slot="accordion-trigger"][data-interactive="disabled"]:hover',
  { background: "var(--ca-header-bg)" },
);
```
