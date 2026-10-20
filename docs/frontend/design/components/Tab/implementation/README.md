# Tab — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tab 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)
- [기타 구현 참조](./reference.md)

## 12. 구현 코드

이 예제는 구현의 출발점이며 의존성·API·전체 상태 검증 후 채택한다.
필요 패키지: `radix-ui`, `@vanilla-extract/css`, `clsx` + `tailwind-merge` (`cn` 유틸).
의존 컴포넌트: Chip, Icon (섹션 2 참조).

## 제공된 예제와 후속 구현 범위

- 일반·controlled/uncontrolled Tab: value/defaultValue/callback, 그룹·개별 disabled, tablist 이름,
  `showContent`에 따른 내부 panel 렌더 분기의 예제를 제공한다. 제품에 설치된 실행 컴포넌트나 검증 결과는 아니다.
- closable Tab: [제거 행동 계약](../behavior.md#동적-탭-제거-remove-action)의 `onRemove`·`removeLabel`은
  의도된 확장으로 유지한다. 제공된 `TabItem` 타입·markup에는 없고 별도 adapter 구현도 제공하지 않는다.
  소비 제품에서 adapter를 만들고 label·선택·focus·중첩 interactive element를 검증해야 한다.
- navigation-only Header: `showContent=false`는 내부 panel만 생략한다. 외부 page `tabpanel`의
  id/`aria-labelledby`와 trigger의 `aria-controls`를 연결하는 adapter는 제공하지 않는다. 실제 Radix
  버전에서 연결·활성 상태·keyboard/focus를 검증하기 전에는 이 조합의 접근성 완료로 표시하지 않는다.

문서 예제의 타입·구조 확인과 native/primitive mock 검증은 실제 browser·Radix runtime 검증을 대신하지 않는다.
[검증 목록](../verification.md)의 closable·외부 panel 항목은 해당 제품에서 수행할 후속 조건이다.

