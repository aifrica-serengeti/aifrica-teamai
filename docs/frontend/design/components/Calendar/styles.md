# Calendar — 스타일과 토큰

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](./README.md)

`selectionUnit="month"`도 기존 월/연도 4×3 grid와 색상·40px 최소 높이를 사용한다.
월 1일이 비활성 날짜이면 월 버튼에 `--text-disabled`와 `not-allowed` cursor를 적용하고
hover/pressed 배경을 표시하지 않는다. 별도의 월 전용 popup 스타일을 만들지 않는다.

Day view도 콘텐츠 높이를 사용한다. 6주 확보용 빈 줄은 만들지 않으며 날짜 grid의 기본 하단 padding 16px은 유지한다.
솔루션 calendar 정책이 강조하도록 지정한 일요일/공휴일의 기본·오늘 상태는 `--text-danger`(light red-600)이며, selected/range의 선택 색상은 유지한다.
비활성 날짜에는 솔루션이 선택한 휴일 강조색 override를 적용하지 않는다.

## 5. 색상 스펙 — 라이트 모드

> Calendar는 전역 semantic 토큰이 아닌 **Calendar 전용 토큰**(`--cal-*`)을 사용한다.
> 다크 모드에서 Figma가 전역 토큰과 다른 값을 사용하기 때문이다.

### 날짜 셀 상태

| 상태                 | 원(selection) 배경                          | 텍스트 색상                                           | 비고                              |
| -------------------- | ------------------------------------------- | ----------------------------------------------------- | --------------------------------- |
| Default              | transparent                                 | `#1c1c1c` (`--cal-text`)                              |                                   |
| Hover                | `#f8f8f8` (`--cal-date-hover`, gray-50)     | `#1c1c1c`                                             | 일반 날짜                         |
| Pressed              | `#f4f4f4` (`--cal-date-pressed`, gray-100)  | `#1c1c1c`                                             | 일반 날짜                         |
| Current (오늘)       | transparent                                 | `var(--accent-500)` (`--cal-text-primary`, accent-500) + SemiBold | + 하단 4px 점                     |
| Selected             | `var(--accent-500)` (`--cal-selected-fill`, accent-500) | `#ffffff` (`--text-on-primary`)                       | hover 배경 무시                   |
| Range-start          | `var(--accent-500)`                                   | `#ffffff`                                             | + 셀 우측 절반 range fill         |
| Range-end            | `var(--accent-500)`                                   | `#ffffff`                                             | + 셀 좌측 절반 range fill         |
| Range-middle         | transparent                                 | `#1c1c1c`                                             | 셀 전체 배경 `var(--accent-50)`            |
| Range-middle Hover   | `rgba(0,0,0,0.05)` (`--cal-range-hover`)    | `#1c1c1c`                                             | alpha overlay                     |
| Range-middle Pressed | `rgba(0,0,0,0.1)` (`--cal-range-pressed`)   | `#1c1c1c`                                             | alpha overlay                     |
| Null (빈칸)          | —                                           | —                                                     | 이전/다음 달 날짜 자리            |
| Disabled             | —                                           | `#aaaaaa` (`--text-disabled`, gray-400)               | 클릭 불가, hover 배경 없음        |
| Holiday (휴일)       | —                                           | `#e81919` (`--text-danger`, red-600)                  | selected/range 상태 시 적용 안 함 |

### Range fill

| 요소                  | 색상                                    | 비고                           |
| --------------------- | --------------------------------------- | ------------------------------ |
| Range-middle 셀 배경  | `var(--accent-50)` (`--cal-range-fill`, accent-50) | 셀 전체                        |
| Range-start 우측 절반 | `var(--accent-50)`                               | `::after` 의사요소, width 50%  |
| Range-end 좌측 절반   | `var(--accent-50)`                               | `::before` 의사요소, width 50% |

### Current-indicator (오늘 점)

| 항목    | 값                                                     |
| ------- | ------------------------------------------------------ |
| 크기    | 4×4                                                    |
| 형태    | 원형 (border-radius 50%)                               |
| 위치    | 날짜 셀 하단 중앙 (bottom 2px)                         |
| 색상    | `var(--accent-500)` (`--element-primary`, accent-500)              |
| z-index | 2 (dateButton zIndex:1 위)                             |
| 숨김    | selected/range-start/range-end 상태 시 `display: none` |

### Month/Year 셀

셀은 `padding: 8px 4px`, `min-height: 40px`, `white-space: nowrap`을 사용한다.
라벨의 숫자와 월/년 단위를 한 줄로 유지하며, 16px/24px 폰트와 현재 월/년의 강조·하단 점은 유지한다.

| 상태                 | 배경                             | 텍스트                                               |
| -------------------- | -------------------------------- | ---------------------------------------------------- |
| Default              | transparent                      | `#1c1c1c` (`--cal-text`)                             |
| Hover                | `#f8f8f8` (`--cal-date-hover`)   | `#1c1c1c`                                            |
| Pressed              | `#f4f4f4` (`--cal-date-pressed`) | `#1c1c1c`                                            |
| Current (현재 월/년) | transparent                      | `var(--accent-500)` (`--cal-text-primary`) + SemiBold + 4px 점 |

---

## 6. 색상 스펙 — 다크 모드

`.dark` 클래스 적용 시 Calendar 전용 토큰이 전환된다.
**전역 semantic 토큰(`--surface`, `--border-default`, `--text-primary`)과 다른 값**을 사용하므로 주의.

> 출처: Figma variable defs (node `10934:18144` dark)에서 추출한 정확한 값.

### 다크 모드 토큰 매핑 (전역 토큰과의 차이)

| 항목          | Calendar 다크값                             | 전역 다크값                    | 비고           |
| ------------- | ------------------------------------------- | ------------------------------ | -------------- |
| 컨테이너 배경 | `#333333` (`--cal-surface`, gray-800)       | `#1c1c1c` (`--surface`)        | ❌ 다름        |
| 테두리        | `#333333` (`--cal-border`, gray-800)        | `#555555` (`--border-default`) | ❌ 다름        |
| 기본 텍스트   | `#dddddd` (`--cal-text`, gray-200)          | `#dddddd` (`--text`)           | 동일           |
| 오늘 텍스트   | `var(--accent-200)` (`--cal-text-primary`, accent-200)  | `var(--accent-400)` (`--text-primary`)   | ❌ 다름        |
| Selected 원   | `var(--accent-500)` (`--cal-selected-fill`, accent-500) | —                              | 라이트와 동일  |
| Range fill    | `var(--accent-900)` (`--cal-range-fill`, accent-900)    | —                              | 전역 토큰 없음 |

### 날짜 셀 상태 (다크)

| 상태               | 원(selection) 배경                          | 텍스트                                                |
| ------------------ | ------------------------------------------- | ----------------------------------------------------- | ----------------- |
| Default            | transparent                                 | `#dddddd` (`--cal-text`, gray-200)                    |
| Hover              | `#333333` (`--cal-date-hover`, gray-800)    | `#dddddd`                                             |
| Pressed            | `#555555` (`--cal-date-pressed`, gray-700)  | `#dddddd`                                             |
| Current            | transparent                                 | `var(--accent-200)` (`--cal-text-primary`, accent-200) + SemiBold |
| Selected           | `var(--accent-500)` (`--cal-selected-fill`, accent-500) | `#ffffff`                                             |
| Range-start/end    | `var(--accent-500)`                                   | `#ffffff`                                             |
| Range-middle       | transparent                                 | `#dddddd`                                             | 셀 배경 `var(--accent-900)` |
| Range-middle Hover | `rgba(255,255,255,0.05)`                    | `#dddddd`                                             |
| Disabled           | —                                           | `#757575` (`--text-disabled`, gray-600)               |
| Holiday            | —                                           | `#f52424` (`--text-danger`, red-500)                  |

### Range fill (다크)

| 요소                 | 색상                                     |
| -------------------- | ---------------------------------------- |
| Range-middle 배경    | `var(--accent-900)` (`--cal-range-fill`, accent-900) |
| Range-start/end 절반 | 동일                                     |

### Current-indicator (다크)

| 항목 | 값                                        |
| ---- | ----------------------------------------- |
| 색상 | `var(--accent-400)` (`--element-primary`, accent-400) |

### 헤더 TextButton (다크)

| 항목    | 값                                                     |
| ------- | ------------------------------------------------------ |
| 배경    | `#333333` (`--cal-default-mid`, gray-800)              |
| hover   | `rgba(255,255,255,0.08)` (`--cal-default-mid-hovered`) |
| pressed | `rgba(255,255,255,0.15)` (`--cal-default-mid-pressed`) |

---

## 8. 타이포그래피

| 요소                    | 폰트       | 크기/행간 | 굵기          | 토큰                             |
| ----------------------- | ---------- | --------- | ------------- | -------------------------------- |
| 헤더 년/월 라벨         | Pretendard | 16px/24px | SemiBold(600) | `--text-title1`                  |
| Weekdays (일~토)        | Pretendard | 14px/20px | SemiBold(600) | `--text-title2`                  |
| 날짜 (Default)          | Pretendard | 16px/24px | Regular(400)  | `--text-body1`                   |
| 날짜 (Current/오늘)     | Pretendard | 16px/24px | SemiBold(600) | `--text-body1` + weight override |
| Month/Year 셀           | Pretendard | 16px/24px | Regular(400)  | `--text-body1`                   |
| Month/Year 셀 (Current) | Pretendard | 16px/24px | SemiBold(600) | `--text-body1` + weight override |
| Footer 버튼             | Pretendard | 14px/20px | SemiBold(600) | Button `medium` size             |

---

## 11. 디자인 토큰 정의 (CSS 변수)

> Calendar는 **전용 토큰**(`--cal-*`)을 사용한다. 다크 모드에서 전역 semantic 토큰과
> 다른 Figma 값을 사용하므로, 반드시 아래 토큰을 별도로 정의해야 한다.

### `:root` (라이트)

```css
:root {
  /* Calendar 전용 토큰 — Figma variable defs (node 10934:18144) */
  --cal-surface: #ffffff; /* 컨테이너 배경 (surface/default-mid) */
  --cal-border: #dddddd; /* 테두리 (border/default, gray-300) */
  --cal-text: #1c1c1c; /* 기본 텍스트 (text/default, gray-900) */
  --cal-text-primary: var(--accent-500); /* 오늘 텍스트 (text/primary, accent-500) */
  --cal-default-mid: #ffffff; /* 헤더 TextButton 배경 (action/default-mid) */
  --cal-default-mid-hovered: #f8f8f8; /* 헤더 TextButton hover (gray-50) */
  --cal-default-mid-pressed: #f4f4f4; /* 헤더 TextButton pressed (gray-100) */
  --cal-date-hover: #f8f8f8; /* 일반 날짜 hover (gray-50) */
  --cal-date-pressed: #f4f4f4; /* 일반 날짜 pressed (gray-100) */
  --cal-range-hover: rgba(0, 0, 0, 0.05); /* range 내부 hover (alpha overlay) */
  --cal-range-pressed: rgba(
    0,
    0,
    0,
    0.1
  ); /* range 내부 pressed (alpha overlay) */
  --cal-range-fill: var(--accent-50); /* range 배경 (action/default-selected, accent-50) */
  --cal-selected-fill: var(--accent-500); /* selected 원 (action/primary, accent-500) */
  --cal-shadow:
    0 0 0 1px rgba(9, 30, 66, 0.31), 0 4px 6px 0 rgba(9, 30, 66, 0.15);
}
```

### `.dark` (다크)

```css
.dark {
  /* Calendar 다크 매핑 — Figma variable defs (node 10934:18144 dark).
   * 전역 semantic 토큰과 다른 값 사용:
   *   surface:  #333333 (전역 --surface #1c1c1c 와 다름)
   *   border:   #333333 (전역 --border-default #555555 와 다름)
   *   primary:  var(--accent-200) (전역 --text-primary var(--accent-400) 와 다름)
   *   selected: var(--accent-500) (라이트와 동일 — Figma action/primary)
   *   range:    var(--accent-900) (accent-900 — Figma action/default-selected) */
  --cal-surface: #333333; /* gray-800 */
  --cal-border: #333333; /* gray-800 */
  --cal-text: #dddddd; /* gray-200 */
  --cal-text-primary: var(--accent-200); /* accent-200 */
  --cal-default-mid: #333333; /* gray-800 */
  --cal-default-mid-hovered: rgba(255, 255, 255, 0.08);
  --cal-default-mid-pressed: rgba(255, 255, 255, 0.15);
  --cal-date-hover: #333333; /* gray-800 */
  --cal-date-pressed: #555555; /* gray-700 */
  --cal-range-hover: rgba(255, 255, 255, 0.05);
  --cal-range-pressed: rgba(255, 255, 255, 0.1);
  --cal-range-fill: var(--accent-900); /* accent-900 — Figma action/default-selected */
  --cal-selected-fill: var(--accent-500); /* accent-500 — 라이트와 동일 (Figma action/primary) */
  /* --cal-shadow 는 라이트/다크 공통 (알파 기반) */
}
```

> `--cal-shadow` 는 Figma "Mid" effect (`#091E424F` r1 + `#091E4226` offset 0,4 r6) 를
> 그대로 사용한다. Action bar 와 동일한 navy 알파 그림자.

---
