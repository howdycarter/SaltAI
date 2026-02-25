"use client";

import { PanelLeft } from "lucide-react";
import * as React from "react";

import { Sheet, SheetContent } from "@/components/salt-extended/sheet";
import { cn } from "@/lib/utils";

import { Button } from "./button";

const SIDEBAR_WIDTH = "12rem";
const SIDEBAR_WIDTH_COLLAPSED = "3.5rem";

type SidebarContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContext>({
  open: false,
  setOpen: () => {},
  collapsed: false,
  setCollapsed: () => {},
  isMobile: false,
});

function useSidebar() {
  return React.useContext(SidebarContext);
}

function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, collapsed, setCollapsed, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { open, setOpen, collapsed, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[var(--sidebar-width)] p-0">
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed}
      className={cn(
        "flex h-full flex-col border-r transition-[width] duration-200",
        "bg-[var(--salt-container-primary-background,theme(colors.background))]",
        "border-[var(--salt-container-borderColor,theme(colors.border))]",
        collapsed
          ? "w-[var(--sidebar-width-collapsed)]"
          : "w-[var(--sidebar-width)]",
        className,
      )}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-collapsed": SIDEBAR_WIDTH_COLLAPSED,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex items-center gap-2 border-b p-4", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-auto py-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex items-center border-t p-4", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("px-3 py-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "mb-2 px-2 text-base font-semibold tracking-wider uppercase",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function SidebarItem({
  className,
  active,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      data-slot="sidebar-item"
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-base font-medium transition-colors",
        "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))]",
        "hover:bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))]",
        "hover:text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        active &&
          "bg-[var(--salt-actionable-secondary-background-hover,theme(colors.accent.DEFAULT))] text-[var(--salt-content-primary-foreground,theme(colors.accent.foreground))]",
        className,
      )}
      {...props}
    />
  );
}

function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { isMobile, open, setOpen, collapsed, setCollapsed } = useSidebar();

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={() => (isMobile ? setOpen(!open) : setCollapsed(!collapsed))}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
