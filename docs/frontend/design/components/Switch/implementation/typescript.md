# Switch — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Switch 문서 인덱스](../README.md)

## 구현 내용

### Switch 컴포넌트 (`switch.tsx`)

```tsx
"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@design/cn";
import { switchRoot, switchThumb } from "./switch.css";

export interface SwitchProps extends React.ComponentProps<
  typeof SwitchPrimitive.Root
> {
  /** 스위치 크기. 기본 'large'. */
  size?: "small" | "medium" | "large";
  /** 읽기 전용(토글 불가, 시각은 enabled). 커서/상태 구분용. */
  readOnly?: boolean;
}

function Switch({
  className,
  size = "large",
  readOnly,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      data-readonly={readOnly || undefined}
      className={cn(switchRoot, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-size={size}
        className={switchThumb}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

### SwitchItem 래퍼 (라벨/도움말 조합, 선택)

라벨과 도움말을 조합할 때 사용하는 래퍼. 단일 Switch만 필요하면 생략 가능.

```tsx
import type { ReactNode } from "react";
import { Switch as ShadcnSwitch } from "@primitives/switch";
import { item, itemRow, switchWrap, label, helpText } from "./Switch.css";

export interface SwitchItemProps {
  label?: ReactNode;
  helpText?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  className?: string;
}

export function SwitchItem({
  label: labelText,
  helpText: helpTextContent,
  checked,
  defaultChecked,
  onCheckedChange,
  size = "large",
  disabled = false,
  readOnly = false,
  name,
  className,
}: SwitchItemProps) {
  // read-only 는 토글만 막고 시각은 enabled. Radix disabled 로 제어.
  const isDisabled = disabled || readOnly;
  // 라벨/도움말 색상은 진짜 disabled 일 때만 비활성색. read-only 는 enabled 색.
  const labelDisabled = disabled;

  return (
    <div className={`${item} ${className ?? ""}`}>
      <label
        className={itemRow}
        data-size={size}
        data-disabled={labelDisabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <span className={switchWrap}>
          <ShadcnSwitch
            size={size}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={readOnly ? undefined : onCheckedChange}
            disabled={isDisabled}
            name={name}
          />
        </span>
        {labelText && (
          <span
            className={label}
            data-size={size}
            data-disabled={labelDisabled || undefined}
          >
            {labelText}
          </span>
        )}
      </label>
      {helpTextContent && (
        <p
          className={helpText}
          data-size={size}
          data-disabled={labelDisabled || undefined}
        >
          {helpTextContent}
        </p>
      )}
    </div>
  );
}
```

