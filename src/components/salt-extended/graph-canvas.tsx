"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface GraphCanvasProps extends React.ComponentProps<"div"> {
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  gridSize?: number;
  showGrid?: boolean;
}

function GraphCanvas({
  className,
  zoom: controlledZoom,
  onZoomChange,
  gridSize = 20,
  showGrid = true,
  children,
  ...props
}: GraphCanvasProps) {
  const [internalZoom, setInternalZoom] = React.useState(1);
  const [pan, _setPan] = React.useState({ x: 0, y: 0 });
  const zoom = controlledZoom ?? internalZoom;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleWheel = React.useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(Math.max(zoom + delta, 0.25), 3);
      if (onZoomChange) onZoomChange(newZoom);
      else setInternalZoom(newZoom);
    },
    [zoom, onZoomChange],
  );

  return (
    <div
      data-slot="graph-canvas"
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      onWheel={handleWheel}
      {...props}
    >
      {showGrid && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <pattern
              id="grid"
              width={gridSize * zoom}
              height={gridSize * zoom}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize * zoom} 0 L 0 0 0 ${gridSize * zoom}`}
                fill="none"
                stroke="var(--salt-container-borderColor, #e2e8f0)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}
      <div
        className="relative min-h-[300px]"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute right-2 bottom-2 flex items-center gap-1 rounded-md px-2 py-1",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          "border-[var(--salt-container-borderColor,theme(colors.border))] border",
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base",
        )}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}

export { GraphCanvas };
export type { GraphCanvasProps };
