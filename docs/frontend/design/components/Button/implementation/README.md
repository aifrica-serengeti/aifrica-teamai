# Button — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)

## 11. 구현 코드

이 예제는 구현의 출발점이며 의존성·API·전체 상태 검증 후 채택한다.
의존성: `@vanilla-extract/css`, `radix-ui`(Slot), `clsx` + `tailwind-merge`(또는 동등 `cn` 유틸),
그리고 **Icon 컴포넌트**(Figma System icon 스펙, `Icon`/`iconTokens`/`iconMap`). §1 의존성 참조.

