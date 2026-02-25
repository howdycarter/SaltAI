"use client";

import { Check, ChevronsUpDown, Mic, MicOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LiveWaveform } from "./live-waveform";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type AudioDevice = {
  deviceId: string;
  label: string;
  groupId: string;
};

export type MicSelectorProps = {
  value?: string;
  onValueChange?: (deviceId: string) => void;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  disabled?: boolean;
  className?: string;
};

/* ------------------------------------------------------------------ */
/*  useAudioDevices hook                                               */
/* ------------------------------------------------------------------ */
function cleanLabel(label: string): string {
  return label.replace(/\s*\([^)]*\)/g, "").trim() || "Microphone";
}

export function useAudioDevices() {
  const [devices, setDevices] = React.useState<AudioDevice[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasPermission, setHasPermission] = React.useState(false);

  const loadDevices = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Phase 1: request permission
      if (!hasPermission) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((t) => t.stop());
        setHasPermission(true);
      }
      // Phase 2: enumerate with labels
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = allDevices
        .filter((d) => d.kind === "audioinput" && d.deviceId)
        .map((d) => ({
          deviceId: d.deviceId,
          label: cleanLabel(d.label),
          groupId: d.groupId,
        }));
      setDevices(audioInputs);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load audio devices",
      );
    } finally {
      setLoading(false);
    }
  }, [hasPermission]);

  // Listen for device changes
  React.useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;

    const handleChange = () => {
      navigator.mediaDevices.enumerateDevices().then((allDevices) => {
        const audioInputs = allDevices
          .filter((d) => d.kind === "audioinput" && d.deviceId)
          .map((d) => ({
            deviceId: d.deviceId,
            label: cleanLabel(d.label),
            groupId: d.groupId,
          }));
        setDevices(audioInputs);
      });
    };

    navigator.mediaDevices.addEventListener("devicechange", handleChange);
    return () =>
      navigator.mediaDevices.removeEventListener("devicechange", handleChange);
  }, []);

  // Initial enumerate (may lack labels without permission)
  React.useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;
    navigator.mediaDevices.enumerateDevices().then((allDevices) => {
      const audioInputs = allDevices
        .filter((d) => d.kind === "audioinput" && d.deviceId)
        .map((d) => ({
          deviceId: d.deviceId,
          label: cleanLabel(d.label),
          groupId: d.groupId,
        }));
      setDevices(audioInputs);
    });
  }, []);

  return { devices, loading, error, hasPermission, loadDevices };
}

/* ------------------------------------------------------------------ */
/*  MicSelector component                                              */
/* ------------------------------------------------------------------ */
function MicSelector({
  value,
  onValueChange,
  muted: controlledMuted,
  onMutedChange,
  disabled = false,
  className,
}: MicSelectorProps) {
  const { devices, hasPermission, loadDevices } = useAudioDevices();
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalMuted, setInternalMuted] = React.useState(false);
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  const isMuted =
    controlledMuted !== undefined ? controlledMuted : internalMuted;
  const toggleMute = () => {
    const next = !isMuted;
    if (controlledMuted !== undefined) {
      onMutedChange?.(next);
    } else {
      setInternalMuted(next);
    }
  };

  // Auto-select first device
  React.useEffect(() => {
    if (!value && devices.length > 0) {
      onValueChange?.(devices[0].deviceId);
    }
  }, [devices, value, onValueChange]);

  // Request permission when dropdown opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !hasPermission) {
      loadDevices();
    }
  };

  // Manage live waveform stream
  React.useEffect(() => {
    if (!isOpen || isMuted || !value) {
      stream?.getTracks().forEach((t) => t.stop());
      setStream(null);
      return;
    }

    let cancelled = false;
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: { exact: value } } })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
        } else {
          setStream(s);
        }
      })
      .catch(() => setStream(null));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isMuted, value]);

  // Cleanup stream on unmount
  React.useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedDevice = devices.find((d) => d.deviceId === value);
  const displayLabel = selectedDevice?.label ?? "Select mic...";

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          data-slot="mic-selector"
          variant="ghost"
          disabled={disabled}
          className={cn("w-48 justify-between gap-2", className)}
        >
          <div className="flex items-center gap-2 truncate">
            {isMuted ? (
              <MicOff className="text-[var(--salt-status-error-foreground,theme(colors.destructive.DEFAULT))] h-4 w-4 shrink-0" />
            ) : (
              <Mic className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate text-base">{displayLabel}</span>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {devices.length === 0 ? (
          <div className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] px-2 py-3 text-center text-base">
            No microphones found
          </div>
        ) : (
          devices.map((device) => (
            <DropdownMenuItem
              key={device.deviceId}
              onSelect={(e) => {
                e.preventDefault();
                onValueChange?.(device.deviceId);
              }}
              className="gap-2"
            >
              {value === device.deviceId ? (
                <Check className="h-4 w-4 shrink-0" />
              ) : (
                <span className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">{device.label}</span>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="h-7 gap-1.5 px-2 text-base"
          >
            {isMuted ? (
              <>
                <MicOff className="h-3.5 w-3.5" /> Unmute
              </>
            ) : (
              <>
                <Mic className="h-3.5 w-3.5" /> Mute
              </>
            )}
          </Button>
          <div className="h-[15px] flex-1">
            {!isMuted && stream && (
              <LiveWaveform
                stream={stream}
                barCount={16}
                barWidth={2}
                barGap={1}
                mode="bars"
                className="h-[15px]"
              />
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { MicSelector };
