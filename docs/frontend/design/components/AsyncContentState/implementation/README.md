# Async Content State 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

- [원문 조립 예시](./reference.md)
- [분리된 조립 예시](./examples.md)
- [분리된 Overlay CSS](./css.md)

공용 Spinner와 `RefreshContentOverlay`를 사용하고 request state는 page/query hook이 소유한다.
Header trigger는 page에 이미 채택된 공용 `IconButton` 또는 `SplitButton`을 조합한다.
