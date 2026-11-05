# AgentHubFileTreeEntry — 검증

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

- Level1~6과 상태4개, 총24개를 대조하고 (Level-1)×20px guide 수·선 x12px를 확인합니다.
- 28px 행/24px 배경/위아래2px와 부모 gap0에서 선이 연속되는지 확인합니다.
- 같은 Level의 폴더와 showChevron=false 리프를 나란히 대조해 content 시작선이 같고 빈 chevron24px 정렬 slot이 유지되는지 확인합니다. 리프의 빈 slot에는 버튼·Tab stop·펼침 명령이 없어야 합니다.
- row 선택·chevron 펼침을 마우스/Enter/Space로 각각 실행해 한 번만 호출되는지 확인합니다.
- 선택/펼침/focus를 독립 변경하고 selected가 hover 때문에 잃어버리지 않는지 확인합니다.
- 접힌 subtree의 숨은 자식으로 focus가 이동하지 않고 트리의 한 로빙 manager만 동작하는지 확인합니다.
- 자식에 실제 focus 또는 aria-activedescendant를 둔 상태에서 상위 폴더를 접고, 숨기기 전에 부모 treeitem으로 복구되어 body/제거된 ID로 focus가 유실되지 않는지 확인합니다. 선택 값은 유지하고 subtree 밖 focus는 강제 이동하지 않아야 합니다.
- 긴 한글·동일 이름·리프/폴더 혼합·깊이6·제품 disabled 확장을 확인합니다.
- 기존 공용 Tree의 connector/marker/32px geometry가 함께 남아 있지 않은지 확인합니다.


위 항목은 **소비 제품에서 수행할 검증 목록**이며 이번 문서 작업에서 제품 UI를 통과시켰다는 뜻이 아닙니다.
문서 작업은 실제 자료·asset 경로·내부 링크를 대조하고 저장소의 `npm run verify`·`npm test`로 확인합니다.
제품에서는 lint/typecheck/test/build와 키보드·실제 스크롤·브라우저 동작을 검증한 뒤 로컬 매핑에 source/public export를 기록합니다.
현재 `unmapped`/`draft`를 유지합니다.
