# Divider — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Divider 문서 인덱스](../README.md)

## 구현 내용

### Separator primitive (shadcn 기반, `separator.tsx`)

shadcn `Separator`를 그대로 사용한다. 선 자체는 Radix가 렌더하며 Tailwind 유틸리티로
두께/색상을 입힌다. 색상은 `bg-border`(`--border-default` 매핑)를 참조한다.

```tsx
import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
```

### Divider 컴포넌트 (`Divider.tsx`)

shadcn `Separator`를 재사용하며, 방향별 8px 여백을 가진 래퍼로 감싼다.
`orientation` prop은 래퍼(`data-orientation`)와 `Separator` 양쪽에 전달된다.

```tsx
import type { ComponentProps } from "react";
import { Separator } from "./separator"; // 위 primitive
import { dividerWrapper } from "./Divider.css";

/**
 * Divider — 콘텐츠 사이를 나누는 구분선.
 *
 * shadcn Separator(Radix)를 재사용하며, Figma Divider 스펙에 맞춰
 * 선 주위에 방향별 8px 여백을 포함한 래퍼로 감싼다.
 *
 * Figma: RP8QTyB9n2ZpgfCgmuXgsz / node 5518:11122(horizontal), 5518:11121(vertical)
 *  - 선 두께: 1px
 *  - 선 색: --border-default (#dddddd, gray-300) — separator 가 자체 사용
 *  - 여백: 선 기준 양옆/위아래 8px
 */
export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <div
      className={`${dividerWrapper} ${className ?? ""}`}
      data-orientation={orientation}
    >
      <Separator orientation={orientation} {...props} />
    </div>
  );
}
```

