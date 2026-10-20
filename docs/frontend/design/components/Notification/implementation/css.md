# Notification — CSS와 스타일 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](../README.md)

## 12. 픽셀 규칙 CSS

이 CSS는 위 `styles.*` 이름의 기준값이다. CSS Modules, Tailwind, vanilla-extract 어느
도구를 사용하든 선언값과 적용 대상은 같아야 한다. App 전역에 `* { box-sizing: border-box; }`
가 없다면 먼저 추가한다. 없으면 360px surface가 padding/border만큼 커진다.

```css
/* Base + motion */
.notification {
  position: relative;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  border-radius: var(--radius-sm); /* 4px */
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.notification[data-presence] {
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.notification[data-motion="inline"][data-presence="entering"] {
  animation: notification-inline-enter 0.2s ease-out both;
}
.notification[data-motion="inline"][data-presence="exiting"] {
  animation: notification-inline-exit 0.2s ease-in both;
}
.notification[data-motion="toast"][data-presence="entering"] {
  animation: notification-toast-enter 0.2s ease-out both;
}
.notification[data-motion="toast"][data-presence="exiting"] {
  animation: notification-toast-exit 0.2s ease-in both;
}
@keyframes notification-inline-enter {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes notification-inline-exit {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}
@keyframes notification-toast-enter {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes notification-toast-exit {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(24px);
  }
}

/* Type surface. width:100%/max-width로 대체 금지. */
.notification[data-type="inline"] {
  width: 535px;
  box-shadow: var(--notification-inline-shadow);
}
.notification[data-type="inlineLineBreak"] {
  width: 360px;
  min-width: 360px;
  min-height: 62px;
  box-shadow: var(--notification-inline-shadow);
}
.notification[data-type="toast"],
.notification[data-type="actionable"],
.notification[data-type="linkable"] {
  width: 360px;
  min-width: 360px;
  background: var(--notification-floating-surface);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--notification-floating-shadow);
}

/* Inline state surface + shared 2px accent. */
.notification[data-type="inline"][data-state="info"],
.notification[data-type="inline"][data-state="loading"],
.notification[data-type="inlineLineBreak"][data-state="info"],
.notification[data-type="inlineLineBreak"][data-state="loading"] {
  background: var(--surface-primary-subtle);
}
.notification[data-type="inline"][data-state="success"],
.notification[data-type="inlineLineBreak"][data-state="success"] {
  background: var(--surface-success-subtle);
}
.notification[data-type="inline"][data-state="warning"],
.notification[data-type="inlineLineBreak"][data-state="warning"] {
  background: var(--surface-warning-subtle);
}
.notification[data-type="inline"][data-state="error"],
.notification[data-type="inlineLineBreak"][data-state="error"] {
  background: var(--surface-danger-subtle);
}

.notification__accent {
  align-self: stretch;
  flex: 0 0 2px;
  width: 2px;
}
.notification[data-state="info"] .notification__accent,
.notification[data-state="loading"] .notification__accent {
  background: var(--border-primary);
}
.notification[data-state="success"] .notification__accent {
  background: var(--border-success);
}
.notification[data-state="warning"] .notification__accent {
  background: var(--border-warning);
}
.notification[data-state="error"] .notification__accent {
  background: var(--border-error);
}

/* Exact content geometry */
.notification__inlineContent {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 8px 40px 8px 8px; /* 40px는 absolute close의 예약 영역 */
}
.notification__lineBreakContent {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  min-width: 0;
  padding: 8px 40px 8px 8px;
}
.notification__floatingContent {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  min-width: 0;
  padding: 16px;
}
.notification__statusSlot {
  display: inline-flex;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
}
.notification__inlineText {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 1 0;
  min-width: 0;
  color: var(--text);
}
.notification__lineBreakText {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
  color: var(--text);
}
.notification__floatingText {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 278px;
  min-width: 0;
  padding-top: 2px;
}
.notification__title {
  margin: 0;
  color: var(--text);
  font: var(--text-title2); /* 600 14px/20px */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
}
.notification[data-title-overflow="wrap"] .notification__title {
  overflow: visible;
  overflow-wrap: anywhere;
  text-overflow: clip;
  white-space: normal;
}
.notification[data-type="inline"][data-title-overflow="wrap"]
  .notification__inlineContent {
  height: auto;
  min-height: 40px;
}
.notification__inlineMessage {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--text);
  font: var(--text-body2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.notification__lineBreakMessage {
  min-width: 0;
  margin: 0;
  color: var(--text);
  font: var(--text-body2);
  line-height: 20px;
  overflow-wrap: anywhere;
}
.notification__floatingMessage {
  min-width: 0;
  margin: 0;
  color: var(--text-subtle);
  font: var(--text-body2);
  line-height: 20px;
  overflow-wrap: anywhere;
  white-space: pre-line;
}
.notification__inlineLink {
  flex-shrink: 0;
}
.notification__standaloneLink {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  margin-top: 8px;
}
.notification__actionButton {
  align-self: flex-start;
  margin-top: 8px;
}

/* close는 content flow에 넣지 않고 absolute로 둔다. */
.notification__close {
  position: absolute;
  right: 8px;
  z-index: 1;
}
.notification[data-type="inline"] .notification__close {
  top: 50%;
  transform: translateY(-50%);
}
.notification[data-type="inlineLineBreak"] .notification__close,
.notification[data-type="toast"] .notification__close,
.notification[data-type="actionable"] .notification__close,
.notification[data-type="linkable"] .notification__close {
  top: 8px;
}

/* Container: 392 outer - 16×2 inner = 360 Notification. */
.notificationContainer {
  position: relative;
  width: 392px;
  height: 500px;
  max-height: 500px;
}
.notificationContainer__scrollArea {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
}
.notificationContainer__content {
  padding: 16px;
}
.notificationContainer__items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}
.notificationContainer__item {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  will-change: transform;
}
.notificationContainer__clear {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background: var(--notification-clear-surface);
  box-shadow: var(--notification-clear-shadow);
}

/* Dialog의 scrollable content와 같은 16px boundary fade. backdrop-filter는 사용하지 않는다. */
.notificationContainer::before,
.notificationContainer::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  height: 16px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.notificationContainer::before {
  top: 0;
  background: linear-gradient(to bottom, var(--surface) 0%, transparent 100%);
}
.notificationContainer::after {
  bottom: 0;
  background: linear-gradient(to top, var(--surface) 0%, transparent 100%);
}
.notificationContainer[data-scroll-position="middle"]::before,
.notificationContainer[data-scroll-position="bottom"]::before {
  opacity: 1;
}
.notificationContainer[data-scroll-position="top"]::after,
.notificationContainer[data-scroll-position="middle"]::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .notification[data-presence] {
    animation: none;
  }
}
```

`styles.notification`, `styles.containerItem` 등의 실제 클래스명이 위 plain CSS selector와
다르더라도, 각각의 선언은 반드시 root/요소에 1회만 연결한다. `inlineContent`의
`width: 100%`는 **535px root 안의 내부 content 폭**이고, root 폭을 늘리라는 뜻이 아니다.

### JSX `styles` 이름 ↔ CSS selector 대응표

기준 JSX의 `styles` object를 아래처럼 매핑한다. vanilla-extract의 `styleVariants`를
사용한다면 `notificationType[type]`, `accentState[state]`, `inlineSurfaceState[state]`,
`closeButtonPosition[type]`이 이 표의 attribute selector와 같은 선언을 반환해야 한다.

| JSX에서 쓰는 이름                                                                              | 연결할 selector / 선언 위치                                                                                                 |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `notification`                                                                                 | `.notification`                                                                                                             |
| `notificationMotion`                                                                           | `.notification[data-presence]`와 `data-motion`/`data-presence` animation selectors                                          |
| `notificationType.inline`                                                                      | `.notification[data-type="inline"]`                                                                                         |
| `notificationType.inlineLineBreak`                                                             | `.notification[data-type="inlineLineBreak"]`                                                                                |
| `notificationType.toast/actionable/linkable`                                                   | 각 floating type selector의 동일한 360px surface 선언                                                                       |
| `inlineSurfaceState[state]`                                                                    | type=inline 또는 inlineLineBreak의 `data-state` subtle background 선언                                                      |
| `accent`, `accentState[state]`                                                                 | `.notification__accent` 및 state별 accent selector                                                                          |
| `inlineContent`, `inlineLineBreakContent`, `floatingContent`                                   | 각각 `.notification__inlineContent`, `.notification__lineBreakContent`, `.notification__floatingContent`                    |
| `statusSlot`, `inlineText`, `lineBreakText`, `floatingText`                                    | `.notification__statusSlot`, `.notification__inlineText`, `.notification__lineBreakText`, `.notification__floatingText`     |
| `title`, `inlineMessage`, `lineBreakMessage`, `floatingMessage`                                | `.notification__title`, `.notification__inlineMessage`, `.notification__lineBreakMessage`, `.notification__floatingMessage` |
| `inlineLink`, `standaloneLink`, `actionButton`                                                 | `.notification__inlineLink`, `.notification__standaloneLink`, `.notification__actionButton`                                 |
| `closeButton`, `closeButtonPosition[type]`                                                     | `.notification__close`와 type별 top selector                                                                                |
| `container`                                                                                    | `.notificationContainer`                                                                                                    |
| `containerScrollArea`, `containerContent`, `containerItems`, `containerItem`, `containerClose` | `.notificationContainer__scrollArea/content/items/item/clear`                                                               |

### 제품 공용 viewport CSS

기본 primitive의 위 고정 폭 규칙은 유지한다. 앱 Provider에서만 아래 profile을 적용한다.

```css
.notificationViewport {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 60;
  width: min(392px, 100vw);
  height: min(500px, 100dvh);
  max-height: 100dvh;
  pointer-events: none;
}
.notificationViewport [data-slot="notification-container"] {
  width: 100%;
  height: 100%;
  max-height: 100%;
}
.notificationViewport [data-slot="notification"] {
  width: 100%;
  min-width: 0;
  pointer-events: auto;
}
.notificationViewport [data-slot="notification-clear"],
.notificationViewport [role="scrollbar"] {
  pointer-events: auto;
}
.notificationViewport [data-slot="scroll-container"] {
  overscroll-behavior: contain;
  overflow-anchor: none;
}
```
