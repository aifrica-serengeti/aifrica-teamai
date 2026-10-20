# Notification — 사용 예제

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](../README.md)

## 구현 내용

### 11.4 Playground 전시 화면까지 재현하는 구성

컴포넌트 자체와 Playground 예시를 혼동하지 않는다. 예시 화면은 모든 Notification에
`width:100%`를 주는 목록이 아니라, 고정 폭 Notification을 `align-items:start` grid에
배치한다. 아래 코드가 현 Playground의 비교 기준이다.

```tsx
const states: NotificationState[] = [
  "info",
  "success",
  "warning",
  "error",
  "loading",
];
const toastStates: NotificationState[] = [
  "info",
  "success",
  "warning",
  "error",
  "loading",
  "info",
  "success",
  "warning",
  "error",
  "info",
];
const titles: Record<NotificationState, string> = {
  info: "Info Title",
  success: "Success Title",
  warning: "Warning Title",
  error: "Error Title",
  loading: "Loading Title",
};
const messages: Record<NotificationState, string> = {
  info: "정보에 관련된 텍스트는 이곳에 표시됩니다.",
  success: "성공에 관련된 텍스트는 이곳에 표시됩니다.",
  warning: "경고에 관련된 텍스트는 이곳에 표시됩니다.",
  error: "오류에 관련된 텍스트는 이곳에 표시됩니다.",
  loading: "로딩에 관련된 텍스트는 이곳에 표시됩니다.",
};
const detailLink = { label: "자세히보기", href: "#notification-container" };

function StateExample({
  type,
  state,
}: {
  type: NotificationType;
  state: NotificationState;
}) {
  const message =
    type === "inline"
      ? messages[state]
      : `${messages[state]}\n${messages[state]}`;
  return (
    <Notification
      type={type}
      state={state}
      title={titles[state]}
      message={message}
      link={
        type === "inline" || type === "inlineLineBreak" || type === "linkable"
          ? detailLink
          : undefined
      }
      actionLabel={type === "actionable" ? "Action Button" : undefined}
      onAction={() => undefined}
      // 전시용 toast는 자동 종료하지 않는다. Container의 "Toast 추가"만 true다.
      autoClose={type !== "toast"}
    />
  );
}

{
  /* 535px inline만 별도 grid. overflow-x는 좁은 화면에서 폭을 보존하기 위한 것이다. */
}
<div className="playgroundInlineGrid">
  {states.map((state) => (
    <div key={state} className="playgroundStateColumn">
      <span className="playgroundStateLabel">{state}</span>
      <StateExample type="inline" state={state} />
    </div>
  ))}
</div>;

{
  /* 360px type grid. type마다 content branch는 StateExample/Notification이 처리한다. */
}
{
  (["inlineLineBreak", "toast", "actionable", "linkable"] as const).map(
    (type) => (
      <div className="playgroundNotificationGrid" key={type}>
        {states.map((state) => (
          <div key={state} className="playgroundStateColumn">
            <span className="playgroundStateLabel">{state}</span>
            <StateExample type={type} state={state} />
          </div>
        ))}
      </div>
    ),
  );
}

{
  /* Container 초기 전시 목록은 10개이며 autoClose=false. */
}
<NotificationContainer onClear={() => setToasts([])}>
  {toasts.map(({ id, state, autoClose }) => (
    <Notification
      key={id}
      type="toast"
      state={state}
      title={titles[state]}
      message={`${messages[state]}\n${messages[state]}`}
      autoClose={autoClose}
      onClose={() => removeToast(id)}
    />
  ))}
</NotificationContainer>;
```

```css
/* Playground only — Notification component 스타일에는 넣지 않는다. */
.playgroundPage {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 96px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.playgroundSection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.playgroundStateColumn {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.playgroundNotificationGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, max-content));
  gap: 20px;
  align-items: start;
}
.playgroundInlineGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(535px, max-content));
  gap: 20px;
  align-items: start;
  overflow-x: auto; /* 535px를 mobile에서 축소시키지 않는다. */
  padding: 4px;
}
.playgroundContainerDemo {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}
```

`toastStates`로 만드는 초기 항목은 `{ id: \`toast-${index}\`, state, autoClose: false }`다.
`Toast 추가`버튼은 [11.3](./typescript.md#113-socket실시간-toast를-연결하는-부모-코드)의`addLiveToast`만
호출한다. 초기 예시까지 5초에 사라지게 만들면 Playground의 기본 전시가 사라지므로 금지한다.


### 제품 API 실패 연결

```tsx
// 앱 assembly: 한 번만 배치한다.
<NotificationProvider><App /></NotificationProvider>

// query, 입력값, 재시도와 사용자용 오류 문구는 계속 페이지 소유다.
{query.refreshError && (
  <NotificationToast state="error" title="새로고침 실패" message={query.refreshError} />
)}
{settings.status === "error" && (
  <>
    <NotificationToast state="error" message={settings.message} />
    <Button type="button" onClick={retrySettings}>다시 시도</Button>
  </>
)}

// 이미 페이지가 keyed toast collection을 소유하는 경우.
<NotificationToastGroup onClear={() => setToasts([])}>
  {toasts.map((toast) => (
    <Notification key={toast.id} type="toast" state={toast.state}
      message={toast.message} onClose={() => removeToast(toast.id)} />
  ))}
</NotificationToastGroup>
```

폼 필드 검증, 로딩, 소유자 안내는 기존 inline Notification 또는 필드 errorText로 유지한다.


최신 항목을 앞에 추가하는 독립 Container 예시는 `stickToEnd={false}`를 전달한다. 앱 Provider를 이용하는 호출부에서는 이 옵션을 직접 관리하지 않는다.
