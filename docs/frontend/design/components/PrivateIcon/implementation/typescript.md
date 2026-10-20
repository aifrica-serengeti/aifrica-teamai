# Private Icon — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← 구현 인덱스](./README.md)

portable 구현은 `PrivateIcon`, icon-name type, size map, asset source map의 네 책임으로 나눈다.
파일 경로와 alias는 소비 프로젝트가 정하지만 선택한 솔루션의 public name과 mapping 계약은 일관되게 유지한다.

PrivateIcon은 name으로 정적 자산 URL을 결정하고, root span과 img에 같은 size를 제공한다.
상태나 API 호출을 수행하지 않으므로 vendor·기술 이름을 PrivateIcon name으로 변환하는 책임은
호출 page 또는 markup에 둔다.
