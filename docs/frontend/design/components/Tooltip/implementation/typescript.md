# Tooltip — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Tooltip 문서 인덱스](../README.md)

## 구현 내용

### 11.2 화살표 path 상수 (tooltip.tsx)

**핵심: CSS 회전 대신 방향별 별도 path 사용.** 회전을 쓰면 레이아웃 박스(8×15)와 회전 후 시각적 영역(15×8)이 불일치하여 정렬이 어긋난다. 각 방향별 path를 미리 생성하면 회전 없이 정확히 렌더링된다.

```ts
const ARROW_PATHS = {
  // ▲ 위(content 방향) — Figma 원본 ▼ 의 Y축 반전. content가 위에 있을 때(top).
  top: "M7.85248 7.59293C7.46625 7.96086 6.85922 7.96086 6.47299 7.59293L0.312263 1.72405C-0.341298 1.10145 0.0993652 0 1.00201 0L13.3235 0C14.2261 0 14.6668 1.10145 14.0132 1.72405L7.85248 7.59293Z",
  // ▼ 아래(content 방향) — Figma 원본. content가 아래에 있을 때(bottom).
  bottom:
    "M6.47299 0.275951C6.85922 -0.0919837 7.46625 -0.0919838 7.85248 0.275951L14.0132 6.14483C14.6668 6.76743 14.2261 7.86888 13.3235 7.86888H1.00201C0.0993652 7.86888 -0.341298 6.76743 0.312263 6.14483L6.47299 0.275951Z",
  // ◀ 왼쪽(content 방향) — content가 왼쪽에 있을 때(left).
  left: "M7.59293 6.47299C7.96086 6.85922 7.96086 7.46625 7.59293 7.85248L1.72405 14.0132C1.10145 14.6668 0 14.2261 0 13.3235L0 1.00201C0 0.0993652 1.10145 -0.341298 1.72405 0.312263L7.59293 6.47299Z",
  // ▶ 오른쪽(content 방향) — content가 오른쪽에 있을 때(right).
  right:
    "M0.275951 7.85248C-0.0919837 7.46625 -0.0919838 6.85922 0.275951 6.47299L6.14483 0.312263C6.76743 -0.341298 7.86888 0.0993652 7.86888 1.00201L7.86888 13.3235C7.86888 14.2261 6.76743 14.6668 6.14483 14.0132L0.275951 7.85248Z",
} as const;

const ARROW_VIEWBOX = {
  top: "0 0 14.3255 7.86888",
  bottom: "0 0 14.3255 7.86888",
  left: "0 0 7.86888 14.3255",
  right: "0 0 7.86888 14.3255",
} as const;
```

### 11.4 tooltip.tsx (전체)

```tsx
"use client";
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@design/cn";
import { tooltipContent, tooltipArrow } from "./tooltip.css";

// ARROW_PATHS, ARROW_VIEWBOX — 위 11.2 참조

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 8,
  variant = "icon",
  showArrow = true,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  variant?: "icon" | "standard";
  showArrow?: boolean;
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        data-variant={variant}
        sideOffset={sideOffset}
        className={cn(tooltipContent, className)}
        {...props}
      >
        {children}
        {showArrow && <ArrowSideInjector className={tooltipArrow} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/**
 * ArrowSideInjector — 부모 Content의 data-side/data-align을 읽어 화살표에 복사.
 * Radix는 Content에만 속성을 설정하므로, CSS [data-side=...] 셀렉터가
 * 화살표에서 동작하려면 화살표 요소 자체에 속성을 복사해야 한다.
 *
 * collision detection 대응: Radix Popper가 viewport 밖으로 튀어나갈 때
 * data-side/data-align을 DOM에 직접 갱신하지만 React 리렌더를 트리거하지 않는다.
 * MutationObserver로 속성 변화를 감지하여 실시간 동기화한다.
 */
function ArrowSideInjector({ className }: { className: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [side, setSide] = React.useState<
    "top" | "bottom" | "left" | "right" | undefined
  >();
  const [align, setAlign] = React.useState<string | undefined>();

  React.useEffect(() => {
    const span = ref.current;
    if (!span) return;
    const content = span.closest(
      '[data-slot="tooltip-content"]',
    ) as HTMLElement | null;
    if (!content) return;

    const sync = () => {
      const s = content.getAttribute("data-side") as
        | "top"
        | "bottom"
        | "left"
        | "right"
        | null;
      const a = content.getAttribute("data-align");
      if (s) setSide(s);
      setAlign(a ?? undefined);
    };

    sync(); // 초기 동기화

    // MutationObserver — Radix collision detection 시 속성 갱신 감지
    const observer = new MutationObserver(sync);
    observer.observe(content, {
      attributes: true,
      attributeFilter: ["data-side", "data-align"],
    });
    return () => observer.disconnect();
  }, []);

  if (!side) {
    return <span ref={ref} className={className} aria-hidden="true" />;
  }

  return (
    <span
      ref={ref}
      className={className}
      data-side={side}
      data-align={align}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={ARROW_VIEWBOX[side]}
        fill="none"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <path d={ARROW_PATHS[side]} fill="currentColor" />
      </svg>
    </span>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

