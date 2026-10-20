# Date Picker — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)

## 11. 핵심 구현 코드

아래 로직은 Input/IconButton/Calendar를 조합할 때 반드시 유지한다.

추출 참조 source는 Calendar의 `selectionUnit` 타입을 참조한다. `selected = parseDate(text)`를 계산해
`<Calendar key={selectionUnit} selectionUnit={selectionUnit} initialMonth={selected ?? undefined}
selected={selected} onSelect={selectDate} />`로 조합한다. 선택 단위가 바뀌면 팝업의 view만 새로 시작하며
월/연도 탐색 로직은 DatePicker에 복제하지 않는다. `selectDate`는 기존 callback·포맷·닫기를 재사용한다.

추가로 솔루션 locale/calendar 정책 adapter의 `holidays`, `holidayCountry`, `highlightSundays`를
Calendar에 전달한다. 공통 기본 국가나 일요일 강조를 만들지 않는다. 해당 Props는 Input에 spread하지
않는다. 아래 예시의 `calendarPolicy`는 소비 솔루션이 명시적으로 제공하는 입력이다.

Content의 `data-state`/`data-side`를 CSS keyframe과 연결한다. 닫힘 애니메이션이 끝날 때까지
Radix Presence가 유지하므로 `{open && <Content />}`로 조기 제거하지 않는다. 닫히는 동안에는
`inert={!open}`으로 입력을 차단한다. 기존 Portal·충돌 회피·Trigger의 포커스 복원은 유지한다.

```tsx
import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Input } from "./Input";
import { IconButton } from "./IconButton";
import { Calendar } from "./Calendar";
import { ScrollArea } from "./ScrollArea";
import { calendarPopover, calendarScrollArea, calendarScrollContent } from "./DatePicker.css";

type CalDate = { year: number; month: number; day: number };
type CalendarPolicy = {
  holidayCountry: React.ComponentProps<typeof Calendar>["holidayCountry"];
  highlightSundays: boolean;
  holidays?: React.ComponentProps<typeof Calendar>["holidays"];
};

const DATE_PLACEHOLDER = "YYYY.MM.DD";
const DATE_INPUT_PATTERN = "\\d{4}\\.\\d{2}\\.\\d{2}";
const DATE_VALIDATION_ERROR = "올바른 날짜 형식으로 입력하세요.";

function formatDate(date: CalDate | null): string {
  if (!date) return "";
  return `${date.year}.${String(date.month + 1).padStart(2, "0")}.${String(date.day).padStart(2, "0")}`;
}

function parseDate(value: string): CalDate | null {
  const match = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const candidate = new Date(year, month, day);
  return candidate.getFullYear() === year &&
    candidate.getMonth() === month &&
    candidate.getDate() === day
    ? { year, month, day }
    : null;
}

function isDateValidationReady(value: string): boolean {
  const normalized = value.trim();
  const digitCount = normalized.replace(/\D/g, "").length;
  return digitCount >= 8 || normalized.length >= DATE_PLACEHOLDER.length;
}

// Single 입력의 핵심. Range도 start/end 별로 같은 상태와 로직을 갖는다.
function SingleDateInput({
  calendarPolicy,
  disabled = false,
  readOnly = false,
}: {
  calendarPolicy: CalendarPolicy;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const [text, setText] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const interactionDisabled = disabled || readOnly;

  const onChange = (nextText: string) => {
    setText(nextText);
    if (!nextText.trim()) {
      setInvalid(false);
      return;
    }
    const parsed = parseDate(nextText);
    setInvalid(isDateValidationReady(nextText) && !parsed);
    // parsed일 때만 parent value를 commit한다. 미완성 "...2"를 "...02"로 바꾸지 않는다.
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Anchor asChild>
        <div className="date-picker-input-wrap">
          <Input
            type="text"
            pattern={DATE_INPUT_PATTERN}
            value={text}
            placeholder={DATE_PLACEHOLDER}
            inputMode="numeric"
            autoComplete="off"
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={invalid || undefined}
            onChange={(event) => onChange(event.target.value)}
          />
          <PopoverPrimitive.Trigger asChild>
            <IconButton
              icon="schedule"
              size="medium"
              variant="ghost"
              aria-label="달력에서 날짜 선택"
              disabled={interactionDisabled}
            />
          </PopoverPrimitive.Trigger>
        </div>
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={calendarPopover}
          inert={!open}
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
        >
          <ScrollArea
            className={calendarScrollArea}
            contentClassName={calendarScrollContent}
            type="auto"
          >
            <Calendar
              mode="single"
              holidayCountry={calendarPolicy.holidayCountry}
              highlightSundays={calendarPolicy.highlightSundays}
              holidays={calendarPolicy.holidays}
              onSelect={(date: CalDate | null) => {
                setText(formatDate(date));
                setInvalid(false);
                setOpen(false);
              }}
            />
          </ScrollArea>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
      {invalid && (
        <p role="alert" className="date-picker-error">
          {DATE_VALIDATION_ERROR}
        </p>
      )}
    </PopoverPrimitive.Root>
  );
}
```

Range는 위 `Input`을 두 개로 분리하고 start/end text·invalid state를 각각 관리한다. 각 input에
같은 `pattern`, `placeholder`, `onChange` 검증을 적용하고 `Calendar mode="range"`의
`onRangeChange(start, end)`에서 두 text를 갱신한다.
