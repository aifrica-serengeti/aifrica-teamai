# Async Content State 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

Overlay의 geometry와 minimum-visible lifecycle은 [스타일 문서](./styles.md)의 원문 계약을 함께 적용한다.

## 3. Header refresh control

Header의 `titleAction` 또는 `buttonGroup`에 page 요구에 맞는 기존 control을 둔다. Dashboard처럼
새로고침 주기를 함께 선택하면 `SplitButton`, 단일 icon action이면 `IconButton`을 사용한다.

```tsx
<PageHeader
  buttonGroup={
    <DashboardRefreshControl
      disabled={isEditing || saving}
      loading={refreshing}
      onRefresh={() => void refresh()}
    />
  }
/>
```

| 상태              | control          | 접근 가능한 이름            | 재실행 |
| ----------------- | ---------------- | --------------------------- | ------ |
| idle              | enabled          | `새로고침` 또는 선택된 주기 | 허용   |
| request loading   | disabled/loading | `새로고침 중`               | 금지   |
| external disabled | disabled         | 기존 의미 유지              | 금지   |

Control은 loading 중 다시 실행하지 않는다. edit draft, saving, invalid id 같은 업무 상태는 parent가
`disabled`로 전달한다. API 요청·취소·error 처리는 page/query hook이 소유한다.

List/Detail의 icon refresh profile은 명시적 요청에서 최소 600ms 동안 disabled와 `.8s linear infinite`
icon 회전을 유지한다. 이 page feedback과 overlay의 400ms+240ms presence lifecycle은 목적이 다르므로
한 timer로 합치지 않는다. reduced-motion에서는 회전/transform을 제거하되 busy 상태와 live label은 유지한다.

Page는 요청을 시작한 event에서 loading copy reason을 갱신하고, minimum-visible 또는 fade-out 구간이
끝날 때까지 그 문구를 유지한다. `visible=false`가 됐다는 이유만으로 기본 문구를 `불러오는 중`에서
`새로고침 중`으로 바꾸지 않는다. `RefreshContentOverlay`는 전달받은 문구를 그대로 표현하며 page의
요청 원인이나 이전 prop을 별도 state로 복제하지 않는다. 실제 다음 요청 event에서만 새 문구를 전달한다.

## 5. Table과의 관계

[Table](../Table/README.md)는 자체 loading/error overlay와 sticky header hierarchy를 가진다. Table body
loading을 Table이 소유하는 화면은 `loading` prop만 사용하고 page overlay를 겹치지 않는다. 반대로
List Page의 표준 page overlay profile을 채택한 화면은 Table의 `loading`을 끄고
`RefreshContentOverlay` 하나만 사용한다.

어느 profile이든 같은 영역에 두 overlay를 mount하면 z-index와 aria-live 메시지가 중복되므로 금지한다.
Table이 loading을 소유할 때 medium Table은 medium Spinner와 body2 문구, small Table은 small Spinner와
compact 문구를 사용한다. loading 문구에는 empty/error 제목의 semibold 강조를 적용하지 않는다.
