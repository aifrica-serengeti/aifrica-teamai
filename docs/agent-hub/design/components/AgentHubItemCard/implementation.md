# AgentHubItemCard — 구현 연결

다음은 **제안 API·DOM·CSS recipe**입니다. 기존 제품 export나 실행 가능한 대화/고정/메뉴 API가 아닙니다.
먼저 소비 저장소의 카드·항목 조회·대화·고정·명령 owner를 찾고, 호환되면 adapter로 연결합니다.
없으면 해당 기능 범위에 새 export를 개발하고 실제 source/public export를 검증합니다.
공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.
공용을 끄면 제품 자체 절차를 사용하고 이 catalog와 공용 문서의 존재를 요구하지 않습니다.

아래 시각 recipe에도 [공용 Card 색상 모션](../../cards.md#공용-색상-모션-계승)을 함께 연결합니다.
root의 background-color/border-color/box-shadow/color와 텍스트 color에200ms ease를 적용하고,
pseudo border·상태 표면은 변하는 속성만 지정합니다. reduced motion을 명시적으로 해제하며 geometry·SVG src에는 새 모션을 만들지 않습니다.

## 1. 표시와 각 명령을 독립적으로 받습니다

```ts
type ItemCardTool = {
  id: string;
  name: string;
  imageUrl: string;
  displayWidth: number;
  displayHeight: number;
};
export type AgentHubItemCardProps = {
  itemId: string;
  title: string;
  meta: string;
  description?: string;
  showDescription?: boolean;
  showDot?: boolean;
  dotDescription?: string;
  showTools?: boolean;
  tools: readonly ItemCardTool[];
  selected: boolean;
  disabled: boolean;
  appearance?: "default" | "accent";
  pinAction?: { pinned: boolean; label: string; onRequest: (id: string, pinned: boolean) => void };
  onOpen: (id: string) => void;
  onMore: (id: string) => void;
  onChat: (id: string) => void;
};
```

제품 문자열 API는 Figma의 TEXT property 추출 결과가 아닙니다.
showDot/showDescription/showTools와 pinAction의 표시 정책을 실제 Boolean에 대응시키되,
선택·강조·입력 비활성·고정 값을 각각 관리합니다. hover/pressed는 입력에서 파생하며 요청 state enum으로 저장하지 않습니다.
dot을 표시할 때 의미가 있다면 실제 dotDescription을 제공하고, 단순 장식이면 접근성 탐색에서 숨깁니다.

pinAction은 제안 기능 계약입니다. 원본 pin은 hovered/pressed에만 존재하며 실제 pinned 값은 없습니다.
제품은 focus-within·touch·고정 후 조작을 포함한 접근 가능한 표시 정책을 따로 채택합니다.
onMore가 메뉴를 여는지, onOpen이 선택/탐색 중 무엇을 하는지, onChat의 대화 진입·권한·요청 수명은 제품이 명시합니다.

## 2. 복합 카드의 control을 형제로 배치합니다

```text
article 또는 li 안 카드 (native button으로 전체를 감싸지 않음)
├─ content
│  ├─ header
│  │  ├─ info: title-row(제목의 main action + 장식 dot) + meta
│  │  └─ absolute more: actual ghost20
│  └─ showDescription일 때 description
└─ footer
   ├─ showTools일 때 비대화형 tool-logo 데이터들
   └─ actions: 채택한 표시 정책의 pin24 + chat24
```

main/more/pin/chat은 각각 native button 또는 실제 의미에 맞는 link이며 서로 중첩하지 않습니다.
각 click에서 disabled를 확인한 뒤 대응 callback만 한 번 실행하고 Enter/Space keydown에서 같은 명령을 재호출하지 않습니다.
pin은 onRequest(itemId, !pinned) 한 번만 전달하고 카드 내부에서 서버 성공을 가정해 저장하지 않습니다.
원본의24px FRAME control은 native host로 구현하되 실제 IconButton24 인스턴스를 재사용했다고 기록하지 않습니다.

카드 전체 hit area가 필요하면 형제 control의 조작과 충돌하지 않는 검증된 composite/stretched action을 제품이 채택합니다.
일반 div의 click과 native 제목 button을 중복 연결하거나 wrapper 전체를 keydown button으로 만들지 않습니다.

## 3. 원본 geometry와 상태를 연결합니다

literal은 Light 실측 비교값이며 제품 semantic/component token에 연결합니다.324px는 비교 환경에서 부모가 공급합니다.

```css
.hub-item-card {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  width: 100%;
  min-width: 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 24px;
  background: #fff;
  box-shadow: none;
  color: #1c1c1c;
  font-family: Pretendard, sans-serif;
}
.hub-item-card[data-visual="hovered"], .hub-item-card[data-visual="pressed"] {
  box-shadow: 0 0 1px rgb(9 30 66 / 31%), 0 4px 6px rgb(9 30 66 / 15%);
}
.hub-item-card[data-visual="hovered"] { background: #f8f8f8; }
.hub-item-card[data-visual="pressed"] { background: #f4f4f4; }
.hub-item-card[data-visual="selected"] { background: #ebf3ff; border-color: #3b82f6; }
.hub-item-card[data-visual="accent"] { background: #ebf3ff; border-color: rgb(255 255 255 / 0%); }
.hub-item-content { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.hub-item-header { position: relative; display: flex; align-items: center; gap: 12px; min-width: 0; }
.hub-item-info { display: flex; flex: 1 1 auto; flex-direction: column; justify-content: center; gap: 4px; min-width: 0; }
.hub-item-title-row { display: flex; align-items: center; align-self: flex-start; gap: 8px; min-width: 0; }
.hub-item-title { margin: 0; color: #1c1c1c; font: 600 16px/24px Pretendard, sans-serif; }
.hub-item-meta { margin: 0; color: #757575; font: 400 12px/16px Pretendard, sans-serif; }
.hub-item-description { margin: 0; min-width: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; max-height: 40px; overflow: hidden; color: #555; font: 400 14px/20px Pretendard, sans-serif; }
.hub-item-dot { display: block; flex: 0 0 8px; width: 8px; height: 8px; }
.hub-item-more { position: absolute; top: 0; right: 0; width: 20px; height: 20px; }
.hub-item-more img { display: block; width: 16px; height: 16px; }
.hub-item-footer { display: flex; align-items: center; justify-content: space-between; min-width: 0; }
.hub-item-tools { display: flex; align-items: center; gap: 7px; }
.hub-item-tool {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 7.5px;
  border-radius: 4px;
  background: #eee;
}
.hub-item-tool img { display: block; flex: 0 0 auto; max-width: none; object-fit: cover; }
.hub-item-actions { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.hub-item-action24 { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0; border: 0; border-radius: 4px; background: transparent; }
.hub-item-action24 img { display: block; width: 16px; height: 16px; }
.hub-item-card[data-visual="disabled"] .hub-item-title,
.hub-item-card[data-visual="disabled"] .hub-item-meta,
.hub-item-card[data-visual="disabled"] .hub-item-description { color: #aaa; }
.hub-item-card[data-visual="disabled"] .hub-item-tool img { filter: grayscale(1); }
```

data-visual은 원본 6종 비교용 파생값입니다. 실제 selected/disabled/appearance와 입력 상태가 충돌할 때의
우선순위는 제품이 명시해 검증하며 위 CSS를 완전 교차 상태의 실측값으로 취급하지 않습니다.
disabled는 실제 button/link의 입력도 차단하고 more/dot/chat 자산을 disabled paint로 바꿉니다. root opacity를 낮추지 않습니다.

main action의 button reset·heading margin을 제품 primitive에 맞추고 title16/24·기본 HUG를 유지합니다.
긴 제목이 more와 겹치지 않게 우측 공간 예약·제목 생략/줄바꿈을 제품 확장으로 정합니다.
description은 HUG/maxHeight40/maxLines null이며 샘플20px 또는 Finder의40px 두 줄로 구성됩니다.
최대 높이40px와 ENDING 의도를 제품의 두 줄 생략 adapter에 연결하고 실제 폰트·폭·전체 내용 접근 경로를 검증합니다.
위 CSS의 두 줄 clamp는 lineHeight20·maxHeight40·ENDING을 연결하기 위한 제안 adapter이며 Figma maxLines가2라는 뜻은 아닙니다.
카드 전체 height146을 고정하거나 임의3줄을 채택하지 않습니다.
tools=false는 그룹을 제거하고 actions의 margin-left:auto로 우측 배치를 보존합니다.
24px 타일 안 로고의 실제 표시 크기는 데이터별16.5×13.1175/15×15이며 이미지에 명시적으로 공급합니다.

## 4. 정확한 원본 자산과 필터를 연결합니다

[자산 기록](../../references/card.assets.json)의 native dot8·more16·chat16과 완성 pin16을 제품 소유 경로에 연결합니다.
pin-hovered16에는 실제 회전이 이미 반영됐습니다. fragment를 늘리거나 CSS rotate를 더하지 않습니다.
more는 기존 ghost20을 유지하고 해당 source24→actual16 glyph의 실제 선1px·paint를 보존합니다.

현재 두 도구 PNG는 샘플 데이터이며 제품의 실제 도구 이미지로 교체할 수 있습니다.
원본 imageHash와 일치한 일반 PNG에 disabled saturation−1을 연결하는 grayscale adapter를 사용합니다.
제공된 disabled32px placeholder를 도구 로고로 재사용하거나 다른 로고를 임의 제작하지 않습니다.
원본 PNG의 이미지 수명/확대·대체 텍스트·필터 렌더 결과는 소비 제품에서 검증합니다.
정확한 SVG의 stroke가 img 부모 CSS color로 바뀐다고 가정하지 않습니다.

[검증](./verification.md)과 실제 제품 검사 후 source/public export·token/asset adapter·추가 상태 근거를 로컬 mapping에 기록합니다.
확인 전 `unmapped`/`draft`를 유지하고 serengeti 원본을 수정하지 않습니다.
