"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type QueueItemStatus = "queued" | "processing" | "completed" | "failed";

interface QueueItemData {
  id: string;
  label: string;
  status: QueueItemStatus;
  progress?: number;
}

interface QueueProps extends React.ComponentProps<"div"> {
  items: QueueItemData[];
  title?: string;
}

function Queue({ className, items, title = "Queue", ...props }: QueueProps) {
  const completed = items.filter((i) => i.status === "completed").length;

  return (
    <div
      data-slot="queue"
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
          {completed}/{items.length}
        </span>
      </div>
      <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-2.5">
            <span
              className={cn(
                "font-mono text-base",
                item.status === "completed" && "text-emerald-500",
                item.status === "processing" && "text-amber-500",
                item.status === "failed" && "text-red-500",
                item.status === "queued" &&
                  "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              )}
            >
              {item.status === "completed"
                ? "\u2713"
                : item.status === "failed"
                  ? "\u2717"
                  : item.status === "processing"
                    ? "\u25D4"
                    : "\u25CB"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] truncate text-base">
                {item.label}
              </p>
              {item.status === "processing" && item.progress != null && (
                <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] mt-1 h-1 w-full rounded-full">
                  <div
                    className="bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] h-full rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Queue };
export type { QueueItemData, QueueItemStatus, QueueProps };
