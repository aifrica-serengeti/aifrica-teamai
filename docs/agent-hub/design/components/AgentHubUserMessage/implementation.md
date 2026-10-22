# AgentHubUserMessage — 새 구현과 기존 구현 연결

다음은 **문서 기반 구현 순서·제안 API·DOM/CSS recipe**입니다. 실제 제품에 같은 이름의 export가 있다는 뜻이 아닙니다.
유지보수라면 기존 사용자 메시지를 먼저 확인하고, 새 환경이면 이 계약과 dependency로 구현할 수 있습니다.

## 1. 기존 구현을 확인하고 소유 범위를 정합니다

1. consuming repository의 registry·source/export에서 UserMessage·chat bubble·사용자 발화 등 같은 의미를 검색합니다.
   세 표시 형식·본문 보존·발화자 정보·메타데이터와 실제 공개 API를 함께 확인합니다. `unmapped`를 구현이 없다는 증거로 쓰지 않습니다.
2. 호환되면 재사용·확장합니다. 적절한 구현이 없다면 가장 가까운 page-local 또는 feature shared 계층에 새 사용자 메시지 export를 정의합니다.
3. 기존 일반 Chip·Divider·glyph를 조합하고 메시지 요청·상태 저장·예약 실행 로직은 옮기지 않습니다.
   같은 스타일의 local bubble helper는 재사용해도 Figma의 schedule 내부가 chat 인스턴스였다고 기록하지 않습니다.
4. 제품 source 없는 문서 전용 재현은 계약으로 새 export를 구현합니다. 예제가 없다는 이유로 serengeti 원본을 복사해야 하는 것은 아닙니다.
5. 실제로 구현한 source/public export와 검증 결과를 제품 로컬 mapping에 남깁니다. 공유 patch의 draft와 제품 구현 완료를 구분합니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 적용합니다.

## 2. 표시 종류별 입력을 구분합니다

아래 TypeScript는 **제안 API**입니다. 기존 제품에 같은 책임의 타입이 있으면 그 계약에 연결합니다.
본문은 문자열이며 HTML·Markdown parser나 요청 callback을 포함하지 않습니다.

```ts
type UserMessageBase = {
  id: string;
  senderLabel: string;
  message: string;
};

export type AgentHubUserMessageProps = UserMessageBase & (
  | { kind: "chat"; agent?: never; scheduleStatus?: never }
  | {
      kind: "agent";
      agent: { name: string; chipLabel: string };
      scheduleStatus?: never;
    }
  | { kind: "schedule"; scheduleStatus: string; agent?: never }
);
```

`chipLabel`은 샘플 ‘에이전트’의 locale 연결점입니다. workflow 업무 유형이나 backend enum을 의미하지 않습니다.
`scheduleStatus`는 실제 제품 문구이며 Boolean `success`나 예약 실행 결과로 치환하지 않습니다.
이 세 kind에 agent+schedule 교차 조합·assistant·전송 중/실패 상태가 제공된 것으로 취급하지 않습니다.

부모가 stable message id·본문·발화자·에이전트·예약 경로 값을 소유합니다. 이 표시 컴포넌트가 입력 draft·요청 상태·응답 stream과
값을 양방향으로 복제하지 않습니다. 실제 metadata가 누락됐을 때 처리할 정책도 제품 adapter에서 명시합니다.

## 3. 평문과 읽기 문맥을 연결합니다

```text
message wrapper (발화자 이름과 연결, 상호작용 없음)
├─ 화면에 숨긴 sender label 또는 기존 대화 영역의 발화자 문맥
├─ schedule일 때 상태 행 (장식 clock12 + 실제 상태 텍스트)
└─ bubble
   ├─ agent일 때 content group
   │  ├─ 정보형 Chip + agent name (gap8)
   │  ├─ 장식 Divider (외곽17×12)
   │  └─ 본문 평문
   └─ chat/schedule이면 본문 평문
```

React에서는 `{message}`처럼 문자열을 텍스트로 렌더합니다. `innerHTML`·`dangerouslySetInnerHTML`로 사용자 문자열을 주입하지 않습니다.
`<tag>`·`**강조**` 같은 입력도 평문으로 남기며 Markdown·HTML renderer를 검증된 기능으로 추가하지 않습니다.
제품이 별도 콘텐츠 포맷을 요구하면 신뢰 경계·렌더러·의미 마크업을 별도 계약으로 확인합니다.

예를 들어 wrapper를 `article`로 구현한다면 stable id로 연결한 발화자 이름과 본문을 읽을 수 있게 구성합니다.
기존 transcript가 발화자를 이미 제공하면 같은 이름을 이중으로 읽지 않게 연결합니다. 새 시각 avatar·timestamp·copy button은 추가하지 않습니다.
본문은 일반 텍스트 선택·브라우저 복사가 가능해야 하며 버블에 `user-select: none`이나 불필요한 button 역할을 주지 않습니다.

동적 안내는 transcript나 제품의 한 소유자에게 연결합니다. 이 버블과 예약 문구에 각각 live region을 만들어 같은 변경을 중복 알리지 않습니다.
정적인 과거 메시지는 alert가 아니며 새 메시지 때문에 focus를 이동하거나 자동 스크롤 정책을 이 컴포넌트 안에 숨기지 않습니다.

## 4. 단일 줄 기준과 긴 본문 정책을 분리합니다

다음은 단일 줄 샘플의 수치를 유지하면서 **본문 보존을 위해 높이 증가·줄바꿈을 허용하는 제안 recipe**입니다.
다중 줄·좁은 폭의 완성된 Figma 스펙이 아닙니다. literal은 비교를 위한 실측값이며 제품에서는 component·semantic token에 연결합니다.

```css
.user-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 0;
  max-width: 100%;
}
.user-message-bubble {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  background: #f4f4f4;
  box-shadow: none;
  overflow: visible;
}
.user-message-content, .user-message-agent {
  display: flex;
  align-items: center;
  min-width: 0;
}
.user-message-content { gap: 0; }
.user-message-agent { gap: 8px; }
.user-message-agent-name {
  margin: 0;
  font: 600 14px/20px Pretendard, sans-serif;
  color: #1c1c1c;
}
.user-message-body {
  min-width: 0;
  margin: 0;
  font: 400 16px/24px Pretendard, sans-serif;
  color: #1c1c1c;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.user-message-schedule-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  min-width: 0;
  font: 400 12px/16px Pretendard, sans-serif;
  color: #555555;
}
.user-message-schedule-icon {
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
}
```

원본의 `FIXED 44px`·`clipsContent: true`는 [실측 스냅샷](../../references/message-user.figma.json)에 보존하지만,
실제 구현에서 긴 본문을 잘라내는 조건으로 강제하지 않습니다. 이 recipe의 `min-height`·`pre-wrap`·`overflow-wrap`은 제안입니다.
부모의 최대 폭·개행/공백·긴 URL과 좁은 화면에서 agent 메타데이터를 줄바꿈하거나 별도 행으로 옮기는 정책은 제품이 명시합니다.
본문 전체와 읽기 순서를 보존하는지 확인하고, 본문을 말줄임표로 대체하지 않습니다.

일반 Chip의 좌우 padding 8px·높이 20px·보라색 표현을 연결하고, 원본에 없는 투명 border 때문에 폭이 2px 늘어나지 않는지 확인합니다.
Divider의 외곽 17px에는 좌우 8px 여백이 포함됩니다. 선 1px을 중복 배치하거나 바깥에 gap 8px을 더하지 않습니다.
숨겨진 description/arrow를 DOM 읽기 요소·간격·클릭 대상으로 추가하지 않습니다.

## 5. 정확한 자산을 연결하고 실제 제품에서 검증합니다

schedule은 [12px 전용 SVG](../../assets/message-user/schedule-12.svg)를 실제 크기 12px로 연결합니다. 20px 원본을 별도 크기 규칙으로
다시 축소하지 않고, 0.75px stroke·round cap/join·#555555를 유지합니다. 외부 `img`로 연결하면 `alt=""` 등으로 장식 처리하며,
부모의 CSS `color`만 바꿔도 SVG 내부 stroke가 자동으로 바뀐다고 가정하지 않습니다.
[자산 연결 안내](../../assets.md)에 따라 제품이 소유하는 asset path에 연결하고 임시 Figma URL을 런타임에서 사용하지 않습니다.

[검증 항목](./verification.md)과 제품에 있는 lint/typecheck/test/build를 실행합니다. 짧은 세 kind 외에도 긴 본문·개행·긴 이름/상태 문구·
번역·200% 확대·발화자 읽기·상태 변경의 중복 안내를 확인합니다. 이후에 실제 source/public export를 제품 로컬 mapping에 등록합니다.
이 recipe가 있다는 이유만으로 새로운 요청 생명주기·Markdown·assistant 응답·dark/mobile 지원이 완료됐다고 기록하지 않습니다.

## 6. 공용 TextReveal로 외부 본문을 표시합니다

[공통 reveal recipe](../AgentHubChatComposer/external-text-motion.md)에 따라 `textMotion?: "static" | "reveal"`·
`textRevision?: string | number`를 기존 본문 API에 얇게 연결합니다. 기본 static은 과거 메시지에 유지합니다.
reveal을 선택한 새 본문은 전체 텍스트를 즉시 렌더하고 시각 mask만400ms로 이동합니다. 실제 청크 추가는 새 suffix만 연출합니다.
이 표시 helper를 Composer와 공유하며 개별 메시지에 setInterval·문자열 일부를 순차적으로 넣는 가짜 stream을 구현하지 않습니다.
