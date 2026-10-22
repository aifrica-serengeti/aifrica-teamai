# AgentHubFlyoutItem — 새 구현과 기존 구현 연결

다음은 **제안 API·배치 recipe와 연결 순서**입니다. 동일 이름의 실제 제품 export가 있다는 뜻은 아닙니다.
정적 Figma와 문서만으로 파일 요청·선택 확정·트리 탐색까지 구현된 앱 예제로 취급하지 않습니다.

## 1. 기존 행과 상태 owner를 확인합니다

1. 소비 저장소의 registry·source·public export에서 실제 파일 선택 행·목록 primitive를 찾습니다.
   단순 파일 열기인지 선택인지, focus manager와 선택 owner가 어디에 있는지 확인합니다.
   폴더 recipe에서는 부모 expanded owner·공유 disclosure helper도 찾고, 실제 Tree를 채택할 때만 Tree focus manager를 찾습니다.
   `unmapped`는 제품에 구현이 없다는 증거가 아닙니다.
2. 의미가 호환되면 기존 행에 스타일·자산 adapter를 연결합니다. 없다면 [부모 Flyout](../AgentHubFlyout/implementation.md)의 가까운 범위에
   가장 좁은 새 export를 만들고, 제품이 채택한 목록 primitive와 focus owner를 연결합니다.
   폴더는 native disclosure 목록으로 연결하며 별도 Tree 의미를 채택한 제품에서만 Tree primitive를 검토합니다.
3. 이 시안의 시각값을 사용합니다. 공용 Tree의 행32/40px·r4·connector·marker·선택 막대나 MenuItem의14/20px label을 섞지 않습니다.
   실제 Button·Tree 인스턴스 재사용이 아닌 의미 채택이며, 폴더의 기본 file-text source도 보존합니다.
4. 실제 source/public export·지원 조합·제품 검증을 로컬 mapping에 기록합니다.
   검증 전 source/export는 `unmapped`, 공유 설정은 `draft`를 유지하고 serengeti 원본을 자동 복사하지 않습니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 정적 종류와 파일 명령을 분리합니다

다음은 **제품 제안 API**입니다. 원본의 kind는 시각 종류이며 실제 tree·펼침 API가 아닙니다.

```ts
export type AgentHubFlyoutItemProps = {
  id: string;
  label: string;
  kind: "item" | "folder" | "folder-open" | "child";
  countText?: string;
  showMeta?: boolean;
  metaText?: string;
  selected?: boolean; // 실측은 item만, child selected는 별도 채택
  disabled?: boolean;
  expanded?: boolean;
  controlsId?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
  onActivate?: (id: string) => void;
};
```

위 props는 행의 표시·의도 API입니다. 부모 [FlyoutEntry/disclosure 계약](../AgentHubFlyout/implementation.md)에서 선택적인 children과 펼침 상태를 소유합니다.
평면 item 목록에는 disclosure가 필요 없습니다. 폴더가 있으면 부모 owner를 제공하고 children:[]도 폴더로 취급합니다.
행은 expanded에서 folder/folder-open을 파생하며 자식 region의 생성·정리와 scroll 노출은 부모 adapter가 맡습니다.
standalone 정적 chevron이나 들여쓰기가 실제 펼침을 제공한다고 기록하지 않습니다.
showMeta는 기본true이며 표시할 때 실제 문구를 제공합니다. 원본 selected 실측은 item에만 있습니다.
후속 폴더 recipe에서는 child 파일에도 기존 item의 `#EBF3FF`와 `aria-pressed`를 재사용하는 채택값을 적용합니다.
folder selected/pressed를 자동 생성하거나 child selected를 Figma 실측으로 기록하지 않습니다.

## 3. 한 활성화 경로를 연결합니다

정보 표시만 하는 참조는 일반 비대화형 host입니다. 실제 파일 명령을 제공할 때만 native button type=button을 사용하고,
disabled guard 후 onActivate(id)를 한 번 호출합니다. Enter/Space를 별도 keydown에서 재호출하지 않습니다.
기본 Flyout의 방향키·focus 노출은 부모의 한 목록 owner와 ScrollArea handle이 담당합니다.

kind=folder-open은 표시 값입니다. 폴더 조립 adapter는 부모의 expandedIds와 onExpandedChange를 연결하고,
폴더 native 버튼에 aria-expanded·aria-controls를 부여합니다. 폴더 활성화는 펼침만, 파일 활성화는 선택만 요청합니다.
자식은 중첩 ul로 구성하고 Session/SNB와 같은 AnimatedDisclosure helper에 높이250ms·focus 복귀·inert·취소 처리를 맡깁니다.
owner가 없는 폴더나 disabled 폴더는 조작을 차단합니다. Tree 역할·Tree 키보드·폴더 요청을 암묵적으로 만들지 않습니다.
expanded·controlsId·buttonRef는 이 adapter의 native 버튼·focus 복귀 연결점입니다. 자체 펼침 state나 두 번째 Tab 조작을 만들지 않습니다.
meta=false는 문구와 gap·읽기 요소도 제거합니다. 문자열은 평문으로 렌더합니다.

## 4. 시각 행과 가변 텍스트를 배치합니다

다음은 **단일 줄 비교용 CSS recipe**입니다. 값은 실측 비교용이며 제품 semantic/component token에 연결합니다.
부모가 실제 폭을 제공하고 standalone 비교 환경에서만280px를 공급합니다.
button 또는 treeitem 등 실제 host 선택은 앞 단계의 의미 설계를 따릅니다.

```css
.hub-flyout-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  height: 28px;
  padding: 0 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease;
  outline: none;
  box-shadow: inset 0 0 0 2px transparent;
  color: #1c1c1c;
  font: 400 12px/16px Pretendard, sans-serif;
  text-align: left;
}
.hub-flyout-item[data-kind="folder"],
.hub-flyout-item[data-kind="folder-open"] { padding-right: 16px; }
.hub-flyout-item[data-kind="child"] { padding: 0 16px 0 56px; }
.hub-flyout-item:hover:not(:disabled):not([aria-disabled="true"]):not([data-disabled]):not([data-selected]) {
  background: #f8f8f8;
}
.hub-flyout-item[data-kind="item"]:active:not(:disabled):not([aria-disabled="true"]):not([data-disabled]):not([data-selected]) {
  background: rgb(0 0 0 / 10%);
}
.hub-flyout-item[data-kind="item"][data-selected],
.hub-flyout-item[data-kind="child"][data-selected] { background: #ebf3ff; }
.hub-flyout-item:focus-visible { outline: none; }
.hub-flyout-item:focus-visible:not(:hover):not(:disabled):not([data-disabled]) {
  box-shadow: inset 0 0 0 2px var(--hub-flyout-focus);
}
.hub-flyout-item-glyph {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
}
.hub-flyout-item-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hub-flyout-item-count, .hub-flyout-item-meta {
  flex: 0 0 auto;
  color: #757575;
  white-space: nowrap;
}
.hub-flyout-item-meta { color: #3b82f6; }
@media (prefers-reduced-motion: reduce) {
  .hub-flyout-item { transition: none; }
}
```

standalone data-kind는 명시한 정적 kind에 연결합니다. 실제 폴더 조립에서는 부모 expanded에서 folder/folder-open을 파생합니다.
data-selected는 false일 때 속성 자체를 제거하는 recipe입니다.
선택 배경을 hover/pressed보다 유지하는 선택은 공용 선택 의미를 적용한 **제안 우선순위**이며 원본 교차 상태 실측이 아닙니다.
`--hub-flyout-focus`는 제품/채택한 공용 focus token이고 이 Figma에서 확인한 색상이 아닙니다.
추가 disabled는 실제 host와 handler를 차단하고 미측정 시각 정책은 제품 근거로 정합니다. 값만 저장하고 입력을 허용하지 않습니다.
정적 div로 표시하는 경우에도 같은 disabled를 `data-disabled`에 연결해 hover 조건에서 제외합니다.
배경 transition은 실제 행에 직접 지정합니다. hover 진입·이탈200ms ease는 [공용 계승값](../../motion.md)이며
부모 popup의150ms presence와 별개입니다. 기존 item pressed/selected 우선순위를 유지하고 행을 재생성하지 않습니다.

기본 row는 clip하지 않고 label만 ellipsis 처리합니다. 실제 count/meta가 길 때 전체 정보를 잃지 않도록 제품이 폭 제한·줄바꿈·보조 정보 배치를 정합니다.
그때 높이를 늘리거나 반응형 배치를 바꾸는 것은 새 제품 제안으로 검증하며, 원본28px에 문구를 겹치거나 잘라 넣지 않습니다.
선택된 item/child에 Tree의2px 막대를 덧붙이거나 별도 child 아이콘·connector를 만들지 않습니다.
직접 child는 원본 L56을 유지합니다. 그보다 깊은 계층은 depth당 추가24px 들여쓰기를 채택하며 이는 추가 runtime 배치입니다.

## 5. 정확한 자산과 부모 모션을 연결합니다

[자산 기록](../../references/flyout.assets.json)의 file-text16·chevron-right16·chevron-down16을 연결합니다.
file-text의 native20 원본·표시16 box와 실제 export를 보존하고, 선 두께를20→16 비율만으로 다시 계산하지 않습니다.
file-text는 #757575, chevron은 #1C1C1C이며 부모의 label 색 하나로 모두 덮어쓰지 않습니다.
외부 SVG를 img로 불러온 뒤 CSS color만 바꾸면 내부 stroke가 변한다고 가정하지 않습니다.
[자산 안내](../../assets.md)에 따라 제품 소유 자산 경로로 연결하고 임시 Figma URL을 runtime에 사용하지 않습니다.

패널의 기존 Menu 모션 재사용은 [부모 모션 계약](../AgentHubFlyout/motion.md)을 연결합니다.
폴더 조립에서는 [후속 채택 모션](../AgentHubFlyout/motion.md#폴더-펼침접힘-채택)을 함께 연결합니다.
동일한 down glyph 하나를 open0°↔closed−90°로200ms ease 회전하며 버튼 hit area와 focus ring은 회전하지 않습니다.
원본 right/down 자산 기록은 보존하되 runtime에서 source 교체를 애니메이션으로 간주하지 않습니다.

[검증 항목](./verification.md)과 소비 저장소의 lint/typecheck/test/build를 실행하고,
실제 선택/확장·keyboard·focus·접힌 자식·단일 callback·긴 이름·추가 상태를 확인한 뒤 mapping을 갱신합니다.
정적 문서 수신과 자산 export만으로 consuming repository의 구현 완료를 선언하지 않습니다.
