import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import "./Disclosure.css";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    update();
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
export function AnimatedDisclosure({
  open,
  children,
  id,
  className = "",
  durationMs = 250,
  style,
  triggerRef,
}: {
  open: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
  durationMs?: number;
  style?: CSSProperties;
  triggerRef?: RefObject<HTMLElement | null>;
}) {
  const [present, setPresent] = useState(open);
  const outer = useRef<HTMLDivElement>(null),
    inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const version = useRef(0);
  const entering = useRef(false);
  useLayoutEffect(() => {
    const token = ++version.current;
    if (open && !present) {
      entering.current = true;
      setPresent(true);
      return;
    }
    const node = outer.current,
      body = inner.current;
    if (!node || !body) return;
    if (!open && node.contains(document.activeElement))
      triggerRef?.current?.focus();
    node.inert = !open;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (token !== version.current) return;
      if (open) {
        node.style.height = "auto";
        node.style.overflow = "visible";
      } else setPresent(false);
    };
    if (reduced) {
      node.style.transition = "none";
      node.style.height = open ? "auto" : "0px";
      finish();
      return;
    }
    node.style.overflow = "hidden";
    const current = entering.current ? 0 : node.getBoundingClientRect().height;
    entering.current = false;
    node.style.transition = "none";
    node.style.height = `${current}px`;
    void node.offsetHeight;
    node.style.transition = `height ${durationMs}ms ease`;
    node.style.height = open
      ? `${body.getBoundingClientRect().height}px`
      : "0px";
    timer = setTimeout(finish, durationMs);
    const observer = new ResizeObserver(() => {
      if (open && token === version.current && node.style.height !== "auto")
        node.style.height = `${body.getBoundingClientRect().height}px`;
    });
    observer.observe(body);
    return () => {
      version.current++;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [open, present, reduced, durationMs, triggerRef]);
  if (!present) return null;
  return (
    <div
      ref={outer}
      id={id}
      className={`common-disclosure ${className}`}
      data-open={open}
      aria-hidden={!open || undefined}
      inert={!open}
      style={style}
    >
      <div ref={inner} className="common-disclosure-content">
        {children}
      </div>
    </div>
  );
}
