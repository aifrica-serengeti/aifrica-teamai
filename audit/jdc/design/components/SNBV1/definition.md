# SNB v1 — 정의와 구조

> **미채택 JDC 관찰 profile**: 원본 shell의 상세 근거를 보존한 자료입니다. CMP 전체 또는 PaaS·Agent Hub의 기본 규칙이 아닙니다.
> 공통 문서에 대한 참조는 공통 계약을 사용하며, 여기의 색·자산·치수·export 존재 주장은 관찰 시점의 원본에만 해당합니다.


[← SNB v1 문서 인덱스](README.md)

## 2. 의존 컴포넌트

아래 항목은 실제 의존성 등록부와 동일하다. 각 항목을 SNB 안에서 다시 구현하지 않고,
먼저 해당 공용 컴포넌트를 확보하여 조합한다.

| 의존 컴포넌트 | SNB에서의 용도 | 가이드라인 | 구현 상태 |
| --- | --- | --- | --- |
| **Icon** | 1depth leading, chevron, collapsed rail, 더보기/접기 glyph | [Icon](../../../../../docs/frontend/design/components/Icon/README.md) | 구현됨 · 재사용 |
| **Icon Button** | 헤더 접기/펼치기, collapsed 1depth, 즐겨찾기 star trigger | [Icon Button](../../../../../docs/frontend/design/components/IconButton/README.md) | 구현됨 · 재사용 |
| **Menu** | 접힌 1depth의 2depth menu, `MenuSub`의 3depth, 즐겨찾기 menu | [Menu](../../../../../docs/frontend/design/components/Menu/README.md) | 구현됨 · 재사용 |
| **Separator** | 접힌 헤더의 logo/toggle 아래 32px divider | [Divider](../../../../../docs/frontend/design/components/Divider/README.md)의 shadcn Separator primitive | 구현됨 · 재사용 |
| **ScrollArea** | Expanded tree, Collapsed icon rail, 5개 초과 즐겨찾기 popup | [Scrollbar & ScrollArea](../../../../../docs/frontend/design/components/Scrollbar/README.md) | 구현됨 · 재사용 |
| **Tooltip** | 자식이 없는 collapsed 1depth의 오른쪽 label | [Tooltip](../../../../../docs/frontend/design/components/Tooltip/README.md) | 구현됨 · 재사용 |

의존성 트리는 다음과 같다.

```text
SNB v1
├── Icon
├── Icon Button ── Icon
├── Menu ── MenuItem / MenuSub / MenuSubTrigger / MenuSubContent
├── Separator
├── ScrollArea
└── Tooltip
```

**Icon 사용 규칙:** `globe`, `chevron_down`, `chevrons_left`, `chevrons_right`, `chevrons_up`,
`more_horizontal`, `star`를 비롯한 모든 UI icon은 반드시 `<Icon name="..." />`으로 렌더한다.
Icon component 내부의 렌더링 방식과 무관하게 SNB가 직접 `<svg>`, `<path>`, data URI를 만들거나
interactive SVG 파일을 import해서는 안 된다. brand logo 네 파일만 image asset 예외다.

### Icon 색상 전달 계약 — 생략하면 기본 icon 색이 누출된다

공용 `Icon`은 기본 semantic icon color를 inline style로 가질 수 있다. 따라서 SNB의 navy state
color를 보장하려면 **모든 호출 지점에서** 아래 전달 방식을 사용해야 한다. CSS의
`svg { color: currentColor }`만 추가하는 것으로는 충분하지 않다.

```tsx
// Expanded 1depth leading / chevron / favorite pill 내부 Icon
<Icon name="globe" size="m" style={{ color: 'inherit' }} />
<Icon name="chevron_down" size="m" style={{
  color: 'inherit',
  transform: expanded ? 'rotate(180deg)' : undefined,
  transition: 'transform 0.2s ease',
}} />

// Header toggle과 collapsed rail: IconButton이 inner Icon에 inherit를 전달해야 한다.
<IconButton
  icon="chevrons_left"
  size="medium"
  variant="outlined"
  iconSize="s"
  iconColor="inherit"
  className="snb-toggle"
  aria-label="Side navigation 접기"
/>

<IconButton
  icon={item.icon ?? 'dashboard'}
  size="xlarge"
  variant="ghost"
  iconSize="l"
  iconColor="inherit"
  className="snb-collapsed-item"
  data-state={resolvedState}
  aria-label={item.label}
/>
```

색상은 아래처럼 **button의 `color` 하나가 내부 Icon까지 상속**하는 구조여야 한다. `color="default"`,
`iconColor` 생략, raw SVG, 직접 hex inline style은 금지한다.

| 위치 / 상태 | button `color` | glyph 결과 |
| --- | --- | --- |
| Expanded idle | `#727885` | leading icon·label·chevron 모두 `#727885` |
| Expanded hover / pressed | `#ffffff` | leading icon·label·chevron 모두 `#ffffff` |
| Expanded selected (hover/pressed 포함) | `#66a3ff` | leading icon·label·chevron 모두 `#66a3ff` |
| Header toggle | `#ffffff` | `chevrons_left/right` 모두 `#ffffff` |
| Collapsed idle | `#727885` | rail icon `#727885` |
| Collapsed hover / pressed / selected | `#ffffff` | rail icon `#ffffff` |
| Collapsed non-selected focus | `#727885` | rail icon `#727885` |

### 의존성 연결 계약 — 기본 스타일을 그대로 쓰지 않는다

의존성의 기능을 재구현하지는 않지만, 아래 **SNB v1 adapter contract**를 지원해야 한다.
이 계약이 없으면 공용 primitive의 기본 white surface가 portal에 나타난다.

| 의존성 | SNB v1이 전달해야 하는 값 | 구현자가 확인할 실패 징후 |
| --- | --- | --- |
| IconButton | `className`, `data-state`, `iconColor="inherit"`, `aria-label`을 실제 `<button>`에 전달 | rail icon이 버튼의 기본 검정/회색을 쓰거나 selected hover에서 파란 fill이 사라짐 |
| Icon | 1depth는 24×24 wrapper 안의 16px icon, collapsed trigger는 32×32 button 안의 16px icon. raw Icon에는 반드시 `style={{ color: 'inherit' }}` | 1depth label과 icon의 간격이 4px보다 넓거나 rail이 좁아 보임 |
| Menu / MenuSub | `className`을 **portal content와 모든 sub content**에 부여하고 `modal={false}` 지원 | 2depth popup 또는 3depth submenu가 흰색이거나 trigger↔menu 이동 시 깜빡임 |
| MenuItem / MenuSubTrigger | `data-selected`, custom `data-snb-ancestor-selected`, trailing check/chevron 지원 | 선택 leaf가 blue가 아니거나 active 3depth의 2depth 조상이 비활성처럼 보임 |
| ScrollArea | `className`, `contentClassName`, vertical scrollbar selector, user scroll callback 지원 | scroll content에 공용 16px padding이 남거나 thumb가 icon 옆에 붙음 |
| Tooltip | `side="right"`, 300ms delay, trigger as child 지원 | child 없는 collapsed item에 popup Menu를 띄우거나 label이 노출되지 않음 |

**portal 주의:** `MenuContent`와 `MenuSubContent`는 보통 `document.body`에 portal된다. 따라서
`aside.snb`에만 CSS variable을 선언해도 상속되지 않는다. 아래 CSS의 `.snb-menu` class를
**두 content 모두에 직접** 적용해야 한다. 이 한 단계가 빠지면 첨부된 실패 화면처럼 흰색 메뉴가
나온다.

## 3. 데이터 계약과 구조

### 데이터 계약

```ts
type SystemIconName = string

export interface SNBItemData {
  id: string
  label: string
  icon?: SystemIconName       // 1depth에서만 렌더
  children?: readonly SNBItemData[] // 최대 3 depth
  starred?: boolean           // 초기 즐겨찾기 상태
  disabled?: boolean
}

export interface SNBSectionData {
  id: string
  title?: string
  items: readonly SNBItemData[]
}

export interface SNBFavoriteItemData {
  id: string
  label: string
  icon?: SystemIconName
  disabled?: boolean
}

export interface SNBFavoritesData {
  title?: string              // 기본값: '즐겨찾기'
  items: readonly SNBFavoriteItemData[] // 항상 1depth leaf
}

export interface SNBProps {
  sections: readonly SNBSectionData[]
  favorites?: SNBFavoritesData
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  openIds?: readonly string[]
  defaultOpenIds?: readonly string[]
  onOpenIdsChange?: (ids: readonly string[]) => void
  activeId?: string
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  className?: string
}
```

### Anatomy

```text
Expanded SNB (aside[aria-label="Side navigation"])
├── Header (78px)
│   ├── Brand logo assets
│   └── outlined collapse Icon Button (24×24)
└── ScrollArea (남은 높이)
    └── Navigation
        ├── Favorites section (optional)
        │   ├── title
        │   ├── 최초 3개 1depth shortcut
        │   ├── accordion으로 열리는 나머지 shortcut
        │   └── gap 중앙의 32×20 pill toggle
        └── Section × n (32px gap)
            └── 1depth item (44px)
                ├── 2depth panel (optional, 4px 상단 gap)
                │   └── 2depth item (40px)
                │       └── 3depth panel (optional, 4px connector)
                │           └── 3depth item (36px, full-height tree line)
                └── leaf favorite button (24×24, optional)

Collapsed SNB
├── Header: compact logo / expand Icon Button / Separator
└── ScrollArea (SNB 전체 폭 track, icon rail은 중앙)
    └── Navigation groups
        ├── Favorites star Icon Button (optional) → Menu
        ├── group divider
        └── 1depth Icon Button × n
            ├── leaf → Tooltip(right)
            └── children → Menu(right) → MenuSub(3depth)
```

## 4. 레이아웃 스펙

모든 수치는 px이며 `box-sizing: border-box`를 사용한다.

### Shell과 헤더

| 요소 | Expanded | Collapsed |
| --- | --- | --- |
| Shell 폭 | 240 | 60 |
| 높이 | 부모의 100%, `min-height: 100%` | 동일 |
| 우측 border | 1px | 1px |
| shell 내부 gap | 8 | 12 |
| shell padding | 0 | 상하 28, 좌우 12 |
| Header | 높이 78 | 콘텐츠 높이, shrink 금지 |
| Expanded logo box | x=19.5, y=19.5, 129×39 | — |
| Symbol / wordmark / subtitle | 38.361×38.361 / 79.524×18.246 / 66.139×11.312 | compact symbol 32×32 |
| Header toggle | x=우측 9, y=25, 24×24 | 일반 흐름, 24×24 |
| Collapsed header gap | — | 12 |
| Collapsed header separator | — | toggle 아래 margin-top 8, 32×1 |

Expanded Header는 실제 사용자가 최상단에서 아래로 스크롤했을 때만 `border-bottom: 1px`을
표시한다. mount, resize, collapse/expand로 생성된 synthetic scroll은 이 상태를 바꾸지 않는다.

Expanded header와 navigation 사이의 root gap은 항상 **8px**이다. 32px spacing은 nav의 첫 section
앞에는 절대 적용하지 않고, 실제 앞선 section의 다음 section에만 적용한다. 따라서 즐겨찾기가
없으면 logo/header와 첫 navigation section 사이에는 8px만 남고, 즐겨찾기가 있으면 즐겨찾기 section
다음 첫 navigation section부터 32px을 적용한다. collapsed mode의 12px gap에는 적용하지 않는다.

검증 기준: `favorites` prop을 생략한 상태에서 첫 `.snb-section`의 `margin-top`은 반드시 `0px`이며,
두 번째 실제 `.snb-section`부터만 `margin-top: 32px`이다. `nav` 자체에 `padding-top`이나 `gap: 32px`을
사용하지 않는다.

### 섹션과 menu item

| 항목 | 값 |
| --- | --- |
| Section 간 gap | 32 |
| Section title | 좌측 12 padding |
| title ↔ items | 4 |
| 1depth item | 높이 44, 좌우 padding 8, leading icon과 label gap 4 |
| 1depth icon wrapper | 24×24, 중앙 정렬. Icon 자체는 16×16(`size="m"`) |
| 2depth item | 높이 40, padding `0 8px 0 36px` |
| 3depth item | 높이 36, padding `0 8px 0 36px`, button border 없음 |
| 1→2 panel | 상단 4 padding |
| 2→3 panel | padding 없음. 3depth는 2depth 바로 다음에 배치하며 connector 없음 |
| 3depth connector | 16px 폭 중 x=4에 1px 세로선. item 높이(36px)를 끝까지 채움 |
| leaf favorite control | 24×24, item root 우측 32에 absolute 배치 |
| favorite가 있는 leaf 제목 예약 영역 | `padding-right: 56px`; 별표 왼쪽에서 ellipsis |
| label | flex:1, `min-width:0`, 한 줄, overflow ellipsis |

1depth의 leading icon은 24×24 hit/alignment box의 정중앙에 놓고 label과 **4px**만 띄운다.
2/3depth에는 leading system icon을 넣지 않는다. expand 가능한 item에는 favorite control을 보이지
않고 trailing chevron만 둔다.

### 즐겨찾기와 collapsed rail

| 항목 | 값 |
| --- | --- |
| Expanded에서 초기 노출 | 첫 3개 |
| 초과 항목 | 동일한 accordion으로 표시 |
| 더보기/접기 pill | 32×20, `border-radius:999px` |
| pill 위치 | section의 다음 section gap(32px) 중앙. pill 전·후 6px씩이며 section 높이를 추가하지 않음 |
| Collapsed icon | 32×32, radius 4 |
| Collapsed group | 폭 32, item gap 4 |
| Collapsed groups 간 gap | 12 |
| Collapsed divider | 1px, 위아래 margin 8 |
| Collapsed ScrollArea | height 남은 영역, track 폭 60, icon rail은 32폭 중앙 |
| Collapsed ScrollArea thumb | SNB 우측에서 4px 안쪽, icon button과 7px 이상 이격 |
| Collapsed 즐겨찾기 popup | header 32 + 최대 5×36 item = 최대 높이 212; 6번째부터 내부 ScrollArea |

