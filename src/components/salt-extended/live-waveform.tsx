"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type LiveWaveformProps = {
  stream?: MediaStream | null;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  color?: string;
  mode?: "bars" | "line" | "mirror";
  className?: string;
};

function LiveWaveform({
  stream,
  barCount = 32,
  barWidth = 3,
  barGap = 2,
  color = "var(--salt-actionable-cta-background, #0060f0)",
  mode = "bars",
  className,
}: LiveWaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number>(0);
  const analyserRef = React.useRef<AnalyserNode | null>(null);

  React.useEffect(() => {
    if (!stream || !canvasRef.current) return;

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const step = Math.floor(dataArray.length / barCount);

      if (mode === "bars" || mode === "mirror") {
        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step] / 255;
          const x = i * (barWidth + barGap);
          const height =
            value * rect.height * (mode === "mirror" ? 0.45 : 0.85);
          const y =
            mode === "mirror" ? rect.height / 2 - height : rect.height - height;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, height, barWidth / 2);
          ctx.fill();

          if (mode === "mirror") {
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.roundRect(x, rect.height / 2, barWidth, height, barWidth / 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      } else {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step] / 255;
          const x = (i / barCount) * rect.width;
          const y = (1 - value) * rect.height * 0.8 + rect.height * 0.1;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      audioCtx.close();
    };
  }, [stream, barCount, barWidth, barGap, color, mode]);

  return (
    <div data-slot="live-waveform" className={cn("h-16 w-full", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export { LiveWaveform };
