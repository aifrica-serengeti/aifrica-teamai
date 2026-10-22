# AgentHubChatComposer — 새 구현과 기존 구현 연결

외부 문구 주입 모션은 [단일 TextReveal 계층](./external-text-motion.md)에 연결합니다.
제안 API에 `externalTextRevision?: string | number`를 추가하고 외부 value 변경과 같은 부모 명령에서만 갱신합니다.
native textarea의 전체 value·단일 submit·ref·IME 소유권은 유지하며, 직접 입력에 모션을 재생하지 않습니다.

이 문서는 실행 앱 코드가 아닌 **구현 순서·제안 API·배치 recipe**입니다. 아래 export·class·token 이름이 실제 제품에
이미 있다는 뜻은 아닙니다. 소비 저장소의 기술·기존 API에 맞춰 구현하고 검증한 후 로컬 mapping에 기록합니다.

## 1. 구현할 위치를 결정합니다

1. 유지보수하는 제품이라면 registry와 실제 source/export에서 Composer·message input·요청 입력 등 같은 의미의 구현을 검색합니다.
   native textarea·첨부·송신·agent/project 연결과 상태·키보드 API를 함께 확인합니다. 이름만 다른 기존 구현을 복제하지 않습니다.
2. 호환되면 재사용하거나 variant·slot으로 확장합니다. 기존 하위 컴포넌트로 책임을 침범하지 않고 표현되면 조합합니다.
3. 적절한 Composer가 없다면 page-local 또는 가까운 feature shared 계층에 새 `AgentHubChatComposer` 같은 export를 정의합니다.
   기존 textarea·원형 버튼·Chip·Divider·glyph는 가능한 한 재사용하고 상태·SVG·focus 로직을 임시 복제하지 않습니다.
4. 제품 source가 없는 문서 전용 재현 모드에서는 registry·계약·자산으로 새 export와 leaf를 구현할 수 있습니다.
   예제 부재를 serengeti 원본 열람·복사의 필요 조건으로 만들지 않습니다.
5. 공개 API·스타일·동작·검증 결과를 함께 기록합니다. 실제로 구현한 제품의 source/export만 로컬 mapping에 연결하고 공유 patch의 draft를
   제품 전체 구현 완료로 바꾸지 않습니다. 명령어·서버 API·router 경로는 이 문서가 정하지 않습니다.

공용을 채택했다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 값과 시각 상태를 분리합니다

다음 TypeScript는 **제안 계약**입니다. 기존 제품에 같은 책임의 API가 있으면 그 이름을 사용합니다.
Figma의 네 state enum 대신 실제 값·agent·요청·송신 가능 여부와 시각 tone을 분리합니다.

```ts
import type { KeyboardEvent } from "react";

type AgentSummary = { id: string; typeLabel: string; title: string };
type KeyDecision = "native" | "submit" | "block";

export interface AgentHubChatComposerProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  agent: AgentSummary | null;
  projectLabel: string;
  disabled: boolean;
  readOnly: boolean;
  requestBusy: boolean;
  canSubmit: boolean;
  sendTone: "neutral" | "emphasis"; // 시각 tone. 실제 송신 가능 조건과 별개입니다.
  onSubmit: () => void;
  onAttach: () => void;
  onSelectProject: () => void;
  decideKey: (
    event: KeyboardEvent<HTMLTextAreaElement>,
    context: { value: string; requestBusy: boolean },
  ) => KeyDecision;
}
```

`sendTone`의 주석은 시각 tone과 송신 가능 조건을 구분한다는 뜻입니다. agent의 업무 유형·서버 payload·파일 목록·요청/응답 stream은
호출자가 소유합니다. 제안 API의 세 callback은 동작 연결점이며 자체 업로드·팝업·네트워크 구현을 포함하지 않습니다.
첨부/프로젝트별 허용 조건이 다르면 기존 제품 API로 명시하고 전체 disabled 하나에 감추지 않습니다.

`decideKey`에서 Enter·Shift+Enter·modifier·개행 허용 정책을 제품이 명시합니다. 조합 중에는 이 함수의 송신 판단을 호출하지 않습니다.
다중 줄 정책이 없다면 자동 확장·최대 높이·임의 단축키를 조용히 확정하지 말고 제품 요구를 먼저 연결합니다.

## 3. native DOM과 단일 submit을 연결합니다

```text
outer wrapper (normal flow, 세로 gap4)
├─ form/surface (sample58, 내부 row32)
│  ├─ left group (flexible, min-width0, gap4)
│  │  ├─ attach button (type=button, plus24)
│  │  └─ editor group (min-width0, gap0)
│  │     ├─ agent info (있으면 Chip + title, gap8)
│  │     ├─ Divider (agent info가 있을 때 외곽17×12)
│  │     └─ label 연결한 native textarea
│  └─ send button (type=submit, arrow-up24)
└─ project button (type=button, margin-left9, p6/8)
```

입력은 `value`·`onChange`와 실제 label을 연결합니다. 원본의 caret 사각형을 렌더하지 않습니다.
제안 API의 `disabled`·`readOnly`는 native textarea의 같은 속성에도 직접 연결합니다. read-only는 disabled로 치환하지 않고
Tab focus·값 선택·복사를 유지하면서 편집만 막습니다. 첨부·프로젝트 조작의 별도 허용 정책까지 native readOnly로 처리됐다고 가정하지 않습니다.
이미 상위 form 안에 있다면 새 form을 중첩하지 않습니다. 기존 form이 submit을 소유하게 하거나 제품의 명시적인 form 연결을 사용하고,
키보드의 `requestSubmit()`도 그 한 소유자에게만 보냅니다. 기존 form의 다른 제출 동작과 충돌하지 않는지 확인합니다.
`compositionstart/end`로 조합 여부를 추적하고 keydown에서 그 값·`nativeEvent.isComposing` 및 제품이 지원하는 IME 호환 처리를 확인합니다.
조합 중 Enter는 송신으로 전환하지 않습니다.

키보드 판단이 submit이면 기본 동작을 막고 소유 form의 `requestSubmit()` 등 단일 submit 경로를 호출합니다.
form의 submit handler가 기본 제출을 제어하고 실제 disabled/read-only·canSubmit·requestBusy 정책을 검사한 뒤 `onSubmit`을 한 번 호출합니다.
전송 버튼에 별도 송신 onClick을 붙여 form과 이중 실행하지 않습니다. 부모의 요청 adapter도 실제 중복 방지를 책임집니다.
`native` 판단은 native 입력을 유지하고 `block`은 명시한 제품 정책에만 사용합니다.

송신 callback만으로 value·첨부·agent/project를 초기화하지 않습니다. 성공·실패·취소별 보존/초기화 시점은 부모 adapter가 결정합니다.
팝업·Tooltip을 추가한다면 해당 기존 primitive를 조합하고 한 조작에 중첩 button·중복 trigger·독립된 가짜 open 상태를 만들지 않습니다.

## 4. 한 줄 샘플의 CSS 배치를 맞춥니다

아래 CSS는 위 DOM 역할에 연결할 **재현 recipe**입니다. 단일 줄 Light sample의 geometry이며 반응형·다중 줄 전체 구현이 아닙니다.

```css
.composer {
  display: grid;
  gap: 4px;
  min-width: 0;
}
.composer-surface {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%; /* 기준 비교 viewport에서 부모가768px를 제공 */
  min-width: 0;
  min-height: 58px;
  padding: 12px 20px 12px 8px;
  border: 1px solid #dddddd;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: var(--agent-hub-chat-composer-shadow);
  overflow: visible;
}
.composer-left, .composer-editor-group, .composer-agent-info {
  display: flex;
  align-items: center;
  min-width: 0;
}
.composer-left { flex: 1; gap: 4px; min-height: 32px; }
.composer-editor-group { flex: 1; gap: 0; }
.composer-agent-info { gap: 8px; }
.composer-attach, .composer-send {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
}
.composer-control-glyph {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
}
.composer-editor {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  font: 400 16px/24px Pretendard, sans-serif;
  color: #1c1c1c;
  resize: none;
  overflow: auto;
}
.composer-editor::placeholder { color: #757575; }
.composer-project {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 9px;
  padding: 6px 8px;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #555555;
}
.composer-project-icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
}
```

이 CSS의 색상·치수 literal은 [실측값](./styles.md)을 읽기 쉽게 보여 주는 예시입니다. 제품에서는 채택한 component·semantic token에 연결합니다.
이미 스타일이 있는 Textarea를 재사용한다면 Composer variant에서 기본 높이·padding·border·배경과 focus 소유권을 명시합니다.
일반 class 하나만 추가하고 기존 focus/invalid/read-only selector까지 모두 재정의됐다고 가정하지 않습니다.

Composer 입력에만 scoped selector로 내부 outline/box-shadow를 제거하고, 바깥 surface에도 focus ring을 합성하지 않습니다.
후속 사용자 요청으로 이전 외곽2px ring 채택을 대체합니다. 기본1px 선·두 shadow와 첨부·전송·프로젝트 버튼의 focus는 유지합니다.
전역 input/textarea/button의 focus를 지우는 reset으로 확장하지 않습니다.

좁은 화면을 transform scale이나 고정 overflow hidden으로 처리하지 않습니다. 제품의 다중 줄 정책에 맞춰
editor 높이·최대 높이·스크롤·agent 정보 줄바꿈/단축·버튼 배치를 추가 검증하고 입력을58px 안에서 잘라내지 않습니다.
버튼32px·glyph24px·기본 행32px는 유지합니다. 긴 agent 텍스트를 처리할 방법은 제품이 명시하며, 이름·유형이 접근성 트리에서
사라지거나 입력·전송 버튼이 밀려 가려지지 않도록 검증합니다. 원본의 짧은 제목에서 전체 좁은 폭 정책을 추정하지 않습니다.
outer wrapper는 샘플58+4+28=90px를 normal flow로 확보합니다. 원본처럼 absolute 배치를 택해도 아래28px 조작 공간은 별도로 확보합니다.

## 5. 연결과 완료 조건

버튼은 기존 원형 규격을 재사용하고 send의 arrow swap·neutral/emphasis override는 Composer 범위에 둡니다.
Chip은 일반 rounded small의 purple 표현, Divider는 외곽17px, folder는[16px 전용SVG](../../assets/chat-composer/project-folder-16.svg)를 연결합니다.
Chip에 원본 없는 transparent border를 더해 라벨·패딩에 따른 폭이 달라지지 않게 하고, Divider의 좌우8px는 한 번만 적용합니다.
선택 에이전트의 제목·placeholder를 샘플 문구로 고정하지 않습니다.
plus/up의 원본 자산과24px geometry를 보존하고 전송의 흰 stroke는 기존 SVG 컴포넌트·semantic 색상 adapter로 연결합니다.
외부 SVG를 `img`로 표시한 뒤 부모의 CSS color만 바꾸면 내부 stroke도 바뀐다고 가정하지 않습니다.
임시 Figma URL을 runtime 경로로 쓰지 않고 [자산 연결 안내](../../assets.md)에 따라 제품이 소유한 경로로 연결합니다.

[검증](./verification.md)을 실제 제품에서 수행하고 기존 lint/typecheck/test/build를 실행합니다. 긴 입력·IME·중복 송신 방지·
실패 시 draft·focus·하단 프로젝트 배치를 확인한 뒤 제품의 source/public export를 mapping에 기록합니다.
미제공 dark/mobile/업로드/stream 등을 이 recipe가 있다는 이유만으로 완료로 표시하지 않습니다.

## 6. 공용 Textarea control의 unstyled adapter

[입력 focus 채택](../../motion.md)에 따라 공용 Textarea의 native control에 `unstyled`와 `focusOwner="container"` 같은 제안 adapter를 연결합니다.
현재 value/onChange·ref·disabled/readOnly·composition/keydown props를 전달하고 public 입력 API나 submit owner를 새로 만들지 않습니다.
container adapter는 내부 control의 중복 시각을 억제하며, Composer는 입력 focus 시 바깥 pill에도 별도 ring을 추가하지 않습니다.
내부 control에는 padding·border·배경·독립 ring을 중복하지 않습니다. `:focus-within`이나 textarea `:focus-visible` 감지로 외곽 ring을 다시 추가하지 않습니다.
하위 버튼 focus에서는 해당 버튼만 표시하며 기존 shadow를 지우지 않습니다. 이 adapter는 공용 Textarea 전체 기본 시각을 바꾸지 않습니다.

```css
/* Composer control에만 적용하며 버튼 focus 규칙은 유지합니다. */
.composer-editor.composer-editor:focus-visible {
  outline: none;
  box-shadow: none;
}
```

소비 앱의 전역 textarea focus 규칙보다 이 scoped reset이 우선하는지 실제 computed style로 확인합니다.
