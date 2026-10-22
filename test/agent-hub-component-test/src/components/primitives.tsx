import { useEffect, useId, useRef, useState } from "react";
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import manifest from "../data/icon-manifest.json";
import checkboxMarks from "../data/checkbox-marks.json";
import { InputControl } from "./common/controls";
import { ScrollArea, type ScrollAreaHandle } from "./common/ScrollArea";
import "./primitives.css";

export type { ScrollAreaHandle, ScrollMetrics } from "./common/ScrollArea";

const cx = (...names: (string | undefined | false)[]) =>
  names.filter(Boolean).join(" ");
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};
export const agentHubAsset = (path: string) => `/agent-hub/${path}`;

export function AgentHubIcon({
  name,
  size = 20,
  color,
  className,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  if (name.startsWith("/agent-hub/assets/"))
    return (
      <img
        aria-hidden="true"
        alt=""
        className={cx("ah-icon", className)}
        src={name}
        width={size}
        height={size}
        style={style}
      />
    );
  const asset = manifest.icons.find(
    (entry) => entry.name === name && entry.size === size,
  );
  if (!asset)
    return (
      <span
        aria-hidden="true"
        data-missing-asset={`${name}/${size}`}
        className={cx("ah-icon ah-asset-missing", className)}
        style={{ width: size, height: size, ...style }}
      />
    );
  if (color)
    return (
      <span
        aria-hidden="true"
        className={cx("ah-icon ah-icon-mask", className)}
        style={{
          width: size,
          height: size,
          color,
          maskImage: `url("${agentHubAsset(asset.path)}")`,
          WebkitMaskImage: `url("${agentHubAsset(asset.path)}")`,
          ...style,
        }}
      />
    );
  return (
    <img
      aria-hidden="true"
      alt=""
      className={cx("ah-icon", className)}
      src={agentHubAsset(asset.path)}
      width={size}
      height={size}
      style={style}
    />
  );
}

export function AgentHubFileIcon({
  type,
  size = 44,
  className,
  style,
}: {
  type: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const asset = manifest.fileIcons.find((entry) => entry.type === type);
  return asset ? (
    <img
      data-component="AgentHubFileIcon"
      src={agentHubAsset(asset.path)}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cx("ah-file-icon", className)}
      style={style}
    />
  ) : (
    <span data-missing-asset={`file/${type}`} className="ah-asset-missing" />
  );
}

export function AgentHubBrandMark({
  size = 32,
  label = "",
  className,
  style,
}: {
  size?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      data-component="AgentHubBrandMark"
      className={cx("ah-brand-mark", className)}
      data-motion="static"
      src={agentHubAsset(manifest.brandMark.path)}
      width={size}
      height={size}
      alt={label}
      aria-hidden={label ? undefined : true}
      style={style}
    />
  );
}

export type AgentHubButtonProps = NativeButtonProps & {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: number;
  leadingIcon?: string;
  trailingIcon?: string;
  keycaps?: string[];
  componentId?: string;
};
export function AgentHubButton({
  variant = "primary",
  size = 32,
  leadingIcon,
  trailingIcon,
  keycaps,
  componentId = "AgentHubButton",
  className,
  children,
  type = "button",
  ...props
}: AgentHubButtonProps) {
  const glyph = size === 40 ? 20 : 16;
  return (
    <button
      {...props}
      type={type}
      data-component={componentId}
      data-size={size}
      data-variant={variant}
      className={cx("ah-button", className)}
    >
      {leadingIcon && (
        <AgentHubIcon
          name={leadingIcon}
          size={glyph}
          color="currentColor"
          className="ah-button-icon"
        />
      )}
      <span>{children}</span>
      {trailingIcon && (
        <AgentHubIcon
          name={trailingIcon}
          size={glyph}
          color="currentColor"
          className="ah-button-icon"
        />
      )}
      {keycaps && (size === 28 || (variant === "ghost" && size === 24)) && (
        <span aria-hidden="true" className="ah-keycaps">
          {keycaps.map((key, index) => (
            <kbd key={`${key}-${index}`}>{key}</kbd>
          ))}
        </span>
      )}
    </button>
  );
}

type AccessibleButtonName =
  | { label: string; "aria-label"?: string }
  | { label?: string; "aria-label": string };
export type AgentHubIconButtonProps = NativeButtonProps &
  AccessibleButtonName & {
    icon: string;
    size?: number;
    variant?: "ghost" | "outlined" | "primary";
    active?: boolean;
  };
export function AgentHubIconButton({
  icon,
  label,
  size = 24,
  variant = "ghost",
  active = false,
  className,
  type = "button",
  ...props
}: AgentHubIconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={props["aria-label"] ?? label}
      data-component="AgentHubIconButton"
      data-size={size}
      data-variant={variant}
      data-active={active || undefined}
      className={cx("ah-icon-button", className)}
    >
      <AgentHubIcon
        name={icon}
        size={size === 32 ? 20 : 16}
        color={
          icon.startsWith("/agent-hub/assets/") ? undefined : "currentColor"
        }
      />
    </button>
  );
}

export function AgentHubAttachIconButton({
  icon = "plus",
  label,
  tone = "default",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  AccessibleButtonName & { icon?: string; tone?: "default" | "emphasis" }) {
  return (
    <button
      {...props}
      type={type}
      aria-label={props["aria-label"] ?? label}
      data-component="AgentHubAttachIconButton"
      data-tone={tone}
      className={cx("ah-attach-button", className)}
    >
      <AgentHubIcon name={icon} size={24} color="currentColor" />
    </button>
  );
}

export function AgentHubTextButton({
  children,
  icon = "arrow-right",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: string }) {
  return (
    <button
      {...props}
      type={type}
      data-component="AgentHubTextButton"
      className={cx("ah-text-button", className)}
    >
      {children}
      <AgentHubIcon name={icon} size={16} color="currentColor" />
    </button>
  );
}

export function AgentHubAgentTypeChip({
  type,
  children,
  className,
  style,
}: {
  type: "assistant" | "workflow" | "runtime" | "common-chat";
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const labels = {
    assistant: "어시스턴트",
    workflow: "워크플로우",
    runtime: "런타임",
    "common-chat": "일반 채팅",
  };
  return (
    <span
      data-component="AgentHubAgentTypeChip"
      data-kind={type}
      className={cx("ah-agent-chip", className)}
      style={style}
    >
      <span>{children ?? labels[type]}</span>
    </span>
  );
}

export function AgentHubPillChip({
  children,
  onClick,
  selected,
  disabled,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  selected?: boolean;
}) {
  if (!onClick)
    return (
      <span
        data-component="AgentHubPillChip"
        data-disabled={disabled || undefined}
        className={cx("ah-pill-chip", className)}
      >
        <span className="ah-pill-label">{children}</span>
      </span>
    );
  return (
    <button
      {...props}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      data-component="AgentHubPillChip"
      className={cx("ah-pill-chip", className)}
    >
      <span className="ah-pill-label">{children}</span>
    </button>
  );
}

export type AgentHubFilterChipProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
    size?: "sm" | "md" | "lg";
    count?: number | string;
    leadingIcon?: string;
    trailingIcon?: string;
  };
export function AgentHubFilterChip({
  selected = false,
  size = "md",
  count,
  leadingIcon,
  trailingIcon,
  children,
  className,
  type = "button",
  ...props
}: AgentHubFilterChipProps) {
  return (
    <button
      {...props}
      type={type}
      aria-pressed={selected}
      data-component="AgentHubFilterChip"
      data-selected={selected}
      data-size={size}
      className={cx("ah-filter-chip", className)}
    >
      {leadingIcon && (
        <AgentHubIcon name={leadingIcon} size={16} color="currentColor" />
      )}
      <span className="ah-filter-chip-label">{children}</span>
      {count !== undefined && <span className="ah-filter-count">{count}</span>}
      {trailingIcon && (
        <AgentHubIcon name={trailingIcon} size={16} color="currentColor" />
      )}
    </button>
  );
}

export type AgentHubFilterOption = {
  value: string;
  label: string;
  count?: number | string;
  disabled?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
};
export function AgentHubFilterChipGroup({
  items,
  value,
  onValueChange,
  label,
  layout = "hug",
  selectionMode = "single",
  className,
  style,
}: {
  items: AgentHubFilterOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  label: string;
  layout?: "hug" | "wrap" | "scroll";
  selectionMode?: "single" | "multiple";
  className?: string;
  style?: CSSProperties;
}) {
  const viewport = useRef<ScrollAreaHandle>(null);
  const [hasMore, setHasMore] = useState(false);
  const chips = items.map((item) => (
    <AgentHubFilterChip
      key={item.value}
      selected={value.includes(item.value)}
      disabled={item.disabled}
      count={item.count}
      leadingIcon={item.leadingIcon}
      trailingIcon={item.trailingIcon}
      onClick={() =>
        onValueChange(
          selectionMode === "single"
            ? [item.value]
            : value.includes(item.value)
              ? value.filter((v) => v !== item.value)
              : [...value, item.value],
        )
      }
    >
      {item.label}
    </AgentHubFilterChip>
  ));
  return (
    <div
      data-component="AgentHubFilterChipGroup"
      data-layout={layout}
      className={cx("ah-filter-group", className)}
      style={style}
      role="group"
      aria-label={label}
    >
      {layout === "scroll" ? (
        <AgentHubScrollbar
          ref={viewport}
          height="auto"
          orientation="horizontal"
          label={`${label} 가로 스크롤`}
          viewportClassName="ah-filter-group-viewport"
          contentClassName="ah-filter-group-items"
          onScrollMetricsChange={(metrics) =>
            setHasMore(metrics.canScrollRight)
          }
          onFocusCapture={(event) =>
            viewport.current?.ensureVisible(event.target)
          }
        >
          {chips}
        </AgentHubScrollbar>
      ) : (
        <div className="ah-filter-group-items">{chips}</div>
      )}
      {layout === "scroll" && hasMore && (
        <span className="ah-filter-group-fade" aria-hidden="true" />
      )}
    </div>
  );
}

export function AgentHubSwitch({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  readOnly = false,
  disabled,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  readOnly?: boolean;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const value = checked ?? internal;
  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={value}
      aria-readonly={readOnly || undefined}
      disabled={disabled}
      data-component="AgentHubSwitch"
      data-checked={value}
      className={cx("ah-switch", className)}
      onClick={(event) => {
        props.onClick?.(event);
        if (event.defaultPrevented || readOnly || disabled) return;
        if (checked === undefined) setInternal(!value);
        onCheckedChange?.(!value);
      }}
    >
      <span aria-hidden="true" className="ah-switch-thumb" />
    </button>
  );
}

export type AgentHubCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "checked" | "defaultChecked" | "onChange"
> & {
  label: string;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (value: boolean) => void;
  size?: "small" | "medium" | "large";
};
export function AgentHubCheckbox({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "medium",
  disabled,
  readOnly,
  id,
  className,
  ...props
}: AgentHubCheckboxProps) {
  const autoId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [internal, setInternal] = useState<boolean | "indeterminate">(
    defaultChecked,
  );
  const value = checked ?? internal;
  const pixels = size === "small" ? 12 : size === "large" ? 20 : 16;
  useEffect(() => {
    if (input.current) input.current.indeterminate = value === "indeterminate";
  }, [value]);
  const visualState =
    value === "indeterminate"
      ? "indeterminate"
      : value
        ? "checked"
        : "unchecked";
  return (
    <label
      htmlFor={id ?? autoId}
      data-component="AgentHubCheckbox"
      data-size={size}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cx("ah-checkbox-label", className)}
    >
      <span className="ah-checkbox-hit">
        <input
          {...props}
          ref={input}
          id={id ?? autoId}
          type="checkbox"
          checked={value === true}
          aria-checked={value === "indeterminate" ? "mixed" : value}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          onClick={(event) => {
            props.onClick?.(event);
            if (readOnly) event.preventDefault();
          }}
          onChange={(event) => {
            if (readOnly || disabled) return;
            const next =
              value === "indeterminate" ? true : event.currentTarget.checked;
            if (checked === undefined) setInternal(next);
            onCheckedChange?.(next);
          }}
        />
        <span
          aria-hidden="true"
          data-state={visualState}
          className="ah-checkbox-indicator"
          style={{ width: pixels, height: pixels }}
        >
          <span className="ah-checkbox-box" />
          {checkboxMarks.assets
            .filter((mark) => mark.size === size)
            .map((mark) => (
              <span
                key={mark.kind}
                className="ah-checkbox-mark"
                data-visible={visualState === mark.kind}
              >
                <img
                  alt=""
                  src={agentHubAsset(mark.path)}
                  width={mark.width}
                  height={mark.height}
                  style={{ left: mark.x, top: mark.y }}
                />
              </span>
            ))}
        </span>
      </span>
      <span>{label}</span>
    </label>
  );
}

export type AgentHubSearchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  size?: 32 | 48;
  filtered?: boolean;
  onFilter?: () => void;
  clearLabel?: string;
  filterLabel?: string;
};
export function AgentHubSearch({
  label,
  value,
  defaultValue = "",
  onValueChange,
  onSearch,
  onClear,
  size = 48,
  filtered = false,
  onFilter,
  clearLabel = "검색어 지우기",
  filterLabel = "검색 필터",
  disabled,
  readOnly,
  className,
  onKeyDown,
  ...props
}: AgentHubSearchProps) {
  const input = useRef<HTMLInputElement>(null);
  const composing = useRef(false);
  const [internal, setInternal] = useState(defaultValue);
  const query = value ?? internal;
  const change = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <div
      data-component="AgentHubSearch"
      data-size={size}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cx("ah-search", className)}
    >
      <AgentHubIcon
        name="search"
        size={size === 48 ? 20 : 16}
        color={disabled ? "#757575" : "#1c1c1c"}
      />
      <InputControl
        {...props}
        ref={input}
        focusOwner="container"
        unstyled
        aria-label={label}
        value={query}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => change(event.currentTarget.value)}
        onCompositionStart={(event) => {
          composing.current = true;
          props.onCompositionStart?.(event);
        }}
        onCompositionEnd={(event) => {
          composing.current = false;
          props.onCompositionEnd?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            event.key === "Enter" &&
            !composing.current &&
            !event.nativeEvent.isComposing &&
            event.keyCode !== 229 &&
            onSearch
          ) {
            event.preventDefault();
            onSearch(query);
          }
        }}
      />
      {query.length > 0 && !disabled && !readOnly && (
        <button
          type="button"
          aria-label={clearLabel}
          tabIndex={-1}
          className="ah-search-clear"
          onClick={() => {
            change("");
            onClear?.();
            input.current?.focus();
          }}
        >
          <AgentHubIcon name="x" size={16} color="#1c1c1c" />
        </button>
      )}
      {onFilter && (
        <button
          type="button"
          disabled={disabled || readOnly}
          aria-label={filterLabel}
          data-filtered={filtered}
          className="ah-search-filter"
          onClick={onFilter}
        >
          <AgentHubIcon
            name="filter"
            size={16}
            color={filtered ? "#3b82f6" : "#757575"}
          />
        </button>
      )}
    </div>
  );
}

export function AgentHubBreadcrumbSeparator({
  type = "slash",
}: {
  type?: "slash" | "dash" | "arrow";
}) {
  return type === "arrow" ? (
    <img
      data-component="AgentHubBreadcrumbSeparator"
      className="ah-breadcrumb-arrow"
      src="/agent-hub/assets/breadcrumb/separator-arrow.svg"
      width={21.557498931884766}
      height={24}
      alt=""
      aria-hidden="true"
    />
  ) : (
    <span
      data-component="AgentHubBreadcrumbSeparator"
      aria-hidden="true"
      className="ah-breadcrumb-separator"
    >
      {type === "dash" ? "–" : "/"}
    </span>
  );
}
export type AgentHubBreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};
export function AgentHubBreadcrumb({
  items,
  separator = "slash",
  label = "현재 위치",
  className,
}: {
  items: AgentHubBreadcrumbItem[];
  separator?: "slash" | "arrow";
  label?: string;
  className?: string;
}) {
  return (
    <nav
      data-component="AgentHubBreadcrumb"
      aria-label={label}
      className={cx("ah-breadcrumb", className)}
    >
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 && <AgentHubBreadcrumbSeparator type={separator} />}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : item.href ? (
              <a
                href={item.href}
                onClick={
                  item.onClick
                    ? (event) => {
                        event.preventDefault();
                        item.onClick?.();
                      }
                    : undefined
                }
              >
                {item.label}
              </a>
            ) : (
              <button type="button" onClick={item.onClick}>
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function AgentHubScrollbar({
  children,
  height = 180,
  label = "스크롤 콘텐츠",
  className,
  style,
  ...props
}: ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      {...props}
      data-component="AgentHubScrollbar"
      className={cx("ah-scroll-area", className)}
      height={height}
      label={label}
      style={
        {
          "--scroll-thumb-fill": "#ddd",
          "--scroll-thumb-hover": "#ddd",
          "--scroll-gutter": "11px",
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </ScrollArea>
  );
}

export {
  AgentHubIcon as Icon,
  AgentHubFileIcon as FileIcon,
  AgentHubBrandMark as BrandMark,
  AgentHubButton as Button,
  AgentHubIconButton as IconButton,
  AgentHubAttachIconButton as AttachIconButton,
};
