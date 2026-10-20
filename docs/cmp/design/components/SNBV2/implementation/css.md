# SNB v2 — CSS와 스타일 구현

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

[← SNB v2 문서 인덱스](../README.md)

## 구현 내용

### SNBV2.css.ts

~~~~ts
import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from './snb-v2-tokens'

/** Light expanded SNB is 240px wide. */
export const root = style({
  display: 'flex',
  width: '240px',
  minWidth: '240px',
  height: '100%',
  minHeight: 0,
  flexDirection: 'column',
  overflow: 'hidden',
  boxSizing: 'border-box',
  paddingTop: '8px',
  backgroundColor: vars.color.surface.primarySubtle,
  color: vars.color.text.default,
  transition: 'width 0.24s ease, min-width 0.24s ease, background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&[data-collapsed="true"]': {
      width: '60px',
      minWidth: '60px',
      position: 'relative',
      alignItems: 'center',
      gap: 0,
      padding: '8px 12px 18px',
    },
  },
})

export const headerContainer = style({
  width: '100%',
  height: '48px',
  flexShrink: 0,
  boxSizing: 'border-box',
  paddingInline: '16px',
  /* 스크롤 경계선은 menuScrollFrame이 상태별로 소유한다. Header의 고정선은
   * top에서 불필요한 divider를, middle에서 2px 이중 divider를 만들기 때문에
  * 기본값은 투명이다. */
  borderBottom: '1px solid transparent',
  transition: 'padding 0.24s ease, border-color 0.2s ease',
  selectors: {
    /* Header 자체가 scroll 상단 경계선을 그린다. border가 header box 안에 있어
     * Global Header v2와 같은 pixel row를 사용한다. */
    '&[data-scroll-boundary="middle"]': {
      borderBottomColor: vars.snbV2.divider,
    },
    '&[data-scroll-boundary="bottom"]': {
      borderBottomColor: vars.snbV2.divider,
    },
    [`${root}[data-collapsed="true"] &`]: {
      display: 'flex',
      width: '60px',
      /* Global Header v2와 같은 8px 시작점·48px 높이를 사용한다. */
      height: '48px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: 0,
    },
  },
})

export const header = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingInline: '8px',
  transition: 'justify-content 0.24s ease, padding 0.24s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      width: '32px',
      height: '32px',
      justifyContent: 'center',
      paddingInline: 0,
    },
  },
})

export const logo = style({
  display: 'flex',
  width: '123.072px',
  height: '28px',
  alignItems: 'center',
  gap: '8px',
  overflow: 'hidden',
  transition: 'width 0.24s ease, gap 0.24s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      width: '32px',
      height: '32px',
      gap: 0,
    },
  },
})

export const logoSymbol = style({
  display: 'block',
  width: '27.317px',
  height: '27.317px',
  flexShrink: 0,
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

/** Exact 32px collapsed brand slot. */
export const collapsedLogoSymbol = style({
  display: 'none',
  width: '32px',
  height: '32px',
  flexShrink: 0,
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'block' },
  },
})

export const logoType = style({
  display: 'block',
  width: '87.58px',
  height: '15.729px',
  flexShrink: 0,
  transition: 'opacity 0.16s ease',
  selectors: {
    '.dark &': { filter: 'brightness(0) invert(1) opacity(0.88)' },
    [`${root}[data-collapsed="true"] &`]: { opacity: 0 },
  },
})

export const navigation = style({
  display: 'flex',
  width: '100%',
  minHeight: 0,
  flex: '1 1 0',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      boxSizing: 'border-box',
      /* Utility stack(104px) 위 16px. Root의 collapsed bottom inset 18px을 제외한다. */
      paddingBottom: '175px',
    },
  },
})

/** Scroll 위치에 따라 고정 utility/footer와의 경계선을 보여 주는 frame. */
export const menuScrollFrame = style({
  minHeight: 0,
  flex: '1 1 0',
  boxSizing: 'border-box',
  borderBottom: '1px solid transparent',
  transition: 'border-color 0.2s ease',
  selectors: {
    '&[data-scroll-boundary="top"]': {
      borderBottomColor: vars.snbV2.divider,
    },
    '&[data-scroll-boundary="middle"]': {
      borderBottomColor: vars.snbV2.divider,
    },
    [`${root}[data-collapsed="true"] &`]: {
      /* Root padding은 아이콘만 32px 중앙 정렬한다. 스크롤 frame은 60px rail 전체를
       * 차지해 thumb가 아이콘 옆이 아닌 rail의 오른쪽 edge에 붙도록 한다. */
      width: '60px',
      minWidth: '60px',
      alignSelf: 'center',
      flex: '1 1 0',
      overflow: 'hidden',
    },
  },
})

export const menuScrollArea = style({
  width: '100%',
  height: '100%',
  selectors: {
    '&[data-slot="scroll-area"]': {
      border: 0,
      borderRadius: 0,
      background: 'transparent',
    },
  },
})

export const menuScrollContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: 0,
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      alignItems: 'center',
      width: '100%',
      /* Scrollbar는 header 바로 아래에서 시작하고, icon 목록만 기존 15px 위치를 유지한다. */
      paddingTop: '15px',
      gap: '12px',
    },
  },
})

/* 공용 ScrollArea의 기본 16px content padding은 SNB의 잠금된 8px group padding과 겹치므로 제거한다. */
globalStyle(`${menuScrollArea} > div > ${menuScrollContent}`, { padding: 0 })

export const section = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '4px',
  boxSizing: 'border-box',
  padding: '8px',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      width: '32px',
      padding: 0,
    },
  },
})

/** 36px line plus 8px vertical insets — collapsed Menu container Divider 재현 기준. */
export const collapsedDivider = style({
  alignSelf: 'center',
  width: '36px',
  height: '1px',
  flexShrink: 0,
  boxSizing: 'border-box',
  backgroundColor: vars.snbV2.divider,
  marginTop: '8px',
  marginBottom: '8px',
  transition: 'background-color 0.2s ease',
})

/**
 * Collapsed rail의 2·3depth popup은 공용 Menu를 사용하되, SNB v2의 blue 상태
 * 토큰을 해당 portal에만 매핑한다. MenuSubContent도 같은 class를 받아 독립적으로
 * 토큰을 상속하므로 nested popup까지 일관된 상태색을 유지한다.
 */
export const collapsedSubmenuContent = style({
  vars: {
    '--menu-surface': vars.color.surface.default,
    '--menu-item-hovered': vars.snbV2.itemHover,
    '--menu-item-pressed': vars.snbV2.itemPressed,
    '--menu-item-selected': vars.snbV2.itemSelected,
    '--text': vars.color.text.default,
    '--text-primary': vars.color.text.default,
    '--text-subtle': vars.color.text.subtle,
    '--text-subtler': vars.color.text.subtler,
    '--text-disabled': vars.color.text.disabled,
    '--border-default': vars.color.border.default,
    '--border-primary': vars.color.border.primary,
  },
  backgroundColor: vars.color.surface.default,
  borderColor: vars.color.border.default,
  color: vars.color.text.default,
  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
})

/** 선택된 3depth의 2depth 조상은 v1처럼 popup 안에서 활성 경로를 보인다. */
globalStyle(
  `${collapsedSubmenuContent} [data-slot="dropdown-menu-sub-trigger"][data-snb-v2-ancestor-selected="true"]`,
  {
    backgroundColor: vars.snbV2.itemHover,
    color: vars.color.text.default,
  },
)

export const sectionTitle = style({
  display: 'flex',
  height: '32px',
  alignItems: 'center',
  boxSizing: 'border-box',
  margin: 0,
  paddingLeft: '16px',
  color: vars.color.text.subtler,
  fontFamily: vars.font.sans,
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease, opacity 0.16s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

export const itemRow = style({
  display: 'flex',
  width: '100%',
  minWidth: 0,
  alignItems: 'center',
  gap: '4px',
  boxSizing: 'border-box',
  paddingRight: '4px',
  transition: 'padding 0.24s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      width: '32px',
      paddingRight: 0,
    },
  },
})

export const activeIndicator = style({
  width: '4px',
  height: '24px',
  flexShrink: 0,
  borderRadius: '4px',
  backgroundColor: vars.color.element.primary,
  opacity: 0,
  transition: 'opacity 0.2s ease, background-color 0.2s ease',
  selectors: {
    '[data-selected="true"] &': { opacity: 1 },
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

export const item = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
  minWidth: 0,
  height: '32px',
  alignItems: 'center',
  gap: '8px',
  boxSizing: 'border-box',
  paddingInline: '8px',
  overflow: 'hidden',
  border: 0,
  borderRadius: '4px',
  backgroundColor: 'transparent',
  color: vars.color.text.subtle,
  cursor: 'pointer',
  fontFamily: vars.font.sans,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  textAlign: 'left',
  transition: 'background-color 0.2s ease, color 0.2s ease, border-radius 0.2s ease',
  selectors: {
    '&[data-selected="true"]': {
      borderRadius: '6px',
      backgroundColor: vars.snbV2.itemSelected,
      color: vars.color.text.default,
    },
    /* 선택 leaf를 포함한 1depth는 background 없이 text만 잠금된 default(black)로 강조한다. */
    '&[data-has-active-descendant="true"]': { color: vars.color.text.default },
    '&:hover:not(:disabled)': { backgroundColor: vars.snbV2.itemHover },
    '&:active:not(:disabled)': { backgroundColor: vars.snbV2.itemPressed },
    '&[data-selected="true"]:hover:not(:disabled)': { backgroundColor: vars.snbV2.itemSelectedHover },
    '&[data-selected="true"]:active:not(:disabled)': { backgroundColor: vars.snbV2.itemSelectedPressed },
    '&:focus-visible': {
      outline: `1px solid ${vars.color.border.primary}`,
      outlineOffset: '1px',
    },
    '&:disabled': {
      color: vars.color.text.disabled,
      cursor: 'not-allowed',
    },
    [`${root}[data-collapsed="true"] &`]: {
      justifyContent: 'center',
      gap: 0,
      paddingInline: '8px',
    },
    [`${root}[data-collapsed="true"] &[data-selected="true"]`]: {
      borderRadius: '0 6px 6px 0',
    },
    [`${root}[data-collapsed="true"] &[data-selected="true"]::before`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '2px',
      height: '32px',
      borderRadius: 0,
      backgroundColor: vars.color.element.primary,
      content: '',
    },
  },
})

/** 펼침 여부는 배경 상태가 아니며, 실제 navigation leaf만 선택 surface를 갖는다. */
export const branch = style({
  width: '100%',
})

/**
 * 하위 메뉴는 DOM에 유지한 채 0fr ↔ 1fr로 전환한다.
 * 그래서 1·2depth 모두 열림/닫힘의 높이와 chevron 회전이 자연스럽게 동기화된다.
 */
export const branchChildren = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  width: '100%',
  marginTop: 0,
  opacity: 0,
  pointerEvents: 'none',
  visibility: 'hidden',
  transition: 'grid-template-rows 0.24s ease, margin-top 0.24s ease, opacity 0.2s ease, visibility 0s linear 0.24s',
  selectors: {
    '&[data-open="true"]': {
      gridTemplateRows: '1fr',
      /* 재현 기준: 1→2, 2→3 depth 시작점 모두 4px 간격. */
      marginTop: '4px',
      opacity: 1,
      pointerEvents: 'auto',
      visibility: 'visible',
      transition: 'grid-template-rows 0.24s ease, margin-top 0.24s ease, opacity 0.2s ease, visibility 0s',
    },
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

/** 1depth Open은 4px 간격, 2depth Open의 3depth 목록은 연속 행으로 이어진다. */
export const branchChildrenContent = style({
  display: 'flex',
  minHeight: 0,
  flexDirection: 'column',
  gap: '4px',
  overflow: 'hidden',
  selectors: {
    [`${branchChildren}[data-depth="2"] &`]: { gap: 0 },
  },
})

/** 2depth 재현 기준: 22px inset + 2px selected anchor + 200px menu surface. */
export const depth2Row = style({
  display: 'flex',
  width: '100%',
  height: '32px',
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingLeft: '22px',
})

export const depth2ActiveIndicator = style({
  width: '2px',
  height: '32px',
  flexShrink: 0,
  backgroundColor: vars.color.element.primary,
  opacity: 0,
  transition: 'opacity 0.2s ease, background-color 0.2s ease',
  selectors: {
    '[data-selected="true"] &': { opacity: 1 },
  },
})

/** 3depth 재현 기준: 40px inset + 1px connector. 선택 시 2px primary anchor로 강조한다. */
export const depth3Row = style({
  display: 'flex',
  width: '100%',
  height: '32px',
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingLeft: '40px',
})

export const depth3ActiveIndicator = style({
  width: '1px',
  height: '32px',
  flexShrink: 0,
  backgroundColor: vars.color.border.default,
  transition: 'width 0.2s ease, background-color 0.2s ease',
  selectors: {
    '[data-selected="true"] &': {
      width: '2px',
      backgroundColor: vars.color.element.primary,
    },
  },
})

/** 2·3 depth label 행. 아이콘 없이 잠금된 14/20 medium label 규칙을 공유한다. */
export const nestedItem = style({
  display: 'flex',
  minWidth: 0,
  height: '32px',
  flex: '1 1 0',
  alignItems: 'center',
  gap: '8px',
  boxSizing: 'border-box',
  paddingInline: '8px',
  overflow: 'hidden',
  border: 0,
  borderRadius: '0 6px 6px 0',
  backgroundColor: 'transparent',
  color: vars.color.text.subtle,
  cursor: 'pointer',
  fontFamily: vars.font.sans,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  textAlign: 'left',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: vars.snbV2.itemSelected,
      color: vars.color.text.default,
    },
    /* 3depth click: 선택 leaf를 포함한 2depth parent는 배경 없이 text만 검정으로 강조한다. */
    '&[data-has-active-descendant="true"]': { color: vars.color.text.default },
    '&:hover:not(:disabled)': { backgroundColor: vars.snbV2.itemHover },
    '&:active:not(:disabled)': { backgroundColor: vars.snbV2.itemPressed },
    '&[data-selected="true"]:hover:not(:disabled)': { backgroundColor: vars.snbV2.itemSelectedHover },
    '&[data-selected="true"]:active:not(:disabled)': { backgroundColor: vars.snbV2.itemSelectedPressed },
    '&:focus-visible': {
      position: 'relative',
      zIndex: 1,
      outline: `1px solid ${vars.color.border.primary}`,
      outlineOffset: '-1px',
    },
    '&:disabled': {
      color: vars.color.text.disabled,
      cursor: 'not-allowed',
    },
  },
})

/** 오른쪽 chevron은 닫힘(right) → 펼침(down)으로 90도 회전한다. */
export const expandIcon = style({
  display: 'block',
  width: '16px',
  height: '16px',
  flexShrink: 0,
  transition: 'color 0.2s ease, transform 0.2s ease',
  selectors: {
    '&[data-expanded="true"]': { transform: 'rotate(90deg)' },
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

export const itemIcon = style({
  position: 'relative',
  display: 'block',
  width: '16px',
  height: '16px',
  flexShrink: 0,
})

export const itemLabel = style({
  minWidth: 0,
  flex: '1 1 0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'opacity 0.16s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

/** Main navigation과 분리된 하단 utility stack. collapsed에서는 footer 직전으로 고정한다. */
export const utilityContainer = style({
  width: '100%',
  flexShrink: 0,
  marginTop: '16px',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      position: 'absolute',
      /* Footer 안의 avatar top과 알림 아이콘 사이를 16px로 맞춘다.
       * footer 82px에서 avatar의 상단 inset 25px을 보정한 값이다. */
      bottom: '73px',
      left: '50%',
      width: '32px',
      marginTop: 0,
      transform: 'translateX(-50%)',
    },
  },
})

export const utilitySection = style([section, {
  flexShrink: 0,
}])

export const footer = style({
  width: '100%',
  flexShrink: 0,
  boxSizing: 'border-box',
  padding: '16px',
  transition: 'padding 0.24s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '60px',
      height: '82px',
      padding: 0,
      transform: 'translateX(-50%)',
    },
  },
})

export const userContainer = style({
  display: 'flex',
  width: '100%',
  minWidth: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  padding: '8px',
  transition: 'justify-content 0.24s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: {
      height: '100%',
      justifyContent: 'center',
      padding: 0,
    },
  },
})

export const userSummary = style({
  display: 'flex',
  minWidth: 0,
  alignItems: 'center',
  gap: '8px',
})

export const userAvatar = style({
  position: 'relative',
  display: 'flex',
  width: '32px',
  height: '32px',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  backgroundColor: vars.color.avatar.solid.indigo,
  color: vars.color.text.static,
  fontFamily: vars.font.sans,
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '16px',
  transition: 'background-color 0.2s ease, color 0.2s ease',
})

export const onlineBadge = style({
  position: 'absolute',
  right: 0,
  bottom: '-2px',
  display: 'block',
  width: '12px',
  height: '12px',
  boxSizing: 'border-box',
  border: `2px solid ${vars.color.surface.primarySubtle}`,
  borderRadius: '50%',
  backgroundColor: vars.palette.green[500],
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
})

export const userText = style({
  display: 'flex',
  width: '97px',
  minWidth: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
  fontFamily: vars.font.sans,
  fontSize: '12px',
  lineHeight: '16px',
  transition: 'opacity 0.16s ease',
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})

export const userName = style({
  width: '100%',
  overflow: 'hidden',
  margin: 0,
  color: vars.color.text.default,
  fontWeight: 600,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
})

export const userEmail = style({
  width: '100%',
  overflow: 'hidden',
  margin: 0,
  color: vars.color.text.subtler,
  fontWeight: 400,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',
})

export const accountTrigger = style({
  display: 'inline-flex',
  padding: 0,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': { outline: `1px solid ${vars.color.border.primary}`, outlineOffset: '2px' },
  },
})

export const accountOverflow = style({
  selectors: {
    [`${root}[data-collapsed="true"] &`]: { display: 'none' },
  },
})
~~~~


### snb-v2-tokens.ts — 제품 역할 adapter

이 mapping은 palette 값을 제공하지 않는다. 제품의 light/dark scope와 Menu portal에서 각 역할 값을
연결한 뒤 상태·대비를 검증한다. CSS alias를 같은 이름으로 자기 참조하지 않도록 별도 제품 역할을 쓴다.

~~~~ts
export const vars = {
  font: { sans: 'var(--font-sans)' },
  color: {
    surface: { primarySubtle: 'var(--cmp-nav-surface)', default: 'var(--cmp-popup-surface)' },
    text: {
      default: 'var(--cmp-nav-text)', subtle: 'var(--cmp-nav-text-subtle)',
      subtler: 'var(--cmp-nav-text-subtler)', disabled: 'var(--cmp-nav-disabled)',
      static: 'var(--cmp-on-nav)',
    },
    border: { default: 'var(--cmp-nav-border)', primary: 'var(--cmp-nav-focus)' },
    element: { primary: 'var(--solution-primary)' },
    avatar: { solid: { indigo: 'var(--cmp-account-avatar)' } },
  },
  snbV2: {
    divider: 'var(--cmp-nav-border)', itemHover: 'var(--cmp-nav-hover)',
    itemPressed: 'var(--cmp-nav-pressed)', itemSelected: 'var(--cmp-nav-selected)',
    itemSelectedHover: 'var(--cmp-nav-selected-hover)',
    itemSelectedPressed: 'var(--cmp-nav-selected-pressed)',
  },
  palette: { green: { 500: 'var(--cmp-status-online)' } },
} as const
~~~~
