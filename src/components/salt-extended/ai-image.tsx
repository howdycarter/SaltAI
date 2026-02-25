"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type AIImageStatus = "loading" | "loaded" | "error";

interface AIImageProps extends React.ComponentProps<"div"> {
  src?: string;
  alt?: string;
  prompt?: string;
  status?: AIImageStatus;
  width?: number;
  height?: number;
}

function AIImage({
  className,
  src,
  alt = "AI generated image",
  prompt,
  status = src ? "loaded" : "loading",
  width,
  height,
  ...props
}: AIImageProps) {
  return (
    <div
      data-slot="ai-image"
      className={cn(
        "overflow-hidden rounded-lg",
        "border-[var(--salt-container-borderColor,theme(colors.border))] border",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex items-center justify-center",
          "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
          !width && "aspect-square",
        )}
        style={width && height ? { width, height } : undefined}
      >
        {status === "loading" && (
          <div className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] flex flex-col items-center gap-2">
            <svg
              className="h-8 w-8 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-base">Generating...</p>
          </div>
        )}
        {status === "error" && (
          <div className="flex flex-col items-center gap-2 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <p className="text-base">Failed to generate</p>
          </div>
        )}
        {status === "loaded" && src && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        )}
      </div>
      {prompt && (
        <div
          className={cn(
            "px-3 py-2 text-base italic",
            "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            "border-[var(--salt-container-borderColor,theme(colors.border))] border-t",
          )}
        >
          {prompt}
        </div>
      )}
    </div>
  );
}

export { AIImage };
export type { AIImageProps, AIImageStatus };
