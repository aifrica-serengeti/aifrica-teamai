# Stepper — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](../README.md)

## 구현 문서

- [CSS와 스타일 구현](./css.md)
- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)

## 12. 구현 코드

아래 코드는 playground 실제 구현과 **1:1 동일**하다. 생략(`...`) 없이 전체를 수록한다.
복사-붙여넣기로 그대로 재현 가능하다. 의존성: `react`, `@vanilla-extract/css`,
그리고 `cn` 유틸리티(`clsx` + `tailwind-merge` 조합 또는 동급).

