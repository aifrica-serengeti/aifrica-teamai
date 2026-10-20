# Skeleton

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Skeleton은 아직 도착하지 않은 콘텐츠의 실제 크기와 배치를 먼저 보존하는 공용 로딩
placeholder다. shadcn/ui의 단일 `div` API와 `data-slot="skeleton"` 계약을 따르며, 프로젝트의
vanilla-extract 토큰과 public component export에 연결한다.

Skeleton은 query 상태, loading 문구, width·height를 스스로 결정하지 않는다. 화면이나 조합
컴포넌트가 실제 콘텐츠 geometry와 접근성 의미를 소유하고 Skeleton은 surface와 pulse motion만
제공한다.

## 문서 탐색

- [정의와 구조](./definition.md)
- [스타일과 토큰](./styles.md)
- [상태와 동작](./behavior.md)
- [접근성](./accessibility.md)
- [검증과 재현](./verification.md)

## 사용 구분

- 콘텐츠의 위치와 크기를 미리 보여 줄 때 Skeleton을 사용한다.
- 진행 상태 자체를 강조해야 하고 geometry 보존이 필요하지 않으면 [Spinner](../Spinner/README.md)를 사용한다.
- 기존 콘텐츠를 유지한 재조회에는 [Async Content State](../AsyncContentState/README.md)의 overlay 계약을 사용한다.
