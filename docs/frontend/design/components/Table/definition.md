# Table — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Table 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

아래는 Table 런타임이 참조 설계에서 조합하는 의존성이다. 같은 기능을 Table 안에서 다시 만들지 않는다.

| 의존 컴포넌트                 | 정확한 용도                                                                | 가이드라인 / 구현 상태                                                  | 재사용 규칙                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **shadcn Table primitive**    | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`의 native semantics | Table primitive 참조 계약 · 매핑 확인 필요. 별도 시각 컴포넌트가 아니라 이 문서의 기반 구조 | native 테이블 구조를 유지한다. div grid로 대체하지 않는다.                                   |
| **Checkbox**                  | checkbox 행 선택, 전체 선택, indeterminate                                 | [Checkbox/README.md](../Checkbox/README.md) / 참조 계약 · 매핑 확인 필요                    | 체크 표시·disabled·indeterminate를 다시 그리지 않는다.                                       |
| **RadioGroupRoot / Radio**    | radio 단일 행 선택                                                         | [Radio/README.md](../Radio/README.md) / 참조 계약 · 매핑 확인 필요                          | table frame을 group root로 조합하고 radio 원·키보드 roving focus를 다시 만들지 않는다.       |
| **Menu (`DropdownMenu`)**     | 행 action 메뉴의 portal, focus 관리, item 상태                             | [Menu/README.md](../Menu/README.md) / 참조 계약 · 매핑 확인 필요                            | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`을 사용한다. |
| **Icon**                      | 정렬 화살표, 메뉴 항목 leading icon                                        | [Icon/README.md](../Icon/README.md) / 참조 계약 · 매핑 확인 필요                            | SVG를 Table에 복제하지 않는다.                                                               |
| **Icon Button**               | 행 action trigger (`more_vertical`)                                        | [IconButton/README.md](../IconButton/README.md) / 참조 계약 · 매핑 확인 필요                | hover/pressed/focus 시각과 hit area를 재구현하지 않는다.                                     |
| **Button**                    | 단일 행 작업의 visible text 버튼                                           | [Button/README.md](../Button/README.md) / 참조 계약 · 매핑 확인 필요                        | small tertiary의 상태·geometry를 재사용한다.                                                 |
| **Tooltip + TooltipProvider** | 긴 셀의 전체 값, 행 action 설명                                            | [Tooltip/README.md](../Tooltip/README.md) / 참조 계약 · 매핑 확인 필요                      | Tooltip portal·화살표·positioning을 Table에 구현하지 않는다.                                 |
| **Spinner**                   | `loading=true` 상태                                                        | [Spinner/README.md](../Spinner/README.md) / 참조 계약 · 매핑 확인 필요                      | Loading spinner SVG·animation을 복제하지 않는다.                                             |
| **ListContentState**          | Empty/Filtered/Error의 icon·copy·action                                    | [ListContentState/README.md](../ListContentState/README.md) / 참조 계약 · 매핑 확인 필요    | `presentation="embedded"`로 Table frame 안에 조합한다.                                       |
| **ScrollArea**                | 가로/세로 overflow, scroll 위치 상태                                       | [Scrollbar/README.md](../Scrollbar/README.md) / 참조 계약 · 매핑 확인 필요                  | native nested overflow container를 만들지 않고 `orientation="both"`를 사용한다.              |

### 예시 전용 조합 — Table 의존성 아님

`Avatar`, `Status`, `Chip`, `Link`, `Pagination`은 Table 사용 예시에서만 셀 내용을 구성하거나 페이지를 조립하기 위해 사용한다. 이들은 `Table`의 내부 import나 `TABLE_DEPENDENCIES`에 넣지 않는다. 단일 행 작업의 `Button`은 공용 렌더러의 실제 의존성이며, **Pagination은 독립 controlled 컴포넌트**로 유지한다.

## 3. 구조 (Anatomy)

```
Table frame (1px border, radius 8)
├── ScrollArea (orientation="both", frame을 가득 채움)
│   ├── root override: border 0, radius 0, padding 0
│   ├── content override: **padding 0**
│   └── native table
│       ├── colgroup
│       │   ├── selection col (checkbox/radio일 때만)
│       │   ├── data column × N
│       │   └── action col (행 작업이 있을 때만)
│       ├── sticky thead
│       │   └── header row
│       │       ├── select-all Checkbox / blank Radio header (optional)
│       │       ├── header cell × N
│       │       │   └── sort button + Icon(arrow_up) (sortable일 때)
│       │       └── action placeholder (optional)
│       └── tbody
│           ├── loading spacer row: aria-hidden colspan cell
│           ├── empty spacer row: aria-hidden colspan cell
│           └── data row × N
│               ├── Checkbox or Radio (optional)
│               ├── cell content / optional Tooltip
│               └── Button (작업 1개) / IconButton → Menu (작업 2개 이상, optional)
├── viewport-fixed loading state: Spinner
├── viewport-fixed empty state: embedded ListContentState
└── sticky thead 자체의 1px bottom border (항상 표시, scroll 시 shadow 추가)
```

> **Frame 경계 규칙:** Table 컴포넌트의 시각적 시작점은 `Table frame`의 1px border다. 그 border 안에는 Card·container·ScrollArea 기본 padding을 포함하지 않는다. header surface와 body row divider는 frame의 안쪽 모서리까지 즉시 닿아야 한다. 외부 여백이 필요하면 부모가 `margin` 또는 `gap`으로 제공하며, Table frame에 padding을 추가하지 않는다.

## 4. 공개 API

```tsx
export type TableRowKey = string | number;
export type TableSize = "small" | "medium";
export type TableAlign = "start" | "center" | "end";
export type TableSortDirection = "ascending" | "descending";
export type TableSortMode = "single" | "multiple";
export type TableRowVisualState =
  "default" | "hovered" | "pressed" | "selected";

export interface TableSort {
  columnId: string;
  direction: TableSortDirection;
}

export interface TableColumn<T> {
  id: string;
  kind?: "data" | "selection";
  header: React.ReactNode;
  renderCell: (row: T, index: number) => React.ReactNode;
  tooltip?: React.ReactNode | ((row: T, index: number) => React.ReactNode);
  width?: React.CSSProperties["width"];
  align?: TableAlign;
  sortable?: boolean;
}

export type TableSelection<Key extends TableRowKey> =
  | {
      type: "checkbox";
      selectedKeys: ReadonlySet<Key>;
      onSelectedKeysChange: (keys: Set<Key>) => void;
    }
  | {
      type: "radio";
      selectedKey?: Key;
      onSelectedKeyChange: (key: Key | undefined) => void;
    };

export interface TableRowActionItem<T> {
  id: string;
  label: React.ReactNode;
  onSelect: (row: T, index: number, trigger: HTMLButtonElement) => void;
  disabled?: boolean;
  ariaLabel?: string;
  danger?: boolean;
  icon?: IconName;
}

export interface TableRowAction<T> {
  ariaLabel: string;
  triggerMode?: "auto" | "menu"; // 기본 auto; menu는 작업 수와 관계없이 더보기
  /** 기본 auto에서는 1개면 small tertiary Button, 2개 이상이면 more_vertical Menu로 렌더한다. */
  menuItems: readonly TableRowActionItem<T>[];
  disabled?: boolean;
  busy?: boolean;
  tooltip?: React.ReactNode;
  triggerRef?: React.Ref<HTMLButtonElement>;
}

export type TableEmptyStateKind = ListContentStateKind;
export type TableEmptyStateAction = ListContentStateAction;
export type TableEmptyStateConfig = ListContentStateConfig;

export interface TableProps<T, Key extends TableRowKey = TableRowKey> {
  columns: readonly TableColumn<T>[];
  data: readonly T[];
  getRowKey?: (row: T, index: number) => Key;
  size?: TableSize;
  maxHeight?: React.CSSProperties["height"];
  loading?: boolean;
  loadingLabel?: string; // 기본 "데이터를 불러오는 중입니다."
  emptyState?: TableEmptyStateConfig;
  /** @deprecated 구조화된 빈 결과는 emptyState를 사용한다. */
  emptyContent?: React.ReactNode;
  emptyMessage?: string;
  selection?: TableSelection<Key>;
  sort?: readonly TableSort[];
  sortMode?: TableSortMode;
  onSortChange?: (sort: TableSort[] | undefined) => void;
  onRowClick?: (row: T, index: number) => void;
  /** false인 행은 이동하지 않으며 내부 선택과 작업 control은 유지한다. */
  isRowClickable?: (row: T, index: number) => boolean;
  isRowDisabled?: (row: T, index: number) => boolean;
  getRowVisualState?: (row: T, index: number) => TableRowVisualState;
  renderRowAction?: (row: T, index: number) => TableRowAction<T> | null;
  rowActionLabel?: React.ReactNode; // 기본 "작업"
  rowActionWidth?: string; // 기본 "112px", 셀 padding 포함
  ariaLabel?: string;
  className?: string;
  selectionLabels?: {
    selectAll?: string;
    selectionColumn?: string;
    selectRow?: (index: number) => string;
  };
}
```

행 key 우선순위는 `getRowKey` → `row.id` → 현재 index이며, selection 계산과 실제
body row가 같은 resolver를 사용해야 한다.

### 사용자 정의 작업 컬럼의 공개 렌더러

`TableRowActions`는 기존 `renderCell`에서 사용할 수 있다. Props는 `ariaLabel`, `menuItems`,
`triggerMode`, `disabled`, `busy`, `tooltip`, `triggerRef`이다. `menuItems`의 원소는 공개 타입 `TableActionItem`이며
위 `TableRowActionItem<T>`와 같지만 `onSelect(trigger: HTMLButtonElement)`를 받는다.
행·index는 호출부 closure가 소유한다. `renderRowAction`과 사용자 정의 작업 컬럼을 동시에 쓰지 않는다.
`danger` 항목은 마지막 그룹으로 이동하며, `disabled` 항목도 실제 표시되는 작업 개수에 포함한다.
권한이 없는 작업은 페이지가 배열에서 제외한다. 빈 배열은 작업 버튼을 표시하지 않는다.
`triggerMode="auto"`(기본)는 기존 작업 수 기반 표현을 유지한다. `menu`는 단일 작업도
같은 more_vertical trigger로 표시하며 확인창·API·권한 정책은 바꾸지 않는다.

Radio selection은 key의 타입까지 포함해 Radix string value로 변환하고, `RadioGroupRoot`의
`onValueChange`에서 원래 key로 복원한다. 외곽 frame에 `asChild`로 group semantics를 부여하므로 native
table element의 role은 그대로 유지한다.

`selectionLabels.selectionColumn`은 선택 열의 시각 라벨뿐 아니라 radio selection을 감싸는
RadioGroup의 accessible name으로 사용한다. 생략하면 `${ariaLabel} 행 단일 선택`을 기본값으로 사용한다.

`onRowClick` 행은 하나의 focus target이다. `:focus-visible` 표시도 개별 `td`가 아니라 `tr` 바깥 둘레의
2px inset outline이 소유하여, 열 경계마다 포커스 선이 반복되지 않아야 한다.

`kind="selection"`은 부모가 header/cell에 제공하는 선택 control의 geometry만 지정한다.
Small 40px·Medium 48px 폭과 중앙 정렬이 `width`/`align`보다 우선하며 첫 열 24px outer padding을 적용하지 않는다.
바로 다음 데이터 열의 시작 padding은 0으로 하며 내장 `selection`과 같은 크기 규격을 사용한다.
선택 상태·disabled·accessible name·전체 선택 정책은 부모의 control이 소유한다.
Table이 별도 선택 열이나 Checkbox를 추가하지 않으므로 내장 `selection`과 중복 조합하지 않는다.

내장 Checkbox/Radio 선택 열은 Small 40px, Medium 48px 폭을 유지하되 바로 다음 데이터 열의 시작
padding을 0으로 만든다. Checkbox는 Small 12px·Medium 16px 바깥 여백을 가지며, Radio의 32px
hit area는 40/48px 열 가운데 정렬한다.

## 5. 레이아웃 스펙

| 영역                             |                  Small |                 Medium | 공통 규칙                                                      |
| -------------------------------- | ---------------------: | ---------------------: | -------------------------------------------------------------- |
| Header 높이                      |                   32px |                   40px | sticky, `vertical-align: middle`                               |
| Body row 높이                    |                   40px |                   48px | 모든 content wrapper가 flex 수직 중앙 정렬                     |
| Header typography                | Title3: 12/16 SemiBold | Title2: 14/20 SemiBold | Pretendard, letter-spacing 0                                   |
| Body typography                  |   Body2: 14/20 Regular |   Body2: 14/20 Regular | 명시적 leaf 컴포넌트 크기는 각 컴포넌트 계약을 유지            |
| 일반 cell 좌우 padding           |                   12px |                   12px | `box-sizing: border-box`                                       |
| Default 첫/마지막 cell 외곽 여백 |                   24px |                   24px | selection control이 없을 때만 적용                             |
| Checkbox / Radio 선택 열         |                   40px |                   48px | control은 열 중앙, 다음 data cell 시작 padding은 0             |
| 단일 Row action 열               |              최소 72px |              최소 72px | `Button size="small" variant="tertiary"` 중앙                  |
| 복수 Row action 열               |                   40px |                   40px | `IconButton size="medium"`(`more_vertical`) 중앙               |
| Frame                            |         colspan과 무관 |         colspan과 무관 | `1px`, radius 8px, frame 하단에 닿는 마지막 row divider만 제거 |
| Header divider                   |               항상 1px |               항상 1px | th가 소유하며 scroll 시 header shadow 추가                     |

### Frame과 ScrollArea — padding 소유권 (필수)

공용 ScrollArea는 단독 사용 시 content에 `padding: 16px`을 가진다. **Table 안에서는 이 기본 padding을 반드시 0으로 override**한다. override를 빼면 frame border와 header 사이에 16px gutter가 생기며, 이는 Table 스펙과 다르다.

```css
/* Table 자체의 유일한 outer frame. 부모 Card의 padding과 혼동하지 않는다. */
.table-frame {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 0; /* 필수: frame 내부 gutter 금지 */
  border: 1px solid var(--table-border);
  border-radius: 8px;
  background: var(--table-surface);
}

/* ScrollArea의 독립 border/radius는 Table frame이 이미 소유하므로 제거한다. */
.table-scroll-area {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: var(--table-surface);
}

/* 가장 중요: ScrollArea 기본 content padding 16px을 제거한다. */
.table-scroll-content {
  min-width: 100%;
  padding: 0;
}

.table-root {
  width: 100%;
  min-width: 100%;
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  background: var(--table-surface);
  color: var(--table-text);
}
```

`padding: 24px`은 **Default Table의 첫·마지막 cell**, `padding: 0 12px`은 **일반 cell**, `padding: 24px`은 **frame 고정 Empty/Loading viewport**에만 적용한다. 구조를 보존하는 Empty spacer cell은 padding 0이다. 이 값을 frame, ScrollArea root, ScrollArea content 또는 table 자체로 옮기면 안 된다.

### 너비와 overflow

- column `width`가 number 또는 `px` 문자열이면 그 값을 최소 너비 계산에 사용한다. 그 외 값과 미지정 column은 **160px**을 최소값으로 계산한다.
- table 최소 너비는 `max(320px, selection column + 모든 column 최소 너비 + action column)`이다.
  action column은 단일 작업이면 최소 72px, 복수 작업이면 40px을 사용한다. 일반 `TableColumn`으로
  작업 셀을 조합하면 cell 좌우 padding 24px을 포함해 버튼의 intrinsic width가 잘리지 않도록 폭을 늘린다.
- ScrollArea는 `orientation="both"`를 사용한다. 넓은 표를 축소하거나 열을 숨기지 않는다.
- `maxHeight`를 지정하면 frame 높이를 그 값으로 고정한다. vertical scroll은 header 아래 body에서 시작하며 header는 함께 움직이지 않는다.

### 수직 정렬 불변 규칙

`td`의 baseline에만 의존하지 않는다. Checkbox·Radio·Button·IconButton·Avatar·Status 등 임의의 셀 content는 `display:flex; align-items:center` wrapper에 넣는다.

```css
.cell-content,
.selection-control,
.action-control {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 47px; /* Medium 48px row 내부 */
}

[data-size="small"] .cell-content,
[data-size="small"] .selection-control,
[data-size="small"] .action-control {
  min-height: 39px; /* Small 40px row 내부 */
}

.selection-control,
.action-control {
  justify-content: center;
}
```
