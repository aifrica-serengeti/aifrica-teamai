# AgentHubFileTab — 제품 구현 연결

[문서 인덱스](./README.md) · [Figma 관찰 기록](../../references/file-code-refresh.figma.json)

**공용 Tab 엔진에 연결하는 제품 제안**입니다. 공용 문서의 일반 예제는 close callback 구현을 포함하지 않으므로 필요한 closable adapter를 소비 제품에서 구현·검증합니다.

```ts
type FileTabView = {
  fileId: string;
  label: string;
  active: boolean;
  onSelect: (fileId: string) => void;
  onClose: (fileId: string) => void;
};
```

상위 tablist 안의 각 wrapper를 비의미 묶음으로 두고 label trigger(role=tab)와 close native button을 형제로 조립합니다.
현재 값과 열린 목록을 wrapper의 독립 useState로 다시 만들지 않습니다. select/close handler와 키보드 엔진의 이벤트 경계를 확인합니다.
Header가 외부 panel을 조립하면 trigger의 aria-controls와 panel의 id, aria-labelledby를 명시 연결합니다.
API 타입과 상태 helper는 제품 아키텍처의 각 owner 디렉토리에 둡니다.

닫기 glyph는 [확인한16px 원본](../../assets/refresh-20261105/69378c611830169616b9ffd14c21cdaad1180956.svg)을 연결합니다.
AgentHubIconButton의24px target과 glyph16px, hover/pressed/focus·reduced-motion을 함께 재사용하며 단순 사설 CSS class만 native div에 붙이지 않습니다.
