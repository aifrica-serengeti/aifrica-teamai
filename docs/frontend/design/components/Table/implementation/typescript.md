# Table — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](../README.md)

## 구현 내용

### 행 작업의 단일 소유자

`대상 솔루션의 public UI mapping`가 작업 수에 따른 표현,
Menu/Tooltip 조합, danger 그룹, 이벤트 전파 차단과 focus 전달을 소유한다.
`triggerMode="menu"`를 명시하면 작업이 1개여도 더보기 메뉴로 통일하며, 기본 `auto`는 유지한다.
`Table.tsx`의 `renderRowAction`은 마지막 열을 추가하고 같은 렌더러에 행·index callback을 연결한다.
기존 컬럼을 유지해야 하면 다음처럼 공개 진입점을 사용한다.

```tsx
import { TableRowActions } from "./row-actions/TableRowActions";

// columns 안의 renderCell: (file) => ...
<TableRowActions
  ariaLabel={`${file.name} 관리`}
  disabled={pending}
  menuItems={[
    {
      id: "download",
      label: "다운로드",
      icon: "download",
      onSelect: () => download(file),
    },
    ...(editable
      ? [
          {
            id: "delete",
            label: "삭제",
            icon: "trash" as const,
            danger: true,
            onSelect: (trigger: HTMLButtonElement) =>
              confirmDelete(file, trigger),
          },
        ]
      : []),
  ]}
/>;
```

Menu 선택에서는 작업 id만 ref에 저장하고 `onCloseAutoFocus`에서 최신 배열과 disabled를 재확인한다.
trigger가 연결되어 있으면 기본 focus 복원을 막고 직접 focus한 뒤 callback을 실행한다.
API·mutation·확인창 상태를 Table 내부로 이동하지 않는다.

### viewport 고정 Empty/Loading

Table body에는 native table geometry와 `colSpan`을 유지하는 aria-hidden spacer cell만 둔다. 실제 상태는
ScrollArea의 형제로 frame에 고정한다. 따라서 긴 열이 만드는 scroll width를 기준으로 중앙 정렬되지 않고,
사용자가 현재 보고 있는 frame의 중앙을 유지한다.

```tsx
<div className="table-frame" data-size={size}>
  <ScrollArea orientation="both">
    <table aria-busy={loading || undefined}>
      <thead>{/* 기존 header */}</thead>
      <tbody>
        <tr>
          <td
            colSpan={columnCount}
            aria-hidden="true"
            className="empty-spacer"
          />
        </tr>
      </tbody>
    </table>
  </ScrollArea>
  <div className="empty-viewport" data-slot="table-empty-state">
    <ListContentState
      presentation="embedded"
      density={size === "small" ? "compact" : "regular"}
      kind={emptyState.kind}
      icon={emptyState.icon}
      title={emptyState.title}
      description={emptyState.description}
      action={emptyState.action}
    />
  </div>
</div>
```

페이지는 query/error/filter 상태와 callback을 소유한다. Table은 `empty | filtered | error`를
`ListContentState`의 embedded presentation으로 조합한다. 기존 `emptyContent`는 문자열 호환용이며
같은 기본 icon·타이포를 사용하지만, 새 복합 상태를 만들 때는 `emptyState`를 사용한다.

### 커스텀 선택 열

```tsx
const customSelection = columns.some((column) => column.kind === "selection");
const selectionType =
  selection?.type ?? (customSelection ? "custom" : undefined);
// kind="selection": th는 selectionHeaderCell, td는 rowAction을 재사용한다.
// width/align 대신 Small 40px/Medium 48px 및 body data-align="center"를 적용한다.
// custom 선택 열 바로 다음 header/body data cell의 시작 padding은 0이다.
// Checkbox와 Radio는 내장 selection과 같은 40/48px 규격을 유지한다.
// 기본 열의 24px outer padding은 data-selection-type이 없는 Table에만 적용한다.
```

header/cell이 제공한 control을 그대로 렌더한다. 데이터 열에 임의 padding을 주거나 페이지 CSS에서
공용 Table 내부 셀을 관통하는 방식으로 보정하지 않는다.

내장 Checkbox/Radio도 `data-selection-type`이 존재하므로 선택 header/body 바로 다음 data cell의
`padding-left`를 0으로 적용한다. 선택 열 폭은 Small 40px, Medium 48px를 유지하고 Radio의 32px
hit area도 열 가운데 정렬한다.

클릭 가능한 행은 `tr` 하나가 focus target이므로 focus-visible도 같은 요소가 소유한다.

```css
.table-row[data-interactive]:focus-visible {
  outline: 2px solid var(--table-focus-border);
  outline-offset: -2px;
}
```

개별 `td`에 사방 inset shadow를 주면 열마다 독립된 포커스 사각형으로 보이므로 사용하지 않는다.

### 정렬 상태 전이

```tsx
function requestSort(
  columnId: string,
  sort: readonly TableSort[] | undefined,
  mode: TableSortMode,
  onSortChange?: (next: TableSort[] | undefined) => void,
) {
  const active = mode === "single" ? (sort?.slice(0, 1) ?? []) : (sort ?? []);
  const index = active.findIndex((item) => item.columnId === columnId);

  if (index < 0) {
    onSortChange?.(
      mode === "single"
        ? [{ columnId, direction: "ascending" }]
        : [...active, { columnId, direction: "ascending" }],
    );
    return;
  }

  if (active[index].direction === "ascending") {
    onSortChange?.(
      active.map((item, itemIndex) =>
        itemIndex === index ? { ...item, direction: "descending" } : item,
      ),
    );
    return;
  }

  const next = active.filter((_, itemIndex) => itemIndex !== index);
  onSortChange?.(next.length ? next : undefined);
}
```

### 재사용 컴포넌트를 조합한 cell markup

```tsx
const handleScrollMetricsChange = ({ scrollTop }: ScrollAreaScrollMetrics) => {
  setHasScrolled(scrollTop > 0);
};

<div
  className="table-frame"
  data-size={size}
  data-scrolled={hasScrolled || undefined}
>
  <ScrollArea
    className="table-scroll-area"
    contentClassName="table-scroll-content"
    orientation="both"
    type="auto"
    verticalThumbOffset={size === "small" ? 30 : 38}
    onScrollMetricsChange={handleScrollMetricsChange}
  >
    <TablePrimitive
      className="table-root"
      aria-label={ariaLabel}
      data-size={size}
      data-selection-type={selectionType}
    >
      <TableHeader className={stickyHeaderClass}>
        <TableRow>
          {selection?.type === "checkbox" && (
            <TableHead className={selectionCellClass} aria-label="행 선택">
              <Checkbox
                checked={isPartiallySelected ? "indeterminate" : isAllSelected}
                onCheckedChange={(checked) => handleSelectAll(checked === true)}
                aria-label="전체 행 선택"
              />
            </TableHead>
          )}
          {columns.map((column) => {
            const direction = activeSorts.find(
              (item) => item.columnId === column.id,
            )?.direction;
            return (
              <TableHead key={column.id} aria-sort={direction ?? "none"}>
                {column.sortable ? (
                  <button
                    type="button"
                    onClick={() =>
                      requestSort(column.id, sort, sortMode, onSortChange)
                    }
                  >
                    {column.header}
                    <Icon
                      name="arrow_up"
                      size="s"
                      color="subtler"
                      data-sort-direction={direction ?? "none"}
                      aria-hidden
                    />
                  </button>
                ) : (
                  column.header
                )}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          const action = renderRowAction?.(row, index);
          return (
            <TableRow
              key={getRowKey(row, index)}
              data-disabled={isRowDisabled?.(row, index) || undefined}
            >
              <TableCell>
                {/* Checkbox 또는 Radio: selection.type에 따라 공용 control을 조합 */}
              </TableCell>
              {columns.map((column) => {
                const content = (
                  <div className="cell-content">
                    {column.renderCell(row, index)}
                  </div>
                );
                const tooltip =
                  typeof column.tooltip === "function"
                    ? column.tooltip(row, index)
                    : column.tooltip;
                return (
                  <TableCell key={column.id}>
                    {tooltip ? (
                      <Tooltip
                        type="standard"
                        content={tooltip}
                        side="top"
                        align="start"
                      >
                        {content}
                      </Tooltip>
                    ) : (
                      content
                    )}
                  </TableCell>
                );
              })}
              {action && (
                <TableCell className="action-cell">
                  <TableRowActions
                    {...action}
                    menuItems={action.menuItems.map((item) => ({
                      ...item,
                      onSelect: (trigger) => item.onSelect(row, index, trigger),
                    }))}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </TablePrimitive>
  </ScrollArea>
</div>;
```

### Radio selection 조합

Radio item을 행마다 배치하되 외곽 frame 하나를 `RadioGroupRoot`로 사용한다. group role을
`<table>`이나 `<tbody>`에 직접 부여하지 않는다.

```tsx
const radioKeys = new Map(
  data.map((row, index) => {
    const key = getRowKey(row, index);
    return [`${typeof key}:${String(key)}`, key] as const;
  }),
);
const tableFrame = (
  <div className="table-frame">
    {/* native table 구조 안에서 각 row의 selection cell에 배치 */}
    <Radio
      value={`${typeof rowKey}:${String(rowKey)}`}
      aria-label={`${rowIndex + 1}번째 행 선택`}
    />
  </div>
);

return selection?.type === "radio" ? (
  <RadioGroupRoot
    asChild
    value={
      selection.selectedKey === undefined
        ? null
        : `${typeof selection.selectedKey}:${String(selection.selectedKey)}`
    }
    aria-label={selectionColumnLabel}
    orientation="vertical"
    onValueChange={(value) => {
      const key = radioKeys.get(value);
      if (key !== undefined) selection.onSelectedKeyChange(key);
    }}
  >
    {tableFrame}
  </RadioGroupRoot>
) : (
  tableFrame
);
```

### Pagination과의 올바른 조합

```tsx
const sortedRows = useMemo(() => sortRows(allRows, sort), [allRows, sort]);
const pageRows = useMemo(() => {
  const start = (page - 1) * pageSize;
  return sortedRows.slice(start, start + pageSize);
}, [page, pageSize, sortedRows]);

const handleSortChange = (next: TableSort[] | undefined) => {
  setSort(next);
  setPage(1);
};

<div className="pagination-table-layout">
  <div className="pagination-toolbar">
    <Pagination {...paginationProps} />
  </div>
  <Table
    data={pageRows}
    sort={sort}
    onSortChange={handleSortChange}
    {...tableProps}
  />
</div>;
```

`pagination-table-layout`은 세로 flex, `gap: 12px`; toolbar는 넓은 화면에서 `justify-content: flex-end`를 사용한다. Pagination을 Table frame 안에 넣거나 Table props에 page state를 추가하지 않는다.

## 행 click

```tsx
<Table
  data={rows}
  columns={columns}
  onRowClick={(row) => navigateTo(`/detail/${row.id}`)}
  isRowClickable={(row) => Boolean(row.id)}
/>
```
