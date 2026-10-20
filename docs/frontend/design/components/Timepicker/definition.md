# Timepicker — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Timepicker 문서 인덱스](./README.md)

## 2. 의존성 컴포넌트와 소유권

Timepicker는 아래 공용 컴포넌트를 조합한다. 같은 기능의 SVG, 버튼, 스크롤바, label CSS를 Timepicker 안에서 새로 만들지 않는다.

| 의존성                                   | Timepicker에서 사용하는 정확한 계약                                             | Timepicker가 직접 소유하는 부분                             |
| ---------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Input](../Input/README.md)                      | label, optional, required mark, help text의 공용 스타일                         | time field trigger, range 값 배치, 오류 표시 조건           |
| [Icon](../Icon/README.md)                        | `clock` system icon, size `m`(16px)                                             | 아이콘 버튼의 위치·disabled state                           |
| [Button](../Button/README.md)                    | 취소: `tertiary`, `medium`; 선택: `primary`, `medium`                           | footer 배치와 클릭 흐름                                     |
| [Text Button](../TextButton/README.md)           | Now: `medium`, border 없음                                                      | Now의 primary text 색과 현재 draft 반영                     |
| [Scrollbar & ScrollArea](../Scrollbar/README.md) | `type="auto"`, `orientation="vertical"`, overlay thumb                          | Timepicker 열에 한정한 wrapper chrome/content padding reset |
| Radix Popover                            | `Root`, `Anchor`, `Portal`, `Content`; outside click/Escape/presence/data-state | draft discard, positioning, event propagation 차단          |

### 재구현 금지

- clock을 직접 SVG/lucide import로 만들지 말고 항상 `Icon name="clock" size="m"`을 사용한다. 기존 `schedule` icon은 CalendarClock 용도이므로 대체하면 안 된다.
- Now를 outline/tertiary Button으로 만들지 않는다. 공용 TextButton을 사용한다.
- 취소/선택 버튼의 border, 색상, hover, focus CSS를 Timepicker에 복사하지 않는다.
- browser native scrollbar 또는 새 thumb를 만들지 않는다. 공용 ScrollArea만 사용한다.
- Timepicker 열의 모양을 맞추기 위해 공용 ScrollArea 파일을 수정하지 않는다. 아래의 local reset만 해당 인스턴스에 적용한다.

## 3. 고정 DOM 구조

아래 계층과 경계가 시각적 스펙의 일부다. 특히 `dialogBody`와 `dialogFooter`는 형제가 되어야 하며, bottom border는 `dialogBody`에 있어야 한다.

```
TimepickerRoot (365px max-width:100%)
├── Label row                         ← Input 공용 스타일
├── Field / Popover Anchor             ← role=combobox
│   ├── Single: time text
│   ├── Range: start text + divider + end text
│   └── Clock native button            ← absolute, field 오른쪽
├── Popover Portal
│   └── Popover Content (240px)
│       ├── dialogBody (height 302px; border-bottom 1px)
│       │   ├── timeColumn > ScrollArea > hour options
│       │   ├── timeColumn > ScrollArea > minute options
│       │   └── timeColumn > ScrollArea > second options (second=true)
│       └── dialogFooter (height 44px)
│           ├── TextButton medium: Now
│           └── button group
│               ├── Button tertiary medium: 취소
│               └── Button primary medium: 선택
└── Help text 또는 Error text
```

`Popover.Content`를 `open && ...`처럼 외부 조건으로 감싸서 즉시 unmount하지 않는다. Radix Content가 `data-state="closed"` 상태를 유지해 close animation을 끝낼 수 있어야 한다. 별도 presence 라이브러리를 쓴다면 animation 종료 뒤에만 unmount한다.

## 4. API와 값 모델

```ts
export interface TimeValue {
  hour: number; // 0–23
  minute: number; // 0–59
  second?: number; // second=true일 때만 표시·비교
}

type TimepickerType = "single" | "range";
type TimepickerSize = "small" | "medium" | "large" | "xlarge";
type TimepickerVariant = "default" | "create";
```

| prop                                                                  | 규칙                                                                 |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                                | `single` 기본값, 또는 `range`                                        |
| `second`                                                              | 기본 `false`. true면 HH:MM:SS와 세 번째 열(00–59)을 사용             |
| `size`                                                                | `small` 28, `medium` 32, `large` 36, `xlarge` 40px. 기본 medium      |
| `variant`                                                             | `default` outlined, `create` inactive surface + transparent border   |
| `value/defaultValue/onValueChange`                                    | single controlled/uncontrolled                                       |
| `rangeStart/rangeEnd/defaultRangeStart/defaultRangeEnd/onRangeChange` | range controlled/uncontrolled                                        |
| `label/optional/required/helpText`                                    | Input 공용 label/help 영역                                           |
| `invalid/errorText`                                                   | 외부 invalid. `errorText`는 external invalid 상태에서 help 대신 출력 |
| `disabled/readOnly`                                                   | 모두 popover open을 막는다. readOnly 값은 enabled 색으로 유지        |
| `placeholder`                                                         | 기본 `hh:mm`, second=true이면 `hh:mm:ss`                             |

시간은 field에 타이핑하지 않는다. field는 native input이 아니라 Popover anchor 역할의 `div[role="combobox"]`다.

## 6. Popover, body, 열, footer의 픽셀 계약

### 6.1 위치와 panel

| 항목                   | 값                                                       |
| ---------------------- | -------------------------------------------------------- |
| portal                 | Popover Portal 사용                                      |
| placement              | `side="bottom"`, `align="start"`                         |
| trigger와 panel gap    | `sideOffset={8}`                                         |
| viewport 충돌 여백     | `collisionPadding={12}`                                  |
| z-index                | 50                                                       |
| panel width            | 240px; max-width 240px                                   |
| panel radius           | 8px                                                      |
| panel padding block    | 4px                                                      |
| panel inner gap        | 8px                                                      |
| panel surface / border | `#ffffff`, 1px solid `#dddddd`                           |
| panel shadow           | `0 4px 6px rgba(9,30,66,.15), 0 0 1px rgba(9,30,66,.31)` |

### 6.2 body bottom border와 footer

시간 선택 영역 아래의 선은 다음처럼 정확히 구현한다. footer에 `border-top`만 두면 padding/gap 조건에 따라 선 위치가 달라질 수 있으므로 이 선언을 `dialogBody`에 둔다.

```css
.timeDialog {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 240px;
  max-width: 240px;
  box-sizing: border-box;
  padding-block: 4px;
  overflow: clip;
  border: 1px solid var(--border-default);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--cal-shadow);
  z-index: 50;
}

.dialogBody {
  display: flex;
  width: 100%;
  height: 302px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid var(--border-default);
}

.dialogFooter {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding-inline: 16px;
  padding-bottom: 12px;
}

.footerButtonGroup {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### 6.3 열과 ScrollArea

- `second=true`: body의 세 열은 `flex: 1 0 0`으로 같은 폭이다. 240px에서 각각 80px이다.
- `second=false`: 시/분 두 열도 같은 방식으로 body 전체를 동등하게 나눈다. 각 열을 80px로 고정하지 않는다.
- 각 열은 양옆 4px padding을 가진다.
- 마지막 열을 제외하고 `border-right: 1px solid var(--border-default)`를 둔다.
- option은 `width:100%; height:40px; padding-inline:16px; border-radius:4px`다.
- ScrollArea wrapper에는 outer border/radius/background가 없어야 한다. ScrollArea 내부 content의 기본 16px padding도 반드시 0으로 reset한다.

```css
.timeColumn {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  height: 100%;
  box-sizing: border-box;
  padding-inline: 4px;
}
.timeColumn:not(:last-child) {
  border-right: 1px solid var(--border-default);
}

/* 공용 ScrollArea source는 수정하지 않고 이 인스턴스에만 적용한다. */
.timeColumn .scrollAreaRoot {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
}
.timeColumn .scrollAreaContent,
.timeColumn .scrollAreaRoot > div > .scrollAreaContent {
  padding: 0;
}
```

프로젝트의 ScrollArea DOM이 다른 경우에도 위 reset의 의미는 동일하다. root card chrome과 실제 content padding 양쪽을 target으로 잡는다. 단, scroll container와 overlay thumb의 구조·동작은 공용 ScrollArea를 그대로 사용한다.

### 6.4 option: blue selected effect의 단일 진실

선택 효과는 hover, active, `aria-selected`만으로 우연히 나오게 두지 않는다. button에 아래의 두 속성을 모두 넣고, CSS는 `data-selected`로 제어한다.

```tsx
const isSelected = value === selected

<button
  type="button"
  role="option"
  aria-selected={isSelected}
  data-selected={isSelected || undefined}
  className="timeOption"
  onClick={() => onSelect(value)}
>
  {String(value).padStart(2, '0')}
</button>
```

```css
.timeOption {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding-inline: 16px;
  border: 0;
  border-radius: 4px;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: var(--text-body1);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}
.timeOption:hover {
  background: var(--surface-hover);
}
.timeOption:focus-visible {
  box-shadow: inset 0 0 0 2px var(--border-primary);
}
.timeOption[data-selected="true"],
.timeOption[data-selected="true"]:hover {
  background: var(--surface-primary-subtle);
  color: var(--text-primary);
}
.timeOption:active {
  background: var(--surface-pressed);
}
```

light의 selected 값은 반드시 background `var(--accent-50)`, text `var(--accent-500)`다. hover 중에도 selected blue를 유지하며, 누르고 있는 순간에는 pressed gray가 보이고 mouse/key release 뒤에는 즉시 selected blue로 돌아간다.

## 7. Popover animation: mount와 CSS를 함께 적용

`data-state`는 Radix Popover Content가 제공한다. 클래스만 선언하고 Content를 수동으로 즉시 unmount하면 close animation은 보이지 않는다.

```css
@keyframes timepicker-dialog-in {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes timepicker-dialog-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-2px);
  }
}

.timeDialog[data-state="open"] {
  animation: timepicker-dialog-in 150ms ease-out;
}

.timeDialog[data-state="closed"] {
  animation: timepicker-dialog-out 150ms ease-in;
}

@media (prefers-reduced-motion: reduce) {
  .timeDialog[data-state="open"],
  .timeDialog[data-state="closed"] {
    animation-duration: 0.01ms;
  }
}
```

다음은 Popover 연결에서 생략하면 안 되는 부분이다.

```tsx
<Popover.Root open={open} onOpenChange={handleOpenChange}>
  <Popover.Anchor asChild>
    <div
      className="timeField"
      data-focused={open || undefined}
      role="combobox"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={openDialog}
      onKeyDown={handleFieldKeyDown}
    >
      {/* 시간 text와 absolute clock button */}
    </div>
  </Popover.Anchor>

  <Popover.Portal>
    <Popover.Content
      className="timeDialog"
      side="bottom"
      align="start"
      sideOffset={8}
      collisionPadding={12}
      onOpenAutoFocus={(event) => event.preventDefault()}
      onClick={(event) => event.stopPropagation()}
    >
      {/* dialogBody 다음에 dialogFooter */}
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
```

`onClick.stopPropagation()`은 portal 내 option/footer click이 React tree를 따라 anchor로 전달되어 popover가 다시 열리는 현상을 막는다.

