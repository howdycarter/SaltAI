"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MatrixPreset = "digits" | "loader" | "pulse" | "wave" | "snake";

type MatrixProps = {
  rows?: number;
  cols?: number;
  preset?: MatrixPreset;
  color?: string;
  className?: string;
};

function Matrix({
  rows = 5,
  cols = 10,
  preset = "wave",
  color = "var(--salt-actionable-cta-background, #0060f0)",
  className,
}: MatrixProps) {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getCellOpacity = (row: number, col: number): number => {
    switch (preset) {
      case "wave":
        return 0.2 + 0.8 * Math.abs(Math.sin((col + frame * 0.3) * 0.5));
      case "pulse":
        return 0.2 + 0.8 * Math.abs(Math.sin(frame * 0.15));
      case "loader": {
        const pos = frame % (cols + 2);
        const dist = Math.abs(col - pos);
        return dist < 2 ? 1 - dist * 0.4 : 0.1;
      }
      case "snake": {
        const total = rows * cols;
        const snakePos = frame % total;
        const cellIndex = row * cols + col;
        const dist = Math.abs(cellIndex - snakePos);
        return dist < 3 ? 1 - dist * 0.3 : 0.1;
      }
      case "digits":
        return Math.random() > 0.7 ? 0.9 : 0.15;
      default:
        return 0.3;
    }
  };

  return (
    <div
      data-slot="matrix"
      data-preset={preset}
      className={cn("inline-grid gap-1", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <div
            key={i}
            className="h-2 w-2 rounded-full transition-opacity duration-150"
            style={{
              backgroundColor: color,
              opacity: getCellOpacity(row, col),
            }}
          />
        );
      })}
    </div>
  );
}

export { Matrix, type MatrixPreset };
