# SNB v2 — 정의와 구조

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← SNB v2 문서 인덱스](README.md)

## 2. 의존 컴포넌트

SNB 내부에서 다음 기능을 다시 구현하지 않는다. 각 가이드라인과 구현을 먼저 확보한 뒤 조합한다.

| 구분 | 의존성 | SNB v2에서의 용도 | 가이드라인 | 구현 상태 |
| --- | --- | --- | --- | --- |
| 직접 | Icon Button | Expanded footer의 account overflow action | IconButton (`DOCS_ROOT/frontend/design/components/IconButton/README.md`) | 제품에서 구현 확인 후 재사용 |
| 직접 | Icon | 모든 1depth·utility leading icon과 1·2depth disclosure chevron | Icon (`DOCS_ROOT/frontend/design/components/Icon/README.md`) | 제품에서 구현 확인 후 재사용 |
| 직접 | Scrollbar & ScrollArea | navigation overflow, overlay thumb, scroll metrics → boundary adapter | Scrollbar & ScrollArea (`DOCS_ROOT/frontend/design/components/Scrollbar/README.md`) | 제품에서 구현 확인 후 재사용 |
| 직접 | Tooltip | Collapsed leaf의 right-side label | Tooltip (`DOCS_ROOT/frontend/design/components/Tooltip/README.md`) | 제품에서 구현 확인 후 재사용 |
| 직접 | Menu | Collapsed branch의 popup 및 3depth MenuSub | Menu (`DOCS_ROOT/frontend/design/components/Menu/README.md`) | 제품에서 구현 확인 후 재사용 |
| 공유 구현 | useHoverMenu | trigger와 portal popup 사이의 250ms pointer handoff | 시각 컴포넌트 아님 | 구현됨 · 공유 |
| 통합 peer | Global Header v2 | 부모가 collapsed state를 공유하는 shell header | [Global Header v2](../GlobalHeaderV2/README.md) | 구현됨 · 선택 조합 |

Global Header v2는 SNB 내부 의존성이 아니다. 독립 SNB에는 포함하지 않으며 application shell에서만 같은 controlled state를 전달한다.

~~~text
SNB v2
├── ScrollArea
│   └── onScrollMetricsChange → header/frame divider
├── Icon (모든 navigation/utility glyph + chevron_right)
├── Tooltip (collapsed leaf)
├── Menu
│   ├── MenuItem (leaf)
│   └── MenuSub / MenuSubTrigger / MenuSubContent (2·3depth)
├── useHoverMenu (trigger ↔ portal handoff)
└── Icon Button (account overflow)
~~~

메뉴와 utility 아이콘은 공용 Icon 하나로 렌더한다. SNB 내부에서 icon SVG를 만들거나 import하지 않는다. 브랜드 표시는 제품 통합 전까지 임시 brand slot으로 둘 수 있다. Footer avatar는 원형 공용 Avatar가 아니라 32×32, radius 10px account summary로 유지한다.

### 재현 중단 조건

다음 중 하나라도 해당하면 구현을 진행하지 말고 이 문서 14~16절을 완전히 확보한다.

- 공용 Icon이 없거나 icon name mapping이 확정되지 않았다.
- [16절 canonical source](./implementation/README.md) 전체를 확보하지 않았거나 일부 wrapper/style을 생략하려 한다.
- expanded navigation이 white card, border, outer radius로 보인다.
- collapsed rail 안에 white scroll card가 생긴다.
- source fixture 대신 Functions, 임의 메뉴명, raw SVG icon을 넣으려 한다.
- shared ScrollArea, Menu, Tooltip, Icon Button을 새로 구현하려 한다.

이는 허용된 간소화가 아니라 다른 컴포넌트 구현이다.

### 오구현 판별표

아래 결과가 보이면 이 문서를 따른 SNB v2가 아니다. 16절 canonical source로 되돌린 뒤
14절의 icon mapping과 15절 fixture를 다시 적용해 검증한다.

| 잘못된 결과 | SNB v2의 실제 결과 |
| --- | --- |
| Functions 같은 text/letter logo를 navigation row처럼 사용 | header의 32px brand slot에만 임시 브랜드를 두고 navigation icon에는 사용하지 않음 |
| blue 배경 안에 흰색 navigation card와 gray border | header, nav, utility, footer까지 하나의 blue-50 shell. 흰 surface는 collapsed popup Menu에만 사용 |
| raw SVG를 item마다 직접 작성 | 공용 Icon의 정해진 name을 16px wrapper로 렌더 |
| 모든 item이 같은 card radius 또는 parent가 selected fill | default 1depth radius 4, leaf selected radius 6; branch parent는 active descendant text만 검정 |
| utility가 settings/support만 있고 footer와 분리됨 | settings, 고객지원, 알림 세 item이 footer avatar 바로 위에 고정 |
| generic Avatar 또는 사용자 text button | 제품 token var(--cmp-account-avatar), radius 10px, 32px initial avatar와 12px CSS online dot |
| collapsed rail에 흰 inner scroll panel | rail 전체는 blue shell, 60px wide. ScrollArea border/radius/background는 모두 제거 |

## 4. 구조

~~~text
aside[aria-label="Side navigation"]
├── Header container (48px; scroll divider owner)
│   └── 제품 브랜드 logo
├── nav[aria-label="Primary navigation"]
│   └── Scroll frame (bottom divider owner)
│       └── ScrollArea
│           └── Section × n
│               ├── title (expanded only)
│               └── 1depth item
│                   ├── leaf
│                   └── branch → animated 2depth → animated 3depth
├── Utility stack (optional; footer 바로 위)
└── Footer (account avatar and expanded overflow action)
~~~

Collapsed에서는 첫 section을 제외한 각 section 앞에 36px divider를 하나 둔다.

### Shell surface 소유권 — 흰 카드 방지 규칙

이 표는 구현 초기에 반드시 적용하는 **pass/fail 계약**이다. 이미지처럼 blue shell 안에 큰
white rectangle이 생기는 것은 대부분 공용 `Card` 또는 `ScrollArea`의 기본 surface를 그대로
쓴 경우이며, SNB v2에서는 허용되지 않는다.

| DOM 영역 | background | border / radius / shadow | 허용 여부 |
| --- | --- | --- | --- |
| `aside` root | `--surface-primary-subtle`만 | border 0, radius 0, shadow none | 필수 |
| Header container / header | transparent | scroll boundary용 bottom border만. radius 0, shadow none | 필수 |
| `nav` / scroll frame / ScrollArea viewport / scroll content | transparent | scroll boundary용 frame bottom border만. 그 외 border 0, radius 0, shadow none | 필수 |
| `section` / branch / item row | transparent | border 0, radius 0, shadow none | 필수 |
| leaf button | transparent 또는 상태 blue token | item 자체의 r4/r6만 허용 | 필수 |
| collapsed `MenuContent` portal | `--surface` | Menu의 border/radius만 허용 | 유일한 white surface 예외 |
| Global Header 옆 `appContainer` | `--surface-shell` | 좌상단 r14만 허용 | SNB 바깥의 별도 sibling |

따라서 `nav`, `ScrollArea`, `section` 또는 그 wrapper에 `Card`, `Panel`, `Surface`,
`background: var(--surface)`, `border`, `border-radius`, `box-shadow`를 적용하는 것은 금지다.
`--surface`는 collapsed popup portal과 SNB 바깥 `appContainer`에서만 사용한다. 이 둘을
expanded navigation으로 복사하면 안 된다.

## 5. 레이아웃 스펙

모든 치수는 px이며 box-sizing은 border-box다.

| 요소 | Expanded | Collapsed |
| --- | --- | --- |
| Root | width/min-width 240, top padding 8 | width/min-width 60, padding 8 12 18 |
| Header container | full width, height 48, horizontal padding 16 | 60×48, horizontal padding 0, center |
| Header inner | full height, horizontal padding 8 | 32×32, center |
| Brand slot | width 123.072, height 28, internal gap 8 | 32×32 |
| Navigation start | header 바로 아래 | header 바로 아래; icon content만 top 15 inset |
| Scroll frame | remaining height | width 60, thumb는 rail right edge |
| Navigation bottom reserve | none | 175, absolute utility/footer와 겹침 방지 |
| Utility | normal flow, top margin 16 | width 32, absolute bottom 73, horizontal center |
| Footer | normal flow, padding 16 | 60×82, absolute bottom 0 |

| Navigation element | 스펙 |
| --- | --- |
| Section | padding 8, item gap 4 |
| Section title | height 32, left padding 16; collapsed에서는 숨김 |
| 1depth item | 32px height, horizontal padding 8, icon/label gap 8, default radius 4 |
| Expanded selected leaf | radius 6, left 4×24 pill indicator |
| 1 → 2depth | open top margin 4, child list gap 4 |
| 2depth row | height 32, left padding 22, selected anchor 2×32 |
| 2depth button | radius 0 6 6 0, horizontal padding 8 |
| 2 → 3depth | open top margin 4; 3depth rows gap 0 |
| 3depth row | height 32, left padding 40, base connector 1×32; selected connector 2×32 |
| Chevron | 16×16; closed right, open rotate 90deg |
| Collapsed target | 32×32 |
| Collapsed selected item | radius 0 6 6 0, left primary anchor 2×32 |
| Collapsed divider | width 36, height 1, vertical margin 8; 첫 group 앞에는 없음 |

### 2·3depth DOM과 축 방향 — 변경 금지

2depth branch의 row와 그 자식 목록은 같은 flex row 안에 놓이지 않는다. `row` 다음에
`branchChildren`이 **sibling**으로 오고, children content는 항상 세로 column이다. 이 구조를
지키지 않으면 `모델 버전  >  초안` 또는 `데이터셋  >  현재`가 한 줄에 나오는 회귀가 생긴다.

~~~text
div.branch (display:block; width:100%)
├── div.depth2Row (display:flex; width:100%; height:32; padding-left:22)
│   ├── span.depth2ActiveIndicator (2×32)
│   └── button.nestedItem (flex:1; height:32)
└── div.branchChildren (display:grid; width:100%; 0fr ↔ 1fr)
    └── div.branchChildrenContent (display:flex; flex-direction:column; gap:0 at depth2)
        ├── div.depth3Row (display:flex; width:100%; height:32; padding-left:40)
        │   ├── span.depth3ActiveIndicator (1×32, selected 2×32)
        │   └── button.nestedItem (flex:1; height:32)
        └── ...
~~~

다음 결과는 모두 실패다.

- 2depth label과 첫 3depth label이 가로로 같은 줄에 표시됨
- selected 3depth가 label 크기의 작은 chip으로만 표시됨
- 2depth 또는 3depth row 전체에 border box가 생김
- selected 상태라는 이유로 chevron button에 primary border를 표시함
- branch children을 `position:absolute`로 띄우거나 parent row 안쪽에 삽입함

선택 표면은 `nestedItem`의 남은 가로 폭 전체를 채운다. 평상시 selected에는 border와 outline이
없고 blue background만 사용한다. 1px primary outline은 키보드의 `:focus-visible` 순간에만
표시하며 mouse click 또는 selected 상태와 연결하지 않는다.

### Scroll boundary

ScrollArea의 `onScrollMetricsChange` 입력(clientHeight·scrollHeight·scrollTop)으로 none, top,
middle, bottom을 계산한다. none은 vertical overflow가 없을 때다. 전체 adapter는 구현 묶음에 있다.

| Scroll state | Header border-bottom | Scroll frame border-bottom |
| --- | --- | --- |
| none | transparent | transparent |
| top | transparent | 1px divider |
| middle | 1px divider | 1px divider |
| bottom | 1px divider | transparent |

Header border는 header box 안쪽에 그린다. pseudo-element나 negative offset을 사용하지 않는다. 이렇게 해야 Global Header v2의 48px bottom row와 정확히 맞고 이중 divider가 생기지 않는다.

## 11. Global Header v2 통합

부모 shell이 하나의 collapsed state를 소유한다. SNB에는 별도 collapse callback을 만들지 않는다.

~~~tsx
function ApplicationShell() {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className={screen}>
      <SNBV2 id="primary-snb" collapsed={collapsed} sections={sections} utilityItems={utilityItems} />
      <div className={appContainer}>
        <GlobalHeaderV2
          snbCollapsed={collapsed}
          snbId="primary-snb"
          onSnbCollapsedChange={setCollapsed}
          breadcrumbs={[{ label: '모델/에이전트', current: true }]}
        />
        <main className={appContent}>{children}</main>
      </div>
    </div>
  )
}
~~~

~~~ts
export const screen = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
  backgroundColor: 'var(--surface-primary-subtle)',
})

export const appContainer = style({
  display: 'flex',
  height: 'calc(100% - 8px)',
  minWidth: 0,
  minHeight: 0,
  flex: '1 1 0',
  flexDirection: 'column',
  marginTop: '8px',
  overflow: 'hidden',
  borderTopLeftRadius: '14px',
  backgroundColor: 'var(--surface-shell)',
})

export const appContent = style({ minWidth: 0, minHeight: 0, flex: '1 1 auto', overflow: 'auto' })
~~~

Radius와 clip은 Global Header v2가 아니라 appContainer의 책임이다. appContainer는 SNB
오른쪽에서만 8px 내려오며, 좌상단 radius는 정확히 14px이다. Header bottom border는 Global
Header의 border-default로 계속 유지하고, SNB header의 scroll boundary는 SNB 내부 header
box에서만 표시한다. screen/SNB/appContainer에는 min-width: 0 또는 min-height: 0을
명시해 nested flex overflow가 rail 폭을 바꾸지 않게 한다.

## 14. Icon-only 구현 계약

SNB v2는 메뉴, utility, chevron을 모두 공용 Icon으로 렌더한다. navigation용 SVG를 만들거나, 파일로 저장하거나, item 안에서 inline SVG를 직접 작성하지 않는다. brand logo는 제품 브랜드가 준비되기 전까지 임시 slot으로 둔다.

### 필수 icon name mapping

아래 mapping은 SNB 내부의 단일 진실 원천이다. item마다 다른 icon component나 raw SVG를 만들지 않는다.

~~~tsx
import type { SystemIconName } from '@components/icon/iconMap'
import { Icon } from '@components/icon/Icon'

export const snbV2SystemIconByName = {
  dashboard: 'dashboard',
  monitoring: 'desktop',
  'usage-monitoring': 'desktop_code',
  reports: 'manual',
  workspace: 'table',
  workflow: 'branch',
  'job-scheduling': 'calendar_clock',
  schedule: 'schedule',
  'model-agent': 'cpu',
  dataset: 'database',
  volume: 'volume',
  annotation: 'edit',
  'user-image': 'doc_code',
  'service-management': 'briefcase_business',
  software: 'app_window',
  'cloud-resources': 'cloud',
  settings: 'settings',
  support: 'support',
  notification: 'bell',
} as const satisfies Readonly<Record<string, SystemIconName>>

export type SNBV2IconName = keyof typeof snbV2SystemIconByName

function SNBV2NavigationIcon({ name }: { name: SNBV2IconName }) {
  return (
    <span className={itemIcon} aria-hidden>
      <Icon name={snbV2SystemIconByName[name]} size="m" style={{ color: 'currentColor' }} />
    </span>
  )
}
~~~

1depth render는 아래 한 줄만 사용한다. 2·3depth에는 leading icon을 넣지 않는다.

~~~tsx
{depth === 1 && itemData.icon ? <SNBV2NavigationIcon name={itemData.icon} /> : null}
~~~

### 제품 brand slot

`renderBrand?: (collapsed: boolean) => React.ReactNode`로 제품 자산을 주입한다. brand는 navigation icon과 분리하고 확장/축소 상태의 접근 가능한 이름을 유지한다. 제품 로고나 명칭을 기본값으로 하드코딩하지 않는다.

### Footer online state

online badge도 별도 SVG가 아니라 CSS circle이다.

~~~ts
export const onlineBadge = style({
  position: 'absolute',
  right: 0,
  bottom: '-2px',
  width: '12px',
  height: '12px',
  border: '2px solid var(--surface-primary-subtle)',
  borderRadius: '50%',
  backgroundColor: 'var(--color-green-500)',
})
~~~

### 금지 항목

- navigation, utility, chevron, online badge용 SVG 생성 또는 import
- menu item 안의 raw svg, img, data URI
- Icon의 name mapping을 item마다 흩어 쓰기
- Icon 대신 generic Functions logo, Avatar, white card를 menu content에 사용
- 공용 Icon의 size, focus, color transition을 SNB 내부에서 다시 구현

## 보조 메뉴 trigger 조합

`renderUtilityTrigger?: (item: SNBV2ItemData, trigger: ReactElement) => ReactNode`는 utility leaf의 native button만 감싼다. 기본 trigger를 그대로 반환하면 기존 동작을 유지한다. 일반 navigation 및 branch 메뉴에는 적용하지 않는다.


## 계정 메뉴 슬롯

`renderUserMenu?: (trigger: ReactElement) => ReactNode`는 트리거를 MenuTrigger asChild로 감싸는 슬롯이다. `userMenuLabel?: string` 기본값은 `계정 메뉴`다. 펼친 상태에서는 기존 more_vertical IconButton, 접힌 상태에서는 아바타를 포함하는 button을 전달한다. 슬롯을 생략하면 기존 footer 표현을 유지한다.
