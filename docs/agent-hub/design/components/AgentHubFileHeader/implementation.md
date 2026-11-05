# AgentHubFileHeader — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

다음은 **제품 조합 제안**이며 원본의 native property 목록이나 기존 구현 확인이 아닙니다.

```ts
type FileHeaderView = {
  title: string;
  files: readonly { id: string; label: string }[];
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
  onCloseFile: (id: string) => void;
  actions: readonly { id: string; label: string; disabled?: boolean; onRequest: () => void }[];
};
```

files가0개면 empty 제목, 그 외에는 탭을 렌더하고 실제 가용폭으로 overflow를 계산합니다.
콘텐츠 width와 버튼 group width를 분리 측정하며 ResizeObserver·폰트 대기·메뉴/닫힘 callback을 unmount에서 정리합니다.
content variant와 overflow를 제품 state 두 벌로 보관해 서로 어긋나게 만들지 않습니다.

AgentHubIconButton24/glyph16과 FileTab을 조합합니다. [자산 참조](../../references/file-code-refresh.figma.json)의 FileHeader assetBindings에서
pause·tree·more·expand·close·overflow의 실제 glyph를 찾아 연결합니다. 이름이 'icon/plus/24'인 pause 원본을 plus로 치환하지 않습니다.
로컬 원본 PNG fade는 styles의 회전 geometry와 pointer-events:none을 유지합니다.

more·overflow에서 Menu를 사용하는 제품은 그 메뉴 계약을 추가 dependency로 채택·매핑합니다.
이 header만으로 모든 소비자가 메뉴나 output viewer renderer를 이미 갖췄다고 가정하지 않습니다.
