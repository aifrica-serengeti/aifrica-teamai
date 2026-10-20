# Select — TypeScript와 React 구현

> **추출 참조 계약(reference-contract)**: 원본의 상세 API·상태·접근성·예제를 보존한 문서입니다.
> 이 저장소에 실행 컴포넌트가 있다는 뜻이 아닙니다. 수치·중립색·글꼴은 추출 baseline이며,
> [계약 수준과 솔루션 매핑](../../../contract-levels.md)을 먼저 적용하고 대상 솔루션의 실제 구현·버전을 확인합니다.

[← Select 문서 인덱스](../README.md)

## 구현 내용

참조 구현은 field ID에서 안정적인 listbox ID를 만들고 popup이 열린 동안 trigger와 searchable input의
`aria-controls`로 연결한다. 같은 ID를 실제 `role="listbox"` 요소에 부여하며, 닫힌 상태에는 관계 속성을
노출하지 않는다. 아래 재현 예제에서도 이 관계를 유지해야 한다.

### Primitive 컴포넌트 (`select.tsx`)

```tsx
import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
  ChevronDown as ChevronDownIcon,
  Check as CheckIcon,
  X,
} from "lucide-react";

import { cn } from "./utils";
import { Chip } from "./Chip";
import { Checkbox } from "./Checkbox";
import {
  trigger,
  triggerValue,
  triggerPlaceholder,
  searchInput,
  chevron,
  content,
  viewport,
  item,
  itemSmall,
  itemMedium,
  itemLarge,
  itemContent,
  checkIcon,
  emptyMessage,
  chipContainer,
  clearButton,
  itemLeading,
  overflowChip,
  selectAllItem,
  divider,
} from "./select.css";

export type SelectSize = "small" | "medium" | "large" | "xlarge";
export type SelectVariant = "default" | "create";

const ITEM_SIZE_CLASS: Record<SelectSize, string> = {
  small: itemSmall,
  medium: itemMedium,
  large: itemLarge,
  xlarge: itemLarge,
};

const CHIP_SIZE: Record<SelectSize, "small" | "medium"> = {
  small: "small",
  medium: "small",
  large: "medium",
  xlarge: "medium",
};

interface SelectContextValue {
  size: SelectSize;
  variant: SelectVariant;
  searchable: boolean;
  multiple: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
  open: boolean;
  listboxId: string;
  setOpen: (open: boolean) => void;
  value: string | undefined;
  values: string[];
  showSelectAll: boolean;
  searchValue: string;
  setSearchValue: (v: string) => void;
  onItemSelect: (value: string) => void;
  onItemToggle: (value: string) => void;
  onRemoveChip: (value: string) => void;
  onClear: () => void;
  onToggleAll: (allValues: string[]) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(component: string) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error(`<${component}>은(는) <Select> 내부에서 사용해야 합니다.`);
  }
  return ctx;
}

/* ===== Select (Root) ===== */
export interface SelectProps extends Omit<
  React.ComponentProps<typeof PopoverPrimitive.Root>,
  "open" | "onOpenChange" | "defaultOpen"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  size?: SelectSize;
  variant?: SelectVariant;
  searchable?: boolean;
  multiple?: boolean;
  showSelectAll?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export function Select({
  value: valueProp,
  defaultValue,
  onValueChange,
  values: valuesProp,
  defaultValues,
  onValuesChange,
  size = "medium",
  variant = "default",
  searchable = false,
  multiple = false,
  showSelectAll = true,
  invalid = false,
  disabled = false,
  readOnly = false,
  children,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [internalValues, setInternalValues] = React.useState<string[]>(
    defaultValues ?? [],
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const listboxId = React.useId();

  const isControlled = valueProp !== undefined;
  const isValuesControlled = valuesProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const values = isValuesControlled ? valuesProp! : internalValues;

  const handleItemSelect = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      setSearchValue("");
      setOpen(false);
    },
    [isControlled, onValueChange],
  );

  const handleItemToggle = React.useCallback(
    (next: string) => {
      const nextValues = values.includes(next)
        ? values.filter((v) => v !== next)
        : [...values, next];
      if (!isValuesControlled) setInternalValues(nextValues);
      onValuesChange?.(nextValues);
      setSearchValue("");
    },
    [values, isValuesControlled, onValuesChange],
  );

  const handleRemoveChip = React.useCallback(
    (chipValue: string) => {
      const nextValues = values.filter((v) => v !== chipValue);
      if (!isValuesControlled) setInternalValues(nextValues);
      onValuesChange?.(nextValues);
    },
    [values, isValuesControlled, onValuesChange],
  );

  const handleClear = React.useCallback(() => {
    if (!isValuesControlled) setInternalValues([]);
    onValuesChange?.([]);
  }, [isValuesControlled, onValuesChange]);

  const handleToggleAll = React.useCallback(
    (allValues: string[]) => {
      const allSelected =
        allValues.length > 0 && allValues.every((v) => values.includes(v));
      const nextValues = allSelected ? [] : [...allValues];
      if (!isValuesControlled) setInternalValues(nextValues);
      onValuesChange?.(nextValues);
    },
    [values, isValuesControlled, onValuesChange],
  );

  const effectiveOpen = !disabled && !readOnly ? open : false;

  const ctx = React.useMemo<SelectContextValue>(
    () => ({
      size,
      variant,
      searchable,
      multiple,
      invalid,
      disabled,
      readOnly,
      open: effectiveOpen,
      listboxId,
      setOpen,
      value,
      values,
      showSelectAll: multiple && showSelectAll,
      searchValue,
      setSearchValue,
      onItemSelect: handleItemSelect,
      onItemToggle: handleItemToggle,
      onRemoveChip: handleRemoveChip,
      onClear: handleClear,
      onToggleAll: handleToggleAll,
    }),
    [
      size,
      variant,
      searchable,
      multiple,
      invalid,
      disabled,
      readOnly,
      effectiveOpen,
      listboxId,
      value,
      values,
      showSelectAll,
      searchValue,
      handleItemSelect,
      handleItemToggle,
      handleRemoveChip,
      handleClear,
      handleToggleAll,
    ],
  );

  return (
    <SelectContext.Provider value={ctx}>
      <PopoverPrimitive.Root
        data-slot="select"
        open={effectiveOpen}
        onOpenChange={setOpen}
        {...props}
      >
        {children}
      </PopoverPrimitive.Root>
    </SelectContext.Provider>
  );
}

/* ===== chip overflow 계산 훅 ===== */
function useChipOverflow(
  containerRef: React.RefObject<HTMLElement | null>,
  chipCount: number,
  deps: React.DependencyList,
) {
  const [visibleCount, setVisibleCount] = React.useState(chipCount);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || chipCount === 0) {
      setVisibleCount(0);
      return;
    }

    const measure = () => {
      const measureChips = Array.from(
        container.querySelectorAll<HTMLElement>("[data-chip-measure]"),
      );
      if (measureChips.length === 0) return;

      const overflowEl = container.querySelector<HTMLElement>(
        "[data-overflow-measure]",
      );
      const overflowWidth = overflowEl ? overflowEl.offsetWidth + 4 : 44;

      const available = container.clientWidth - overflowWidth;
      let total = 0;
      let count = 0;
      for (const chip of measureChips) {
        const w = chip.offsetWidth + 4;
        if (total + w > available) break;
        total += w;
        count++;
      }

      setVisibleCount(count >= chipCount ? chipCount : count);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chipCount, ...deps]);

  return visibleCount;
}

/* ===== SelectTrigger ===== */
export interface SelectTriggerProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  placeholder?: string;
  searchAriaLabel?: string;
}

export function SelectTrigger({
  placeholder = "옵션을 골라주세요",
  searchAriaLabel = "옵션 검색",
  className,
  ...props
}: SelectTriggerProps) {
  const ctx = useSelectContext("SelectTrigger");
  const {
    searchable,
    multiple,
    value,
    values,
    searchValue,
    setSearchValue,
    disabled,
    readOnly,
    open,
    listboxId,
    setOpen,
    onRemoveChip,
    onClear,
  } = ctx;

  const hasSelection = multiple ? values.length > 0 : value !== undefined;
  const showValue = !searchable && !multiple && value !== undefined;

  const chipContainerRef = React.useRef<HTMLDivElement>(null);
  const visibleCount = useChipOverflow(chipContainerRef, values.length, [
    values,
  ]);
  const overflowCount = values.length - visibleCount;

  const inputPlaceholder = multiple && hasSelection ? "" : placeholder;
  const inputValue =
    multiple || open ? searchValue : hasSelection ? (value ?? "") : "";

  const stopToggleIfOpen = (e: React.SyntheticEvent) => {
    if (readOnly || disabled) {
      e.preventDefault();
      return;
    }
    if (open) e.stopPropagation();
  };

  return (
    <PopoverPrimitive.Trigger asChild>
      <div
        data-slot="select-trigger"
        data-size={ctx.size}
        data-variant={ctx.variant}
        data-multiple={multiple ? "true" : undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        aria-invalid={ctx.invalid || undefined}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        tabIndex={readOnly || disabled ? -1 : 0}
        className={cn(trigger, className)}
        onKeyDown={(event) => {
          if (
            disabled ||
            readOnly ||
            event.target !== event.currentTarget ||
            (event.key !== "Enter" && event.key !== " ")
          )
            return;
          event.preventDefault();
          setOpen(!open);
        }}
        {...props}
      >
        {multiple ? (
          <>
            <div className={chipContainer} ref={chipContainerRef}>
              {values.slice(0, visibleCount).map((v) => (
                <Chip
                  key={v}
                  color="blue"
                  variant="subtle"
                  size={CHIP_SIZE[ctx.size]}
                  shape="pill"
                  onRemove={
                    disabled || readOnly ? undefined : () => onRemoveChip(v)
                  }
                >
                  {v}
                </Chip>
              ))}

              {overflowCount > 0 && (
                <span className={overflowChip}>+{overflowCount}</span>
              )}

              {/* 측정용 숨김 chip 들 */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  visibility: "hidden",
                  pointerEvents: "none",
                  display: "flex",
                  gap: "4px",
                  left: 0,
                  top: 0,
                }}
              >
                {values.map((v) => (
                  <span key={`m-${v}`} data-chip-measure>
                    <Chip
                      color="blue"
                      variant="subtle"
                      size={CHIP_SIZE[ctx.size]}
                      shape="pill"
                      onRemove={() => {}}
                    >
                      {v}
                    </Chip>
                  </span>
                ))}
                <span className={overflowChip} data-overflow-measure>
                  +99
                </span>
              </span>

              {searchable ? (
                <input
                  type="text"
                  className={searchInput}
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  disabled={disabled}
                  readOnly={readOnly}
                  tabIndex={-1}
                  aria-label={searchAriaLabel}
                  aria-expanded={open}
                  aria-controls={open ? listboxId : undefined}
                  onClick={stopToggleIfOpen}
                  onPointerDown={stopToggleIfOpen}
                />
              ) : !hasSelection ? (
                <span className={triggerPlaceholder}>{placeholder}</span>
              ) : null}
            </div>

            {hasSelection && !disabled && !readOnly && (
              <button
                type="button"
                className={clearButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                aria-label="선택 모두 지우기"
                tabIndex={-1}
              >
                <X size={10} strokeWidth={2.5} aria-hidden />
              </button>
            )}
          </>
        ) : searchable ? (
          <input
            type="text"
            className={searchInput}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={disabled}
            readOnly={readOnly}
            tabIndex={-1}
            aria-label={searchAriaLabel}
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            onClick={stopToggleIfOpen}
            onPointerDown={stopToggleIfOpen}
          />
        ) : showValue ? (
          <span className={triggerValue}>{value}</span>
        ) : (
          <span className={triggerPlaceholder}>{placeholder}</span>
        )}

        <span className={chevron}>
          <ChevronDownIcon size={16} strokeWidth={2} aria-hidden />
        </span>
      </div>
    </PopoverPrimitive.Trigger>
  );
}

/* ===== SelectContent ===== */
export interface SelectContentProps extends React.ComponentProps<
  typeof PopoverPrimitive.Content
> {
  portalContainer?: HTMLElement | null;
}

export function SelectContent({
  className,
  children,
  sideOffset = 4,
  portalContainer,
  ...props
}: SelectContentProps) {
  const ctx = useSelectContext("SelectContent");
  const { listboxId } = ctx;

  const allOptionValues = React.useMemo(() => {
    const items = React.Children.toArray(children).filter(
      React.isValidElement,
    ) as React.ReactElement<{ value?: string }>[];
    return items
      .map((child) => child.props?.value)
      .filter((v): v is string => typeof v === "string");
  }, [children]);

  return (
    <PopoverPrimitive.Portal container={portalContainer ?? undefined}>
      <PopoverPrimitive.Content
        data-slot="select-content"
        sideOffset={sideOffset}
        align="start"
        className={cn(content, className)}
        onOpenAutoFocus={(e) => {
          if (ctx.searchable) e.preventDefault();
        }}
        {...props}
      >
        <div id={listboxId} className={viewport} role="listbox">
          {ctx.showSelectAll && allOptionValues.length > 0 && (
            <>
              <SelectAllOption allOptionValues={allOptionValues} />
              <div className={divider} />
            </>
          )}

          <SelectFilteredItems
            searchValue={ctx.searchValue}
            searchable={ctx.searchable}
          >
            {children}
          </SelectFilteredItems>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/* ===== "모두 선택" 행 ===== */
function SelectAllOption({ allOptionValues }: { allOptionValues: string[] }) {
  const ctx = useSelectContext("SelectAllOption");
  const { values } = ctx;

  const selectedCount = allOptionValues.filter((v) =>
    values.includes(v),
  ).length;
  const allSelected =
    allOptionValues.length > 0 && selectedCount === allOptionValues.length;
  const noneSelected = selectedCount === 0;
  const checked: boolean | "indeterminate" = allSelected
    ? true
    : noneSelected
      ? false
      : "indeterminate";

  const handleActivate = () => {
    if (ctx.disabled) return;
    ctx.onToggleAll(allOptionValues);
  };

  return (
    <div
      data-slot="select-item"
      data-selected={allSelected ? "true" : undefined}
      role="option"
      aria-selected={allSelected}
      tabIndex={0}
      className={cn(item, ITEM_SIZE_CLASS[ctx.size], selectAllItem)}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
    >
      <span className={itemLeading}>
        <Checkbox
          size={ctx.size === "small" ? "small" : "medium"}
          checked={checked}
          tabIndex={-1}
        />
      </span>
      <span className={itemContent}>모두 선택</span>
    </div>
  );
}

/* ===== 필터링 래퍼 ===== */
function SelectFilteredItems({
  searchValue,
  searchable,
  children,
}: {
  searchValue: string;
  searchable: boolean;
  children: React.ReactNode;
}) {
  const query = searchValue.trim().toLowerCase();

  if (!searchable || query === "") {
    return <>{children}</>;
  }

  const items = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<{ value?: string }>[];

  const matched = items.filter((child) => {
    const childValue = child.props?.value;
    if (typeof childValue !== "string") return true;
    return childValue.toLowerCase().includes(query);
  });

  if (matched.length === 0) {
    return <div className={emptyMessage}>검색 결과가 없습니다.</div>;
  }

  return <>{matched}</>;
}

/* ===== SelectItem ===== */
export interface SelectItemProps extends Omit<
  React.ComponentProps<"div">,
  "value"
> {
  value: string;
  disabled?: boolean;
  leading?: React.ReactNode;
}

export function SelectItem({
  value,
  disabled = false,
  leading,
  className,
  children,
  ...props
}: SelectItemProps) {
  const ctx = useSelectContext("SelectItem");
  const selected = ctx.multiple
    ? ctx.values.includes(value)
    : ctx.value === value;

  const handleActivate = () => {
    if (disabled) return;
    if (ctx.multiple) ctx.onItemToggle(value);
    else ctx.onItemSelect(value);
  };

  return (
    <div
      data-slot="select-item"
      data-selected={selected ? "true" : undefined}
      data-disabled={disabled || undefined}
      role="option"
      aria-selected={selected}
      tabIndex={disabled ? -1 : 0}
      className={cn(item, ITEM_SIZE_CLASS[ctx.size], className)}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      {...props}
    >
      {leading ? (
        <span className={itemLeading}>{leading}</span>
      ) : ctx.multiple ? (
        <span className={itemLeading}>
          <Checkbox
            size={ctx.size === "small" ? "small" : "medium"}
            checked={selected}
            disabled={disabled}
            tabIndex={-1}
          />
        </span>
      ) : null}

      <span className={itemContent}>{children}</span>

      {!ctx.multiple && selected && !leading && (
        <CheckIcon className={checkIcon} strokeWidth={2} />
      )}
    </div>
  );
}
```

### Markup 컴포넌트 (`Select.tsx`)

> Primitive 를 감싸 Label / Help text / loading / error / empty 상태를 조립한
> 사용자용 컴포넌트. `options` 배열을 받아 자동으로 SelectItem 을 렌더한다.

```tsx
import { Info } from "lucide-react";
import {
  Select as SelectPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectItem as SelectItemPrimitive,
  type SelectSize,
  type SelectVariant,
} from "./select";
import { Spinner } from "./Spinner";
import { Status } from "./Status";
import {
  field,
  labelRow,
  labelText,
  optionalText,
  requiredMark,
  infoIcon,
  helpText,
  helpTextInvalid,
} from "./Select.css";

export type { SelectSize, SelectVariant };

export interface SelectOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

export interface SelectMessages {
  optional: string;
  search: string;
  clearAll: string;
  optionList: string;
  optionsSuffix: string;
  selectAll: string;
  loading: string;
  error: string;
  empty: string;
}

export interface SelectProps {
  label?: string;
  /** 시각적 label이 없는 경우의 접근 가능한 이름 */
  ariaLabel?: string;
  optional?: boolean;
  required?: boolean;
  infoIcon?: boolean;
  size?: SelectSize;
  variant?: SelectVariant;
  searchable?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helpText?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  multiple?: boolean;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  loading?: boolean;
  error?: boolean;
  /** 기본 trigger 폭 대신 가장 긴 option의 내용 폭으로 Content를 맞춘다. */
  contentWidth?: "trigger" | "content";
  maxVisibleOptions?: number;
  /** 기본 dialog: 가장 가까운 Dialog Content를 사용하고 없으면 body로 fallback한다. */
  portalMode?: "body" | "dialog";
  messages?: Partial<SelectMessages>;
}

export function Select({
  label,
  ariaLabel,
  optional = false,
  required = false,
  infoIcon: showInfoIcon = false,
  size = "medium",
  variant = "default",
  searchable = false,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = "옵션을 골라주세요",
  invalid = false,
  disabled = false,
  readOnly = false,
  helpText: helpContent,
  className,
  fullWidth = false,
  multiple = false,
  values,
  defaultValues,
  onValuesChange,
  loading = false,
  error = false,
  contentWidth = "trigger",
  portalMode = "dialog",
}: SelectProps) {
  const fieldId = React.useId();
  const [portalContainer, setPortalContainer] =
    React.useState<HTMLElement | null>(null);
  const labelId = label ? `${fieldId}-label` : undefined;
  const helpId = helpContent ? `${fieldId}-help` : undefined;
  const setTriggerNode = React.useCallback(
    (node: HTMLDivElement | null) => {
      setPortalContainer(
        portalMode === "dialog"
          ? (node?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null)
          : null,
      );
    },
    [portalMode],
  );
  const hasOptions = (options?.length ?? 0) > 0;
  const showStatusOption = loading || error;
  const showSelectAll = multiple && hasOptions && !showStatusOption;

  return (
    <div className={field} data-full-width={fullWidth || undefined}>
      {label && (
        <div className={labelRow}>
          <span id={labelId} className={labelText}>
            {label}
          </span>
          {optional && <span className={optionalText}>(선택사항)</span>}
          {required && <span className={requiredMark}>*</span>}
          {showInfoIcon && (
            <Info className={infoIcon} size={14} strokeWidth={2} aria-hidden />
          )}
        </div>
      )}

      <SelectPrimitive
        size={size}
        variant={variant}
        searchable={searchable}
        invalid={invalid}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        multiple={multiple}
        values={values}
        defaultValues={defaultValues}
        onValuesChange={onValuesChange}
        showSelectAll={showSelectAll}
      >
        <SelectTriggerPrimitive
          ref={setTriggerNode}
          placeholder={placeholder}
          aria-label={label ? undefined : (ariaLabel ?? placeholder)}
          aria-labelledby={labelId}
          aria-describedby={helpId}
          className={className}
        />
        <SelectContentPrimitive portalContainer={portalContainer}>
          {loading ? (
            <SelectItemPrimitive
              value="__loading__"
              disabled
              leading={<Spinner size="tiny" />}
            >
              데이터를 불러오는 중입니다
            </SelectItemPrimitive>
          ) : error ? (
            <SelectItemPrimitive
              value="__error__"
              disabled
              leading={<Status state="error" showLabel={false} iconSize={16} />}
            >
              데이터 불러오기에 실패했습니다
            </SelectItemPrimitive>
          ) : hasOptions ? (
            options!.map((opt) => (
              <SelectItemPrimitive
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label ?? opt.value}
              </SelectItemPrimitive>
            ))
          ) : (
            <SelectItemPrimitive value="__empty__" disabled>
              선택할 항목이 없습니다
            </SelectItemPrimitive>
          )}
        </SelectContentPrimitive>
      </SelectPrimitive>

      {helpContent && (
        <p
          id={helpId}
          className={invalid ? helpTextInvalid : helpText}
          role={invalid ? "alert" : undefined}
        >
          {helpContent}
        </p>
      )}
    </div>
  );
}
```

### 실제 구현의 loading 보완

현재 production `Select.tsx`는 `loading` prop을 trigger와 option 목록에 함께 적용한다. Trigger에 `aria-busy={loading || undefined}`를 전달하고 값 렌더링 앞에 `{loading && <Spinner size="tiny" label={copy.loading} />}`를 둔다. 기존 selected label/chip, disabled 정책과 controlled callback은 유지한다.
