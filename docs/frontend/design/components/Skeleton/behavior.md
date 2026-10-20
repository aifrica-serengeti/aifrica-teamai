# Skeleton — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Skeleton 문서 인덱스](./README.md)

## 상태 소유권

| 상태          | Skeleton 동작                            | 상위 소유자 동작                     |
| ------------- | ---------------------------------------- | ------------------------------------ |
| loading       | pulse surface 렌더                       | query 상태와 교체할 실제 콘텐츠 결정 |
| loaded        | 상위가 Skeleton을 실제 콘텐츠로 교체     | 값과 interaction 렌더                |
| error / empty | Skeleton을 계속 두지 않음                | Error/Empty 공용 상태 렌더           |
| refreshing    | 기존 콘텐츠를 Skeleton으로 되돌리지 않음 | Async Content State overlay 사용     |

## Motion

- 기본 pulse는 `2s cubic-bezier(0.4, 0, 0.6, 1) infinite`다.
- opacity는 `1 → 0.5 → 1`로만 변하고 width, height, position은 움직이지 않는다.
- `prefers-reduced-motion: reduce`에서는 animation을 제거하고 정지 surface를 유지한다.
- loading 완료 시점을 맞추기 위한 임의의 minimum duration은 Skeleton이 소유하지 않는다.
