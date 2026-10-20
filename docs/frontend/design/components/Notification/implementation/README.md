# Notification — 구현 인덱스

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](../README.md)

## 구현 문서

- [TypeScript와 React 구현](./typescript.md)
- [사용 예제](./examples.md)
- [CSS와 스타일 구현](./css.md)

## 11. 구현 기준 코드


제품의 API 실패는 [Provider/Toast 조합](./typescript.md#115-앱-provider와-선언적-알림)과
[제품 예제](./examples.md#제품-api-실패-연결)를 사용한다. primitive 전시와 앱의 공용 스택을 구분한다.
