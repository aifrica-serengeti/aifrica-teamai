# Async Content State 정의

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

## 1. 의존 컴포넌트

| 컴포넌트                        | 가이드라인 | 구현 상태            | 역할                                               |
| ------------------------------- | ---------- | -------------------- | -------------------------------------------------- |
| [Spinner](../Spinner/README.md) | 있음       | 참조 계약 · 매핑 확인 필요               | 공용 loading indicator                             |
| `DetailLoadingState`            | 이 문서    | public common export | 상세 페이지 최초 loading state card                |
| `RefreshContentOverlay`         | 이 문서    | public common export | 이전 content 위에 status를 겹치는 공용 overlay     |
| `useMinimumVisibleAttribute`    | 이 문서    | portable shared hook | 400ms visible + 240ms fade-out attribute lifecycle |

Header trigger는 page 요구에 맞는 기존 `IconButton`/`SplitButton`을 조합한다. 별도의
`PageRefreshButton` 공용 구현은 현재 솔루션에 채택하지 않는다.

## 2. 상태 모델

```
                 request starts
EMPTY ───────────────────────► INITIAL_LOADING ── success ─► READY
                                      │                        │
                                      └──────── error ─► INITIAL_ERROR

READY / INITIAL_ERROR ── refresh ─► REVALIDATING ── success/error ─► READY / ERROR_WITH_CONTENT
```

| 상태               | data                     | 기본 표현                                          | Overlay       |
| ------------------ | ------------------------ | -------------------------------------------------- | ------------- |
| initial loading    | 없음                     | DetailLoadingState/Table 또는 List overlay profile | 사용하지 않음 |
| initial error      | 없음                     | 오류 state card/Table error                        | 사용하지 않음 |
| ready              | 있음                     | 정상 content                                       | 숨김          |
| revalidating       | 이전 data 또는 오류 있음 | 기존 content 유지                                  | 표시          |
| error with content | 마지막 성공 data 유지    | content + 오류 안내/재시도                         | overlay 제거  |

핵심은 `loading` 하나만으로 UI를 분기하지 않는 것이다. `loading && data === null`은 최초 loading,
`loading && data !== null`은 revalidating이다. 이전 data가 있을 때 `data = null`로 되돌리지 않는다.
