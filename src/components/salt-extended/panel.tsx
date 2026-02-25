"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface PanelProps extends React.ComponentProps<"div"> {
  title?: string;
  onClose?: () => void;
  side?: "left" | "right";
}

function Panel({
  className,
  title,
  onClose,
  side = "right",
  children,
  ...props
}: PanelProps) {
  return (
    <div
      data-slot="panel"
      className={cn(
        "flex h-full flex-col",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        side === "left" ? "border-r" : "border-l",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      {(title || onClose) && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-between px-4 py-3",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
          )}
        >
          {title && (
            <h3 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-semibold">
              {title}
            </h3>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "rounded-md p-1",
                "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
                "hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
                "transition-colors",
              )}
              aria-label="Close panel"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export { Panel };
export type { PanelProps };
