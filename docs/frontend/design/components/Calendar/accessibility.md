# Calendar — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Calendar 문서 인덱스](./README.md)

## 10. 접근성

빈 주 제거는 실제 날짜 버튼을 삭제하지 않는다. 날짜는 시간순 Tab 순서를 유지하며,
공휴일도 선택 가능한 날짜다. 휴일 강조는 disabled나 선택 상태를 대체하지 않는다.

| 항목          | 구현                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 키보드        | Tab 으로 날짜 버튼 이동, Enter/Space 로 선택                                                                                     |
| Focus         | `outline: 1px solid var(--border-primary)` + `outline-offset: 1px` (원형 따라감)                                                 |
| aria-current  | 오늘 날짜에 `aria-current="date"`                                                                                                |
| aria-selected | selected/range-start/range-end 에 `aria-selected="true"`                                                                         |
| aria-label    | IconButton 에 `aria-label="이전"/"다음"`, TextButton 에 `aria-label="{라벨} — 보기 전환"`                                        |
| role          | Weekdays 행 `role="row"`, 요일 셀 `role="columnheader"`, 날짜 grid `role="rowgroup"`, 주 `role="row"`, 날짜 셀 `role="gridcell"` |
| 히트 영역     | 날짜 버튼 32×32 (최소 히트 영역 충족)                                                                                            |
| disabled      | `disabled` 속성 + `pointer-events: none`                                                                                         |

월/연도 버튼은 `2026년`처럼 단위까지 포함한 전체 라벨을 접근 가능한 이름으로 유지한다.
숫자와 단위를 한 줄로 표시하며, 현재 월/년의 하단 점은 읽기용 이름에 포함하지 않는다.
월 단일 선택에서도 native button의 Tab·Enter·Space 선택을 유지한다. 연도 선택만으로 값을 확정하지
않고 월 선택 시에만 callback을 호출한다. 비활성 월은 native `disabled`로 선택을 차단한다.

---
