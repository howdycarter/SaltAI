"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type WaveformProps = {
  data?: number[];
  progress?: number;
  barWidth?: number;
  barGap?: number;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
};

function Waveform({
  data,
  progress = 0,
  barWidth = 3,
  barGap = 2,
  className,
  activeColor = "var(--salt-actionable-cta-background, #0060f0)",
  inactiveColor = "var(--salt-container-secondary-background, #e5e7eb)",
}: WaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const bars = React.useMemo(() => {
    if (data && data.length > 0) return data;
    return Array.from({ length: 50 }, () => Math.random() * 0.8 + 0.2);
  }, [data]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const totalBarWidth = barWidth + barGap;
    const activeBars = Math.floor(progress * bars.length);

    bars.forEach((amplitude, i) => {
      const x = i * totalBarWidth;
      const height = amplitude * rect.height * 0.8;
      const y = (rect.height - height) / 2;

      ctx.fillStyle = i < activeBars ? activeColor : inactiveColor;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, height, barWidth / 2);
      ctx.fill();
    });
  }, [bars, progress, barWidth, barGap, activeColor, inactiveColor]);

  return (
    <div
      ref={containerRef}
      data-slot="waveform"
      className={cn("h-16 w-full", className)}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export { Waveform };
