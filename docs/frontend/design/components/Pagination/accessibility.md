# Pagination — 접근성

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](./README.md)

## 10. 접근성

| 항목              | 스펙                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- |
| 컨테이너          | `<nav role="navigation" aria-label="페이지네이션">`                                 |
| 네비게이션 버튼   | `aria-label` 필수 — "처음 페이지" / "이전 페이지" / "다음 페이지" / "마지막 페이지" |
| 페이지 번호 Input | `aria-label="현재 페이지, 총 N페이지"`, `inputMode="numeric"`                       |
| 키보드            | Tab으로 모든 상호작용 요소 순차 이동. Input에서 Enter로 확정                        |
| 포커스 표시       | 각 의존 컴포넌트의 `:focus-visible` 스펙 따름                                       |
| disabled          | 네이티브 `disabled` 속성으로 스크린 리더/키보드 모두 차단                           |

> 네비게이션 버튼은 icon-only이므로 `aria-label`이 필수다(스크린 리더가 의미 인식).

`showPageSize={false}`는 Dropdown을 DOM과 Tab 순서에서 제거한다. 나머지 페이지 입력·탐색 버튼의
accessible name과 키보드 동작은 바꾸지 않는다.

`rangeTemplate`의 토큰은 시각적 `span`으로만 분리되고 결과 카운트의 읽기 순서는 템플릿 문자열과
동일하다. `{total}` 강조는 색상만으로 별도 의미를 전달하지 않으며 전체 문구 안에서 총건수로 읽힌다.

`showPageSize={false}`에서는 Dropdown이 DOM·접근성 트리·Tab 순서에서 모두 빠진다.
나머지 네비게이션 버튼과 페이지 입력의 accessible name 및 키보드 동작은 유지한다.

---
