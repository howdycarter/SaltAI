"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ContextItem {
  type: "file" | "selection" | "url" | "text";
  label: string;
  preview?: string;
}

interface ContextPanelProps extends React.ComponentProps<"div"> {
  items: ContextItem[];
  title?: string;
}

const typeIcons: Record<ContextItem["type"], string> = {
  file: "\uD83D\uDCC4",
  selection: "\uD83D\uDCCB",
  url: "\uD83D\uDD17",
  text: "\uD83D\uDCDD",
};

function ContextPanel({
  className,
  items,
  title = "Context",
  ...props
}: ContextPanelProps) {
  return (
    <div
      data-slot="context-panel"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2.5",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border-b",
        )}
      >
        <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
          {title}
        </span>
        <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 px-4 py-2.5">
            <span className="mt-0.5 text-base">{typeIcons[item.type]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] truncate text-base font-medium">
                {item.label}
              </p>
              {item.preview && (
                <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mt-0.5 line-clamp-2 text-base">
                  {item.preview}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ContextPanel };
export type { ContextItem, ContextPanelProps };
