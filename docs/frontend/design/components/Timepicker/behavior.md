# Timepicker — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Timepicker 문서 인덱스](./README.md)

## 5. Field: 정확한 기하와 상태

### 5.1 Field 기하

| 항목               | 정확한 값                                                              |
| ------------------ | ---------------------------------------------------------------------- |
| root width         | 365px; `max-width: 100%`; `min-width: 0`                               |
| root 내부 세로 gap | 4px                                                                    |
| field              | `width:100%`, `box-sizing:border-box`, `position:relative`, radius 4px |
| field padding      | left 12px, right 40px                                                  |
| field height       | 28 / 32 / 36 / 40px                                                    |
| 값 / placeholder   | Pretendard 400, 14px / 20px                                            |
| clock button       | medium 이상 24×24px, `right:3px`; small 20×20px, `right:5px`           |
| clock icon         | 16×16px; `color: inherit`                                              |
| range divider      | width 6px, height 1px                                                  |
| range item gap     | 정확히 6px                                                             |

공통 reset에 의존하지 말고 Timepicker 자체에 `box-sizing: border-box`를 지정한다. 이것이 focus/invalid 시 field 크기 변화와 아이콘 밀림을 막는 전제다.

```css
.timepickerRoot {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  width: 365px;
  max-width: 100%;
  min-width: 0;
  font-family: var(--font-sans);
}

.timeValue,
.rangeTime {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: var(--text-body2);
  color: var(--form-text);
}
.timeValue[data-empty="true"],
.rangeTime[data-empty="true"] {
  color: var(--form-placeholder-active);
}
.timeValue[data-disabled="true"],
.rangeTime[data-disabled="true"] {
  color: var(--text-disabled);
}
```

### 5.2 Range 레이아웃: 거리 벌어짐 방지

다음 선언은 필수다. `justify-content: space-between`, `flex: 1`, `margin-left: auto`, 전체 폭을 두 값에 균등 분배하는 grid는 금지다.

```css
.rangeInner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  flex: 1 1 auto;
  min-width: 0;
}

.rangeTime {
  display: block;
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rangeDivider {
  display: block;
  flex: 0 0 auto;
  width: 6px;
  height: 1px;
  background: var(--border-inverse);
}
```

따라서 빈 range는 `hh:mm - hh:mm`처럼 인접해야 한다. 아이콘은 absolute이므로 range text 폭 계산에 참여하지 않는다.

### 5.3 Field state CSS

아래 CSS는 CSS Modules, vanilla-extract, styled-components 어느 방식이든 같은 선언으로 옮긴다. `data-focused`는 popover가 열려 있는 동안 true다. invalid는 focus보다 우선한다.

```css
.timeField {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0 40px 0 12px;
  border: 1px solid var(--form-border-default);
  border-radius: 4px;
  outline: none;
  background: var(--form-surface-active);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.timeField[data-size="small"] {
  height: 28px;
}
.timeField[data-size="medium"] {
  height: 32px;
}
.timeField[data-size="large"] {
  height: 36px;
}
.timeField[data-size="xlarge"] {
  height: 40px;
}

.timeField[data-variant="create"] {
  border-color: transparent;
  background: var(--form-surface-inactive);
}

.timeField[data-focused="true"]:not([data-readonly="true"]):not(
    [data-disabled="true"]
  ),
.timeField:focus:not([data-readonly="true"]):not([data-disabled="true"]) {
  border-color: var(--form-border-active);
  box-shadow: inset 0 0 0 1px var(--form-border-active);
  background: var(--form-surface-active);
}

.timeField[data-invalid="true"]:not([data-disabled="true"]) {
  border-color: var(--form-border-invalid);
  box-shadow: inset 0 0 0 1px var(--form-border-invalid);
}

.timeField[data-disabled="true"],
.timeField[data-readonly="true"] {
  background: var(--form-surface-inactive);
  border-color: var(--form-border-default);
}

.timeField[data-disabled="true"] {
  cursor: not-allowed;
}
.timeField[data-readonly="true"] {
  cursor: default;
}

.clockButton {
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--icon);
  cursor: pointer;
}
.clockButton[data-size="small"] {
  width: 20px;
  height: 20px;
  right: 5px;
}
.clockButton:disabled {
  color: var(--icon-disabled);
  cursor: not-allowed;
}
```

중요: `.clockButton`의 right, width, transform은 focus/open 상태에서 절대로 바꾸지 않는다. focus 효과는 field 내부 inset shadow로만 처리한다.

## 8. State machine과 selected value 연결

### 8.1 공통 draft 원칙

popover를 열 때 committed value를 draft로 복사한다. 시간 option click은 draft만 변경한다. 취소, outside click, Escape는 draft를 버린다.

| type            | Now                            | 선택                                                  | 취소 / outside / Escape |
| --------------- | ------------------------------ | ----------------------------------------------------- | ----------------------- |
| Single          | 현재 시간을 draft에만 반영     | draft를 `onValueChange`로 commit 후 close             | draft discard           |
| Range 시작 단계 | 현재 시간을 start draft에 반영 | start draft를 유지하고 종료 단계로 전환, popover 유지 | 두 draft discard        |
| Range 종료 단계 | 현재 시간을 end draft에 반영   | start/end를 `onRangeChange`로 commit 후 close         | 두 draft discard        |

### 8.2 Range active phase

range의 blue 효과는 option뿐 아니라 field의 현재 편집 대상에도 적용한다.

```ts
const dialogValue =
  type === "single"
    ? draftStart
    : rangeActive === "start"
      ? draftStart
      : draftEnd;

const dialogHour = dialogValue?.hour;
const dialogMinute = dialogValue?.minute;
const dialogSecond = dialogValue?.second;
```

각 TimeColumn은 `selected={dialogHour}`, `selected={dialogMinute}`, `selected={dialogSecond}`를 받는다. 이 연결을 빠뜨리면 클릭해도 option의 blue selected effect가 나타나지 않는다.

field의 range text는 다음 조건으로만 blue다.

```tsx
<span className="rangeTime" data-active={open && rangeActive === 'start' || undefined}>
  {startDisplay || placeholder}
</span>
<span className="rangeDivider" aria-hidden />
<span className="rangeTime" data-active={open && rangeActive === 'end' || undefined}>
  {endDisplay || placeholder}
</span>
```

```css
.rangeTime[data-active="true"] {
  color: var(--text-primary);
}
```

첫 번째 선택 버튼을 눌렀을 때에는 `rangeActive = 'end'`만 수행하고 commit/close하지 않는다. 두 번째 선택 버튼에서만 range callback과 close를 수행한다.

### 8.3 Range order validation

자정을 넘는 range는 지원하지 않는다. 종료 시간이 시작 시간보다 작아지는 즉시, popover가 열려 있을 때에는 draft끼리, 닫혀 있을 때에는 committed value끼리 비교한다.

```ts
const RANGE_ORDER_ERROR = "종료 시간이 시작 시간보다 빠릅니다";

function isEndBeforeStart(
  start: TimeValue | null,
  end: TimeValue | null,
  withSecond: boolean,
) {
  if (!start || !end) return false;

  const toSeconds = (value: TimeValue) =>
    value.hour * 3600 +
    value.minute * 60 +
    (withSecond ? (value.second ?? 0) : 0);

  return toSeconds(end) < toSeconds(start);
}
```

자동 오류 시 별도의 `invalid` prop 없이도 다음을 적용한다.

- field `data-invalid="true"`와 `aria-invalid="true"`
- red 2px visual ring: light `#e81919`, dark `#f52424`
- `errorText`가 없으면 `종료 시간이 시작 시간보다 빠릅니다`
- 외부 `errorText`가 있으면 그 메시지가 자동 메시지보다 우선

