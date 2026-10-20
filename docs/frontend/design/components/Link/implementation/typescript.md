# Link — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Link 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Link.tsx`)

```tsx
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { linkBase, linkSize } from "./Link.css";

export type LinkSize = "small" | "medium" | "large";

export interface LinkProps extends Omit<React.ComponentProps<"a">, "color"> {
  size?: LinkSize;
  /** Trailing 아이콘(Standalone link 에서 사용). Inline link 에는 사용 금지. */
  trailingIcon?: React.ReactNode;
  asChild?: boolean;
  /**
   * 비활성 상태. <a> 는 표준 disabled 속성이 없으므로 별도 prop 으로 받아
   * aria-disabled + pointer-events:none 으로 처리한다.
   */
  disabled?: boolean;
}

function Link({
  className,
  size = "medium",
  trailingIcon,
  asChild = false,
  disabled,
  ...props
}: LinkProps) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="link"
      data-size={size}
      aria-disabled={disabled || undefined}
      className={cn(linkBase, linkSize[size], className)}
      {...props}
    >
      <Slot.Slottable>{props.children}</Slot.Slottable>
      {trailingIcon}
    </Comp>
  );
}

export { Link };
```

