# Timepicker

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

> 최종 갱신: 2026-07-23

단일 시간 또는 시간 범위를 팝오버에서 선택하는 컴포넌트다. 이 문서는 별도 프로젝트에서 처음 구현해도 재현 잠금 기준과 동일하게 만들기 위한 구현 계약이다. 수치 표만 참고해 비슷하게 만들지 말고, 아래 DOM 구조·상태 연결·CSS 선언을 그대로 적용한다.

> 문서 분할 안내: 기존 가이드의 “이 파일” 표현은 이제 이 디렉터리의 문서 묶음 전체를 뜻한다.
> 원문 내용은 삭제하지 않고 목적별 문서로 나눴다.

## 문서 탐색

- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)

## 1. 반드시 보존할 결과

다음 중 하나라도 빠지면 동일 구현이 아니다.

| 항목                    | 반드시 보여야 하는 결과                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Popover motion          | 열릴 때 opacity 0 → 1, Y -2px → 0px, 150ms ease-out. 닫힐 때 역방향 150ms ease-in.                                                                |
| 시간 메뉴와 footer 경계 | 302px 높이의 시간 메뉴 영역 자체에 1px bottom border. footer에 border를 임의로 옮기지 않는다.                                                     |
| Range 정렬              | 시작값, 6×1px 선, 종료값이 `gap: 6px`으로 연속 배치된다. `space-between`, 각 값의 `flex: 1`, 자동 margin을 쓰지 않는다.                           |
| 선택 효과               | 현재 편집 중인 시/분/초 option만 `var(--accent-50)` 배경 + `var(--accent-500)` 글자로 표시된다. `aria-selected`와 별도로 `data-selected`를 실제 CSS 상태로 연결한다. |
| focus                   | 1px border + 1px inset shadow로 보이는 2px blue ring. 실제 border 두께를 2px로 바꾸지 않아 값·placeholder·clock이 밀리지 않는다.                  |
| 열 chrome               | 각 ScrollArea에 카드형 border/radius/background가 없다. 열 사이 구분선만 보인다.                                                                  |
| footer action           | Now는 border 없는 primary TextButton. 취소/선택만 공용 medium Button이다.                                                                         |
