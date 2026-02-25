"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ScrubBarProps = {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
};

function ScrubBar({
  value = 0,
  max = 100,
  onChange,
  className,
}: ScrubBarProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const getValueFromEvent = (e: React.PointerEvent | PointerEvent) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return (x / rect.width) * max;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange?.(getValueFromEvent(e));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    onChange?.(getValueFromEvent(e));
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const progress = max > 0 ? (value / max) * 100 : 0;

  return (
    <div
      ref={trackRef}
      data-slot="scrub-bar"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
      className={cn(
        "group relative flex h-5 w-full cursor-pointer items-center",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className={cn(
          "relative h-1 w-full overflow-hidden rounded-full transition-[height] group-hover:h-1.5",
          "bg-[var(--salt-track-background,theme(colors.secondary.DEFAULT))]",
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 h-full rounded-full",
            "bg-[var(--salt-actionable-cta-background,#0060f0)]",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        className={cn(
          "absolute h-3 w-3 rounded-full opacity-0 shadow transition-opacity group-hover:opacity-100",
          "bg-[var(--salt-actionable-cta-background,#0060f0)]",
          dragging && "opacity-100",
        )}
        style={{ left: `calc(${progress}% - 6px)` }}
      />
    </div>
  );
}

export { ScrubBar };
