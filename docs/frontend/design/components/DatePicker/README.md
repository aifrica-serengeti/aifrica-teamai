# Date Picker

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 Date Picker를 동일하게 재현하기 위한 구현 스펙이다. Single과 Range
모두 직접 입력과 Calendar 선택을 지원하지만, Calendar는 **오른쪽 calendar 아이콘 버튼으로만**
열린다. 입력칸을 클릭하면 포커스와 텍스트 편집만 가능하다.

---

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [구현 인덱스](./implementation/README.md)
- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)
- [CSS와 스타일 구현](./implementation/css.md)

## 1. 개요

Date Picker는 날짜 하나(Single) 또는 시작일·종료일(Range)을 받는 form field다.

- 형식은 항상 **`YYYY.MM.DD`** 이며 placeholder와 HTML `pattern`을 변경할 수 없다.
- 직접 입력이 완성되면 실제 존재하는 날짜인지 검사한다. 존재하지 않는 날짜와 형식 오류는
  자동으로 Invalid 상태와 오류 문구를 표시한다.
- Calendar는 `Popover` 안에서 렌더하고, 아이콘 버튼으로만 연다.
- 공용 floating layer(50)의 body portal로 Dialog 본문·scrim 위에 표시하며, 날짜 선택·Escape 후 달력 버튼으로 포커스를 복원한다.
- 200% 확대·낮은 viewport에서는 Radix의 가용 높이 안에서 공용 ScrollArea로 날짜를 스크롤한다.
- 팝업은 Menu와 같은 150ms ease 페이드·6px 슬라이드와 부드러운 그림자를 사용한다. 모션 감소 환경에서는 즉시 열고 닫는다.
- Calendar에서 고른 날짜는 `YYYY.MM.DD` 형식으로 즉시 입력값에 반영한다.
- 팝업은 날짜가 있는 4~6주만 표시한다. 공휴일 국가·수동 휴일·일요일 강조는 솔루션 locale/calendar
  정책 adapter의 `holidayCountry`, `holidays`, `highlightSundays` 입력을 사용하며 국가·강조 기본값을 가정하지 않는다.
  무강조 정책은 `holidayCountry={null}`과 `highlightSundays={false}`를 명시한다.
- `selectionUnit="month"`는 입력값의 연도를 기준으로 월 목록을 열고, 월 선택 즉시 해당 월
  1일을 반영한 뒤 닫는다. 기본 `day`는 기존 일자 선택을 유지한다.

이 참조 계약의 연결 대상은 `대상 솔루션의 public UI mapping`의 `DatePicker` export다.
참조 source의 Single과 문서의 Range 설계 목표를 구분한다. 소비 솔루션은 지원 범위를 mapping에 기록한다.

**기술 기반**: HTML `<input>` + 기존 Input, Icon Button, Calendar를 조합하고,
`radix-ui`의 Popover로 floating Calendar의 위치·portal·dismiss 동작을 처리한다.
