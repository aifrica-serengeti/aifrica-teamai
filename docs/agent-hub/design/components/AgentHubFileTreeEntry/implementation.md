# AgentHubFileTreeEntry — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

이것은 공용 Tree와 연결하는 **제품 제안**입니다. 기존 engine의 renderNode/row adapter를 먼저 확인하고 호환된다면 재사용합니다.
아래 입력은 Figma의 native 속성 정의가 아닙니다.

```ts
type FileTreeEntryView = {
  nodeId: string;
  label: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  selected: boolean;
  expanded?: boolean;
  onSelect: (nodeId: string) => void;
  onToggle?: (nodeId: string) => void;
};
```

root를 position:relative·h28·px4로 두고 배경24를 절대배치합니다.
행별 guide wrapper를 (level-1)개, 폭20·높이100%로 만들며 각 내부 선은 x12·폭1입니다.
guide 다음에는 항상 폭24px의 chevron 정렬 slot을 두고 content를 배치합니다. showChevron=false이거나 리프라서 onToggle이 없으면 slot 내부 glyph·버튼만 생략하고, 비상호작용 wrapper의 폭은 유지합니다. 빈 button이나 숨긴 Tab stop을 남기지 않습니다.
content는 flex1/min-width0/pl4, glyph는16·gap8, label은 원본 ellipsis를 사용합니다.
현재6단계 밖 깊이 처리는 제품별 필요가 있을 때 별도 계약으로 확장하고 Level7이 측정됐다고 기록하지 않습니다.

glyph는 [자산 참조](../../references/file-code-refresh.figma.json)의 FileTreeEntry bindings를 사용합니다.
폴더 화살표는 expanded 상태에 맞는 실제 원본을 연결하고 선택·hover 색 때문에 expand 값이 바뀌지 않게 합니다.
AgentHubIconButton24의 접근성·입력 차단과 공용 Tree 선택/토글 경계를 보존합니다.
공용 Tree 원본 저장소를 수정하거나 AH 전용 connector를 모든 Tree의 기본값으로 퍼뜨리지 않습니다.
