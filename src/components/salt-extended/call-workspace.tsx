"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  Lightbulb,
} from "lucide-react";
import * as React from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/salt-extended/resizable";
import { ScrollArea } from "@/components/salt-extended/scroll-area";
import { Skeleton, SkeletonText } from "@/components/salt-extended/skeleton";

import { Button } from "./button";

type PanelConfig = {
  collapsed: boolean;
  toggle: () => void;
  label: string;
  icon: React.ReactNode;
};

function PanelToggle({
  config,
  side,
}: {
  config: PanelConfig;
  side: "left" | "right";
}) {
  if (!config.collapsed) return null;
  return (
    <div className="flex h-full items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={config.toggle}
        className="h-auto flex-col gap-1 px-1 py-3 text-base"
        aria-label={`Expand ${config.label}`}
      >
        {side === "left" ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
        <span className="writing-mode-vertical [writing-mode:vertical-lr]">
          {config.label}
        </span>
      </Button>
    </div>
  );
}

function SkeletonPanel() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-5 w-2/3" />
      <div className="space-y-3">
        <SkeletonText lines={2} />
        <Skeleton className="h-20 w-full rounded-md" />
        <SkeletonText lines={3} />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </div>
  );
}

function PanelHeader({
  icon,
  label,
  onCollapse,
  side,
}: {
  icon: React.ReactNode;
  label: string;
  onCollapse?: () => void;
  side: "left" | "right";
}) {
  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-base font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
          {label}
        </span>
      </div>
      {onCollapse && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={onCollapse}
          aria-label={`Collapse ${label}`}
        >
          {side === "left" ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </Button>
      )}
    </div>
  );
}

export function CallWorkspace({
  callId,
  loading = false,
  metadataContent,
  transcriptContent,
  insightsContent,
}: {
  callId: string;
  loading?: boolean;
  metadataContent?: React.ReactNode;
  transcriptContent?: React.ReactNode;
  insightsContent?: React.ReactNode;
}) {
  const [metadataCollapsed, setMetadataCollapsed] = React.useState(false);
  const [insightsCollapsed, setInsightsCollapsed] = React.useState(false);

  const metadataRef = React.useRef<PanelImperativeHandle | null>(null);
  const insightsRef = React.useRef<PanelImperativeHandle | null>(null);

  const metadataPanel: PanelConfig = {
    collapsed: metadataCollapsed,
    toggle: () => metadataRef.current?.expand(),
    label: "Metadata",
    icon: <Info className="h-3.5 w-3.5" />,
  };

  const insightsPanel: PanelConfig = {
    collapsed: insightsCollapsed,
    toggle: () => insightsRef.current?.expand(),
    label: "Insights",
    icon: <Lightbulb className="h-3.5 w-3.5" />,
  };

  const handleMetadataResize = React.useCallback(
    (size: { asPercentage: number }) => {
      setMetadataCollapsed(size.asPercentage === 0);
    },
    [],
  );

  const handleInsightsResize = React.useCallback(
    (size: { asPercentage: number }) => {
      setInsightsCollapsed(size.asPercentage === 0);
    },
    [],
  );

  return (
    <div className="flex h-full">
      {/* Collapsed metadata toggle */}
      <PanelToggle config={metadataPanel} side="left" />

      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        {/* Metadata Panel (Left) */}
        <ResizablePanel
          panelRef={metadataRef}
          defaultSize="25"
          minSize="18"
          maxSize="35"
          collapsible
          collapsedSize="0"
          onResize={handleMetadataResize}
        >
          <div className="bg-[var(--salt-container-primary-background,theme(colors.background))] flex h-full flex-col">
            <PanelHeader
              icon={
                <Info className="h-3.5 w-3.5 text-[var(--salt-content-secondary-foreground)]" />
              }
              label="Metadata"
              onCollapse={() => metadataRef.current?.collapse()}
              side="left"
            />
            <ScrollArea className="flex-1">
              {loading ? (
                <SkeletonPanel />
              ) : (
                (metadataContent ?? <SkeletonPanel />)
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* Transcript Panel (Center) */}
        <ResizablePanel defaultSize="45" minSize="30">
          <div className="bg-[var(--salt-container-primary-background,theme(colors.background))] flex h-full flex-col">
            <PanelHeader
              icon={
                <FileText className="h-3.5 w-3.5 text-[var(--salt-content-secondary-foreground)]" />
              }
              label="Transcript"
              side="left"
            />
            <ScrollArea className="flex-1">
              {loading ? (
                <SkeletonPanel />
              ) : (
                (transcriptContent ?? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                    <FileText className="h-8 w-8 text-[var(--salt-content-secondary-foreground)]" />
                    <p className="text-base text-[var(--salt-content-secondary-foreground)]">
                      Call {callId} — Transcript will appear here
                    </p>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>

        {/* Insights Panel (Right) */}
        <ResizableHandle withHandle />
        <ResizablePanel
          panelRef={insightsRef}
          defaultSize="30"
          minSize="20"
          maxSize="45"
          collapsible
          collapsedSize="0"
          onResize={handleInsightsResize}
        >
          <div className="bg-[var(--salt-container-primary-background,theme(colors.background))] flex h-full flex-col">
            <PanelHeader
              icon={
                <Lightbulb className="h-3.5 w-3.5 text-[var(--salt-content-secondary-foreground)]" />
              }
              label="Insights"
              onCollapse={() => insightsRef.current?.collapse()}
              side="right"
            />
            <ScrollArea className="flex-1">
              {loading ? (
                <SkeletonPanel />
              ) : (
                (insightsContent ?? <SkeletonPanel />)
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Collapsed insights toggle */}
      <PanelToggle config={insightsPanel} side="right" />
    </div>
  );
}
