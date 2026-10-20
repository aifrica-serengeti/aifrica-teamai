# Tree — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](../README.md)

## 구현 내용

### 부록 B — Tree.tsx 전체

```tsx
import * as React from "react";

import { cn } from "@design/cn";
import { Checkbox } from "@components/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@primitives/dropdown-menu";
import { Icon, type SystemIconName } from "@components/Icon";
import { IconButton } from "@components/IconButton";
import {
  treeRoot,
  treeConnectorOverlay,
  treeChildren,
  treeChildrenInner,
  treeRow,
  treeRowSize,
  treeRowContent,
  treeLabel,
  treeLabelFlush,
  treeSpacer,
  treeSpacerIndent,
  treeConnector,
  treeLeafMarker,
  treeLineBase,
  treeConnectorPosition,
  treeBranch,
  treeBranchElbow,
  treeBranchContinuation,
  treeChevronWrap,
  treeChevronIcon,
  treeLeadingSlot,
  treeSymbolSlot,
  treeLeadingSlotFlush,
  treeTrailing,
} from "./Tree.css";

/**
 * Tree
 *
 * 출처: Figma RP8QTyB9n2ZpgfCgmuXgsz
 *   - Tree (Default): node 9058:166418
 *   - Tree (Symbol):  node 11472:152845
 *
 * 계층적 데이터를 확장/축소 가능한 트리로 표시한다. 4개 하위 요소로 구성:
 *   - Tree-parent : 자식이 있는 노드. triangle arrow(▶/▼) + checkbox + icon + label
 *   - Tree-item   : 리프 노드. connector 선 + checkbox + icon + label
 *   - Tree-spacer : depth별 들여쓰기 단위 (24px/level Default, 28px Symbol).
 *                   펼쳐진 트리의 각 depth 컬럼마다 세로 가이드 선을 가진다.
 *   - Tree-connector : 리프 노드 chevron 자리의 계층 연결선
 *
 * 2 type(Default/Symbol) × 2 size(Small/Medium) × 7 state.
 *
 * 의존 컴포넌트(SSOT — 직접 구현 금지, 기존 컴포넌트 재사용):
 *   - Icon        — triangle arrow(펼침), more(trailing), folder, folder_open
 *   - Checkbox    — 행 내 16px 체크박스 (shadcn primitive)
 *   - IconButton  — selected 시 trailing more 버튼
 *
 * 두 사용 방식을 모두 지원:
 * 1. 데이터 API  — <Tree items={[...]} /> (재귀 상태 관리 내장)
 * 2. 프리미티브  — <TreeParent>/<TreeItem> 직접 조립 (Figma 1:1 매핑)
 */

export type TreeSize = "small" | "medium";
export type TreeType = "default" | "symbol";
export type TreeItemState = "enabled" | "disabled";
/**
 * 가이드 선 길이 — 모든 선(spacer/chevron/connector)이 이 타입을 공유.
 * - top    : 위 절반만 — 첫째 자식(depth 선이 아래로만).
 * - full   : 전체 높이 — 중간 위치.
 * - bottom : 아래 절반만 — 마지막 자식(depth 선이 위로만).
 */
export type TreeLineLength = "top" | "full" | "bottom";

/* ============================================================
 * GuideLine — 조상 spacer 및 standalone connector에 쓰는 1px 세로선.
 * treeLineBase(공통) + treeConnectorPosition(길이 분기) 조합.
 * ============================================================ */
function GuideLine({ length }: { length?: TreeLineLength }) {
  if (!length) return null;
  return (
    <span
      aria-hidden
      className={cn(treeLineBase, treeConnectorPosition[length])}
    />
  );
}

/** 현재 행을 부모 줄기에 붙이는 가로/세로 branch (`├`/`└`). */
function TreeBranch({ length }: { length?: TreeLineLength }) {
  if (!length) return null;
  return (
    <span aria-hidden className={treeBranch}>
      <span className={treeBranchElbow} />
      {length === "full" ? <span className={treeBranchContinuation} /> : null}
    </span>
  );
}

/* ============================================================
 * TreeSpacer — depth 들여쓰기 단위.
 * lineLength prop 으로 내부 세로선 표시.
 * ============================================================ */
export function TreeSpacer({
  type = "default",
  lineLength,
  branchLength,
  className,
}: {
  type?: TreeType;
  /** 가이드 선 길이. undefined = 선 없음. */
  lineLength?: TreeLineLength;
  /** 현재 노드를 부모 줄기에 붙이는 `├`/`└` branch. */
  branchLength?: TreeLineLength;
  className?: string;
}) {
  return (
    <div
      className={cn(treeSpacer, treeSpacerIndent[type], className)}
      aria-hidden
    >
      <GuideLine length={lineLength} />
      <TreeBranch length={branchLength} />
    </div>
  );
}

/* ============================================================
 * TreeConnector — 리프 노드 chevron 자리의 계층 연결선.
 * chevron 자리(24px)에 선을 배치. 부모의 chevron 선과 연속.
 * ============================================================ */
export function TreeConnector({
  length = "full",
  showLine = true,
  slot = false,
  marker = false,
  className,
}: {
  length?: TreeLineLength;
  /** TreeItem 내부에서는 branch가 spacer에 렌더되어 이 선을 숨긴다. */
  showLine?: boolean;
  /** Overlay connector의 종착점 좌표를 잡는 leaf 슬롯. */
  slot?: boolean;
  /** 펼칠 수 없는 리프 노드용 terminal marker. */
  marker?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(treeConnector, className)}
      data-tree-slot={slot ? (marker ? "leaf" : "slot") : undefined}
      aria-hidden
    >
      {showLine ? <GuideLine length={length} /> : null}
      {marker ? <span className={treeLeafMarker} /> : null}
    </div>
  );
}

/* ============================================================
 * 프리미티브 prop 타입 — 공통 leading 옵션.
 * ============================================================ */
interface TreeRowCommonProps {
  /** 행 라벨. */
  label: React.ReactNode;
  /** size. 기본 small(32px). */
  size?: TreeSize;
  /** type. 기본 default(folder icon). symbol 시 28px indent + 24px symbol icon. */
  type?: TreeType;
  /** 체크박스 표시 여부 + 체크 상태. */
  checkbox?: boolean;
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** leading icon (default type). folder 기본. */
  iconName?: SystemIconName | null;
  /** symbol icon (symbol type). symbolIconName 있을 때만 렌더. */
  symbolIconName?: SystemIconName | null;
  /** depth(0부터). 들여쓰기 spacer 개수. */
  depth?: number;
  /**
   * 현재 노드보다 상위 depth 컬럼의 세로 가이드 선.
   * 다음 형제가 있는 조상은 'full', 마지막 조상은 undefined로 두어
   * 마지막 가지 아래에 불필요한 선이 이어지지 않게 한다.
   */
  guideLines?: Array<TreeLineLength | undefined>;
  /** 현재 노드를 부모와 잇는 `├`/`└` branch 길이. */
  branchLength?: TreeLineLength;
  /** Tree 데이터 API가 overlay connector를 쓸 때 inline CSS branch를 숨긴다. */
  showInlineConnector?: boolean;
  /** Overlay connector 계산에 쓰는 노드 식별자. */
  nodeId?: string;
  parentId?: string;
  /** disabled. */
  disabled?: boolean;
  /** selected. */
  selected?: boolean;
  /** 행 클릭(selected 전환) 핸들러. */
  onSelect?: () => void;
  /** 클래스. */
  className?: string;
  /** children(trailing 영역용 - selected more 버튼 등). */
  children?: React.ReactNode;
}

/* ============================================================
 * TreeParent — 자식이 있는 노드.
 * chevron(펼침/접힘) + checkbox + icon + label.
 * ============================================================ */
export function TreeParent({
  label,
  size = "small",
  type = "default",
  expanded = false,
  onExpandedChange,
  checkbox,
  checked,
  onCheckedChange,
  iconName = "folder",
  symbolIconName,
  depth = 0,
  guideLines = [],
  branchLength,
  showInlineConnector = true,
  nodeId,
  parentId,
  disabled = false,
  selected = false,
  onSelect,
  className,
  children,
}: TreeRowCommonProps & {
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}) {
  const hasSymbolIcon = type === "symbol" && Boolean(symbolIconName);
  const hasDefaultIcon = !hasSymbolIcon && Boolean(iconName);
  const hasLeadingIcon = hasSymbolIcon || hasDefaultIcon;
  const iconSlotClassName = checkbox
    ? treeLeadingSlot
    : cn(treeLeadingSlot, treeLeadingSlotFlush);
  const symbolSlotClassName = checkbox
    ? treeSymbolSlot
    : cn(treeSymbolSlot, treeLeadingSlotFlush);
  const labelClassName =
    !checkbox && !hasLeadingIcon ? cn(treeLabel, treeLabelFlush) : treeLabel;

  return (
    <div
      role="treeitem"
      aria-expanded={expanded}
      aria-selected={selected}
      aria-level={depth + 1}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-tree-node-id={nodeId}
      data-tree-parent-id={parentId}
      tabIndex={-1}
      onClick={() => {
        if (!disabled) onSelect?.();
      }}
      className={cn(treeRow, treeRowSize[size], className)}
    >
      <div className={treeRowContent}>
        {/* 마지막 spacer는 현재 노드의 `├`/`└` branch, 앞 spacer는 조상 guide. */}
        {Array.from({ length: depth }, (_, i) => (
          <TreeSpacer
            key={i}
            type={type}
            lineLength={showInlineConnector ? guideLines[i] : undefined}
            branchLength={
              showInlineConnector && i === depth - 1 ? branchLength : undefined
            }
          />
        ))}

        {/* triangle arrow. Connector는 바로 앞 spacer에서 끝나므로 icon과 겹치지 않는다. */}
        <span className={treeChevronWrap} data-tree-slot>
          <IconButton
            icon="triangle_down"
            variant="ghost"
            size="medium"
            iconSize="m"
            aria-label={expanded ? "접기" : "펼치기"}
            disabled={disabled}
            data-expanded={expanded}
            onClick={(e) => {
              e.stopPropagation();
              onExpandedChange?.(!expanded);
            }}
            tabIndex={-1}
            className={treeChevronIcon}
            style={{ position: "relative", zIndex: 1 }}
          />
        </span>

        {/* checkbox (옵션) */}
        {checkbox && (
          <span className={cn(treeLeadingSlot, treeLeadingSlotFlush)}>
            <Checkbox
              size="medium"
              checked={checked}
              disabled={disabled}
              onCheckedChange={onCheckedChange}
              onClick={(e) => e.stopPropagation()}
            />
          </span>
        )}

        {/* leading icon — type 분기 */}
        {hasSymbolIcon && symbolIconName ? (
          <span className={symbolSlotClassName}>
            <Icon
              name={symbolIconName}
              size="2xl"
              color={disabled ? "disabled" : "default"}
            />
          </span>
        ) : hasDefaultIcon && iconName ? (
          <span className={iconSlotClassName}>
            <Icon
              name={expanded ? "folder_open" : iconName}
              size="m"
              color={disabled ? "disabled" : "default"}
            />
          </span>
        ) : null}

        {/* label */}
        <span className={labelClassName}>{label}</span>
      </div>

      {/* trailing — selected 시 more 버튼 등 */}
      {children ? <div className={treeTrailing}>{children}</div> : null}
    </div>
  );
}

/* ============================================================
 * TreeItem — 리프 노드.
 * connector 선 + checkbox + icon + label.
 * selected 시 trailing more(•••) IconButton 자동 렌더.
 * ============================================================ */
export function TreeItem({
  label,
  size = "small",
  type = "default",
  checkbox,
  checked,
  onCheckedChange,
  iconName = "doc_code",
  symbolIconName,
  connector = false,
  connectorLength = "full",
  depth = 0,
  guideLines = [],
  branchLength,
  showInlineConnector = true,
  nodeId,
  parentId,
  disabled = false,
  selected = false,
  onSelect,
  className,
}: TreeRowCommonProps & {
  /** connector 선 표시 여부. */
  connector?: boolean;
  /** connector 선 길이(형제 내 순서). */
  connectorLength?: TreeLineLength;
}) {
  /* Primitive API로 직접 조립할 때도 connectorLength만 넘기면 branch가 보이게 한다. */
  const resolvedBranchLength = branchLength ?? connectorLength;
  const hasSymbolIcon = type === "symbol" && Boolean(symbolIconName);
  const hasDefaultIcon = !hasSymbolIcon && Boolean(iconName);
  const hasLeadingIcon = hasSymbolIcon || hasDefaultIcon;
  const iconSlotClassName = checkbox
    ? treeLeadingSlot
    : cn(treeLeadingSlot, treeLeadingSlotFlush);
  const symbolSlotClassName = checkbox
    ? treeSymbolSlot
    : cn(treeSymbolSlot, treeLeadingSlotFlush);
  const labelClassName =
    !checkbox && !hasLeadingIcon ? cn(treeLabel, treeLabelFlush) : treeLabel;

  return (
    <div
      role="treeitem"
      aria-selected={selected}
      aria-level={depth + 1}
      aria-disabled={disabled || undefined}
      data-size={size}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-tree-node-id={nodeId}
      data-tree-parent-id={parentId}
      tabIndex={-1}
      onClick={() => {
        if (!disabled) onSelect?.();
      }}
      className={cn(treeRow, treeRowSize[size], className)}
    >
      <div className={treeRowContent}>
        {/* 마지막 spacer가 부모와 현재 leaf를 잇는 `├`/`└` branch를 가진다. */}
        {Array.from({ length: depth }, (_, i) => (
          <TreeSpacer
            key={i}
            type={type}
            lineLength={showInlineConnector ? guideLines[i] : undefined}
            branchLength={
              showInlineConnector && i === depth - 1 && connector
                ? resolvedBranchLength
                : undefined
            }
          />
        ))}

        {/* 모든 leaf는 parent chevron과 같은 24px 슬롯 + marker를 유지한다.
            connector는 부모와 잇는 선의 유무일 뿐 marker 표시 조건이 아니다. */}
        {connector ? (
          <TreeConnector
            length={connectorLength}
            showLine={false}
            slot
            marker
          />
        ) : (
          <TreeConnector showLine={false} slot marker />
        )}

        {/* checkbox (옵션) */}
        {checkbox && (
          <span className={cn(treeLeadingSlot, treeLeadingSlotFlush)}>
            <Checkbox
              size="medium"
              checked={checked}
              disabled={disabled}
              onCheckedChange={onCheckedChange}
              onClick={(e) => e.stopPropagation()}
            />
          </span>
        )}

        {/* leading icon — type 분기 */}
        {hasSymbolIcon && symbolIconName ? (
          <span className={symbolSlotClassName}>
            <Icon
              name={symbolIconName}
              size="2xl"
              color={disabled ? "disabled" : "default"}
            />
          </span>
        ) : hasDefaultIcon && iconName ? (
          <span className={iconSlotClassName}>
            <Icon
              name={iconName}
              size="m"
              color={disabled ? "disabled" : "default"}
            />
          </span>
        ) : null}

        {/* label */}
        <span className={labelClassName}>{label}</span>
      </div>

      {/* trailing — selected 시 more(•••) 버튼. */}
      {selected && !disabled ? (
        <div className={treeTrailing}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                icon="more_horizontal"
                variant="ghost"
                size="medium"
                iconSize="m"
                aria-label="더 보기"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent size="small" align="end" scrollable={false}>
              <DropdownMenuItem>이름 변경</DropdownMenuItem>
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
 * 데이터 API — 편의 래퍼. 재귀적으로 트리를 렌더.
 * ============================================================ */
export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
  iconName?: SystemIconName | null;
  symbolIconName?: SystemIconName | null;
  checkbox?: boolean;
  checked?: boolean | "indeterminate";
  disabled?: boolean;
}

export interface TreeProps {
  items: TreeNode[];
  size?: TreeSize;
  type?: TreeType;
  /** default: true. false면 selected leaf의 기본 더 보기 메뉴를 렌더하지 않는다. */
  showLeafActions?: boolean;
  /** className. */
  className?: string;
  /** 각 노드 렌더 시 추가 prop을 주입할 수 있는 훅(옵션). */
  renderNode?: (
    node: TreeNode,
    depth: number,
    hasChildren: boolean,
    index: number,
    siblingCount: number,
  ) => Partial<{
    selected: boolean;
    expanded: boolean;
    connector: boolean;
    connectorLength: TreeLineLength;
    onExpandedChange: (expanded: boolean) => void;
    onCheckedChange: (checked: boolean | "indeterminate") => void;
    onSelect: () => void;
  }>;
}

interface TreeConnectorPath {
  /** child node id — path DOM을 재사용해 opacity animation을 끊지 않는다. */
  id: string;
  d: string;
  /** 닫히는 subtree 내부 선은 행이 clip되는 속도와 맞춰 fade out한다. */
  collapsing?: boolean;
  /** 펼치는 subtree 내부 선은 행이 자리 잡은 뒤 짧게 지연해 표시한다. */
  opening?: boolean;
}

/**
 * Tree — 데이터 기반 트리 컨테이너.
 * items 를 재귀 순회하며 TreeParent/TreeItem 을 렌더한다.
 * 펼침/선택/체크 상태는 renderNode 훅으로 소비자가 제어(controlled 권장).
 *
 * 가이드 선 자동 계산: 상위 spacer에는 다음 형제가 있는 조상만 세로선을
 * 유지하고, 마지막 spacer에는 현재 행의 `├`/`└` branch를 그린다.
 */
export function Tree({
  items,
  size = "small",
  type = "default",
  className,
  renderNode,
}: TreeProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [connectorPaths, setConnectorPaths] = React.useState<
    TreeConnectorPath[]
  >([]);
  /*
   * 접힌 subtree는 닫힘 애니메이션이 끝난 뒤 unmount한다. 큰 트리에서
   * 보이지 않는 수백 개의 행과 connector 측정을 계속 유지하지 않기 위함이다.
   */
  const [mountedChildGroups, setMountedChildGroups] = React.useState<
    Set<string>
  >(() => new Set());
  /* 선택/체크 변경은 connector 좌표에 영향을 주지 않는다. 펼침/접힘 때만
   * connector effect를 다시 시작해 대용량 트리의 불필요한 DOM 측정을 막는다. */
  const [connectorLayoutRevision, setConnectorLayoutRevision] =
    React.useState(0);
  const expansionStatesRef = React.useRef(new WeakMap<HTMLElement, string>());
  const transitioningGroupsRef = React.useRef(new Set<HTMLElement>());
  const connectorTransitionLockedRef = React.useRef(false);
  const connectorSyncRef = React.useRef<
    (includeTransitioningGroups?: boolean) => void
  >(() => {});
  const connectorSettleTimerRef = React.useRef<number | undefined>(undefined);
  const connectorRevealTimerRef = React.useRef<number | undefined>(undefined);
  const connectorAnimationFrameRef = React.useRef<number | undefined>(
    undefined,
  );
  const connectorTransitionGenerationRef = React.useRef(0);
  const unrevealedOpeningGroupsRef = React.useRef(new Set<HTMLElement>());

  React.useEffect(
    () => () => {
      if (connectorSettleTimerRef.current !== undefined) {
        window.clearTimeout(connectorSettleTimerRef.current);
      }
      if (connectorRevealTimerRef.current !== undefined) {
        window.clearTimeout(connectorRevealTimerRef.current);
      }
      if (connectorAnimationFrameRef.current !== undefined) {
        window.cancelAnimationFrame(connectorAnimationFrameRef.current);
      }
    },
    [],
  );

  /*
   * 행마다 선 조각을 렌더하면 선택 배경·sub-pixel 반올림에 의해 줄기가
   * 끊겨 보인다. 실제 DOM 좌표를 기준으로 부모부터 각 자식까지 하나의
   * SVG path를 만들면 모든 형제의 공통 세로선이 정확히 겹친다.
   */
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    /* 최초부터 펼쳐진 그룹도 닫힘 애니메이션 중에는 자식을 유지해야 한다. */
    const initiallyExpandedGroupIds = Array.from(
      root.querySelectorAll<HTMLElement>(
        '[data-tree-children="true"][data-expanded="true"]',
      ),
    ).flatMap((group) => {
      const id = group.dataset.treeGroupId;
      return id ? [id] : [];
    });
    if (initiallyExpandedGroupIds.length > 0) {
      setMountedChildGroups((previous) => {
        const next = new Set(previous);
        let changed = false;
        for (const id of initiallyExpandedGroupIds) {
          if (!next.has(id)) {
            next.add(id);
            changed = true;
          }
        }
        return changed ? next : previous;
      });
    }

    const updateConnectorPaths = (includeTransitioningGroups = false) => {
      const rootRect = root.getBoundingClientRect();
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-tree-node-id]"),
      ).flatMap((row) => {
        const collapsedGroup = row.closest<HTMLElement>(
          '[data-tree-children="true"][data-expanded="false"]',
        );
        const isCollapsing = Boolean(
          collapsedGroup && transitioningGroupsRef.current.has(collapsedGroup),
        );
        const expandedGroup = row.closest<HTMLElement>(
          '[data-tree-children="true"][data-expanded="true"]',
        );
        const isOpening = Boolean(
          expandedGroup &&
          unrevealedOpeningGroupsRef.current.has(expandedGroup),
        );
        if (collapsedGroup && (!includeTransitioningGroups || !isCollapsing)) {
          return [];
        }
        const id = row.dataset.treeNodeId;
        const slot = row.querySelector<HTMLElement>("[data-tree-slot]");
        if (!id || !slot) return [];

        const rowRect = row.getBoundingClientRect();
        const slotRect = slot.getBoundingClientRect();
        return [
          {
            id,
            parentId: row.dataset.treeParentId,
            bottom: rowRect.bottom - rootRect.top,
            center: rowRect.top - rootRect.top + rowRect.height / 2,
            slotCenter: slotRect.left - rootRect.left + slotRect.width / 2,
            slotLeft: slotRect.left - rootRect.left,
            /* Marker는 슬롯 중앙에만 두고 connector는 슬롯 시작점에서 멈춘다. */
            connectorEnd: slotRect.left - rootRect.left,
            collapsing: isCollapsing,
            opening: isOpening,
          },
        ];
      });
      const nodesById = new Map(nodes.map((node) => [node.id, node]));
      const nextPaths = nodes.flatMap((node) => {
        if (!node.parentId) return [];
        const parent = nodesById.get(node.parentId);
        if (!parent) return [];

        const radius = Math.min(
          6,
          Math.max(0, node.connectorEnd - parent.slotCenter),
        );
        const curveStart = Math.max(parent.bottom, node.center - radius);
        return [
          {
            id: node.id,
            d: `M ${parent.slotCenter} ${parent.bottom} V ${curveStart} Q ${parent.slotCenter} ${node.center} ${parent.slotCenter + radius} ${node.center} H ${node.connectorEnd}`,
            collapsing: node.collapsing,
            opening: node.opening,
          },
        ];
      });

      setConnectorPaths((previous) => {
        const unchanged =
          previous.length === nextPaths.length &&
          previous.every(
            (path, index) =>
              path.id === nextPaths[index]?.id &&
              path.d === nextPaths[index]?.d &&
              path.collapsing === nextPaths[index]?.collapsing &&
              path.opening === nextPaths[index]?.opening,
          );
        return unchanged ? previous : nextPaths;
      });
    };

    connectorSyncRef.current = updateConnectorPaths;

    const childGroups = Array.from(
      root.querySelectorAll<HTMLElement>('[data-tree-children="true"]'),
    );
    let hasExpansionChange = false;
    const openingGroups: HTMLElement[] = [];
    const closingGroups: HTMLElement[] = [];
    for (const group of childGroups) {
      const nextState = group.dataset.expanded ?? "false";
      const previousState = expansionStatesRef.current.get(group);
      if (previousState !== undefined && previousState !== nextState) {
        hasExpansionChange = true;
        transitioningGroupsRef.current.add(group);
        if (previousState === "false" && nextState === "true") {
          unrevealedOpeningGroupsRef.current.add(group);
          openingGroups.push(group);
        } else {
          unrevealedOpeningGroupsRef.current.delete(group);
          closingGroups.push(group);
        }
      }
      expansionStatesRef.current.set(group, nextState);
    }

    const finishConnectorTransition = () => {
      /* transition 마지막 frame의 좌표를 보존한다. 여기서 전체 DOM을 다시
       * 측정하면 아래 형제 connector가 한 번 더 밀렸다가 돌아올 수 있다. */
      connectorSyncRef.current(true);
      transitioningGroupsRef.current.clear();
      unrevealedOpeningGroupsRef.current.clear();
      setConnectorPaths((previous) =>
        previous
          .filter((path) => !path.collapsing)
          .map(
            ({ collapsing: _collapsing, opening: _opening, ...path }) => path,
          ),
      );
    };

    const stopConnectorAnimation = () => {
      if (connectorAnimationFrameRef.current !== undefined) {
        window.cancelAnimationFrame(connectorAnimationFrameRef.current);
        connectorAnimationFrameRef.current = undefined;
      }
    };

    const unmountCollapsedGroup = (group: HTMLElement) => {
      const groupId = group.dataset.treeGroupId;
      if (!groupId || group.dataset.expanded !== "false") return;

      setMountedChildGroups((previous) => {
        if (!previous.has(groupId)) return previous;
        const next = new Set(previous);
        next.delete(groupId);
        return next;
      });
    };

    const startConnectorAnimation = () => {
      if (connectorAnimationFrameRef.current !== undefined) return;

      const updateAnimationFrame = () => {
        if (transitioningGroupsRef.current.size === 0) {
          connectorAnimationFrameRef.current = undefined;
          return;
        }
        /* x좌표는 슬롯 기준으로 고정하고, accordion 높이에 따라 바뀌는
         * y좌표만 매 프레임 다시 읽어 connector가 행을 자연스럽게 따른다. */
        connectorSyncRef.current(true);
        connectorAnimationFrameRef.current =
          window.requestAnimationFrame(updateAnimationFrame);
      };

      updateAnimationFrame();
    };

    const scheduleConnectorSettle = (generation: number) => {
      if (connectorSettleTimerRef.current !== undefined) {
        window.clearTimeout(connectorSettleTimerRef.current);
      }
      connectorSettleTimerRef.current = window.setTimeout(() => {
        connectorSettleTimerRef.current = undefined;
        if (connectorTransitionGenerationRef.current !== generation) return;
        finishConnectorTransition();
      }, 250);
    };

    const scheduleConnectorReveal = (generation: number) => {
      if (connectorRevealTimerRef.current !== undefined) {
        window.clearTimeout(connectorRevealTimerRef.current);
        connectorRevealTimerRef.current = undefined;
      }
      if (openingGroups.length === 0) return;

      connectorRevealTimerRef.current = window.setTimeout(() => {
        connectorRevealTimerRef.current = undefined;
        if (connectorTransitionGenerationRef.current !== generation) return;
        for (const group of openingGroups) {
          unrevealedOpeningGroupsRef.current.delete(group);
        }
        connectorSyncRef.current(true);
      }, 80);
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (
        event.propertyName !== "grid-template-rows" ||
        !(event.target instanceof HTMLElement) ||
        event.target.dataset.treeChildren !== "true"
      ) {
        return;
      }

      const group = event.target;
      transitioningGroupsRef.current.delete(group);
      if (group.dataset.expanded === "false") {
        /* 마지막 connector frame을 그린 뒤 subtree 행을 제거한다. */
        window.requestAnimationFrame(() => unmountCollapsedGroup(group));
      }
      if (transitioningGroupsRef.current.size === 0) {
        if (connectorSettleTimerRef.current !== undefined) {
          window.clearTimeout(connectorSettleTimerRef.current);
          connectorSettleTimerRef.current = undefined;
        }
        if (connectorRevealTimerRef.current !== undefined) {
          window.clearTimeout(connectorRevealTimerRef.current);
          connectorRevealTimerRef.current = undefined;
        }
        const generation = connectorTransitionGenerationRef.current;
        window.requestAnimationFrame(() => {
          if (
            connectorTransitionGenerationRef.current !== generation ||
            transitioningGroupsRef.current.size > 0
          ) {
            return;
          }
          stopConnectorAnimation();
          finishConnectorTransition();
        });
      }
    };

    root.addEventListener("transitionend", onTransitionEnd);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (hasExpansionChange && !reduceMotion) {
      /* 접힌 그룹의 행도 전환이 끝날 때까지 포함해, 선이 한 프레임에
       * 사라지거나 아래 형제 행을 침범하지 않고 높이 변화와 함께 수축한다. */
      const generation = ++connectorTransitionGenerationRef.current;
      startConnectorAnimation();
      scheduleConnectorReveal(generation);
      scheduleConnectorSettle(generation);
    } else if (hasExpansionChange) {
      stopConnectorAnimation();
      finishConnectorTransition();
      closingGroups.forEach(unmountCollapsedGroup);
    } else if (transitioningGroupsRef.current.size === 0) {
      updateConnectorPaths();
    }

    if (hasExpansionChange) {
      connectorTransitionLockedRef.current = false;
    }

    const observer = new ResizeObserver(() => {
      if (
        !connectorTransitionLockedRef.current &&
        transitioningGroupsRef.current.size === 0
      ) {
        updateConnectorPaths();
      }
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      root.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [connectorLayoutRevision]);

  /**
   * ancestorLast: 각 조상 depth에서 조상이 마지막 자식이었는지.
   * 마지막 조상은 현재 branch가 그리는 컬럼이므로 제외하고, 그보다 위
   * 조상만 세로 가이드로 렌더한다.
   */
  const renderNodes = (
    nodes: TreeNode[],
    depth: number,
    ancestorLast: boolean[] = [],
    parentId?: string,
  ): React.ReactNode[] => {
    return nodes.map((node, index) => {
      const hasChildren = !!node.children && node.children.length > 0;
      const extra =
        renderNode?.(node, depth, hasChildren, index, nodes.length) ?? {};
      const isLast = index === nodes.length - 1;

      const guideLines = ancestorLast
        .slice(0, -1)
        .map((last) => (last ? undefined : "full"));
      const branchLength = depth > 0 ? (isLast ? "bottom" : "full") : undefined;

      if (hasChildren) {
        const expanded = extra.expanded ?? false;
        const shouldRenderChildren =
          expanded || mountedChildGroups.has(node.id);
        return (
          <React.Fragment key={node.id}>
            <TreeParent
              label={node.label}
              size={size}
              type={type}
              depth={depth}
              guideLines={guideLines}
              branchLength={branchLength}
              showInlineConnector={false}
              nodeId={node.id}
              parentId={parentId}
              expanded={expanded}
              onExpandedChange={
                extra.onExpandedChange
                  ? (nextExpanded) => {
                      /* React state가 바뀌기 전부터 observer 갱신을 막아
                       * 이전 connector 경로가 전환 중 흔들리지 않게 한다. */
                      connectorTransitionLockedRef.current = true;
                      if (nextExpanded) {
                        setMountedChildGroups((previous) => {
                          if (previous.has(node.id)) return previous;
                          const next = new Set(previous);
                          next.add(node.id);
                          return next;
                        });
                      }
                      setConnectorLayoutRevision((previous) => previous + 1);
                      extra.onExpandedChange?.(nextExpanded);
                    }
                  : undefined
              }
              checkbox={node.checkbox}
              checked={node.checked}
              onCheckedChange={extra.onCheckedChange}
              iconName={node.iconName}
              symbolIconName={node.symbolIconName}
              disabled={node.disabled}
              selected={extra.selected}
              onSelect={extra.onSelect}
            />
            <div
              className={treeChildren}
              data-tree-children="true"
              data-tree-group-id={node.id}
              data-expanded={expanded ? "true" : "false"}
              role="group"
              aria-hidden={!expanded}
            >
              <div className={treeChildrenInner}>
                {shouldRenderChildren
                  ? renderNodes(
                      node.children!,
                      depth + 1,
                      [...ancestorLast, isLast],
                      node.id,
                    )
                  : null}
              </div>
            </div>
          </React.Fragment>
        );
      }

      // 리프 — 최상위 리프도 marker를 표시한다. connector는 부모와 잇는 선에만 필요하다.
      return (
        <TreeItem
          key={node.id}
          label={node.label}
          size={size}
          type={type}
          depth={depth}
          guideLines={guideLines}
          branchLength={branchLength}
          showInlineConnector={false}
          nodeId={node.id}
          parentId={parentId}
          checkbox={node.checkbox}
          checked={node.checked}
          onCheckedChange={extra.onCheckedChange}
          iconName={node.iconName}
          symbolIconName={node.symbolIconName}
          disabled={node.disabled}
          selected={extra.selected}
          onSelect={extra.onSelect}
          connector={extra.connector ?? depth > 0}
          connectorLength={
            extra.connectorLength ?? (isLast ? "bottom" : "full")
          }
        />
      );
    });
  };

  return (
    <div ref={rootRef} role="tree" className={cn(treeRoot, className)}>
      {connectorPaths.length > 0 ? (
        <svg className={treeConnectorOverlay} aria-hidden>
          {connectorPaths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              data-collapsing={path.collapsing || undefined}
              data-opening={path.opening || undefined}
              fill="none"
              stroke="var(--tree-connector)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      ) : null}
      {renderNodes(items, 0)}
    </div>
  );
}
```
