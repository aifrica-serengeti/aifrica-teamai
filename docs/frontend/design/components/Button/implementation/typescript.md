# Button — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Button 문서 인덱스](../README.md)

## 구현 내용

### 컴포넌트 (`Button.tsx`)

```tsx
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { Icon } from "../icon/Icon"; // Icon 컴포넌트
import type { IconSize } from "../icon/iconTokens";
import type { SystemIconName } from "../icon/iconMap";
import { buttonBase, buttonSize, buttonVariant } from "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "negative";
export type ButtonSize = "tiny" | "small" | "medium" | "large";

/** Button size → Icon size 자동 매핑 (Figma 아이콘 픽셀값 기준).
 *  tiny(14px)→s, small(16px)→m, medium(18px)→l, large(20px)→xl. */
const DEFAULT_ICON_SIZE: Record<ButtonSize, IconSize> = {
  tiny: "s",
  small: "m",
  medium: "l",
  large: "xl",
};

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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

type SlottedButtonChildProps = React.HTMLAttributes<HTMLElement> & {
  disabled?: boolean;
  href?: string;
};

function blockDisabledActivation(event: React.SyntheticEvent<HTMLElement>) {
  event.preventDefault();
  event.stopPropagation();
}

function Button({
  className,
  variant = "primary",
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
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const slottedChild = asChild
    ? React.Children.only(children) as React.ReactElement<SlottedButtonChildProps>
    : null;
  if (slottedChild && !React.isValidElement(slottedChild)) {
    throw new Error("Button asChild requires one React element child.");
  }
  const isAnchor = slottedChild?.type === "a";
  const isDisabled = Boolean(disabled || slottedChild?.props.disabled);
  // Slot composes child handlers before its own. Guard both surfaces so a
  // disabled anchor cannot run the child's or Button's activation callbacks.
  const content = slottedChild && isDisabled
    ? React.cloneElement(slottedChild, {
        disabled: isAnchor ? undefined : true,
        "aria-disabled": true,
        tabIndex: -1,
        ...(isAnchor ? { href: undefined } : {}),
        onClick: blockDisabledActivation,
        onClickCapture: blockDisabledActivation,
        onKeyDown: blockDisabledActivation,
        onKeyDownCapture: blockDisabledActivation,
      })
    : children;
  const resolvedLeadingSize = leadingIconSize ?? DEFAULT_ICON_SIZE[size];
  const resolvedTrailingSize = trailingIconSize ?? DEFAULT_ICON_SIZE[size];

  // Icon 색상: 버튼 텍스트 색상(color)을 상속(inherit).
  // Icon 컴포넌트가 내부적으로 color 를 고정하지만, 소비자가 넘긴 style 을
  // 뒤에 병합하므로 color: 'inherit' 이 항상 우선한다.
  // 이렇게 하면 variant 마다 아이콘이 텍스트와 동일한 색을 갖는다
  // (Primary=on-primary, Secondary=on-secondary, disabled=on-*-disabled 회색 등).
  const iconStyle = { color: "inherit" } as const;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled || undefined}
      type={asChild ? undefined : (type ?? "button")}
      disabled={isAnchor ? undefined : isDisabled}
      className={cn(
        buttonBase,
        buttonVariant[variant],
        buttonSize[size],
        className,
      )}
      {...props}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      onClick={isDisabled ? blockDisabledActivation : props.onClick}
      onClickCapture={isDisabled ? blockDisabledActivation : props.onClickCapture}
      onKeyDown={isDisabled ? blockDisabledActivation : props.onKeyDown}
      onKeyDownCapture={isDisabled ? blockDisabledActivation : props.onKeyDownCapture}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} size={resolvedLeadingSize} style={iconStyle} />
      )}
      <Slot.Slottable>{content}</Slot.Slottable>
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

export { Button };
```


## asChild·disabled 연결 계약

`asChild`는 React element 자식 하나를 받아 그 host에 Button의 class·상태·기본 이벤트를 연결한다.
Leading/trailing Icon은 `Slot.Slottable` 밖의 sibling이며 anchor/button 자식 안으로 조합된다.
빈 자식·문자열만·여러 자식은 지원하지 않는다. `children`을 Fragment로 감싼 복수 host도 사용하지 않는다.

기본 host와 `asChild`의 native `button`은 실제 `disabled`를 사용한다. Native `a`는 비활성 시
`href`를 제거하고 `aria-disabled`·`tabIndex=-1`·click/keyboard 활성화 차단을 적용한다.
자식과 Button 양쪽의 click/keyboard callback을 차단하며, 활성 상태에서는 Slot의 이벤트 조합을 유지한다.
원래 자식의 `disabled`도 비활성 상태로 반영한다. disabled 동안 child와 Button의 활성화 callback은 실행하지 않는다.

Custom component 자식은 하나의 native host로 props·ref·className·event·disabled/aria-disabled를
전달해야 한다. 전달하지 않는 component나 내부 링크를 별도로 가진 복합 child의 안전성을 이 예제는 보증하지 않는다.
비활성 링크를 여전히 탐색 가능한 항목으로 노출할 업무 요구가 있으면 일반 Link의 별도 계약으로 설계한다.
