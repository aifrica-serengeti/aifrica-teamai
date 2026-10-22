import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, ComponentPropsWithRef, ReactNode } from "react";
import "./ScrollArea.css";

export type ScrollMetrics = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
  canScrollUp: boolean;
  canScrollDown: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
};
export type ScrollAreaHandle = {
  scrollTo: (options: ScrollToOptions) => void;
  ensureVisible: (element: HTMLElement) => void;
};
type Props = Omit<ComponentPropsWithRef<"div">, "ref"> & {
  ref?: React.Ref<ScrollAreaHandle>;
  children: ReactNode;
  height?: CSSProperties["height"];
  maxHeight?: CSSProperties["maxHeight"];
  orientation?: "vertical" | "horizontal" | "both";
  visibility?: "always" | "hover";
  label?: string;
  viewportClassName?: string;
  contentClassName?: string;
  viewportStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  onScrollMetricsChange?: (metrics: ScrollMetrics) => void;
};
const empty: ScrollMetrics = {
  scrollTop: 0,
  scrollHeight: 0,
  clientHeight: 0,
  scrollLeft: 0,
  scrollWidth: 0,
  clientWidth: 0,
  canScrollUp: false,
  canScrollDown: false,
  canScrollLeft: false,
  canScrollRight: false,
};
export function ScrollArea({
  ref,
  children,
  height,
  maxHeight,
  orientation = "vertical",
  visibility = "always",
  label = "스크롤 영역",
  className = "",
  viewportClassName = "",
  contentClassName = "",
  style,
  viewportStyle,
  contentStyle,
  onScrollMetricsChange,
  ...rest
}: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState(empty);
  const [dragging, setDragging] = useState(false);
  const last = useRef(empty);
  const callback = useRef(onScrollMetricsChange);
  callback.current = onScrollMetricsChange;
  const measure = useCallback(() => {
    const node = viewport.current;
    if (!node) return;
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = node;
    const next = {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
      canScrollUp: scrollTop > 0,
      canScrollDown: scrollTop + clientHeight < scrollHeight - 1,
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft + clientWidth < scrollWidth - 1,
    };
    if (
      Object.keys(next).some(
        (key) =>
          next[key as keyof ScrollMetrics] !==
          last.current[key as keyof ScrollMetrics],
      )
    ) {
      last.current = next;
      setMetrics(next);
      callback.current?.(next);
    }
  }, []);
  const ensureVisible = useCallback(
    (element: HTMLElement) => {
      const node = viewport.current;
      if (!node || !node.contains(element)) return;
      const box = node.getBoundingClientRect(),
        item = element.getBoundingClientRect();
      if (item.top < box.top) node.scrollTop -= box.top - item.top;
      else if (item.bottom > box.bottom)
        node.scrollTop += item.bottom - box.bottom;
      if (orientation !== "vertical") {
        if (item.left < box.left) node.scrollLeft -= box.left - item.left;
        else if (item.right > box.right)
          node.scrollLeft += item.right - box.right;
      }
      measure();
    },
    [measure, orientation],
  );
  useImperativeHandle(
    ref,
    () => ({
      scrollTo(options) {
        viewport.current?.scrollTo(options);
        measure();
      },
      ensureVisible,
    }),
    [ensureVisible, measure],
  );
  useLayoutEffect(() => {
    const node = viewport.current,
      inner = content.current;
    if (!node || !inner) return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observer.observe(inner);
    measure();
    return () => observer.disconnect();
  }, [measure]);
  const drag = useRef<{
    axis: "x" | "y";
    start: number;
    scroll: number;
    pointer: number;
  } | null>(null);
  useEffect(
    () => () => {
      drag.current = null;
    },
    [],
  );
  const vertical =
    orientation !== "horizontal" &&
    metrics.scrollHeight > metrics.clientHeight + 1;
  const horizontal =
    orientation !== "vertical" && metrics.scrollWidth > metrics.clientWidth + 1;
  function bar(axis: "x" | "y") {
    const client = axis === "y" ? metrics.clientHeight : metrics.clientWidth;
    const total = axis === "y" ? metrics.scrollHeight : metrics.scrollWidth;
    const position = axis === "y" ? metrics.scrollTop : metrics.scrollLeft;
    const track = Math.max(0, client - 6 - (axis === "x" && vertical ? 11 : 0));
    const length = Math.min(
      track,
      Math.max(24, total ? (track * client) / total : track),
    );
    const travel = Math.max(0, track - length);
    const offset = total > client ? (position / (total - client)) * travel : 0;
    return (
      <div
        className={`common-scroll-track common-scroll-track-${axis}`}
        aria-hidden="true"
        onPointerDown={(event) => {
          if (event.target !== event.currentTarget || !viewport.current) return;
          const box = event.currentTarget.getBoundingClientRect();
          const point =
            axis === "y" ? event.clientY - box.top : event.clientX - box.left;
          const next = Math.max(
            0,
            Math.min(
              total - client,
              ((point - length / 2) / Math.max(1, travel)) * (total - client),
            ),
          );
          if (axis === "y") viewport.current.scrollTop = next;
          else viewport.current.scrollLeft = next;
          measure();
        }}
      >
        <div
          className="common-scroll-thumb"
          style={
            axis === "y"
              ? { height: length, transform: `translateY(${offset}px)` }
              : { width: length, transform: `translateX(${offset}px)` }
          }
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            drag.current = {
              axis,
              start: axis === "y" ? event.clientY : event.clientX,
              scroll: position,
              pointer: event.pointerId,
            };
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const state = drag.current;
            if (
              !state ||
              state.pointer !== event.pointerId ||
              !viewport.current
            )
              return;
            const delta =
              (axis === "y" ? event.clientY : event.clientX) - state.start;
            const value =
              state.scroll + (delta / Math.max(1, travel)) * (total - client);
            if (axis === "y") viewport.current.scrollTop = value;
            else viewport.current.scrollLeft = value;
            measure();
          }}
          onPointerUp={(event) => {
            drag.current = null;
            setDragging(false);
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
          }}
          onLostPointerCapture={() => {
            drag.current = null;
            setDragging(false);
          }}
        />
      </div>
    );
  }
  return (
    <div
      {...rest}
      className={`common-scroll-area ${className}`}
      data-orientation={orientation}
      data-visibility={visibility}
      data-dragging={dragging}
      data-overflow-y={vertical}
      data-overflow-x={horizontal}
      style={{ height, maxHeight, ...style }}
    >
      <div
        ref={viewport}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`common-scroll-viewport ${viewportClassName}`}
        style={viewportStyle}
        onScroll={measure}
        onFocusCapture={(event) => {
          if (event.target instanceof HTMLElement) ensureVisible(event.target);
        }}
      >
        <div
          ref={content}
          className={`common-scroll-content ${contentClassName}`}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
      {vertical && bar("y")}
      {horizontal && bar("x")}
    </div>
  );
}
