# AgentHubFileTree — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

Search에 '파일 및 폴더 검색'처럼 placeholder와 별도의 접근성 이름을 제공합니다.
검색 입력과 role=tree의 탐색 순서를 유지하고 tree 자체에도 이름을 부여합니다.
행·폴더 expanded·선택·decorative guide는 FileTreeEntry 접근성 계약을 따릅니다.

공용 Tree 문서가 이미 로빙 manager를 제공한다고 가정하지 않습니다. 필요한 화살표/좌우 접기·펼치기/Home/End/typeahead를
제품의 한 focus manager로 연결하고 가려진 focused row를 실제 viewport 안으로 드러냅니다.
검색 결과가 없는 경우 상태 문구와 적절한 focus 복구를 제공하며 모든 행에 Tab 진입을 부여하지 않습니다.

작은 viewport·200% 확대·키보드 스크롤에서 검색/마지막 행이 접근 가능해야 합니다.
별도의 window/document 스크롤과 panel 스크롤을 중복 만들어 focus가 가려지지 않게 확인합니다.
결과 개수를 알릴 때 입력마다 과도한 live region 재낭독을 유발하지 않도록 제품이 알림 정책을 정합니다.
