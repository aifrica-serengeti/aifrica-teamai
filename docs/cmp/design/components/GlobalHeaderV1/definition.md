# Global Header v1 — 정의와 구조

공용 묶음 적용 조건: inheritCommon: true를 채택하고 frontend-common 역할을 선택한 UI 작업에만
아래 계약을 적용한다. 공용을 끈 경우 제품 자체 지침을 따르며 공용 문서·스킬·primitive를 요구하지 않는다.

> CMP 확장 계약: 상태·공개 API·접근성을 원본에서 분리했다. 색은 역할 token으로 연결하고 브랜드·메뉴·계정 데이터는 현재 제품에서 제공한다. 치수는 해당 shell 세대를 채택할 때의 참조 baseline이며 제품에서 변경하면 근거와 검증을 기록한다. 과거 구현됨 표기는 현재 제품 구현의 증거가 아니다.

[← Global Header v1 문서 인덱스](README.md)

## 2. 의존 컴포넌트

| 의존 컴포넌트 | 가이드라인 | 구현 상태 | Global Header v1에서의 역할 |
| --- | --- | --- | --- |
| Breadcrumb | Breadcrumb/README.md (`DOCS_ROOT/frontend/design/components/Breadcrumb/README.md`) | 제품에서 확인 | 좌측 현재 위치. 폭이 부족하면 자체 `...` 축약 메뉴로 전환 |
| Search | Search/README.md (`DOCS_ROOT/frontend/design/components/Search/README.md`) | 제품에서 확인 | `size="large"`(36px) 메뉴 검색 입력 |
| Icon Button | IconButton/README.md (`DOCS_ROOT/frontend/design/components/IconButton/README.md`) | 제품에서 확인 | bell/help/more 전역 액션. `ghost`, `xlarge`(32px) |
| Badge | Badge/README.md (`DOCS_ROOT/frontend/design/components/Badge/README.md`) | 제품에서 확인 | bell 우상단의 unread dot(6px) |
| Avatar | Avatar/README.md (`DOCS_ROOT/frontend/design/components/Avatar/README.md`) | 제품에서 확인 | 계정 trigger(24px) 및 메뉴 프로필(36px) |
| Icon | Icon/README.md (`DOCS_ROOT/frontend/design/components/Icon/README.md`) | 제품에서 확인 | 계정 chevron, 로그아웃·챗봇 메뉴 leading icon |
| Menu | Menu/README.md (`DOCS_ROOT/frontend/design/components/Menu/README.md`) | 제품에서 확인 | 계정 DropdownMenu의 open/close, focus, portal, menu item 키보드 동작 |
| Chip | Chip/README.md (`DOCS_ROOT/frontend/design/components/Chip/README.md`) | 제품에서 확인 | 계정 메뉴의 역할 표시. `gray/subtle/small` |

### 의존성 조합 규칙

```
Global Header v1
├── Breadcrumb
├── Search (large)
├── Icon Button (ghost/xlarge) × 3
│   └── Badge (bell의 unread dot, optional)
└── Menu (계정 trigger + content)
    ├── Avatar (24px trigger / 36px profile)
    ├── Icon (chevron_down, out, help)
    └── Chip (gray/subtle/small role label, optional)
```

각 의존성은 독립된 단일 진실 원천이다. 예를 들어 계정 메뉴의 키보드 이동·ESC 닫기·바깥 클릭
닫기는 Global Header v1이 직접 구현하지 않고 Menu에 위임한다.

---

## 3. 구조 (Anatomy)

```
header[Global Header v1]
├── Breadcrumb slot (optional, flex: 1 1 0)
│   └── Breadcrumb
└── Utility area
    ├── Search slot
    │   └── Search (large, placeholder="메뉴 검색")
    ├── nav[aria-label="전역 작업"]
    │   ├── Notification action (relative)
    │   │   ├── Icon Button — bell
    │   │   └── Badge dot (optional)
    │   ├── Icon Button — help
    │   └── Icon Button — more_horizontal
    └── Account Menu
        ├── Trigger button
        │   ├── Avatar (24px)
        │   ├── Account name (14px, 줄임표 금지)
        │   └── chevron_down Icon (14px, open이면 180° 회전)
        └── MenuContent (216px, end align)
            ├── Profile block
            │   ├── Avatar (36px)
            │   └── Name + optional role Chip + optional email
            ├── Divider
            ├── MenuItem — out icon + “로그아웃”
            └── MenuItem — help icon + “챗봇 열기”
```

---

## 4. 레이아웃 스펙

### Header shell

| 항목 | 값 |
| --- | --- |
| 높이 | `min-height: 56px` |
| 너비 | `width: 100%` |
| 좌우 padding | 32px (viewport ≤899px: 16px) |
| 좌·우 그룹 gap | 24px (viewport ≤899px: 16px) |
| 하단선 | 1px |
| overflow | `hidden` — 좁은 폭에서 breadcrumb가 먼저 줄고 shell 밖으로 넘치지 않음 |
| font | Pretendard (`--font-sans`) |

### 좌측 Breadcrumb / 우측 Utility

| 영역 | 규칙 |
| --- | --- |
| Breadcrumb slot | `flex: 1 1 0; min-width: 0`. Breadcrumb 자체의 자동 축약을 그대로 사용 |
| Utility area | `display: flex; align-items: center; justify-content: flex-end; gap: 24px` |
| Search slot | 기본 `width: 400px; flex: 0 1 400px; min-width: 240px` |
| Search slot @ ≤899px | `width/flex-basis: 280px; min-width: 180px` |
| Search slot @ ≤679px | 숨김. Breadcrumb, actions, account 접근성을 보존 |
| Action group | `gap: 8px`, Icon Button 3개 각각 32×32px |

### Notification dot

| 항목 | 값 |
| --- | --- |
| host | `position: relative`인 bell wrapper |
| Badge variant | `dot` (6×6px) |
| 위치 | `top: 2px; left: 24px` — 32px bell의 우상단 |
| 렌더 조건 | `hasUnreadNotifications !== false` |

### Account trigger

| 항목 | 값 |
| --- | --- |
| 최소 크기 | `min-width: 156px; min-height: 36px` |
| padding | 상하 6px, 좌우 10px |
| 내부 gap | 8px — Avatar와 이름 사이에도 동일하게 적용 |
| 모서리 | 8px |
| Avatar | 24×24px, 제품이 선택한 account avatar token |
| 이름 | 14px/20px/400, `white-space: nowrap`; **ellipsis·overflow hidden 금지** |
| chevron | 14px (`Icon size="s"`) |
| @ ≤519px | 44×44px, 이름·chevron 숨김, 24px Avatar만 유지 |

### Account Menu

| 항목 | 값 |
| --- | --- |
| 정렬/간격 | trigger 기준 `align="end"`, `sideOffset: 8px` |
| 너비 | 216px, 최대 `calc(100vw - 16px)` |
| 컨테이너 padding | 0 (공용 Menu의 기본 4px 상하 padding을 이 조합에서 제거) |
| 프로필 block | padding 12px 16px, Avatar↔정보 gap 12px |
| 프로필 Avatar | 36×36px |
| identity gap | 이름 행↔email 2px |
| 이름↔역할 Chip gap | 6px |
| 이름 | 14px/20px/400 |
| email | 12px/16px/400 |
| 역할 Chip | `gray`, `subtle`, `small` = 높이 20px |
| 메뉴 항목 | 공용 Menu `large`: 최소 높이 36px, padding 8px 16px |
| 구분선 | 공용 Menu divider: 1px, 위아래 2px margin |

---


## 공개 Props 계약

React의 `ComponentProps`와 공용 Breadcrumb의 실제 타입을 사용한다. 아래는 공개 API이며 제품 구현의 export 존재를 뜻하지 않는다.

```ts
export interface GlobalHeaderV1Account {
  initials?: string
  name: string
  color?: 'indigo' | 'primary' | 'green' | 'cyan' | 'purple' | 'fuchsia' | 'gray'
  email?: string
  roleLabel?: string
}

export interface GlobalHeaderV1Props
  extends Omit<ComponentProps<'header'>, 'children' | 'onChange'> {
  breadcrumbs?: Array<{ label: string; href?: string; current?: boolean }>
  searchValue?: string
  defaultSearchValue?: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  onSearchClear?: () => void
  hasUnreadNotifications?: boolean
  onNotificationClick?: () => void
  onHelpClick?: () => void
  onMoreClick?: () => void
  account?: GlobalHeaderV1Account
  onAccountClick?: () => void
  onLogoutClick?: () => void
  onChatbotClick?: () => void
}
```

계정·미확인 알림은 제품이 전달한다. `account`가 없으면 계정 메뉴를 렌더하지 않고
`hasUnreadNotifications`가 생략되면 dot을 표시하지 않는다. 기본 관리자·이메일을 생성하지 않는다.
[React 조립 예제](./implementation/typescript.md)에서 controlled search와 계정 메뉴 callback을 확인한다.
