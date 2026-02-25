"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PromptInputProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  maxRows?: number;
  actions?: React.ReactNode;
}

function PromptInput({
  className,
  placeholder = "Type a message...",
  value: controlledValue,
  onValueChange,
  onSubmit,
  disabled,
  maxRows = 6,
  actions,
  children,
  ...props
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const value = controlledValue ?? internalValue;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      setInternalValue(v);
      onValueChange?.(v);
    },
    [onValueChange],
  );

  const handleSubmit = React.useCallback(() => {
    if (!value.trim() || disabled) return;
    onSubmit?.(value.trim());
    setInternalValue("");
    onValueChange?.("");
  }, [value, disabled, onSubmit, onValueChange]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  React.useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const lineHeight = 24;
    const max = lineHeight * maxRows;
    ta.style.height = `${Math.min(ta.scrollHeight, max)}px`;
  }, [value, maxRows]);

  return (
    <div
      data-slot="prompt-input"
      className={cn(
        "flex flex-col rounded-xl",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "focus-within:ring-[var(--salt-palette-interact-background,theme(colors.ring))] focus-within:ring-2 focus-within:ring-offset-1",
        "transition-shadow duration-150",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {children && <div className="px-3 pt-3">{children}</div>}
      <div className="flex items-end gap-2 p-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent text-base outline-none",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            "placeholder:text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        />
        <div className="flex shrink-0 items-center gap-1">
          {actions}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg",
              "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
              "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
              "transition-opacity hover:opacity-90",
              "disabled:pointer-events-none disabled:opacity-30",
            )}
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { PromptInput };
export type { PromptInputProps };
