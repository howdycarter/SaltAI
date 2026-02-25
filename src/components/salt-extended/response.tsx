"use client";

import { motion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type ResponseProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

function Response({ text, speed = 20, className, onComplete }: ResponseProps) {
  const [displayed, setDisplayed] = React.useState("");
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <motion.div
      data-slot="response"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "prose prose-sm max-w-none",
        "text-[var(--salt-content-primary-foreground,theme(colors.foreground))]",
        className,
      )}
    >
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse text-[var(--salt-actionable-cta-background,#0060f0)]">
          |
        </span>
      )}
    </motion.div>
  );
}

export { Response };
