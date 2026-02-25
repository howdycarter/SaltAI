"use client";

import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type BarVisualizerState = "idle" | "listening" | "speaking";

type BarVisualizerProps = {
  state?: BarVisualizerState;
  barCount?: number;
  color?: string;
  className?: string;
};

function BarVisualizer({
  state = "idle",
  barCount = 5,
  color = "var(--salt-actionable-cta-background, #0060f0)",
  className,
}: BarVisualizerProps) {
  return (
    <div
      data-slot="bar-visualizer"
      data-state={state}
      className={cn("flex items-center justify-center gap-1", className)}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 4,
            backgroundColor: color,
          }}
          animate={
            state === "idle"
              ? { height: 4, opacity: 0.4 }
              : state === "listening"
                ? {
                    height: [8, 20, 8],
                    opacity: [0.5, 0.8, 0.5],
                    transition: {
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    },
                  }
                : {
                    height: [12, 32, 16, 28, 12],
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeInOut",
                    },
                  }
          }
        />
      ))}
    </div>
  );
}

export { BarVisualizer, type BarVisualizerState };
