# Dropdown — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Dropdown 문서 인덱스](../README.md)

## 구현 내용

### Dropdown.tsx

```tsx
import { cn } from "@design/cn";
import { Icon } from "./Icon"; // 공용 Icon 컴포넌트 (info icon · dropdown icon)
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  type MenuSize,
} from "./Menu"; // 공용 Menu 컴포넌트 (Radix DropdownMenu 기반)
import {
  root,
  labelRow,
  labelText,
  labelDisabled,
  optionalText,
  requiredText,
  container,
  field,
  focusedLine,
  fieldText,
  placeholderText,
  dropdownIcon,
  helpText,
  errorText,
} from "./Dropdown.css";

export type DropdownSize = "small" | "medium" | "large" | "xlarge";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  size?: DropdownSize;
  value?: string;
  options: DropdownOption[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  helpText?: string;
  invalid?: boolean;
  errorText?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

/** 필드 size → Menu content size 매핑 */
const FIELD_TO_MENU_SIZE: Record<DropdownSize, MenuSize> = {
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "large",
};

export function Dropdown({
  size = "medium",
  value,
  options,
  onValueChange,
  placeholder = "옵션을 선택해주세요",
  label,
  optional = false,
  required = false,
  infoIcon = false,
  helpText: helpTextProp,
  invalid = false,
  errorText: errorTextProp,
  readOnly = false,
  disabled = false,
  className,
}: DropdownProps) {
  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption?.label ?? "";
  const hasValue = Boolean(selectedOption);

  const showLabel = Boolean(label);
  const showHelp = Boolean(helpTextProp) && !invalid;
  const showError = invalid && Boolean(errorTextProp);

  return (
    <div className={cn(root, className)}>
      {/* Label */}
      {showLabel && (
        <div className={labelRow}>
          <span className={cn(labelText, disabled && labelDisabled)}>
            {label}
          </span>
          {optional && (
            <span className={cn(optionalText, disabled && labelDisabled)}>
              (선택사항)
            </span>
          )}
          {required && <span className={requiredText}>*</span>}
          {infoIcon && (
            <Icon
              name="info"
              size="s"
              color={disabled ? "disabled" : "subtler"}
            />
          )}
        </div>
      )}

      {/* Container */}
      <div className={container}>
        {readOnly || disabled ? (
          /* read-only / disabled — Menu 를 렌더하지 않고 div 필드만 표시 */
          <div
            data-size={size}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-disabled={disabled || undefined}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            aria-invalid={invalid || undefined}
            className={field}
          >
            {/* Placeholder / Selected text — field 의 color 를 상속(inherit).
                disabled 면 --btn-on-tertiary-disabled, enabled 면 --btn-on-tertiary. */}
            <span className={cn(fieldText, !hasValue && placeholderText)}>
              {hasValue ? displayText : placeholder}
            </span>
            <span className={dropdownIcon}>
              <Icon
                name="chevron_down"
                size="m"
                style={{ color: "inherit" }}
                aria-hidden
              />
            </span>
          </div>
        ) : (
          /* 활성 필드 — Menu trigger */
          <Menu>
            <MenuTrigger asChild>
              <button
                type="button"
                data-size={size}
                data-invalid={invalid || undefined}
                aria-haspopup="menu"
                aria-invalid={invalid || undefined}
                className={field}
              >
                <span className={cn(fieldText, !hasValue && placeholderText)}>
                  {hasValue ? displayText : placeholder}
                </span>
                <span className={dropdownIcon}>
                  <Icon
                    name="chevron_down"
                    size="m"
                    style={{ color: "inherit" }}
                    aria-hidden
                  />
                </span>
                <span className={focusedLine} data-size={size} />
              </button>
            </MenuTrigger>

            {/* Menu — minWidth 를 트리거 너비로 설정하여 필드와 폭 맞춤.
                아이템이 더 길면 width:max-content 로 자동 확장. */}
            <MenuContent
              size={FIELD_TO_MENU_SIZE[size]}
              align="start"
              style={{ minWidth: "var(--radix-dropdown-menu-trigger-width)" }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === value}
                  onSelect={() => onValueChange?.(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
        )}

        {/* Help text / Error text */}
        {showHelp && (
          <span className={cn(helpText, disabled && labelDisabled)}>
            {helpTextProp}
          </span>
        )}
        {showError && <span className={errorText}>{errorTextProp}</span>}
      </div>
    </div>
  );
}
```

