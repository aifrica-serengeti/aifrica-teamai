# Detail 실행 가이드

논리 경로 `docs/frontend/design/patterns/DetailPage.md`와 `page-policies.md`를 읽고 solution/local detail 확장을 합성한다.

1. route parameter를 검증하고 original, edit draft, active tab, loading/refresh/saving와 permission owner를 정한다.
2. original → draft 초기화와 read/edit mode 전이를 명시하고 저장 성공 전 original을 draft로 덮지 않는다.
3. cancel은 마지막 확정 original에서 복원한다. background refresh가 dirty draft를 조용히 덮지 않게 한다.
4. 기존 content 재조회는 content를 유지하는 refresh로 표현한다. 최초 loading과 구분한다.
5. invalid route/not-found/forbidden/partial data/delete/conflict/stale response를 정상적인 상태 경로로 처리한다.
6. save success에서만 original을 갱신하고 cache/invalidation과 dirty reset을 맞춘다. 실패 시 draft를 유지한다.
7. detail section/card/tab/refresh/status UI는 값과 callback을 받고 route·service를 숨겨 소유하지 않는다.
8. concrete tab·action·field·route·layout geometry는 solution에 두고 공용 shell 역할·상태·접근성은 유지한다.

검증에는 route/permission/not-found, read/edit/save/cancel, save error/conflict, dirty refresh,
delete 후 navigation, tab keyboard/focus, announcement와 실제 package checks를 포함한다.
