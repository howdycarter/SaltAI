import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  ArrowRight,
  Download,
  MessageSquare,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/salt-extended/button";
import { Kbd } from "@/components/salt-extended/kbd";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/salt-extended/sheet";
import { Skeleton, SkeletonText } from "@/components/salt-extended/skeleton";

const meta = {
  title: "Patterns/Insights Application/NLQI Popup",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function ScopeSummary() {
  return (
    <div className="bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] flex flex-wrap items-center gap-1.5 rounded-md px-3 py-2 text-[11px]">
      <span className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] font-medium">
        Scope:
      </span>
      <span>Card Services</span>
      <span className="opacity-40">·</span>
      <span>Last 7 Days</span>
      <span className="opacity-40">·</span>
      <span>General Inquiry</span>
    </div>
  );
}

function TabBar({ activeTab }: { activeTab: string }) {
  const tabs = ["Conversation", "Top Questions", "Top Themes"];
  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] flex gap-1 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-2 text-xs font-medium transition-colors ${
            tab === activeTab
              ? "border-b-2 border-[var(--salt-actionable-cta-background,#0060f0)] text-[var(--salt-actionable-cta-background,#0060f0)]"
              : "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:text-[var(--salt-content-primary-foreground)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function InputBar() {
  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] flex items-center gap-2 rounded-md border px-3 py-2">
      <Search className="h-4 w-4 text-[var(--salt-content-secondary-foreground)]" />
      <input
        type="text"
        placeholder="Ask a question about your data..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--salt-content-secondary-foreground)]"
      />
      <div className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    </div>
  );
}

function ActionBar() {
  return (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] flex items-center justify-between border-t pt-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
          <Download className="h-3 w-3" />
          Export
        </Button>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
          <Share2 className="h-3 w-3" />
          Share
        </Button>
      </div>
      <span className="text-[10px] text-[var(--salt-content-secondary-foreground)]">
        Powered by TorqueAI
      </span>
    </div>
  );
}

function SheetShell({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Ask TorqueAI
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-4 sm:max-w-lg"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--salt-actionable-cta-background,#0060f0)]" />
          <span className="text-sm font-semibold">Ask TorqueAI</span>
        </div>
        <ScopeSummary />
        {children}
        <ActionBar />
      </SheetContent>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Empty: Story = {
  render: () => (
    <SheetShell>
      <TabBar activeTab="Conversation" />
      <InputBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="bg-[var(--salt-container-secondary-background,theme(colors.accent.DEFAULT))] rounded-full p-3">
          <MessageSquare className="h-6 w-6 text-[var(--salt-content-secondary-foreground)]" />
        </div>
        <div>
          <p className="text-sm font-medium">No conversation yet</p>
          <p className="mt-1 text-xs text-[var(--salt-content-secondary-foreground)]">
            Ask a question about your call data to get started.
          </p>
        </div>
        <div className="mt-2 space-y-1.5">
          <p className="text-[10px] font-medium tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
            Suggestions
          </p>
          {[
            "Why are login failures up this week?",
            "Show me the top emerging topics",
            "Compare Card Services vs Banking sentiment",
          ].map((q) => (
            <button
              key={q}
              className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs hover:bg-[var(--salt-container-secondary-background)]"
            >
              <ArrowRight className="h-3 w-3 opacity-40" />
              {q}
            </button>
          ))}
        </div>
      </div>
    </SheetShell>
  ),
};

export const WithResponse: Story = {
  name: "With Response",
  render: () => (
    <SheetShell>
      <TabBar activeTab="Conversation" />
      <InputBar />
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg bg-[var(--salt-actionable-cta-background,#0060f0)] px-3 py-2 text-xs text-white">
            Why are login failures up this week?
          </div>
        </div>

        {/* AI response — five-part answer */}
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] space-y-3 rounded-lg border p-3">
          {/* 1. Summary */}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
              Summary
            </p>
            <p className="mt-1 text-xs leading-relaxed">
              Login failure calls increased 42% week-over-week, primarily driven
              by the mobile app update (v3.2.1) deployed on Jan 14. The majority
              of impacted customers are on iOS devices experiencing biometric
              authentication errors.
            </p>
          </div>

          {/* 2. Key Findings */}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
              Key Findings
            </p>
            <ul className="mt-1 space-y-1 text-xs">
              <li className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--salt-content-primary-foreground)]" />
                Mobile app v3.2.1 introduced a Face ID regression on iOS 17+
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--salt-content-primary-foreground)]" />
                85% of affected callers are Card Services customers
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--salt-content-primary-foreground)]" />
                Average handle time increased from 4.2 min to 7.8 min
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--salt-content-primary-foreground)]" />
                Engineering hotfix (v3.2.2) deployed Jan 17 — early signals
                positive
              </li>
            </ul>
          </div>

          {/* 3. Evidence Excerpts */}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
              Evidence Excerpts
            </p>
            <div className="mt-1 space-y-1.5">
              <blockquote className="border-l-2 border-[var(--salt-container-borderColor)] pl-2 text-xs text-[var(--salt-content-secondary-foreground)] italic">
                &quot;I updated the app yesterday and now Face ID doesn&apos;t
                work at all.&quot;
              </blockquote>
              <blockquote className="border-l-2 border-[var(--salt-container-borderColor)] pl-2 text-xs text-[var(--salt-content-secondary-foreground)] italic">
                &quot;It keeps telling me my password is wrong but I just reset
                it.&quot;
              </blockquote>
            </div>
          </div>

          {/* 4. Metrics */}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
              Metrics
            </p>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {[
                { label: "Call Volume", value: "1,247", delta: "+42%" },
                { label: "Avg Handle Time", value: "7.8 min", delta: "+86%" },
                { label: "CSAT Impact", value: "3.1", delta: "-0.8" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-md bg-[var(--salt-container-secondary-background)] p-2 text-center"
                >
                  <p className="text-[10px] text-[var(--salt-content-secondary-foreground)]">
                    {m.label}
                  </p>
                  <p className="text-sm font-semibold">{m.value}</p>
                  <p className="text-[10px] text-red-500">{m.delta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Suggested Follow-ups */}
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-[var(--salt-content-secondary-foreground)] uppercase">
              Suggested Follow-ups
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[
                "Show impact by device type",
                "Compare with last month",
                "What are agents saying?",
              ].map((q) => (
                <button
                  key={q}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--salt-container-borderColor)] px-2.5 py-1 text-[11px] hover:bg-[var(--salt-container-secondary-background)]"
                >
                  <TrendingUp className="h-3 w-3 opacity-50" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SheetShell>
  ),
};

export const Loading: Story = {
  render: () => (
    <SheetShell>
      <TabBar activeTab="Conversation" />
      <InputBar />
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg bg-[var(--salt-actionable-cta-background,#0060f0)] px-3 py-2 text-xs text-white">
            Why are login failures up this week?
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] space-y-3 rounded-lg border p-3">
          <div>
            <Skeleton className="mb-2 h-3 w-16" />
            <SkeletonText lines={2} />
          </div>
          <div>
            <Skeleton className="mb-2 h-3 w-24" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
          <div>
            <Skeleton className="mb-2 h-3 w-28" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
            </div>
          </div>
          <div>
            <Skeleton className="mb-2 h-3 w-32" />
            <div className="flex gap-1.5">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </SheetShell>
  ),
};
