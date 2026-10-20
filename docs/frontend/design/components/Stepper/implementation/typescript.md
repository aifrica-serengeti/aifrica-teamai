# Stepper — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Stepper 문서 인덱스](../README.md)

## 구현 내용

### 12.1 Props 및 타입

```typescript
import * as React from "react";

export type StepperDirection = "horizontal" | "vertical";
export type StepperSize = "small" | "medium";

export interface StepperStep {
  /** 라벨 텍스트. showLabel=true 일 때 icon 옆에 표시. */
  label: string;
  /** 이 step 을 invalid(에러) 상태로 강제. current 와 일치할 때만 적용. */
  invalid?: boolean;
  /** 도움말 텍스트. 라벨 아래/옆에 표시(선택). */
  helpText?: string;
}

export interface StepperProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** 방향. 기본 'horizontal'. */
  direction?: StepperDirection;
  /** 크기. 기본 'small'. icon 은 항상 20px이고 라벨/숫자 폰트만 다름. */
  size?: StepperSize;
  /** 라벨 표시 여부. 기본 true. */
  showLabel?: boolean;
  /** step 목록. 2~8개. */
  steps: StepperStep[];
  /** 현재 진행 중인 step index (0-base). 기본 0. */
  current?: number;
  /** 전체 비활성. */
  disabled?: boolean;
  /** step 클릭 가능 여부. true 시 라벨이 버튼으로 동작. 기본 false. */
  clickable?: boolean;
  /** step 클릭 시 호출. (index) => void. clickable=true 일 때만 동작. */
  onStepClick?: (index: number) => void;
}

type StepState = "completed" | "active" | "incomplete" | "invalid" | "disabled";
```

### 12.2 상태 계산 로직

```typescript
function resolveState(
  index: number,
  current: number,
  invalid: boolean | undefined,
  disabled: boolean,
): StepState {
  if (disabled) return "disabled";
  if (index >= current) {
    if (index === current && invalid) return "invalid";
    if (index === current) return "active";
    return "incomplete";
  }
  return "completed";
}
```

> **Divider 색상 로직**: Divider는 **현재 step이 Completed일 때** accent 색이 된다
> (현재 step에서 다음 step으로 나가는 선). `const dividerDone = state === 'completed'`.

### 12.4 TSX — Stepper.tsx (전체)

```tsx
import * as React from "react";

import { cn } from "@design/cn";
import {
  stepperHorizontal,
  stepperVertical,
  hItem,
  vItem,
  stepRow,
  iconLabelRow,
  hDivider,
  vDivider,
  vDividerWrap,
  dividerCompleted,
  iconMedium,
  iconCompleted,
  iconActive,
  iconIncomplete,
  iconInvalid,
  iconDisabled,
  iconContent,
  numberSmall,
  numberMedium,
  numberInverse,
  numberDefault,
  numberDisabled,
  svgMark,
  baseSmall,
  baseMedium,
  baseDefault,
  basePrimary,
  baseError,
  baseDisabledColor,
  labelButton,
  labelButtonDisabled,
  helpText,
  helpTextDefault,
  helpTextDisabled,
  hHelpTextWrap,
  vHelpText,
} from "./Stepper.css";

export function Stepper({
  direction = "horizontal",
  size = "small",
  showLabel = true,
  steps,
  current = 0,
  disabled = false,
  clickable = false,
  onStepClick,
  className,
  ...props
}: StepperProps) {
  const isVertical = direction === "vertical";
  const states = steps.map((step, index) =>
    resolveState(index, current, step.invalid, disabled),
  );

  return (
    <div
      data-slot="stepper"
      data-direction={direction}
      data-size={size}
      role="list"
      aria-disabled={disabled || undefined}
      className={cn(
        isVertical ? stepperVertical : stepperHorizontal,
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const state = states[index];
        const dividerDone = state === "completed";
        /* divider 는 마지막 step 에만 없음. 그 외 모든 step(invalid 포함)은 divider 있음. */
        const showDivider = !isLast;
        return (
          <div
            key={index}
            role="listitem"
            data-state={state}
            aria-current={state === "active" ? "step" : undefined}
            className={cn(isVertical ? vItem : hItem)}
          >
            {isVertical ? (
              <VerticalItem
                step={step}
                index={index}
                state={state}
                size={size}
                showLabel={showLabel}
                dividerDone={dividerDone}
                showDivider={showDivider}
                clickable={clickable}
                onStepClick={onStepClick}
              />
            ) : (
              <HorizontalItem
                step={step}
                index={index}
                state={state}
                size={size}
                showLabel={showLabel}
                dividerDone={dividerDone}
                showDivider={showDivider}
                clickable={clickable}
                onStepClick={onStepClick}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Horizontal item ── */

interface ItemProps {
  step: StepperStep;
  index: number;
  state: StepState;
  size: StepperSize;
  showLabel: boolean;
  isLast: boolean;
  dividerDone: boolean;
  /** divider 표시 여부. 마지막 step 이거나 invalid 상태면 false. */
  showDivider: boolean;
  clickable?: boolean;
  onStepClick?: (index: number) => void;
}

function HorizontalItem({
  step,
  index,
  state,
  size,
  showLabel,
  dividerDone,
  showDivider,
  clickable,
  onStepClick,
}: ItemProps) {
  return (
    <>
      <div className={stepRow}>
        <div className={iconLabelRow}>
          <StepperIcon index={index} state={state} size={size} />
          {showLabel && (
            <StepperBase
              step={step}
              state={state}
              size={size}
              clickable={clickable}
              onClick={onStepClick ? () => onStepClick(index) : undefined}
            />
          )}
        </div>
        {showDivider && (
          <div
            aria-hidden="true"
            className={cn(hDivider, dividerDone && dividerCompleted)}
          />
        )}
      </div>
      {showLabel && step.helpText && (
        <div className={hHelpTextWrap}>
          <span
            className={cn(
              helpText,
              state === "disabled" ? helpTextDisabled : helpTextDefault,
            )}
          >
            {step.helpText}
          </span>
        </div>
      )}
    </>
  );
}

/* ── Vertical item ── */

function VerticalItem({
  step,
  index,
  state,
  size,
  showLabel,
  dividerDone,
  showDivider,
  clickable,
  onStepClick,
}: ItemProps) {
  return (
    <>
      <div className={iconLabelRow}>
        <StepperIcon index={index} state={state} size={size} />
        {showLabel && (
          <StepperBase
            step={step}
            state={state}
            size={size}
            clickable={clickable}
            onClick={onStepClick ? () => onStepClick(index) : undefined}
          />
        )}
      </div>
      {showDivider && (
        <div aria-hidden="true" className={vDividerWrap}>
          <div className={cn(vDivider, dividerDone && dividerCompleted)} />
        </div>
      )}
      {showLabel && step.helpText && (
        <span
          className={cn(
            vHelpText,
            helpText,
            state === "disabled" ? helpTextDisabled : helpTextDefault,
          )}
        >
          {step.helpText}
        </span>
      )}
    </>
  );
}

/* ── Stepper-icon — 항상 20px ── */

interface StepperIconProps {
  index: number;
  state: StepState;
  size: StepperSize;
}

function StepperIcon({ index, state, size }: StepperIconProps) {
  const isSmall = size === "small";
  const stepNumber = index + 1;

  /* Figma: Stepper-item size="Small" 이어도 icon 은 항상 Medium(20px). */
  const sizeClass = iconMedium;
  const stateClass =
    state === "completed"
      ? iconCompleted
      : state === "active"
        ? iconActive
        : state === "invalid"
          ? iconInvalid
          : state === "disabled"
            ? iconDisabled
            : iconIncomplete;

  const numberColorClass =
    state === "active"
      ? numberInverse
      : state === "disabled"
        ? numberDisabled
        : numberDefault;

  return (
    <span className={cn(sizeClass, stateClass)}>
      {state === "completed" ? (
        <CheckMark isSmall={isSmall} />
      ) : state === "invalid" ? (
        <XMark isSmall={isSmall} />
      ) : (
        <span
          className={cn(
            iconContent,
            isSmall ? numberSmall : numberMedium,
            numberColorClass,
          )}
        >
          {stepNumber}
        </span>
      )}
    </span>
  );
}

/* ── Completed 체크 SVG ── */

function CheckMark({ isSmall }: { isSmall: boolean }) {
  return (
    <svg
      className={svgMark}
      width={isSmall ? "8.47" : "10.83"}
      height={isSmall ? "6.13" : "7.92"}
      viewBox={isSmall ? "0 0 8.47 6.13" : "0 0 10.83 7.92"}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          isSmall
            ? "M7.97 0.5 L2.83 5.63 L0.5 3.3"
            : "M10.08 0.75 L3.67 7.17 L0.75 4.25"
        }
        stroke="var(--stepper-icon-completed-border)"
        strokeWidth={isSmall ? 1 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Invalid X SVG ── */

function XMark({ isSmall }: { isSmall: boolean }) {
  return (
    <svg
      className={svgMark}
      width={isSmall ? "6.6" : "8.5"}
      height={isSmall ? "6.6" : "8.5"}
      viewBox={isSmall ? "0 0 6.6 6.6" : "0 0 8.5 8.5"}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          isSmall
            ? "M5.746 0.146C5.941 -0.049 6.258 -0.049 6.453 0.146C6.648 0.342 6.648 0.658 6.453 0.853L4.007 3.3L6.453 5.746C6.648 5.941 6.648 6.258 6.453 6.453C6.258 6.648 5.941 6.648 5.746 6.453L3.3 4.007L0.853 6.453C0.658 6.648 0.342 6.648 0.146 6.453C-0.049 6.258 -0.049 5.941 0.146 5.746L2.593 3.3L0.146 0.853C-0.049 0.658 -0.049 0.342 0.146 0.146C0.342 -0.049 0.658 -0.049 0.853 0.146L3.3 2.593L5.746 0.146Z"
            : "M7.22 0.22C7.513 -0.073 7.987 -0.073 8.28 0.22C8.573 0.513 8.573 0.987 8.28 1.28L5.31 4.25L8.28 7.22C8.573 7.513 8.573 7.987 8.28 8.28C7.987 8.573 7.513 8.573 7.22 8.28L4.25 5.31L1.28 8.28C0.987 8.573 0.513 8.573 0.22 8.28C-0.073 7.987 -0.073 7.513 0.22 7.22L3.19 4.25L0.22 1.28C-0.073 0.987 -0.073 0.513 0.22 0.22C0.513 -0.073 0.987 -0.073 1.28 0.22L4.25 3.19L7.22 0.22Z"
        }
        fill="var(--stepper-mark-default-static)"
      />
    </svg>
  );
}

/* ── Stepper-base (라벨) ── */

interface StepperBaseProps {
  step: StepperStep;
  state: StepState;
  size: StepperSize;
  clickable?: boolean;
  onClick?: () => void;
}

function StepperBase({
  step,
  state,
  size,
  clickable,
  onClick,
}: StepperBaseProps) {
  const fontClass = size === "medium" ? baseMedium : baseSmall;
  const colorClass =
    state === "active"
      ? basePrimary
      : state === "invalid"
        ? baseError
        : state === "disabled"
          ? baseDisabledColor
          : baseDefault;

  /* clickable 일 때 button 으로 렌더 — 포커스 링 + 호버 + 키보드 접근. */
  if (clickable && state !== "disabled") {
    return (
      <button
        type="button"
        className={cn(fontClass, colorClass, labelButton)}
        onClick={onClick}
      >
        {step.label}
      </button>
    );
  }

  return (
    <span
      className={cn(
        fontClass,
        colorClass,
        state === "disabled" && labelButtonDisabled,
      )}
    >
      {step.label}
    </span>
  );
}
```
