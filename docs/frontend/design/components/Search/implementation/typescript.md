# Search — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Search 문서 인덱스](../README.md)

## 구현 내용

### 12.2 Search 컴포넌트 — `Search.tsx`

```tsx
import { useRef, useState, type ChangeEvent } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import {
  Input as InputPrimitive,
  type InputSize,
  type InputVariant,
} from "...Input"; // 공용 Input 컴포넌트(Input/README.md §12 참조)
import {
  field,
  labelRow,
  labelText,
  inputWrap,
  leadingIcon,
  trailing,
  closeButton,
  helpText,
} from "./Search.css";

/** Leading search icon / close button 크기 — 모든 size 16px 고정. */
const ICON_SIZE: Record<InputSize, number> = {
  small: 16,
  medium: 16,
  large: 16,
  xlarge: 16,
};

/** Close button(원형) 지름 — 모든 size 16px 고정. */
const CLOSE_SIZE: Record<InputSize, number> = {
  small: 16,
  medium: 16,
  large: 16,
  xlarge: 16,
};

export interface SearchProps extends Omit<
  React.ComponentProps<"input">,
  "size" | "label" | "required" | "type"
> {
  label?: string;
  size?: InputSize;
  variant?: InputVariant;
  /** close 버튼 클릭 콜백. 값 지우기 후 추가 동작이 필요할 때 사용. */
  onClear?: () => void;
  clearLabel?: string;
  helpText?: React.ReactNode;
}

export function Search({
  label,
  size = "medium",
  variant = "default",
  onClear,
  helpText: helpContent,
  id,
  className,
  disabled = false,
  ...nativeProps
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // uncontrolled(defaultValue) 입력값 추적 — 값이 있으면 close button 표시.
  const [innerValue, setInnerValue] = useState(
    typeof nativeProps.defaultValue === "string"
      ? nativeProps.defaultValue
      : "",
  );

  const isControlled = nativeProps.value !== undefined;
  const currentValue = isControlled
    ? typeof nativeProps.value === "string"
      ? nativeProps.value
      : ""
    : innerValue;

  // close 버튼 표시 여부 — 값이 있고 disabled 가 아닐 때.
  const showClose = currentValue.length > 0 && !disabled;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(e.target.value);
    nativeProps.onChange?.(e);
  };

  // close 버튼 클릭 — 값을 비우고 포커스 유지.
  const handleClear = () => {
    if (!isControlled) {
      setInnerValue("");
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      setter?.call(inputRef.current, "");
    }
    inputRef.current?.focus();
    onClear?.();
  };

  const iconSize = ICON_SIZE[size];
  const paddingLeft = 12 + iconSize + 4;
  const closeSize = CLOSE_SIZE[size];
  const paddingRight = showClose ? 8 + closeSize + 4 : undefined;

  const { defaultValue, onChange, ...restNative } = nativeProps;

  return (
    <div className={field}>
      {label && (
        <div className={labelRow}>
          <label className={labelText} htmlFor={id}>
            {label}
          </label>
        </div>
      )}

      <div className={inputWrap}>
        <SearchIcon
          className={leadingIcon}
          size={iconSize}
          strokeWidth={2}
          aria-hidden
        />
        <InputPrimitive
          {...restNative}
          ref={inputRef}
          type="text"
          inputMode="search"
          size={size}
          variant={variant}
          disabled={disabled}
          id={id}
          className={className}
          onChange={handleChange}
          defaultValue={isControlled ? undefined : defaultValue}
          style={{ paddingLeft, paddingRight }}
        />

        {showClose && (
          <div className={trailing}>
            <button
              type="button"
              className={closeButton}
              onClick={handleClear}
              aria-label="검색어 지우기"
              tabIndex={-1}
              style={{ width: closeSize, height: closeSize }}
            >
              <X size={closeSize * 0.6} strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        )}
      </div>

      {helpContent && <p className={helpText}>{helpContent}</p>}
    </div>
  );
}
```

---
