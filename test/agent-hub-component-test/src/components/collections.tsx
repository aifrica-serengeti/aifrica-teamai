import {
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  Ref,
  RefObject,
  PointerEventHandler,
} from "react";
import { createPortal } from "react-dom";
import {
  AgentHubButton,
  AgentHubIconButton,
  AgentHubSearch,
  AgentHubAgentTypeChip,
  AgentHubScrollbar,
  FileIcon,
  Icon,
} from "./primitives";
import type { ScrollAreaHandle } from "./primitives";
import { AnimatedDisclosure } from "./common/Disclosure";
import "./collections.css";

// Public props are local consumption adapters. Figma roots do not define these app APIs.
const asset = (path: string) => `/agent-hub/assets/${path}`;
function Picture({
  path,
  size = 16,
  className = "",
}: {
  path: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={asset(path)}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
type PopupSide = "top" | "bottom" | "left" | "right";
type PopupPosition = { style: CSSProperties; side: PopupSide };
function usePopupPosition(
  anchor: RefObject<HTMLElement | null>,
  surface: RefObject<HTMLElement | null>,
  active: boolean,
  side: PopupSide,
) {
  const [position, setPosition] = useState<PopupPosition>({
    style: { visibility: "hidden" },
    side,
  });
  useLayoutEffect(() => {
    if (!active) return;
    const update = () => {
      const trigger = anchor.current;
      const content = surface.current;
      if (!trigger || !content) return;
      const a = trigger.getBoundingClientRect();
      const b = content.getBoundingClientRect();
      const gap = 6;
      const margin = 8;
      let actualSide = side;
      if (
        side === "bottom" &&
        a.bottom + gap + b.height > innerHeight - margin &&
        a.top > b.height + gap
      )
        actualSide = "top";
      if (
        side === "top" &&
        a.top - gap - b.height < margin &&
        innerHeight - a.bottom > b.height + gap
      )
        actualSide = "bottom";
      if (
        side === "right" &&
        a.right + gap + b.width > innerWidth - margin &&
        a.left > b.width + gap
      )
        actualSide = "left";
      if (
        side === "left" &&
        a.left - gap - b.width < margin &&
        innerWidth - a.right > b.width + gap
      )
        actualSide = "right";
      let left = a.left;
      let top = a.bottom + gap;
      if (actualSide === "top") top = a.top - b.height - gap;
      if (actualSide === "left") {
        left = a.left - b.width - gap;
        top = a.top;
      }
      if (actualSide === "right") {
        left = a.right + gap;
        top = a.top;
      }
      left = Math.max(margin, Math.min(left, innerWidth - b.width - margin));
      top = Math.max(margin, Math.min(top, innerHeight - b.height - margin));
      setPosition({
        side: actualSide,
        style: {
          position: "fixed",
          top,
          left,
          zIndex: 1000,
          maxWidth: "calc(100vw - 16px)",
          maxHeight: "calc(100dvh - 16px)",
        },
      });
    };
    update();
    const resize = new ResizeObserver(update);
    if (surface.current) resize.observe(surface.current);
    if (anchor.current) resize.observe(anchor.current);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [active, anchor, surface, side]);
  return position;
}
function useOutsideDismiss(
  open: boolean,
  anchor: RefObject<HTMLElement | null>,
  surface: RefObject<HTMLElement | null>,
  dismiss: () => void,
) {
  const onDismiss = useEffectEvent(dismiss);
  useEffect(() => {
    if (!open) return;
    const handle = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !anchor.current?.contains(target) &&
        !surface.current?.contains(target)
      )
        onDismiss();
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open, anchor, surface]);
}
function focusVisibleButton(root: HTMLElement | null, last = false) {
  const buttons = root?.querySelectorAll<HTMLButtonElement>(
    "button[data-focus-item]:not(:disabled)",
  );
  (last ? buttons?.[buttons.length - 1] : buttons?.[0])?.focus();
}

const dayKey = (value: Date) =>
  `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
const sameDate = (first: Date | null, second: Date | null) =>
  !!first && !!second && dayKey(first) === dayKey(second);
const monthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
export type AgentHubCalendarDateProps = {
  date?: Date;
  selected?: boolean;
  today?: boolean;
  disabled?: boolean;
  label?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onChoose?: (date: Date) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
};
export function AgentHubCalendarDate({
  date,
  selected = false,
  today = false,
  disabled = false,
  label,
  buttonRef,
  onChoose,
  onKeyDown,
}: AgentHubCalendarDateProps) {
  return (
    <div
      role="gridcell"
      aria-selected={date ? selected : undefined}
      className="ah-calendar-cell"
      data-component="AgentHubCalendarDate"
    >
      {date && (
        <button
          ref={buttonRef}
          type="button"
          className="ah-calendar-date"
          data-selected={selected || undefined}
          data-today={today || undefined}
          disabled={disabled}
          aria-label={
            label ??
            date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })
          }
          aria-current={today ? "date" : undefined}
          data-date-key={dayKey(date)}
          onClick={() => {
            if (!disabled) onChoose?.(date);
          }}
          onKeyDown={onKeyDown}
        >
          <span className="ah-calendar-selection" />
          <span className="ah-calendar-day">{date.getDate()}</span>
          {today && !selected && <span className="ah-calendar-today-dot" />}
        </button>
      )}
    </div>
  );
}
export type AgentHubCalendarProps = {
  value: Date | null;
  onConfirm: (value: Date) => void;
  onCancel: () => void;
  initialMonth?: Date;
  today?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1;
  disabledDate?: (date: Date) => boolean;
};
export function AgentHubCalendar({
  value,
  onConfirm,
  onCancel,
  initialMonth,
  today = new Date(),
  locale = "ko-KR",
  weekStartsOn = 0,
  disabledDate,
}: AgentHubCalendarProps) {
  const [cursor, setCursor] = useState(() =>
    monthStart(initialMonth ?? value ?? today),
  );
  const valueKey = value ? dayKey(value) : "";
  const [selection, setSelection] = useState<{
    confirmedKey: string;
    draft: Date | null;
  }>(() => ({ confirmedKey: valueKey, draft: value }));
  // Reset only this local draft when the external confirmed date changes. This also
  // handles A → B → A without resurrecting the earlier unconfirmed A draft.
  if (selection.confirmedKey !== valueKey) {
    setSelection({ confirmedKey: valueKey, draft: value });
  }
  const draft = selection.confirmedKey === valueKey ? selection.draft : value;
  const setDraft = (next: Date | null) =>
    setSelection({ confirmedKey: valueKey, draft: next });
  const [view, setView] = useState<"day" | "month" | "year">("day");
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useLayoutEffect(() => {
    if (focusKey) {
      grid.current
        ?.querySelector<HTMLButtonElement>(`[data-date-key="${focusKey}"]`)
        ?.focus();
      setFocusKey(null);
    }
  }, [focusKey, cursor]);
  const start = (cursor.getDay() - weekStartsOn + 7) % 7;
  const count = new Date(
    cursor.getFullYear(),
    cursor.getMonth() + 1,
    0,
  ).getDate();
  const weeks = Math.ceil((start + count) / 7);
  const monthLabel = cursor.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
  });
  const move = (amount: number) =>
    setCursor(
      new Date(
        cursor.getFullYear() +
          (view === "year" ? amount * 12 : view === "month" ? amount : 0),
        cursor.getMonth() + (view === "day" ? amount : 0),
        1,
      ),
    );
  const navigateDay = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    let target = new Date(date);
    const direction =
      getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1;
    if (event.key === "ArrowLeft") target.setDate(target.getDate() - direction);
    else if (event.key === "ArrowRight")
      target.setDate(target.getDate() + direction);
    else if (event.key === "ArrowUp") target.setDate(target.getDate() - 7);
    else if (event.key === "ArrowDown") target.setDate(target.getDate() + 7);
    else if (event.key === "Home")
      target.setDate(
        target.getDate() - ((target.getDay() - weekStartsOn + 7) % 7),
      );
    else if (event.key === "End")
      target.setDate(
        target.getDate() + 6 - ((target.getDay() - weekStartsOn + 7) % 7),
      );
    else if (event.key === "PageUp" || event.key === "PageDown") {
      const monthOffset = event.key === "PageDown" ? 1 : -1;
      const destination = new Date(
        date.getFullYear(),
        date.getMonth() + monthOffset + 1,
        0,
      );
      target = new Date(
        destination.getFullYear(),
        destination.getMonth(),
        Math.min(date.getDate(), destination.getDate()),
      );
    } else return;
    event.preventDefault();
    // Disabled dates are real dates. Search in the navigation direction; never make them empty slots.
    const step = target >= date ? 1 : -1;
    let attempts = 0;
    while (disabledDate?.(target) && attempts++ < 366)
      target.setDate(target.getDate() + step);
    if (disabledDate?.(target)) return;
    setCursor(monthStart(target));
    setFocusKey(dayKey(target));
  };
  const yearBase = Math.floor(cursor.getFullYear() / 12) * 12;
  return (
    <section
      className="ah-calendar"
      aria-label="날짜 선택"
      data-component="AgentHubCalendar"
    >
      <header className="ah-calendar-header">
        <button
          type="button"
          className="ah-calendar-month-toggle"
          aria-label={`${view === "year" ? `${yearBase}–${yearBase + 11}` : monthLabel} — 보기 전환`}
          onClick={() =>
            setView(
              view === "day" ? "month" : view === "month" ? "year" : "day",
            )
          }
        >
          <span id={titleId}>
            {view === "year"
              ? `${yearBase}–${yearBase + 11}`
              : view === "month"
                ? `${cursor.getFullYear()}년`
                : monthLabel}
          </span>
          <Icon name="chevron-down" size={16} />
        </button>
        <span className="ah-calendar-navigation">
          <AgentHubIconButton
            icon="chevron-left"
            label="이전"
            size={32}
            onClick={() => move(-1)}
          />
          <AgentHubIconButton
            icon="chevron-right"
            label="다음"
            size={32}
            onClick={() => move(1)}
          />
        </span>
      </header>
      <div className="ah-calendar-divider" />
      {view === "day" ? (
        <div role="grid" aria-labelledby={titleId} ref={grid}>
          <div role="row" className="ah-calendar-weekdays">
            {Array.from({ length: 7 }, (_, index) => (
              <span role="columnheader" key={index}>
                {new Date(
                  2026,
                  0,
                  4 + ((index + weekStartsOn) % 7),
                ).toLocaleDateString(locale, { weekday: "short" })}
              </span>
            ))}
          </div>
          <div role="rowgroup" className="ah-calendar-days">
            {Array.from({ length: weeks }, (_, week) => (
              <div role="row" className="ah-calendar-week" key={week}>
                {Array.from({ length: 7 }, (_, weekday) => {
                  const day = week * 7 + weekday - start + 1;
                  const date =
                    day > 0 && day <= count
                      ? new Date(cursor.getFullYear(), cursor.getMonth(), day)
                      : undefined;
                  return (
                    <AgentHubCalendarDate
                      key={weekday}
                      date={date}
                      selected={sameDate(date ?? null, draft)}
                      today={sameDate(date ?? null, today)}
                      disabled={date ? disabledDate?.(date) : false}
                      onChoose={setDraft}
                      onKeyDown={
                        date ? (event) => navigateDay(event, date) : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="ah-calendar-view-adapter"
          aria-label={
            view === "month"
              ? "월 선택 (공용 계약 어댑터)"
              : "연도 선택 (공용 계약 어댑터)"
          }
        >
          {Array.from({ length: 12 }, (_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setCursor(
                  new Date(
                    view === "year" ? yearBase + index : cursor.getFullYear(),
                    view === "month" ? index : cursor.getMonth(),
                    1,
                  ),
                );
                setView(view === "year" ? "month" : "day");
              }}
            >
              {view === "year"
                ? `${yearBase + index}년`
                : new Date(cursor.getFullYear(), index, 1).toLocaleDateString(
                    locale,
                    { month: "short" },
                  )}
            </button>
          ))}
        </div>
      )}
      <footer className="ah-calendar-footer">
        <AgentHubButton
          variant="tertiary"
          size={32}
          onClick={() => {
            setDraft(value);
            onCancel();
          }}
        >
          취소
        </AgentHubButton>
        <AgentHubButton
          variant="primary"
          size={32}
          disabled={!draft || !!disabledDate?.(draft)}
          onClick={() => {
            if (draft && !disabledDate?.(draft)) onConfirm(draft);
          }}
        >
          선택
        </AgentHubButton>
      </footer>
    </section>
  );
}

export type AgentHubMenuEntry = {
  id: string;
  label: string;
  intent?: "default" | "destructive";
  disabled?: boolean;
  sectionLabel?: string;
  dividerAfter?: boolean;
  showIcon?: boolean;
  valueText?: string;
  showCheck?: boolean;
  onSelect: () => void;
};
export type AgentHubMenuItemProps = Omit<AgentHubMenuEntry, "onSelect"> & {
  onSelect: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
  tabIndex?: number;
  onFocus?: () => void;
  role?: "menuitem" | "option";
  selected?: boolean;
  active?: boolean;
  optionIndex?: number;
  onPointerMove?: PointerEventHandler<HTMLButtonElement>;
  onPointerDown?: PointerEventHandler<HTMLButtonElement>;
};
export function AgentHubMenuItem({
  label,
  id,
  intent = "default",
  disabled = false,
  sectionLabel,
  dividerAfter,
  showIcon = false,
  valueText,
  showCheck = false,
  onSelect,
  buttonRef,
  tabIndex = -1,
  onFocus,
  role = "menuitem",
  selected,
  active,
  optionIndex,
  onPointerMove,
  onPointerDown,
}: AgentHubMenuItemProps) {
  const sectionId = useId();
  const tone = disabled
    ? "disabled"
    : intent === "destructive"
      ? "destructive"
      : "default";
  return (
    <div
      role={role === "option" ? undefined : "group"}
      aria-labelledby={sectionLabel ? sectionId : undefined}
      className="ah-menu-item-group"
      data-component="AgentHubMenuItem"
    >
      {sectionLabel && (
        <div id={sectionId} className="ah-menu-item-header">
          {sectionLabel}
        </div>
      )}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role={role}
        aria-selected={role === "option" ? selected : undefined}
        aria-disabled={disabled || undefined}
        className="ah-menu-item"
        data-intent={intent}
        disabled={disabled}
        tabIndex={tabIndex}
        data-focus-item
        data-option-index={optionIndex}
        data-active={active}
        onFocus={onFocus}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onClick={() => {
          if (!disabled) onSelect();
        }}
      >
        {showIcon && <Picture path={`menu/${tone}-edit-16.svg`} />}
        <span className="ah-menu-item-label">{label}</span>
        {valueText && <span className="ah-menu-item-value">{valueText}</span>}
        {role === "option" ? (
          <span className="ah-menu-item-check-slot" aria-hidden="true">
            {showCheck && <Picture path={`menu/${tone}-check-16.svg`} />}
          </span>
        ) : (
          showCheck && <Picture path={`menu/${tone}-check-16.svg`} />
        )}
      </button>
      {dividerAfter && (
        <div role="separator" className="ah-menu-item-divider">
          <span />
        </div>
      )}
    </div>
  );
}
export type AgentHubMenuProps = {
  label: string;
  entries: readonly AgentHubMenuEntry[];
  width?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: PopupSide;
};
export function AgentHubMenu({
  label,
  entries,
  width = 184,
  open: controlledOpen,
  onOpenChange,
  side = "bottom",
}: AgentHubMenuProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = controlledOpen ?? localOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setLocalOpen(next);
    onOpenChange?.(next);
  };
  const trigger = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const present = useAnimatedPresence(open, surface);
  const [activeId, setActiveId] = useState<string | null>(null);
  const focusLast = useRef(false);
  const menuId = useId();
  const position = usePopupPosition(trigger, surface, present, side);
  const close = (restore = true) => {
    setOpen(false);
    if (restore) trigger.current?.focus();
  };
  useOutsideDismiss(open, trigger, surface, () => close(false));
  useLayoutEffect(() => {
    if (!open || !present) return;
    const id = requestAnimationFrame(() =>
      focusVisibleButton(surface.current, focusLast.current),
    );
    return () => cancelAnimationFrame(id);
  }, [open, present]);
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    const buttons = Array.from(
      surface.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]:not(:disabled)',
      ) ?? [],
    );
    const current = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    let index = current;
    if (event.key === "ArrowDown") index = (current + 1) % buttons.length;
    else if (event.key === "ArrowUp")
      index = (current - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = buttons.length - 1;
    else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close();
      return;
    } else if (event.key === "Tab") {
      event.preventDefault();
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          "a[href],button,input,select,textarea,[tabindex]",
        ),
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.closest("[inert]") &&
          !surface.current?.contains(element) &&
          !element.matches(":disabled") &&
          element.getClientRects().length > 0,
      );
      const triggerIndex = focusable.indexOf(trigger.current!);
      const target =
        focusable[triggerIndex + (event.shiftKey ? -1 : 1)] ?? trigger.current;
      close(false);
      target?.focus();
      return;
    } else if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey &&
      event.key !== " "
    ) {
      const match =
        buttons.find(
          (button, candidate) =>
            candidate > current &&
            button.textContent
              ?.trim()
              .toLocaleLowerCase()
              .startsWith(event.key.toLocaleLowerCase()),
        ) ??
        buttons.find((button) =>
          button.textContent
            ?.trim()
            .toLocaleLowerCase()
            .startsWith(event.key.toLocaleLowerCase()),
        );
      if (match) {
        event.preventDefault();
        match.focus();
      }
      return;
    } else return;
    event.preventDefault();
    buttons[index]?.focus();
  };
  return (
    <span className="ah-popup-trigger-host" data-component="AgentHubMenu">
      <button
        ref={trigger}
        className="ah-collection-trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          focusLast.current = false;
          setOpen(!open);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            focusLast.current = event.key === "ArrowUp";
            setOpen(true);
          }
        }}
      >
        {label}
        <Icon name="chevron-down" size={16} />
      </button>
      {present &&
        createPortal(
          <div
            ref={surface}
            id={menuId}
            role="menu"
            aria-label={label}
            aria-hidden={!open || undefined}
            inert={!open}
            className="ah-menu ah-popup-motion"
            style={{ ...position.style, width }}
            data-state={open ? "open" : "closed"}
            data-side={position.side}
            onKeyDown={keys}
          >
            {entries.map((entry) => (
              <AgentHubMenuItem
                {...entry}
                key={entry.id}
                id={`${menuId}-${entry.id}`}
                tabIndex={entry.id === activeId ? 0 : -1}
                onFocus={() => {
                  setActiveId(entry.id);
                  document.activeElement?.scrollIntoView({ block: "nearest" });
                }}
                onSelect={() => {
                  if (open && !entry.disabled) {
                    entry.onSelect();
                    close();
                  }
                }}
              />
            ))}
          </div>,
          document.body,
        )}
    </span>
  );
}

export type AgentHubPickerItemProps = {
  id: string;
  title: string;
  kind: "agent" | "chat";
  agentType?: "assistant" | "workflow" | "runtime";
  meta?: string;
  model?: { label: string; imageUrl: string; onActivate?: () => void };
  disabled?: boolean;
  onChoose: (id: string) => void;
};
export function AgentHubPickerItem({
  id,
  title,
  kind,
  agentType = "assistant",
  meta,
  model,
  disabled = false,
  onChoose,
}: AgentHubPickerItemProps) {
  return (
    <div
      className="ah-picker-item"
      data-kind={kind}
      data-custom={agentType !== "assistant" || undefined}
      data-disabled={disabled || undefined}
      data-component="AgentHubPickerItem"
    >
      <button
        type="button"
        className="ah-picker-main"
        data-picker-main
        data-focus-item
        data-target-id={id}
        aria-label={title}
        disabled={disabled}
        onClick={() => {
          if (!disabled) onChoose(id);
        }}
      >
        <AgentHubAgentTypeChip
          type={kind === "chat" ? "common-chat" : agentType}
        />
        <span className="ah-picker-item-title">{title}</span>
      </button>
      {kind === "agent" && meta && (
        <span className="ah-picker-item-meta">{meta}</span>
      )}
      {kind === "chat" &&
        model &&
        (model.onActivate ? (
          <button
            className="ah-picker-model"
            type="button"
            disabled={disabled}
            aria-label={`모델 선택, ${model.label}`}
            onClick={model.onActivate}
          >
            <img src={model.imageUrl} width={20} height={20} alt="" />
            <span>{model.label}</span>
            <Picture path="picker/model-chevron-down-16.svg" />
          </button>
        ) : (
          <span className="ah-picker-model">
            <img src={model.imageUrl} width={20} height={20} alt="" />
            <span>{model.label}</span>
            <Picture path="picker/model-chevron-down-16.svg" />
          </span>
        ))}
    </div>
  );
}
export type PickerFooterAction = { label: string } & (
  | { href: string; onActivate?: never }
  | { href?: never; onActivate: () => void }
);
export function AgentHubPickerFooter({
  action,
  hintsId,
}: {
  action?: PickerFooterAction;
  hintsId?: string;
}) {
  return (
    <footer className="ah-picker-footer" data-component="AgentHubPickerFooter">
      <div className="ah-picker-footer-content">
        <span className="ah-picker-hints" id={hintsId}>
          <span>
            <span className="ah-picker-key-group">
              <kbd>↑</kbd>
              <kbd>↓</kbd>
            </span>
            이동
          </span>
          <span aria-hidden="true" className="ah-picker-hint-divider" />
          <span>
            <kbd>↵</kbd>선택
          </span>
        </span>
        {action &&
          (action.href ? (
            <a className="ah-picker-footer-action" href={action.href}>
              {action.label}
              <Picture path="picker/footer-chevron-right-16.svg" />
            </a>
          ) : (
            <button
              type="button"
              className="ah-picker-footer-action"
              onClick={action.onActivate}
            >
              {action.label}
              <Picture path="picker/footer-chevron-right-16.svg" />
            </button>
          ))}
      </div>
    </footer>
  );
}
export type PickerEntry = {
  id: string;
  title: string;
  kind: "agent" | "chat" | "project";
  agentType?: "assistant" | "workflow" | "runtime";
  meta?: string;
  disabled?: boolean;
  onMore?: () => void;
};
export type PickerGroup = {
  id: string;
  label: string;
  entries: readonly PickerEntry[];
};
export type AgentHubPickerProps = {
  recipe: "agent-recommendations" | "project-chat-search";
  groups: readonly PickerGroup[];
  label: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChoose: (target: { id: string; kind: PickerEntry["kind"] }) => void;
  query?: string;
  onQueryChange?: (value: string) => void;
  onFilter?: () => void;
  filtered?: boolean;
  chatEntry?: PickerEntry;
  model?: AgentHubPickerItemProps["model"];
  footerAction?: PickerFooterAction;
  returnFocusRef?: RefObject<HTMLElement | null>;
  height?: number;
};
export function AgentHubPicker({
  recipe,
  groups,
  label,
  open = true,
  onOpenChange,
  onChoose,
  query = "",
  onQueryChange,
  onFilter,
  filtered = false,
  chatEntry,
  model,
  footerAction,
  returnFocusRef,
  height,
}: AgentHubPickerProps) {
  const root = useRef<HTMLElement>(null);
  const listScroll = useRef<ScrollAreaHandle>(null);
  const hintsId = useId();
  const labelId = useId();
  const visibleGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          entries: group.entries.filter((entry) =>
            entry.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
          ),
        }))
        .filter((group) => group.entries.length),
    [groups, query],
  );
  const entries = visibleGroups.flatMap((group) => group.entries);
  const choose = (entry: PickerEntry) => {
    if (open && !entry.disabled) onChoose({ id: entry.id, kind: entry.kind });
  };
  if (!open) return null;
  const keyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onOpenChange?.(false);
      returnFocusRef?.current?.focus();
      return;
    }
    const buttons = Array.from(
      root.current?.querySelectorAll<HTMLButtonElement>(
        "[data-picker-main]:not(:disabled)",
      ) ?? [],
    );
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    const input = event.target instanceof HTMLInputElement;
    if (
      (input || index >= 0) &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      event.preventDefault();
      const next =
        index < 0
          ? event.key === "ArrowDown"
            ? 0
            : buttons.length - 1
          : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
            buttons.length;
      const target = buttons[next];
      target?.focus({ preventScroll: true });
      if (target) listScroll.current?.ensureVisible(target);
    }
    if (index >= 0 && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      const target = event.key === "Home" ? buttons[0] : buttons.at(-1);
      target?.focus({ preventScroll: true });
      if (target) listScroll.current?.ensureVisible(target);
    }
  };
  return (
    <section
      ref={root}
      className="ah-picker"
      data-recipe={recipe}
      data-component="AgentHubPicker"
      style={{
        height: height ?? (recipe === "agent-recommendations" ? 455 : 536),
      }}
      aria-labelledby={labelId}
      aria-describedby={hintsId}
      onKeyDown={keyDown}
    >
      <h3 className="ah-visually-hidden" id={labelId}>
        {label}
      </h3>
      <div className="ah-picker-body">
        {recipe === "agent-recommendations" && chatEntry && (
          <div className="ah-picker-top-row">
            <AgentHubPickerItem
              {...chatEntry}
              kind="chat"
              model={model}
              onChoose={() => choose(chatEntry)}
            />
          </div>
        )}
        {recipe === "project-chat-search" && (
          <div className="ah-picker-search">
            <AgentHubSearch
              label="프로젝트와 채팅 검색"
              value={query}
              onValueChange={onQueryChange}
              readOnly={!onQueryChange}
              size={32}
              filtered={filtered}
              onFilter={onFilter}
            />
          </div>
        )}
        <div className="ah-picker-section-strip" />
        {recipe === "agent-recommendations" && (
          <h4
            className="ah-picker-recommended-title"
            id={`${labelId}-recommended`}
          >
            {visibleGroups[0]?.label ?? "추천 에이전트"}
          </h4>
        )}
        <AgentHubScrollbar
          ref={listScroll}
          height="100%"
          label={`${label} 목록`}
          className="ah-picker-list-scroll"
          viewportClassName="ah-picker-list-viewport"
          contentClassName="ah-picker-list-content"
          contentStyle={{ padding: "0 4px 20px" }}
        >
          <div className="ah-picker-groups">
            {visibleGroups.map((group, groupIndex) => (
              <section
                key={group.id}
                aria-labelledby={
                  recipe === "agent-recommendations" && groupIndex === 0
                    ? `${labelId}-recommended`
                    : `${labelId}-${group.id}`
                }
                className="ah-picker-group"
              >
                {(recipe !== "agent-recommendations" || groupIndex > 0) && (
                  <h4 id={`${labelId}-${group.id}`}>{group.label}</h4>
                )}
                <div className="ah-picker-group-items">
                  {group.entries.map((entry) =>
                    recipe === "agent-recommendations" ? (
                      <AgentHubPickerItem
                        {...entry}
                        key={entry.id}
                        kind={entry.kind === "chat" ? "chat" : "agent"}
                        model={entry.kind === "chat" ? model : undefined}
                        onChoose={() => choose(entry)}
                      />
                    ) : (
                      <div
                        className="ah-picker-navigation-row"
                        key={entry.id}
                        data-disabled={entry.disabled || undefined}
                      >
                        <button
                          type="button"
                          className="ah-picker-navigation-main"
                          data-picker-main
                          data-focus-item
                          data-target-id={entry.id}
                          disabled={entry.disabled}
                          onClick={() => choose(entry)}
                        >
                          <Icon
                            name={entry.kind === "project" ? "folder" : "chat"}
                            size={16}
                          />
                          <span>{entry.title}</span>
                        </button>
                        {entry.onMore && (
                          <button
                            type="button"
                            className="ah-picker-navigation-more"
                            disabled={entry.disabled}
                            aria-label={`${entry.title} 더보기`}
                            onClick={entry.onMore}
                          >
                            <Picture path="picker/more-subtler-16.svg" />
                          </button>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </section>
            ))}
            {!entries.length && (
              <p className="ah-collection-empty" role="status">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        </AgentHubScrollbar>
      </div>
      <AgentHubPickerFooter
        hintsId={hintsId}
        action={recipe === "agent-recommendations" ? footerAction : undefined}
      />
    </section>
  );
}

export function AgentHubFlyoutHeader({
  title,
  count,
  meta,
  titleId,
  metaId,
  withDivider = false,
}: {
  title: string;
  count: string;
  meta: string;
  titleId?: string;
  metaId?: string;
  withDivider?: boolean;
}) {
  return (
    <header
      className="ah-flyout-header"
      data-component="AgentHubFlyoutHeader"
      data-divider={withDivider || undefined}
    >
      <div>
        <span className="ah-flyout-title" id={titleId}>
          {title}
        </span>
        <span className="ah-flyout-count">{count}</span>
      </div>
      <p id={metaId}>{meta}</p>
    </header>
  );
}
export function AgentHubFlyoutFooter({
  meta,
  inShell = false,
  id,
}: {
  meta: string;
  inShell?: boolean;
  id?: string;
}) {
  return (
    <footer
      id={id}
      className="ah-flyout-footer"
      data-in-shell={inShell || undefined}
      data-component="AgentHubFlyoutFooter"
    >
      {meta}
    </footer>
  );
}
export type FlyoutEntry = {
  id: string;
  label: string;
  disabled?: boolean;
  children?: readonly FlyoutEntry[];
  countText?: string;
  metaText?: string;
};
export type AgentHubFlyoutItemProps = Pick<
  FlyoutEntry,
  "id" | "label" | "disabled"
> & {
  kind?: "item" | "folder" | "folder-open" | "child";
  countText?: string;
  metaText?: string;
  showMeta?: boolean;
  selected?: boolean;
  expanded?: boolean;
  controlsId?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onActivate?: (id: string) => void;
};
export function AgentHubFlyoutItem({
  id,
  label,
  kind = "item",
  countText,
  metaText,
  showMeta = true,
  disabled = false,
  selected = false,
  expanded,
  controlsId,
  buttonRef,
  onActivate,
}: AgentHubFlyoutItemProps) {
  const content = (
    <>
      {(kind === "folder" || kind === "folder-open") &&
        (expanded !== undefined ? (
          <span
            className="ah-flyout-disclosure-chevron"
            data-expanded={expanded}
            aria-hidden="true"
          >
            <Picture path="flyout/chevron-down-16.svg" />
          </span>
        ) : (
          <Picture
            path={`flyout/chevron-${kind === "folder-open" ? "down" : "right"}-16.svg`}
          />
        ))}
      {kind !== "child" && <Picture path="flyout/file-text-16.svg" />}
      <span className="ah-flyout-item-label">{label}</span>
      {(kind === "folder" || kind === "folder-open") && (
        <span className="ah-flyout-item-count">{countText}</span>
      )}
      {kind === "child" && showMeta && metaText && (
        <span className="ah-flyout-item-meta">{metaText}</span>
      )}
    </>
  );
  const attributes = {
    className: "ah-flyout-item",
    "data-component": "AgentHubFlyoutItem",
    "data-kind": kind,
    "data-selected":
      ((kind === "item" || kind === "child") && selected) || undefined,
    "data-disabled": disabled || undefined,
  };
  // Static kind samples remain usable; a disclosure owner explicitly supplies
  // expanded/controls and the native folder action for a hierarchical recipe.
  return onActivate ? (
    <button
      {...attributes}
      ref={buttonRef}
      type="button"
      data-focus-item
      disabled={disabled}
      aria-label={label}
      aria-pressed={kind === "item" || kind === "child" ? selected : undefined}
      aria-expanded={expanded}
      aria-controls={controlsId}
      onClick={() => {
        if (!disabled) onActivate(id);
      }}
    >
      {content}
    </button>
  ) : (
    <div {...attributes}>{content}</div>
  );
}
type FlyoutDisclosure = {
  expandedIds: readonly string[];
  onExpandedChange: (ids: string[]) => void;
};
function FlyoutBranch({
  entry,
  depth = 0,
  disclosure,
  panelOpen,
  selectedId,
  onSelect,
  ancestorDisabled = false,
}: {
  entry: FlyoutEntry;
  depth?: number;
  disclosure?: FlyoutDisclosure;
  panelOpen: boolean;
  selectedId?: string;
  onSelect: (id: string) => void;
  ancestorDisabled?: boolean;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const groupId = useId();
  const folder = entry.children !== undefined;
  const expanded = folder && !!disclosure?.expandedIds.includes(entry.id);
  const disabled = !!(
    ancestorDisabled ||
    entry.disabled ||
    (folder && !disclosure)
  );
  return (
    <li
      className="ah-flyout-branch"
      data-depth={depth}
      style={{ "--ah-flyout-depth": depth } as CSSProperties}
    >
      <AgentHubFlyoutItem
        id={entry.id}
        label={entry.label}
        kind={
          folder
            ? expanded
              ? "folder-open"
              : "folder"
            : depth
              ? "child"
              : "item"
        }
        countText={
          folder
            ? (entry.countText ?? String(entry.children?.length ?? 0))
            : undefined
        }
        metaText={entry.metaText}
        selected={!folder && selectedId === entry.id}
        expanded={folder ? expanded : undefined}
        controlsId={folder ? groupId : undefined}
        buttonRef={trigger}
        disabled={disabled}
        onActivate={() => {
          if (!panelOpen || disabled) return;
          if (folder && disclosure) {
            disclosure.onExpandedChange(
              expanded
                ? disclosure.expandedIds.filter((id) => id !== entry.id)
                : [...disclosure.expandedIds, entry.id],
            );
          } else onSelect(entry.id);
        }}
      />
      {folder && (
        <AnimatedDisclosure id={groupId} open={expanded} triggerRef={trigger}>
          <ul aria-label={`${entry.label} 파일`}>
            {entry.children?.map((child) => (
              <FlyoutBranch
                key={child.id}
                entry={child}
                depth={depth + 1}
                disclosure={disclosure}
                panelOpen={panelOpen}
                selectedId={selectedId}
                onSelect={onSelect}
                ancestorDisabled={disabled}
              />
            ))}
          </ul>
        </AnimatedDisclosure>
      )}
    </li>
  );
}
function useAnimatedPresence(
  open: boolean,
  surface: RefObject<HTMLElement | null>,
) {
  const [present, setPresent] = useState(open);
  useLayoutEffect(() => {
    if (open) setPresent(true);
  }, [open]);
  useEffect(() => {
    if (open || !present) return;
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPresent(false);
        return;
      }
      const animations = surface.current?.getAnimations() ?? [];
      if (!animations.length) {
        setPresent(false);
        return;
      }
      void Promise.allSettled(
        animations.map((animation) => animation.finished),
      ).then(() => {
        if (!cancelled) setPresent(false);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [open, present, surface]);
  return present;
}
export type AgentHubFlyoutProps = {
  id?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  entries: readonly FlyoutEntry[];
  disclosure?: FlyoutDisclosure;
  selectedId?: string;
  onSelect: (id: string) => void;
  title: string;
  count: string;
  meta: string;
  footerMeta?: string;
  side?: PopupSide;
  height?: number;
};
export function AgentHubFlyout({
  id: providedId,
  open,
  onOpenChange,
  triggerRef,
  entries,
  disclosure,
  selectedId,
  onSelect,
  title,
  count,
  meta,
  footerMeta,
  side = "bottom",
  height = 398,
}: AgentHubFlyoutProps) {
  const surface = useRef<HTMLElement>(null);
  const listScroll = useRef<ScrollAreaHandle>(null);
  const present = useAnimatedPresence(open, surface);
  const position = usePopupPosition(triggerRef, surface, present, side);
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const close = (restore = true) => {
    onOpenChange(false);
    if (restore) triggerRef.current?.focus();
  };
  useOutsideDismiss(open, triggerRef, surface, () => close(false));
  useLayoutEffect(() => {
    if (!open || !present) return;
    const frame = requestAnimationFrame(() =>
      focusVisibleButton(surface.current),
    );
    return () => cancelAnimationFrame(frame);
  }, [open, present]);
  useEffect(() => {
    if (!open && surface.current?.contains(document.activeElement))
      triggerRef.current?.focus();
  }, [open, triggerRef]);
  if (!present) return null;
  return createPortal(
    <section
      ref={surface}
      id={id}
      role="dialog"
      aria-modal={false}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-meta`}
      aria-hidden={!open || undefined}
      inert={!open}
      className="ah-flyout ah-flyout-shell ah-popup-motion"
      style={{ ...position.style, width: 280, height }}
      data-component="AgentHubFlyout"
      data-state={open ? "open" : "closed"}
      data-side={position.side}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        if (!open) return;
        const buttons = Array.from(
          surface.current?.querySelectorAll<HTMLButtonElement>(
            "button[data-focus-item]:not(:disabled)",
          ) ?? [],
        ).filter(
          (button) =>
            !button.closest("[inert]") && button.getClientRects().length > 0,
        );
        const index = buttons.indexOf(event.target as HTMLButtonElement);
        if (
          index >= 0 &&
          ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
        ) {
          event.preventDefault();
          const target =
            buttons[
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? buttons.length - 1
                  : (index +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      buttons.length) %
                    buttons.length
            ];
          target?.focus({ preventScroll: true });
          if (target) listScroll.current?.ensureVisible(target);
        }
      }}
    >
      <AgentHubFlyoutHeader
        title={title}
        count={count}
        meta={meta}
        titleId={`${id}-title`}
        metaId={`${id}-meta`}
        withDivider
      />
      <AgentHubScrollbar
        ref={listScroll}
        height="100%"
        label={`${title} 목록`}
        className="ah-flyout-scroll"
        viewportClassName="ah-flyout-viewport"
        contentClassName="ah-flyout-content"
        contentStyle={{ padding: 0 }}
      >
        <ul className="ah-flyout-list">
          {entries.map((entry) => (
            <FlyoutBranch
              key={entry.id}
              entry={entry}
              disclosure={disclosure}
              panelOpen={open}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </AgentHubScrollbar>
      {footerMeta && <AgentHubFlyoutFooter meta={footerMeta} inShell />}
    </section>,
    document.body,
  );
}

type FileIconType =
  | "spreadsheet"
  | "presentation"
  | "document"
  | "pdf"
  | "code"
  | "archive";
export type AgentHubFileItemProps = {
  fileId: string;
  title: string;
  fileTypeText: string;
  extensionText: string;
  iconType: FileIconType;
  showSize?: boolean;
  fileSizeText?: string;
  downloadAction?: {
    label: string;
    disabled?: boolean;
    onRequest: (fileId: string) => void;
  };
};
export function AgentHubFileItem({
  fileId,
  title,
  fileTypeText,
  extensionText,
  iconType,
  showSize = false,
  fileSizeText,
  downloadAction,
}: AgentHubFileItemProps) {
  return (
    <div className="ah-file-item" data-component="AgentHubFileItem">
      <FileIcon type={iconType} size={44} />
      <div className="ah-file-item-info">
        <span className="ah-file-item-title" title={title}>
          {title}
        </span>
        <span className="ah-file-item-meta">
          {showSize && (
            <span className="ah-file-item-size-group">
              <span className="ah-file-item-size" title={fileSizeText}>
                {fileSizeText}
              </span>
              <span className="ah-file-item-size-divider" aria-hidden="true">
                <Picture path="cards/file-size-divider-1x10.svg" size={1} />
              </span>
            </span>
          )}
          <span className="ah-file-item-kind">
            <span className="ah-file-item-type" title={fileTypeText}>
              {fileTypeText}
            </span>
            <span className="ah-file-item-divider" aria-hidden="true" />
            <span className="ah-file-item-extension" title={extensionText}>
              {extensionText}
            </span>
          </span>
        </span>
      </div>
      {downloadAction && (
        <AgentHubButton
          variant="tertiary"
          size={28}
          className="ah-file-download"
          trailingIcon={asset("cards/file-download-chevron-16.svg")}
          disabled={downloadAction.disabled}
          aria-label={`${title} ${downloadAction.label}`}
          onClick={() => {
            if (!downloadAction.disabled) downloadAction.onRequest(fileId);
          }}
        >
          {downloadAction.label}
        </AgentHubButton>
      )}
    </div>
  );
}
export type AgentHubDataCardProps = {
  id: string;
  title: string;
  description: string;
  typeLabel: string;
  disabled?: boolean;
  onActivate?: (id: string) => void;
};
export function AgentHubDataCard({
  id,
  title,
  description,
  typeLabel,
  disabled = false,
  onActivate,
}: AgentHubDataCardProps) {
  const contents = (
    <>
      <span className="ah-data-card-text">
        <span className="ah-data-card-title">{title}</span>
        <span className="ah-data-card-description">{description}</span>
      </span>
      <span className="ah-data-card-chip">
        <span>{typeLabel}</span>
      </span>
    </>
  );
  return onActivate ? (
    <button
      type="button"
      className="ah-data-card"
      data-component="AgentHubDataCard"
      disabled={disabled}
      data-action
      onClick={() => {
        if (!disabled) onActivate(id);
      }}
    >
      {contents}
    </button>
  ) : (
    <div className="ah-data-card" data-component="AgentHubDataCard">
      {contents}
    </div>
  );
}
export type AgentHubThumbnailCardProps = {
  itemId: string;
  title: string;
  metaText: string;
  descriptionText?: string;
  showDescription?: boolean;
  showThumbnail?: boolean;
  thumbnail?: { src: string; alt: string };
  showDot?: boolean;
  dotDescription?: string;
  selected?: boolean;
  disabled?: boolean;
  onActivate?: (id: string) => void;
};
export function AgentHubThumbnailCard({
  itemId,
  title,
  metaText,
  descriptionText,
  showDescription = true,
  showThumbnail = true,
  thumbnail,
  showDot = true,
  dotDescription,
  selected = false,
  disabled = false,
  onActivate,
}: AgentHubThumbnailCardProps) {
  const content = (
    <>
      {showThumbnail && (
        <span className="ah-thumbnail-frame">
          {thumbnail && <img src={thumbnail.src} alt={thumbnail.alt} />}
        </span>
      )}
      <span className="ah-thumbnail-content">
        <span className="ah-thumbnail-title-row">
          <span className="ah-thumbnail-title" title={title}>
            {title}
          </span>
          {showDot && (
            <>
              <Picture
                path={`cards/dot-${disabled ? "disabled" : "blue"}-8.svg`}
                size={8}
              />
              {dotDescription && (
                <span className="ah-visually-hidden">{dotDescription}</span>
              )}
            </>
          )}
        </span>
        <span className="ah-thumbnail-meta">{metaText}</span>
        {showDescription && descriptionText && (
          <span className="ah-thumbnail-description" title={descriptionText}>
            {descriptionText}
          </span>
        )}
      </span>
    </>
  );
  const attrs = {
    className: "ah-thumbnail-card",
    "data-component": "AgentHubThumbnailCard",
    "data-selected": (selected && !disabled) || undefined,
    "data-disabled": disabled || undefined,
  };
  return onActivate ? (
    <button
      {...attrs}
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) onActivate(itemId);
      }}
      aria-pressed={selected}
    >
      {content}
    </button>
  ) : (
    <div {...attrs}>{content}</div>
  );
}
export type AgentHubScheduleCardProps = {
  scheduleId: string;
  title: string;
  metaPrimary: string;
  metaSecondary: string;
  status: "active" | "paused";
  statusText: string;
  selected?: boolean;
  disabled?: boolean;
  onActivate?: (id: string) => void;
  onRequestStatusChange: (id: string, nextStatus: "active" | "paused") => void;
};
export function AgentHubScheduleCard({
  scheduleId,
  title,
  metaPrimary,
  metaSecondary,
  status,
  statusText,
  selected = false,
  disabled = false,
  onActivate,
  onRequestStatusChange,
}: AgentHubScheduleCardProps) {
  const info = (
    <span className="ah-schedule-info">
      <span className="ah-schedule-title" title={title}>
        {title}
      </span>
      <span className="ah-schedule-meta">
        <span>{metaPrimary}</span>
        <span aria-hidden="true">·</span>
        <span>{metaSecondary}</span>
      </span>
    </span>
  );
  return (
    <article
      className="ah-schedule-card"
      data-component="AgentHubScheduleCard"
      data-selected={(selected && !disabled) || undefined}
      data-disabled={disabled || undefined}
      data-status={status}
    >
      {onActivate ? (
        <button
          type="button"
          className="ah-schedule-header"
          disabled={disabled}
          aria-pressed={selected}
          onClick={() => {
            if (!disabled) onActivate(scheduleId);
          }}
        >
          {info}
        </button>
      ) : (
        <div className="ah-schedule-header">{info}</div>
      )}
      <div className="ah-schedule-footer">
        <span className="ah-schedule-run-status">
          <Picture
            path={`cards/schedule-${status}${disabled ? "-disabled" : ""}-status-14.svg`}
            size={14}
          />
          <span>{statusText}</span>
        </span>
        <button
          type="button"
          className="ah-frame-control24"
          disabled={disabled}
          aria-label={`${title} ${status === "active" ? "일시 중지" : "다시 시작"}`}
          onClick={() => {
            if (!disabled)
              onRequestStatusChange(
                scheduleId,
                status === "active" ? "paused" : "active",
              );
          }}
        >
          <Picture
            path={`cards/schedule-${status === "active" ? "pause" : "play"}${disabled ? "-disabled" : ""}-control-16.svg`}
          />
        </button>
      </div>
    </article>
  );
}
export type ItemCardTool = {
  id: string;
  name: string;
  imageUrl: string;
  displayWidth: number;
  displayHeight: number;
};
export type AgentHubItemCardProps = {
  itemId: string;
  title: string;
  meta: string;
  description?: string;
  showDescription?: boolean;
  showDot?: boolean;
  dotDescription?: string;
  showTools?: boolean;
  tools?: readonly ItemCardTool[];
  selected?: boolean;
  disabled?: boolean;
  appearance?: "default" | "accent";
  pinAction?: {
    pinned: boolean;
    label: string;
    onRequest: (id: string, pinned: boolean) => void;
  };
  onOpen: (id: string) => void;
  onMore: (id: string) => void;
  onChat: (id: string) => void;
};
export function AgentHubItemCard({
  itemId,
  title,
  meta,
  description,
  showDescription = true,
  showDot = true,
  dotDescription,
  showTools = true,
  tools = [],
  selected = false,
  disabled = false,
  appearance = "default",
  pinAction,
  onOpen,
  onMore,
  onChat,
}: AgentHubItemCardProps) {
  return (
    <article
      className="ah-item-card"
      data-component="AgentHubItemCard"
      data-selected={(selected && !disabled) || undefined}
      data-disabled={disabled || undefined}
      data-appearance={appearance}
    >
      <div className="ah-item-content">
        <div className="ah-item-header">
          <div className="ah-item-info">
            <div className="ah-item-title-row">
              <button
                type="button"
                className="ah-item-title"
                disabled={disabled}
                title={title}
                aria-pressed={selected}
                onClick={() => {
                  if (!disabled) onOpen(itemId);
                }}
              >
                {title}
              </button>
              {showDot && (
                <>
                  <Picture
                    path={`cards/dot-${disabled ? "disabled" : "blue"}-8.svg`}
                    size={8}
                  />
                  {dotDescription && (
                    <span className="ah-visually-hidden">{dotDescription}</span>
                  )}
                </>
              )}
            </div>
            <span className="ah-item-meta">{meta}</span>
          </div>
          <button
            className="ah-item-more"
            type="button"
            disabled={disabled}
            aria-label={`${title} 더보기`}
            onClick={() => {
              if (!disabled) onMore(itemId);
            }}
          >
            <Picture
              path={`cards/item-more${disabled ? "-disabled" : ""}-16.svg`}
            />
          </button>
        </div>
        {showDescription && description && (
          <p className="ah-item-description" title={description}>
            {description}
          </p>
        )}
      </div>
      <div className="ah-item-footer">
        {showTools && (
          <span className="ah-item-tools">
            {tools.map((tool) => (
              <span className="ah-item-tool" key={tool.id} title={tool.name}>
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  width={tool.displayWidth}
                  height={tool.displayHeight}
                />
              </span>
            ))}
          </span>
        )}
        <span className="ah-item-actions">
          {pinAction && !disabled && (
            <button
              type="button"
              className="ah-frame-control24 ah-item-pin"
              aria-label={pinAction.label}
              aria-pressed={pinAction.pinned}
              onClick={() => pinAction.onRequest(itemId, !pinAction.pinned)}
            >
              <Picture path="cards/pin-hovered-16.svg" />
            </button>
          )}
          <button
            className="ah-frame-control24"
            type="button"
            disabled={disabled}
            aria-label={`${title} 대화 시작`}
            onClick={() => {
              if (!disabled) onChat(itemId);
            }}
          >
            <Picture
              path={`cards/item-chat${disabled ? "-disabled" : ""}-16.svg`}
            />
          </button>
        </span>
      </div>
    </article>
  );
}
