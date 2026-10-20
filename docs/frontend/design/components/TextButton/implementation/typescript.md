# Text Button — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Text Button 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`TextButton.tsx`)

```tsx
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { Icon } from "../icon/Icon"; // Icon 컴포넌트
import type { IconSize } from "../icon/iconTokens";
import type { SystemIconName } from "../icon/iconMap";
import { textButtonBase, textButtonSize } from "./TextButton.css";

export type TextButtonSize = "tiny" | "small" | "medium" | "large";

/** Text Button size → Icon size 자동 매핑 (Figma 아이콘 픽셀값 기준).
 *  tiny(14px)→s, small(16px)→m, medium(18px)→l, large(20px)→xl. */
const DEFAULT_ICON_SIZE: Record<TextButtonSize, IconSize> = {
  tiny: "s",
  small: "m",
  medium: "l",
  large: "xl",
};

export interface TextButtonProps extends React.ComponentProps<"button"> {
  size?: TextButtonSize;
  asChild?: boolean;
  /** 라벨 앞 아이콘 (Figma System icon 이름). */
  leadingIcon?: SystemIconName;
  /** 라벨 뒤 아이콘 (Figma System icon 이름). */
  trailingIcon?: SystemIconName;
  /** leading icon size override. 생략 시 button size 에 따라 자동 매핑. */
  leadingIconSize?: IconSize;
  /** trailing icon size override. 생략 시 button size 에 따라 자동 매핑. */
  trailingIconSize?: IconSize;
}

function TextButton({
  className,
  size = "medium",
  asChild = false,
  leadingIcon,
  trailingIcon,
  leadingIconSize,
  trailingIconSize,
  type,
  disabled,
  children,
  ...props
}: TextButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const resolvedLeadingSize = leadingIconSize ?? DEFAULT_ICON_SIZE[size];
  const resolvedTrailingSize = trailingIconSize ?? DEFAULT_ICON_SIZE[size];

  // Icon 색상: 버튼 텍스트 색상(color)을 상속(inherit).
  // disabled 여부에 따라 아이콘이 텍스트와 동일한 색을 갖는다.
  const iconStyle = { color: "inherit" } as const;

  return (
    <Comp
      data-slot="text-button"
      data-size={size}
      type={asChild ? undefined : (type ?? "button")}
      disabled={asChild ? undefined : disabled}
      className={cn(textButtonBase, textButtonSize[size], className)}
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} size={resolvedLeadingSize} style={iconStyle} />
      )}
      {children}
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={resolvedTrailingSize}
          style={iconStyle}
        />
      )}
    </Comp>
  );
}

export { TextButton };
```

