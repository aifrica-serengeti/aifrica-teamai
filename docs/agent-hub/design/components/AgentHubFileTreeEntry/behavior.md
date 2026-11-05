# AgentHubFileTreeEntry — 동작과 상태 소유권

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

공용을 켜고 frontend-common을 함께 선택한 UI 작업에서만 `DOCS_ROOT/frontend/design/components/Tree/behavior.md`를 읽고 상태 owner와 이벤트 경계를 유지합니다.
행은 node 선택 요청을 전달하고, 폴더 chevron은 전파를 막고 펼침만 요청합니다.
선택된 node와 expanded set을 별도로 관리하며, 화살표/아이콘의 현재 도형은 expanded 값에 연결합니다.

selected 행의 hover·pressed는 선택 강조를 임의로 덮지 않습니다. hover/pressed는 포인터 상호작용,
selected는 제품의 현재 노드이고 focus는 키보드 탐색 상태입니다.
부모가 disabled를 지원하면 실제 row·chevron·키보드 명령까지 차단하되 별도 시각은 제품 요구로 검증합니다.

공용 Tree의 background-color/color200ms ease 상태 전환을 채택할 수 있으며 새 Figma timing이 아닙니다.
transition:all을 쓰거나 직선 guide를 공용 곡선 path 측정 엔진으로 다시 그리지 않습니다.
prefers-reduced-motion에서는 이동·전환을 즉시 완료하고 선택·접힘 값과 focus는 그대로 유지합니다.
펼침/접힘 모션은 Tree owner가 한 번만 관리하고 접힌 descendant는 접근성·focus 대상에서도 제거합니다.
접을 subtree 안에 실제 focus가 있으면 숨기기 전에 접는 부모 treeitem으로 옮깁니다. aria-activedescendant 방식이면 DOM focus는 기존 host에 유지하고 참조와 로빙 대상을 유효한 부모 ID로 먼저 갱신합니다. 이 복구는 Tree의 focus owner가 수행하며 선택 ID를 자동 변경하거나 subtree 밖의 focus를 빼앗지 않습니다.
원본에 없는 행별 타이머·data fetch·파일 열기 상태를 추가하지 않습니다.
