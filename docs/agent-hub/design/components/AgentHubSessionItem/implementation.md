# AgentHubSessionItem — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS recipe**입니다. 실제 제품 export나 실행 앱 예제가 아닙니다.

## 1. 기존 행을 확인합니다

소비 저장소의 source·registry·public export에서 예약/출력 행과 선택 owner를 찾습니다.
호환되면 스타일·자산 adapter로 연결하고, 없으면 [Session Panel](../AgentHubSessionPanel/implementation.md)의 가까운 범위에 새 export를 만듭니다.
Button의 단일 활성화·focus 의미를 유지하되 기본 Button 시각이나 Card/Tree의 선택 선을 그대로 상속하지 않습니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

## 2. 표시와 활성화 의도를 받습니다

```ts
export type AgentHubSessionItemProps = {
  id: string;
  title: string;
  iconName?: "file-text" | "schedule" | "table" | "code" | "image";
  showMeta?: boolean;
  metaText?: string;
  selected?: boolean;
  disabled?: boolean;
  onActivate: (id: string) => void;
};
```

icon 기본값은 file-text, showMeta 기본값은 false입니다. true일 때 실제 문구를 제공하고 Boolean을 문자열로 바꾸지 않습니다.
제안 icon 이름은 현재 관찰한 source 범위이며 모든 조합의 구현 완료를 뜻하지 않습니다.
ID·선택·권한·파일/예약 명령·요청 중복 방지·성공/실패는 제품 owner가 소유합니다.
selected와 disabled도 제품 상태에 연결하고 네 Figma state를 내부 요청 enum으로 저장하지 않습니다.

## 3. 단일 host에 연결합니다

```text
button type=button, 실제 disabled, 선택 표시
├─ 비대화형 icon-box28
│  └─ 장식 icon16
└─ content
   ├─ title 평문
   └─ showMeta일 때 meta 평문
```

button의 click에서 disabled guard 후 onActivate(id)를 한 번 호출합니다.
Enter/Space는 native 활성화를 사용하고 wrapper·SVG·별도 keydown에 같은 명령을 등록하지 않습니다.
실제 listbox/링크 등 다른 패턴을 채택했다면 이 button recipe와 중첩하지 않고 해당 primitive의 한 경로로 연결합니다.
meta=false는 노드를 제거하고 HTML 문자열을 주입하지 않습니다.

## 4. 배치를 연결합니다

literal은 Light 실측 비교값이며 제품 token에 연결합니다. 폭은 부모가 공급하고 standalone 비교에만294px를 줍니다.

```css
.hub-session-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 36px;
  padding: 4px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  box-shadow: none;
  color: #1c1c1c;
  text-align: left;
}
.hub-session-item:hover:not(:disabled):not([data-selected]) { background: rgb(0 0 0 / 5%); }
.hub-session-item:active:not(:disabled):not([data-selected]) { background: rgb(0 0 0 / 10%); }
.hub-session-item[data-selected] { background: #ebf3ff; }
.hub-session-item:focus-visible {
  outline: 1px solid var(--hub-session-focus);
  outline-offset: 1px;
}
.hub-session-item-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
}
.hub-session-item-icon { flex: 0 0 16px; width: 16px; height: 16px; }
.hub-session-item-content {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}
.hub-session-item-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: 400 14px/20px Pretendard, sans-serif;
}
.hub-session-item-meta {
  flex: 0 0 auto;
  color: #757575;
  white-space: nowrap;
  font: 400 12px/16px Pretendard, sans-serif;
}
```

data-selected는 false일 때 속성을 제거합니다. 선택 배경을 hover/pressed보다 유지하는 것은 **제안 우선순위**이며 교차 상태 실측이 아닙니다.
focus token과 disabled 시각은 제품에서 채택하며 Figma 확인값으로 표시하지 않습니다.
다른 primitive를 쓰면 해당 aria-disabled/data-disabled도 selector·실제 실행 guard에 연결합니다.
긴 meta가 title을 밀어내면 전체 정보에 접근할 수 있는 폭·줄바꿈·높이 정책을 제품이 정해 검증합니다.

## 5. 자산과 실제 매핑을 검증합니다

[자산 기록](../../references/session.assets.json)의 정확한16px 자산을 제품 소유 경로에 연결합니다.
file-text/schedule의 source20·표시16·선1.25·#757575를 보존하고 임의 배율로 선을 다시 계산하지 않습니다.
외부 SVG img의 부모 color만 바꿔 내부 stroke가 자동 변경된다고 가정하지 않습니다.
[자산 안내](../../assets.md)를 따르고 임시 Figma URL을 runtime에 남기지 않습니다.

[검증 항목](./verification.md)과 제품 검사를 마친 뒤 source/public export·지원 상태·실제 결과를 로컬 mapping에 기록합니다.
그 전에는 `unmapped`/`draft`를 유지하며 원본 제품을 수정하거나 문서 예시를 실제 구현 증거로 취급하지 않습니다.
