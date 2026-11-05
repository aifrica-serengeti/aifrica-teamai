# AgentHubFileViewer — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- 경로42·코드 p10/8·12/20·gutter68·guide16.8·actions24/16을 샘플과 대조합니다.
- 독립 CodeLine13px가 유지되고 FileViewer의12px override가 다른 사용처에 번지지 않는지 확인합니다.
- 50행·1행·빈 파일·긴 한 줄·한글/Unicode·큰 파일에서 마지막 문자까지 실제 viewport로 접근하는지 확인합니다.
- 복사 결과에 원문만 있고 줄 번호·decorative 선이 섞이지 않으며 성공/실패·재클릭·tooltip 이탈/정리가 올바른지 확인합니다.
- 확대/복원·파일 교체·지연 응답 후 현재 파일과 화면/경로가 일치하는지 확인합니다.
- 실제 scroll metrics가 높이/resize/폰트 로드에 맞고 정적180px thumb를 하드코딩하지 않았는지 확인합니다.
- path는 읽기 문자열로 두거나 제품이 채택한 링크 동작에 맞는 의미를 부여하고, 빈 RoundedCorner slot에 임의 glyph를 만들지 않았는지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
