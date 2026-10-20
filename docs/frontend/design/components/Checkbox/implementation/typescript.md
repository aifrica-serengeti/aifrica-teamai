# Checkbox & Checkbox Group — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Checkbox & Checkbox Group 문서 인덱스](../README.md)

## 구현 내용

### Checkbox box 컴포넌트 (`checkbox.tsx`)

```tsx
import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "./utils"; // clsx + tailwind-merge
import { checkboxRoot, checkboxDash, checkboxCheckIcon } from "./checkbox.css";

export interface CheckboxProps extends React.ComponentProps<
  typeof CheckboxPrimitive.Root
> {
  size?: "small" | "medium";
  readOnly?: boolean; // 커서/상태 구분용
}

function Checkbox({
  className,
  size = "medium",
  checked,
  readOnly,
  ...props
}: CheckboxProps) {
  const isIndeterminate = checked === "indeterminate";
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      data-readonly={readOnly || undefined}
      className={cn(checkboxRoot, className)}
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" asChild>
        {isIndeterminate ? (
          <span className={checkboxDash} data-size={size} aria-hidden />
        ) : (
          // 색상은 checkboxCheckIcon 으로 명시 부여(currentColor 의존 회피 — 누락 방지).
          <CheckIcon
            className={cn(
              checkboxCheckIcon,
              size === "small" ? "size-[9px]" : "size-[12px]",
            )}
            strokeWidth={3}
          />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
```

### Checkbox Item(단일) 컴포넌트 (`Checkbox.tsx`)

```tsx
import type { ReactNode } from "react";
import { Checkbox as ShadcnCheckbox } from "./checkbox"; // 위 컴포넌트
import { item, itemRow, checkboxWrap, label, helpText } from "./Checkbox.css";

export interface CheckboxItemProps {
  label?: ReactNode;
  helpText?: ReactNode;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  size?: "small" | "medium";
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  className?: string;
}

export function CheckboxItem({
  label: labelText,
  helpText: helpTextContent,
  checked,
  defaultChecked,
  onCheckedChange,
  size = "medium",
  disabled = false,
  readOnly = false,
  name,
  className,
}: CheckboxItemProps) {
  const isDisabled = disabled || readOnly;
  const labelDisabled = disabled; // read-only 는 라벨 비활성색 적용 안 함

  return (
    <div className={`${item} ${className ?? ""}`}>
      <label
        className={itemRow}
        data-size={size}
        data-disabled={labelDisabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <span className={checkboxWrap} data-size={size}>
          <ShadcnCheckbox
            size={size}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={readOnly ? undefined : onCheckedChange}
            disabled={isDisabled}
            readOnly={readOnly}
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

### Checkbox Group 컴포넌트 (`CheckboxGroup.tsx`)

```tsx
import { useState, useCallback } from "react";
import { Info } from "lucide-react";
import { CheckboxItem } from "./Checkbox";
// ... CSS 클래스 import

export interface CheckboxOption {
  value: string;
  label: string;
  helpText?: string;
  disabled?: boolean;
  indeterminate?: boolean; // 부모-자식 관계에서 부모 항목
}

export interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  value?: string[]; // 제어: 선택된 value 배열
  defaultValue?: string[]; // 비제어: 초기 선택
  onValueChange?: (value: string[]) => void;
  alignment?: "vertical" | "horizontal";
  size?: "small" | "medium";
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  helpText?: string;
  errorText?: string; // 표시 시 invalid 상태
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  name?: string;
}

export function CheckboxGroup({
  label: groupLabel,
  options,
  value,
  defaultValue,
  onValueChange,
  alignment = "vertical",
  size = "medium",
  optional = false,
  required = false,
  infoIcon = false,
  helpText,
  errorText,
  disabled = false,
  readOnly = false,
  className,
  name,
}: CheckboxGroupProps) {
  const isInvalid = Boolean(errorText);
  const labelDisabled = disabled;

  // 비제어 상태 관리: value 가 없을 때 내부 상태로 선택을 유지한다.
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? [],
  );
  const selected = value ?? internalValue;

  const handleItemChange = useCallback(
    (itemValue: string, checked: boolean | "indeterminate") => {
      if (readOnly) return;
      const next =
        checked === true
          ? Array.from(new Set([...selected, itemValue]))
          : selected.filter((v) => v !== itemValue);
      if (value === undefined) setInternalValue(next); // 비제어 모드만 내부 업데이트
      onValueChange?.(next);
    },
    [readOnly, selected, value, onValueChange],
  );

  return (
    <div
      className={group}
      data-alignment={alignment}
      data-size={size}
      data-invalid={isInvalid || undefined}
      data-disabled={labelDisabled || undefined}
      data-readonly={readOnly || undefined}
      role="group"
    >
      {(groupLabel || optional || required || infoIcon) && (
        <div className={groupLabelRow}>
          {groupLabel && <span className={groupLabel}>{groupLabel}</span>}
          {optional && <span className={groupOptional}>(선택사항)</span>}
          {required && (
            <span className={groupRequired} aria-hidden>
              *
            </span>
          )}
          {infoIcon && <Info className={groupInfoIcon} size={14} aria-hidden />}
        </div>
      )}

      <div className={itemsContainer} data-alignment={alignment}>
        {options.map((opt) => {
          const optDisabled = disabled || opt.disabled;
          const isChecked = selected.includes(opt.value);
          return (
            <CheckboxItem
              key={opt.value}
              label={opt.label}
              helpText={opt.helpText}
              size={size}
              disabled={optDisabled}
              readOnly={readOnly}
              checked={opt.indeterminate ? "indeterminate" : isChecked}
              onCheckedChange={(checked) =>
                handleItemChange(opt.value, checked)
              }
              name={name ? `${name}-${opt.value}` : undefined}
            />
          );
        })}
      </div>

      {helpText && !errorText && <p className={groupHelpText}>{helpText}</p>}
      {errorText && (
        <p className={groupErrorText} role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}
```

