# AgentHubFlyoutHeader — 구현 연결

기존 제목·개수·설명 조합을 source/public export에서 먼저 비교하고, 호환되면 재사용합니다.
없으면 Flyout 기능의 가까운 범위에 새 export를 만들 수 있습니다. MenuLabel·TooltipHeader 원본 재사용을 주장하지 않습니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`의 구현·검증 순서를 적용합니다.

아래는 **제품 제안 API**이며 동일한 export가 이미 있다는 뜻은 아닙니다.

```ts
export type AgentHubFlyoutHeaderProps = {
  title: string;
  countText: string;
  meta: string;
  titleId?: string;
  descriptionId?: string;
  withDivider?: boolean; // 기본 false, shell에서만 true
};
```

표시 문자열은 실제 TEXT 속성과 연결할 수 있지만 API 이름과 id는 제품 제안입니다.
countText는 제품의 집계·locale adapter에서 만들고 평문으로 렌더합니다. 제목·설명은 부모가 채택한 이름 관계에 연결합니다.

```text
비대화형 Header
├─ title-group: title(id=titleId) + countText
├─ meta(id=descriptionId)
└─ 선택적 장식 구분선(::after, flex 자식 아님)
```

```css
.flyout-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.flyout-header-title-group { display: flex; align-items: center; gap: 6px; }
.flyout-header-title { font: 600 14px/20px Pretendard, sans-serif; color: #1c1c1c; }
.flyout-header-count { font: 400 14px/20px Pretendard, sans-serif; color: #757575; }
.flyout-header-meta {
  align-self: stretch;
  margin: 0;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #757575;
  white-space: normal;
}
.flyout-header[data-with-divider="true"] {
  position: relative;
  padding-bottom: 17px;
}
.flyout-header[data-with-divider="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 1px;
  background: #ddd;
  pointer-events: none;
}
```

literal은 Light 비교용이며 제품 token에 연결합니다. 폭은 부모의 내부 폭에 맞추고54px나 title-group68px를 고정하지 않습니다.
제목을 heading으로 채택하면 브라우저 기본 margin을 제거하고 부모가 정한 heading 단계를 유지합니다.
긴 제목의 배치·줄바꿈과 큰 count는 별도 제품 정책으로 검증하며 원본 한 줄의 지원 범위로 확대하지 않습니다.

`withDivider`는 후속 사용자 요청으로 채택한 조립 API입니다. false이면 standalone54px을 유지하고,
shell은 true로 연결해 내용54px+구분9px=63px을 확보합니다. seam은 원래 bottom8에9를 더한 padding17과
pseudo-element로 표현하여 flex gap2를 추가하지 않습니다. body ScrollArea content 안에는 divider를 렌더하지 않습니다.
280×398에서는 Header y5..68와 선 y63..64, viewport y68..365, Footer y365..398을 대조합니다.

meta 높이가 늘면 [Flyout](../AgentHubFlyout/implementation.md)이 Header·Footer·목록 공간을 함께 조정합니다.
이 부품에 별도 count 요청·키보드 handler·live region·열림 상태를 만들지 않습니다.
[검증 항목](./verification.md)과 실제 제품 검사를 마친 뒤 source/public export를 로컬 mapping에 기록합니다.
공유 설정은 `draft`, 미검증 제품 mapping은 `unmapped`로 유지합니다.
