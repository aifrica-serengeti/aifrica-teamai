# AgentHubIndentGuide — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- 두 variant의16.8×20px와 선 x0/폭1px, default #EEE·active #DDD를 대조합니다.
- 들여쓰기0에서는0개,1/2/3에서는 그 수만큼 조합되고 줄 간 기준선이 이어지는지 확인합니다.
- default·current 줄의 시각 상태와 가이드 active를 독립 변경해 의도치 않은 전체 강조를 검사합니다.
- 키보드 Tab 순서·접근성 트리·코드 복사에 장식선이 끼어들지 않는지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
