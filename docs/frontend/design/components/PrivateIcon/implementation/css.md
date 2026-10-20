# Private Icon — CSS-in-TypeScript 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← 구현 인덱스](./README.md)

스타일은 `PrivateIcon`과 함께 전달되는 component-local style module에 둔다.

- root: inline-flex, 중앙 정렬, flex-shrink 0, overflow hidden
- source: block, width/height 100%, object-fit contain

브랜드 색상은 Figma 원본 자산이 소유하므로 CSS filter, 색상 token, hover transition을 추가하지 않는다.
