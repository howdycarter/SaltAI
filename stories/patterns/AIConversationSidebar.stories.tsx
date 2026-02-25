import type { Meta, StoryObj } from "@storybook/nextjs";
import { BarChart3, Bell, LayoutDashboard, Sparkles } from "lucide-react";

import {
  AISidebar,
  AISidebarTrigger,
} from "@/components/salt-extended/ai-sidebar";
import { PromptInput } from "@/components/salt-extended/prompt-input";
import { Suggestion } from "@/components/salt-extended/suggestion";
import { AIProvider } from "@/lib/ai-context";

const meta = {
  title: "Patterns/AI Conversation Sidebar",
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <AIProvider>
        <Story />
      </AIProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Inline helpers                                                     */
/* ------------------------------------------------------------------ */

function MockNavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
        active
          ? "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]"
          : "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))]"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function MockPageContent() {
  return (
    <div className="bg-[var(--salt-container-primary-background,theme(colors.background))] flex h-screen">
      {/* Sidebar nav */}
      <aside className="border-[var(--salt-container-borderColor,theme(colors.border))] flex w-56 shrink-0 flex-col gap-1 border-r p-3">
        <div className="mb-4 flex items-center gap-2 px-3 py-2">
          <Sparkles className="h-5 w-5 text-[var(--salt-actionable-cta-background,#0060f0)]" />
          <span className="text-sm font-bold">SaltAI</span>
        </div>
        <MockNavItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          label="Dashboard"
          active
        />
        <MockNavItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Call Review"
        />
        <MockNavItem icon={<Bell className="h-4 w-4" />} label="Alerts" />
      </aside>

      {/* Main content area */}
      <main className="flex flex-1 flex-col">
        <header className="border-[var(--salt-container-borderColor,theme(colors.border))] flex items-center justify-between border-b px-6 py-4">
          <h1 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] text-lg font-semibold">
            Dashboard
          </h1>
          <span className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-xs">
            Last 7 Days
          </span>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="mx-auto grid w-fit grid-cols-3 gap-4">
              {[
                { label: "Total Calls", value: "12,483" },
                { label: "Avg Handle Time", value: "5.2 min" },
                { label: "CSAT", value: "4.1" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))] rounded-lg border px-6 py-4 text-center"
                >
                  <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-xs">
                    {kpi.label}
                  </p>
                  <p className="mt-1 text-xl font-bold">{kpi.value}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-sm">
              Click the floating button to open the AI assistant
            </p>
          </div>
        </div>
      </main>

      {/* AI Sidebar + Trigger */}
      <AISidebar />
      <AISidebarTrigger />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => <MockPageContent />,
};
