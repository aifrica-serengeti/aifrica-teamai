# Tree — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](../README.md)

## 구현 내용

### 부록 A — Tree.css.ts 전체

```ts
/**
 * Tree — 스타일 정의 (portable 1단계 위치)
 *
 * 출처: Figma RP8QTyB9n2ZpgfCgmuXgsz
 *   - Tree (Default): node 9058:166418
 *   - Tree (Symbol):  node 11472:152845
 *
 * 구조: Tree-parent(자식 있는 노드) / Tree-item(리프 노드) +
 *       Tree-spacer(depth 들여쓰기) / Tree-connector(계층 연결선).
 *
 * 매트릭스: 2 type(Default/Symbol) × 2 size(Small 32px/Medium 40px)
 *          × 7 state(Enabled/Hovered/Pressed/Active/Focused/Selected/Disabled).
 *
 * 색상/스펙은 모두 globals.css 의 semantic 토큰을 따른다.
 * - 행 배경: transparent(enabled) / --action-opacity-hovered(hover)
 *           / --action-opacity-pressed(pressed) / --surface-primary-subtle(selected)
 * - 텍스트: --text(enabled) / --text-disabled(disabled)
 * - selected 막대: --border-primary (2px inset box-shadow — 레이아웃 밀림 방지)
 * - connector 선: --tree-connector (1px, 가독성 보강)
 *
 * 다크 모드는 .dark 에서 semantic 토큰이 전환되어 자동 적용된다.
 * 색상 전환 transition 은 각 요소에 0.2s 로 통일(transition: all 금지).
 */
import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

/* ============================================================
 * Root — 트리 컨테이너. 세로 스택. 행 간 gap 없음.
 * ============================================================ */
export const treeRoot = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
  minWidth: "0",
});

/*
 * 접힌 하위 트리도 DOM에 유지해 grid row 높이로 전환한다. 그러면
 * 일반 card accordion처럼 열릴 때는 아래로, 닫힐 때는 위로 부드럽게 수축한다.
 */
export const treeChildren = style({
  display: "grid",
  gridTemplateRows: "0fr",
  opacity: 0,
  transition: "grid-template-rows 0.2s ease, opacity 0.2s ease",
  selectors: {
    '&[data-expanded="true"]': {
      gridTemplateRows: "1fr",
      opacity: 1,
    },
  },
});

export const treeChildrenInner = style({
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  overflow: "hidden",
});

/*
 * 데이터 API용 connector layer. 모든 부모-자식 선을 하나의 SVG 좌표계에서
 * 그려 행 단위 CSS 조각 사이에 틈이 생기지 않게 한다.
 */
export const treeConnectorOverlay = style({
  position: "absolute",
  inset: "0",
  width: "100%",
  height: "100%",
  overflow: "visible",
  pointerEvents: "none",
  /* 행의 흰 배경 위에 그려야 connector가 가려지지 않는다. */
  zIndex: 3,
});

/* 닫히는 subtree의 행은 overflow로 clip된다. 그 행으로 향하는 선도
 * 같은 0.2초에 사라져 아래 형제 행까지 길게 남지 않게 한다. */
globalStyle(`${treeConnectorOverlay} path`, {
  opacity: 1,
  transition: "opacity 0.12s ease",
});

globalStyle(`${treeConnectorOverlay} path[data-collapsing]`, {
  opacity: 0,
  transition: "opacity 0.2s ease",
});

globalStyle(`${treeConnectorOverlay} path[data-opening]`, {
  opacity: 0,
});

/* ============================================================
 * Row — Tree-parent / Tree-item 공통 행 박스.
 * 좌측 들여쓰기(padding-left) = depth × indentUnit 으로 계층 표현.
 * pl-[2px] pr-[8px] (Figma). radius 4px.
 * overflow clip 은 selected 막대(::before 직사각형) 직선 유지를 위해
 * clip 유지 — ::before 를 직사각형으로 두면 clip 되어도 직선.
 * ============================================================ */
export const treeRow = style({
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4px",
  padding: "0 8px 0 2px",
  borderRadius: "4px",
  overflow: "clip",
  /* 기본 행은 부모 표면을 그대로 보여 준다. */
  backgroundColor: "transparent",
  color: "var(--text)",
  cursor: "pointer",
  userSelect: "none",
  /* 색상 전환만 — 절대 transition: all 쓰지 않음. */
  transition:
    "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    /* Disabled — 텍스트/아이콘 회색 + 커서 금지. 배경은 유지. */
    "&[data-disabled]": {
      color: "var(--text-disabled)",
      cursor: "not-allowed",
    },
    /* Hovered — 현재 표면 위에 상태 오버레이를 적용한다. */
    "&:hover:not([data-disabled]):not([data-selected])": {
      backgroundColor: "var(--action-opacity-hovered)",
    },
    /* Pressed — 더 진한 알파 오버레이(rgba(0,0,0,0.1)). */
    "&:active:not([data-disabled]):not([data-selected])": {
      backgroundColor: "var(--action-opacity-pressed)",
    },
    /* Selected — primary-subtle 배경.
     * 좌측 2px accent 막대는 ::before 직사각형으로 렌더.
     * box-shadow inset 은 행의 border-radius 를 따라 곡선으로 퍼져
     * "오른쪽 border 가 굽어 보이는" 문제가 생긴다(사용자 피드백).
     * ::before absolute 직사각형은 overflow clip 되어도 직선을 유지한다. */
    "&[data-selected]::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "2px",
      backgroundColor: "var(--border-primary)",
      borderRadius: "0",
    },
    "&[data-selected]": {
      backgroundColor: "var(--surface-primary-subtle)",
    },
    /* Focused — 1px primary outline + 1px offset (Button/Radio/Checkbox 와 동일). */
    "&:focus-visible": {
      outline: "1px solid var(--border-primary)",
      outlineOffset: "1px",
    },
    "&::-moz-focus-inner": { border: 0 },
  },
});

/* Row size — Small 32px / Medium 40px 행 높이. */
export const treeRowSize = styleVariants({
  small: { minHeight: "32px" },
  medium: { minHeight: "40px" },
});

/* ============================================================
 * Content — 행 내 leading 요소들 + label 묶음.
 * gap 4px. flex: 1 (trailing more 버튼과 나란히).
 * ============================================================ */
export const treeRowContent = style({
  display: "flex",
  alignItems: "center",
  /*
   * Connector columns must touch. A flex gap here created a 4px break between
   * the vertical guide and its horizontal branch, which is why the previous
   * connector looked disconnected. Content spacing is applied by the leading
   * slots and label below instead.
   */
  gap: "0",
  minWidth: "0",
  flex: "1 1 auto",
});

/* ============================================================
 * Label — Body2 (14px/20px Regular). whitespace nowrap.
 * ============================================================ */
export const treeLabel = style({
  font: "var(--text-body2)",
  marginLeft: "4px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

/* checkbox와 leading icon이 모두 없을 때 connector 슬롯 뒤에 바로 붙인다. */
export const treeLabelFlush = style({
  marginLeft: "0",
});

/* ============================================================
 * 가이드 선 시스템 (사용자 피드백 기반 전면 재설계)
 *
 * 목표: 펼쳐진 트리의 각 depth 컬럼마다 세로선이 위에서 아래로
 *       끊김 없이 이어진다(부모 행 → 자식 행 연속).
 *
 * 핵심 원칙:
 * 1) 들여쓰기 컬럼은 gap 없이 이어져 정확히 24px 단위가 된다.
 * 2) 각 자식의 마지막 spacer에 `├`/`└` branch를 그린다. 따라서
 *    세로선은 부모 중심에서 시작해 자식 행 중심까지 이어지고, 가로선은
 *    실제 노드 슬롯 직전까지 자연스럽게 연결된다.
 * 3) 선 색상은 semantic `--tree-connector`를 사용해 라이트/다크에서 한 단계 높은 대비를 유지한다.
 *
 * 상위 depth의 spacer는 해당 조상에 다음 형제가 있을 때만 전체 세로선을
 * 유지한다. 마지막 형제의 세로선은 행 중심에서 끝나므로 다음 형제나
 * 빈 공간으로 선이 새지 않는다.
 * ============================================================ */

/* 세로선 공통 베이스 — 모든 선이 이 스타일을 공유.
 * 1px, semantic tree-connector, 컬럼 정중앙.
 * 위아래 행과 1px 겹쳐 렌더해 sub-pixel 반올림으로 생기는 틈을 막는다. */
export const treeLineBase = style({
  position: "absolute",
  left: "50%",
  width: "0",
  borderWidth: "0 0 0 1px",
  borderStyle: "solid",
  borderColor: "var(--tree-connector)",
  transform: "translateX(-0.5px)",
  /* 색상 전환(다크 모드). */
  transition: "border-color 0.2s ease",
});

/*
 * 현재 노드를 부모에 연결하는 `├`/`└` branch.
 * elbow는 border-bottom-left-radius로 꺾이는 지점을 둥글게 만들고,
 * full branch에는 별도의 continuation을 겹쳐 아래 행까지 선을 잇는다.
 */
export const treeBranch = style({
  position: "absolute",
  inset: "0",
  pointerEvents: "none",
});

export const treeBranchElbow = style({
  position: "absolute",
  left: "calc(50% - 0.5px)",
  right: "0",
  top: "-1px",
  bottom: "calc(50% - 0.5px)",
  boxSizing: "border-box",
  borderBottom: "1px solid var(--tree-connector)",
  borderLeft: "1px solid var(--tree-connector)",
  borderBottomLeftRadius: "6px",
  transition: "border-color 0.2s ease",
});

/* `├`의 아래쪽 세로선. elbow와 1px 겹쳐 행 사이에서 끊기지 않는다. */
export const treeBranchContinuation = style({
  position: "absolute",
  left: "calc(50% - 0.5px)",
  top: "calc(50% - 0.5px)",
  bottom: "-1px",
  width: "1px",
  borderRadius: "0.5px",
  backgroundColor: "var(--tree-connector)",
  transition: "background-color 0.2s ease",
});

/* 선 길이 분기 — top: 위 절반 / full: 전체 / bottom: 아래 절반. */
export const treeConnectorPosition = styleVariants({
  /* 위 절반만 — 첫째 자식(depth 선이 아래로만). */
  top: { top: "0", bottom: "50%" },
  /* 전체 — 중간 위치. */
  full: { top: "0", bottom: "0" },
  /* 아래 절반만 — 마지막 자식(depth 선이 위로만). */
  bottom: { top: "50%", bottom: "0" },
});

/* ============================================================
 * Spacer — depth 들여쓰기 단위 (24px / 28px).
 * 내부에 가이드 선을 가질 수 있다.
 * ============================================================ */
export const treeSpacer = style({
  display: "flex",
  alignItems: "flex-start",
  flexShrink: 0,
  alignSelf: "stretch",
  width: "24px",
  position: "relative",
});

export const treeSpacerIndent = styleVariants({
  default: { width: "24px" },
  symbol: { width: "28px" },
});

/* ============================================================
 * Connector 컬럼 — chevron/connector 자리 (24px).
 * 부모 노드의 chevron 컬럼과 자식 노드의 connector 컬럼이
 * 같은 위치이므로 선이 연속으로 이어진다.
 * ============================================================ */
export const treeConnector = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "stretch",
  /* height: 100%는 flex에서 marker 높이(5px)로 계산될 수 있다.
   * auto + stretch로 행 콘텐츠(24px) 높이를 채워 marker를 세로 중앙에 둔다. */
  height: "auto",
  width: "24px",
  flexShrink: 0,
  position: "relative",
});

/* 리프 노드의 빈 chevron 슬롯을 채우는 5px 원형 terminal marker. */
export const treeLeafMarker = style({
  width: "5px",
  height: "5px",
  flexShrink: 0,
  borderRadius: "50%",
  /* Triangle arrow와 동일한 semantic 색상. */
  backgroundColor: "var(--icon)",
  transition: "background-color 0.2s ease",
  selectors: {
    /* disabled triangle arrow와 같은 semantic 색상으로 전환. */
    [`${treeRow}[data-disabled] > ${treeRowContent} > ${treeConnector} > &`]: {
      backgroundColor: "var(--icon-disabled)",
    },
  },
});

/* 사용하지 않는旧 스타일 — 호환 위해 export 유지(내부 미참조).
 * TODO: 정리 후 제거. */
export const treeConnectorLine = treeLineBase;

/* ============================================================
 * Triangle arrow — 펼침/접힘 토글 아이콘.
 * Figma 원본은 솔리드 triangle(▸/▾) 이다. chevron(V자) 이 아님.
 * ============================================================ */
export const treeChevronWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  flexShrink: 0,
});

export const treeChevronIcon = style({
  transition: "transform 0.2s ease",
  transform: "rotate(-90deg)",
  selectors: {
    /* expanded — 아래쪽 ▼ (0deg). */
    '&[data-expanded="true"]': { transform: "rotate(0deg)" },
  },
});

/* ============================================================
 * Leading slot wrappers — checkbox / icon / symbol 컨테이너 (24px 정방형).
 * ============================================================ */
export const treeLeadingSlot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  flexShrink: 0,
  marginLeft: "4px",
});

/* Symbol 은 24px 아이콘 — padding-left 4px 로 chevron 과 간격(Figma Symbol container). */
export const treeSymbolSlot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "4px",
  marginLeft: "4px",
  flexShrink: 0,
});

/* checkbox 또는 checkbox 없는 아이콘을 connector 슬롯에 바로 붙인다. */
export const treeLeadingSlotFlush = style({
  marginLeft: "0",
});

/* ============================================================
 * Trailing — Selected 상태의 more(•••) Icon Button.
 * IconButton(ghost, xxs) 으로 위임.
 * ============================================================ */
export const treeTrailing = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "4px",
  flexShrink: 0,
  /* 비 selected 일 땐 자식이 없어 공간 차지 안 함. */
});

/* ============================================================
 * Page 데모용 — 스펙 시트 그룹핑.
 * ============================================================ */
export const treeDemoGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
```
