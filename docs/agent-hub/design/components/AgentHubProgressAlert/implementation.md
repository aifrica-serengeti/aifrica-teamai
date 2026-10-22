# AgentHubProgressAlert — 새 구현과 기존 구현 연결

다음은 **제안 API·DOM/CSS 배치와 제품 연결 순서**입니다. 같은 이름의 실행 컴포넌트나 export가 이미 있다는 뜻이 아닙니다.
요청 코드까지 포함한 완성 앱이 아니라, 이 문서를 받은 소비 저장소에서 기존 구현을 연결하거나 새 구현을 개발하는 기준입니다.

## 1. 기존 의미와 공개 API를 먼저 확인합니다

1. 소비 저장소의 registry·source·public export에서 응답 중단 안내·재시도·프롬프트 편집과 같은 의미의 구현을 찾습니다.
   `unmapped`는 여기서 실제 구현을 확인하지 않았다는 뜻이며, 제품에 컴포넌트가 없다는 증거가 아닙니다.
2. 호환 구현이 있으면 두 동작·시각·상태 소유권을 연결해 재사용합니다. 없으면 가장 가까운 기능 내부 또는 feature shared 범위에
   새 응답 중단 안내 export를 만듭니다. 별도 전역 알림 시스템이나 새 Button 라이브러리를 만들지 않습니다.
3. AgentHubButton과 AgentHubIcon을 재사용하고, API·stream·대상 ID·draft·focus 정책은 기존 제품 owner에 둡니다.
4. 제품 source가 없는 문서 기반 구현에서도 이 계약으로 새 export를 만들 수 있습니다. 원본 serengeti 코드를 자동 복사하지 않습니다.
5. 실제 구현·검증 후 source/public export를 제품 로컬 mapping에 기록합니다. 공유 patch는 `draft`, 제품 매핑은 검증 전 `unmapped`를 유지합니다.

공용을 켰다면 `DOCS_ROOT/frontend/design/component-workflow.md`와 `DOCS_ROOT/frontend/design/docs-only-build.md`도 읽습니다.
Notification의 전역 스택·자동 닫기나 AsyncContentState의 조회 lifecycle로 이름만 맞춰 대체하지 않습니다.

## 2. 표시 값과 두 명령을 분리합니다

아래 TypeScript는 **제안 API**입니다. 기존 제품 API가 같은 책임을 소유하면 해당 계약에 연결합니다.

```ts
export type AgentHubProgressAlertProps = {
  title: string;
  retryLabel: string;
  editLabel: string;
  onRetry: () => void;
  onEditPrompt: () => void;
  retryDisabled?: boolean;
  editDisabled?: boolean;
};
```

문구는 제품 locale에서 전달합니다. Figma의 root properties가 비어 있으므로 이 타입을 기존 Figma API로 기록하지 않습니다.
`retryDisabled`와 `editDisabled`는 독립적인 조작 조건입니다. 요청 중이라는 이유로 두 동작을 모두 막을지 제품이 결정합니다.
pending·대상 response/request ID·idempotency key·재시도 결과·draft는 이 표시 타입 안에서 새로 복제하지 않습니다.

`onRetry`는 요청 owner의 단일 명령에 연결합니다. owner가 재진입을 차단하고 대상·권한·요청 결과를 검증하며,
비동기 오류와 이전 요청의 늦은 응답도 처리합니다. native disabled만으로 서버 요청의 중복 방지가 끝났다고 간주하지 않습니다.
`onEditPrompt`는 기존 draft 보존/복원과 실제 편집기 focus를 담당하는 명령에 연결합니다. 편집 클릭으로 요청을 자동 발행하지 않습니다.

## 3. 보이는 구조만 조합합니다

```text
안내 wrapper
├─ 안내 그룹
│  ├─ 장식 circle-alert20
│  └─ 제목 평문
└─ 동작 그룹
   ├─ AgentHubButton tertiary·28, type=button, 재시도 한 경로
   └─ AgentHubButton tertiary·28, type=button, 프롬프트 편집 한 경로
```

기존 버튼 adapter의 공개 API에 두 callback과 실제 disabled를 연결합니다. wrapper에 같은 click을 다시 연결하지 않습니다.
상위 form 안에서도 기본 `type="button"`을 유지해 의도하지 않은 submit이 생기지 않게 합니다.
제목·라벨은 React의 `{title}`처럼 평문으로 렌더하고 사용자 문자열을 HTML로 주입하지 않습니다.
숨김 아이콘·keycap·닫기 버튼·진행률 요소를 추가하지 않습니다.

root에 이름만 보고 `role="alert"`를 고정하지 않습니다. 동적 문구를 알릴 실제 owner와 urgency를 정하고,
기존 대화 live region이 이미 읽으면 같은 안내를 이 컴포넌트에서 다시 읽지 않게 합니다.
새 안내가 표시돼도 focus를 이동하지 않으며, 사용자가 편집을 직접 요청했을 때의 이동만 제품 명령에서 처리합니다.

## 4. 레이아웃에 포함되는 선을 구분합니다

다음 CSS는 **샘플 배치를 연결하는 제안 recipe**입니다. 수치는 비교용 실측값이며 실제 제품에서는 semantic/component token에 연결합니다.
기존 AgentHubButton의 상태·focus 스타일을 덮어쓰지 않고 wrapper와 슬롯의 배치를 연결합니다.

```css
.progress-alert {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 640px;
  max-width: 100%;
  min-width: 0;
  min-height: 46px;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  background: #f4f4f4;
  box-shadow: none;
  overflow: visible;
}
.progress-alert-message {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}
.progress-alert-icon {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
}
.progress-alert-title {
  margin: 0;
  min-width: 0;
  font: 600 14px/20px Pretendard, sans-serif;
  color: #1c1c1c;
}
.progress-alert-actions {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 8px;
}
.progress-alert-action {
  flex: 0 0 auto;
  height: 28px;
  white-space: nowrap;
}
```

root는 실제 border가 레이아웃에 포함되므로 샘플의 x13·y9·높이46을 재현합니다.
두 버튼은 반대로 inside stroke가 레이아웃에서 제외됩니다. 기존 AgentHubButton의 해당 구현을 우선 사용하며,
adapter가 필요하면 다음과 같이 **레이아웃을 차지하지 않는 선 레이어**로 구현할 수 있습니다.

```css
/* 기존 버튼에 같은 선이 있다면 이 레이어를 중복 추가하지 않습니다. */
.tertiary-28-inside-border {
  position: relative;
  box-sizing: border-box;
  height: 28px;
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
}
.tertiary-28-inside-border::before {
  content: "";
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: inherit;
  pointer-events: none;
}
```

이 보조 예시는 enabled 버튼의 선 배치만 설명합니다. 실제 버튼의 배경·라벨·hover·pressed·disabled·focus는
[AgentHubButton](../AgentHubButton/README.md)의 계약과 제품 adapter에서 유지합니다. label49/76px에 좌우 padding16px를 더하면
65/92px가 되며, 실제 border2px를 더해67/94px·높이30px로 만들지 않습니다.

640px·46px는 원본 샘플입니다. 반응형으로 폭을 줄일 때 긴 제목의 줄바꿈·동작 그룹의 다음 행 배치·그룹 안 버튼 줄바꿈은
제품이 별도로 채택해야 합니다. 위 CSS만으로 모든 좁은 화면의 배치가 완성됐다고 간주하지 않습니다.
버튼 높이28px와 shrink0를 유지하고 제목·긴 번역·단일 버튼이 넘치는 경우까지 검사합니다. 잘라내기나 숨김으로 해결하지 않습니다.

## 5. 자산과 제품 동작을 검증합니다

[기존 circle-alert20 SVG](../../assets/icons/circle-alert/20.svg)를 실제20px로 연결합니다. 기존 manifest의 원본·해시·선1.25px·
round cap/join·#1C1C1C를 유지하며 새 파일이나 유사 glyph를 만들지 않습니다. 외부 `img`를 쓴다면 장식으로 처리하고,
부모 CSS `color`만 바꿔도 SVG 내부 stroke가 자동으로 바뀐다고 가정하지 않습니다.
[자산 연결 안내](../../assets.md)에 따라 제품 소유 경로를 사용하며 임시 Figma URL을 런타임에 연결하지 않습니다.

[검증 항목](./verification.md)과 소비 저장소의 lint/typecheck/test/build를 실행합니다. 재시도 한 번·중복 입력·늦은 응답·
대상 변경·draft 보존·명시적 편집 focus·긴 번역·확대·live 안내 중복을 실제 제품에서 확인합니다.
문서와 정적 실측만으로 재시도 성공·요청 취소·stream·dark·반응형 지원이 완료됐다고 선언하지 않습니다.
