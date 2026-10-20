# Badge — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Badge 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Badge.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
import { badgeDot, badgeCounterBase, badgeCounter } from "./Badge.css";

export type BadgeVariant = "dot" | "counter";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  /** Counter variant 의 항목 수. dot variant 에서는 무시. */
  count?: number;
  /** count 캡핑 임계값. 초과 시 "{max}+". 기본 99. */
  max?: number;
}

/** count 를 표시 문자열로 변환. max 초과 시 "{max}+". */
function formatCount(count: number, max: number): string {
  if (count > max) return `${max}+`;
  return String(count);
}

function Badge({
  className,
  variant = "dot",
  count,
  max = 99,
  ...props
}: BadgeProps) {
  // Dot variant — 단순 원형 렌더.
  if (variant === "dot") {
    return (
      <span
        data-slot="badge"
        data-variant="dot"
        role="status"
        aria-label="새 알림"
        className={cn(badgeDot, className)}
        {...props}
      />
    );
  }

  // Counter variant
  const safeCount = count ?? 0;
  // count 가 0 이하면 렌더하지 않는다(알림 없음).
  if (safeCount <= 0) return null;

  const label = formatCount(safeCount, max);
  const isCapped = safeCount > max;

  return (
    <span
      data-slot="badge"
      data-variant="counter"
      data-capped={isCapped ? "" : undefined}
      role="status"
      aria-label={`${safeCount}개의 알림`}
      className={cn(
        badgeCounterBase,
        isCapped ? badgeCounter.counterMax : badgeCounter.counter,
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}

export { Badge };
```

