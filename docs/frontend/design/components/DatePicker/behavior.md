# Date Picker — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Date Picker 문서 인덱스](./README.md)

## 7. 입력, Calendar, 상태 규칙

### 직접 입력 검증

유효한 직접 입력은 정규식 `^\d{4}\.\d{2}\.\d{2}$`와 실제 날짜 검사를 모두 통과해야 한다.
`Date` 생성 결과를 다시 비교해 월 범위, 일 범위, 윤년을 검증한다.

| 입력 예시                               | 결과                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| `2026.12.11`                            | 유효, `CalDate { year: 2026, month: 11, day: 11 }`로 commit |
| `2026.02.29`                            | Invalid (2026년은 윤년 아님)                                |
| `2027.13.41`                            | Invalid (월/일 범위 초과)                                   |
| `20261211` / `202612111111`             | Invalid (점 구분자 없음)                                    |
| `2026/12/11`, `2026-12-11`, `2026.1211` | Invalid (점 위치 또는 형식 불일치)                          |

- 타이핑 도중 숫자가 8자리에 도달하거나 문자열 길이가 10자리에 도달하면 자동 검사를 시작한다.
  따라서 미완성 `2026.12.1`에는 오류를 먼저 표시하지 않는다.
- 자동 오류 시 `aria-invalid="true"`, invalid ring, `role="alert"` 오류 문구
  **“올바른 날짜 형식으로 입력하세요.”**를 표시하고 Help text는 숨긴다.
- 올바른 값으로 수정하거나 Calendar에서 날짜를 고르면 자동 오류를 해제한다.
- 한 자리 day를 입력하는 도중 자동으로 `02`로 format하지 않는다. 완성된 유효 패턴일 때만 commit하여
  `...02` 뒤에 다음 숫자가 붙어 `...022`가 되는 문제를 방지한다.

### Calendar interaction

Dialog 안에서도 Calendar는 본문·scrim 위에서 클릭할 수 있어야 한다. 날짜 선택 또는 Escape는
Calendar만 닫고 원래 schedule 버튼으로 포커스를 복원한다. 상위 Dialog의 작성값·열림 상태는 유지한다.
팝업 바깥의 입력을 클릭하면 팝업만 닫고 클릭한 입력의 포커스를 유지한다.
200% 확대나 낮은 화면에서 Calendar 전체 높이를 확보할 수 없으면 공용 ScrollArea 안에서
스크롤한다. 날짜 셀을 축소하지 않고 12px 충돌 여백을 유지하며, 마지막 주도 휠·Tab으로 접근한다.

Day popup은 월의 실제 주 수(4~6주)에 맞춰 높이가 바뀐다. 솔루션 locale/calendar 정책이 선택한
국가의 공휴일·대체공휴일과 일요일 강조만 표시하며 공통 기본 국가는 두지 않는다. 강조는 날짜의
선택 가능 여부나 callback 값을 바꾸지 않는다. 월·연도·국가가 바뀌면 해당 휴일을 다시 계산한다.

기존 제품을 연결할 때는 해당 제품의 명시적인 정책을 adapter에 기록한다. 무강조 표시는
`holidayCountry={null}`와 `highlightSundays={false}`를 함께 지정한다.
수동 `holidays`는 자동 계산과 합쳐지며, 설치된 데이터에 없는 임시 휴일을 추가할 때 사용한다.

`selectionUnit="month"`에서는 열 때마다 월 목록을 기본 표시한다. 연도 선택은 월 목록으로
이동할 뿐 값을 변경하지 않고, 월 선택에서만 `onValueChange`로 월 1일을 반환하고 팝업을 닫는다.
페이지는 이 callback으로 자체 일정 조회 기준을 변경한다. controlled text는 부모가 갱신하며,
uncontrolled text는 DatePicker가 `YYYY.MM.01`로 갱신한다. 기본 `day`는 월 선택 후 일자 선택으로 내려간다.

| 상태                                        | 동작                                                               |
| ------------------------------------------- | ------------------------------------------------------------------ |
| input click/focus                           | Calendar를 열지 않음. 텍스트 입력/선택만 가능                      |
| schedule Icon Button click 또는 Enter/Space | Calendar open                                                      |
| Single 날짜 클릭                            | value/text를 갱신하고 Popover close                                |
| Range 첫 날짜 클릭                          | start만 갱신, Popover 유지                                         |
| Range 두 번째 날짜 클릭                     | end 갱신, Popover close                                            |
| outside click / Escape                      | Radix Popover 기본 dismiss                                         |
| Disabled                                    | input과 button 모두 disabled                                       |
| Read-only                                   | input은 수정 불가·값은 표시, **calendar button도 native disabled** |

`invalid`/`errorText` prop을 전달한 경우에도 invalid 시각 스타일을 적용한다. `errorText`는
자동 오류 문구보다 우선한다.

## 8. 타이포그래피와 Motion

모든 텍스트는 Pretendard다.

| 역할                                 | 크기 / 행간 / 굵기 |
| ------------------------------------ | ------------------ |
| Label                                | 14px / 20px / 600  |
| Input value / placeholder / required | 14px / 20px / 400  |
| Optional / Help / Error              | 12px / 16px / 400  |

입력 필드의 색상은 0.2초 `ease`로 전환한다. 전역 `transition: all`은 사용하지 않는다.

Calendar 팝업은 Menu와 같은 150ms `ease` 페이드·6px 슬라이드를 적용한다. 아래에 열리면
Y -6px → 0, 충돌 회피로 위에 열리면 Y +6px → 0이며, 닫힘은 역방향이다.
Radix의 `data-state`·`data-side`와 Presence를 사용하고 별도의 타이머나 지연 상태는 만들지 않는다.
닫히는 동안 Content는 `inert`로 클릭·키보드 입력을 막으며, 애니메이션 종료/취소 후 제거된다.
`prefers-reduced-motion: reduce`에서는 애니메이션 없이 즉시 열고 닫는다.

```css
/* input/range container */
transition:
  background-color 0.2s ease,
  border-color 0.2s ease,
  box-shadow 0.2s ease,
  color 0.2s ease;

/* placeholder, label, help, error, range text */
transition: color 0.2s ease;
```
