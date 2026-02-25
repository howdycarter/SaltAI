"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Toolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar"
      role="toolbar"
      className={cn(
        "flex items-center gap-1 rounded-lg p-1",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        className,
      )}
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-group"
      role="group"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-separator"
      role="separator"
      className={cn(
        "mx-1 h-4 w-px shrink-0",
        "bg-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
      {...props}
    />
  );
}

interface ToolbarButtonProps extends React.ComponentProps<"button"> {
  active?: boolean;
}

function ToolbarButton({ className, active, ...props }: ToolbarButtonProps) {
  return (
    <button
      data-slot="toolbar-button"
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2.5 py-1.5",
        "text-base font-medium",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
        "hover:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "transition-colors duration-150",
        "disabled:pointer-events-none disabled:opacity-50",
        active &&
          "bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator };
