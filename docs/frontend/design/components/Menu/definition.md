# Menu — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Menu 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

| 의존 컴포넌트  | 용도                                                             | 가이드라인     | 비고                                                           |
| -------------- | ---------------------------------------------------------------- | -------------- | -------------------------------------------------------------- |
| **Icon**       | Leading element(아이콘) · Trailing element(external link, check) | `Icon/README.md`      | `size="m"`(16px). 색상 semantic: `default`/`subtle`/`primary`. |
| **Avatar**     | Leading element(사용자/워크스페이스 식별)                        | `Avatar/README.md`    | 7색 × solid/subtle. 메뉴 내에서는 `size="20"`.                 |
| **Checkbox**   | Leading element(다중 선택)                                       | `Checkbox/README.md`  | `onSelect={(e) => e.preventDefault()}`로 메뉴 유지.            |
| **Switch**     | Trailing element(토글 설정)                                      | `Switch/README.md`    | `size="small"`. `onSelect preventDefault`로 메뉴 유지.         |
| **Chip**       | Trailing element(상태 태그)                                      | `Chip/README.md`      | `size="small"`, `variant="subtle"`.                            |
| **Badge**      | Trailing element(카운터/알림)                                    | `Badge/README.md`     | `variant="counter"` / `variant="dot"`.                         |
| **ScrollArea** | 스크롤 영역(`scrollable=true` 시)                                | `Scrollbar/README.md` | `type="auto"`(hover+scroll 시 표시).                           |

> Selected check 아이콘은 Menu 내부에서 `CheckIcon`(lucide-react)을 `--text-primary`로 자동 렌더.

---

## 3. 구조 (Anatomy)

```
Menu (DropdownMenu.Root)
├── Trigger (외부 — Button/Icon Button + asChild)
├── MenuContent (Radix Content)
│   ├── [ScrollArea] (scrollable=true 시만 — children 을 감싸는 래퍼)
│   │   ├── MenuSection (optional — Group)
│   │   │   ├── MenuSectionHeader (optional — Label, 32px)
│   │   │   └── MenuItem × N
│   │   ├── MenuItem × N
│   │   ├── MenuDivider (optional — Separator)
│   │   └── MenuSub (optional — Sub)
│   │       ├── MenuSubTrigger (우측 chevron 자동)
│   │       └── MenuSubContent (하위 MenuContent, 기본 size="small")
│   └── [children 직접] (scrollable=false 시)
└── (ESC / 외부 클릭 / item 선택 → 메뉴 닫힘)
```

### MenuItem 내부 구조 (★ 가장 중요 — 두 줄 밀림/겹침 방지)

```
MenuItem (flex row, gap 8px, overflow hidden)
├── <span itemLeading>     ← leading: Icon/Avatar/Checkbox (flex-shrink:0)
├── <span itemContent>     ← label + description (flex:1, min-width:0, overflow:hidden)
│   ├── {children}             label 텍스트 (Body2 14px)
│   └── <span itemDescription> description (Body3 12px, optional)
├── <span itemTrailing>    ← trailing (flex-shrink:0, margin-left:auto)
│   └── {trailing}             shortcut(string→itemShortcut) / Icon / Chip / Badge / Switch
└── <span itemTrailing>    ← selected + trailing 미지정 시 자동 CheckIcon
```

> **핵심 규칙**: leading과 content는 `gap: 8px`로 **같은 행**에 수평 배치.
> trailing은 `margin-left: auto`로 우측 끝에 정렬. 절대 두 줄로 밀려나지 않음.

---

## 4. 레이아웃 스펙

### MenuContent (컨테이너)

| 항목         | 값                                | 비고                                                             |
| ------------ | --------------------------------- | ---------------------------------------------------------------- |
| 최소 너비    | **140px**                         | Figma 스펙                                                       |
| 너비         | `max-content`                     | 컨텐츠에 맞춰 자동 확장                                          |
| 최대 너비    | Radix collision detection         | 뷰포트에 맞춰 자동 제한                                          |
| 최대 높이    | **296px** (Large 8개)             | `scrollable=true` 시. `false` 시 제한 없음                       |
| 스크롤       | `scrollable` prop(기본 `true`)    | 공용 **ScrollArea**(`type="auto"`)로 감싸 custom thumb(4px) 표시 |
| padding      | **4px 0**                         | 상하만                                                           |
| 모서리 반경  | **4px**                           |                                                                  |
| 테두리       | `1px solid var(--border-default)` |                                                                  |
| box-shadow   | `var(--menu-shadow)`              | navy 톤 2단                                                      |
| trigger 간격 | **4px**                           | Radix `sideOffset=4`                                             |

> **scrollable 분리 규칙 (★중요)**:
>
> - `content` 기본 스타일에는 `maxHeight`/`overflow`를 **절대 두지 않는다**.
>   Radix가 런타임에 `--radix-dropdown-menu-content-available-height`를 설정하므로,
>   기본에 두면 `scrollable=false` 시에도 제한이 풀리지 않는다.
> - `scrollable=true` → `contentScrollable` 클래스(maxHeight + overflow:hidden) + ScrollArea로 children 감싸기
> - `scrollable=false` → `contentNoScroll` 클래스(빈 클래스, 제한 없음) + children 직접 렌더

### MenuItem — 사이즈

| 사이즈     | padding(상하) | 최소 높이 | 용도            |
| ---------- | ------------- | --------- | --------------- |
| **Small**  | `4px`         | **28px**  | Submenu         |
| **Medium** | `6px`         | **32px**  | 중간            |
| **Large**  | `8px`         | **36px**  | 주요 Menu(기본) |

> 공통: px **16px**(좌우), gap **8px**(요소 간), `white-space: nowrap`, `overflow: hidden`

### MenuItem 내부 간격

| 관계                              | gap                             |
| --------------------------------- | ------------------------------- |
| leading ↔ content                 | **8px** (item flex gap)         |
| leading 내부(아이콘 간)           | **4px**                         |
| content 내부(label ↔ description) | **4px**                         |
| trailing 내부(요소 간)            | **4px**                         |
| content ↔ trailing                | `margin-left: auto` (자동 간격) |

### MenuSectionHeader

| 항목    | 값                     |
| ------- | ---------------------- |
| 높이    | **32px**               |
| padding | `0 16px`               |
| 폰트    | Title3 (12px SemiBold) |
| 색상    | `--text-subtle`        |

### MenuDivider

| 항목        | 값                        |
| ----------- | ------------------------- |
| 높이        | **1px**                   |
| 너비        | 100%                      |
| 위아래 여백 | **2px** (`margin: 2px 0`) |
| 색상        | `var(--border-default)`   |

---

## 8. Menu Component Patterns (★메뉴 구성 패턴)

메뉴는 하나 이상의 패턴을 조합하여 구성한다. 아래는 Figma Menu Components 표(node 7102:186391)
에 정의된 모든 패턴과 그 조합 규칙이다.

### 패턴 1: Text only (단일 텍스트)

가장 기본적인 형태. 텍스트 라벨만 있는 item.

```
┌──────────────────────────┐
│ Menu item                │
└──────────────────────────┘
```

```tsx
<MenuItem>Menu item</MenuItem>
```

### 패턴 2: Section header + Divider

관련 item들을 그룹화. `MenuSection`(Group) 안에 `MenuSectionHeader`(Label)와 item들을 배치.
섹션 간은 `MenuDivider`로 구분.

```
┌──────────────────────────┐
│ Section header            │  ← 32px, Title3 12px SemiBold, --text-subtle
├──────────────────────────┤
│ Menu item                 │
│ Menu item                 │
├──────────────────────────┤  ← Divider 1px + 2px 여백
│ Section header            │
├──────────────────────────┤
│ Menu item                 │
└──────────────────────────┘
```

```tsx
<MenuSection>
  <MenuSectionHeader>파일</MenuSectionHeader>
  <MenuItem>Menu item</MenuItem>
</MenuSection>
<MenuDivider />
<MenuSection>
  <MenuSectionHeader>편집</MenuSectionHeader>
  <MenuItem>Menu item</MenuItem>
</MenuSection>
```

> **규칙**: Section header는 비활성화 불가. 클릭 이벤트 없음. 시각적 분류 목적만.

### 패턴 3: Leading icon

아이콘을 item 좌측에 배치. `leading` prop에 **Icon 컴포넌트** 전달.

```
┌──────────────────────────┐
│ [icon] Menu item          │  ← icon 16px, gap 8px
└──────────────────────────┘
```

```tsx
<MenuItem leading={<Icon name="copy" size="m" />}>복사</MenuItem>
```

> **규칙**:
>
> - Icon은 반드시 공용 **Icon 컴포넌트** 사용(lucide-react 직접 import 금지).
> - `size="m"`(16px), 색상은 기본 `default`(`--icon`). selected/disabled 시 자동 전환.
> - 아이콘과 라벨이 **같은 행**에 수평 배치(절대 두 줄 밀림 없음).

### 패턴 4: Trailing shortcut

키보드 단축키를 item 우측에 배치. `trailing` prop에 **문자열** 전달.

```
┌──────────────────────────┐
│ Menu item         Ctrl+N │  ← shortcut Body2 14px, --text-subtler
└──────────────────────────┘
```

```tsx
<MenuItem trailing="Ctrl+N">New file</MenuItem>
```

> **규칙**:
>
> - `trailing`이 문자열이면 자동으로 `itemShortcut` 클래스 적용 → 색상 `--text-subtler`(#757575).
> - **검정(`--text`)이 아님**. 라벨과 색상 구분.
> - disabled 시 `--text-disabled`로 자동 전환.

### 패턴 5: Selected (trailing check)

선택된 상태를 나타냄. `selected` prop 사용. trailing 미지정 시 check 아이콘 자동 렌더.

```
┌──────────────────────────┐
│ Menu item              ✓  │  ← check 16px, --text-primary
└──────────────────────────┘
  ↑ 배경 --menu-item-selected, 텍스트 --text-primary
```

```tsx
<MenuItem selected>List view</MenuItem>
```

> **규칙**:
>
> - 배경이 `--menu-item-selected`(var(--accent-50) / 다크 var(--accent-900))로 변경.
> - 텍스트가 `--text-primary`(var(--accent-500) / 다크 var(--accent-200))로 변경.
> - 우측에 CheckIcon(16px)이 `--text-primary` 색상으로 자동 렌더.
> - `trailing`을 지정하면 check 대신 trailing이 표시됨(check 숨김).

### 패턴 6: Leading icon + Trailing shortcut (조합)

아이콘과 단축키를 동시에 사용.

```
┌──────────────────────────┐
│ [icon] Menu item   Ctrl+S │
└──────────────────────────┘
```

```tsx
<MenuItem leading={<Icon name="save" size="m" />} trailing="Ctrl+S">
  저장
</MenuItem>
```

### 패턴 7: Description (보조 텍스트)

라벨 아래에 설명 텍스트를 추가. `description` prop 사용.

```
┌──────────────────────────┐
│ Menu item                 │  ← Body2 14px, --text
│ Description               │  ← Body3 12px, --text-subtler
└──────────────────────────┘
```

```tsx
<MenuItem description="현재 페이지를 복제합니다">페이지 복제</MenuItem>
```

> **규칙**:
>
> - Description은 Body3(12px/16px Regular), 색상 `--text-subtler`.
> - disabled 시 `--text-disabled`로 자동 전환.
> - leading/trailing과 조합 가능:
>   `<MenuItem leading={<Icon />} description="설명" trailing="Ctrl+S">라벨</MenuItem>`

### 패턴 8: Leading avatar

사용자/워크스페이스 식별. `leading` prop에 **Avatar 컴포넌트** 전달.

```
┌──────────────────────────┐
│ (A) 워크스페이스 A         │  ← Avatar 20px, gap 8px
└──────────────────────────┘
```

```tsx
<MenuItem
  leading={
    <Avatar color="primary" size="20">
      A
    </Avatar>
  }
>
  워크스페이스 A
</MenuItem>
```

> **규칙**: Avatar `size="20"`(20px). 7색 × solid/subtle. 공용 Avatar 컴포넌트 사용.

### 패턴 9: Leading avatar + Trailing badge (조합)

아바타와 알림 배지를 동시에 사용.

```
┌──────────────────────────┐
│ (A) 프론트엔드팀        5  │  ← Badge counter, --element-point
└──────────────────────────┘
```

```tsx
<MenuItem
  leading={
    <Avatar color="primary" size="20">
      팀
    </Avatar>
  }
  trailing={<Badge variant="counter" count={5} />}
>
  프론트엔드팀
</MenuItem>
```

### 패턴 10: Trailing chip

상태 태그를 우측에 배치. `trailing` prop에 **Chip 컴포넌트** 전달.

```
┌──────────────────────────┐
│ 필터 A            [활성]  │  ← Chip small subtle
└──────────────────────────┘
```

```tsx
<MenuItem
  trailing={
    <Chip color="green" variant="subtle" size="small">
      활성
    </Chip>
  }
>
  필터 A
</MenuItem>
```

> **규칙**: Chip `size="small"`, `variant="subtle"`. 공용 Chip 컴포넌트 사용.

### 패턴 11: Trailing icon (external link)

외부 링크 등을 나타내는 아이콘을 우측에 배치.

```
┌──────────────────────────┐
│ 사용자 가이드          ↗  │  ← Icon external_link 16px, --icon-subtle
└──────────────────────────┘
```

```tsx
<MenuItem trailing={<Icon name="external_link" size="m" color="subtle" />}>
  사용자 가이드
</MenuItem>
```

> **규칙**: 외부 링크 아이콘은 `color="subtle"`(`--icon-subtle`). primary 아님.

### 패턴 12: Leading checkbox (다중 선택)

체크박스를 item 좌측에 배치. 메뉴를 닫지 않고 토글하려면 `onSelect`에서 `preventDefault`.

```
┌──────────────────────────┐
│ ☑ 그리드 표시              │  ← Checkbox 16px
└──────────────────────────┘
```

```tsx
<MenuItem
  onSelect={(e) => {
    e.preventDefault();
    setShowGrid((v) => !v);
  }}
  leading={<Checkbox checked={showGrid} />}
>
  그리드 표시
</MenuItem>
```

> **규칙**:
>
> - `onSelect={(e) => e.preventDefault()}`를 반드시 호출 — 그렇지 않으면 클릭 시 메뉴가 닫힘.
> - Checkbox는 공용 shadcn Checkbox(Radix) 사용.
> - checked/unchecked/disabled 상태를 state로 관리.

### 패턴 13: Trailing switch (토글 설정)

스위치를 item 우측에 배치. 설정 토글용.

```
┌──────────────────────────┐
│ 자동 저장              ◯─ │  ← Switch small
└──────────────────────────┘
```

```tsx
<MenuItem
  onSelect={(e) => e.preventDefault()}
  trailing={
    <Switch size="small" checked={autoSave} onCheckedChange={setAutoSave} />
  }
>
  자동 저장
</MenuItem>
```

> **규칙**:
>
> - `onSelect preventDefault` 필수 — 메뉴 유지.
> - Switch `size="small"`. 공용 shadcn Switch(Radix) 사용.

### 패턴 14: Submenu (2-depth)

하위 메뉴를 가지는 item. hover/focus 시 하위 메뉴 펼침.

```
┌──────────────────────────┐
│ Menu item                 │
│ More options          ›   │  ← chevron-right 16px, --text
├──────────────────────────┤
│ (하위 메뉴가 우측에 펼쳐짐) │
└──────────────────────────┘
```

```tsx
<MenuSub>
  <MenuSubTrigger>More options</MenuSubTrigger>
  <MenuSubContent size="small">
    <MenuItem>Sub item 1</MenuItem>
    <MenuItem>Sub item 2</MenuItem>
  </MenuSubContent>
</MenuSub>
```

> **규칙 (★중요)**:
>
> - `MenuSubTrigger`는 일반 `MenuItem`과 **동일한 스타일**(item + ITEM_SIZE_CLASS) 적용.
> - 우측에 `ChevronRightIcon`(16px)이 **자동 렌더**. 색상은 `--text`(폰트와 동일).
> - `MenuSubContent`는 `content` 클래스 사용, 기본 `size="small"`, 자체 `MenuContext.Provider` 전파.
> - 좁은 뷰포트에서는 Submenu가 뷰포트 내에 위치하도록 Radix collision detection이 처리.

### 패턴 조합 규칙

| 규칙                    | 내용                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Leading은 1개만**     | icon, avatar, checkbox 중 하나. 여러 개를 넣을 수 있으나 권장하지 않음.              |
| **Trailing은 1개만**    | check(자동), shortcut, icon, chip, badge, switch 중 하나.                            |
| **Icon+Text 혼용 금지** | 한 메뉴 내에서 아이콘이 있는 item과 없는 item을 섞지 않는다(Figma Do/Don't).         |
| **Selected + trailing** | trailing을 지정하면 check 아이콘 대신 trailing이 표시됨.                             |
| **Checkbox/Switch**     | `onSelect preventDefault` 필수 — 메뉴를 닫지 않고 토글.                              |
| **Item 개수**           | 효율적인 검색을 위해 **12개 이하**를 권장. 초과 시 `scrollable=true`(기본)로 스크롤. |
| **삭제 등 위험 액션**   | 별도 Section이나 Divider로 분리. 필요 시 Semantic color 적용(향후 지원).             |

### 전체 조합 예시 (Figma Anatomy 풀 데모)

```tsx
<MenuContent size="large">
  {/* Section 1: 단순 item + selected */}
  <MenuItem>Menu item</MenuItem>
  <MenuItem selected>Selected item</MenuItem>

  <MenuDivider />

  {/* Section 2: icon + shortcut */}
  <MenuItem leading={<Icon name="copy" size="m" />} trailing="Ctrl+C">
    복사
  </MenuItem>
  <MenuItem leading={<Icon name="modify" size="m" />} trailing="Ctrl+V">
    붙여넣기
  </MenuItem>

  <MenuDivider />

  {/* Section 3: checkbox + switch */}
  <MenuItem
    onSelect={(e) => e.preventDefault()}
    leading={<Checkbox checked={true} />}
  >
    그리드 표시
  </MenuItem>
  <MenuItem
    onSelect={(e) => e.preventDefault()}
    trailing={<Switch size="small" checked={true} />}
  >
    자동 저장
  </MenuItem>

  <MenuDivider />

  {/* Section 4: description + submenu */}
  <MenuItem description="최근 편집한 목록" trailing="Ctrl+R">
    최근 항목
  </MenuItem>
  <MenuSub>
    <MenuSubTrigger>More options</MenuSubTrigger>
    <MenuSubContent size="small">
      <MenuItem>Sub item 1</MenuItem>
      <MenuItem>Sub item 2</MenuItem>
    </MenuSubContent>
  </MenuSub>
</MenuContent>
```

---

