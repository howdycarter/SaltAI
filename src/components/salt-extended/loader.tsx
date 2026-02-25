"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface LoaderProps extends React.ComponentProps<"div"> {
  variant?: "dots" | "spinner" | "pulse";
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" } as const;
const dotSizeMap = { sm: "size-1", md: "size-1.5", lg: "size-2" } as const;

function Loader({
  className,
  variant = "dots",
  size = "md",
  ...props
}: LoaderProps) {
  if (variant === "spinner")
    return <LoaderSpinner className={className} size={size} {...props} />;
  if (variant === "pulse")
    return <LoaderPulse className={className} size={size} {...props} />;
  return <LoaderDots className={className} size={size} {...props} />;
}

function LoaderDots({
  className,
  size = "md",
  ...props
}: Omit<LoaderProps, "variant">) {
  return (
    <div
      data-slot="loader-dots"
      role="status"
      aria-label="Loading"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "animate-bounce rounded-full",
            "bg-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
            dotSizeMap[size],
          )}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

function LoaderSpinner({
  className,
  size = "md",
  ...props
}: Omit<LoaderProps, "variant">) {
  return (
    <div
      data-slot="loader-spinner"
      role="status"
      aria-label="Loading"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <svg
        className={cn(
          "animate-spin",
          sizeMap[size],
          "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        )}
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
    </div>
  );
}

function LoaderPulse({
  className,
  size = "md",
  ...props
}: Omit<LoaderProps, "variant">) {
  return (
    <div
      data-slot="loader-pulse"
      role="status"
      aria-label="Loading"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "animate-pulse rounded-full",
          "bg-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
          sizeMap[size],
        )}
      />
    </div>
  );
}

export { Loader, LoaderDots, LoaderSpinner };
