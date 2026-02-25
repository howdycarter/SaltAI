"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Controls({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="controls"
      className={cn(
        "space-y-4 rounded-lg p-4",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ControlSliderProps extends React.ComponentProps<"div"> {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

function ControlSlider({
  className,
  label,
  value,
  min = 0,
  max = 1,
  step = 0.1,
  onValueChange,
  ...props
}: ControlSliderProps) {
  return (
    <div
      data-slot="control-slider"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <label className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
          {label}
        </label>
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] font-mono text-base">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange?.(parseFloat(e.target.value))}
        className="accent-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] w-full"
      />
    </div>
  );
}

interface ControlToggleProps extends React.ComponentProps<"div"> {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function ControlToggle({
  className,
  label,
  description,
  checked,
  onCheckedChange,
  ...props
}: ControlToggleProps) {
  return (
    <div
      data-slot="control-toggle"
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <div>
        <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
          {label}
        </p>
        {description && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200",
          checked
            ? "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]"
            : "bg-[var(--salt-container-borderColor,theme(colors.input))]",
        )}
      >
        <span
          className={cn(
            "bg-[var(--salt-container-primary-background,theme(colors.background))] pointer-events-none inline-block h-4 w-4 translate-y-0.5 transform rounded-full shadow-sm transition-transform duration-200",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

export { Controls, ControlSlider, ControlToggle };
export type { ControlSliderProps, ControlToggleProps };
