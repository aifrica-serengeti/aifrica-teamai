# Pagination — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Pagination 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)

## 12. 구현 코드

이 예제는 구현의 출발점이며 의존성·API·전체 상태 검증 후 채택한다.
의존성: `@vanilla-extract/css`, `clsx` + `tailwind-merge`(또는 동등 `cn` 유틸),
그리고 **Icon Button** + **Input** + **Dropdown** 컴포넌트.

다국어 결과 카운트는 TypeScript 구현의 `rangeTemplate`과 `locale`을 사용해야 `{total}`의
전용 강조 토큰을 유지한다.

고정 크기 목록은 `pageSize={10} showPageSize={false}`처럼 조합한다. Dropdown을 CSS로 숨기거나
나머지 탐색 기능까지 제거하는 `mode="simple"`로 대체하지 않는다.
