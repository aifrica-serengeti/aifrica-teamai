# Radio & Radio Group — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Radio & Radio Group 문서 인덱스](../README.md)

## 구현 내용

### 저수준 RadioGroupRoot / Radio (`Radio.tsx`)

```tsx
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import type { ComponentProps } from "react";

import { cn } from "./utils"; // clsx + tailwind-merge
import { radioItem, radioDot } from "./radio-group.css";

export type RadioGroupRootProps = ComponentProps<typeof RadioPrimitive.Root>;

export function RadioGroupRoot({ className, ...props }: RadioGroupRootProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group"
      className={className}
      {...props}
    />
  );
}

export interface RadioProps extends ComponentProps<typeof RadioPrimitive.Item> {
  readOnly?: boolean;
}

export function Radio({
  className,
  readOnly = false,
  disabled = false,
  ...props
}: RadioProps) {
  return (
    <RadioPrimitive.Item
      data-slot="radio-group-item"
      data-readonly={readOnly || undefined}
      className={cn(radioItem, className)}
      disabled={disabled || readOnly}
      {...props}
    >
      <RadioPrimitive.Indicator asChild>
        <span className={radioDot} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Item>
  );
}
```

### Radio Group 래퍼 컴포넌트 (`RadioGroup.tsx`)

```tsx
import { useId } from "react";
import { Info } from "lucide-react";
import { Radio, RadioGroupRoot } from "./Radio";
// ... 위의 CSS 클래스 import

export interface RadioOption {
  value: string;
  label: string;
  helpText?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  alignment?: "vertical" | "horizontal";
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  helpText?: string;
  errorText?: string; // 표시 시 invalid 상태
  disabled?: boolean;
  readOnly?: boolean; // 선택 막되 라벨 색은 enabled 유지
  className?: string;
  name?: string;
  ariaLabel?: string;
}

export function RadioGroup({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  alignment = "vertical",
  optional = false,
  required = false,
  infoIcon = false,
  helpText,
  errorText,
  disabled = false,
  readOnly = false,
  className,
  name,
  ariaLabel,
}: RadioGroupProps) {
  const id = useId();
  const isInvalid = Boolean(errorText);
  const isDisabled = disabled;
  const isReadOnly = readOnly;
  const labelDisabled = isDisabled; // read-only 는 라벨 비활성색 적용 안 함
  const labelId = label ? `${id}-label` : undefined;
  const helpTextId = helpText && !errorText ? `${id}-help` : undefined;
  const errorTextId = errorText ? `${id}-error` : undefined;

  return (
    <div
      className={group}
      data-alignment={alignment}
      data-invalid={isInvalid || undefined}
      data-disabled={labelDisabled || undefined}
      data-readonly={isReadOnly || undefined}
    >
      {(label || optional || required || infoIcon) && (
        <div className={groupLabelRow}>
          {label && (
            <span id={labelId} className={groupLabel}>
              {label}
            </span>
          )}
          {optional && <span className={groupOptional}>(선택사항)</span>}
          {required && (
            <span className={groupRequired} aria-hidden>
              *
            </span>
          )}
          {infoIcon && <Info className={groupInfoIcon} size={14} aria-hidden />}
        </div>
      )}

      <RadioGroupRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={readOnly ? undefined : onValueChange}
        name={name}
        disabled={isDisabled || isReadOnly}
        required={required}
        orientation={alignment}
        aria-invalid={isInvalid || undefined}
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={labelId}
        aria-describedby={errorTextId ?? helpTextId}
        className={alignment === "horizontal" ? "grid-flow-col" : undefined}
      >
        {options.map((opt) => {
          const optDisabled = isDisabled || opt.disabled;
          return (
            <label
              key={opt.value}
              className={groupItem}
              data-disabled={optDisabled || undefined}
              data-readonly={isReadOnly || undefined}
            >
              <span className={groupItemRadioWrap}>
                <Radio
                  value={opt.value}
                  disabled={optDisabled}
                  readOnly={isReadOnly}
                  aria-invalid={isInvalid || undefined}
                />
              </span>
              <span className={groupItemLabel}>
                {opt.label}
                {opt.helpText && (
                  <span className={groupItemHelpText}>{opt.helpText}</span>
                )}
              </span>
            </label>
          );
        })}
      </RadioGroupRoot>

      {helpText && !errorText && (
        <p id={helpTextId} className={groupHelpText}>
          {helpText}
        </p>
      )}
      {errorText && (
        <p id={errorTextId} className={groupErrorText} role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}
```
