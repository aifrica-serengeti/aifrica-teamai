# Notification — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Notification 문서 인덱스](../README.md)

## 구현 내용

### Props와 렌더 조합

```tsx
export type NotificationType =
  "inline" | "inlineLineBreak" | "toast" | "actionable" | "linkable";
export type NotificationState =
  "info" | "success" | "warning" | "error" | "loading";
export type NotificationTitleOverflow = "ellipsis" | "wrap";

export interface NotificationLink {
  label: React.ReactNode;
  href?: string;
  onClick?: React.ComponentProps<"a">["onClick"];
  target?: React.ComponentProps<"a">["target"];
  rel?: React.ComponentProps<"a">["rel"];
}

export interface NotificationProps extends Omit<
  React.ComponentProps<"article">,
  "title"
> {
  type?: NotificationType;
  state?: NotificationState;
  titleOverflow?: NotificationTitleOverflow;
  title?: React.ReactNode;
  message: React.ReactNode;
  link?: NotificationLink;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  showCloseButton?: boolean;
  open?: boolean;
  onExitComplete?: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}
```

```tsx
const statusByState = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
  loading: "inProgress",
} as const;

function DetailLink({
  link,
  standalone = false,
}: {
  link: NotificationLink;
  standalone?: boolean;
}) {
  return (
    <Link
      size="medium"
      href={link.href}
      onClick={link.onClick}
      target={link.target}
      rel={link.rel}
      type={standalone ? "standalone" : "inline"}
      external={standalone}
    >
      {link.label}
    </Link>
  );
}

// 핵심: timeout은 mount 당 한 번만 만들고, timeout 완료 뒤 exit animation을 거친다.
function useToastAutoClose(enabled: boolean, delay: number, close: () => void) {
  const closeRef = React.useRef(close);
  React.useEffect(() => {
    closeRef.current = close;
  }, [close]);
  React.useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => closeRef.current(), delay);
    return () => window.clearTimeout(timer);
  }, []);
}

// article 내부 순서: accent → status slot → text → optional dependency → close IconButton.
// Inline일 때 DetailLink는 같은 행; Linkable일 때만 standalone=true로 icon 옵션을 사용한다.
```

### Container 필수 흐름

```tsx
<ScrollArea
  type="hover"
  orientation="vertical"
  stickToEnd
  onScrollMetricsChange={handleScrollMetricsChange}
  contentClassName="notificationContainerContent"
>
  <div ref={itemListRef} className="notificationContainerItems">
    {children.map((child) => (
      <div
        key={child.key}
        data-notification-key={child.key}
        className="notificationContainerItem"
      >
        {cloneElement(child, {
          open: isClearing ? false : child.props.open,
          onExitComplete: countClearExitAndCallOnClear,
        })}
      </div>
    ))}
  </div>
</ScrollArea>
```

`useLayoutEffect`에서 각 wrapper의 이전/현재 `offsetTop`을 Map으로 비교해 FLIP animation을
적용한다. `getBoundingClientRect()`는 scroll 이동값을 포함하므로 금지한다. scroll fade는
Container의 `data-scroll-position="none|top|middle|bottom"`에 연결한 `::before/::after` 16px
gradient로 그린다.

### 11.1 그대로 복사할 Notification 로직

아래 코드는 의존 컴포넌트의 import 경로와 `cn` 함수의 이름만 바꾸면 되는 기준 구현이다.
CSS module을 쓰면 `styles.foo`를 해당 class 이름으로 치환한다. `setTimeout` effect의 빈
의존 배열과 `autoCloseConfig` ref는 의도적이다. 이것이 새 Toast마다 독립된 5초 timer를
보장한다.

```tsx
type Presence = "entering" | "resting" | "exiting";

const statusByNotificationState: Record<NotificationState, StatusState> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
  loading: "inProgress",
};

function NotificationStatus({ state }: { state: NotificationState }) {
  return (
    <span className={styles.statusSlot} aria-hidden="true">
      <Status state={statusByNotificationState[state]} showLabel={false} />
    </span>
  );
}

function NotificationDetailLink({
  link,
  standalone = false,
}: {
  link: NotificationLink;
  standalone?: boolean;
}) {
  return (
    <Link
      className={standalone ? styles.standaloneLink : styles.inlineLink}
      size="medium"
      href={link.href}
      onClick={link.onClick}
      target={link.target}
      rel={link.rel}
      // Linkable의 아이콘은 Link의 standalone + external 조합이 유일한 구현 경로다.
      type={standalone ? "standalone" : "inline"}
      external={standalone}
    >
      {link.label}
    </Link>
  );
}

export function Notification({
  className,
  type = "inline",
  state = "info",
  titleOverflow = "ellipsis",
  title,
  message,
  link,
  actionLabel,
  onAction,
  showCloseButton = true,
  open = true,
  onExitComplete,
  onClose,
  autoClose = type === "toast",
  autoCloseDelay = 5000,
  onAnimationEnd,
  ...articleProps
}: NotificationProps) {
  const isInline = type === "inline";
  const isInlineLineBreak = type === "inlineLineBreak";
  const isFloating = !isInline && !isInlineLineBreak;
  const motion = type === "toast" ? "toast" : "inline";
  const [presence, setPresence] = useState<Presence>(
    open ? "entering" : "exiting",
  );
  const exitReason = useRef<"close-button" | "controlled" | null>(
    open ? null : "controlled",
  );
  const didFinishExit = useRef(false);
  const closeRef = useRef<() => void>(() => undefined);

  // mount 시점의 한 항목의 정책을 고정한다. 부모/형제 렌더에 의해 5초를 다시 세면 안 된다.
  const autoCloseConfig = useRef({
    enabled:
      (type === "toast" || type === "actionable") &&
      autoClose &&
      open &&
      Boolean(onClose),
    delay: autoCloseDelay,
  });

  useEffect(() => {
    if (!open && presence !== "exiting") {
      exitReason.current = "controlled";
      setPresence("exiting");
    }
  }, [open, presence]);

  const requestClose = useCallback(() => {
    if (!onClose || presence === "exiting") return;
    exitReason.current = "close-button";
    setPresence("exiting");
  }, [onClose, presence]);

  useEffect(() => {
    closeRef.current = requestClose;
  }, [requestClose]);

  useEffect(() => {
    const { enabled, delay } = autoCloseConfig.current;
    if (!enabled) return;
    const timer = window.setTimeout(() => closeRef.current(), delay);
    return () => window.clearTimeout(timer);
  }, []); // 이 effect는 한 Toast instance당 정확히 한 번만 실행한다.

  const handleAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLElement>) => {
      onAnimationEnd?.(event);
      if (event.target !== event.currentTarget) return;
      if (presence === "entering") {
        setPresence("resting");
        return;
      }
      if (presence !== "exiting" || didFinishExit.current) return;
      didFinishExit.current = true;
      onExitComplete?.();
      // controlled close(Container clear)는 부모가 onExitComplete에서 제거한다.
      // 사용자 close/timeout만 onClose를 호출해 해당 ID를 제거한다.
      if (exitReason.current === "close-button") onClose?.();
    },
    [onAnimationEnd, onClose, onExitComplete, presence],
  );

  return (
    <article
      data-slot="notification"
      data-type={type}
      data-state={state}
      data-title-overflow={titleOverflow}
      data-motion={motion}
      data-presence={presence}
      role={state === "error" ? "alert" : "status"}
      aria-hidden={presence === "exiting" || undefined}
      className={cn(
        styles.notification,
        styles.notificationMotion,
        styles.notificationType[type],
        !isFloating && styles.inlineSurfaceState[state],
        className,
      )}
      onAnimationEnd={handleAnimationEnd}
      {...articleProps}
    >
      <span
        className={cn(styles.accent, styles.accentState[state])}
        aria-hidden="true"
      />

      {isInline && (
        <div className={styles.inlineContent}>
          <NotificationStatus state={state} />
          <div className={styles.inlineText}>
            {title && <strong className={styles.title}>{title}</strong>}
            <p className={styles.inlineMessage}>{message}</p>
          </div>
          {link && <NotificationDetailLink link={link} />}
        </div>
      )}

      {isInlineLineBreak && (
        <div className={styles.inlineLineBreakContent}>
          <NotificationStatus state={state} />
          <div className={styles.lineBreakText}>
            {title && <strong className={styles.title}>{title}</strong>}
            <p className={styles.lineBreakMessage}>
              {message}
              {link && (
                <>
                  {" "}
                  <NotificationDetailLink link={link} />
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {isFloating && (
        <div className={styles.floatingContent}>
          <NotificationStatus state={state} />
          <div className={styles.floatingText}>
            {title && <strong className={styles.title}>{title}</strong>}
            <p className={styles.floatingMessage}>{message}</p>
            {type === "actionable" && actionLabel && (
              <Button
                className={styles.actionButton}
                variant="tertiary"
                size="small"
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            )}
            {type === "linkable" && link && (
              <NotificationDetailLink link={link} standalone />
            )}
          </div>
        </div>
      )}

      {showCloseButton && onClose && (
        <IconButton
          className={cn(styles.closeButton, styles.closeButtonPosition[type])}
          icon="close"
          variant="ghost"
          size="medium"
          aria-label="알림 닫기"
          disabled={presence === "exiting"}
          onClick={requestClose}
        />
      )}
    </article>
  );
}
```

### 11.2 그대로 복사할 Container 로직

Container에 들어가는 자식은 `Notification`만으로 제한한다. 다른 노드를 허용해야 한다면
그 노드는 그대로 통과시키되, Notification에만 `open`/`onExitComplete`를 주입한다. 다음
구현에서 `offsetTop`을 `getBoundingClientRect().top`으로 교체하지 않는다.

```tsx
import {
  useRef,
  Children,
  useState,
  useEffect,
  useReducer,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactNode,
  useLayoutEffect,
  type ComponentProps,
} from "react";
import { IconButton } from "./IconButton";
import { ScrollArea, type ScrollAreaScrollMetrics } from "./ScrollArea";
import { cn } from "./cn";
import { Notification, type NotificationProps } from "./Notification";
import {
  container,
  containerItem,
  containerClose,
  containerItems,
  containerContent,
  containerScrollArea,
} from "./Notification.css";

export interface NotificationContainerProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  children?: ReactNode;
  showCloseButton?: boolean;
  onClear?: () => void;
  closeButtonLabel?: string;
  clearButtonKeyShortcuts?: string;
  /** Preserve bottom-follow for existing consumers; newest-first stacks can opt out. */
  stickToEnd?: boolean;
}

type ScrollPosition = "none" | "top" | "middle" | "bottom";
interface ClearState {
  keys: string[];
  finished: string[];
  onClear?: () => void;
}

function getScrollPosition({
  clientHeight,
  scrollHeight,
  scrollTop,
}: ScrollAreaScrollMetrics): ScrollPosition {
  if (scrollHeight <= clientHeight) return "none";
  if (scrollTop <= 1) return "top";
  if (scrollTop + clientHeight >= scrollHeight - 1) return "bottom";
  return "middle";
}

/**
 * Fixed-size Toast stack. It owns only presentation state (clear, fade and
 * FLIP); the page continues to own the keyed notification collection.
 */
export function NotificationContainer({
  children,
  showCloseButton = true,
  onClear,
  closeButtonLabel = "모든 알림 닫기",
  clearButtonKeyShortcuts,
  stickToEnd = true,
  className,
  ...divProps
}: NotificationContainerProps) {
  const [clearState, dispatchClear] = useReducer(
    (
      current: ClearState | undefined,
      action:
        | { type: "start"; state: ClearState }
        | { type: "finish"; key: string }
        | { type: "reset" },
    ): ClearState | undefined => {
      if (action.type === "start") return action.state;
      if (action.type === "reset") return undefined;
      return current &&
        current.keys.includes(action.key) &&
        !current.finished.includes(action.key)
        ? { ...current, finished: [...current.finished, action.key] }
        : current;
    },
    undefined,
  );
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("none");
  const itemListRef = useRef<HTMLDivElement>(null);
  const previousItemPositionsRef = useRef(new Map<string, number>());
  const items = Children.toArray(children);
  const notifications = items.filter(
    (child) =>
      isValidElement<NotificationProps>(child) && child.type === Notification,
  );
  const notificationCount = notifications.length;
  const notificationKeys = notifications.map((child) =>
    isValidElement(child) ? String(child.key) : "",
  );
  const clearComplete =
    clearState &&
    clearState.keys.every(
      (key) =>
        clearState.finished.includes(key) || !notificationKeys.includes(key),
    );

  const handleScrollMetricsChange = useCallback(
    (metrics: ScrollAreaScrollMetrics) => {
      const nextPosition = getScrollPosition(metrics);
      setScrollPosition((current) =>
        current === nextPosition ? current : nextPosition,
      );
    },
    [],
  );

  const isClearing = Boolean(clearState);

  useEffect(() => {
    if (!clearComplete) return;
    clearState.onClear?.();
    dispatchClear({ type: "reset" });
  }, [clearComplete, clearState]);

  const handleClear = () => {
    if (isClearing || notificationCount === 0) return;
    dispatchClear({
      type: "start",
      state: { keys: notificationKeys, finished: [], onClear },
    });
  };

  const renderedItems = items.map((child, index) => {
    if (
      !isValidElement<NotificationProps>(child) ||
      child.type !== Notification
    ) {
      return child;
    }
    const childKey = String(child.key ?? `notification-${index}`);
    const originalOnExitComplete = child.props.onExitComplete;
    return (
      <div
        key={childKey}
        className={containerItem}
        data-notification-key={childKey}
      >
        {cloneElement(child, {
          open: clearState?.keys.includes(childKey) ? false : child.props.open,
          onExitComplete: () => {
            originalOnExitComplete?.();
            dispatchClear({ type: "finish", key: childKey });
          },
        })}
      </div>
    );
  });

  useLayoutEffect(() => {
    const itemList = itemListRef.current;
    if (!itemList) return;
    const nextPositions = new Map<string, number>();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    Array.from(itemList.children).forEach((item) => {
      const element = item as HTMLElement;
      const key = element.dataset.notificationKey;
      if (!key) return;
      const nextTop = element.offsetTop;
      const previousTop = previousItemPositionsRef.current.get(key);
      if (!prefersReducedMotion && previousTop !== undefined) {
        const deltaY = previousTop - nextTop;
        if (Math.abs(deltaY) > 1) {
          element.getAnimations().forEach((animation) => animation.cancel());
          element.animate(
            [
              { transform: `translateY(${deltaY}px)` },
              { transform: "translateY(0)" },
            ],
            { duration: 200, easing: "ease-out" },
          );
        }
      }
      nextPositions.set(key, nextTop);
    });
    previousItemPositionsRef.current = nextPositions;
  });

  return (
    <div
      {...divProps}
      data-slot="notification-container"
      data-scroll-position={scrollPosition}
      className={cn(container, className)}
    >
      <ScrollArea
        className={containerScrollArea}
        contentClassName={containerContent}
        type="hover"
        orientation="vertical"
        stickToEnd={stickToEnd}
        onScrollMetricsChange={handleScrollMetricsChange}
      >
        <div ref={itemListRef} className={containerItems}>
          {renderedItems}
        </div>
      </ScrollArea>
      {showCloseButton && notificationCount > 0 && (
        <IconButton
          data-slot="notification-clear"
          aria-keyshortcuts={clearButtonKeyShortcuts}
          title={
            clearButtonKeyShortcuts
              ? `${closeButtonLabel} (${clearButtonKeyShortcuts})`
              : closeButtonLabel
          }
          className={containerClose}
          icon="close"
          iconSize="s"
          variant="ghost"
          size="tiny"
          label={closeButtonLabel}
          disabled={isClearing}
          onClick={handleClear}
        />
      )}
    </div>
  );
}
```

### 11.3 socket/실시간 Toast를 연결하는 부모 코드

기존 정적 예시와 실시간 Toast를 구분한다. 정적 예시는 `autoClose: false`, 새 socket/event
알림만 `autoClose: true`다. 새 객체를 배열 끝에 `push`하면 최상단 시작 요구를 위반한다.

```tsx
type ToastItem = { id: string; state: NotificationState; autoClose: boolean }

const [toasts, setToasts] = useState<ToastItem[]>(initialExamples) // initialExamples는 autoClose: false
const nextSequence = useRef(0)

const addLiveToast = useCallback(() => {
  const sequence = nextSequence.current++
  const state: NotificationState = ['info', 'success', 'warning', 'error', 'loading'][sequence % 5]
  setToasts((current) => [
    { id: `live-toast-${sequence}`, state, autoClose: true }, // 반드시 앞에 삽입
    ...current,
  ])
}, [])

const removeToast = useCallback((id: string) => {
  setToasts((current) => current.filter((toast) => toast.id !== id))
}, [])

<NotificationContainer stickToEnd={false} onClear={() => setToasts([])}>
  {toasts.map((toast) => (
    <Notification
      key={toast.id} // index 금지: 각 Toast timer/presence를 보존해야 한다.
      type="toast"
      state={toast.state}
      title={titles[toast.state]}
      message={messages[toast.state]}
      autoClose={toast.autoClose}
      onClose={() => removeToast(toast.id)}
    />
  ))}
</NotificationContainer>
```

### 11.5 앱 Provider와 선언적 알림

공용 Provider·Toast·ToastGroup 구현은 `소유 모듈`(참조 모듈 역할)에 둔다.
Props는 해당 TSX에 선언한다. 등록 Context는 안정된 register/unregister만 전달하며 표시 배열은 Provider가
소유한다. effect 등록/해제는 React commit과 UI 표시의 수명주기를 연결한다. key와 내용 revision으로
닫힘 및 timer identity를 보존하고, query·draft·안전한 오류 번역은 외부 호출자에 남긴다.
Container clear는 클릭 시점의 key/callback을 캡처하여 이후 알림이 소급해서 닫히지 않게 한다.

등록·revision·닫힘 상태 계산은 `notification-toast-state.ts`(참조 모듈 역할)의 private helper에 둔다. Provider는 React 수명과 callback 실행을 소유하며 helper를 공용 barrel에 재노출하지 않는다.
앱 Provider는 Container에 `stickToEnd={false}`를 전달한다. viewport의 `onWheel`과 `onTouchMove`는 `event.stopPropagation()`만 실행하여 모달의 document scroll lock에 잡히지 않고 브라우저 기본 스크롤을 유지한다. CSS overscroll containment를 함께 적용하며 배경 이벤트와 focus trap은 건드리지 않는다.
