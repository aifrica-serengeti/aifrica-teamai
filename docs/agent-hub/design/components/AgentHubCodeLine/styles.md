# AgentHubCodeLine — 스타일과 실측

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

| 항목 | 관찰·채택 계약 |
| --- | --- |
| 행 | 높이20px. 샘플 폭800px는 비교용, 제품 폭은 가용 영역 FILL |
| gutter | 폭68·높이20·pl20·pr2·gap4·overflow clip |
| 행 번호 | 폭26px·오른쪽 정렬. JetBrains Mono Light300 13/20 |
| fold | 16×16px. 표시하지 않을 때 빈 glyph를 만들지 않음 |
| 코드 | JetBrains Mono Light300 13/20, color/code/text #1C1C1C, nowrap |
| enabled 번호 | color/code/line-number #555555 |
| current/empty 번호 | color/code/line-number-current #1C1C1C |
| current/empty content | color/code/line-fill-current rgba(0,0,0,.05) |
| empty cursor | 폭1×높이18, color/code/cursor #1C1C1C |
| empty placeholder | JetBrains Mono Regular400 13/20, color/code/placeholder #555555, opacity.6 |
| indent | 단계마다 AgentHubIndentGuide16.8×20, 간격0 |

현재 행을 root 배경으로 칠하면 gutter까지 회색이 되므로 content에만 연결합니다.
content는 min-width:0·남은 폭 FILL이며 원본의 clip을 실제 코드 접근 불가로 복사하지 않습니다. 긴 코드의 가로 viewport는 Viewer가 소유합니다.

독립 CodeLine의13px와 [FileViewer](../AgentHubFileViewer/styles.md) 인스턴스의12px override를 구분합니다.
표시 typography를 부모가 명시적으로 조정할 수 있으며 어느 하나를 모든 코드 컴포넌트의 새 기본값으로 덮어쓰지 않습니다.
