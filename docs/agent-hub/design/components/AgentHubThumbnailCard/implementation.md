# AgentHubThumbnailCard — 구현 연결

다음은 **제안 API·CSS recipe**입니다. 기존 제품 export나 Figma의 실제 TEXT/IMAGE 속성을 의미하지 않습니다.
기존 Thumbnail/Card와 목록 활성화 owner를 먼저 찾고 호환되면 adapter로 재사용합니다. 없으면 제품 기능 범위에 새 export를 개발합니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/components/Card/README.md`를 함께 적용합니다.

아래 시각 recipe에도 [공용 Card 색상 모션](../../cards.md#공용-색상-모션-계승)을 함께 연결합니다.
root의 background-color/border-color/box-shadow/color와 텍스트 color에200ms ease를 적용하고,
pseudo border·상태 표면은 변하는 속성만 지정합니다. reduced motion을 명시적으로 해제하며 geometry·SVG src에는 새 모션을 만들지 않습니다.

```ts
export type AgentHubThumbnailCardProps = {
  itemId: string;
  title: string;
  metaText: string;
  descriptionText: string;
  showDescription: boolean;
  showThumbnail: boolean;
  thumbnail?: { src: string; alt: string };
  showDot: boolean;
  dotDescription?: string;
  selected: boolean;
  disabled: boolean;
  onActivate?: (itemId: string) => void;
};
```

showThumbnail/showDot/showDescription은 실제 Boolean에 대응하는 제안 이름입니다.
표시 문자열·이미지·selected/disabled·활성화 결과는 제품이 제어하며 내부에서 독립 상태를 만들지 않습니다.
thumbnail이 없고 showThumbnail=true이면 원본 회색 placeholder를 표시합니다. 이 분기를 loading/error로 단정하지 않습니다.
이미지 src/alt·선택 의미·dotDescription은 제품 제안이며 원본에 같은 property가 있다고 기록하지 않습니다.

표시 전용은 비대화형 목록 내용으로, onActivate가 있으면 제품의 한 native action host로 연결합니다.
button recipe에서는 내부 문구를 span 등 유효한 비대화형 콘텐츠로 구성하고 click에서 disabled guard 후 한 번만 호출합니다.
선택 또는 link 패턴을 별도로 채택하면 그 패턴의 host·상태를 사용하며 이 button 경로와 중첩하지 않습니다.
dot/thumbnail/description에 별도 handler를 등록하지 않습니다.

```text
단일 host / border 소유 root
├─ showThumbnail: placeholder 또는 제품 이미지
└─ content
   ├─ title-row: title + showDot일 때 장식 dot SVG
   ├─ metaText
   └─ showDescription일 때 descriptionText
```

아래 width100%는 부모가 폭을 정한다는 뜻입니다. standalone 비교 host만324px로 만들며 제품 grid에 고정 최대 폭을 강제하지 않습니다.

```css
.hub-thumbnail-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 0;
  gap: 0;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 12%), 0 0 8px 0 rgb(9 30 66 / 16%);
  text-align: left;
}
.hub-thumbnail-surface { overflow: clip; }
.hub-thumbnail-card:hover:not([data-disabled]):not([data-selected]) {
  background: #f8f8f8;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
}
.hub-thumbnail-card:active:not([data-disabled]):not([data-selected]) {
  background: #f4f4f4;
  box-shadow: 0 0 1px 0 rgb(9 30 66 / 31%), 0 4px 6px 0 rgb(9 30 66 / 15%);
}
.hub-thumbnail-card[data-selected]:not([data-disabled]) { background: #ebf3ff; border-color: #3b82f6; }
.hub-thumbnail-frame {
  box-sizing: border-box;
  flex: 0 0 auto;
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 0;
  border-bottom: 1px solid #eee;
  background: #f4f4f4;
  overflow: hidden;
}
.hub-thumbnail-image { display: block; width: 100%; height: 100%; object-fit: cover; }
.hub-thumbnail-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  min-width: 0;
  padding: 16px;
  overflow: clip;
}
.hub-thumbnail-title-row { display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; }
.hub-thumbnail-title {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1c1c1c;
  font: 600 16px/24px Pretendard, sans-serif;
}
.hub-thumbnail-dot { display: block; flex: 0 0 8px; width: 8px; height: 8px; }
.hub-thumbnail-meta { margin: 0; color: #757575; font: 400 12px/16px Pretendard, sans-serif; white-space: nowrap; }
.hub-thumbnail-description {
  align-self: stretch;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin: 0;
  overflow: hidden;
  color: #555;
  font: 400 14px/20px Pretendard, sans-serif;
}
.hub-thumbnail-card[data-disabled] .hub-thumbnail-title,
.hub-thumbnail-card[data-disabled] .hub-thumbnail-meta,
.hub-thumbnail-card[data-disabled] .hub-thumbnail-description { color: #aaa; }
```

root에 `hub-thumbnail-surface`도 적용하는 기본 구조는 원본 clipping을 보존합니다.
실제 focus outline을 자른다면 검증한 wrapper/outline adapter에서 처리하고 카드 외곽 border를 중복하지 않습니다.
border-box의 thumbnail은322px 내부 폭에서241.5px이며 아래 선1px가 그 높이에 포함됩니다.
단순 border를 추가해242.5px로 늘리지 않습니다. content의 기본100px와 root343.5px는 샘플 HUG 결과입니다.

제공 dot은 [자산 기록](../../references/card.assets.json)의 enabled/disabled SVG를 img로 연결하고 `alt=""`·`aria-hidden="true"`로 숨깁니다.
disabled에서 정확한 #AAA 자산을 선택하며 CSS 원·opacity·부모 color로 다시 그리지 않습니다.
실제 thumbnail 이미지는 제품 데이터입니다. 위 object-fit:cover는 제품 예시 정책이며 원본에 이미지 자르기가 측정됐다는 뜻이 아닙니다.
meta의 긴 문구와3줄 설명·이미지 로딩/실패·좁은 폭은 실제 콘텐츠로 검증합니다.

data-selected/data-disabled는 false일 때 속성을 제거합니다. 선택을 hover/pressed보다 유지하는 것은 **제안 우선순위**이며 교차 상태 실측이 아닙니다.
native disabled와 실제 handler guard를 함께 연결하고 자식 opacity0.4·선택 inset1px를 추가하지 않습니다.
표시 false branch는 렌더하지 않고 해당 gap을 남기지 않습니다. 모션·focus·추가 시각은 제품에서 채택한 근거로 검증합니다.
[접근성](./accessibility.md)·[검증](./verification.md)과 제품 실행 검사를 마친 뒤 source/public export를 매핑하며 `unmapped`/`draft`를 유지합니다.
