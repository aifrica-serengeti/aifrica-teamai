# AgentHubCodeLine — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- empty1 + enabled4 + current4의9개 관찰 조합을 비교합니다.
- current/empty에서 회색 배경이 content에만 있고 gutter68px은 영향을 받지 않는지 확인합니다.
- number26·fold16·guide16.8·font13/20과 empty placeholder400/opacity.6을 확인합니다.
- 들여쓰기 변경·접기·긴 코드·문서 교체 후 번호와 원문이 어긋나지 않고 중복 공백이 복사되지 않는지 확인합니다.
- 단독 CodeLine13px와 FileViewer12px를 각각 대조하고 부모 override가 전역으로 번지지 않는지 확인합니다.
- 편집기를 붙였으면 실제 IME·cursor·selection·접기·undo/redo를 별도 검증합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
