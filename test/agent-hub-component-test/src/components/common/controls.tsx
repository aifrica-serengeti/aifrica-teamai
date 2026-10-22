import type { ComponentPropsWithRef } from "react";
import "./controls.css";

type ControlOptions = { focusOwner?: "self" | "container"; unstyled?: boolean };
export function InputControl({
  focusOwner = "self",
  unstyled = false,
  className = "",
  ...props
}: ComponentPropsWithRef<"input"> & ControlOptions) {
  return (
    <input
      {...props}
      className={`common-input ${className}`}
      data-focus-owner={focusOwner}
      data-unstyled={unstyled}
    />
  );
}
export function TextareaControl({
  focusOwner = "self",
  unstyled = false,
  className = "",
  ...props
}: ComponentPropsWithRef<"textarea"> & ControlOptions) {
  return (
    <textarea
      {...props}
      className={`common-textarea ${className}`}
      data-focus-owner={focusOwner}
      data-unstyled={unstyled}
    />
  );
}
