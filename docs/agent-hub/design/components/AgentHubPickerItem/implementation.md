# AgentHubPickerItem — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS 배치와 제품 연결 순서**입니다. 같은 이름의 실행 export가 이미 있다는 뜻은 아닙니다.
기존 행을 연결하거나 새 소비 환경에 구현할 수 있는 가이드이며 선택·모델 API까지 갖춘 완성 앱 예제는 아닙니다.

## 1. 재사용 가능한 행과 부모 패턴을 확인합니다

1. 소비 저장소의 registry·source·public export에서 에이전트 선택·일반 채팅 선택·모델 선택 행을 찾습니다.
   표시뿐 아니라 선택·별도 모델 조작·focus·값 소유권을 확인합니다. `unmapped`를 구현이 없다는 증거로 쓰지 않습니다.
2. 호환되면 기존 행을 연결합니다. 없다면 [Picker](../AgentHubPicker/implementation.md)의 가까운 기능 범위에 새 행 export를 만듭니다.
   전체 팝업·검색 API·모델 요청을 행 내부로 옮기지 않습니다.
3. AgentHubAgentTypeChip은 실제 원본에 맞게 재사용하고, model logo와 chevron은 자산 adapter에 연결합니다.
   Button은 native action 의미를 채택하는 기준이며 실제 Figma Button을 재사용한 것으로 기록하지 않습니다.
4. 실제 source/public export·지원 조합·제품 검증 결과를 로컬 mapping에 남깁니다.
   검증 전 source/export는 `unmapped`, 공유 채택 설정은 `draft`를 유지하며 serengeti 원본 코드를 자동 복사하지 않습니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 항목 데이터와 모델 명령을 분리합니다

아래 TypeScript는 **제안 API**입니다. 기존 제품 타입이 같은 책임을 소유하면 그 계약에 연결합니다.

```ts
type PickerItemBase = {
  id: string;
  title: string;
  description?: string;
  showDescription?: boolean;
  disabled?: boolean;
  onChoose: (id: string) => void;
};

export type AgentHubPickerItemProps = PickerItemBase & (
  | {
      kind: "agent";
      meta: string;
      model?: never;
      onOpenModel?: never;
    }
  | {
      kind: "chat";
      model: { id: string; label: string; logoSrc: string };
      onOpenModel?: (itemId: string, modelId: string) => void;
      meta?: never;
    }
);
```

제안은 실측된 agent의 assistant·chat의 common-chat 유형 Chip을 연결합니다. 다른 에이전트 유형이 필요하면
기존 유형 Chip 계약과 추가 행 조합을 제품에서 검증해 확장합니다. 샘플 유형을 실제 미지원 데이터의 fallback으로 사용하지 않습니다.
모델 ID·label·logo는 제품 데이터이며 Qwen 문자열·샘플 PNG가 실제 모델 선택값이나 제공 목록을 결정하지 않습니다.

`showDescription`은 기본 false입니다. true를 채택하면 새 보이는 배치·높이·설명 연결을 검증해야 합니다.
disabled도 실제 pointer/keyboard 변경을 차단하는 제품 제안이며 원본의 추가 시각이 아닙니다.
선택 값·검색어·popup open·미확정/확정 값·모델 변경 결과·권한·요청 수명은 부모/제품 owner가 소유합니다.
`onChoose`나 `onOpenModel` 한 번이 자동 전송·전체 초기화·고정 route 이동을 의미하지 않습니다.

## 3. 독립 모델 조작 여부에 따라 DOM을 정합니다

모델이 단순 표시이고 행 전체가 하나의 명령이면 native button 하나를 사용할 수 있습니다.
값 선택용 listbox라면 부모가 검증한 option host와 keyboard/선택 adapter를 사용하며 내부 콘텐츠는 모두 비상호작용으로 둡니다.

```text
단일 button 또는 부모가 소유한 listbox option
├─ 정보형 유형 Chip + title
└─ meta 또는 장식 logo + 모델 label + 장식 chevron
```

모델을 별도로 바꿀 수 있다면 다음처럼 형제 조작으로 분리합니다. 부모는 Picker dialog 구성을 우선 검토합니다.

```text
비상호작용 행 wrapper
├─ 항목 선택 native button: 유형 Chip + title
└─ 모델 선택 native button: 장식 logo + 모델 label + 장식 chevron
```

두 button은 type=button이며 각각 하나의 명령만 실행합니다. 바깥 행에 선택 click을 다시 붙이거나
button/option 안에 모델 button을 중첩하지 않습니다. Enter/Space에서 native click과 별도 keydown callback이 중복 실행되지 않게 합니다.
모델 popup의 실제 내용·역할·연결 ID·ESC·focus 복귀는 해당 popup owner에 연결합니다.
제목·meta·모델 label은 React의 문자열 텍스트로 렌더하고 HTML로 주입하지 않습니다.

## 4. 행의 시각과 조작 host를 분리해 연결합니다

다음 CSS는 **한 줄 샘플을 연결하는 배치 recipe**입니다. literal은 실측 비교용이며 제품 semantic/component token으로 매핑합니다.
같은 클래스는 단일 action 또는 비상호작용 행 wrapper에 연결할 수 있고, 접근성 역할은 앞 절의 실제 구조에 맞춰 정합니다.

```css
.picker-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 6px 8px;
  border: 0;
  border-radius: 6px;
  color: #1c1c1c;
  background: transparent;
  transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease;
  box-shadow: inset 0 0 0 2px transparent;
  overflow: visible;
}
.picker-item:hover:not(:disabled):not([data-disabled]) {
  background: #f8f8f8;
}
.picker-item-main:focus-visible { outline: none; }
.picker-item:not([data-disabled]):not(:hover):has(> .picker-item-main:focus-visible) {
  box-shadow: inset 0 0 0 2px var(--picker-focus);
}
.picker-item-leading {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.picker-item-title {
  margin: 0;
  min-width: 0;
  font: 600 14px/20px Pretendard, sans-serif;
  text-align: left;
}
.picker-item-meta {
  margin: 0;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #757575;
}
.picker-item-model {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  font: 400 14px/20px Pretendard, sans-serif;
}
.picker-item-model-logo {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
}
.picker-item-model-chevron {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
}
@media (prefers-reduced-motion: reduce) {
  .picker-item { transition: none; }
}
```

758px는 행 샘플 폭입니다. 실제 부모의 가용 폭에 연결하되 Chip의 폭 정책과 제목·우측 정보의 전체 내용을 보존합니다.
단일 native button이면 기본 font·padding·border가 중복되지 않게 하고 실제 disabled와 focus-visible을 연결합니다.
형제 조작을 둔 wrapper recipe에서는 선택용 button에 `.picker-item-main`을 연결해 wrapper의 inset2px ring을 켭니다.
같은 행 hover에서는 ring을 숨기며 model button은 독립 focus를 유지합니다. 단일 button recipe라면 wrapper 대신
그 button 자체의 `:focus-visible:not(:hover)`가 같은 ring을 소유하게 합니다. `--picker-focus`는 제품 focus token입니다.
비상호작용 wrapper에서는 실제 전체 비활성 상태를 `data-disabled`에 연결하고, 내부 조작의 native disabled와 실행 guard도 함께 적용합니다.
배경 transition은 그 wrapper에 직접 연결합니다. 내부 투명 버튼이나 부모 Picker의 transition으로 대신하지 않습니다.
200ms ease는 [공용 계승값](../../motion.md)이며 hover 진입·이탈 모두 적용합니다.
별도 형제 button이면 각 host의 reset·hit area·focus를 제품에서 정해 슬롯의20px 콘텐츠가 중앙 정렬되게 합니다.
FRAME이20px라는 사실을 실제 모델 button의 접근 가능한 hit area까지 측정했다는 뜻으로 사용하지 않습니다.

CSS 예시는 한 줄36px 비교용입니다. 긴 title/meta/모델명·좁은 폭·description=true에서는 height 증가·줄바꿈·행 분리를
제품이 명시적으로 채택해 별도로 검증합니다. 숨김 description의 저장 좌표에 새 텍스트를 절대 배치하거나36px에서 잘라내지 않습니다.
focus는 공용 Menu에서 계승한 제품 token이며 Figma 실측이 아닙니다. 추가 selected·disabled·loading 색상을 이 예시가 제공했다고 간주하지 않습니다.

## 5. 데이터·자산·제품 동작을 검증합니다

[자산 기록](../../references/picker.assets.json)에 따라 샘플 모델 PNG와16px 전용 chevron을 제품 소유 경로에 연결합니다.
실제 모델이 바뀌면 제품 데이터의 logo와 label도 함께 갱신합니다. 모델 logo가 텍스트와 의미가 겹치면 빈 alt로 처리하고,
chevron SVG도 장식으로 숨깁니다. 외부 SVG의 내부 stroke가 부모 CSS color만으로 바뀐다고 가정하지 않습니다.
임시 Figma URL 대신 [자산 연결 안내](../../assets.md)의 방식을 사용합니다.

[검증 항목](./verification.md)과 제품의 lint/typecheck/test/build를 실행합니다. 행 선택·모델 조작의 분리·한 번의 통지·
keyboard·focus·popup 복귀·실제 title/model/권한 데이터·긴 문구·description 표시를 채택한 범위에서 확인합니다.
선택이 대화 작성 상태를 바꾸는 제품에서는 draft·IME·첨부·에이전트·프로젝트 보존도 해당 owner에서 검사합니다.
정적 문서나 과거 source 예시만으로 실제 소비 제품의 선택·모델 변경 구현이 완료됐다고 선언하지 않습니다.
