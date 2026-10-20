# Detail Field 구현 예시

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [사용 예시](./examples.md)

공용 [Input](../../Input/README.md)을 먼저 구현한다. field family는 page state나 API를 import하지
않고 controlled prop/callback만 받는다.
