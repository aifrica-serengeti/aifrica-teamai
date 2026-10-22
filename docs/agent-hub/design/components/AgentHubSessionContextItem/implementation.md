# AgentHubSessionContextItem — 새 구현과 기존 구현 연결

다음은 **제품 제안 API·배치 recipe**입니다. 이미 존재하는 source/export나 실제 컨텍스트 API가 아닙니다.

## 1. 기존 표시 행을 확인합니다

소비 저장소의 source·registry·public export에서 컨텍스트 목록·대표 값·집계·활성화 owner를 찾습니다.
호환되면 adapter로 연결하고, 없으면 [Session Panel](../AgentHubSessionPanel/implementation.md)의 가까운 범위에 새 export를 만듭니다.
단순 표시와 단일 action을 구분하고 제품이 선택한 하나의 host를 사용합니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`를 적용합니다.

## 2. 문자열과 활성화 의도를 받습니다

```ts
export type AgentHubSessionContextItemProps = {
  id: string;
  label: string;
  value: string;
  countText: string;
  iconName?: "file-text" | "folder" | "book-open" | "wrench" | "scroll-text";
  selected?: boolean;
  disabled?: boolean;
  onActivate: (id: string) => void;
};
```

icon 기본값은 book-open입니다. countText는 실제 TEXT property에 대응하는 제안 이름이며 숫자 검증·집계 API를 새로 만들지 않습니다.
label/value도 평문 표시이고 ID·전체 목록·선택·권한·후속 팝업/이동 결과는 제품 owner가 제공합니다.
icon union은 현재 관찰한 source 범위이며 preferred key 전체와 모든 상태 구현 완료를 뜻하지 않습니다.

## 3. 하나의 action host에 연결합니다

```text
button type=button, 실제 disabled, 선택 표시
├─ content
│  ├─ label-group66: 장식 icon16 + label
│  └─ value 평문
└─ countText 평문
```

click에서 disabled guard 후 onActivate(id)를 한 번 호출합니다. native Enter/Space에 별도 keydown 재실행을 더하지 않습니다.
icon·label·value·count·wrapper에는 같은 명령을 중복 연결하지 않습니다.
제품이 채택한 실제 listbox/링크 등 다른 의미를 사용하면 button recipe와 중첩하지 않고 해당 primitive의 한 경로를 사용합니다.
Flyout을 자동 조립하지 않습니다. 필요한 후속 popup은 별도 owner·실제 접근성 패턴으로 연결합니다.

## 4. label 컬럼과 대표 값을 배치합니다

literal은 Light 비교값이며 제품 token에 연결합니다. 폭은 부모가 공급하고 standalone 비교에만282px를 줍니다.

```css
.hub-session-context-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
  min-height: 32px;
  padding: 8px 4px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  box-shadow: none;
  text-align: left;
  font: 400 12px/16px Pretendard, sans-serif;
}
.hub-session-context-item:hover:not(:disabled):not([data-selected]) { background: rgb(0 0 0 / 5%); }
.hub-session-context-item:active:not(:disabled):not([data-selected]) { background: rgb(0 0 0 / 10%); }
.hub-session-context-item[data-selected] { background: #ebf3ff; }
.hub-session-context-item:focus-visible {
  outline: 1px solid var(--hub-session-focus);
  outline-offset: 1px;
}
.hub-session-context-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}
.hub-session-context-label-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 66px;
  width: 66px;
  overflow: hidden;
}
.hub-session-context-icon { flex: 0 0 16px; width: 16px; height: 16px; }
.hub-session-context-label {
  flex: 0 0 auto;
  color: #757575;
  font-weight: 600;
  white-space: nowrap;
}
.hub-session-context-value {
  flex: 1 1 auto;
  min-width: 0;
  color: #1c1c1c;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hub-session-context-count { flex: 0 0 auto; color: #757575; white-space: nowrap; }
```

data-selected는 false일 때 속성을 제거합니다. 선택 배경 우선은 **제안 우선순위**이며 교차 상태 실측이 아닙니다.
focus token과 추가 disabled 시각은 제품에서 채택합니다. 다른 primitive는 aria-disabled/data-disabled와 실제 실행 guard도 연결합니다.
긴 그룹명이66px를 넘으면 원본 clipping을 내용 삭제 정책으로 복사하지 않습니다.
제품이 컬럼 폭·줄바꿈·높이·전체 정보 접근 방법을 명시해 검증하며 현재 샘플의 지원 범위와 구분합니다.

## 5. 자산과 실제 source를 연결합니다

[자산 기록](../../references/session.assets.json)의 file-text/folder/book-open/wrench/scroll-text16을 제품 소유 경로에 연결합니다.
file-text/folder의 source20·표시16·선1.25와 native16의 선1·#757575를 보존합니다.
기본 book-open과 Panel book-open의 별도 원본 export 파일은 group ID 차이이며 임의로 새 도형으로 취급하지 않습니다.
외부 SVG img의 CSS color만 바꿔 stroke가 자동 변경된다고 가정하지 않습니다.
[자산 안내](../../assets.md)를 따르고 임시 Figma URL을 runtime에 두지 않습니다.

[검증 항목](./verification.md)과 제품 lint/typecheck/test/build·접근성·문구·실제 활성화를 확인한 뒤 로컬 mapping을 기록합니다.
source/export는 확인 전 `unmapped`, 공유 채택 설정은 `draft`이며 원본 제품은 수정하지 않습니다.
