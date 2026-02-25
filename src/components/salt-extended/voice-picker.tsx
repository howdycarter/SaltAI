"use client";

import { Check, ChevronsUpDown, Pause, Play } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { Voice } from "@/types/voice";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Orb } from "./orb";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type VoicePickerProps = {
  voices: Voice[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function VoicePickerItem({
  voice,
  isSelected,
  onSelect,
}: {
  voice: Voice;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!voice.preview_url) return;

    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(voice.preview_url);
        audioRef.current.addEventListener("ended", () => setPlaying(false));
        audioRef.current.addEventListener("error", () => setPlaying(false));
      }
      audioRef.current.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  React.useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const labels = voice.labels;
  const meta = [labels?.accent, labels?.gender, labels?.age]
    .filter(Boolean)
    .join(" \u00B7 ");

  return (
    <CommandItem
      value={`${voice.name} ${labels?.accent ?? ""} ${labels?.gender ?? ""} ${labels?.age ?? ""} ${labels?.description ?? ""} ${labels?.use_case ?? ""}`}
      onSelect={onSelect}
      className="group"
    >
      <div className="relative h-8 w-8 shrink-0">
        <Orb
          agentState={playing ? "talking" : undefined}
          colors={["#CADCFC", "#A0B9D1"]}
          className="h-full w-full"
        />
        {voice.preview_url && (
          <button
            type="button"
            onClick={togglePreview}
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full transition-opacity",
              "bg-black/40 text-white",
              playing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {playing ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="ml-0.5 h-3 w-3" />
            )}
          </button>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-medium">{voice.name}</div>
        {meta && (
          <div className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] truncate text-base">
            {meta}
          </div>
        )}
      </div>
      {isSelected && <Check className="ml-auto h-4 w-4 shrink-0" />}
    </CommandItem>
  );
}

function VoicePicker({
  voices,
  value,
  onValueChange,
  placeholder = "Select a voice...",
  className,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: VoicePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (controlledOnOpenChange ?? (() => {}))
    : setInternalOpen;

  const selectedVoice = voices.find((v) => v.voice_id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-slot="voice-picker"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[280px] justify-between", className)}
        >
          <div className="flex items-center gap-2 truncate">
            <div className="h-5 w-5 shrink-0">
              <Orb agentState="thinking" colors={["#CADCFC", "#A0B9D1"]} />
            </div>
            <span className="truncate">
              {selectedVoice ? selectedVoice.name : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search voices..." />
          <CommandList>
            <CommandEmpty>No voices found.</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => (
                <VoicePickerItem
                  key={voice.voice_id}
                  voice={voice}
                  isSelected={value === voice.voice_id}
                  onSelect={() => {
                    onValueChange?.(voice.voice_id);
                    setOpen(false);
                  }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { VoicePicker, VoicePickerItem, type VoicePickerProps };
