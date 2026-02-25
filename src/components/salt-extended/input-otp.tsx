"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput>) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  if (!slot) return null;
  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r text-base font-medium transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        "border-[var(--salt-editable-borderColor,theme(colors.input))]",
        isActive &&
          "ring-[var(--salt-focused-outline-color,theme(colors.ring))] ring-offset-background z-10 ring-2",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-[var(--salt-content-primary-foreground,theme(colors.foreground))] h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Minus />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
