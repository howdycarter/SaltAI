"use client";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "flex h-10 items-center space-x-1 rounded-md border p-1",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        className,
      )}
      {...props}
    />
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default items-center rounded-sm px-3 py-1.5 text-base font-medium outline-none select-none",
        "focus:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "focus:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "data-[state=open]:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "data-[state=open]:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
          "bg-[var(--salt-container-primary-background,theme(colors.popover.DEFAULT))]",
          "text-[var(--salt-content-primary-foreground,theme(colors.popover.foreground))]",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
}

function MenubarItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      className={cn(
        "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-base outline-none select-none",
        "focus:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "focus:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-base outline-none select-none",
        "focus:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "focus:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-base outline-none select-none",
        "focus:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "focus:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      className={cn(
        "px-2 py-1.5 text-base font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn(
        "-mx-1 my-1 h-px",
        "bg-[var(--salt-separable-primary-borderColor,theme(colors.muted.DEFAULT))]",
        className,
      )}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-base tracking-widest",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      className={cn(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-base outline-none select-none",
        "focus:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "focus:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        "data-[state=open]:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
        "bg-[var(--salt-container-primary-background,theme(colors.popover.DEFAULT))]",
        "text-[var(--salt-content-primary-foreground,theme(colors.popover.foreground))]",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
