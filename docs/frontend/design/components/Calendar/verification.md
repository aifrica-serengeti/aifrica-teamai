# Calendar — 검증과 재현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](./README.md)

## 13. 검증 체크리스트

### 월 단일 선택

- [ ] Single + `selectionUnit="month"`는 기본 월 목록으로 열림
- [ ] 헤더는 월/연도 사이에서만 전환하며 연도 선택 시 callback 없음
- [ ] 월 선택 즉시 `{ year, month, day: 1 }`만 반환하며 일자 화면으로 내려가지 않음
- [ ] 해당 월 1일이 `disabledDates`에 있으면 월 선택 불가
- [ ] 기본 날짜 선택과 Range의 시작/끝 정렬 유지
- [ ] `Calendar.test.tsx`에서 단일 월·연도 탐색·비활성 월·Range 회귀 확인

### 레이아웃

- [ ] 2026년 2월(4주), 3월(5주), 8월(6주), 2024년 2월(윤년)에 빈 주 없이 마지막 날짜까지 표시

- [ ] 컨테이너 너비 288px, radius 8px, 1px border
- [ ] Header padding 10px 16px, TextButton(좌) + IconButton×2(우) justify-between
- [ ] Weekdays 행 h38px, 7컬럼 flex-1, SemiBold 14px
- [ ] 날짜 셀 flex-1(1/7), h32px, 32px 원형 selection 중앙 정렬
- [ ] Month/Year view 4×3 grid, 셀 px4 py8, 최소 높이40, radius8
- [ ] `2026년`을 포함한 연도 12개가 모두 한 줄이며 현재 연도 강조/하단 점이 라벨과 겹치지 않음
- [ ] 288px 팝업·390px 화면·200% 확대에서 월/년 단위 줄바꿈·잘림 없이 선택 가능
- [ ] Footer px16 pb12, 우측 정렬, gap8

### 색상 (라이트)

- [ ] 컨테이너 배경 `#ffffff` (`--cal-surface`), 테두리 `#dddddd` (`--cal-border`)
- [ ] Default 날짜 hover = `#f8f8f8` (gray-50), pressed = `#f4f4f4` (gray-100)
- [ ] Current(오늘) = `var(--accent-500)` (`--cal-text-primary`) 텍스트 + SemiBold + 4px 점 (z-index 2)
- [ ] Selected = 파란 원(`var(--accent-500)`) + 흰 글씨, hover 배경 무시
- [ ] Range-start = 파란 원 + 우측 절반 `::after` fill
- [ ] Range-end = 파란 원 + 좌측 절반 `::before` fill
- [ ] Range-middle = 셀 전체 `var(--accent-50)` 배경, 투명 원
- [ ] Range-middle hover = `rgba(0,0,0,0.05)` alpha overlay (gray-50 아님)
- [ ] Disabled = `#aaaaaa` 텍스트, 클릭 불가
- [ ] Holiday = `#e81919` 텍스트 (selected/range 상태 시 적용 안 함)

### 색상 (다크 — Figma variable defs 기준)

- [ ] 컨테이너 배경 `#333333` (`--cal-surface`, gray-800) — 전역 `--surface`(`#1c1c1c`)와 다름
- [ ] 테두리 `#333333` (`--cal-border`, gray-800) — 전역 `--border-default`(`#555555`)와 다름
- [ ] 오늘 텍스트 `var(--accent-200)` (`--cal-text-primary`, accent-200) — 전역 `--text-primary`(`var(--accent-400)`)와 다름
- [ ] Selected 원 `var(--accent-500)` (`--cal-selected-fill`) — 라이트와 동일
- [ ] Range fill `var(--accent-900)` (`--cal-range-fill`, accent-900)
- [ ] 헤더 TextButton 배경 `#333333` (`--cal-default-mid`)
- [ ] Current-indicator 점 `var(--accent-400)` (`--element-primary`)
- [ ] 전역 semantic 토큰이 아닌 `--cal-*` 전용 토큰을 참조하는지 확인

### Range preview

- [ ] 첫 날짜 선택 후 hover 시 시작~hover 까지 range fill 표시
- [ ] hover 방향(앞/뒤)에 따라 range-start/range-end 동적 할당
- [ ] 마우스가 grid 벗어나면 preview 해제

### 공휴일

- [ ] 2026년 설날 2/16~18, 추석 9/24~26만 연휴로 표시되고 이웃 평일은 빨간색이 아님
- [ ] 대체공휴일과 수동 holidays를 합치고 중복 날짜를 제거함
- [ ] UTC/Asia-Seoul/America-Los_Angeles에서 동일한 날짜 key가 생성됨
- [ ] 선택된 휴일은 흰 글씨와 파란 원을 유지하고 disabled는 휴일 색상보다 우선함

- [ ] `holidayCountry="KR"` 시 2025년 설날(1/28~1/30) 3일 모두 빨간색
- [ ] 추석 연휴 3일 모두 빨간색
- [ ] 월/년을 넘겨도 해당 연도 공휴일 자동 표시
- [ ] `highlightSundays` 시 일요일 + "일" 라벨 빨간색
- [ ] 국가 전환(KR/US/JP/CN) 시 해당 국가 공휴일로 전환

### 의존 컴포넌트

- [ ] Footer 취소/선택 버튼이 공용 Button(Tertiary/Primary)으로 렌더
- [ ] 헤더 좌우 버튼이 공용 IconButton(xlarge, ghost, `chevron_left`/`chevron_right`)으로 렌더
- [ ] 헤더 년/월 라벨이 공용 TextButton(large, `trailingIcon="triangle_down"`)으로 렌더
- [ ] 헤더 아이콘(triangle_down, chevron_left/right)이 공용 Icon 컴포넌트 기반
- [ ] CalendarIcons.tsx 같은 별도 SVG 파일이 없음 (Icon 컴포넌트 재사용)
- [ ] 의존 컴포넌트를 직접 구현하지 않고 import 하여 조합

### 접근성

- [ ] Tab 으로 날짜 이동, Enter/Space 로 선택
- [ ] Focus 시 1px outline + 1px offset (원형 따라감)
- [ ] 오늘 날짜 `aria-current="date"`
- [ ] selected `aria-selected="true"`
- [ ] IconButton `aria-label="이전"/"다음"`

### 빌드

- [ ] `pnpm typecheck` 통과
- [ ] `pnpm lint` 통과 (0 errors)
- [ ] `pnpm build` 통과

## 14. 새 프로젝트 재현 잠금 계약

이 계약은 Calendar을 다른 프로젝트에서 새로 구현할 때에도 동일한 결과를 유지하기 위한 필수 조건이다.

- **전달 묶음**: [foundation 문서](../../foundations.md), reproduction.md, 이 문서의 의존 컴포넌트 closure와 명시된 SVG/폰트 자산을 함께 확보한 뒤 구현한다.
- **소유권**: 이 컴포넌트가 문서의 geometry, visual state, focus와 interaction을 단일하게 소유한다. 부모는 공개 props를 선택하고 문서의 배치 제약 안에서만 사용한다.
- **변형 금지**: 유사한 framework primitive, icon asset, default token으로 대체하거나 문서에 없는 responsive 변형을 추가하지 않는다.
- **검증 기준**: 이 문서의 기존 검증 체크리스트에 더해 reproduction.md의 공통 상태 matrix를 수행한다. 기준 viewport에서 폰트 로드, token mode, focus/keyboard, 긴 콘텐츠와 명시된 light/dark 상태를 함께 확인한다.
