"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-icon"
      className={cn(
        "flex h-20 w-20 items-center justify-center rounded-full",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "[&>svg]:h-10 [&>svg]:w-10",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn(
        "mt-6 text-xl font-semibold",
        "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "mt-2 mb-8 max-w-sm text-center text-base leading-6",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-action"
      className={cn("flex gap-2", className)}
      {...props}
    />
  );
}

export {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
};
