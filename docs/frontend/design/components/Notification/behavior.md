# Notification — 상태와 동작

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](./README.md)

## 7. 상태와 상호작용

### Dismiss와 controlled open

1. root는 처음 `open=true`면 `entering`, `open=false`면 `exiting` presence를 가진다.
2. `open`이 `false`가 되면 exit animation을 시작하고, 종료 시 `onExitComplete`를 한 번 호출한다.
3. close button과 Toast 자동 닫기는 exit animation **후** `onClose`를 호출한다. 부모는 이
   콜백에서 해당 ID만 배열에서 제거한다.
4. `presence="exiting"`인 동안 close button은 disabled이며 article은 `aria-hidden=true`다.
5. Error는 `role="alert"`; 나머지는 `role="status"`다.

### Toast 자동 닫기

- `type="toast"` 또는 `type="actionable"`에서 `autoClose=true`, `onClose`가 충족되면 활성화한다. Toast는 기본 자동 닫기이며 Actionable은 명시적으로 `autoClose`를 전달한 경우에만 자동 닫힌다.
- 기본 `autoCloseDelay`는 **5000ms**다.
- 각 mount 인스턴스는 생성 시점의 `{ enabled, delay }`를 ref에 고정하고 timeout을 한 번만
  등록한다. 부모 재렌더·스크롤 위치 변화·형제 Toast 추가가 타이머를 재시작하면 안 된다.
- 정적 스펙 전시용 Toast는 `autoClose={false}`로 유지할 수 있다. 실시간/소켓 Toast에는
  `onClose={() => removeToast(id)}`와 `autoClose`를 제공한다.
- route mutation/preflight 오류처럼 다음 화면 조작을 막지 않는 feedback은 viewport 우상단 mount
  profile을 사용한다. 같은 오류를 본문 inline Notification과 Toast로 중복 표시하지 않는다.

```tsx
// 최신 알림은 앞에 넣고, 각 알림은 자기 own timer로 닫힌다.
setToasts((current) => [{ id, state, autoClose: true }, ...current])

<Notification
  key={toast.id}
  type="toast"
  state={toast.state}
  title={title}
  message={message}
  autoClose={toast.autoClose}
  onClose={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
/>
```

### Container clear·스크롤·재배치

- clear control은 Notification 자식 수가 0이면 렌더하지 않는다.
- clear 클릭 시점의 key와 onClear를 캡처한다. 해당 항목만 `open={false}`로 닫고 마지막 exit가
  완료되거나 소스가 제거된 뒤 콜백을 한 번 호출한다. 퇴장 중 새로 들어온 항목은 유지한다.
- ScrollArea가 최하단일 때 새 항목이 추가되면 `stickToEnd`가 최하단을 유지한다. 중간을 읽는
  중이면 scroll position을 바꾸지 않는다.
- item 제거 뒤 남은 item은 이전 `offsetTop`과 새 `offsetTop`의 차이를 계산해 200ms
  `translateY(delta) → translateY(0)` FLIP motion을 적용한다. `getBoundingClientRect()`를 쓰면
  사용자의 scroll 자체를 재배치로 오인하므로 쓰지 않는다.

## 8. 타이포그래피와 모션

### 제목 overflow

- `titleOverflow`의 기본값은 `ellipsis`이며 기존 한 줄 말줄임 동작을 유지한다.
- `titleOverflow="wrap"`은 제목 전체를 여러 줄로 표시하고 긴 단어도 `overflow-wrap: anywhere`로 줄바꿈한다.
- 이 옵션은 표시 계약만 바꾸며 role, live region, dismiss, 자동 닫기와 상태 동작에는 영향을 주지 않는다.

| 요소         | Typography                                              |
| ------------ | ------------------------------------------------------- |
| Title        | Pretendard SemiBold, 14px / 20px, weight 600 (`Title2`) |
| Message/Link | Pretendard Regular, 14px / 20px, weight 400 (`Body2`)   |

| 모션           | 값                                                                                      |
| -------------- | --------------------------------------------------------------------------------------- |
| Inline enter   | `opacity: 0; transform: scale(.96)` → `opacity: 1; transform: scale(1)`; 200ms ease-out |
| Inline exit    | 역방향; 200ms ease-in                                                                   |
| Toast enter    | `opacity: 0; transform: translateX(24px)` → 원위치; 200ms ease-out                      |
| Toast exit     | 원위치 → `opacity: 0; transform: translateX(24px)`; 200ms ease-in                       |
| Container FLIP | `translateY(delta)` → `translateY(0)`; 200ms ease-out                                   |
| 색상 전환      | background-color, border-color, color, box-shadow만 `0.2s ease`                         |

전역 `transition: all`은 금지한다. reduced-motion 환경에서는 transform animation을 생략한다.

### 앱 공용 알림 등록

- Group은 commit 이후 effect로 등록하고 unmount 시 해제한다. StrictMode setup/cleanup에도 중복되지 않는다.
- Provider의 등록 action Context는 안정된 identity를 가진다. toast 상태 변경으로 등록 effect를 반복 실행하지 않는다.
- 같은 key·같은 표시 내용의 재렌더와 콜백 교체는 타이머를 초기화하거나 닫힌 오류를 되살리지 않는다.
- 표시 내용이 바뀌면 새 revision으로 표시한다. 오류 해제 후 같은 오류가 다시 발생하면 새 알림이다.
- 개별 닫기는 exit 후 해당 항목만 숨기고 기존 onClose를 실행한다. 전체 닫기는 그룹 onClear를 한 번 실행하며,
  그룹 onClear가 없을 때만 각 항목 onClose를 호출한다. 페이지 입력과 query state는 임의로 지우지 않는다.
- 새 알림이 있는 그룹이 위로 들어오며 그룹 내 기존 key 순서를 유지한다. 페이지 이동·오류 해제로 소스가
  unmount되면 관련 알림을 해제한다. 자동 취소/백그라운드 실패를 HTTP layer에서 별도로 발행하지 않는다.
- API 실패의 재시도는 페이지/다이얼로그에 Button으로 남긴다. 알림을 닫아도 복구 경로를 잃지 않는다.

전체 닫기 완료 시점에 같은 그룹에 새 오류가 있으면 bulk onClear를 실행하지 않는다. 캡처된 revision이
아직 남은 항목의 onClose만 실행해 페이지의 최신 오류가 이전 clear 콜백에 지워지지 않게 한다.

### 공용 스택의 스크롤과 복구

공용 Provider는 하단 자동 추적을 끄고 scroll anchoring을 사용하지 않아 새 항목 삽입 시 최상단이 아래로 밀리지 않게 한다. 사용자가 스크롤한 위치를 임의로 0으로 초기화하지 않는다. viewport의 wheel/touchmove는 document로 전파하지 않고 네이티브 스크롤을 유지한다. 스크롤 경계는 overscroll containment로 배경에 전달하지 않는다.
