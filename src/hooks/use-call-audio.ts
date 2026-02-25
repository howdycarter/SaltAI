"use client";

import * as React from "react";

import type { PlaybackSpeed } from "@/components/salt-extended/transcript-audio-player";
import type { TranscriptSegment } from "@/types/call-review";

export type UseCallAudioOptions = {
  /** Audio source URL */
  src: string;
  /** Transcript segments for sync */
  segments: TranscriptSegment[];
};

export type UseCallAudioReturn = {
  /** Ref to attach to the <audio> element */
  audioRef: React.RefObject<HTMLAudioElement | null>;
  /** Current playback time in seconds */
  currentTime: number;
  /** Audio duration in seconds */
  duration: number;
  /** Whether audio is playing */
  playing: boolean;
  /** Current playback speed */
  speed: PlaybackSpeed;
  /** ID of the currently active transcript segment (or null) */
  activeSegmentId: string | null;
  /** Toggle play/pause */
  togglePlay: () => void;
  /** Seek to a specific time */
  seek: (time: number) => void;
  /** Change playback speed */
  setSpeed: (speed: PlaybackSpeed) => void;
};

/**
 * Hook that manages audio playback state and syncs with transcript segments.
 * Finds the active segment by matching currentTime to segment timestamps.
 */
export function useCallAudio({
  segments,
}: UseCallAudioOptions): UseCallAudioReturn {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const rafRef = React.useRef<number>(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [speed, setSpeedState] = React.useState<PlaybackSpeed>(1.0);

  // Smooth time sync via rAF
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

  // Audio event handlers
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }, [playing]);

  const seek = React.useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setSpeed = React.useCallback((s: PlaybackSpeed) => {
    setSpeedState(s);
    if (audioRef.current) {
      audioRef.current.playbackRate = s;
    }
  }, []);

  // Find active segment: the last segment whose timestamp <= currentTime
  const activeSegmentId = React.useMemo(() => {
    if (segments.length === 0) return null;
    let active: string | null = null;
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i].timestamp <= currentTime) {
        active = segments[i].id;
        break;
      }
    }
    return active;
  }, [segments, currentTime]);

  return {
    audioRef,
    currentTime,
    duration,
    playing,
    speed,
    activeSegmentId,
    togglePlay,
    seek,
    setSpeed,
  };
}
