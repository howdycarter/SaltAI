"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MessageVariant = "user" | "assistant";

type MessageProps = Omit<React.ComponentProps<"div">, "role"> & {
  variant?: MessageVariant;
};

function Message({ variant = "user", className, ...props }: MessageProps) {
  return (
    <div
      data-slot="message"
      data-role={variant}
      className={cn(
        "flex gap-3",
        variant === "user" ? "flex-row-reverse" : "flex-row",
        className,
      )}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-semibold",
        "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
        "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function MessageContent({
  className,
  variant = "assistant",
  ...props
}: Omit<React.ComponentProps<"div">, "role"> & { variant?: MessageVariant }) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "max-w-[80%] rounded-lg px-4 py-2.5 text-base leading-relaxed",
        variant === "user"
          ? "bg-[var(--salt-actionable-cta-background,#0060f0)] text-white"
          : cn(
              "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]",
              "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
            ),
        className,
      )}
      {...props}
    />
  );
}

export { Message, MessageAvatar, MessageContent, type MessageVariant };
