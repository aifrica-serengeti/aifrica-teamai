# Notification — 정의와 구조

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](./README.md)

## 2. 의존 컴포넌트

직접 다시 구현하지 말고 아래 공용 컴포넌트를 조합한다. `Loading`은 Status가 Spinner를
내부에서 재사용하므로 Notification이 Spinner를 직접 렌더하지 않는다.

| 의존 컴포넌트      | 용도                             | 가이드라인                                       | Notification에서의 사용                                                                                                 |
| ------------------ | -------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Status**         | 상태 아이콘                      | [Status](../Status/README.md)                    | `showLabel={false}`. Status의 기본 20px icon을 사용하고, `loading`은 `state="inProgress"`.                              |
| **Link**           | 인라인/독립 상세 링크            | [Link](../Link/README.md)                        | `size="medium"`. Linkable의 trailing 아이콘은 별도 Icon을 조립하지 않고 `type="standalone" external`로 Link가 렌더한다. |
| **Icon Button**    | 개별 닫기·전체 닫기              | [Icon Button](../IconButton/README.md)           | 개별: `icon="close" variant="ghost" size="medium"`; 전체: `size="tiny" iconSize="s"`.                                   |
| **Button**         | Actionable의 보조 액션           | [Button](../Button/README.md)                    | `variant="tertiary" size="small"`.                                                                                      |
| **ScrollArea**     | Container 스크롤·thumb·drag      | [Scrollbar & ScrollArea](../Scrollbar/README.md) | `type="hover" orientation="vertical" stickToEnd`. 스크롤바를 별도로 만들지 않는다.                                      |
| **Spinner** (간접) | Loading Status의 회전 인디케이터 | [Spinner](../Spinner/README.md)                  | Status의 `inProgress` 구현에만 의존.                                                                                    |

```
Notification
├── Status
│   └── Spinner (loading일 때만, Status 내부 의존)
├── Link
├── Icon Button
├── Button (actionable만)
└── Notification Container
    ├── ScrollArea
    └── Icon Button (전체 닫기)
```

## 3. 구조 (Anatomy)

```
Notification (article, role=status 또는 alert)
├── Accent bar (2px, 상태 색)
├── Contents
│   ├── Status icon slot (24×24; 실제 Status icon 20×20)
│   └── Text area
│       ├── Title (선택)
│       ├── Message
│       └── Link 또는 Button (type에 따라 선택)
└── Close Icon Button (선택, absolute)

Notification Container (392×500)
├── ScrollArea (hover scrollbar, stickToEnd)
│   └── Item list (16px inset, 12px gap)
│       └── Item wrapper (FLIP reflow animation)
│           └── Notification type="toast"
├── Top/bottom scroll fade (각 16px, scroll position에 따라 표시)
└── Clear Icon Button (우상단, 항목이 있을 때만)
```

### 실제 DOM 순서 — 이 순서를 바꾸지 않는다

다음은 스타일명만 프로젝트 CSS 방식에 맞게 바꿀 수 있는 **고정 DOM 계약**이다. `accent`를
text 영역 안으로 넣거나 close를 content flow 안에 넣으면 높이/ellipsis가 달라진다.

```tsx
// 공통 root. 모든 type이 이 article 하나를 surface로 사용한다.
<article className="notification notificationMotion notification--{type} notification--{state}" data-title-overflow="ellipsis|wrap">
  <span className="notification__accent" aria-hidden="true" />

  {/* type === 'inline' */}
  <div className="notification__inlineContent">
    <span className="notification__statusSlot" aria-hidden="true"><Status … /></span>
    <div className="notification__inlineText">
      <strong className="notification__title">{title}</strong> {/* title 있을 때만 */}
      <p className="notification__inlineMessage">{message}</p>
    </div>
    <Link className="notification__inlineLink" size="medium">…</Link> {/* link 있을 때만 */}
  </div>

  {/* type === 'inlineLineBreak' */}
  <div className="notification__lineBreakContent">
    <span className="notification__statusSlot" aria-hidden="true"><Status … /></span>
    <div className="notification__lineBreakText">
      <strong className="notification__title">{title}</strong>
      <p className="notification__lineBreakMessage">{message} <Link size="medium">…</Link></p>
    </div>
  </div>

  {/* type === 'toast' | 'actionable' | 'linkable' */}
  <div className="notification__floatingContent">
    <span className="notification__statusSlot" aria-hidden="true"><Status … /></span>
    <div className="notification__floatingText">
      <strong className="notification__title">{title}</strong>
      <p className="notification__floatingMessage">{message}</p>
      <Button variant="tertiary" size="small">…</Button> {/* actionable만 */}
      <Link size="medium" type="standalone" external>…</Link> {/* linkable만 */}
    </div>
  </div>

  <IconButton icon="close" variant="ghost" size="medium" /> {/* showCloseButton일 때만 */}
</article>
```

**주의:** 위 예시는 type별 branch를 한 블록에 보이기 위해 나열한 것이다. 실제 한
Notification 인스턴스는 세 content block 가운데 **하나만** 렌더한다. `inline`에
`floatingContent`를 섞거나 모든 block을 렌더한 뒤 CSS로 숨기지 않는다.

## 4. 레이아웃 스펙

### Notification 공통

| 항목          | 값                                                                             |
| ------------- | ------------------------------------------------------------------------------ |
| root          | `position: relative; display: flex; align-items: flex-start; overflow: hidden` |
| radius        | 4px (`--radius-sm`: 기본 radius 6px − 2px)                                     |
| accent        | 폭 2px, root 높이 전체를 채움                                                  |
| Status slot   | 24×24px, 중앙 정렬. 실제 Status icon은 20px                                    |
| Title         | 14px/20px, 600. 기본 `ellipsis`; `titleOverflow="wrap"`이면 여러 줄 전체 표시  |
| Message       | 14px/20px, 400                                                                 |
| close reserve | Inline/Inline-line break 콘텐츠 우측 40px; close button 자체는 24px hit area   |

### 타입별 크기와 내부 간격

| Type              | root 폭 |   최소 높이 | contents                                        | text/close 배치                                                |
| ----------------- | ------: | ----------: | ----------------------------------------------- | -------------------------------------------------------------- |
| Inline            |   535px |        40px | 높이 40px, padding 8px, gap 4px, 수직 중앙      | 제목·본문·Link가 같은 행. close는 `right: 8px; top: 50%`.      |
| Inline-line break |   360px |        62px | padding 8px, gap 4px, `align-items: flex-start` | text `padding-top: 2px`, title↔본문 gap 4px, close `top: 8px`. |
| Toast             |   360px | 콘텐츠 높이 | padding 16px, gap 4px                           | text 폭 278px, `padding-top: 2px`, close `top/right: 8px`.     |
| Actionable        |   360px | 콘텐츠 높이 | Toast와 동일                                    | Button은 본문 아래 8px margin.                                 |
| Linkable          |   360px | 콘텐츠 높이 | Toast와 동일                                    | 독립 Link는 본문 아래 8px margin, 높이 최소 24px.              |

본문은 `overflow-wrap: anywhere`로 긴 문자열을 줄바꿈한다. Toast/Actionable/Linkable만
개행을 보존하려면 `white-space: pre-line`을 사용한다.
제목도 전체 표시가 필요한 호출부는 `titleOverflow="wrap"`을 명시한다. 이 옵션은 root의
`data-title-overflow="wrap"`으로 표현하며, 외부 page CSS가 내부 `strong` 구조를 직접 선택하지 않는다.
Inline에서 이 옵션을 사용하면 content는 고정 `height: 40px` 대신 `height: auto; min-height: 40px`로
전환해 제목 줄 수에 맞춰 surface가 자연스럽게 늘어난다.

### Notification Container

| 항목                       | 값                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| 외곽 크기                  | 폭 392px, 높이/최대 높이 500px                                                                |
| ScrollArea content padding | 16px (따라서 360px Toast와 정확히 맞음)                                                       |
| item list                  | `flex-direction: column; align-items: flex-end; gap: 12px`                                    |
| 새 Toast 순서              | 배열의 **앞**에 삽입. 최신 Toast가 최상단.                                                    |
| clear control              | `top/right: 5px`, 22×22px, 원형 radius 11px, z-index 2                                        |
| scroll fade                | 상/하단 각각 16px. top=하단만, middle=양쪽, bottom=상단만 표시. overflow 없음이면 둘 다 숨김. |
| hover scrollbar            | ScrollArea `type="hover"`로 위임. Container가 scrollbar/drag 로직을 중복하지 않음.            |

### Viewport 우상단 mount profile

`NotificationContainer` 자체는 392×500의 relative stack surface다. 제품에서는 앱 루트의
`NotificationProvider`가 하나의 viewport와 Container를 소유한다. 페이지에 fixed wrapper를 만들지 않는다.
Dialog의 실패도 가려지지 않도록 제품 공용 알림 layer는 Dialog content(50) 위인 **60**이다.
viewport 폭은 `min(392px, 100vw)`, 높이는 `min(500px, 100dvh)`이며 그 안의 Container와 Toast만
좁은 화면에 맞게 축소한다. 독립 primitive와 스펙 전시의 고정 geometry는 유지한다.

```css
.notificationViewport {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 60;
  pointer-events: none;
}

.notificationViewport [data-slot="notification"] {
  pointer-events: auto;
}
```

wrapper 전체를 `pointer-events: auto`로 만들면 투명한 392×500 영역이 뒤의 page action을 가로막는다.
Toast surface·clear button·scrollbar만 pointer event를 받는다. `aria-live` viewport는 오류가 없어도
앱 루트에 유지해 Dialog의 배경 숨김 처리 후 발생한 실패도 알릴 수 있게 한다.

## 13. 구현 전 의존성 계약

새 환경의 공용 컴포넌트 API가 아래와 다르면 Notification 구현을 억지로 맞추지 말고, 먼저
공용 컴포넌트의 adapter를 만든다. 특히 Button·IconButton을 HTML button으로 대체하면 높이와
focus/hover 상태가 달라진다.

```ts
// Notification이 요구하는 최소 public API (의미와 prop 이름 모두 고정)
Status({ state: 'info' | 'success' | 'warning' | 'error' | 'inProgress', showLabel: false })
Link({ size: 'medium', type: 'inline' | 'standalone', href?, onClick?, target?, rel?, external?: boolean })
IconButton({ icon: 'close', variant: 'ghost', size: 'medium' | 'tiny', iconSize?: 's' })
Button({ variant: 'tertiary', size: 'small', onClick? })
ScrollArea({
  type: 'hover', orientation: 'vertical', stickToEnd: true,
  className?, contentClassName?, onScrollMetricsChange?, children,
})
```

| 필요 API                           | Notification이 기대하는 정확한 책임                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Status`                           | 20px 상태 아이콘을 렌더한다. Notification은 24×24 slot만 제공한다. `loading`에는 `inProgress`를 넘긴다.                                           |
| `Link.external`                    | `type="standalone" external`이면 Link가 텍스트 뒤의 공용 외부 링크 아이콘과 자체 간격/색/hover state를 렌더한다. Inline에는 쓰지 않는다.          |
| `IconButton`                       | close의 24px 계열 touch target, ghost state, focus ring을 가진다. Container clear만 `tiny` + `iconSize="s"`다.                                    |
| `ScrollArea.onScrollMetricsChange` | `{ clientHeight, scrollHeight, scrollTop }`을 콘텐츠/resize/scroll 이후 반환한다. Container가 이를 `none/top/middle/bottom` fade 상태로 파생한다. |
| `ScrollArea.stickToEnd`            | 사용자가 최하단일 때만 콘텐츠 증가 후 bottom을 유지한다. 중간 위치에서는 강제 스크롤하지 않는다.                                                  |

`autoClose` 기본값은 Toast만 true이며 Actionable은 명시적 opt-in을 지원한다. `autoCloseDelay`와 종료 콜백은 동일한 계약을 사용한다.

### 공용 스택 소유권과 계약

| Export                 | 입력                                                      | 책임                                                                     |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| NotificationProvider   | children                                                  | 앱 단위 등록·표시·닫기와 하나의 viewport. domain/API 요청을 알지 않는다. |
| NotificationToast      | NotificationProps에서 type/actionLabel/onAction/link 제외 | 단순 toast로 등록. 재시도 버튼은 페이지에 남긴다.                        |
| NotificationToastGroup | children, onClear?                                        | 직접 자식인 keyed Notification을 등록. action/link/close 콜백 보존.      |

각 Props는 소유 컴포넌트 TSX에 둔다. 등록 ID는 컴포넌트 생명주기, 자식 key는 호출자가 가진 알림 ID다.
조회 오류·저장 오류·안전한 사용자 문구는 페이지에 남으며 HTTP client에서 무조건 알리지 않는다.
독립 컴포넌트/테스트의 Group은 부모 Provider가 없으면 로컬 Provider를 조립한다. 제품 페이지는 반드시
앱 Provider 아래에서 렌더해 여러 fallback stack이 만들어지지 않게 한다. SSR에서는 effect 등록 토스트를
출력하지 않으므로 알림 검증은 실제 클라이언트 mount로 수행한다.

### 공용 스택의 스크롤과 복구

`NotificationContainer.stickToEnd?: boolean`의 기본값은 `true`다. 앱 Provider는 최신 항목을 위에 넣는 순서에 맞게 `false`를 전달한다. 이 옵션은 ScrollArea의 기존 위치 정책에 위임하며 알림 배열을 재정렬하지 않는다.
