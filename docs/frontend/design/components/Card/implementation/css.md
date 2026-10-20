# Card — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Card 문서 인덱스](../README.md)

## 구현 내용

### Card.css.ts

```ts
import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@design/tokens";

/* Root — Default type */
export const cardRoot = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  minWidth: 0,
  minHeight: "80px",
  width: "var(--card-width, 392px)",
  background: "var(--surface)",
  border: "1px solid var(--border-default)",
  borderRadius: "8px",
  overflow: "clip",
  position: "relative",
  textAlign: "left",
  font: vars.typography.body2,
  color: "var(--text)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
  selectors: {
    '&[data-size="small"]': { padding: "16px", justifyContent: "center" },
    '&[data-size="medium"]': { padding: "16px", justifyContent: "center" },
    '&[data-size="large"]': { padding: "24px" },
    '&[data-state="hovered"]': {
      background: "var(--surface-hover)",
      boxShadow: "var(--card-shadow)",
    },
    '&[data-state="pressed"]': {
      background: "var(--surface-pressed)",
      boxShadow: "var(--card-shadow)",
    },
    /* Selected — 2px accent (border 1px + inset shadow 1px, 밀림 방지) */
    '&[data-state="selected"]': {
      borderColor: "var(--border-focused)",
      boxShadow: "inset 0 0 0 1px var(--border-focused)",
    },
    '&[data-state="focused"]': { overflow: "visible" },
    '&[data-state="disabled"]': { cursor: "not-allowed" },
    "&[data-interactive]": { cursor: "pointer", font: "inherit" },
    "&[data-interactive]:hover": {
      background: "var(--surface-hover)",
      boxShadow: "var(--card-shadow)",
    },
    "&[data-interactive]:active": {
      background: "var(--surface-pressed)",
      boxShadow: "var(--card-shadow)",
    },
    /* Selected + hover/active → 드롭 그림자 + inset 파랑 모두 유지 */
    '&[data-interactive][data-state="selected"]:hover': {
      background: "var(--surface-hover)",
      boxShadow: "var(--card-shadow), inset 0 0 0 1px var(--border-focused)",
    },
    '&[data-interactive][data-state="selected"]:active': {
      background: "var(--surface-pressed)",
      boxShadow: "var(--card-shadow), inset 0 0 0 1px var(--border-focused)",
    },
    "&[data-interactive]:focus-visible": {
      outline: "none",
      overflow: "visible",
    },
  },
});

/* Focus outline — Focused 상태의 바깥 파랑 링 */
export const cardFocusOutline = style({
  position: "absolute",
  inset: "-3px",
  border: "1px solid var(--border-focused)",
  borderRadius: "10px",
  pointerEvents: "none",
  zIndex: 1,
});

/* Interactive 카드: focus outline은 focus-visible일 때만 표시 */
globalStyle(
  `${cardRoot}[data-interactive]:not([data-state="focused"]) > span`,
  {
    display: "none",
  },
);
globalStyle(`${cardRoot}[data-interactive]:focus-visible > span`, {
  display: "block",
});

/* Thumbnail wrapper — 전체 외곽 border(이미지 + 콘텐츠)를 가진다. */
export const cardThumbnailWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "var(--card-width, 392px)",
  minWidth: 0,
  background: "var(--surface)",
  border: "1px solid var(--border-default)",
  borderRadius: "8px",
  overflow: "clip",
  position: "relative",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    '&[data-state="hovered"]': { boxShadow: "var(--card-shadow)" },
    '&[data-state="pressed"]': { boxShadow: "var(--card-shadow)" },
    /* Selected — 외곽 전체(이미지 포함) 2px accent (밀림 방지) */
    '&[data-state="selected"]': {
      borderColor: "var(--border-focused)",
      boxShadow: "inset 0 0 0 1px var(--border-focused)",
    },
  },
});

/* Thumbnail 이미지 — 220px 고정 높이. wrapper border 안쪽에 위치.
 * 하단 border 로 콘텐츠와 구분 (밝은 이미지에서도 경계선 보장). */
export const cardThumbnailImage = style({
  width: "100%",
  height: "220px",
  minHeight: "220px",
  objectFit: "cover",
  display: "block",
  borderBottom: "1px solid var(--border-default)",
});

/* Thumbnail 콘텐츠 — border 없음. wrapper 가 외곽 border 를 담당. */
export const cardThumbnailContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  width: "100%",
  minWidth: 0,
  minHeight: "80px",
  padding: "20px 24px 24px",
  position: "relative",
  font: vars.typography.body2,
  color: "var(--text)",
  transition: "background-color 0.2s ease",
  selectors: {
    '&[data-state="hovered"]': { background: "var(--surface-hover)" },
    '&[data-state="pressed"]': { background: "var(--surface-pressed)" },
  },
});

/* Header */
export const cardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  minWidth: 0,
  gap: "8px",
});

export const cardLeadingVisual = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const cardHeaderText = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  alignItems: "flex-start",
  flex: "1 1 0",
  minWidth: 0,
  paddingRight: "8px",
});

export const cardTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  width: "100%",
  minWidth: 0,
});

export const cardTitle = style({
  font: vars.typography.title2,
  color: "var(--text)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: {
    '&[data-size="large"]': { font: vars.typography.title1 },
  },
});

export const cardDescription = style({
  font: vars.typography.body3,
  color: "var(--text-subtle)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  margin: 0,
  transition: "color 0.2s ease",
  selectors: {
    '&[data-size="medium"]': { font: vars.typography.body2 },
    '&[data-size="large"]': { font: vars.typography.body2 },
  },
});

export const cardSubDescription = style({
  width: "100%",
  margin: 0,
  overflow: "hidden",
  color: "var(--text-subtler)",
  font: vars.typography.body3,
  textOverflow: "ellipsis",
  transition: "color 0.2s ease",
  whiteSpace: "nowrap",
});

/* Extended Header */
export const cardExtendedHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "flex-start",
  width: "100%",
});

export const cardDetailItems = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexWrap: "wrap",
});

export const cardDetailItem = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const cardDetailText = style({
  font: vars.typography.body3,
  color: "var(--text-subtler)",
  whiteSpace: "nowrap",
  margin: 0,
  transition: "color 0.2s ease",
});

export const cardDetailDot = style({
  font: vars.typography.body3,
  color: "var(--text-subtler)",
  margin: 0,
});

export const cardChipContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  flexWrap: "wrap",
});

/* 목록 카드의 공통 라벨·값 요약 */
export const cardSummary = style({
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  flexDirection: "column",
  gap: "12px",
});
export const cardSummaryRow = style({
  display: "flex",
  minWidth: 0,
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});
export const cardSummaryLabel = style({
  flexShrink: 0,
  color: "var(--text-subtle)",
  fontSize: "12px",
  lineHeight: "16px",
});
export const cardSummaryValue = style({
  minWidth: 0,
  overflow: "hidden",
  color: "var(--text)",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "right",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

/* Header Group */
export const cardHeaderGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
  minWidth: 0,
});

/* Card Body */
export const cardBody = style({
  width: "100%",
  minHeight: "126px",
  background: "var(--surface-subtle)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
});

/* Footer */
export const cardFooter = style({
  display: "flex",
  width: "100%",
  minWidth: 0,
});

export const cardButtonGroup = style({
  display: "flex",
  gap: "8px",
  width: "100%",
  minWidth: 0,
});

export const cardButtonGroupItem = style({
  flex: "1 1 0",
  minWidth: 0,
});

export const cardLinkFooter = style({
  display: "flex",
  alignItems: "center",
});

export const cardCreatorInfo = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const cardCreatorBy = style({
  font: vars.typography.body3,
  color: "var(--text-subtler)",
  margin: 0,
  transition: "color 0.2s ease",
});

export const cardCreatorName = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

export const cardCreatorNameText = style({
  font: vars.typography.body3,
  color: "var(--text)",
  margin: 0,
  whiteSpace: "nowrap",
  transition: "color 0.2s ease",
});

/* Disabled 자식 opacity — globalStyle */
globalStyle(`${cardRoot}[data-state="disabled"] > *`, {
  opacity: 0.4,
});

globalStyle(`${cardThumbnailWrapper}[data-state="disabled"] > *`, {
  opacity: 0.4,
});
```
