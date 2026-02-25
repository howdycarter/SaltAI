"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border p-4 shadow-md outline-none",
        "bg-[var(--salt-container-primary-background,theme(colors.popover.DEFAULT))]",
        "text-[var(--salt-content-primary-foreground,theme(colors.popover.foreground))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
