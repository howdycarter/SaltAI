"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import * as React from "react";

import { Slider } from "@/components/salt-extended/slider";
import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  src: string;
  className?: string;
};

function AudioPlayer({ src, className }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [muted, setMuted] = React.useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      data-slot="audio-player"
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
        muted={muted}
      />
      <button
        onClick={toggle}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          "bg-[var(--salt-actionable-cta-background,#0060f0)] text-white",
          "hover:bg-[var(--salt-actionable-cta-background-hover,#004abf)]",
          "transition-colors",
        )}
      >
        {playing ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="ml-0.5 h-3.5 w-3.5" />
        )}
      </button>
      <span className="text-base text-[var(--salt-content-secondary-foreground)] tabular-nums">
        {formatTime(currentTime)}
      </span>
      <div className="flex-1">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([v]) => {
            if (audioRef.current) audioRef.current.currentTime = v;
          }}
        />
      </div>
      <span className="text-base text-[var(--salt-content-secondary-foreground)] tabular-nums">
        {formatTime(duration)}
      </span>
      <button
        onClick={() => setMuted(!muted)}
        className="text-[var(--salt-content-secondary-foreground)] transition-colors hover:text-[var(--salt-content-primary-foreground)]"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export { AudioPlayer };
