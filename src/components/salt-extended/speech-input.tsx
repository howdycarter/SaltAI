"use client";

import { Mic, Square, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Skeleton } from "./skeleton";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type SpeechInputState = "idle" | "connecting" | "recording";

export type SpeechInputProps = {
  /** Async function that returns a signed auth token for the transcription service */
  getToken?: () => Promise<string>;
  /** Called with the current transcript text on each update */
  onChange?: (text: string) => void;
  /** Called when recording starts */
  onStart?: () => void;
  /** Called when recording stops with the final transcript */
  onStop?: (transcript: string) => void;
  /** Called when the user cancels the recording */
  onCancel?: () => void;
  /** Called if auth token fetch fails */
  onAuthError?: (error: Error) => void;
  /** Called if websocket/recording error occurs */
  onError?: (error: Error) => void;
  /** Transcription model ID (optional) */
  modelId?: string;
  /** Device ID for microphone (optional) */
  microphone?: string;
  /** Language code for transcription (optional) */
  languageCode?: string;
  /** Visual size variant */
  size?: "sm" | "default" | "lg";
  /** Additional CSS class */
  className?: string;
  children?: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */
type SpeechInputContextValue = {
  state: SpeechInputState;
  transcript: string;
  start: () => void;
  stop: () => void;
  cancel: () => void;
  size: "sm" | "default" | "lg";
};

const SpeechInputContext = React.createContext<SpeechInputContextValue | null>(
  null,
);

function useSpeechInputContext() {
  const ctx = React.useContext(SpeechInputContext);
  if (!ctx)
    throw new Error(
      "SpeechInput compound components must be used inside <SpeechInput>",
    );
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  useSpeechInput hook                                                */
/* ------------------------------------------------------------------ */
export function useSpeechInput(options?: {
  getToken?: () => Promise<string>;
  onStart?: () => void;
  onStop?: (transcript: string) => void;
  onCancel?: () => void;
  onChange?: (text: string) => void;
  onAuthError?: (error: Error) => void;
  onError?: (error: Error) => void;
  modelId?: string;
  microphone?: string;
  languageCode?: string;
}) {
  const [state, setState] = React.useState<SpeechInputState>("idle");
  const [transcript, setTranscript] = React.useState("");
  const abortRef = React.useRef<AbortController | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const start = React.useCallback(async () => {
    if (state !== "idle") return;
    setState("connecting");

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      // Phase 1: get auth token if provided
      if (options?.getToken) {
        await options.getToken();
        if (abort.signal.aborted) return;
      }

      // Phase 2: request microphone access
      const constraints: MediaStreamConstraints = {
        audio: options?.microphone
          ? { deviceId: { exact: options.microphone } }
          : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (abort.signal.aborted) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;

      setState("recording");
      setTranscript("");
      options?.onStart?.();
    } catch (err) {
      setState("idle");
      const error =
        err instanceof Error ? err : new Error("Failed to start recording");
      if (options?.getToken) {
        options?.onAuthError?.(error);
      } else {
        options?.onError?.(error);
      }
    }
  }, [state, options]);

  const stop = React.useCallback(() => {
    if (state !== "recording") return;
    abortRef.current?.abort();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setState("idle");
    options?.onStop?.(transcript);
  }, [state, transcript, options]);

  const cancel = React.useCallback(() => {
    abortRef.current?.abort();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setState("idle");
    setTranscript("");
    options?.onCancel?.();
  }, [options]);

  /** Append text to the transcript (used by transcription service or mock) */
  const appendTranscript = React.useCallback(
    (text: string) => {
      setTranscript((prev) => {
        const next = prev ? `${prev} ${text}` : text;
        options?.onChange?.(next);
        return next;
      });
    },
    [options],
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      abortRef.current?.abort();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { state, transcript, start, stop, cancel, appendTranscript };
}

/* ------------------------------------------------------------------ */
/*  SpeechInput (root)                                                 */
/* ------------------------------------------------------------------ */
function SpeechInput({
  getToken,
  onChange,
  onStart,
  onStop,
  onCancel,
  onAuthError,
  onError,
  modelId,
  microphone,
  languageCode,
  size = "default",
  className,
  children,
}: SpeechInputProps) {
  const hook = useSpeechInput({
    getToken,
    onChange,
    onStart,
    onStop,
    onCancel,
    onAuthError,
    onError,
    modelId,
    microphone,
    languageCode,
  });

  const contextValue = React.useMemo(() => ({ ...hook, size }), [hook, size]);

  const sizeClasses = {
    sm: "h-10 gap-2 rounded-lg px-3",
    default: "h-12 gap-3 rounded-xl px-4",
    lg: "h-14 gap-4 rounded-2xl px-5",
  };

  return (
    <SpeechInputContext.Provider value={contextValue}>
      <div
        data-slot="speech-input"
        data-state={hook.state}
        className={cn(
          "inline-flex items-center transition-all",
          "border",
          "border-[var(--salt-editable-borderColor,theme(colors.border))]",
          "bg-[var(--salt-container-primary-background,theme(colors.background))]",
          sizeClasses[size],
          hook.state === "recording" &&
            "border-[var(--salt-actionable-cta-background,theme(colors.primary.DEFAULT))] shadow-sm",
          className,
        )}
      >
        {children ?? (
          <>
            <RecordButton />
            <Preview />
            <CancelButton />
          </>
        )}
      </div>
    </SpeechInputContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  SpeechInput.RecordButton                                           */
/* ------------------------------------------------------------------ */
function RecordButton({ className }: { className?: string }) {
  const { state, start, stop, size } = useSpeechInputContext();

  const iconSize = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  if (state === "connecting") {
    return (
      <Skeleton
        data-slot="speech-input-record-button"
        className={cn("shrink-0 rounded-full", {
          "size-6": size === "sm",
          "size-8": size === "default",
          "size-10": size === "lg",
        })}
      />
    );
  }

  return (
    <Button
      data-slot="speech-input-record-button"
      variant="ghost"
      size="icon"
      aria-label={state === "recording" ? "Stop recording" : "Start recording"}
      onClick={state === "idle" ? start : stop}
      className={cn(
        "shrink-0 rounded-full",
        state === "recording" &&
          "bg-[var(--salt-status-error-background,theme(colors.destructive.DEFAULT))] hover:bg-[var(--salt-status-error-background,theme(colors.destructive.DEFAULT))]/90 text-white",
        className,
      )}
    >
      {state === "recording" ? (
        <Square className={iconSize[size]} />
      ) : (
        <Mic className={iconSize[size]} />
      )}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  SpeechInput.Preview                                                */
/* ------------------------------------------------------------------ */
function Preview({ className }: { className?: string }) {
  const { state, transcript } = useSpeechInputContext();

  return (
    <div
      data-slot="speech-input-preview"
      className={cn("relative min-w-0 flex-1 overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="placeholder"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] block truncate text-base"
          >
            Press to speak...
          </motion.span>
        )}
        {state === "connecting" && (
          <motion.div
            key="connecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Skeleton className="h-3 w-24" />
          </motion.div>
        )}
        {state === "recording" && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="relative"
          >
            {transcript ? (
              <motion.span layout className="block truncate text-base">
                {transcript}
              </motion.span>
            ) : (
              <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] block animate-pulse truncate text-base">
                Listening...
              </span>
            )}
            {/* Fade-edge mask on right side */}
            <div className="from-[var(--salt-container-primary-background,theme(colors.background))] pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SpeechInput.CancelButton                                           */
/* ------------------------------------------------------------------ */
function CancelButton({ className }: { className?: string }) {
  const { state, cancel } = useSpeechInputContext();

  if (state === "idle") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Button
          data-slot="speech-input-cancel-button"
          variant="ghost"
          size="icon"
          aria-label="Cancel recording"
          onClick={cancel}
          className={cn("shrink-0 rounded-full", className)}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Compound exports                                                   */
/* ------------------------------------------------------------------ */
SpeechInput.RecordButton = RecordButton;
SpeechInput.Preview = Preview;
SpeechInput.CancelButton = CancelButton;

export { SpeechInput };
