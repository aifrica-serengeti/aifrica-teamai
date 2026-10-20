# Private Icon — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Private Icon](./README.md)

PrivateIcon은 정보 표시 전용이며 hover, pressed, disabled, loading, focus 상태를 만들지 않는다.
버튼·링크 안에 배치되면 상위 상호작용 요소의 상태와 focus ring을 그대로 따른다.

- 애니메이션과 transition을 추가하지 않는다.
- 이름이 존재하지 않는 상태는 TypeScript union으로 막는다.
- 비동기 데이터의 vendor 값 변환, fallback System Icon, error 처리는 호출하는 page 또는 markup이 소유한다.
