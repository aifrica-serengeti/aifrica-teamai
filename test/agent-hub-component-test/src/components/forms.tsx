import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { InputControl, TextareaControl } from "./common/controls";
import { SingleSelect } from "./common/Select";
import type { SingleSelectProps } from "./common/Select";
import { AgentHubIcon, AgentHubScrollbar } from "./primitives";
import { AgentHubMenuItem } from "./collections";
import "./forms.css";
type Field = { label: string; error?: string };
export function AgentHubInput({
  label,
  error,
  id,
  ...props
}: ComponentPropsWithRef<"input"> & Field) {
  const generated = useId(),
    fieldId = id || generated;
  return (
    <div data-component="AgentHubInput" className="ah-form-field">
      <label htmlFor={fieldId}>
        {label}
        {props.required && <i aria-hidden="true">*</i>}
      </label>
      <InputControl
        {...props}
        id={fieldId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={
          [props["aria-describedby"], error ? `${fieldId}-error` : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
      />
      {error && (
        <span id={`${fieldId}-error`} className="ah-form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
export function AgentHubTextarea({
  label,
  error,
  toolbar,
  id,
  ...props
}: ComponentPropsWithRef<"textarea"> & Field & { toolbar?: ReactNode }) {
  const generated = useId(),
    fieldId = id || generated;
  return (
    <div data-component="AgentHubTextarea" className="ah-form-field">
      <label htmlFor={fieldId}>
        {label}
        {props.required && <i aria-hidden="true">*</i>}
      </label>
      <div
        className="ah-form-textarea"
        data-invalid={
          Boolean(error) ||
          props["aria-invalid"] === true ||
          props["aria-invalid"] === "true"
        }
        data-disabled={Boolean(props.disabled)}
        data-readonly={Boolean(props.readOnly)}
      >
        <TextareaControl
          {...props}
          id={fieldId}
          unstyled
          focusOwner="container"
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [props["aria-describedby"], error ? `${fieldId}-error` : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        {toolbar && (
          <fieldset
            disabled={props.disabled || props.readOnly}
            className="ah-form-toolbar"
          >
            {toolbar}
          </fieldset>
        )}
      </div>
      {error && (
        <span id={`${fieldId}-error`} className="ah-form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
export function AgentHubSelect({
  error,
  id: providedId,
  ...props
}: Omit<
  SingleSelectProps,
  "triggerContent" | "popupClassName" | "renderOption" | "renderScrollArea"
> & { error?: string }) {
  const selected = props.options.find((option) => option.value === props.value);
  const generated = useId(),
    id = providedId || generated;
  return (
    <div data-component="AgentHubSelect" className="ah-form-field">
      <label htmlFor={id}>
        {props.label}
        {props.required && <i aria-hidden="true">*</i>}
      </label>
      <div
        className="ah-frequency-card"
        data-disabled={props.disabled}
        data-readonly={props.readOnly}
        data-invalid={Boolean(error) || props.invalid}
      >
        <span className="ah-frequency-label">
          <AgentHubIcon name="rotate-cw-clock" size={16} />
          반복
        </span>
        <SingleSelect
          id={id}
          {...props}
          className={`ah-frequency-select ${props.className || ""}`}
          invalid={Boolean(error) || props.invalid}
          describedBy={
            [props.describedBy, error ? `${id}-error` : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
          popupClassName="ah-menu ah-popup-motion ah-frequency-popup"
          renderScrollArea={(scrollProps) => (
            <AgentHubScrollbar {...scrollProps} height="auto" />
          )}
          renderOption={({
            option,
            id,
            index,
            selected,
            active,
            onSelect,
            onPointerMove,
            onPointerDown,
          }) => (
            <AgentHubMenuItem
              id={id}
              label={option.label}
              disabled={option.disabled}
              role="option"
              selected={selected}
              active={active}
              optionIndex={index}
              showCheck={selected}
              onSelect={onSelect}
              onPointerMove={onPointerMove}
              onPointerDown={onPointerDown}
            />
          )}
          triggerContent={
            <>
              <span>{selected?.label || "선택하세요"}</span>
              <AgentHubIcon name="chevron-down" size={16} />
            </>
          }
        />
      </div>
      {error && (
        <span id={`${id}-error`} className="ah-form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
