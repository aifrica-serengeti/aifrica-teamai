# AgentHubNavIcon — 정확한 자산 연결

아래는 **제안 API·배치 recipe**이며 실제 제품 export나 Figma 색상 prop이 아닙니다.
소비 저장소의 자산 adapter를 먼저 확인하고 호환되면 재사용합니다. 없으면 전용 glyph4종을 연결하는 가장 좁은 export를 개발합니다.

```ts
// 실제 제품의 공개 이름과 자산 방식에 맞춰 연결하는 제안입니다.
export type AgentHubNavIconProps = {
  icon: "home" | "book" | "clock" | "search";
  tone: "neutral" | "selected";
};
```

`icon`은 실제 원본 enum에 대응하지만 `tone`은 제품 adapter 제안입니다.
원본 set의 neutral4종과 실제 selected clock/home를 구분하고, 제공 자산의 다른 blue glyph를 전체 상태 실측으로 기록하지 않습니다.
[자산 manifest](../../references/snb.assets.json)의 전체28px 도형·색상·출처에 맞는 제품 소유 경로를 연결합니다.
부분 path·일반24px 아이콘의 확대·임시 Figma URL을 runtime에 사용하지 않습니다.

```css
.hub-nav-icon {
  display: block;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
}
```

원본의 정적 비교용 img는 정확한28px 파일에 연결하고 `alt=""`·`aria-hidden="true"`로 숨깁니다.
원본 frame에 없던 배경·선·shadow·padding을 추가하지 않습니다. 부모의 color 변경만으로 외부 SVG fill이 바뀐다고 가정하지 않습니다.
색상을 semantic SVG로 연결한다면 실제 fill과 geometry를 함께 검증하고 그 adapter 근거를 로컬에 기록합니다.

NavItem은 이 glyph를 한 host 안에 배치합니다. NavIcon에는 handler나 내부 selected state를 만들지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`의 실제 source/export 확인 절차를 적용합니다.
자산·렌더·부모 host 접근성을 검증한 뒤 mapping을 기록하며 그 전에는 `unmapped`/`draft`를 유지합니다.

## 현재 구현 recipe: 단일 mask와 색상 보간

위 정적 자산 비교와 별개로 runtime은 neutral 원본 SVG 하나를 alpha mask로 연결합니다.
mask URL은 glyph 종류로만 정하고 선택값으로 교체하지 않습니다. home/clock selected 원본은 geometry·paint 대조 근거로 보존합니다.
book/search의 selected blue는 실측 전체 matrix가 아닌 제품 채택임을 유지합니다.

```css
.hub-nav-icon {
  display: block;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  color: #757575;
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 28px 28px;
  transition: color 200ms ease;
}
.hub-nav-icon[data-selected="true"] { color: #3b82f6; }
@media (prefers-reduced-motion: reduce) {
  .hub-nav-icon { transition: none; }
}
@media (forced-colors: active) {
  .hub-nav-icon,
  .hub-nav-icon[data-selected="true"] {
    color: CanvasText;
    forced-color-adjust: none;
  }
}
```

정확한 원본 경로를 `mask-image`로 전달하고 장식 host는 `aria-hidden="true"`로 둡니다.
별도 두 색 레이어를 동시에 fade하여 중간 프레임에서 도형이 반투명해지지 않게 합니다.
forced-colors에서는 선택 selector까지 같은 우선순위로 시스템색을 적용합니다. mask의 가시성,
선택 host의 시스템색 outline·current 의미를 함께 확인합니다.
