"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type NodeStatus = "idle" | "active" | "completed" | "error";

interface GraphNodeProps extends React.ComponentProps<"div"> {
  label: string;
  status?: NodeStatus;
  inputs?: number;
  outputs?: number;
  x?: number;
  y?: number;
}

const statusColors: Record<NodeStatus, string> = {
  idle: "border-[var(--salt-container-borderColor,theme(colors.border))]",
  active: "border-amber-500 shadow-amber-500/20 shadow-md",
  completed: "border-emerald-500",
  error: "border-red-500",
};

function GraphNode({
  className,
  label,
  status = "idle",
  inputs = 0,
  outputs = 0,
  x,
  y,
  ...props
}: GraphNodeProps) {
  return (
    <div
      data-slot="graph-node"
      className={cn("relative inline-flex flex-col items-center", className)}
      style={
        x != null && y != null
          ? { position: "absolute", left: x, top: y }
          : undefined
      }
      {...props}
    >
      {inputs > 0 && (
        <div className="mb-1 flex gap-2">
          {Array.from({ length: inputs }).map((_, i) => (
            <div
              key={`in-${i}`}
              className="border-[var(--salt-container-primary-background,theme(colors.background))] bg-[var(--salt-container-borderColor,theme(colors.border))] h-2 w-2 rounded-full border"
            />
          ))}
        </div>
      )}
      <div
        className={cn(
          "rounded-lg border-2 px-4 py-2.5",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          statusColors[status],
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              status === "idle" &&
                "bg-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              status === "active" && "animate-pulse bg-amber-500",
              status === "completed" && "bg-emerald-500",
              status === "error" && "bg-red-500",
            )}
          />
          <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-base font-medium">
            {label}
          </span>
        </div>
      </div>
      {outputs > 0 && (
        <div className="mt-1 flex gap-2">
          {Array.from({ length: outputs }).map((_, i) => (
            <div
              key={`out-${i}`}
              className="border-[var(--salt-container-primary-background,theme(colors.background))] bg-[var(--salt-container-borderColor,theme(colors.border))] h-2 w-2 rounded-full border"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { GraphNode };
export type { GraphNodeProps, NodeStatus };
