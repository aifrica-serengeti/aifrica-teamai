# AgentHubFileTree — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- 400×991 비교에서 surface·border-l/b·p8·Search32/r6·gap8·행gap0을 확인합니다.
- 실제 viewport를 작게 만들어 검색은 고정되고 마지막 행까지 한 스크롤로 접근 가능한지 확인합니다.
- 선택/펼침/현재 파일/검색어가 하나의 source로 연결되고 resize·폰트 로드·검색 결과 변화 뒤 scroll thumb가 맞는지 확인합니다.
- 한글/빈 query/결과0/동일 이름/모든 폴더 접힘/선택된 파일 삭제를 확인합니다.
- 검색 입력 레이블·tree role·expanded·roving focus·Home/End·첫/마지막 행 접근을 확인합니다.
- 원본의31개 행이나991px 높이가 공개 API 제한으로 하드코딩되지 않았는지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
