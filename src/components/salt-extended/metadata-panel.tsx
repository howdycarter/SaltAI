"use client";

import type { CallMetadata } from "@/types/call-review";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1">
      <span className="shrink-0 text-base text-[var(--salt-content-secondary-foreground)]">
        {label}
      </span>
      <span className="text-right text-base font-medium">{value ?? "—"}</span>
    </div>
  );
}

function FlagBadge({
  label,
  active,
  color,
}: {
  label: string;
  active: boolean;
  color: "green" | "amber" | "red";
}) {
  if (!active) return null;
  const colors = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-base font-medium ${colors[color]}`}
    >
      {label}
    </span>
  );
}

export function MetadataPanel({
  metadata,
  showAgentId = false,
}: {
  metadata: CallMetadata;
  showAgentId?: boolean;
}) {
  return (
    <div className="space-y-4 p-4">
      {/* Call Info */}
      <div>
        <h3 className="mb-2 text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          Call Info
        </h3>
        <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
          <Field label="Call ID" value={metadata.callId} />
          <Field label="Date" value={formatDate(metadata.dateTime)} />
          <Field label="Duration" value={formatDuration(metadata.duration)} />
          <Field label="LOB" value={metadata.lob} />
          <Field label="Queue" value={metadata.queueGroup} />
          <Field label="Segment" value={metadata.queueSegment} />
          {showAgentId && <Field label="Agent" value={metadata.agentId} />}
        </div>
      </div>

      {/* Taxonomy */}
      <div>
        <h3 className="mb-2 text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          Topics
        </h3>
        <div className="mb-1 text-base text-[var(--salt-content-secondary-foreground)]">
          {metadata.taxonomyL1} &gt; {metadata.taxonomyL2}
        </div>
        <div className="flex flex-wrap gap-1">
          {metadata.lobTopics.map((topic) => (
            <span
              key={topic}
              className="bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] rounded px-1.5 py-0.5 text-base font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Flags */}
      <div>
        <h3 className="mb-2 text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          Flags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <FlagBadge label="FCR" active={metadata.fcrFlag} color="green" />
          <FlagBadge
            label="Transfer"
            active={metadata.transferFlag}
            color="amber"
          />
          <FlagBadge
            label="Escalation"
            active={metadata.escalationFlag}
            color="red"
          />
          {!metadata.fcrFlag &&
            !metadata.transferFlag &&
            !metadata.escalationFlag && (
              <span className="text-base text-[var(--salt-content-secondary-foreground)]">
                None
              </span>
            )}
        </div>
      </div>

      {/* Timing */}
      <div>
        <h3 className="mb-2 text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          Timing
        </h3>
        <div className="divide-[var(--salt-container-borderColor,theme(colors.border))] divide-y">
          <Field
            label="Handle Time"
            value={formatDuration(metadata.handleTime)}
          />
          <Field
            label="After-Call Work"
            value={formatDuration(metadata.afterCallWorkTime)}
          />
        </div>
      </div>
    </div>
  );
}
