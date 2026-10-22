# AgentHubPickerFooter — 기존 구현과 신규 구현 연결

아래는 **제안 API와 배치 recipe**입니다. 동일 이름의 실제 제품 export가 있거나 showLink가 Figma root 속성이라는 뜻은 아닙니다.
기존 Picker footer를 먼저 비교하고, 호환 구현이 없으면 소비 저장소의 가까운 기능 범위에 새 export를 만들 수 있습니다.
공용을 켠 UI 작업에서는 `DOCS_ROOT/frontend/design/component-workflow.md`의 재사용·구현·검증 절차를 적용합니다.

## 1. 실제 소유권을 연결합니다

1. Picker의 탐색·선택 owner와 키보드 정책을 먼저 확인합니다. Footer는 그 동작의 안내를 표시합니다.
2. 기존 footer·keycap·Divider·동작 host를 재사용할 수 있는지 비교합니다. 실제 Figma 재사용은 Divider와 keycap이며,
   Button은 native action 의미, AgentHubIcon은 자산 adapter로 구분합니다.
3. 찾기 route 또는 callback 하나를 제품에서 정하고 표시 여부를 명시합니다. 예시 label을 제품 route 문자열로 사용하지 않습니다.
4. Footer를 붙이는 부모는 [Picker](../AgentHubPicker/README.md)의 리스트·하단 공간 계약을 함께 적용합니다.
   [Item](../AgentHubPickerItem/README.md)의 focus/선택 상태를 Footer 안에서 다시 소유하지 않습니다.

## 2. 제안 API로 두 구성을 구분합니다

```ts
type PickerFooterAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "button"; label: string; onActivate: () => void };

export type AgentHubPickerFooterProps = {
  hintsId?: string;
  navigationLabel: string;
  selectionLabel: string;
} & (
  | { showLink: false; action?: never }
  | { showLink: true; action: PickerFooterAction }
);
```

Standalone과 첫 Picker는 showLink=true, 두 번째 Picker의 링크 부재 조립은 false로 표현할 수 있습니다.
이는 제품 제안 API이며 실제 Figma Boolean이나 기존 제품의 props 선언이 아닙니다.
showLink=false에서는 host 자체를 조건부로 생략합니다. 빈 링크·투명 button·숨겨진 focus 대상을 남기지 않습니다.
callback을 쓰면 native button의 onClick 하나에 연결하고 keydown에서 중복 실행하지 않습니다.

```text
div.footer
└─ div.footer-content
   ├─ div.key-hints, id=hintsId
   │  ├─ [kbd ↑, kbd ↓] + navigationLabel
   │  ├─ 장식 vertical Divider
   │  └─ kbd ↵ + selectionLabel
   └─ showLink일 때 native a 또는 button 한 개
      ├─ action.label
      └─ 장식 chevron16
```

안내 문자열은 평문으로 렌더합니다. Picker가 필요할 때만 hintsId를 설명 관계에 연결합니다.
Footer는 `window`나 document에 keydown handler를 등록하지 않습니다.

## 3. 원본 geometry를 연결합니다

다음 literal은 Light 한 줄 비교용이며 제품 component token에 연결합니다.

```css
.picker-footer {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-top: 1px solid #eeeeee;
  border-radius: 0;
  background: #f8f8f8;
  box-shadow: none;
}
.picker-footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  padding: 0 4px;
}
.picker-footer-hints {
  display: inline-flex;
  align-items: center;
  gap: 0;
  font: 500 12px/16px Pretendard, sans-serif;
  color: #1c1c1c;
}
.picker-footer-hint { display: inline-flex; align-items: center; gap: 4px; }
.picker-footer-keys { display: inline-flex; gap: 2px; }
.picker-footer-keycap {
  box-sizing: border-box;
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background: transparent;
  box-shadow: none;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #757575;
}
.picker-footer-action {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0;
  border: 0;
  background: transparent;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #1c1c1c;
  text-decoration: none;
}
.picker-footer-action:focus-visible {
  outline: 1px solid var(--picker-footer-focus);
  outline-offset: 1px;
}
```

Divider adapter는 전체17×14px와 선 좌우8px을 연결하고 추가 gap/margin을 넣지 않습니다.
`--picker-footer-focus`는 실제 제품의 접근 가능한 focus token이며 Figma에서 측정한 값이 아닙니다.
공용 Button을 host로 재사용하더라도 기본 높이·padding·font600·border가 이 링크 표현에 남지 않게 연결합니다.
라우팅 host는 의미에 맞는 anchor를 유지합니다. CSS recipe에 독립 hover/disabled/dark 값을 새로 만들지는 않았습니다.

## 4. 자산과 부모의 하단 공간을 검증합니다

chevron은 [자산 기록](../../references/picker.assets.json)의 footer FRAME export를16px로 사용합니다.
일반 Icon 인스턴스 재사용을 주장하거나 서로 다른 크기의 glyph로 조용히 바꾸지 않습니다.
SVG는 `aria-hidden="true"`, 외부 img이면 `alt=""`로 연결하며 이름은 action label이 제공합니다.

absolute bottom 배치를 유지하면 부모의 리스트 viewport에서39px를 확보합니다. footer를 단순히 마지막 행 위에 덮지 않습니다.
가변 footer 높이를 채택하면 실제 높이와 리스트 공간을 같은 owner가 계산합니다. 이는 추가 제품 정책이며 원본의 다른 높이를 측정한 것이 아닙니다.
마지막 focus 행을 완전히 드러낼 수 있도록 scroll 여백·outline·부모 clipping을 함께 검증합니다.

[검증 항목](./verification.md)과 소비 저장소의 lint/typecheck/test/build·브라우저 확인을 마친 뒤 실제 source/export를 로컬 mapping에 기록합니다.
공유 patch는 `draft`, 미확인 제품 mapping은 `unmapped`를 유지합니다. 원본 제품이나 사용자 홈에 자동 배포하지 않습니다.
