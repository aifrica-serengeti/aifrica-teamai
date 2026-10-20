# Calendar — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](./README.md)

## 7. 상태

### Date 셀 상태 전이

| 상태           | data-state     | 시각                                        |
| -------------- | -------------- | ------------------------------------------- |
| Default        | `default`      | 투명 원, 기본 텍스트                        |
| Current (오늘) | `current`      | 투명 원, primary 텍스트 + SemiBold + 4px 점 |
| Selected       | `selected`     | 파란 원 + 흰 글씨                           |
| Range-start    | `range-start`  | 파란 원 + 흰 글씨 + 우측 절반 range fill    |
| Range-end      | `range-end`    | 파란 원 + 흰 글씨 + 좌측 절반 range fill    |
| Range-middle   | `range-middle` | 투명 원 + 기본 텍스트 + 셀 전체 range fill  |

### Range preview (hover)

range 모드에서 첫 날짜 선택 후 다른 날짜에 hover 시 미리보기:

- 시작 날짜 → `range-start` (파란 원 + 우측 fill)
- hover 날짜 → `range-end` (파란 원 + 좌측 fill)
- 사이 구간 → `range-middle` (range fill 배경)
- 마우스가 grid 를 벗어나면 preview 해제

> hover 방향에 따라 시작/끝이 동적 할당된다:
>
> - hover 가 뒤(미래): `pendingStart`=시작, `hoverDate`=끝
> - hover 가 앞(과거): `hoverDate`=시작, `pendingStart`=끝

### View 전환

Day view는 날짜가 존재하는 주만 렌더한다. 4/5/6주 월 사이 이동 시 마지막 날짜까지 보이면서
완전히 빈 주가 남지 않아야 한다. 날짜·범위 선택 및 월 단일 선택 callback은 변경하지 않는다.

기본 헤더 TextButton 클릭 시: `day → month → year → day` 순환.

Single + `selectionUnit="month"`에서는 `month ↔ year`만 전환한다. 연도 선택은 월 목록으로
돌아가며 값을 확정하지 않는다. 월 선택은 일자 화면으로 내려가지 않고 해당 월 1일을 즉시 반환한다.
`disabledDates`에 해당 월 1일이 있으면 월 버튼을 비활성화한다. Range 동작은 변경하지 않는다.

월/연도 셀의 라벨은 한 줄로 유지한다. 기본 선택에서는 연도 → 월 → 날짜 순으로 내려가며,
라벨 줄바꿈을 방지하기 위한 여백 조정은 선택 값이나 view 전환에 영향을 주지 않는다.

### prev/next 이동

| View  | 이동 단위 |
| ----- | --------- |
| Day   | 1개월     |
| Month | 1년       |
| Year  | 12년      |

### Disabled

`disabledDates` prop 으로 비활성화할 날짜 배열 전달. 해당 날짜는:

- `disabled` 속성으로 클릭 차단
- `--text-disabled` 색상으로 표시
- hover/pressed 배경 미적용

### Holiday (휴일)

| Prop               | 동작                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| `holidays`         | 수동 공휴일 날짜 배열. 해당 날짜 텍스트 `--text-danger`                                |
| `highlightSundays` | true 시 `Date.getDay()`로 일요일 감지. 날짜 + 요일 헤더 "일" 라벨도 `--text-danger` |
| `holidayCountry`   | `KR`/`US`/`JP`/`CN` 지정 시 `date-holidays` 로 자동 계산. cursor 연도 ± 1년 범위       |

> selected/range-start/range-end/range-middle 상태에서는 원형 배경이 우선하여
> 휴일 색상이 적용되지 않는다.

#### 선택 기능: 한국 정책을 채택한 경우의 설날/추석 연휴 보정

`calendar-holidays` 참조 helper는 설치된 `date-holidays@3.34.1`의 public/bank 항목을 날짜 key로 변환한다.
날짜 선택기와 스케줄 본문이 동일한 순수 계산을 공유하며 표시 상태·API 조회는 각 호출부가 소유한다.
설날 `korean 01-0-01 P3D`는 당일을 시작으로 반환하므로 시작을 하루 앞당겨 전날·당일·다음날을
표시한다. 추석 `korean 8-0-14 P3D`는 이미 전날 시작이므로 반환 기간만 확장한다.
대체공휴일은 별도 규칙을 그대로 사용하며 중복 날짜는 Set으로 제거한다.
국가/표시 연도가 바뀌면 재계산하고, 인접 연도까지 조회한 뒤 표시 연도에 해당하는 날짜만 남긴다.
국가와 일요일 강조는 솔루션 locale/calendar 정책 adapter가 명시한다. 국가 미지정/null은 자동 계산을
추정하지 않으며, DatePicker도 자체적으로 KR·일요일 강조 기본값을 추가하지 않는다. 무강조 정책은
`holidayCountry={null}`·`highlightSundays={false}`를 전달한다.

#### date-holidays 날짜 파싱 주의

`h.date` 문자열(`"2025-01-29 00:00:00"`)을 `new Date()`로 파싱하면 UTC로 해석되어
하루가 어긋날 수 있다. 문자열의 연·월·일을 분리하고 날짜 연산에는 UTC getter를 사용한다.
브라우저 시간대와 무관하게 공휴일의 현지 날짜를 유지하고, DST의 23/25시간은 하루로 처리한다.
라이브러리 데이터에 없는 임시 휴일과 향후 공휴일 변경은 `holidays` 추가 또는 별도 데이터 갱신 대상이다.

---

## 9. 애니메이션

### 색상 전환 (다크/라이트 모드)

각 색상 참조 요소에 `transition: '<색상속성> 0.2s ease'` 적용. `transition: all` 금지.

| 요소                          | transition 속성                              |
| ----------------------------- | -------------------------------------------- |
| 컨테이너                      | `background-color, border-color, box-shadow` |
| 헤더 TextButton               | `background-color`                           |
| Date 버튼                     | `background-color, color`                    |
| Range fill (::before/::after) | `background-color`                           |
| Current-indicator 점          | `background-color`                           |
| Weekday 셀                    | `color`                                      |
| Month/Year 셀                 | `background-color, color`                    |

> `@media (prefers-reduced-motion: reduce)` 가 전역으로 모든 transition 을 무력화한다.

---
