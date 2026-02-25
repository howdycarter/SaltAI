"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Actions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="actions"
      className={cn("flex items-center gap-1 py-1", className)}
      {...props}
    />
  );
}

function ActionGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="action-group"
      className={cn(
        "flex items-center gap-0.5",
        "mr-1 border-r pr-1 last:mr-0 last:border-r-0 last:pr-0",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
      {...props}
    />
  );
}

interface ActionButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "active";
}

function ActionButton({
  className,
  variant = "default",
  ...props
}: ActionButtonProps) {
  return (
    <button
      data-slot="action-button"
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        "hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        "transition-colors duration-150",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "active" &&
          "text-[var(--salt-content-primary-foreground,theme(colors.foreground))] bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        className,
      )}
      {...props}
    />
  );
}

export { ActionButton, ActionGroup, Actions };
