# Date Picker — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

Date Picker 내부에 아래 기능을 다시 만들지 않는다. 먼저 가이드라인과 구현을 확보한 뒤
그대로 조합한다.

| 의존성            | 가이드라인                                         | 구현 상태                      | Date Picker에서의 역할                                                         |
| ----------------- | -------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| **Input**         | [Input/README.md](../Input/README.md) ✅           | 참조 계약 · 매핑 확인 필요 ✅ → 재사용             | Single의 text input, label/help 스타일, Default/Create·size·focus/invalid 상태 |
| **Icon Button**   | [IconButton/README.md](../IconButton/README.md) ✅ | 참조 계약 · 매핑 확인 필요 ✅ → 재사용             | trailing `schedule` 버튼. Ghost variant, disabled/focus/아이콘 색상 처리       |
| **Icon**          | [Icon/README.md](../Icon/README.md) ✅             | Icon Button을 통해 간접 재사용 | `schedule` 시스템 아이콘 렌더                                                  |
| **Calendar**      | [Calendar/README.md](../Calendar/README.md) ✅     | 참조 계약 · 매핑 확인 필요 ✅ → 재사용             | Single/Range 날짜 선택, month/year navigation, date range 동작                 |
| **Radix Popover** | 외부 패키지 `radix-ui`                             | 설치됨 ✅                      | Calendar portal, 충돌 회피, outside click/Escape dismiss                       |
| **ScrollArea**    | [Scrollbar/README.md](../Scrollbar/README.md)      | 참조 계약 · 매핑 확인 필요 → 재사용                | 가용 높이를 넘는 Calendar의 overlay 스크롤                                     |

Calendar의 Header, 날짜 grid, 공휴일 계산은 Date Picker가 소유하지 않는다. `Calendar`의
`mode`, selection 값, callback만 전달한다.

Input wrapper는 Popover Anchor, schedule IconButton은 `Popover.Trigger asChild`로 조합한다.
Trigger가 popup ID·확장 상태·포커스 복원을 연결하며, Content에는 공용 floating layer(50)를 적용한다.
body Portal을 유지해 Dialog/ScrollArea의 overflow로 캘린더가 잘리지 않게 한다. page별 z-index prop은 추가하지 않는다.
Content의 Radix Presence가 닫힘 애니메이션 종료까지 DOM을 유지하며, 닫히는 Content는 `inert`로 중복 입력을 차단한다.
팝업 모션과 그림자는 DatePicker에서 소유하고, Calendar의 독립 사용 스타일이나 공개 Props는 변경하지 않는다.
Calendar는 padding 0의 공용 ScrollArea로 감싼다. Content와 실제 scroll container의 최대 높이를
`--radix-popover-content-available-height`로 제한하며, 별도 viewport 측정 상태는 만들지 않는다.

## 3. 구조 (Anatomy)

```
Date Picker Field
├── Label row (선택)
│   ├── Label
│   ├── (선택사항)
│   └── * required mark
├── Input area
│   ├── Single
│   │   ├── Input (text / pattern=YYYY.MM.DD)
│   │   └── Icon Button — schedule, Calendar를 여는 유일한 trigger
│   └── Range
│       ├── start native input (88px)
│       ├── divider (6×1px)
│       ├── end native input (88px)
│       └── Icon Button — schedule
├── Popover (portal)
│   └── ScrollArea (가용 높이 초과 시 스크롤)
│       └── Calendar (mode=single | range)
└── Help text 또는 Error text
```

## 4. API와 값 모델

현재 Single 구현의 `selectionUnit?: CalendarProps["selectionUnit"]`는 `day`(기본) 또는
`month`다. 타입과 선택 의미는 공용 Calendar가 소유한다. 월 선택 결과도 `{ year, month, day: 1 }`이며
입력 text는 `YYYY.MM.01`이다. 직접 입력은 기존 `YYYY.MM.DD` 형식과 검증을 유지한다.
유효한 입력값의 연도/월을 Calendar의 `initialMonth`로 전달하고, 비어 있거나 잘못된 값은 오늘을 기준으로 연다.
아래 Range 관련 항목은 재현 설계 계약이며 현재 Single 제품 API에 자동으로 노출되지 않는다.

휴일 관련 Props는 `CalendarProps`의 indexed access type을 사용한다. `holidayCountry`,
`highlightSundays`, `holidays`는 솔루션의 locale/calendar 정책 adapter가 결정해 전달한다.
공통 계약은 국가나 일요일 강조의 기본값을 정하지 않는다. 자동 공휴일을 사용하지 않는 정책은
`holidayCountry={null}`, 일요일을 강조하지 않는 정책은 `highlightSundays={false}`를 명시한다.
`holidays`는 수동 추가 날짜다. 국가 null은 자동 계산만 끄며 일요일은 별도 옵션으로 제어한다.
휴일 계산·중복 제거·가변 주 수는 Calendar가 소유한다.

```ts
type CalDate = { year: number; month: number; day: number };
// month는 Calendar와 동일하게 0부터 시작한다. 예: 7월은 month: 6

type DatePickerType = "single" | "range";
type DatePickerSize = "small" | "medium" | "large" | "xlarge";
type DatePickerVariant = "default" | "create";
```

| prop                                                                                | 역할                                                                     |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `type`                                                                              | `single`(기본) 또는 `range`                                              |
| `value` / `defaultValue` / `onValueChange`                                          | Single controlled/uncontrolled 값                                        |
| `rangeStart`, `rangeEnd` / `defaultRangeStart`, `defaultRangeEnd` / `onRangeChange` | Range controlled/uncontrolled 값                                         |
| `size`                                                                              | `small` 28, `medium` 32(기본), `large` 36, `xlarge` 40px                 |
| `variant`                                                                           | `default`(outlined) 또는 `create`(filled)                                |
| `label`, `optional`, `required`, `helpText`, `errorText`, `invalid`                 | field label 및 상태 표시                                                 |
| `disabled`, `readOnly`                                                              | 상호작용을 막는 상태. read-only도 calendar 버튼은 실제 disabled          |
| `holidays`, `holidayCountry`, `highlightSundays`                                    | Single 참조 API. 솔루션 locale/calendar 정책 입력을 Calendar에 위임 |
| `today`, `disabledDates`                                                            | Calendar 자체에서 지원하는 옵션. DatePicker 전달 API는 후속 재현 범위    |

`placeholder`와 `pattern` prop은 노출하지 않는다. 구현은 항상 다음 두 값을 input spread **뒤에**
설정하여 런타임 override도 막는다.

```ts
const DATE_PLACEHOLDER = "YYYY.MM.DD";
const DATE_INPUT_PATTERN = "\\d{4}\\.\\d{2}\\.\\d{2}";
```

제품 JSX에는 `pattern={DATE_INPUT_PATTERN}` 또는 같은 JavaScript 문자열 표현식을 사용한다.
추출 참조 source는 DatePicker 전용 `lib/date-picker-value.ts`의 정규식에서 `.source`를 가져와
native pattern과 내부 파서의 형식 규칙을 한 곳에서 관리한다. 이 helper는 public export가 아니다.
JSX 따옴표 속성은 JavaScript 문자열처럼 백슬래시를 해석하지 않으므로, 위 문자열의 이중
백슬래시를 `pattern="..."` 속성에 그대로 복사하면 정상 날짜도 native `patternMismatch`가 된다.
현재 DOM에 전달되는 패턴은 `^(\d{4})\.(\d{2})\.(\d{2})$`이며, `noValidate`로 형식 검사를 우회하지 않는다.

## 5. 레이아웃 스펙

### 공통 field

| 항목               | 값                                   |
| ------------------ | ------------------------------------ |
| root               | `width: 100%`, 세로 flex, `gap: 4px` |
| Label row          | 가로 flex, wrap 가능, `gap: 2px`     |
| Label ↔ input      | 4px                                  |
| input ↔ Help/Error | 4px                                  |
| radius             | 4px                                  |
| 기본 가로 padding  | 12px                                 |

### Single

| 항목                    | 값                                                                     |
| ----------------------- | ---------------------------------------------------------------------- |
| input 너비              | 부모 너비 100%                                                         |
| trailing icon 공간      | input `padding-right: 40px`                                            |
| Medium 이상 Icon Button | Ghost, **24×24px**, 우측 3px                                           |
| Small Icon Button       | Ghost, **20×20px**, 우측 5px, 내부 icon은 **16×16px** (`iconSize="m"`) |
| Calendar Popover        | trigger 하단 시작 정렬, `sideOffset: 8px`, `collisionPadding: 12px`    |

### Range

| 항목                | 값                                                         |
| ------------------- | ---------------------------------------------------------- |
| container           | 너비 100%, `display:flex`, 세로 중앙, `position:relative`  |
| container padding   | 좌 12px / 우 36px                                          |
| 날짜 input          | 각각 **88px 고정** (`flex: 0 0 88px`), padding/border 없음 |
| 날짜 input 사이 gap | 6px                                                        |
| divider             | **6×1px**, gap 양쪽에 포함                                 |
| calendar button     | Single과 같은 size/offset 규칙, 절대 배치                  |

> Range의 두 input을 `flex: 1`로 두면 양 끝으로 벌어져 Figma와 달라진다. 날짜 문자열 폭을
> 보장하는 88px 고정 영역 + 6px divider 조합을 유지한다.

### Height

| size   | field height | calendar button | calendar icon |
| ------ | -----------: | --------------: | ------------: |
| small  |         28px |            20px |          16px |
| medium |         32px |            24px |          16px |
| large  |         36px |            24px |          16px |
| xlarge |         40px |            24px |          16px |
