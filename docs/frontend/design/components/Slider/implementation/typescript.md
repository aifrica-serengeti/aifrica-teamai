# Slider — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Slider 문서 인덱스](../README.md)

## 구현 내용

### 12.2 Slider primitive — `slider.tsx`

```tsx
import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "...utils"; // clsx + tailwind-merge
import {
  sliderRoot,
  sliderTrack,
  sliderRange,
  sliderThumb,
} from "./slider.css";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(sliderRoot, className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={sliderTrack}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={sliderRange}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={sliderThumb}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
```

### 12.4 playground 조립 컴포넌트 — `Slider.tsx`

Radix primitive 를 직접 조립(slider.css.ts 스타일 재사용)하며, 각 Thumb 를 TooltipTrigger 로
감싸 Tooltip 이 Thumb 위에 표시. Input 은 공용 Input 컴포넌트 사용.

```tsx
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { Info } from "lucide-react";
import { Slider as SliderPrimitive } from "radix-ui";
import { Input as InputPrimitive } from "...Input"; // 공용 Input (Input/README.md §12)
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "...Tooltip"; // 공용 Tooltip (Tooltip/README.md §12)
import {
  sliderRoot,
  sliderTrack,
  sliderRange,
  sliderThumb,
} from "...slider.css";
import { cn } from "...utils";
import {
  field,
  labelRow,
  labelText,
  optionalText,
  requiredMark,
  infoIcon,
  bodyRow,
  trackColumn,
  sliderWrap,
  steps as stepsBox,
  tick,
  stepLabel,
  inputWrap,
  inputEl,
  helpText,
  inlineHelpText,
  errorText,
} from "./Slider.css";

export type SliderValue = number | [number, number];

const isRange = (v: SliderValue | undefined): v is [number, number] =>
  Array.isArray(v);

export interface SliderProps {
  label?: string;
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  disabled?: boolean;
  showSteps?: boolean;
  marks?: readonly { value: number; label?: ReactNode }[];
  showInput?: boolean;
  id?: string;
  className?: string;
  helpText?: ReactNode;
  helpTextPlacement?: "below" | "label-end";
  errorText?: string;
}

export function Slider({
  label,
  optional = false,
  required = false,
  infoIcon: showInfo = false,
  min = 0,
  max = 100,
  step = 10,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  showSteps = true,
  marks,
  showInput = true,
  id,
  className,
  helpText: helpContent,
  helpTextPlacement = "below",
  errorText: errorContent,
}: SliderProps) {
  const isControlled = value !== undefined;
  const descriptionId = useId();
  const isInvalid = Boolean(errorContent);
  const hasLabelRow = Boolean(label || optional || required || showInfo);
  const inlineHelp = Boolean(label && helpContent && !errorContent && helpTextPlacement === "label-end");
  const [innerValue, setInnerValue] = useState<SliderValue>(
    defaultValue ?? (isRange(value) ? [min, max] : min),
  );
  const currentValue: SliderValue = isControlled
    ? (value as SliderValue)
    : innerValue;
  const rangeMode = isRange(currentValue);
  const radixValue: number[] = rangeMode
    ? currentValue
    : [currentValue as number];

  // ===== Tooltip open 제어 (hover + 드래그 + focus) =====
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const draggingRef = useRef(false);
  const openTooltip = useCallback(() => setTooltipOpen(true), []);
  const closeTooltip = useCallback(() => {
    if (!draggingRef.current) setTooltipOpen(false);
  }, []);
  const handlePointerDown = useCallback(() => {
    draggingRef.current = true;
    setTooltipOpen(true);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  }, []);
  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    setTooltipOpen(false);
  }, []);

  // ===== Input 텍스트 상태 =====
  const [inputMinText, setInputMinText] = useState(String(radixValue[0]));
  const [inputMaxText, setInputMaxText] = useState(
    String(radixValue[rangeMode ? 1 : 0] ?? radixValue[0]),
  );
  useEffect(() => {
    setInputMinText(String(radixValue[0]));
    setInputMaxText(String(radixValue[rangeMode ? 1 : 0] ?? radixValue[0]));
  }, [radixValue[0], radixValue[1], rangeMode]);

  // ===== 값 커밋 =====
  const commit = useCallback(
    (next: number[]) => {
      const v: SliderValue = rangeMode ? [next[0], next[1]] : next[0];
      if (!isControlled) setInnerValue(v);
      onValueChange?.(v);
    },
    [rangeMode, isControlled, onValueChange],
  );

  // ===== Input 핸들러 — 숫자만 허용, blur 시 clamp =====
  const filterNumeric = (raw: string) => raw.replace(/[^\d-]/g, "");
  const commitInputMin = () => {
    const parsed = Number(inputMinText);
    const upper = rangeMode ? radixValue[1] : max;
    const clamped = Number.isNaN(parsed)
      ? radixValue[0]
      : Math.min(Math.max(parsed, min), upper);
    commit(rangeMode ? [clamped, radixValue[1]] : [clamped]);
    setInputMinText(String(clamped));
  };
  const commitInputMax = () => {
    const parsed = Number(inputMaxText);
    const clamped = Number.isNaN(parsed)
      ? radixValue[1]
      : Math.min(Math.max(parsed, radixValue[0]), max);
    commit([radixValue[0], clamped]);
    setInputMaxText(String(clamped));
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  };

  // ===== Steps =====
  const stepCount = Math.round((max - min) / step);
  const ticks = useMemo(() => {
    if (!showSteps) return [];
    if (marks) return marks
      .filter((mark) => Number.isFinite(mark.value) && mark.value >= min && mark.value <= max)
      .map((mark) => ({
        pos: max > min ? ((mark.value - min) / (max - min)) * 100 : 0,
        label: mark.label,
        showLabel: mark.label !== undefined,
      }));
    return Array.from({ length: stepCount + 1 }, (_, i) => ({
      pos: (i / stepCount) * 100,
      label: min + i * step,
      showLabel: i % 2 === 0,
    }));
  }, [showSteps, marks, stepCount, min, max, step]);

  const thumbCount = rangeMode ? 2 : 1;
  const getThumbAriaLabel = (index: number) => {
    const name = label ?? "슬라이더 값";
    if (!rangeMode) return name;
    return `${name} ${index === 0 ? "최솟값" : "최댓값"}`;
  };

  return (
    <div className={cn(field, className)}>
      {hasLabelRow && (
        <div className={labelRow}>
          {label && <span className={labelText}>{label}</span>}
          {optional && <span className={optionalText}>(선택사항)</span>}
          {required && (
            <span className={requiredMark} aria-hidden>
              *
            </span>
          )}
          {showInfo && (
            <Info size={14} className={infoIcon} strokeWidth={2} aria-hidden />
          )}
          {inlineHelp && <p id={descriptionId} className={inlineHelpText}>{helpContent}</p>}
        </div>
      )}

      <div className={bodyRow}>
        {/* Range 모드: min Input 을 Track 왼쪽에 배치 */}
        {showInput && rangeMode && (
          <div className={inputWrap}>
            <InputPrimitive
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              size="medium"
              className={inputEl}
              value={inputMinText}
              onChange={(e) => setInputMinText(filterNumeric(e.target.value))}
              onBlur={commitInputMin}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              aria-label="최솟값"
            />
          </div>
        )}

        <div className={trackColumn}>
          <TooltipProvider delayDuration={300}>
            <SliderPrimitive.Root
              data-slot="slider"
              className={cn(sliderRoot, sliderWrap)}
              id={id}
              value={radixValue}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              onValueChange={(next) => commit(next)}
              onPointerDown={handlePointerDown}
              onMouseEnter={openTooltip}
              onMouseLeave={closeTooltip}
            >
              <SliderPrimitive.Track
                data-slot="slider-track"
                className={sliderTrack}
              >
                <SliderPrimitive.Range
                  data-slot="slider-range"
                  className={sliderRange}
                />
              </SliderPrimitive.Track>
              {Array.from({ length: thumbCount }, (_, index) => (
                <Tooltip key={index} open={tooltipOpen}>
                  <TooltipTrigger asChild>
                    <SliderPrimitive.Thumb
                      data-slot="slider-thumb"
                      className={sliderThumb}
                      aria-label={getThumbAriaLabel(index)}
                      aria-describedby={
                        helpContent || errorContent ? descriptionId : undefined
                      }
                      onFocus={openTooltip}
                      onBlur={closeTooltip}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    sideOffset={8}
                    showArrow
                    variant="icon"
                  >
                    {radixValue[index]}
                  </TooltipContent>
                </Tooltip>
              ))}
            </SliderPrimitive.Root>
          </TooltipProvider>

          {showSteps && (
            <div className={stepsBox} aria-hidden="true">
              {ticks.map((t, i) => (
                <div key={i}>
                  <div className={tick} style={{ left: `${t.pos}%` }} />
                  {t.showLabel && (
                    <span className={stepLabel} style={{ left: `${t.pos}%` }}>
                      {t.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 단일 모드: Input 을 Track 오른쪽에 / Range 모드: max Input 을 Track 오른쪽에 */}
        {showInput && !rangeMode && (
          <div className={inputWrap}>
            <InputPrimitive
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              size="medium"
              className={inputEl}
              value={inputMinText}
              onChange={(e) => setInputMinText(filterNumeric(e.target.value))}
              onBlur={commitInputMin}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              aria-label="슬라이더 값"
            />
          </div>
        )}
        {showInput && rangeMode && (
          <div className={inputWrap}>
            <InputPrimitive
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              size="medium"
              className={inputEl}
              value={inputMaxText}
              onChange={(e) => setInputMaxText(filterNumeric(e.target.value))}
              onBlur={commitInputMax}
              onKeyDown={handleInputKeyDown}
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              aria-label="최댓값"
            />
          </div>
        )}
      </div>

      {errorContent ? (
        <p id={descriptionId} className={errorText} role="alert">
          {errorContent}
        </p>
      ) : helpContent && !inlineHelp ? (
        <p id={descriptionId} className={helpText}>
          {helpContent}
        </p>
      ) : null}
    </div>
  );
}
```

---


## 문구 없는 오류 상태

공개 `SliderProps`는 `invalid?: boolean`을 지원한다. `const isInvalid = invalid || Boolean(errorContent)`로 계산해 기존 input/root 오류 상태에 전달한다.

### 라벨 옆 보조 문구 사용

추출 참조 source의 `Slider.tsx`는 아래 계약을 구현한다. 기본 하단 배치에 영향을 주지 않는다.

```tsx
<Slider label="CPU (vCPU)" value={[0, 64]} min={0} max={64} showInput={false} helpText="0 ~ 제한 없음" helpTextPlacement="label-end" />
```

라벨이 존재하고 오류가 없을 때에만 보조 문구를 label row에 렌더한다. 오류가 있으면 하단 오류로 대체하고, 라벨이 없으면 보조 문구를 하단에 렌더한다. 모든 경우 기존 description ID를 thumb과 연결한다.
