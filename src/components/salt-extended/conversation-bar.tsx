"use client";

import { Mic, MicOff, Send } from "lucide-react";
import * as React from "react";

import { LiveWaveform } from "@/components/salt-extended/live-waveform";
import { cn } from "@/lib/utils";

import { Button } from "./button";

type ConversationBarProps = {
  onSend?: (message: string) => void;
  onMicToggle?: (active: boolean) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

function ConversationBar({
  onSend,
  onMicToggle,
  placeholder = "Type a message...",
  className,
  disabled,
}: ConversationBarProps) {
  const [value, setValue] = React.useState("");
  const [micActive, setMicActive] = React.useState(false);
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  const toggleMic = async () => {
    if (micActive) {
      stream?.getTracks().forEach((t) => t.stop());
      setStream(null);
      setMicActive(false);
      onMicToggle?.(false);
    } else {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(s);
        setMicActive(true);
        onMicToggle?.(true);
      } catch {
        // Mic permission denied
      }
    }
  };

  return (
    <div
      data-slot="conversation-bar"
      className={cn(
        "flex items-center gap-2 rounded-lg border p-2",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
    >
      {micActive && stream ? (
        <div className="flex-1">
          <LiveWaveform stream={stream} className="h-10" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 items-center gap-2"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex-1 bg-transparent text-base outline-none",
              "placeholder:text-[var(--salt-content-secondary-foreground)]",
            )}
          />
          <Button
            type="submit"
            size="icon"
            disabled={disabled || !value.trim()}
            className="h-8 w-8 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}
      <Button
        variant={micActive ? "destructive" : "outline"}
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={toggleMic}
        disabled={disabled}
      >
        {micActive ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export { ConversationBar };
