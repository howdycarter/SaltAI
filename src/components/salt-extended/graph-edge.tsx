"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GraphEdgeProps extends React.ComponentProps<"svg"> {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  animated?: boolean;
  variant?: "default" | "active" | "error";
}

const variantColors: Record<string, string> = {
  default: "var(--salt-container-borderColor, #e2e8f0)",
  active: "#f59e0b",
  error: "#ef4444",
};

function GraphEdge({
  className,
  x1,
  y1,
  x2,
  y2,
  label,
  animated,
  variant = "default",
  ...props
}: GraphEdgeProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const width = Math.abs(x2 - x1) + 20;
  const height = Math.abs(y2 - y1) + 20;
  const minX = Math.min(x1, x2) - 10;
  const minY = Math.min(y1, y2) - 10;

  return (
    <svg
      data-slot="graph-edge"
      className={cn("pointer-events-none absolute inset-0", className)}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
      {...props}
    >
      <path
        d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
        fill="none"
        stroke={variantColors[variant]}
        strokeWidth={2}
        strokeDasharray={animated ? "6 4" : undefined}
      >
        {animated && (
          <animate
            attributeName="stroke-dashoffset"
            values="10;0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </path>
      {label && (
        <text
          x={midX}
          y={midY - 8}
          textAnchor="middle"
          className="fill-[var(--salt-content-secondary-foreground)] text-base"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

export { GraphEdge };
export type { GraphEdgeProps };
