# Segmented Control — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Segmented Control 문서 인덱스](../README.md)

## 구현 내용

### 13-2. ToggleGroup primitive 컴포넌트 (`toggle-group.tsx`)

```tsx
import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import {
  group,
  groupFullWidth,
  item,
  itemSmall,
  itemMedium,
  itemLarge,
  itemIconOnlySmall,
  itemIconOnlyMedium,
  itemIconOnlyLarge,
  itemFullWidth,
  divider,
} from "./toggle-group.css";

export type SegmentedSize = "small" | "medium" | "large";
export type SegmentedType = "label" | "icon" | "icon-label";

const ITEM_SIZE_CLASS: Record<SegmentedSize, string> = {
  small: itemSmall,
  medium: itemMedium,
  large: itemLarge,
};
const ITEM_ICON_ONLY_CLASS: Record<SegmentedSize, string> = {
  small: itemIconOnlySmall,
  medium: itemIconOnlyMedium,
  large: itemIconOnlyLarge,
};

const SegmentedContext = React.createContext<{
  size: SegmentedSize;
  type: SegmentedType;
  fullWidth: boolean;
}>({ size: "medium", type: "label", fullWidth: false });

function ToggleGroup({
  className,
  size = "medium",
  variant = "label",
  fullWidth = false,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Root>, "type"> & {
  size?: SegmentedSize;
  variant?: SegmentedType;
  fullWidth?: boolean;
}) {
  return (
    <SegmentedContext.Provider value={{ size, type: variant, fullWidth }}>
      <ToggleGroupPrimitive.Root
        type="single"
        data-slot="toggle-group"
        data-size={size}
        className={cn(group, fullWidth && groupFullWidth, className)}
        {...props}
      />
    </SegmentedContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  children,
  showDivider = false,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  showDivider?: boolean;
}) {
  const { size, type, fullWidth } = React.useContext(SegmentedContext);
  const isIconOnly = type === "icon";
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        item,
        isIconOnly ? ITEM_ICON_ONLY_CLASS[size] : ITEM_SIZE_CLASS[size],
        fullWidth && itemFullWidth,
        className,
      )}
      {...props}
    >
      {children}
      {showDivider && <span className={divider} aria-hidden />}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
```

### 13-4. SegmentedControl 조립 컴포넌트 (`SegmentedControl.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils";
import {
  ToggleGroup,
  ToggleGroupItem,
  type SegmentedSize,
  type SegmentedType,
} from "./toggle-group";
// 의존 컴포넌트 — Icon, Tooltip (각 가이드라인 참조)
import { Icon } from "./Icon";
import type { IconSize } from "./iconTokens";
import type { SystemIconName } from "./iconMap";
import { Tooltip } from "./Tooltip";
import {
  root,
  rootFullWidth,
  container,
  containerFullWidth,
  labelRow,
  label as labelCls,
  helpText as helpTextCls,
  infoIconTrigger,
  itemContent,
  itemLabelWrap,
  itemLabelGhost,
  itemLabelReal,
} from "./SegmentedControl.css";

export interface SegmentedOption {
  value: string;
  label?: string;
  icon?: SystemIconName;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  type?: SegmentedType;
  size?: SegmentedSize;
  fullWidth?: boolean;
  label?: string;
  infoIcon?: boolean;
  infoTooltip?: React.ReactNode;
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

const SEGMENTED_ICON_SIZE: Record<SegmentedSize, IconSize> = {
  small: "l",
  medium: "xl",
  large: "xl",
};

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  type = "label",
  size = "medium",
  fullWidth = false,
  label,
  infoIcon = false,
  infoTooltip,
  helpText,
  disabled = false,
  className,
}: SegmentedControlProps) {
  const isIconOnly = type === "icon";
  const iconSize = SEGMENTED_ICON_SIZE[size];
  const iconStyle = { color: "inherit" } as const;

  return (
    <div className={cn(root, fullWidth && rootFullWidth, className)}>
      {(label || infoIcon) && (
        <div className={labelRow}>
          {label && <span className={labelCls}>{label}</span>}
          {infoIcon && (
            <Tooltip type="icon" side="top" content={infoTooltip ?? ""}>
              <button
                type="button"
                className={infoIconTrigger}
                aria-label="추가 정보"
                disabled={disabled}
              >
                <Icon name="info" size="s" style={iconStyle} />
              </button>
            </Tooltip>
          )}
        </div>
      )}

      <div className={cn(container, fullWidth && containerFullWidth)}>
        <ToggleGroup
          size={size}
          variant={type}
          fullWidth={fullWidth}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          aria-label={label}
        >
          {options.map((opt, idx) => {
            const optDisabled = disabled || opt.disabled;
            const isLast = idx === options.length - 1;
            return (
              <ToggleGroupItem
                key={opt.value}
                value={opt.value}
                disabled={optDisabled}
                showDivider={!isLast}
                aria-label={opt.label ?? opt.value}
              >
                <span className={itemContent}>
                  {opt.icon && type !== "label" && (
                    <Icon name={opt.icon} size={iconSize} style={iconStyle} />
                  )}
                  {!isIconOnly && opt.label && (
                    <span className={itemLabelWrap}>
                      <span className={itemLabelGhost} aria-hidden>
                        {opt.label}
                      </span>
                      <span className={itemLabelReal}>{opt.label}</span>
                    </span>
                  )}
                </span>
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      {helpText && <p className={helpTextCls}>{helpText}</p>}
    </div>
  );
}
```

