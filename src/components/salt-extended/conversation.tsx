"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ConversationProps = React.ComponentProps<"div"> & {
  autoScroll?: boolean;
};

function Conversation({
  autoScroll = true,
  className,
  children,
  ...props
}: ConversationProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = React.useState(true);

  React.useEffect(() => {
    if (autoScroll && isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [children, autoScroll, isAtBottom]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const threshold = 50;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < threshold);
  };

  return (
    <div
      ref={containerRef}
      data-slot="conversation"
      className={cn("flex flex-col gap-4 overflow-y-auto p-4", className)}
      onScroll={handleScroll}
      {...props}
    >
      {children}
      <div ref={bottomRef} />
    </div>
  );
}

export { Conversation };
