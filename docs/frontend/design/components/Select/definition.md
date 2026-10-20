# Select — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Select 는 여러 공용 컴포넌트를 조합하여 구성된다. 재현자는 Select 를 구현하기 전에
아래 컴포넌트를 먼저 확보해야 한다.

| 의존 컴포넌트  | 가이드라인                                      | 사용 위치                                     | 비고                                                                                                                  |
| -------------- | ----------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Checkbox**   | [`Checkbox/README.md`](../Checkbox/README.md)   | Multi 모드 드롭다운 item 좌측, "모두 선택" 행 | size: small(small Select) / medium(나머지). checked/indeterminate 지원                                                |
| **Chip**       | `Chip/README.md`                                | Multi 모드 트리거 내 선택값 표시              | `color="blue" variant="subtle" size="small"`(S/M) 또는 `size="medium"`(L/XL). `shape="pill"`. `onRemove` 로 개별 제거 |
| **Spinner**    | [`Spinner/README.md`](../Spinner/README.md)     | loading 상태 trigger·option leading          | `size="tiny"`(16px) 사용                                                                                              |
| **Status**     | [`Status/README.md`](../Status/README.md)       | error 상태 드롭다운 option leading            | `state="error" showLabel={false} iconSize={16}` 사용                                                                  |
| **ScrollArea** | [`Scrollbar/README.md`](../Scrollbar/README.md) | `maxVisibleOptions`를 넘는 option viewport    | native scrollbar를 노출하지 않고 `type="auto"` overlay thumb를 사용                                                   |

> Checkbox 는 shadcn(Radix) primitive 를 커스텀한 것이다. Chip/Spinner/Status 는 공개
> dependency 컴포넌트다. 각 가이드라인을 참조하여 먼저 구현한다.

---

## 3. 구조 (Anatomy)

### Single 모드

```
Label (선택사항) *
┌──────────────────────────────────────────────┐
│ 옵션을 골라주세요 / [검색 input]      ▼       │  ← Trigger
└──────────────────────────────────────────────┘
Help text / Error message

드롭다운(Popover Content):
┌──────────────────────────────┐
│ Option 1                     │
│ Option 2               ✓     │  ← selected: 우측 check 아이콘
│ Option 3                     │
│ Option 4 (disabled)          │
└──────────────────────────────┘
```

### Multi 모드

```
Label (선택사항) *
┌──────────────────────────────────────────────┐
│ [chip] [chip] [chip] [+N]  [검색]    ✕  ▼   │  ← Trigger (chip + overflow + clear + chevron)
└──────────────────────────────────────────────┘
Help text / Error message

드롭다운(Popover Content):
┌──────────────────────────────┐
│ ☐ 모두 선택                  │  ← Select all (indeterminate checkbox)
├──────────────────────────────┤  ← Divider (margin 2px 0)
│ ☐ Option 1                   │  ← 좌측 checkbox
│ ☑ Option 2                   │
│ ☐ Option 3                   │
└──────────────────────────────┘
```

### 컴포넌트 파츠

| 파츠              | 설명                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Select** (Root) | 상태 관리. `value`/`values`, `multiple`, `searchable` 등을 context 로 전달                                                                                    |
| **SelectTrigger** | 트리거 컨테이너. 값/플레이스홀더/검색 input + chevron. searchable Single의 선택 label은 실제 input value로 표시. multi 시 chip 목록 + overflow + clear button |
| **SelectContent** | 드롭다운 패널. "모두 선택" 행 + divider + 필터링된 option 목록                                                                                                |
| **SelectItem**    | 개별 옵션. single: 우측 check. multi: 좌측 checkbox. `leading` prop 으로 spinner/status icon 주입 가능                                                        |

Select의 기본값은 `portalMode="dialog"`다. Content는 trigger의 가장 가까운
`[data-slot="dialog-content"]`를 portal container로 사용하므로 Dialog focus/scroll lock 경계 안에
남으면서도 Dialog Body의 clipping 영역에는 갇히지 않는다. Dialog가 없는 page에서는 body로 fallback한다.
`portalMode="body"`를 명시한 경우에만 Dialog 경계 자동 탐색을 사용하지 않는다.

---

## 4. 레이아웃 스펙

### Field (전체 폼 필드 래퍼)

Label 행, Trigger, Help text 를 세로로 쌓는 최상위 컨테이너.
Select가 생성한 안정적인 ID로 보이는 Label은 trigger·검색 input의 `aria-labelledby`에,
Help/Error는 `aria-describedby`에 연결한다. 시각적 Label이 없는 조합은 `ariaLabel`을 전달한다.
열린 동안 trigger와 searchable input의 `aria-controls`는 같은 listbox ID를 가리킨다.

```
┌─ field (flex column, gap 4px, width 320px) ──────┐
│                                                    │
│  ┌─ labelRow (flex row, gap 2px) ───────────────┐ │
│  │ Label  (선택사항)  *  ⓘ                       │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌─ Trigger ─────────────────────────────  ▼ ──┐  │
│  │ 옵션을 골라주세요                           │  │
│  └─────────────────────────────────────────────┘  │
│                                                    │
│  Help text                                        │
│                                                    │
└────────────────────────────────────────────────────┘
```

| 항목                     | 값                                                       |
| ------------------------ | -------------------------------------------------------- |
| 배치                     | `flex`, `flex-direction: column`, `align-items: stretch` |
| gap (Label↔Trigger↔Help) | **4px**                                                  |
| width                    | standalone 기본 **320px** (`max-width: 100%`)            |

Create/Detail의 grid cell 또는 Filter Popover처럼 부모가 field 폭을 소유하는 조합에서는 Select root,
trigger와 option anchor가 `fullWidth` prop으로 `width: 100%; min-width: 0`을 적용해 그 cell을 채워야 한다. 320px은 standalone
기본값이지 page form의 고정 폭이 아니다. content panel은 기본 `contentWidth="trigger"`로 실제 trigger
폭을 이어받는다.

searchable Single은 선택된 option label을 `placeholder`에 넣지 않는다. 닫힌 상태의 input `value`로
표시하고, 선택값이 없을 때만 placeholder를 안내 문구로 사용한다.

### Label 행 (labelRow)

| 항목         | 값                                                                                    |
| ------------ | ------------------------------------------------------------------------------------- |
| 배치         | `flex`, `align-items: center`, `gap: 2px`                                             |
| Label 텍스트 | Title2 — Pretendard SemiBold **14px** / line-height 20px / `#1c1c1c` (`--text`)       |
| (선택사항)   | Body3 — Pretendard Regular **12px** / line-height 16px / `#757575` (`--text-subtler`) |
| required(\*) | Body2 — Pretendard Regular **14px** / line-height 20px / `#e81919` (`--text-danger`)  |
| info icon    | `Info` (lucide) **14px** / stroke 2 / `#757575` (`--icon-subtler`) / `flex-shrink: 0` |

> **중요**: Label 행의 gap 은 **2px** 이다. Label 텍스트, (선택사항), \*, info icon 이
> 각각 2px 간격으로 나란히 배치된다. Label 은 항상 SemiBold(600) 이다.

### Help text (하단 도움말)

| 항목          | 값                                                     |
| ------------- | ------------------------------------------------------ |
| font          | Body3 — Pretendard Regular **12px** / line-height 16px |
| 색상(정상)    | `#555555` (`--text-subtle`)                            |
| 색상(invalid) | `#d00a0a` (`--text-error`)                             |
| white-space   | `normal`; 긴 설명은 field 폭에서 줄바꿈                |
| overflow-wrap | `anywhere`                                             |

### Trigger (Single 모드)

| 항목          | 값                                                   |
| ------------- | ---------------------------------------------------- |
| 요소          | `<div role="combobox">` (PopoverTrigger asChild)     |
| 배치          | `flex`, `align-items: center`, `justify-between`     |
| 높이          | Small 28px / Medium 32px / Large 36px / X-Large 40px |
| 가로 패딩     | `pl 12px`, `pr 6px`                                  |
| border-radius | **4px**                                              |
| font          | Pretendard Regular 14px / line-height 20px           |
| 좌측          | 값 텍스트 / 플레이스홀더 / 검색 input (`flex: 1`)    |
| 우측          | chevron 아이콘 16px (`flex-shrink: 0`)               |

### Trigger (Multi 모드)

| 항목      | 값                                                                             |
| --------- | ------------------------------------------------------------------------------ |
| 높이      | `min-height` 로 전환(size 별 28/32/36/40px). chip 이 들어가므로 `height: auto` |
| 세로 패딩 | S: 4px / M: **5px** / L: **5px** / XL: 8px                                     |
| 가로 패딩 | `pl 12px`, `pr 6px`                                                            |
| 내부 구조 | `[chipContainer: chip chip ... +N] [검색 input] [✕ clear] [▼ chevron]`         |

### Chip (Multi 트리거 내)

| 항목          | 값                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Chip size     | Small/Medium Select → chip `small`(20px). Large/X-Large Select → chip `medium`(24px)                 |
| gap (chip 간) | **4px**                                                                                              |
| color/variant | `blue` / `subtle` — 배경 `var(--accent-50)` (`--element-primary-subtle`), 텍스트 `var(--accent-500)` (`--text-primary`) |
| shape         | `pill` (border-radius 10px)                                                                          |
| close button  | Chip 의 `onRemove` — 개별 chip 제거. 비활성 option 으로 선택된 값의 chip 에는 두지 않는다            |

### Overflow chip (+N)

참조 계약은 Select 내부의 `select-value-chips/SelectValueChips`가 칩과 `+N`의 숨겨진 측정 요소를 소유한다.
측정 요소는 `aria-hidden`/`inert`로 제외하며, 선택값·라벨·폰트·컨테이너 폭 변경 후 가시 개수를 다시 계산한다.
숨겨진 값도 선택 상태에는 남아 있고 드롭다운에서 확인·해제할 수 있다.

| 항목          | 값                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 표시 조건     | chip 이 container 너비를 넘칠 때                                                                                                |
| 높이          | 20px                                                                                                                            |
| 배경          | `var(--accent-50)` (`--element-primary-subtle`)                                                                                          |
| 텍스트        | `var(--accent-500)` (`--text-primary`), Title3(12px SemiBold)                                                                             |
| border-radius | 10px (pill)                                                                                                                     |
| 측정 방식     | ResizeObserver 로 숨겨진 측정용 chip 의 offsetWidth 를 구해 가시 개수 계산. "+N" chip 너비를 미리 빼고 남은 공간에 chip 을 채움 |

### Clear button (전체 지우기)

| 항목          | 값                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 표시 조건     | 제거할 수 있는 값(비활성 option 이 아닌 선택값)이 1개 이상이고 disabled/read-only 가 아닐 때. 누르면 비활성 option 의 선택값만 남긴다 |
| 크기          | **16×16px** (Search 컴포넌트의 close button 과 동일)                                                                                  |
| 배경          | `#555555` (`--icon-subtle`, gray-600) — 원형                                                                                          |
| 아이콘        | X 10px, stroke 2.5, 색상 `#ffffff` (`--icon-inverse`)                                                                                 |
| border-radius | 50% (원형)                                                                                                                            |
| hover         | opacity 0.8                                                                                                                           |
| active        | opacity 0.6                                                                                                                           |

### Chevron 아이콘

| 항목              | 값                                    |
| ----------------- | ------------------------------------- |
| 아이콘            | `ChevronDown` (lucide) 16px, stroke 2 |
| 색상              | `#1c1c1c` (`--icon`)                  |
| open 시           | `rotate(180deg)` transition 0.2s      |
| disabled/readonly | `#aaaaaa` (`--icon-disabled`)         |

### 드롭다운 Content (Menu 시각 공유)

| 항목          | 값                                                                               |
| ------------- | -------------------------------------------------------------------------------- |
| 최소 너비     | 140px                                                                            |
| 너비          | 트리거 너비에 맞춤 (`--radix-popper-anchor-width`)                               |
| border        | 1px `#dddddd` (`--border-default`)                                               |
| 배경          | `#ffffff` (`--menu-surface`)                                                     |
| box-shadow    | `--menu-shadow` (`0 4px 6px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)`) |
| border-radius | 4px                                                                              |
| padding       | `4px 0`                                                                          |
| 애니메이션    | fade + slide 6px, 0.15s ease. 방향별(`data-side`) keyframes                      |
| z-index       | 50                                                                               |

`contentWidth="content"`은 Pagination처럼 짧은 숫자 option을 고르는 경우에만 사용한다.
이때 패널은 트리거 폭 대신 가장 긴 option의 내용 폭으로 맞추며, 일반 Select의 기본값은
`trigger`를 유지한다.

### Option viewport 제한

`maxVisibleOptions`에 양의 정수를 전달하면 해당 개수만큼의 option 행 높이만 listbox에
보이고, 초과 option은 `ScrollArea`의 공용 overlay 세로 thumb로 제공한다. 기본값은 제한 없음이며,
native `overflow-y: auto` scrollbar를 직접 노출하지 않는다.
행 높이는 Select size를 따르며 small 28px, medium 32px, large/xlarge 36px이다.
높이 계산에는 실제 option 또는 empty/loading/error 안내 행만 포함한다. Multi의 “모두 선택” 행과
Divider는 계산 및 스크롤 대상에서 제외되므로 option 수가 제한 이하일 때 thumb가 생기지 않는다.
Create/Detail form의 page profile은 `maxVisibleOptions={6}`을 전달한다.

### Option Item (Menu 시각 공유)

| 항목                  | 값                                                                         |
| --------------------- | -------------------------------------------------------------------------- |
| 배치                  | `flex row`, `align-items: center`, `gap: 8px`                              |
| 가로 패딩             | `0 16px`                                                                   |
| 세로 패딩 / 최소 높이 | small: py 4px / 28px · medium: py 6px / 32px · large: py 8px / 36px        |
| font                  | Body2 (14px Regular / 20px)                                                |
| hover 배경            | `#f8f8f8` (`--menu-item-hovered`)                                          |
| pressed 배경          | `#f4f4f4` (`--menu-item-pressed`)                                          |
| 상태 전환             | `background-color`, `color` 0.2s ease. `transition: all` 금지              |
| focus(키보드)         | `inset 0 0 0 2px var(--border-primary)` box-shadow 링                      |
| selected 배경         | `var(--accent-50)` (`--menu-item-selected`), 텍스트 `var(--accent-500)` (`--text-primary`)    |
| disabled              | 텍스트 `#aaaaaa` (`--text-disabled`), 배경 transparent, cursor not-allowed |
| single selected 표시  | 우측 check 아이콘 16px (`--text-primary`)                                  |
| multi selected 표시   | 좌측 Checkbox(checked)                                                     |

### "모두 선택" 행 (Multi 모드)

공개 `showSelectAll?: boolean`의 기본값은 `true`다. 전체 선택/해제는 활성 옵션에만 적용하고,
이미 선택되어 있던 비활성 옵션은 보존한다. 활성 옵션이 하나도 없으면 이 행도 비활성화한다.

| 항목          | 값                                                                        |
| ------------- | ------------------------------------------------------------------------- |
| 위치          | 드롭다운 최상단 고정 영역. 아래 실제 option ScrollArea에 포함하지 않음    |
| 구조          | Checkbox(indeterminate 지원) + "모두 선택" 라벨                           |
| checkbox 상태 | 모두 미선택 → unchecked / 일부 선택 → indeterminate / 모두 선택 → checked |
| 하단          | Divider (1px `--border-subtle`, margin `2px 0`)                           |
| 표시 조건     | `multiple && showSelectAll && options.length > 0 && !loading && !error`   |

### Divider

| 항목   | 값                                               |
| ------ | ------------------------------------------------ |
| 높이   | 1px                                              |
| 배경   | `#eeeeee` (`--border-subtle`)                    |
| margin | `2px 0` (위아래 2px 여백 — Menu divider 와 동일) |

---

### 입력창 로딩 파츠

Trigger의 첫 자식은 `loading`일 때 공용 Spinner(`size="tiny"`)다. 그 뒤에 기존 placeholder, 검색 input 또는 Multi 칩을 유지한다. Spinner 의존성은 option leading과 trigger 양쪽에서 사용한다.
