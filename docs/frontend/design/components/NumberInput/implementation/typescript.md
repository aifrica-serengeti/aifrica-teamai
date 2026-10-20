# Number Input — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Number Input 문서 인덱스](../README.md)

현재 공개 `NumberInputProps`는 일반 `value`/`onValueChange` 숫자 계약 외에
`textValue`/`onTextValueChange`를 제공한다. 후자는 빈 문자열을 포함한 form draft를 제어해야 하는
경우에만 사용하며, 페이지는 `Number()` 변환과 최종 domain validation을 소유한다.

선택적 `suffix: string`은 입력 내부의 단위 표시다. 예를 들어
`<NumberInput label="실행 시각" suffix="시" textValue={hour} onTextValueChange={setHour} min={0} max={23} />`
로 사용한다. 단위와 오류/도움말은 입력의 `aria-describedby`로 연결하며 기존 설명 ID도 유지한다.
아래는 원형 재현 예제이며, 제품의 실제 제어 prop은 위 계약과 구현 인덱스의 source를 따른다.

### 현재 입력 경계: 지수 표기 거부

추출 참조 source의 native `beforeinput` 구독·DOM ref·동일 입력 이벤트 거부 기록은 컴포넌트 전용
`use-number-input-exponent-guard.ts`(참조 모듈 역할)가
소유한다. 숫자/문자열 값의 제어, min/max·증감 계산, 공개 callback과 Props는 `NumberInput`에 남는다.
이 내부 hook은 public barrel로 내보내지 않으며 도메인이나 페이지 상태에 의존하지 않는다.

아래 원형 source 예제는 증감·레이아웃 재현용으로 보존한다. 현재 제품을 재현할 때는 이 보완 계약도
함께 적용해야 하며 원형의 단순 `onChange`만 복사해 지수 차단을 누락하지 않는다. 새 prop이나 스타일을
추가하지 않고 기존 native `type="number"`, 표시 문자열, 부모 draft의 소유권을 유지한다.

```text
editable := not disabled and not readOnly
containsExponent(text) := text contains e or E

keydown:
  call caller onKeyDown exactly once
  if defaultPrevented or not editable or composing: return
  if no Ctrl/Meta/Alt and key is e/E: preventDefault; return
  otherwise keep existing ArrowUp/ArrowDown and Shift-step behavior

paste / drop:
  call corresponding caller handler exactly once
  if not defaultPrevented and editable and plain text contains exponent:
    preventDefault                 // reject whole insertion; do not strip letters

native beforeinput listener:
  if editable and not composing and input data contains exponent: preventDefault
  keep React onBeforeInput forwarding; remove native listener during cleanup

input / change safety boundary:
  reject if current DOM value or native input data contains exponent
  also reject a change belonging to the same native event already rejected by input
  on rejection restore DOM value to displayedText
  do not update draft or call onValueChange / onTextValueChange
  forward caller onInput once after restoration, even for rejected input
  otherwise retain existing numeric parsing / blank draft / blur / clamp logic
```

`1e`가 브라우저에 의해 DOM `value=""`로 정제되어도 `InputEvent.data="e"`로 지수 삽입임을 구분한다.
Backspace 등 사용자의 실제 비우기는 계속 허용한다. `1e3`/`1E-3`를 붙여넣었을 때는 기존 값을 유지하며
`13`/`1-3`으로 문자 제거하거나 지수 계산 결과로 변환하지 않는다. `-2`, `1.5`, `0`과 기존 증감·범위
정규화는 바뀌지 않는다. 외부 `value`, `defaultValue`, `textValue`를 다시 쓰는 입력 정책이 아니다.

## 구현 내용

### NumberInput.tsx (핵심 부분)

```tsx
import { useRef, useState } from "react";
import { IconButton, type IconButtonSize } from "@components/IconButton";
import type { IconSize } from "@components/Icon";

export type NumberInputSize = "small" | "medium" | "large" | "xlarge";

/**
 * NumberInput size → IconButton 매핑.
 * Figma: small 은 icon button 영역 20px(tiny) + icon 14px(s),
 * medium 이상은 영역 24px(medium) + icon 16px(m).
 * IconButton tiny 의 기본 icon(t=12px)이 Figma 와 맞지 않으므로 iconSize 를 명시 전달.
 */
const STEPPER_BUTTON_SIZE: Record<NumberInputSize, IconButtonSize> = {
  small: "tiny",
  medium: "medium",
  large: "medium",
  xlarge: "medium",
};

/** 증감 버튼 icon 사이즈 — small 14px(s), 나머지 16px(m). */
const STEPPER_ICON_SIZE: Record<NumberInputSize, IconSize> = {
  small: "s",
  medium: "m",
  large: "m",
  xlarge: "m",
};

export interface NumberInputProps extends Omit<
  React.ComponentProps<"input">,
  "size" | "type"
> {
  label?: string;
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  size?: NumberInputSize;
  variant?: "default" | "create";
  hideStepper?: boolean;
  step?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  invalid?: boolean;
  helpText?: React.ReactNode;
  optionalLabel?: string;
  infoLabel?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
}

export function NumberInput({
  label,
  optional = false,
  required = false,
  infoIcon: showInfoIcon = false,
  size = "medium",
  variant = "default",
  hideStepper = false,
  step = 1,
  min,
  max,
  readOnly = false,
  invalid = false,
  helpText: helpContent,
  id,
  disabled = false,
  defaultValue,
  value: valueProp,
  onChange,
  ...nativeProps
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const [focused, setFocused] = useState(false);

  const currentValue = isControlled
    ? typeof valueProp === "string"
      ? valueProp
      : String(valueProp ?? "")
    : innerValue;

  const clamp = (n: number) => {
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  };

  const stepValue = (direction: 1 | -1, big = false) => {
    const current = parseFloat(currentValue);
    const base = Number.isNaN(current) ? 0 : current;
    const delta = big ? step * 10 : step;
    const next = clamp(base + direction * delta);
    const nextStr = Number.isInteger(step) ? String(next) : String(next);

    if (!isControlled) setInnerValue(nextStr);
    // native input 값 동기화 + change 이벤트 발생
    if (inputRef.current) {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;
      setter?.call(inputRef.current, nextStr);
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  return (
    <div className={field}>
      {label && (
        <div className={labelRow}>
          <label className={labelText} htmlFor={id}>
            {label}
          </label>
          {optional && <span className={optionalText}>(선택사항)</span>}
          {required && (
            <span className={requiredMark} aria-hidden>
              *
            </span>
          )}
          {showInfoIcon && <Info className={infoIcon} size={14} />}
        </div>
      )}

      <div
        className={container}
        data-size={size}
        data-variant={variant}
        data-focused={focused || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-invalid={invalid || undefined}
      >
        <input
          {...nativeProps}
          ref={inputRef}
          id={id}
          type="number"
          className={input}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          value={isControlled ? currentValue : undefined}
          onChange={(e) => {
            if (!isControlled) setInnerValue(e.target.value);
            onChange?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            nativeProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            nativeProps.onBlur?.(e);
          }}
          onKeyDown={(e) => {
            if (readOnly || disabled) return;
            if (e.key === "ArrowUp") {
              e.preventDefault();
              stepValue(1, e.shiftKey);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              stepValue(-1, e.shiftKey);
            }
          }}
          min={min}
          max={max}
          step={step}
        />

        {!hideStepper && (
          <div className={trailing}>
            <IconButton
              icon="minus"
              variant="ghost"
              size={STEPPER_BUTTON_SIZE[size]}
              iconSize={STEPPER_ICON_SIZE[size]}
              aria-label="값 감소"
              tabIndex={-1}
              disabled={disabled || readOnly}
              onClick={() => stepValue(-1)}
            />
            <IconButton
              icon="plus"
              variant="ghost"
              size={STEPPER_BUTTON_SIZE[size]}
              iconSize={STEPPER_ICON_SIZE[size]}
              aria-label="값 증가"
              tabIndex={-1}
              disabled={disabled || readOnly}
              onClick={() => stepValue(1)}
            />
          </div>
        )}
      </div>

      {helpContent && (
        <p className={helpText} data-invalid={invalid || undefined}>
          {helpContent}
        </p>
      )}
    </div>
  );
}
```

---
