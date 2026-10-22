# AgentHubChatHeader — 기존 헤더 연결과 새 구현

아래는 **제품 API 제안과 DOM·CSS recipe**입니다. 실제 Agent Hub export나 Figma root API가 아닙니다.
공용을 켠 UI 작업에서만 `DOCS_ROOT/frontend/design/component-workflow.md`와 공용 Breadcrumb·IconButton 계약을 함께 읽습니다.

## 1. 기존 대화 헤더와 adapter를 찾습니다

1. 소비 저장소의 대화 헤더·현재 위치 표시·IconButton public export·실제 action owner를 검색합니다.
   같은 역할이 있으면 해당 영역에 연결하고 지역 header·Breadcrumb nav·popup 엔진을 중첩하지 않습니다.
2. [AgentHubBreadcrumb](../AgentHubBreadcrumb/README.md)의 실제 slash source와
   [AgentHubIconButton](../AgentHubIconButton/README.md)의 ghost24 adapter를 대조합니다.
   호환 구현이 없을 때만 가까운 대화 UI 범위에 가장 좁은 새 export를 개발합니다. PageHeader나 CMP shell을 복사하지 않습니다.
3. [자산 기록](../../references/chat-header.assets.json)의 실제 pause/file/more16을 제품 소유 경로에 연결합니다.
   `icon/plus/24`라는 남은 이름을 따르지 않습니다. 원본16px·선1px·paint를 유지하며 일반 file 타일이나20/24px glyph로 대체하지 않습니다.
4. 실제 입력·배치·접근성·제품 명령을 검증한 뒤 source/public export·token/asset adapter를 로컬 mapping에 기록합니다.
   검증 전에는 `unmapped`/`draft`를 유지하며 원본 serengeti나 공용 컴포넌트를 수정하지 않습니다.

## 2. 표시와 명령을 구분한 API 제안

```ts
// 실제 export가 아닌 제안입니다. visible은 노출만 제어합니다.
type ChatHeaderAction =
  | { visible: false }
  | {
      visible?: true;
      label: string;
      onActivate: () => void;
      disabled?: boolean; // 제품에서 채택한 추가 요청/권한 상태입니다.
    };

export type AgentHubChatHeaderProps = {
  currentLabel: string;
  breadcrumbAriaLabel: string;
  showActiveIndicator?: boolean; // 기본 true. 실제 진행 상태를 계산하지 않습니다.
  pause: ChatHeaderAction;
  file: ChatHeaderAction;
  more: ChatHeaderAction;
} & (
  | { indicatorMode?: "static"; indicatorSessionKey?: never }
  | { indicatorMode: "thinking"; indicatorSessionKey: string }
);
```

실제 root에는 active-indicator/pause/file/more의 네 BOOLEAN만 있습니다. currentLabel·label·callback·disabled는 제품 API 제안입니다.
pause/file/more 객체의 visible은 해당 노출값에 대응하고 기본 true를 채택할 수 있습니다. false이면 다른 필드 없이 제거합니다.
indicatorMode 미지정은 static입니다. thinking을 명시하면 [motion adapter](./motion.md)로 indicator slot만 교체하고 안정적인 active request key를 전달합니다.
showActiveIndicator=false가 mode보다 우선하며, 원본 네 Boolean에 motion 속성을 추가한 것으로 기록하지 않습니다.
실행·스트리밍·파일·popup 상태는 호출부가 소유하며 IconButton은 실제 disabled와 click 한 경로만 연결합니다.
callback이 필요한 표시 action에 실제 기능을 연결하지 않은 채 빈 함수로 완료 처리하지 않습니다.
popup을 채택하면 기존 popup의 trigger/open 계약에 연결하고 같은 동작의 별도 click을 중복하지 않습니다.

## 3. 배치 recipe

```text
기존 대화 영역의 지역 header 또는 새 지역 header 한 개
├─ AgentHubBreadcrumb: 현재 항목 텍스트 한 개·separator 없음
├─ showActiveIndicator일 때 장식 indicator
└─ 표시할 action이 있을 때 actions
   └─ 남은 pause/file/more 순서대로 ghost24 native IconButton + glyph16
```

현재 항목은 제품에서 결정한 현재 위치로 표시하며 임의 href를 만들지 않습니다. 모든 action이 숨겨지면 actions wrapper도 렌더하지 않습니다.
다음 CSS는640px fixture의 기본 배치를 설명합니다. 실제 색상은 같은 의미의 제품 token에 연결하고 child 상태는 기존 adapter를 사용합니다.

```css
.hub-chat-header {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 4px;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  overflow: visible;
  background: #fff;
  /* 생성 코드의 참고 변환값입니다. 원본 blur radius는11.5이며 시각 등가는 미검증입니다. */
  backdrop-filter: blur(5.75px);
}
.hub-chat-header-current { min-width: 0; }
.hub-chat-header-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
}
.hub-chat-header-action {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
}
.hub-chat-header-glyph { display: block; flex: 0 0 16px; width: 16px; height: 16px; }
.hub-chat-header-indicator {
  position: absolute;
  left: 0;
  bottom: -1px;
  /* 원본 fixture의 폭입니다. 가변 폭에서의 정책은 제품에서 확인합니다. */
  width: 325px;
  height: 1px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(69, 196, 214, 0) 0%,
    #45c4d6 35.576921701431274%,
    #9f83ef 71.15384340286255%,
    rgba(159, 131, 239, 0) 100%
  );
}
```

실제 Breadcrumb/ghost24 adapter가 텍스트16/24·r4·glyph16 중앙 정렬·기본 투명을 소유합니다.
이 CSS는 자식의 hover·pressed·disabled·focus를 다시 만드는 전역 variant가 아닙니다.
root의 border-box48px 안에 하단1px가 있어24px 자식이 y11.5에 놓입니다. indicator의 `bottom:-1px`는
border와 같은 y47 행에 놓기 위한 배치이며 `bottom:0`으로 올리거나 추가 선을 겹치지 않습니다.
325px는 반응형 진행률 상수가 아닙니다.640px 밖의 실제 가용 폭에서 길이를 어떻게 조정할지는 별도 제품 정책으로 검증합니다.

## 4. 실제 제품에서 확인합니다

기본 Figma fixture를 먼저 대조한 뒤 긴 currentLabel·다른 언어·font 로드·zoom·작은 패널을 검사합니다.
88px와80px는 원본 제목과 세 버튼의 HUG 결과이므로 제목이나 actions의 전역 고정 폭으로 사용하지 않습니다.
협소 폭의 축약·재배치·높이 증가가 필요하면 Breadcrumb의 실제16px 측정과 제품 정책을 연결하고 접근 가능한 원문·모든 action을 보존합니다.

불투명 흰색 배경을 유지합니다. 원본 BACKGROUND_BLUR11.5와 생성 코드의 CSS5.75를 구분해 기록하고
blur를 강조하려고 반투명 배경·shadow·sticky를 임의 추가하지 않습니다. 현재 recipe만으로 시각 등가나 모든 브라우저 검증을 완료했다고 쓰지 않습니다.
indicator는 `aria-hidden="true"`이며 progressbar·live region으로 바꾸지 않습니다. 기본 static에는 animation이 없으며 thinking을 채택할 때만 [motion 제안](./motion.md)을 연결합니다.
SVG는 [자산 안내](../../assets.md)에 따라 임시 URL이나 TeamAI 문서 경로 대신 제품 소유 경로로 연결합니다.
[검증](./verification.md)을 마친 뒤 실제 source와 public export만 로컬 mapping에 기록합니다.
