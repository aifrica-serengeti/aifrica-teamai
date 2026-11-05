# AgentHubFileViewer — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

다음은 **제품 제안 API**입니다. source/export는 아직 unmapped이며 syntax highlighting·file loader가 이미 존재한다는 뜻이 아닙니다.

```ts
type FileViewerView = {
  fileId: string;
  pathText: string;
  sourceText: string;
  lines: readonly { id: string; text: string; indent: 0 | 1 | 2 | 3 }[];
  onCopy: (sourceText: string) => Promise<void>;
  onExpand: () => void;
};
```

실제 코드 renderer·syntax helper가 있으면 먼저 재사용하고 원본 텍스트와 표시 span의 대응을 제품 owner에 둡니다.
렌더된 HTML을 신뢰해 바로 주입하지 않고 기존 renderer의 안전한 escape/파싱 계약을 유지합니다.
줄·가이드 typography는 CodeLine 공개 adapter로12/20을 명시 연결하고 gutter68/indent16.8은 유지합니다.

root를 column/min-height0/min-width0로 조합합니다. path42는 고정, 본문은 남은 높이를 채우는 단일 code viewport로 구현할 수 있습니다.
정적 Figma 높이980과50개 sample은 비교 fixture로만 두며 긴 코드는 실제 스크롤로 접근합니다.
동일한 viewport에 AgentHubScrollbar를 조합하고 실제 scrollTop/Left와 측정값만 사용합니다.
actions overlay는 code-block right8/top8·gap4·바깥 radius8·backdrop-blur10px, 각 버튼24/radius4와 glyph16·white surface를 연결합니다.8px는3711:56693 container의 생성 CSS 값이고4px는 각 버튼의 값이므로 합치지 않습니다.

copy/maximize는 [자산 참조](../../references/file-code-refresh.figma.json)의 FileViewer bindings를 사용합니다.
scroll-corner의 실제 vector는 이번 생성 context에서 노출되지 않았으므로 임의 '접기/resize' glyph로 채우지 않습니다.
복사 피드백 타이머·이전 파일 요청·측정 observer는 해당 owner에서 정리하며 read-only leaf에 네트워크·확대 상태를 중복하지 않습니다.
