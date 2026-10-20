# List Content State 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

| kind       | 의미                          | 허용 action                       |
| ---------- | ----------------------------- | --------------------------------- |
| `empty`    | 등록되거나 조회할 데이터 없음 | 기본적으로 없음                   |
| `filtered` | 데이터는 있으나 조건과 불일치 | 검색/필터 초기화                  |
| `error`    | 최초 조회 실패                | 실제 query를 다시 실행하는 재시도 |

일반 빈 상태에서 등록 CTA를 중복 노출하지 않는다. 등록 action은 PageHeader 또는 section header가
소유한다. 이전 데이터가 있는 refresh 오류는 이 컴포넌트로 교체하지 않고 기존 결과와 notification을
유지한다.

`createListErrorState`는 최초 오류의 copy와 action을 Card/Table에 공유하는 순수 설정 helper다.
query와 retry callback은 계속 page/query hook이 소유하며, `retrying` 동안 action을 disabled하고
`aria-busy`를 함께 전달한다.

`density`는 표현 밀도만 바꾼다. Card와 Medium Table은 `regular`, Small Table은 `compact`를 사용하며
kind, role, action 동작과 문구 소유권은 동일하다.
