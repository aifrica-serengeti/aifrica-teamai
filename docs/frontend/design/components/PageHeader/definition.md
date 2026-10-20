# Page Header — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Page Header 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

아래 컴포넌트는 Page Header가 직접 만들지 않고 반드시 재사용하는 단일 진실 원천이다.
Button group과 thumbnail은 slot이므로 호출자가 필요한 공용 컴포넌트를 전달한다.

| 의존 컴포넌트                            | 가이드라인 | 구현 상태 | Page Header에서의 역할                                                           |
| ---------------------------------------- | ---------- | --------- | -------------------------------------------------------------------------------- |
| [Icon Button](../IconButton/README.md)   | 있음       | 참조 계약 · 매핑 확인 필요    | back(`ghost`/`xlarge`), 제목 옆 action(`ghost`/`medium`), more(`ghost`/`xlarge`) |
| [Tooltip](../Tooltip/README.md)          | 있음       | 참조 계약 · 매핑 확인 필요    | back·제목 action tooltip, 잘린 Title의 전체 텍스트 tooltip                       |
| [Skeleton](../Skeleton/README.md)        | 있음       | 참조 계약 · 매핑 확인 필요    | loading title 180×32, Chip 48×24, Detail 72×16, Description 260×20               |
| [Chip](../Chip/README.md)                | 있음       | 참조 계약 · 매핑 확인 필요    | 제목 우측 `medium` Chip 및 Tab count Chip                                        |
| [Tab](../Tab/README.md)                  | 있음       | 참조 계약 · 매핑 확인 필요    | 하단 navigation. 44px 공용 trigger, `showContent={false}`                         |
| [Button](../Button/README.md)            | 있음       | 참조 계약 · 매핑 확인 필요    | `buttonGroup` slot의 primary/tertiary action                                     |
| [Split Button](../SplitButton/README.md) | 있음       | 참조 계약 · 매핑 확인 필요    | `buttonGroup` slot의 분할 action                                                 |
| [Text Button](../TextButton/README.md)   | 있음       | 참조 계약 · 매핑 확인 필요    | `trailingElement` slot의 설정 등 텍스트 action                                   |
| [Avatar](../Avatar/README.md)            | 있음       | 참조 계약 · 매핑 확인 필요    | `thumbnail` slot의 대표 구현(40×40)                                              |

### 의존성 조합 규칙

```text
Page Header
├── TooltipProvider
├── leading slot
│   ├── Icon Button — back (optional)
│   └── Avatar 또는 전달받은 thumbnail (optional)
├── title row
│   ├── Title / 180×32 Title Skeleton + conditional Tooltip
│   ├── Chip (optional)
│   └── Icon Button + Tooltip action nodes (optional, caller 전달)
├── supporting copy
│   ├── 72×16 Detail Skeleton 또는 lifecycle date Detail text (optional)
│   └── 260×20 Description Skeleton 또는 Description (optional)
├── action area (optional)
│   ├── Button / Split Button slot
│   └── Icon Button / Text Button slot
└── Tab (optional)
    └── Chip count (optional)
```

중복 구현 금지 규칙은 다음과 같다.

1. Button group의 hover·pressed·focus·disabled 스타일은 Button/Split Button이 소유한다.
2. back·refresh·favorite·edit·delete·more의 hit area와 focus ring은 Icon Button이 소유한다.
3. Tooltip portal, delay, keyboard 접근성은 Tooltip이 소유한다.
4. Tab indicator·키보드 roving focus·count Chip 상태는 Tab이 소유한다.
5. loading surface와 pulse motion은 Skeleton이 소유하고 Page Header는 각 자리의 geometry만 소유한다.
6. Page Header는 **배치와 slot 조립만** 담당한다.

---

## 3. 구조 (Anatomy)

```text
header[data-slot="page-header"]
├── div.content (CSS grid)
│   ├── div.leading (optional, grid 1/1)
│   │   ├── Tooltip > IconButton(back, xlarge)
│   │   └── span.thumbnail > Avatar | thumbnail node
│   ├── div.titleRow (grid 2/1)
│   │   ├── Title / Title Skeleton
│   │   └── div.titleTrailing (optional)
│   │       ├── Chip / Chip Skeleton
│   │       └── titleAction slot
│   ├── div.copy (optional, grid 2/-1, row 2)
│   │   ├── Detail Skeleton | Detail text
│   │   ├── 4px spacer (Description이 있을 때만)
│   │   └── Description
│   └── div.actionArea (optional)
│       ├── div.buttonGroup
│       └── div.trailing
└── nav.tabsSlot (optional)
    └── Tab(showContent=false)
```

---

## 4. 공개 API

| Prop                           | 타입                      | 기본값      | 규칙                                                                          |
| ------------------------------ | ------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `title`                        | `string`                  | -           | Headline2 제목. min-width 100px, max-width 400px                              |
| `isLoading`                    | `boolean`                 | `false`     | 전달된 title·Chip·Detail·Description을 같은 line-height Skeleton으로 대체     |
| `showBackButton`               | `boolean`                 | `true`      | back Icon Button 표시 여부                                                    |
| `onBackClick`                  | `() => void`              | -           | back action                                                                   |
| `thumbnail`                    | `ReactNode`               | -           | 40×40 slot. Avatar를 우선 재사용                                              |
| `titleChip`                    | `ReactNode`               | -           | title 오른쪽 `Chip medium`; caller가 공용 Chip을 전달                         |
| `titleAction`                  | `ReactNode`               | -           | refresh/favorite/edit/delete 등. `PageHeaderIconAction` 조합을 우선한다       |
| `detailText`                   | `ReactNode`               | -           | 생성·수정·등록·요청·발생 등 대표 날짜 메타데이터. 일반 정보 금지, 줄바꿈 허용 |
| `description`                  | `ReactNode`               | -           | 보충 설명. 존재할 때만 앞의 4px spacer 생성                                   |
| `buttonGroup`                  | `ReactNode`               | -           | Button, Split Button 등 공용 Button 조합 slot                                 |
| `trailingElement`              | `ReactNode`               | -           | more Icon Button, Text Button 등 trailing slot                                |
| `tabs`                         | `TabItem[]`               | -           | 제공 시 공용 44px Tab trigger 표시, 본문 panel은 page 소유                       |
| `tabValue` / `defaultTabValue` | `string`                  | -           | controlled / uncontrolled Tab 값                                              |
| `onTabValueChange`             | `(value: string) => void` | -           | Tab 값 변경 callback                                                          |
| `tabsDisabled`                 | `boolean`                 | `false`     | busy·editing 등 탭 전환을 막아야 하는 동안 모든 Tab trigger를 disabled로 표시 |
| `tabsAriaLabel`                | `string`                  | `페이지 탭` | navigation accessible name                                                    |
| `borderBottom`                 | `boolean`                 | `false`     | toolbar/table과 구분선이 필요한 화면에서만 하단 border 표시                   |

---

## 5. 레이아웃 스펙

### 기본 레이아웃

| 요소                    | 값                                                       |
| ----------------------- | -------------------------------------------------------- |
| Header 너비             | `width: 100%; min-width: 0`                              |
| Header 표면             | shell surface                                            |
| Content display         | CSS grid: `auto minmax(0, 1fr) auto`                     |
| Content padding         | 24px 전체                                                |
| column gap / row gap    | 16px / 4px                                               |
| leading 내부 gap        | 8px                                                      |
| back Icon Button        | `xlarge`, 32×32px                                        |
| thumbnail slot          | 40×40px, radius 4px                                      |
| title row gap           | 8px                                                      |
| title trailing 내부 gap | 4px                                                      |
| Title                   | min 100px, max 400px, 1줄 ellipsis                       |
| Title Chip              | `medium`, 높이 24px                                      |
| title action            | Icon Button `medium`, 24×24px. 아이콘은 `l` size         |
| Detail text             | Title 시작선에서 header 우측 padding 직전까지. 12px/16px |
| Description             | Detail과 같은 폭. 14px/20px. 말줄임표 금지               |
| Description 앞 spacer   | Description이 있을 때만 높이 4px                         |
| action area 내부 gap    | 8px                                                      |
| Tab                     | 높이 44px, 좌우 padding 24px                             |

Detail/Description은 title의 좁은 열에 묶지 않는다. `grid-column: 2 / -1`로 배치하여
우측 action 아래의 빈 폭까지 모두 사용한다. Detail 또는 Description이 없으면 해당 행은 렌더하지
않으므로 그 높이도 함께 사라진다.

### Loading 높이 동등성

loading은 normal header의 세로 flow를 삭제하거나 축약하지 않는다. 전달된 node만 skeleton으로
치환하며, 없는 Detail/Description의 빈 행은 normal 상태와 동일하게 만들지 않는다.

| normal node               | loading node                | 높이 / 위 여백            |
| ------------------------- | --------------------------- | ------------------------- |
| Title `24px / 32px`       | 180×32 title skeleton       | 32px                      |
| title Chip `medium`       | 48×24 chip skeleton         | 24px, title row 중앙 정렬 |
| Detail `12px / 16px`      | 72×16 detail skeleton       | 16px / `margin-top: 2px`  |
| Description `14px / 20px` | 260×20 description skeleton | 20px / `margin-top: 4px`  |

### 반응형 규칙

| 조건                                           | 동작                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| action의 실제 최소 필요 폭 ≤ Header content 폭 | action area는 **항상 title row 우측** (`grid-column: 3`, row 1)에 둔다                         |
| action의 실제 최소 필요 폭 > Header content 폭 | action area만 `grid-column: 1 / -1`, row 3으로 옮긴다. 제목은 `grid-column: 2 / -1`로 확장한다 |
| solution narrow breakpoint                     | 솔루션 layout 입력의 좌우 inset을 적용한다. 이 조건만으로 action을 다음 행으로 보내지 않는다 |
| 좁은 폭에서 Description → action               | 16px (`row-gap: 4px` + `margin-top: 12px`)                                                     |
| 좁은 폭에서 action → Tab 영역                  | 8px (`content padding-bottom`)                                                                 |
| 좁은 폭 action area                            | `width: 100%; overflow-x: auto`로 버튼을 가리지 않음                                           |
| Title                                          | action이 같은 행에 있을 때 남은 폭 안에서만 줄어듦. `min-width: 100px` 아래로 축소 금지        |

전환 폭을 `1100px` 같은 고정 breakpoint로 정하면 action이 적은 헤더도 데스크톱 폭에서
불필요하게 아래 행으로 이동한다. `ResizeObserver`로 **`buttonGroup`과 `trailingElement`의 고유 폭**,
leading, title trailing, padding, grid gap을 측정해 아래 식이 Header content 폭을 초과할 때만 재배치한다.
이미 아래 행에 있는 `actionArea`의 `scrollWidth`를 쓰면 `width: 100%` 자체가 측정되어 영구적으로
아래 행에 남을 수 있으므로 사용하지 않는다.

```text
required inline width = padding-left + padding-right
                      + leading width
                      + (Title 100px + title trailing width + title gap 8px)
                      + buttonGroup intrinsic width
                      + trailing intrinsic width + 둘 다 있을 때 gap 8px
                      + column gap × 2
```

예를 들어 action이 `내보내기 · 새 작업 · 설정`처럼 작은 경우, Header 폭이 1,016px여도
반드시 우측에 남아야 한다. 반대로 여러 Button/Split Button이 실제 폭을 모두
소비할 때만 action을 Description 아래 독립 행으로 이동한다.

### Detail title action profile

`titleAction`은 Header 내부의 `data-slot="page-header-title-actions"` 묶음에서
`inline-flex`, 24px 높이, 수직 중앙 정렬, `flex-shrink: 0`, `gap: 4px`로 배치한다.
inline trigger의 baseline 여백이 버튼 위치를 밀지 않도록 묶음의 line-height는 0으로 고정한다.
Fragment로 여러 액션을 전달해도 같은 간격을 보장한다. 호출자가 추가한 액션 묶음은
`gap: inherit`를 사용하며 페이지별 2px·8px 간격으로 다시 정의하지 않는다.

읽기 가능한 Detail Page는 `titleAction`을 `refresh → edit → delete` 순서의 인접한 묶음으로 사용한다.
각 action은 `IconButton size="medium" iconSize="l"`이며 삭제를 `trailingElement`로 떼어내지 않는다.
Icon의 18px/1.25px rounded stroke는 공용 Icon이 소유하므로 Page Header CSS가 SVG stroke를 override하지
않는다. action마다 Tooltip root는 하나만 있고 Tooltip은 대상명 없이 `새로고침`, `수정`, `삭제`처럼
짧고 안정된 동작명을 쓴다. accessible label은 스크린 리더 맥락을 위해 대상명을 포함할 수 있다.
pending text는 live status/aria-busy가 전달하며 Tooltip content를 길게 바꾸지 않는다.

반복되는 icon-only action은 `PageHeaderIconAction`을 사용한다. 이 컴포넌트는 `label`을 공용
`IconButton`의 `aria-label`로 변환하고 나머지 props와 `ref`를 전달한다. 비활성 버튼에서도 Tooltip
trigger를 유지하는 중립 `span`을 소유한다. 페이지는
동작의 accessible `label`, 짧은 `tooltip`, disabled·busy 상태와 click handler를 전달한다. 모든 액션은
실행할 때 열려 있던 Tooltip을 먼저 닫는다. Dialog·Popover처럼 focus를 가져가는 후속 overlay가 있으면
`suppressTooltipOnFocusReturn`을 전달하여 overlay가 닫혀 trigger로 focus가 복원되는 동안에도 Tooltip을
다시 열지 않는다. 일반 refresh·mutation 액션은 이 옵션을 사용하지 않아 다음 hover·focus에서 Tooltip을
다시 제공한다. Tooltip은 500ms 뒤 표시해 즉시 실행하는 overlay와 두 surface가 연속해서 깜빡이지 않게 한다.

---
