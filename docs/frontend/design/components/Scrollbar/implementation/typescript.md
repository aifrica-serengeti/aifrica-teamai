# Scrollbar & ScrollArea — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Scrollbar & ScrollArea 문서 인덱스](../README.md)

## 구현 내용

### ScrollArea.tsx (React)

```tsx
import {
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  type Ref,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@design/cn";
import {
  wrapper,
  scrollContainer,
  content,
  thumbVertical,
  thumbHorizontal,
} from "./ScrollArea.css";

export type ScrollAreaType = "auto" | "always" | "hover" | "scroll";
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaScrollMetrics {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

export interface ScrollAreaHandle {
  scrollTo: (options: ScrollToOptions) => void;
}

export interface ScrollAreaProps {
  ref?: Ref<ScrollAreaHandle>;
  children: ReactNode;
  /** 스크롤바 노출 타이밍. 기본 "hover". */
  type?: ScrollAreaType;
  /** 스크롤 방향. 기본 "vertical". */
  orientation?: ScrollAreaOrientation;
  /**
   * 스크롤바 thumb 두께(px). 기본 4(Figma 스펙).
   * inset(컨테이너 안쪽 여백)은 이 값에 비례해 자동 계산(Figma 비율 0.75).
   */
  thumbWidth?: number;
  /** wrapper 에 적용할 클래스(고정 height/width 등). */
  className?: string;
  /** sticky header 등의 상단 고정 영역 아래에서 수직 thumb를 시작할 추가 여백(px). */
  verticalThumbOffset?: number;
  /** 콘텐츠 추가 클래스. */
  contentClassName?: string;
  /** 사용자가 최하단일 때만 콘텐츠 증가 후 새 최하단을 유지한다. */
  stickToEnd?: boolean;
  /** 실제 scroll container의 수직 측정값이 변경될 때 호출한다. */
  onScrollMetricsChange?: (metrics: ScrollAreaScrollMetrics) => void;
}

interface ThumbGeometry {
  size: number; // thumb 길이(주축, px)
  offset: number; // thumb 이동 거리(주축, px)
}

/** Figma 비율(3px inset / 4px thumb)로 inset 자동 계산. */
const THUMB_INSET_RATIO = 0.75;
const calcInset = (thumbWidth: number) => thumbWidth * THUMB_INSET_RATIO;

/** 컨테이너 + 콘텐츠 크기로부터 thumb 기하 계산. */
function computeGeometry(
  clientSize: number,
  scrollSize: number,
  scrollPos: number,
  leadingInset: number,
  trailingInset: number,
): ThumbGeometry {
  if (scrollSize <= clientSize) return { size: 0, offset: 0 };
  const trackSize = Math.max(0, clientSize - leadingInset - trailingInset);
  const size = Math.min(
    trackSize,
    Math.max(trackSize * (clientSize / scrollSize), 24),
  );
  const maxOffset = trackSize - size;
  const offset =
    leadingInset + (scrollPos / (scrollSize - clientSize)) * maxOffset;
  return { size, offset };
}

export function ScrollArea({
  ref,
  children,
  type = "hover",
  orientation = "vertical",
  thumbWidth = 4,
  verticalThumbOffset = 0,
  className,
  contentClassName,
  stickToEnd = false,
  onScrollMetricsChange,
}: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vThumb, setVThumb] = useState<ThumbGeometry | null>(null);
  const [hThumb, setHThumb] = useState<ThumbGeometry | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousScrollHeight = useRef(0);
  const wasAtVerticalEnd = useRef(true);
  const dragRef = useRef<{
    axis: "v" | "h";
    startPos: number;
    startScroll: number;
  } | null>(null);

  const showVertical = orientation === "vertical" || orientation === "both";
  const showHorizontal = orientation === "horizontal" || orientation === "both";
  const inset = calcInset(thumbWidth);
  const safeVerticalThumbOffset = Math.max(0, verticalThumbOffset);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (options) => scrollRef.current?.scrollTo(options),
    }),
    [],
  );

  const updateThumbs = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const contentGrew = el.scrollHeight > previousScrollHeight.current;
    if (stickToEnd && showVertical && contentGrew && wasAtVerticalEnd.current) {
      el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
    }
    const metrics = {
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      scrollTop: el.scrollTop,
    };
    previousScrollHeight.current = metrics.scrollHeight;
    wasAtVerticalEnd.current =
      metrics.scrollTop + metrics.clientHeight >= metrics.scrollHeight - 1;
    onScrollMetricsChange?.(metrics);
    if (showVertical) {
      setVThumb(
        computeGeometry(
          el.clientHeight,
          el.scrollHeight,
          el.scrollTop,
          inset + safeVerticalThumbOffset,
          inset,
        ),
      );
    }
    if (showHorizontal) {
      setHThumb(
        computeGeometry(
          el.clientWidth,
          el.scrollWidth,
          el.scrollLeft,
          inset,
          inset,
        ),
      );
    }
  }, [
    showVertical,
    showHorizontal,
    inset,
    safeVerticalThumbOffset,
    stickToEnd,
  ]);

  // type="scroll"/"auto" — is-scrolling 토글(800ms 디바운스) + thumb 갱신.
  const handleScroll = useCallback(() => {
    updateThumbs();
    if (type === "scroll" || type === "auto") {
      const el = scrollRef.current;
      const wrap = el?.parentElement; // is-scrolling 은 wrapper 에 부여
      if (el && wrap) {
        wrap.classList.add("is-scrolling");
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(
          () => wrap.classList.remove("is-scrolling"),
          800,
        );
      }
    }
  }, [type, updateThumbs]);

  // thumb 드래그로 스크롤 이동(수직).
  const onVerticalPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = scrollRef.current;
      if (!el || !vThumb) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        axis: "v",
        startPos: e.clientY,
        startScroll: el.scrollTop,
      };
    },
    [vThumb],
  );

  const onHorizontalPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = scrollRef.current;
      if (!el || !hThumb) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        axis: "h",
        startPos: e.clientX,
        startScroll: el.scrollLeft,
      };
    },
    [hThumb],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      const el = scrollRef.current;
      if (!drag || !el) return;
      if (drag.axis === "v") {
        const delta = e.clientY - drag.startPos;
        const scrollable = el.scrollHeight - el.clientHeight;
        const thumbTrack =
          el.clientHeight -
          (vThumb?.size ?? 0) -
          (inset + safeVerticalThumbOffset) -
          inset;
        if (thumbTrack > 0)
          el.scrollTop = drag.startScroll + (delta / thumbTrack) * scrollable;
      } else {
        const delta = e.clientX - drag.startPos;
        const scrollable = el.scrollWidth - el.clientWidth;
        const thumbTrack = el.clientWidth - (hThumb?.size ?? 0) - inset * 2;
        if (thumbTrack > 0)
          el.scrollLeft = drag.startScroll + (delta / thumbTrack) * scrollable;
      }
    },
    [vThumb, hThumb, inset, safeVerticalThumbOffset],
  );

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      dragRef.current = null;
    }
  }, []);

  // 초기 마운트 + 리사이즈 감시 + 네이티브 scroll 리스너.
  useEffect(() => {
    updateThumbs();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    const ro = new ResizeObserver(() => updateThumbs());
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      ro.disconnect();
    };
  }, [updateThumbs, handleScroll, children]);

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    },
    [],
  );

  return (
    <div
      data-slot="scroll-area"
      data-type={type}
      data-orientation={orientation}
      className={cn(wrapper, className)}
    >
      <div
        ref={scrollRef}
        data-slot="scroll-container"
        className={scrollContainer}
      >
        <div className={cn(content, contentClassName)}>{children}</div>
      </div>

      {showVertical && vThumb && vThumb.size > 0 && (
        <div
          role="scrollbar"
          aria-orientation="vertical"
          className={thumbVertical}
          style={{
            top: 0,
            right: `${inset}px`,
            width: `${thumbWidth}px`,
            height: `${vThumb.size}px`,
            transform: `translateY(${vThumb.offset}px)`,
          }}
          onPointerDown={onVerticalPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      )}

      {showHorizontal && hThumb && hThumb.size > 0 && (
        <div
          role="scrollbar"
          aria-orientation="horizontal"
          className={thumbHorizontal}
          style={{
            left: 0,
            bottom: `${inset}px`,
            height: `${thumbWidth}px`,
            width: `${hThumb.size}px`,
            transform: `translateX(${hThumb.offset}px)`,
          }}
          onPointerDown={onHorizontalPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      )}
    </div>
  );
}
```
