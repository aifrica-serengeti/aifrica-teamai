# AgentHubFileTreeEntry — 접근성

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Tree/accessibility.md`를 읽고 접근성 계약을 유지합니다.
root role=tree 아래 행 role=treeitem, aria-level은 실제1기준 깊이, 선택 시 aria-selected를 제공합니다.
폴더만 aria-expanded를 받고 리프에 의미 없는 expanded=false를 붙이지 않습니다.

현재 공용 참조의 row는 tabIndex=-1이며 완전한 roving focus manager가 이미 구현됐다고 가정하지 않습니다.
이 패널에서 화살표 탐색·Home/End·typeahead가 필요하면 소비 제품이 한 focus manager를 연결합니다.
모든 행에 tabIndex=0을 부여해 Tab 순서를 과도하게 늘리지 않습니다.
접힌 자식을 숨기거나 제거하기 전에 내부 실제 focus 또는 가상 active descendant를 접는 부모로 복구합니다. focus manager는 사라진 ID 참조를 남기지 않으며 부모의 expanded 상태와 실제 보이는 탐색 목록을 함께 갱신합니다. 이는 제품 접근성 구현 의무이며 원본에 동작이 구현됐다는 뜻이 아닙니다.

showChevron=false 리프의 빈24px 정렬 slot은 비상호작용 장식으로 두고 aria-hidden으로 보조기술에서만 숨깁니다. 레이아웃의24px 폭은 유지하며 키보드 접근 가능한 빈 버튼으로 만들지 않습니다.
실제 chevron 명령은 파일명을 포함한 펼치기/접기 이름을 제공하고 Enter/Space가 선택과 중복 실행되지 않게 합니다.
guide-line·spacer·glyph는 aria-hidden이며 row-bg는 focus를 대신하지 않습니다.
생략된 전체 label은 accessible name으로 전달하고 pointer tooltip만으로 탐색을 해결하지 않습니다.
