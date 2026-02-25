"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { VoiceButton } from "./voice-button";

type VoiceQueryModeProps = {
  onTranscript?: (text: string) => void;
  onSubmit?: (text: string) => void;
  className?: string;
};

function VoiceQueryMode({
  onTranscript,
  onSubmit,
  className,
}: VoiceQueryModeProps) {
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");

  const handleStart = React.useCallback(() => {
    setTranscript("");
    setIsListening(true);
    onTranscript?.("");
  }, [onTranscript]);

  const handleStop = React.useCallback(
    (_duration: number) => {
      setIsListening(false);
      if (transcript.trim()) {
        onSubmit?.(transcript.trim());
      }
    },
    [transcript, onSubmit],
  );

  return (
    <div
      data-slot="voice-query-mode"
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <div className="flex items-center gap-3">
        <VoiceButton
          onStart={handleStart}
          onStop={handleStop}
          className="h-10 w-10"
        />
        <span
          className={cn(
            "text-base font-medium",
            isListening
              ? "text-[var(--salt-status-positive-foreground,theme(colors.emerald.600))]"
              : "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          )}
        >
          {isListening ? "Listening..." : "Tap to speak"}
        </span>
      </div>

      {!isListening && transcript && (
        <div
          className={cn(
            "w-full rounded-md p-2 text-base",
            "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
            "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
          )}
        >
          {transcript}
        </div>
      )}
    </div>
  );
}

export { VoiceQueryMode, type VoiceQueryModeProps };
