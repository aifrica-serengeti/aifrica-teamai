# Split Button — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Split Button 문서 인덱스](../README.md)

## 구현 내용

### 12-2. SplitButton 컴포넌트 (`SplitButton.tsx`)

```tsx
import * as React from "react";
import { cn } from "./utils"; // clsx + tailwind-merge
// 공용 컴포넌트 — 먼저 구현되어 있어야 함 (Menu/README.md, Icon/README.md 참조)
import { Menu, MenuContent, MenuTrigger, type MenuSize } from "./Menu";
import { Icon } from "./Icon";
import type { IconSize } from "./iconTokens";
import type { SystemIconName } from "./iconMap";
import {
  root,
  primaryAction,
  primaryActionSize,
  secondaryAction,
  secondaryActionSize,
  secondaryActionActive,
  label,
  chevron,
} from "./SplitButton.css";

export type SplitButtonSize = "tiny" | "small" | "medium" | "large";

/** SplitButton size → Icon size 자동 매핑.
 *  Tiny 14px→s, Small 16px→m, Medium 16px→m, Large 20px→xl. */
const DEFAULT_ICON_SIZE: Record<SplitButtonSize, IconSize> = {
  tiny: "s",
  small: "m",
  medium: "m",
  large: "xl",
};

/** SplitButton size → Menu size 매핑. */
const SIZE_TO_MENU_SIZE: Record<SplitButtonSize, MenuSize> = {
  tiny: "small",
  small: "small",
  medium: "medium",
  large: "large",
};

export interface SplitButtonProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  size?: SplitButtonSize;
  /** Primary action 아이콘 (Figma System icon 이름). */
  primaryIcon: SystemIconName;
  /** Primary action 클릭 핸들러. */
  onPrimaryClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Primary action 의 aria-label (스크린 리더용, 필수). */
  primaryAriaLabel: string;
  /** Secondary action leading 아이콘 (선택). */
  leadingIcon?: SystemIconName;
  /** Secondary action 라벨 텍스트. */
  label: string;
  /** 비활성화. 양쪽 action 모두 disabled. */
  disabled?: boolean;
  /** 드롭다운 메뉴의 MenuItem 들. */
  children?: React.ReactNode;
  /** 메뉴 정렬. 기본 'start'. */
  menuAlign?: "start" | "center" | "end";
  /** false면 짧은 메뉴에서 콘텐츠 높이만 사용. 기본 true. */
  menuScrollable?: boolean;
  /** 아이콘 size override. 생략 시 size 에 따라 자동. */
  iconSize?: IconSize;
  /** Primary 아이콘의 조회 진행 등 상태 표현용 class. */
  primaryClassName?: string;
}

export function SplitButton({
  className,
  size = "medium",
  primaryIcon,
  onPrimaryClick,
  primaryAriaLabel,
  leadingIcon,
  label: labelText,
  disabled = false,
  children,
  menuAlign = "start",
  menuScrollable = true,
  iconSize,
  primaryClassName,
  ...props
}: SplitButtonProps) {
  const resolvedIconSize = iconSize ?? DEFAULT_ICON_SIZE[size];
  const menuSize = SIZE_TO_MENU_SIZE[size];
  /* Icon 색상: 부모 action 의 color(= --btn-on-tertiary) 를 상속.
   * disabled 시 action 색상이 회색으로 전환되면 icon 도 함께 전환. */
  const iconStyle = { color: "inherit" } as const;

  return (
    <div
      data-slot="split-button"
      data-size={size}
      className={cn(root, className)}
      {...props}
    >
      {/* Primary action — 아이콘만 있는 정사각 버튼 */}
      <button
        type="button"
        data-slot="split-button-primary"
        disabled={disabled}
        aria-label={primaryAriaLabel}
        onClick={onPrimaryClick}
        className={cn(primaryAction, primaryActionSize[size], primaryClassName)}
      >
        <Icon name={primaryIcon} size={resolvedIconSize} style={iconStyle} />
      </button>

      {/* Secondary action — leading icon + label + chevron. Menu trigger.
       * 분할선(1px)은 Primary 의 marginRight:-1px 로 두 action 의 border 가 겹쳐 생성. */}
      <Menu>
        <MenuTrigger asChild>
          <button
            type="button"
            data-slot="split-button-secondary"
            disabled={disabled}
            className={cn(
              secondaryAction,
              secondaryActionSize[size],
              secondaryActionActive,
            )}
          >
            {leadingIcon && (
              <Icon
                name={leadingIcon}
                size={resolvedIconSize}
                style={iconStyle}
              />
            )}
            <span className={label}>{labelText}</span>
            <Icon
              name="chevron_down"
              size={resolvedIconSize}
              style={iconStyle}
              className={chevron}
            />
          </button>
        </MenuTrigger>
        <MenuContent
          size={menuSize}
          align={menuAlign}
          scrollable={menuScrollable}
        >
          {children}
        </MenuContent>
      </Menu>
    </div>
  );
}
```
