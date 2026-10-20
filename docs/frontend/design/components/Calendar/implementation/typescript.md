# Calendar — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](../README.md)

## 구현 내용

현재 구현은 `Calendar.tsx`가 Props와 내부 view/cursor를 소유한다. `selectionUnit="month"`인
Single은 day view를 month로 해석하고, 헤더는 month/year만 순환한다. 월 선택은 `day: 1`의
`CalDate`를 반환한다. 월/연도 셀의 label/current 같은 표시 정보는 callback으로 넘기지 않는다.
DatePicker는 이 public prop 타입을 참조하며, 일정 데이터나 page view는 Calendar로 가져오지 않는다.

### 12-2. Calendar.tsx (핵심 구조)

> 헤더의 chevron-down 아이콘은 별도 SVG 컴포넌트 없이 공용 Icon 컴포넌트의
> `triangle_down`(`iconMap` 매핑)을 TextButton 의 `trailingIcon` prop 으로 전달한다.
> CalendarIcons.tsx 같은 별도 아이콘 파일을 만들지 않는다.

```tsx
import * as React from 'react'
import { cn } from '@design/cn'
import { Button } from '.../Button'           // 의존: 공용 Button
import { IconButton } from '.../IconButton'   // 의존: 공용 IconButton
import { TextButton } from '.../TextButton'   // 의존: 공용 TextButton (Icon 을 내부 사용)
import { getCalendarHolidayKeys } from '../../../lib/calendar-holidays'
// ... CSS imports ...

export type CalendarView = 'day' | 'month' | 'year'
export type CalendarMode = 'single' | 'range'

export interface CalendarProps {
  view?: CalendarView
  mode?: CalendarMode
  selectionUnit?: 'day' | 'month' // single의 month는 월 1일 확정; range는 일자 유지
  selected?: CalDate | null
  rangeStart?: CalDate | null
  rangeEnd?: CalDate | null
  today?: CalDate
  initialMonth?: { year: number; month: number }
  showFooter?: boolean
  disabledDates?: CalDate[]
  holidays?: CalDate[]
  highlightSundays?: boolean
  holidayCountry?: 'KR' | 'US' | 'JP' | 'CN' | null
  onSelect?: (date: CalDate) => void
  onRangeChange?: (start: CalDate | null, end: CalDate | null) => void
  onConfirm?: () => void
  onCancel?: () => void
  className?: string
}

export function Calendar({ /* ...props */ }: CalendarProps) {
  // 내부 상태: view, cursor(월), yearStart(12년 그리드), pendingStart(range), hoverDate(preview)
  // getRangeState(): range-start/range-middle/range-end/null 반환
  // isHoliday(): holidays + holidayCountry 자동 계산 + highlightSundays(Date.getDay)
  // 날짜 grid: ceil((월 첫 요일 + 월 일수) / 7)주만 생성

  return (
    <div className={cn(calendar, className)}>
      {/* Header — TextButton + IconButton × 2 */}
      <div className={header}>
        <TextButton
          size="large"
          className={headerLabel}
          trailingIcon="triangle_down"  // 공용 Icon 컴포넌트 (별도 SVG 아님)
          onClick={cycleView}
        >
          {headerText}
        </TextButton>
        <div className={headerNav}>
          <IconButton icon="chevron_left" size="xlarge" variant="ghost" onClick={goPrev} />
          <IconButton icon="chevron_right" size="xlarge" variant="ghost" onClick={goNext} />
        </div>
      </div>

      <div className={divider} />

      {/* Body — view 분기 */}
      {view === 'day' && <DayView ... />}
      {view === 'month' && <MonthYearView ... />}
      {view === 'year' && <MonthYearView ... />}

      {/* Footer — Button × 2 (의존: 공용 Button) */}
      {showFooter && (
        <div className={footer}>
          <Button variant="tertiary" size="medium" onClick={onCancel}>취소</Button>
          <Button variant="primary" size="medium" onClick={onConfirm}>선택</Button>
        </div>
      )}
    </div>
  )
}
```

### 12-3. core/lib/calendar-holidays.ts (공휴일 자동 계산)

```ts
// Calendar와 스케줄 본문이 공유하는 순수 helper. month는 CalDate와 동일한 0 기반이다.
export function getCalendarHolidayKeys(year: number, country: string): Set<string>;
```

국가 union/Props는 `Calendar.tsx`가 소유한다. helper는 `date-holidays`의 public/bank 기록을
인접 연도까지 읽고, 현지 날짜 문자열·기간을 `year-month-day` key로 정규화한다.
설날의 3일 시작점만 보정하며 추석/대체공휴일을 중복 확장하지 않는다.
Calendar는 표시 연도·국가·day view를 기준으로 memo하고 수동 holidays 및 일요일과 합쳐 표시한다.
helper는 page/domain이나 Calendar 타입을 역참조하지 않는다. 스케줄 본문도 같은 함수를 사용하고,
연도를 걸친 grid에서는 양쪽 연도의 key를 합쳐 표시한다.

### 12-4. dateUtils.ts (순수 날짜 계산, 의존성 없음)

주요 함수:

- `getMonthMatrix(year, month)` — 필요한 4~6주 × 7열 행렬, null 포함 (일요일 시작)
- `getYearMatrix(startYear)` — 4×3 행렬 (12년)
- `isSameDay(a, b)`, `isInRange(target, start, end)`, `isBefore(a, b)`
- `formatMonthHeaderLabel(year, month)` → `"2025년 1월"`
- `formatYearRangeLabel(startYear)` → `"2007년 - 2026년"`

---
