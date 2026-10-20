# Calendar

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

이 문서는 **의존 문서와 함께** Calendar 컴포넌트를 상세 상태·시각 계약을 구현하기 위한
완전한 스펙이다. 이 디렉터리와 의존 문서로 계약을 확인하고 솔루션 mapping·자산을 추가해야 한다.

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
- [TypeScript와 React 구현](./implementation/typescript.md)

## 1. 개요

날짜 선택 컴포넌트. 3가지 view(Day/Month/Year)를 전환하며 날짜·월·년을 선택한다.
single 모드(단일 날짜 선택)와 range 모드(범위 선택, hover preview 지원)를 지원한다.
월/연도 선택은 4열 × 3행을 유지하며, `2026년`처럼 단위가 붙은 라벨도 한 줄로 표시한다.
Single에서 `selectionUnit="month"`를 지정하면 월 목록으로 시작하고, 월 선택 즉시 해당 월 1일을 반환한다.
기본 `selectionUnit="day"`와 Range의 일자 선택은 유지한다.

이 참조 계약의 연결 대상은 `대상 솔루션의 public UI mapping`의 `Calendar` export다.
날짜 grid는 해당 월에 필요한 4~6주만 표시하고 빈 주는 제거한다. `holidayCountry` 지정 시
공휴일을 자동 계산하며 수동 `holidays`, `highlightSundays`와 함께 사용할 수 있다.

**기술 기반**: 의존성 없는 순수 날짜 계산(dateUtils) + vanilla-extract 스타일.
shadcn/Radix 미사용 — 헤더/푸터의 버튼은 공용 Button/IconButton/TextButton 컴포넌트로 조합.

**공휴일 지원**: `date-holidays` 라이브러리로 한국(KR)/미국(US)/일본(JP)/중국(CN)
공휴일을 설치된 데이터 범위에서 자동 계산한다. 음력 연휴와 대체공휴일을 포함하며,
라이브러리에 없는 임시 휴일은 수동 `holidays`로 추가한다.

---

## Locale·calendar 정책 경계

자동 공휴일 지원 능력과 기본 채택 국가는 다르다. `holidayCountry`, `highlightSundays`, `holidays`는
소비 솔루션의 정책 adapter가 전달하며, Calendar·DatePicker가 KR나 일요일 강조를 자동 기본값으로
추가하지 않는다. 국가별 보정·휴일 fixture는 그 국가를 명시한 경우에 검증한다.
