import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode, PointerEventHandler } from "react";
import { ScrollArea, type ScrollAreaHandle } from "./ScrollArea";
import { useReducedMotion } from "./Disclosure";
import "./Select.css";

export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectOptionRenderProps = {
  option: SelectOption;
  id: string;
  index: number;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onPointerMove: () => void;
  onPointerDown: PointerEventHandler;
};
export type SingleSelectProps = {
  id?: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  name?: string;
  className?: string;
  triggerContent?: ReactNode;
  popupClassName?: string;
  renderOption?: (props: SelectOptionRenderProps) => ReactNode;
  renderScrollArea?: (props: ComponentProps<typeof ScrollArea>) => ReactNode;
};
/** Single selection only. Search and multi-selection are intentionally not exposed. */
export function SingleSelect({
  id,
  label,
  value,
  onValueChange,
  options,
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  describedBy,
  name,
  className = "",
  triggerContent,
  popupClassName = "",
  renderOption,
  renderScrollArea,
}: SingleSelectProps) {
  const generated = useId(),
    popupId = `${generated}-options`;
  const trigger = useRef<HTMLButtonElement>(null),
    root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false),
    [present, setPresent] = useState(false),
    [active, setActive] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const reduced = useReducedMotion();
  const popup = useRef<HTMLDivElement>(null);
  const popupScroll = useRef<ScrollAreaHandle>(null);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    side: "bottom",
  });
  const canOpen = !disabled && !readOnly;
  const selected = options.find((option) => option.value === value);
  const activeIndex =
    options[active] && !options[active].disabled
      ? active
      : options.findIndex((option) => !option.disabled);
  function show(fromKeyboard: boolean) {
    if (!canOpen) return;
    setKeyboardActive(fromKeyboard);
    setActive(
      options.some((option) => option.value === value && !option.disabled)
        ? options.findIndex(
            (option) => option.value === value && !option.disabled,
          )
        : options.findIndex((option) => !option.disabled),
    );
    setPresent(true);
    setOpen(true);
  }
  function close(restore = false) {
    setOpen(false);
    if (restore) trigger.current?.focus();
  }
  useEffect(() => {
    if (!canOpen) setOpen(false);
  }, [canOpen]);
  useEffect(() => {
    if (!open) {
      if (reduced) {
        setPresent(false);
        return;
      }
      const timer = setTimeout(() => setPresent(false), 150);
      return () => clearTimeout(timer);
    }
  }, [open, reduced]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        close();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useLayoutEffect(() => {
    if (!present || !popup.current || !trigger.current) return;
    const node = popup.current;
    const place = () => {
      const anchor = trigger.current?.getBoundingClientRect();
      if (!anchor) return;
      const box = { width: node.offsetWidth, height: node.offsetHeight };
      const below = anchor.bottom + box.height + 4 <= window.innerHeight - 8;
      setPosition({
        left: Math.max(
          8,
          Math.min(window.innerWidth - box.width - 8, anchor.right - box.width),
        ),
        top: below
          ? anchor.bottom + 4
          : Math.max(8, anchor.top - box.height - 4),
        side: below ? "bottom" : "top",
      });
    };
    if (!node.matches(":popover-open")) node.showPopover();
    place();
    const observer = new ResizeObserver(place);
    observer.observe(node);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      if (node.matches(":popover-open")) node.hidePopover();
    };
  }, [present]);
  useLayoutEffect(() => {
    if (!open) return;
    const option = root.current?.querySelector<HTMLElement>(
      `[data-option-index="${activeIndex}"]`,
    );
    if (option) popupScroll.current?.ensureVisible(option);
  }, [activeIndex, open, options]);
  function move(delta: number) {
    setKeyboardActive(true);
    let next = activeIndex;
    for (let index = 0; index < options.length; index++) {
      next = (next + delta + options.length) % options.length;
      if (!options[next]?.disabled) {
        setActive(next);
        return;
      }
    }
  }
  function choose(index: number) {
    const option = options[index];
    if (!canOpen || !option || option.disabled) return;
    onValueChange(option.value);
    close(true);
  }
  const listbox = (
    <div role="listbox" id={popupId} aria-label={label}>
      {options.map((option, index) => {
        const item: SelectOptionRenderProps = {
          option,
          id: `${popupId}-${index}`,
          index,
          selected: option.value === value,
          active: keyboardActive && index === activeIndex,
          onPointerMove: () => {
            setKeyboardActive(false);
            if (!option.disabled) setActive(index);
          },
          onPointerDown: (event) => event.preventDefault(),
          onSelect: () => choose(index),
        };
        return (
          <div key={option.value}>
            {renderOption ? (
              renderOption(item)
            ) : (
              <div
                role="option"
                className="common-select-option"
                id={item.id}
                aria-selected={item.selected}
                aria-disabled={option.disabled || undefined}
                data-option-index={index}
                data-active={item.active}
                onPointerMove={item.onPointerMove}
                onPointerDown={item.onPointerDown}
                onClick={item.onSelect}
              >
                {option.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
  const scrollProps: ComponentProps<typeof ScrollArea> = {
    ref: popupScroll,
    maxHeight: 220,
    label: `${label} 선택 목록`,
    children: listbox,
  };
  return (
    <div
      ref={root}
      className={`common-select ${className}`}
      data-disabled={disabled}
      data-readonly={readOnly}
      data-invalid={invalid}
      onKeyDown={(event) => {
        if (!canOpen) return;
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          close(true);
        } else if (event.key === "Tab") close();
        else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          if (!open) show(true);
          else move(event.key === "ArrowDown" ? 1 : -1);
        } else if ((event.key === "Home" || event.key === "End") && open) {
          event.preventDefault();
          setKeyboardActive(true);
          const choices = options
            .map((o, i) => ({ o, i }))
            .filter(({ o }) => !o.disabled);
          setActive(
            (event.key === "Home" ? choices[0] : choices.at(-1))?.i ?? 0,
          );
        } else if ((event.key === "Enter" || event.key === " ") && open) {
          event.preventDefault();
          choose(activeIndex);
        }
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        ref={trigger}
        id={id}
        type="button"
        className="common-select-trigger"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={present ? popupId : undefined}
        aria-activedescendant={
          open && keyboardActive
            ? activeIndex >= 0
              ? `${popupId}-${activeIndex}`
              : undefined
            : undefined
        }
        aria-readonly={readOnly || undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={(event) => (open ? close() : show(event.detail === 0))}
      >
        {triggerContent ?? (
          <>
            <span>{selected?.label || "선택하세요"}</span>
            <span aria-hidden="true">⌄</span>
          </>
        )}
      </button>
      <select
        hidden
        className="common-select-native"
        tabIndex={-1}
        aria-hidden="true"
        value={value}
        name={name}
        disabled={disabled}
        required={required && !readOnly}
        onChange={(event) => {
          if (canOpen) onValueChange(event.target.value);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          trigger.current?.focus();
        }}
      >
        <option value="" />
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {present && (
        <div
          ref={popup}
          popover="manual"
          className={`common-select-popup ${popupClassName}`}
          style={{ left: position.left, top: position.top }}
          data-open={open}
          data-state={open ? "open" : "closed"}
          data-side={position.side}
          data-custom-popup={Boolean(popupClassName)}
          inert={!open}
          aria-hidden={!open || undefined}
        >
          {renderScrollArea ? (
            renderScrollArea(scrollProps)
          ) : (
            <ScrollArea {...scrollProps} />
          )}
        </div>
      )}
    </div>
  );
}
