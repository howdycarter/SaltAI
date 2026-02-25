"use client";

import { motion, useInView } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type ShimmeringTextProps = {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
};

function ShimmeringText({
  children,
  className,
  as: Tag = "span",
}: ShimmeringTextProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Tag
      ref={ref}
      data-slot="shimmering-text"
      className={cn("relative inline-block", className)}
    >
      <motion.span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: isInView
            ? "linear-gradient(90deg, var(--salt-content-primary-foreground, #141414) 0%, var(--salt-actionable-cta-background, #0060f0) 50%, var(--salt-content-primary-foreground, #141414) 100%)"
            : "none",
          backgroundSize: "200% 100%",
          color: isInView ? "transparent" : "inherit",
        }}
        animate={
          isInView ? { backgroundPosition: ["200% 0%", "-200% 0%"] } : {}
        }
        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export { ShimmeringText };
