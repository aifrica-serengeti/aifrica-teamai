# Chip — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Chip 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Chip.tsx`)

```tsx
import * as React from "react";

import { cn } from "./utils"; // clsx + tailwind-merge
import { Icon } from "./Icon"; // 공용 Icon 컴포넌트
import type { SystemIconName } from "./iconMap";
import type { IconSize } from "./iconTokens";
import { IconButton } from "./IconButton"; // 공용 IconButton 컴포넌트
import type { IconButtonSize } from "./IconButton";
import {
  chipRoot,
  chipRootWithLeading,
  chipRootWithTrailing,
  chipRootWithBoth,
  chipLabel,
  chipIcon,
  chipIconButton,
} from "./Chip.css";

export type ChipColor =
  | "default"
  | "gray"
  | "green"
  | "blue"
  | "cyan"
  | "indigo"
  | "purple"
  | "fuchsia"
  | "navy";

export type ChipVariant = "filled" | "subtle" | "outlined";
export type ChipShape = "pill" | "rounded";
export type ChipSize = "small" | "medium";

/** Chip size → Icon size 매핑. small=s(14px), medium=m(16px). */
const CHIP_ICON_SIZE: Record<ChipSize, IconSize> = {
  small: "s",
  medium: "m",
};

/** Chip size → IconButton size 매핑.
 * small=xxs(16px), medium=tiny(20px). 공용 IconButton 보다 한 단계 작게. */
const CHIP_ICON_BUTTON_SIZE: Record<ChipSize, IconButtonSize> = {
  small: "xxs",
  medium: "tiny",
};

export interface ChipProps extends React.ComponentProps<"span"> {
  color?: ChipColor;
  variant?: ChipVariant;
  shape?: ChipShape;
  size?: ChipSize;
  disabled?: boolean;
  /** Leading icon. 공용 Icon 의 SystemIconName. 글자색 상속. */
  leadingIcon?: SystemIconName;
  /** 제거 버튼(trailing close) 클릭 핸들러. 전달 시 trailing IconButton 렌더. */
  onRemove?: () => void;
  removeLabel?: string;
}

function Chip({
  className,
  color = "default",
  variant = "subtle",
  shape = "pill",
  size = "small",
  disabled = false,
  leadingIcon,
  onRemove,
  removeLabel = "제거",
  children,
  ...props
}: ChipProps) {
  const hasLeading = Boolean(leadingIcon);
  const hasTrailing = Boolean(onRemove);

  // leading/trailing 유무에 따라 padding+gap 제어 클래스 선택.
  const layoutClass =
    hasLeading && hasTrailing
      ? chipRootWithBoth
      : hasLeading
        ? chipRootWithLeading
        : hasTrailing
          ? chipRootWithTrailing
          : undefined;

  return (
    <span
      data-slot="chip"
      data-color={color}
      data-variant={variant}
      data-shape={shape}
      data-size={size}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(chipRoot, layoutClass, className)}
      {...props}
    >
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          size={CHIP_ICON_SIZE[size]}
          style={{ color: "currentColor" }}
          className={chipIcon}
          aria-hidden="true"
        />
      )}
      <span className={chipLabel}>{children}</span>
      {hasTrailing && (
        <IconButton
          icon="close"
          size={CHIP_ICON_BUTTON_SIZE[size]}
          variant="ghost"
          iconColor="inherit"
          aria-label={removeLabel}
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          className={chipIconButton}
        />
      )}
    </span>
  );
}

export { Chip };
```

