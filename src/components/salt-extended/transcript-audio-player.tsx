"use client";

import { Pause, Play } from "lucide-react";
import * as React from "react";

import { ScrubBar } from "@/components/salt-extended/scrub-bar";
import { cn } from "@/lib/utils";

import { Button } from "./button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type PlaybackSpeed = 0.5 | 1.0 | 1.5 | 2.0;

export type TranscriptAudioPlayerProps = {
  /** Audio source URL */
  src: string;
  /** Current playback time (seconds) — controlled externally */
  currentTime: number;
  /** Audio duration (seconds) */
  duration: number;
  /** Whether audio is currently playing */
  playing: boolean;
  /** Current playback speed */
  speed: PlaybackSpeed;
  /** Toggle play/pause */
  onTogglePlay: () => void;
  /** Seek to a specific time */
  onSeek: (time: number) => void;
  /** Change playback speed */
  onSpeedChange: (speed: PlaybackSpeed) => void;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatTime(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1.0, 1.5, 2.0];

/* ------------------------------------------------------------------ */
/*  TranscriptAudioPlayer                                              */
/* ------------------------------------------------------------------ */
export function TranscriptAudioPlayer({
  currentTime,
  duration,
  playing,
  speed,
  onTogglePlay,
  onSeek,
  onSpeedChange,
  className,
}: TranscriptAudioPlayerProps) {
  const nextSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    onSpeedChange(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  return (
    <div
      data-slot="transcript-audio-player"
      className={cn(
        "flex items-center gap-3 border-b px-4 py-2",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label={playing ? "Pause" : "Play"}
        onClick={onTogglePlay}
        className="h-7 w-7 shrink-0 rounded-full"
      >
        {playing ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="ml-0.5 h-3.5 w-3.5" />
        )}
      </Button>

      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] w-9 text-right text-base tabular-nums">
        {formatTime(currentTime)}
      </span>

      <ScrubBar
        value={currentTime}
        max={duration || 1}
        onChange={onSeek}
        className="flex-1"
      />

      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] w-9 text-base tabular-nums">
        {formatTime(duration)}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={nextSpeed}
        className="h-6 w-10 px-0 text-base font-semibold tabular-nums"
        aria-label={`Playback speed ${speed}x`}
      >
        {speed}x
      </Button>
    </div>
  );
}
