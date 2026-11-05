# AgentHubFileHeader — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- empty/tabs/tabs-overflow 세 시안의48px·패딩16·border-l/b·group gap을 대조합니다.
- 탭0/1/다수, 같은 이름, 긴 label, hide/show pause 및 resize/폰트 로드를 확인합니다.
- 실제 측정으로 overflow가 결정되고 overflow 목록에서 모든 파일을 선택할 수 있는지 확인합니다.
- tab 선택과 닫기, tree/more/expand/close/pause 명령이 각각 한 번만 호출되고 유효하지 않은 명령은 차단되는지 확인합니다.
- 왼쪽 fade가 올바른 원본으로 표시되고 클릭·Tab 탐색·focus 윤곽을 막지 않는지 확인합니다.
- 기존 OutputViewer34px와 FileHeader48px를 함께 겹쳐 잘못된 이중 header/border가 생기지 않는지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
