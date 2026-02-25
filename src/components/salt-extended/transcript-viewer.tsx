"use client";

import { Pause, Play } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { ScrubBar } from "./scrub-bar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type CharacterAlignment = {
  /** The word/token text */
  text: string;
  /** Start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
  /** Optional audio tag (e.g. "[Excited]") */
  isAudioTag?: boolean;
};

export type TranscriptViewerProps = {
  /** Audio source URL */
  audioSrc: string;
  /** MIME type of the audio */
  audioType?: string;
  /** Word-level timing alignment data */
  alignment: CharacterAlignment[];
  /** Hide audio tags like [Excited] */
  hideAudioTags?: boolean;
  /** Called when playback starts */
  onPlay?: () => void;
  /** Called when playback pauses */
  onPause?: () => void;
  /** Called when a word is clicked with its start time */
  onWordClick?: (time: number) => void;
  /** Additional CSS class */
  className?: string;
  children?: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */
type TranscriptViewerContextValue = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  playing: boolean;
  alignment: CharacterAlignment[];
  hideAudioTags: boolean;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  onWordClick?: (time: number) => void;
};

const TranscriptViewerContext =
  React.createContext<TranscriptViewerContextValue | null>(null);

export function useTranscriptViewerContext() {
  const ctx = React.useContext(TranscriptViewerContext);
  if (!ctx)
    throw new Error(
      "TranscriptViewer compound components must be used inside <TranscriptViewer>",
    );
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatTime(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type WordStatus = "unspoken" | "current" | "spoken";

function getWordStatus(
  word: CharacterAlignment,
  currentTime: number,
): WordStatus {
  if (currentTime >= word.end) return "spoken";
  if (currentTime >= word.start) return "current";
  return "unspoken";
}

/* ------------------------------------------------------------------ */
/*  TranscriptViewer (root / Container)                                */
/* ------------------------------------------------------------------ */
function TranscriptViewer({
  audioSrc,
  audioType,
  alignment,
  hideAudioTags = false,
  onPlay,
  onPause,
  onWordClick,
  className,
  children,
}: TranscriptViewerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const rafRef = React.useRef<number>(0);

  // Smooth currentTime sync via rAF
  React.useEffect(() => {
    const tick = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const play = React.useCallback(() => {
    audioRef.current?.play();
    setPlaying(true);
    onPlay?.();
  }, [onPlay]);

  const pause = React.useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    onPause?.();
  }, [onPause]);

  const togglePlayPause = React.useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const seek = React.useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({
      audioRef,
      currentTime,
      duration,
      playing,
      alignment,
      hideAudioTags,
      play,
      pause,
      togglePlayPause,
      seek,
      onWordClick,
    }),
    [
      currentTime,
      duration,
      playing,
      alignment,
      hideAudioTags,
      play,
      pause,
      togglePlayPause,
      seek,
      onWordClick,
    ],
  );

  return (
    <TranscriptViewerContext.Provider value={contextValue}>
      <div
        data-slot="transcript-viewer"
        data-state={playing ? "playing" : "paused"}
        className={cn("flex flex-col gap-4", className)}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioRef}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => {
            setPlaying(false);
            onPause?.();
          }}
        >
          <source src={audioSrc} type={audioType} />
        </audio>
        {children ?? (
          <>
            <Words />
            <div className="flex items-center gap-3">
              <PlayPauseButton />
              <TranscriptScrubBar />
            </div>
          </>
        )}
      </div>
    </TranscriptViewerContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  TranscriptViewer.Words                                             */
/* ------------------------------------------------------------------ */
function Words({ className }: { className?: string }) {
  const { alignment, currentTime, hideAudioTags, seek, onWordClick } =
    useTranscriptViewerContext();

  return (
    <div
      data-slot="transcript-viewer-words"
      className={cn("leading-relaxed", className)}
    >
      {alignment.map((word, i) => {
        if (hideAudioTags && word.isAudioTag) return null;

        const status = getWordStatus(word, currentTime);

        return (
          <button
            key={`${word.start}-${i}`}
            type="button"
            onClick={() => {
              seek(word.start);
              onWordClick?.(word.start);
            }}
            className={cn(
              "cursor-pointer rounded-sm px-0.5 py-px text-base transition-colors",
              "hover:bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]/50",
              status === "unspoken" &&
                "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
              status === "spoken" &&
                "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
              status === "current" &&
                "bg-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))]/15 text-[var(--salt-content-primary-foreground,theme(colors.foreground))] font-medium",
              word.isAudioTag &&
                "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] italic",
            )}
          >
            {word.text}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TranscriptViewer.PlayPauseButton                                   */
/* ------------------------------------------------------------------ */
function PlayPauseButton({ className }: { className?: string }) {
  const { playing, togglePlayPause, duration } = useTranscriptViewerContext();

  return (
    <Button
      data-slot="transcript-viewer-play-pause"
      variant="ghost"
      size="icon"
      aria-label={playing ? "Pause" : "Play"}
      disabled={duration === 0}
      onClick={togglePlayPause}
      className={cn("shrink-0 rounded-full", className)}
    >
      {playing ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Play className="ml-0.5 h-4 w-4" />
      )}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  TranscriptViewer.ScrubBar                                          */
/* ------------------------------------------------------------------ */
function TranscriptScrubBar({ className }: { className?: string }) {
  const { currentTime, duration, seek } = useTranscriptViewerContext();

  return (
    <div
      data-slot="transcript-viewer-scrub-bar"
      className={cn("flex flex-1 items-center gap-2", className)}
    >
      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] w-10 text-right text-base tabular-nums">
        {formatTime(currentTime)}
      </span>
      <ScrubBar
        value={currentTime}
        max={duration || 1}
        onChange={seek}
        className="flex-1"
      />
      <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] w-10 text-base tabular-nums">
        -{formatTime(Math.max(0, duration - currentTime))}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compound exports                                                   */
/* ------------------------------------------------------------------ */
TranscriptViewer.Words = Words;
TranscriptViewer.PlayPauseButton = PlayPauseButton;
TranscriptViewer.ScrubBar = TranscriptScrubBar;

export { TranscriptViewer };
