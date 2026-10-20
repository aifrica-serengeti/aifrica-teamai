# List 실행 가이드

논리 경로 `docs/frontend/design/patterns/ListPage.md`와 `page-policies.md`를 읽고 solution/local list 확장을 합성한다.

1. URL 또는 명시한 page state가 query/filter/sort/page/pageSize/viewMode를 소유하도록 정한다.
2. query parse·정규화·serialize와 browser back/forward를 맞춘다. filter/pageSize 변경 시 pagination을 유효 범위로 돌린다.
3. page hook/service가 request·AbortSignal·stale response·retry·permission을 소유한다. Table/Card 안에서 fetch를 숨기지 않는다.
4. 최초 loading, content 유지 refresh, 데이터 자체 없음, filtered empty, recoverable error를 구분한다.
5. selection은 row id를 사용하고 현재 page/전체 결과·권한·filter 변경에 따른 유지 정책을 명시한다.
6. bulk action은 실행 대상·count·실패/부분 성공·재시도·destructive confirmation을 명확히 한다.
7. header·filter/action toolbar·result·pagination은 공용 역할을 재사용하고 column·action·geometry는 solution 요구로 결정한다.
8. table header/sort accessible name, keyboard, focus restore, status announcement, responsive overflow를 확인한다.

검증에는 query round trip, filter reset/pagination bounds, stale response, empty/filter-empty/error/retry,
selection scope, bulk permission, back navigation, keyboard/focus와 실제 package checks를 포함한다.
