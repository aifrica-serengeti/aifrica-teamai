# Icon Button — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Icon Button 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`IconButton.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
import { Icon } from "./Icon"; // 공용 Icon 컴포넌트
import type { IconSize } from "./iconTokens";
import type { SystemIconName } from "./iconMap";
import {
  iconButtonBase,
  iconButtonSize,
  iconButtonVariant,
} from "./IconButton.css";

export type IconButtonSize = "tiny" | "medium" | "xlarge";
export type IconButtonVariant = "outlined" | "ghost";

/** 버튼 size 생략 시 icon 의 기본 사이즈 매핑 (Figma 권장 icon size). */
const DEFAULT_ICON_SIZE: Record<IconButtonSize, IconSize> = {
  tiny: "t",
  medium: "m",
  xlarge: "xl",
};

export interface IconButtonProps extends React.ComponentProps<"button"> {
  /** Figma System icon 이름 (공용 Icon 컴포넌트로 위임). */
  icon: SystemIconName;
  /** 버튼 터치 영역 사이즈. 기본 medium(24px). */
  size?: IconButtonSize;
  /** 스타일. 기본 outlined. */
  variant?: IconButtonVariant;
  /** icon 사이즈. 생략 시 size 에 따른 기본값(t/m/xl) 자동 매핑. */
  iconSize?: IconSize;
}

function IconButton({
  icon,
  size = "medium",
  variant = "outlined",
  iconSize,
  disabled,
  type,
  className,
  ...props
}: IconButtonProps) {
  const resolvedIconSize = iconSize ?? DEFAULT_ICON_SIZE[size];

  return (
    <button
      type={type ?? "button"}
      data-slot="icon-button"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={cn(
        iconButtonBase,
        iconButtonVariant[variant],
        iconButtonSize[size],
        className,
      )}
      {...props}
    >
      <Icon
        name={icon}
        size={resolvedIconSize}
        color={disabled ? "disabled" : "default"}
      />
    </button>
  );
}

export { IconButton };
```

