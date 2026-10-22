# AgentHubMessageExample — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS 배치와 제품 연결 순서**입니다. 동일한 이름의 실제 export가 이미 있다는 뜻이 아닙니다.
문서 기반 구현에서는 이 계약을 바탕으로 소비 저장소에 새 action UI를 만들 수 있습니다. 완성된 채팅 앱·요청 API 예제는 아닙니다.

## 1. 기존 예시 선택 구현을 찾습니다

1. 소비 저장소의 registry·source·public export에서 예시 프롬프트·추천 문구·빠른 실행과 같은 의미를 검색합니다.
   기존 공개 API·라벨/실행 데이터·선택 결과·focus·disabled를 함께 확인합니다. `unmapped`는 제품에 구현이 없다는 증거가 아닙니다.
2. 호환되면 기존 구현을 연결합니다. 없다면 가장 가까운 기능 내부 또는 feature shared 범위에 새 예시 선택 export를 만듭니다.
   UserMessage를 이름만 맞춰 상속하거나 별도 채팅 요청·Button 라이브러리를 만들지 않습니다.
3. 공용 Button의 native action 의미와 AgentHubIcon을 채택합니다. 기존 버튼의 스타일 연결점이 지원하면 재사용하되,
   이 시안 전용 geometry·font400·surface를 유지합니다. 실제 Figma Button 인스턴스 재사용으로 기록하지 않습니다.
4. 기존 draft·payload·전송·focus owner에 callback을 연결하고 source/public export와 제품 검증 결과를 로컬 mapping에 남깁니다.
   공유 patch는 `draft`, 검증 전 제품 source/export는 `unmapped`를 유지합니다. serengeti 원본 코드를 자동 복사하지 않습니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 예시 ID와 표시 라벨을 입력으로 받습니다

아래 TypeScript는 **제안 API**입니다. 기존 제품 타입이 같은 책임을 소유하면 그 계약에 연결합니다.

```ts
export type AgentHubMessageExampleProps = {
  id: string;
  label: string;
  showIcon?: boolean;
  onActivate: (id: string) => void;
  disabled?: boolean;
};
```

`id`는 제품의 안정적인 예시 식별자이고 `label`은 표시 문구입니다. 실제 prompt payload는 제품이 ID에 연결해 소유하며,
번역된 label을 곧바로 송신 본문으로 사용하지 않습니다. `showIcon` 기본값은 true로 연결합니다.
이 API의 label·callback·disabled는 제품 구현을 위한 제안이며 Figma root에 이미 존재하는 속성은 아닙니다.
disabled를 채택한다면 세 상태 밖의 시각·비활성 정책을 제품에 명시합니다.

`onActivate`는 제품이 선택한 draft 대체·추가·직접 명령 중 **한 경로**만 실행합니다.
이 컴포넌트 안에 별도의 draft·request state·stream·자동 전송 코드를 넣지 않습니다.
IME 조합·현재 작성 내용·첨부·에이전트·프로젝트의 보존과 명시적 focus 이동은 해당 owner가 결정합니다.
제품이 실제 요청을 실행한다면 pending guard·권한·성공/실패·재시도도 그 명령에서 처리합니다.

## 3. native action host 하나로 조합합니다

```text
native button, type=button, 단일 활성화 callback
├─ label 평문
└─ showIcon=true일 때 장식 arrow-right20
```

기존 Button adapter를 쓰더라도 실제 host는 하나여야 합니다. 내부에 Button·Link를 중첩하거나 wrapper와 아이콘에
별도 click을 달지 않습니다. native Enter/Space가 click을 발생시키므로 keydown에서 같은 명령을 다시 실행하지 않습니다.
label 문자열은 React의 `{label}`처럼 평문으로 렌더하고 HTML로 주입하지 않습니다.

disabled를 제공하는 구현에서는 native 속성과 실행 guard를 같은 값에 연결합니다. 예를 들면 다음과 같습니다.

```ts
// 이 함수 하나를 실제 button의 onClick에 연결합니다.
const handleActivate = () => {
  if (disabled) return;
  onActivate(id);
};
```

이 guard는 제품 요청 owner의 중복 요청 방지를 대신하지 않습니다. 버튼의 `disabled`도 함께 전달하고,
disabled 동안 hover/active 색상이 다시 적용되지 않게 합니다. `aria-pressed`나 선택 위젯 역할은 추가하지 않습니다.
아이콘 false에서는 노드 자체를 조건부로 제거해 빈 슬롯·margin·focus 대상을 남기지 않습니다.

## 4. 전용 geometry와 색상을 연결합니다

다음은 **한 줄 실측을 연결하는 CSS recipe**입니다. literal은 비교용이며 제품 semantic/component token으로 매핑합니다.
`--message-example-focus`는 제품의 접근 가능한 focus token에 연결할 값으로, 이번 Figma의 측정 색상이 아닙니다.

```css
.message-example {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 12px 20px;
  border: 0;
  border-radius: 12px;
  font: 400 14px/20px Pretendard, sans-serif;
  color: #1c1c1c;
  background: #ebf3ff;
  box-shadow: none;
  overflow: visible;
}
.message-example:hover:not(:disabled):not([data-disabled]) {
  background: #cce0ff;
}
.message-example:active:not(:disabled):not([data-disabled]) {
  background: #99c2ff;
}
.message-example:focus-visible {
  outline: 1px solid var(--message-example-focus);
  outline-offset: 1px;
}
.message-example-label {
  min-width: 0;
  text-align: left;
  white-space: nowrap;
}
.message-example-icon {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
}
```

아이콘이 켜져 있으면 label57px + gap4px + icon20px + padding40px로 샘플121px가 됩니다.
끄면 한 자식만 남으므로 gap도 사라집니다.121px·계산상97px를 폭 상수로 넣지 않습니다.
`min-height: 44px`는 한 줄 기준을 유지하는 제안이며 원본의 HUG를 고정 높이로 바꾸지 않습니다.
버튼의 기본 font600·border·shadow·다른 size/radius가 남아 수치가 바뀌지 않는지 비교합니다.

긴 문구의 줄바꿈과 높이 증가는 제품이 별도로 채택할 수 있습니다. 예를 들어 다음은 **제품 검증이 필요한 추가 배치**이며
Figma에서 다중 줄을 측정한 값이 아닙니다. 해당 정책을 채택한 경우에만 적용합니다.

```css
.message-example[data-wrap="true"] .message-example-label {
  white-space: normal;
  overflow-wrap: anywhere;
}
```

높이 증가·아이콘 정렬·부모 최대 폭·긴 URL·번역·좁은 화면을 함께 확인합니다. 라벨을44px 고정 높이에서 자르거나
ellipsis로 숨기지 않습니다. disabled의 시각 값과 loading 표현은 이 recipe에 새로 정의하지 않았습니다.
필요하면 제품 근거와 채택 범위를 따로 기록하고 native 차단·focus 의무를 유지합니다.

## 5. 원본 아이콘과 실제 동작을 검증합니다

[기존 arrow-right20 SVG](../../assets/icons/arrow-right/20.svg)를 실제20px로 연결합니다.
원본 `2199:23690`의 선1.25px·round cap/join·#1C1C1C를 유지하며 다른 크기의 화살표를 강제로 축소하지 않습니다.
장식 SVG는 숨기고 외부 `img`이면 `alt=""`를 사용합니다. 부모 CSS `color`만 바꿔도 외부 SVG 내부 stroke가 바뀐다고 가정하지 않습니다.
[자산 연결 안내](../../assets.md)에 따라 제품 소유 경로에 연결하고 임시 Figma URL을 런타임에서 사용하지 않습니다.

[검증 항목](./verification.md)과 소비 저장소의 lint/typecheck/test/build를 실행합니다.
아이콘 유무·세 상태·긴 라벨·확대·키보드·callback 한 번·draft/IME 보존·제품의 한 명령 연결을 실제로 확인한 뒤 mapping을 갱신합니다.
정적 문서나 자산 수신만으로 채팅 전송·요청 성공·dark·mobile 지원이 완료됐다고 선언하지 않습니다.
