# Calendar — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

이 컴포넌트는 공용 컴포넌트를 조합하여 구성된다. 재현 시 아래 컴포넌트를 먼저 확보해야 한다.

| 의존 컴포넌트  | 용도                                                                                                        | 가이드라인                           | 구현 |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---- |
| **Button**     | Footer 취소(Tertiary)/선택(Primary) 버튼                                                                    | `components/Button/README.md` ✅     | ✅   |
| **IconButton** | 헤더 좌우(prev/next) 이동 버튼 (xlarge=32px, ghost variant, `chevron_left`/`chevron_right`)                 | `components/IconButton/README.md` ✅ | ✅   |
| **TextButton** | 헤더 년/월 라벨 버튼 (large size, trailing `triangle_down` 아이콘)                                          | `components/TextButton/README.md` ✅ | ✅   |
| **Icon**       | TextButton 의 trailing 아이콘 (`triangle_down`), IconButton 의 좌우 아이콘 (`chevron_left`/`chevron_right`) | `components/Icon/README.md` ✅       | ✅   |

> **직접 구현 금지**: Button/IconButton/TextButton/Icon 의 마크업/상태/focus 로직을
> Calendar 내부에 직접 구현하지 않는다. 각 컴포넌트를 import 하여 조합한다.
> 특히 헤더의 chevron-down 아이콘을 별도 SVG 로 만들지 않고, 공용 Icon 컴포넌트의
> `triangle_down`(`iconMap` 매핑)을 TextButton 의 `trailingIcon` prop 으로 전달한다.

### 외부 라이브러리 의존성

| 패키지          | 용도                                                      |
| --------------- | --------------------------------------------------------- |
| `date-holidays` | 공휴일 자동 계산 (KR/US/JP/CN, 연도 제한 없음, 음력 포함) |

---

## 3. 구조 (Anatomy)

### 선택 단위

`CalendarProps.selectionUnit?: "day" | "month"`는 기본 `day`다. Single의 `month`는
월 목록을 기본으로 열고 연도·월 사이에서만 이동한다. `view="year"`로 시작할 수도 있다.
월을 확정하면 `onSelect({ year, month, day: 1 })`을 호출한다. month는 0부터 시작한다.
Range에서는 이 옵션과 관계없이 기존 일자 범위를 선택한다. 팝업 닫기와 일정 조회는 소비자 책임이다.

```
Calendar
├── Header  (px16 py10, justify-between)
│   ├── TextButton        — 년/월 라벨 + trailing triangle_down 아이콘 (클릭: view 전환 day→month→year→day)
│   └── Nav               — prev/next IconButton × 2 (xlarge, ghost, chevron_left/right)
├── Divider               — 1px borderTop (--cal-border)
├── Body (view 분기)
│   ├── Day view
│   │   ├── Weekdays 행  — 일~토 (h38, px16 py8, SemiBold 14/20)
│   │   └── Date grid    — 필요한 4~6주 × 7열 (px16 pb16, 주간 gap8)
│   │       └── Date cell — flex-1(1/7), h32, 32px 원형 selection 버튼
│   ├── Month view        — 4×3 grid (px16 pt8 pb16)
│   └── Year view         — 4×3 grid (12년 단위)
└── Footer (옵션, px16 pb12, justify-end, gap8)
    ├── Button (Tertiary, medium) — 취소
    └── Button (Primary, medium)  — 선택
```

---

## 4. 레이아웃 스펙

모든 수치는 px 단위.

### 컨테이너

| 항목               | 값                                   | 비고                                                           |
| ------------------ | ------------------------------------ | -------------------------------------------------------------- |
| 너비               | 288                                  | 고정                                                           |
| padding (상하)     | 4                                    | `py-4`                                                         |
| border-radius      | 8                                    |                                                                |
| border             | 1px solid `#dddddd` (`--cal-border`) | 다크 `#333333`                                                 |
| background         | `#ffffff` (`--cal-surface`)          | 다크 `#333333`                                                 |
| box-shadow         | Figma "Mid" effect                   | `0 0 0 1px rgba(9,30,66,0.31), 0 4px 6px 0 rgba(9,30,66,0.15)` |
| gap (내부 요소 간) | 4                                    | Header/Divider/Body/Footer 사이                                |

### Header

| 항목    | 값              |
| ------- | --------------- |
| padding | 10px 16px       |
| 정렬    | justify-between |

#### 헤더 TextButton (년/월 라벨)

| 항목            | 값                                      | 비고                                                      |
| --------------- | --------------------------------------- | --------------------------------------------------------- |
| 폰트            | Pretendard SemiBold 16px/24px           | TextButton `size="large"`                                 |
| trailing 아이콘 | `triangle_down`                         | 공용 Icon 컴포넌트 (`trailingIcon` prop). 별도 SVG 미사용 |
| 배경            | `#ffffff` (`--cal-default-mid`)         | 다크 `#333333`                                            |
| padding         | 2px 4px 2px 12px                        | TextButton 기본 padding 오버라이드                        |
| border-radius   | 4                                       |                                                           |
| hover 배경      | `#f8f8f8` (`--cal-default-mid-hovered`) | 다크 `rgba(255,255,255,0.08)`                             |
| pressed 배경    | `#f4f4f4` (`--cal-default-mid-pressed`) | 다크 `rgba(255,255,255,0.15)`                             |

> 헤더의 chevron-down 아이콘은 별도 SVG 컴포넌트 없이 공용 Icon 컴포넌트의
> `triangle_down`(`iconMap.ts` 매핑 → lucide `ChevronDown`)을 TextButton 의
> `trailingIcon` prop 으로 전달하여 렌더링한다. icon 색상은 TextButton 의 텍스트
> 색상을 상속(inherit)한다.

#### 헤더 IconButton (prev/next)

| 항목             | 값                               | 비고                                         |
| ---------------- | -------------------------------- | -------------------------------------------- |
| size             | xlarge (32×32)                   |                                              |
| variant          | ghost                            |                                              |
| icon             | `chevron_left` / `chevron_right` | 공용 Icon 컴포넌트. 단일 chevron (이중 아님) |
| icon size        | 20px (xl)                        | IconButton 기본 매핑                         |
| gap (두 버튼 간) | 4                                |                                              |

### Weekdays 행

| 항목    | 값                                        |
| ------- | ----------------------------------------- |
| height  | 38                                        |
| padding | 8px 16px                                  |
| 폰트    | Pretendard SemiBold 14px/20px             |
| 색상    | `#1c1c1c` (`--cal-text`) / 다크 `#dddddd` |
| 정렬    | 7컬럼 flex-1, center                      |

> `highlightSundays` 옵션 시 "일"(첫째 열) 라벨 색상이 `#e81919` (`--text-danger`)로 변경.

### Date grid (Day view)

주 수는 `Math.ceil((월 첫날의 요일 + 월 일수) / 7)`로 계산한다. 완전히 빈 마지막 주는 그리지
않고, 첫 주의 앞쪽 및 마지막 주의 뒤쪽 빈 셀만 유지한다. 예: 2026년 2월 4주, 3월 5주, 8월 6주.
월 이동 시 높이는 콘텐츠에 맞춰 변경되며 고정 높이나 6주분 최소 높이를 두지 않는다.

| 항목         | 값                                           |
| ------------ | -------------------------------------------- |
| padding      | 0 16px 16px                                  |
| 주간 gap     | 8                                            |
| 셀           | flex-1(1/7), h32                             |
| selection 원 | 32×32, border-radius 50%, 중앙 absolute 정렬 |
| 날짜 폰트    | Pretendard Regular 16px/24px                 |

### Month / Year view

| 항목              | 값                              |
| ----------------- | ------------------------------- |
| padding           | 8px 16px 16px                   |
| grid              | 4열 × 3행                       |
| 셀 padding        | 8px 4px                         |
| 셀 최소 높이      | 40                              |
| 셀 줄바꿈         | nowrap (숫자와 월/년 단위 유지) |
| 셀 border-radius  | 8                               |
| 셀 폰트           | Pretendard Regular 16px/24px    |
| 헤더 라벨 (Month) | `"2025년"`                      |
| 헤더 라벨 (Year)  | `"2007년 - 2026년"` (12년 범위) |

288px 컨테이너의 4열 셀은 약 64px이다. 좌우 4px 여백으로 네 자리 연도와 `년`을 담고,
현재 연도의 SemiBold와 하단 점이 있어도 라벨을 두 줄로 나누지 않는다.

### Footer

| 항목      | 값                                                    |
| --------- | ----------------------------------------------------- |
| padding   | 0 16px 12px                                           |
| 정렬      | justify-end                                           |
| gap       | 8                                                     |
| 취소 버튼 | Button `variant="tertiary" size="medium"` (h32, px16) |
| 선택 버튼 | Button `variant="primary" size="medium"` (h32, px16)  |

---
