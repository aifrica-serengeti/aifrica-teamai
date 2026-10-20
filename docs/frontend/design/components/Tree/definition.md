# Tree — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tree 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

아래 공용 컴포넌트를 **새로 구현하거나 비슷한 마크업으로 대체하지 말고** 먼저 확보한 뒤
조합한다. Tree가 직접 사용하는 의존성만 나열한다.

| 의존성                                | 필수 여부 | Tree에서의 역할                                                                   | 가이드라인  |
| ------------------------------------- | --------- | --------------------------------------------------------------------------------- | ----------- |
| [Icon](../Icon/README.md)             | 필수      | folder/folder_open/doc_code 및 symbol icon 렌더링                                 | 있음        |
| [IconButton](../IconButton/README.md) | 필수      | 24px triangle 펼침/접힘 버튼, selected leaf의 `more_horizontal` 버튼              | 있음        |
| [Checkbox](../Checkbox/README.md)     | 선택      | `checkbox`가 true인 노드의 Medium(16px) checkbox                                  | 있음        |
| [Menu](../Menu/README.md)             | 선택      | selected leaf의 더 보기 메뉴. Tree는 design-system `DropdownMenu` API를 직접 조합 | 있음        |
| React                                 | 필수      | 재귀 렌더링, controlled 상태, layout effect                                       | —           |
| Radix DropdownMenu                    | Menu 내부 | trailing menu의 focus/escape/portal 동작                                          | Menu에 포함 |
| vanilla-extract                       | 필수      | Tree 전용 스타일과 SVG path global style 정의                                     | —           |
| `cn` class merge utility              | 구현 보조 | vanilla-extract 클래스와 소비자 `className` 결합                                  | —           |

### 정확한 조합 규칙

```tsx
// 필수: system icon + icon-only 버튼
<IconButton icon="triangle_down" variant="ghost" size="medium" iconSize="m" />

// 선택: node.checkbox가 true일 때만
<Checkbox size="medium" checked={checked} onCheckedChange={onCheckedChange} />

// TreeItem이 selected일 때만
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <IconButton icon="more_horizontal" variant="ghost" size="medium" iconSize="m" />
  </DropdownMenuTrigger>
  <DropdownMenuContent size="small" align="end" scrollable={false}>
    <DropdownMenuItem>이름 변경</DropdownMenuItem>
    <DropdownMenuItem>삭제</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

`Tree`는 아이콘 SVG, checkbox, icon-only 버튼, dropdown focus 처리를 직접 구현하지 않는다.
단, 리프의 5×5px marker는 `Icon`을 렌더하는 것이 아니라 `--icon`/`--icon-disabled` 토큰을 쓰는
CSS 원형 도형이다. 상태별 시각 규칙은 각 공용 컴포넌트의 가이드라인을 그대로 따른다.

## 3. 공개 API와 데이터 모델

```tsx
export type TreeSize = "small" | "medium";
export type TreeType = "default" | "symbol";
export type TreeLineLength = "top" | "full" | "bottom";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
  // undefined: 기본 icon 사용, null: leading icon을 렌더하지 않음
  iconName?: SystemIconName | null;
  symbolIconName?: SystemIconName | null;
  checkbox?: boolean;
  checked?: boolean | "indeterminate";
  disabled?: boolean;
}

export interface TreeProps {
  items: TreeNode[];
  size?: TreeSize; // default: small
  type?: TreeType; // default: default
  /** default: true. false면 selected leaf의 기본 더 보기 메뉴를 렌더하지 않는다. */
  showLeafActions?: boolean;
  labels?: Partial<{
    expand: string;
    collapse: string;
    select: string;
    more: string;
    rename: string;
    delete: string;
  }>;
  className?: string;
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
```

Treeitem은 roving tabindex를 사용해 한 항목만 Tab 순서에 포함한다. `ArrowUp/Down`,
`Home/End`, `ArrowLeft/Right`로 보이는 항목 이동과 계층 펼침·접기를 수행한다.

### 권장 controlled 사용 예

```tsx
function FileTree({ items }: { items: TreeNode[] }) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    documents: true,
  });
  const [selected, setSelected] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState<
    Record<string, boolean | "indeterminate">
  >({});

  return (
    <Tree
      items={items}
      size="small"
      type="default"
      renderNode={(node, depth, hasChildren, index, siblingCount) => ({
        expanded: expanded[node.id] ?? false,
        selected: selected === node.id,
        onExpandedChange: (value) =>
          setExpanded((previous) => ({ ...previous, [node.id]: value })),
        onCheckedChange: (value) =>
          setChecked((previous) => ({ ...previous, [node.id]: value })),
        onSelect: () => setSelected(node.id),
        connector: !hasChildren && depth > 0,
        connectorLength: index === siblingCount - 1 ? "bottom" : "full",
      })}
    />
  );
}
```

`connector`와 `connectorLength`는 프리미티브 조립 시에도 쓸 수 있다. 데이터 API는
노드의 형제 순서를 이용해 `guideLines`/`branchLength`를 자동 계산하므로 보통 직접 지정하지 않는다.

## 4. 구조 (Anatomy)

```text
Tree role="tree"
├── SVG connector overlay (data API 전용, pointer-events: none)
│   └── path × 부모-자식 관계
├── TreeParent role="treeitem"
│   ├── depth spacer × depth
│   ├── chevron slot 24×24
│   │   └── IconButton: triangle_down
│   ├── checkbox slot 24×24 (optional)
│   ├── leading icon / symbol slot (optional)
│   ├── label
│   └── custom trailing (primitive API only, optional)
├── Tree children role="group"
│   └── TreeParent 또는 TreeItem 재귀 목록
└── TreeItem role="treeitem"
    ├── depth spacer × depth
    ├── connector slot 24×24
    │   └── 5×5 round terminal marker (모든 리프, depth 0 포함)
    ├── checkbox slot (optional)
    ├── leading icon / symbol slot (optional)
    ├── label
    └── showLeafActions일 때 selected trailing DropdownMenu + IconButton
```

### 두 조립 방식

| 방식           | 사용 컴포넌트                                           | 연결선 방식                    | 적합한 경우                                     |
| -------------- | ------------------------------------------------------- | ------------------------------ | ----------------------------------------------- |
| 데이터 API     | `Tree items={...}`                                      | 하나의 SVG overlay             | 실제 데이터, 다단계 중첩, 1,000개 수준의 대용량 |
| 프리미티브 API | `TreeParent`, `TreeItem`, `TreeSpacer`, `TreeConnector` | 각 spacer의 CSS `├`/`└` branch | Figma 시트처럼 고정된 단일 예시 조립            |

데이터 API에서 inline CSS branch를 동시에 켜면 SVG와 중복으로 선이 두 번 그려진다.
따라서 데이터 API는 `showInlineConnector={false}`로 렌더한다.

## 5. 레이아웃 스펙

### 행과 슬롯

| 요소                      | 값                | 규칙                                                                               |
| ------------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| Small 행 높이             | **32px**          | `min-height: 32px`                                                                 |
| Medium 행 높이            | **40px**          | `min-height: 40px`                                                                 |
| 행 padding                | 좌 2px / 우 8px   | 상하 0                                                                             |
| 행 border radius          | 4px               | selected 막대는 radius를 따르지 않는 직선                                          |
| row content gap           | **0px**           | connector 컬럼과 branch가 끊기지 않도록 flex gap 금지                              |
| trailing과 content gap    | 4px               | `treeRow`의 gap                                                                    |
| trailing 자체 margin-left | **4px**           | selected more 버튼 영역                                                            |
| chevron/connector 슬롯    | 24×24px           | parent와 leaf가 같은 x축을 공유                                                    |
| checkbox 슬롯             | 24×24px           | 내부 Checkbox는 Medium 16×16px                                                     |
| default leading icon 슬롯 | 24×24px           | 내부 Icon `m` = 16px                                                               |
| symbol icon               | 24px              | `2xl` icon; symbol type에서 depth indent 28px                                      |
| leaf marker               | **5×5px**, 원형   | 모든 리프에 표시. `depth === 0`인 최상위 리프도 `border-radius: 50%` marker를 유지 |
| label                     | 14px / 20px / 400 | 한 줄 ellipsis                                                                     |

### 행 배경의 기본값

행은 별도의 surface를 만들지 않고 가장 가까운 부모 surface를 그대로 비춘다.
따라서 기본/disabled 상태에는 `background-color: transparent`를 사용한다. 특히 다크 모드에서
`--action-default`는 `#333333`이므로, 이를 기본 행에 쓰면 hover하지 않아도 모든 행이 채워진
상태처럼 보인다.

hover와 pressed는 투명 행 위에 alpha 색을 직접 칠하는 방식이다. 이 alpha 값은 Tree가 놓인
부모 표면과 합성되며, selected만 불투명한 `--surface-primary-subtle` 배경으로 대체한다.

### Depth와 connector geometry

| Type      | depth당 spacer 폭 | connector 선           | 비고                  |
| --------- | ----------------: | ---------------------- | --------------------- |
| `default` |              24px | 1px `--tree-connector` | folder/doc icon 사용  |
| `symbol`  |              28px | 1px `--tree-connector` | 24px symbol icon 사용 |

CSS 프리미티브 branch는 `border-bottom-left-radius: 6px`로 `ㄴ` 모서리를 둥글게 만든다.
세로 continuation은 branch와 1px 겹쳐 행 경계에서 생기는 sub-pixel 틈을 막는다.

### leading 요소의 간격 규칙

이 규칙은 조합에 따라 반드시 달라진다. `treeRowContent`에 gap을 넣어 해결하지 않는다.

| checkbox | leading icon            | checkbox margin-left | icon margin-left | label margin-left |
| -------- | ----------------------- | -------------------: | ---------------: | ----------------: |
| 있음     | 있음                    |                  0px |              4px |               4px |
| 없음     | 있음                    |                    — |          **0px** |               4px |
| 없음     | 없음 (`iconName: null`) |                    — |                — |           **0px** |

`symbol` 슬롯은 Figma의 내부 padding-left 4px을 유지한다. 위 표의 “icon margin-left”는
외부 margin만 뜻한다. checkbox가 없을 때 symbol slot의 외부 margin도 0px이다.

### icon 표시 규칙

- `TreeParent` default icon 기본값은 `folder`, expanded면 `folder_open`으로 바뀐다.
- `TreeItem` default icon 기본값은 `doc_code`다.
- `type="symbol"`이고 `symbolIconName`이 있으면 24px symbol icon을 우선한다.
- `iconName: null`은 default fallback도 제거한다. checkbox와 함께 생략할 수 있으며, 이때
  label margin-left도 0px이 된다.

## 6. 연결선 스펙

### SVG overlay (데이터 API)

연결선은 각 행에 분절된 DOM 선을 두지 않고 root의 SVG에서 그린다. 부모의 chevron 슬롯 중심에서
시작해 자식의 connector 슬롯 **시작 x좌표**에서 끝난다. leaf marker 중앙까지 선을 연장하지 않으므로
marker와 선이 겹치지 않는다.

```text
parent slot center, parent row bottom
              │
              │
              ╰──────── child connector slot left
                 radius 0..6px
```

경로 공식:

```ts
const radius = Math.min(6, Math.max(0, child.connectorEnd - parent.slotCenter));
const curveStart = Math.max(parent.bottom, child.center - radius);

const d =
  `M ${parent.slotCenter} ${parent.bottom}` +
  ` V ${curveStart}` +
  ` Q ${parent.slotCenter} ${child.center}` +
  ` ${parent.slotCenter + radius} ${child.center}` +
  ` H ${child.connectorEnd}`;
```

SVG path 고정값:

| 속성            | 값                                                                    |
| --------------- | --------------------------------------------------------------------- |
| stroke          | `var(--tree-connector)` — light `#d5d5d5`, dark `#626262`             |
| stroke-width    | 1px                                                                   |
| stroke-linecap  | `round`                                                               |
| stroke-linejoin | `round`                                                               |
| SVG z-index     | 3 — selected 행 background보다 위. row의 z-index 2보다 낮추지 않는다. |
| row z-index     | 2                                                                     |
| pointer events  | `none`                                                                |

`ResizeObserver`는 root 크기 변화에만 반응한다. 펼침/접힘 중에만 requestAnimationFrame으로
y좌표를 재계산하며, selected/checkbox 상태 변경은 connector layout effect를 재시작하지 않는다.
