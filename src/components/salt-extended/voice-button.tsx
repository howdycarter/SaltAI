"use client";

import { Mic, Square } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type VoiceButtonProps = {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  className?: string;
  disabled?: boolean;
};

function VoiceButton({
  onStart,
  onStop,
  className,
  disabled,
}: VoiceButtonProps) {
  const [recording, setRecording] = React.useState(false);
  const startTime = React.useRef(0);

  const toggle = () => {
    if (recording) {
      const duration = Date.now() - startTime.current;
      setRecording(false);
      onStop?.(duration);
    } else {
      startTime.current = Date.now();
      setRecording(true);
      onStart?.();
    }
  };

  return (
    <motion.button
      data-slot="voice-button"
      data-recording={recording}
      disabled={disabled}
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-full transition-colors",
        recording
          ? "bg-red-500 text-white"
          : cn(
              "bg-[var(--salt-actionable-cta-background,#0060f0)] text-white",
              "hover:bg-[var(--salt-actionable-cta-background-hover,#004abf)]",
            ),
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {recording && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </motion.button>
  );
}

export { VoiceButton };
