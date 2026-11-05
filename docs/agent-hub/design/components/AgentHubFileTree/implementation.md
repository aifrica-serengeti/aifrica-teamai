# AgentHubFileTree — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

아래는 **제품 제안**이며 Figma에 이 API가 정의됐거나 consuming repository에서 확인됐다는 뜻이 아닙니다.

```ts
type FileTreeNode = {
  id: string;
  label: string;
  children?: readonly FileTreeNode[];
};
type FileTreeView = {
  nodes: readonly FileTreeNode[];
  query: string;
  selectedId: string | null;
  expandedIds: ReadonlySet<string>;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
  onExpandedChange: (id: string, expanded: boolean) => void;
};
```

공용 Tree의 실제 export·renderNode 확장과 focus manager를 먼저 확인합니다.
AH row paint만 FileTreeEntry adapter로 교체하고 선택/펼침 키보드·장애물 없는 이벤트 흐름은 기존 engine과 공유합니다.
Search32와 tree viewport를 flex column으로 조합하고 viewport에 min-height:0/overflow:auto를 적용합니다.
한 viewport만 scrollTop을 소유하고 Scrollbar는 실제 측정값에 연결합니다.

31개 sample 데이터와 기본400×991px는 시각 비교 fixture로만 사용합니다.
서비스 없이 퍼블리싱 중이면 제품이 const mockData를 짧게 지연해 공급하는 단순 함수를 선택할 수 있으며 불필요한 HTTP 계층을 만들지 않습니다.
검색·파일 조회·권한·후속 파일 열기 명령은 Tree leaf에 숨기지 않고 제품 owner가 공급합니다.

검색/chevron/folder/file glyph는 [자산 관찰 기록](../../references/file-code-refresh.figma.json)의 FileTree assetBindings에서 실제 원본을 연결합니다.
파일 이름 확장자만으로 새 glyph를 추측하지 않고 제품이 정의한 아이콘 분류와 연결합니다.
