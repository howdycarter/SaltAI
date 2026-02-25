"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        "bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))]",
        className,
      )}
      {...props}
    />
  );
}

function SkeletonCircle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Skeleton
      data-slot="skeleton-circle"
      className={cn("size-10 rounded-full", className)}
      {...props}
    />
  );
}

function SkeletonText({
  lines = 3,
  className,
  ...props
}: React.ComponentProps<"div"> & { lines?: number }) {
  return (
    <div
      data-slot="skeleton-text"
      className={cn("space-y-2", className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCircle, SkeletonText };
