# Textarea — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Textarea 문서 인덱스](../README.md)

## 구현 내용

### 12.2 Textarea primitive — `textarea.tsx`

```tsx
"use client";

import * as React from "react";
import { cn } from "@design/cn";
import { textareaRoot } from "./textarea.css";

export type TextareaVariant = "default" | "create";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<React.ComponentProps<"textarea">, "size"> & {
    variant?: TextareaVariant;
    readOnly?: boolean;
  }
>(function Textarea(
  {
    className,
    variant = "default",
    readOnly,
    rows = 3, // 브라우저 기본 rows=2 방지
    ...props
  },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      data-variant={variant}
      data-readonly={readOnly || undefined}
      className={cn(textareaRoot, className)}
      readOnly={readOnly}
      rows={rows}
      {...props}
    />
  );
});

export { Textarea };
```

### 12.3 Textarea Field wrapper (Label + Counter + Help/Error)

Counter 는 **label 행 우측 끝**(Input 의 box 내부 trailing 과 다름).

```tsx
import { type ReactNode } from "react";
import { Info } from "lucide-react";
import {
  Textarea as TextareaPrimitive,
  type TextareaVariant,
} from "./textarea";

export interface TextareaFieldProps extends Omit<
  React.ComponentProps<"textarea">,
  "label" | "required"
> {
  label?: string;
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  variant?: TextareaVariant;
  count?: boolean;
  helpText?: ReactNode;
  errorText?: string;
  optionalLabel?: string;
  infoLabel?: string;
}

export function TextareaField({
  label,
  optional = false,
  required = false,
  infoIcon: showInfo = false,
  variant = "default",
  count = false,
  helpText: helpContent,
  errorText: errorContent,
  id,
  className,
  disabled = false,
  readOnly = false,
  ...nativeProps
}: TextareaFieldProps) {
  const { value, maxLength } = nativeProps;

  const isInvalid = Boolean(errorContent);
  const showCounter = count || (maxLength != null && maxLength > 0);
  const currentLength = typeof value === "string" ? value.length : 0;
  const hasLabelRow =
    Boolean(label || optional || required || showInfo) || showCounter;

  return (
    <div className={field}>
      {hasLabelRow && (
        <div className={labelRow}>
          {/* 좌측 그룹 — Label · (선택사항) · * · info */}
          {(label || optional || required || showInfo) && (
            <div className={labelGroup}>
              {label && (
                <label className={labelText} htmlFor={id}>
                  {label}
                </label>
              )}
              {optional && <span className={optionalText}>(선택사항)</span>}
              {required && (
                <span className={requiredMark} aria-hidden>
                  *
                </span>
              )}
              {showInfo && <Info className={infoIcon} size={14} aria-hidden />}
            </div>
          )}
          {/* 우측 counter — label 행 우측 끝 */}
          {showCounter && maxLength != null && (
            <span className={counter} aria-hidden>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}

      <TextareaPrimitive
        {...nativeProps}
        variant={variant}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={isInvalid || undefined}
        className={className}
        id={id}
      />

      {errorContent ? (
        <p className={errorText} role="alert">
          {errorContent}
        </p>
      ) : helpContent ? (
        <p className={helpText}>{helpContent}</p>
      ) : null}
    </div>
  );
}
```
