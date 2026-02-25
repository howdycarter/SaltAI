"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          "bg-[var(--salt-track-background,theme(colors.secondary.DEFAULT))]",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full",
            "bg-[var(--salt-actionable-cta-background,#0060f0)]",
          )}
        />
      </SliderPrimitive.Track>
      {(props.defaultValue ?? props.value ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block h-5 w-5 rounded-full border-2 shadow transition-colors",
            "border-[var(--salt-actionable-cta-background,#0060f0)]",
            "bg-[var(--salt-container-primary-background,theme(colors.background))]",
            "ring-offset-background focus-visible:ring-2 focus-visible:outline-none",
            "focus-visible:ring-[var(--salt-focused-outline-color,theme(colors.ring))] focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
