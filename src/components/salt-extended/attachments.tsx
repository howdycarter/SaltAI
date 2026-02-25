"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface AttachmentData {
  id: string;
  name: string;
  size?: number;
  type?: string;
  progress?: number;
}

interface AttachmentsProps extends React.ComponentProps<"div"> {
  files: AttachmentData[];
  onRemove?: (id: string) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Attachments({
  className,
  files,
  onRemove,
  ...props
}: AttachmentsProps) {
  if (files.length === 0) return null;

  return (
    <div
      data-slot="attachments"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {files.map((file) => (
        <AttachmentItem key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
}

function AttachmentItem({
  file,
  onRemove,
}: {
  file: AttachmentData;
  onRemove?: (id: string) => void;
}) {
  return (
    <div
      data-slot="attachment-item"
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "text-base",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] shrink-0"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
      <div className="min-w-0">
        <p className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] truncate font-medium">
          {file.name}
        </p>
        {file.size != null && (
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-base">
            {formatSize(file.size)}
          </p>
        )}
      </div>
      {file.progress != null && file.progress < 100 && (
        <div className="bg-[var(--salt-container-borderColor,theme(colors.border))] h-1 w-16 rounded-full">
          <div
            className="bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] h-full rounded-full"
            style={{ width: `${file.progress}%` }}
          />
        </div>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          className="hover:bg-[var(--salt-container-primary-background,theme(colors.background))] shrink-0 rounded p-0.5 transition-colors"
          aria-label={`Remove ${file.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { AttachmentItem, Attachments };
export type { AttachmentData, AttachmentsProps };
