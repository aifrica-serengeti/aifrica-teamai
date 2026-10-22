# AgentHubMenuItem — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS 배치와 연결 순서**입니다. 동일 이름의 실제 제품 export가 이미 있다는 뜻은 아닙니다.
문서 기반 신규 구현에도 사용할 수 있지만 메뉴 실행·포지셔닝·요청까지 갖춘 완성 앱 예제는 아닙니다.

## 1. 기존 명령 항목을 확인합니다

1. 소비 저장소의 registry·source·public export에서 실제 MenuItem·submenu·명령 실행 host를 찾습니다.
   의미·keyboard·disabled·slot·스타일 연결점을 확인합니다. `unmapped`는 제품에 구현이 없다는 증거가 아닙니다.
2. 호환되면 adapter로 확장합니다. 없다면 [부모 Menu](../AgentHubMenu/implementation.md)의 가까운 범위에 새 export를 만듭니다.
   검증된 메뉴 primitive를 재사용하고 새 전역 keyboard/포지셔닝 시스템을 행마다 만들지 않습니다.
3. content만 실제 명령 host로 두고 선택적 header/divider는 그 밖에 조합합니다.
   기존 공용 Menu의 오른쪽 padding16·header32·divider 여백2를 이 시안의 값으로 일괄 상속하지 않습니다.
4. 실제 source/public export·지원 조합·제품 검증 결과를 로컬 mapping에 기록합니다.
   검증 전 source/export는 `unmapped`, 공유 채택 설정은 `draft`를 유지하며 serengeti 원본을 자동 복사하지 않습니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 문구·표시 slot·명령을 구분합니다

아래 TypeScript는 **제안 API**입니다. 기존 제품 API가 같은 책임을 소유하면 그 계약에 연결합니다.

```ts
export type AgentHubMenuItemProps = {
  id: string;
  label: string;
  intent?: "default" | "destructive";
  disabled?: boolean;
  showIcon?: boolean;
  iconName?: "edit";
  showValue?: boolean;
  valueText?: string;
  showCheck?: boolean;
  showChevron?: boolean;
  showSectionHeader?: boolean;
  sectionLabel?: string;
  showDivider?: boolean;
  onAction: (id: string) => void;
};
```

표시 Boolean은 기본 false로 연결합니다. `label`과 `sectionLabel`은 실제 TEXT property에 대응하지만,
`valueText`는 제품이 보조 문구를 받기 위한 제안입니다. Figma의 `value`는 Boolean이며 문자열 prop으로 자동 변환하지 않습니다.
제안은 실제 기본 원본 edit/16만 모델링합니다. preferred key62개를 제품의 검증된 icon 이름/API로 그대로 복사하지 않습니다.
다른 swap은 정확한 source·자산·크기·state paint를 추가 검증한 뒤 연결합니다.

`intent`는 시각적 명령 종류이며 HTML type이나 삭제 실행 정책이 아닙니다. 명령 ID·권한·confirmation·요청·중복 실행 방지·
성공/실패는 제품 owner가 소유합니다. showCheck는 glyph 표시이며 지속 선택·체크형 상태는 별도 의미 계약이 필요합니다.

## 3. 메뉴 primitive의 한 실행 경로에 연결합니다

```text
비상호작용 항목 묶음
├─ 표시할 때 그룹 header/label
├─ 기존 메뉴 primitive의 Item 또는 실제 SubTrigger
│  └─ 선택한 icon · label · value · check · chevron
└─ 표시할 때 비상호작용 Separator
```

실제 command primitive의 `onSelect`에서 guard 후 `onAction(id)`를 한 번 호출합니다.
primitive의 `disabled`도 같은 값에 연결하고 click·keydown·wrapper에서 같은 명령을 재실행하지 않습니다.
실제 submenu가 있는 항목은 SubTrigger로 연결하고 일반 command 실행과 겹치지 않게 합니다.
확정 동작·닫힘 유지·체크형 메뉴는 부모가 채택한 의미에 따라 기존 primitive로 연결합니다.

header·divider를 Item 안에 넣지 않습니다. 텍스트·SVG에도 별도 onClick/Tab을 주지 않습니다.
문구는 React의 문자열 텍스트처럼 평문으로 렌더하고 HTML로 주입하지 않습니다.
false branch는 DOM에서도 생략해 보이지 않는 glyph·label·빈 gap·focus 대상을 남기지 않습니다.

## 4. content와 비상호작용 branch를 배치합니다

다음은 **단일 줄 비교용 recipe**입니다. literal은 실측 비교값이며 제품 semantic/component token에 연결합니다.
부모가 실제 폭을 소유하고, standalone 비교 환경에서만 폭160px를 공급합니다.

```css
.hub-menu-item-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  min-width: 0;
}
.hub-menu-item-content {
  --item-main: #1c1c1c;
  --item-subtle: #757575;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  min-width: 0;
  padding: 4px 12px 4px 16px;
  border: 0;
  border-radius: 0;
  font: 400 14px/20px Pretendard, sans-serif;
  color: var(--item-main);
  background: transparent;
  transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease;
  outline: none;
  box-shadow: inset 0 0 0 2px transparent;
  overflow: hidden;
}
.hub-menu-item-content[data-intent="destructive"] { --item-main: #d00a0a; }
.hub-menu-item-content:hover:not([data-disabled]) { background: #f8f8f8; }
.hub-menu-item-content:active:not([data-disabled]) { background: #f4f4f4; }
.hub-menu-item-content[data-highlighted]:not(:hover):not([data-disabled]) {
  box-shadow: inset 0 0 0 2px var(--hub-menu-focus);
}
.hub-menu-item-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hub-menu-item-icon, .hub-menu-item-check {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  color: var(--item-main);
}
.hub-menu-item-value {
  flex: 0 0 auto;
  font: 400 12px/16px Pretendard, sans-serif;
  color: var(--item-subtle);
}
.hub-menu-item-chevron {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  color: var(--item-subtle);
}
.hub-menu-item-content[data-disabled] {
  --item-main: #aaaaaa;
  --item-subtle: #aaaaaa;
  background: transparent;
  box-shadow: none;
}
.hub-menu-item-header {
  box-sizing: border-box;
  padding: 8px 12px 4px 16px;
  font: 600 12px/16px Pretendard, sans-serif;
  color: #1c1c1c;
}
.hub-menu-item-divider { padding: 4px 0; }
.hub-menu-item-divider-line { height: 1px; background: #dddddd; }
@media (prefers-reduced-motion: reduce) {
  .hub-menu-item-content { transition: none; }
}
```

`--hub-menu-focus`는 공용의 inset focus 의무를 연결하는 제품 token이며 이 Figma에서 측정한 색상이 아닙니다.
선택한 primitive가 다른 disabled/highlight 속성을 사용하면 같은 의미의 실제 상태로 adapter를 연결합니다.
스타일만 바꾸고 실제 disabled 입력을 허용하지 않습니다. header와 divider는 content의 disabled 색상·opacity를 상속시키지 않습니다.
배경 전환200ms ease는 [공용 계승값](../../motion.md)입니다. 배경을 그리는 content에 직접 연결해 hover 진입·이탈을 보간하고
부모 popup의150ms presence와 구분합니다. 행을 재생성하거나 `transition:all`로 크기·focus ring까지 전환하지 않습니다.

header28px·divider9px는 숨김 구조의 수치로 계산됩니다. 기본 false에서는 둘 다 없는28px 항목이며,
모든 branch를 켠65px는 계산값입니다. 이 recipe로 표시 slot을 켠 경우의 폭·긴 value·교차 조합을 별도로 검사합니다.
value의 HUG 처리와 실제 문구 폭은 제품 제안이며 숨김 샘플29px를 모든 보조 값에 고정하지 않습니다.

## 5. 정확한 glyph와 state paint를 연결합니다

[edit16](../../assets/icons/edit/16.svg), [check16](../../assets/icons/check/16.svg),
[chevron-right16](../../assets/icons/chevron-right/16.svg)의 정확한 원본 도형·선1px·round를 연결합니다.
기존 asset의 기본색과 인스턴스 override는 구분합니다. 특히 chevron의 기본 파일 색상 #1C1C1C를
항목의 #757575/disabled #AAAAAA로 연결하고 destructive의 value/chevron까지 빨갛게 만들지 않습니다.

이미 상태색이 반영된 파일을 쓰려면 [자산 기록](../../references/menu.assets.json)의 `assets/menu/` SVG8개를 선택할 수 있습니다.
default는 edit/check/chevron 세 개, disabled는 세 개, destructive는 edit/check 두 개이며 활성 destructive의 chevron은
default의 #757575 파일을 함께 사용합니다. 이 파일들도 현재 숨김 slot의 원본 paint이며 기본 상태에 아이콘을 켜는 근거가 아닙니다.

제품의 inline SVG/semantic adapter에서 각 역할의 stroke를 연결합니다. 외부 SVG를 `img`로 불러온 뒤 부모 CSS color만 바꾸면
내부 stroke도 자동으로 바뀐다고 가정하지 않습니다. [자산 안내](../../assets.md)에 따라 제품 소유 경로를 사용하고 임시 Figma URL을 runtime에 두지 않습니다.
slot이 false면 자산 파일을 연결할 수 있다는 이유로 실제 아이콘을 렌더하지 않습니다.

[검증 항목](./verification.md)과 소비 저장소의 lint/typecheck/test/build를 실행합니다.
명령 한 번·disabled·keyboard/focus·전체 label·표시 branch·역할별 paint·제품이 채택한 submenu/체크 의미를 확인한 후 mapping을 갱신합니다.
정적 문서·숨김 paint·preferred key 목록만으로 실제 명령 실행과 전체 조합의 구현 완료를 선언하지 않습니다.
