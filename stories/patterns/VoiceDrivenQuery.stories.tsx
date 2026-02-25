import type { Meta, StoryObj } from "@storybook/nextjs";
import { Keyboard, Mic } from "lucide-react";

import { PromptInput } from "@/components/salt-extended/prompt-input";
import { Suggestion } from "@/components/salt-extended/suggestion";
import { VoiceQueryMode } from "@/components/salt-extended/voice-query-mode";

const meta = {
  title: "Patterns/Voice Driven Query",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------------------ */
/*  Inline helpers                                                     */
/* ------------------------------------------------------------------ */

function ModeTab({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-t-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-b-2 border-[var(--salt-actionable-cta-background,#0060f0)] text-[var(--salt-actionable-cta-background,#0060f0)]"
          : "text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] hover:text-[var(--salt-content-primary-foreground,theme(colors.foreground))]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] w-[480px] rounded-xl border shadow-lg">
      {/* Header */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-b px-5 pt-4 pb-0">
        <h2 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] mb-3 text-sm font-semibold">
          Ask TorqueAI
        </h2>
        <div className="flex gap-1">
          <ModeTab
            icon={<Mic className="h-3.5 w-3.5" />}
            label="Voice"
            active
          />
          <ModeTab icon={<Keyboard className="h-3.5 w-3.5" />} label="Text" />
        </div>
      </div>

      {/* Voice mode */}
      <div className="flex flex-col items-center gap-6 px-5 py-8">
        <VoiceQueryMode onTranscript={() => {}} onSubmit={() => {}} />

        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] w-full border-t pt-4">
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-2 text-center text-[10px] font-medium tracking-wider uppercase">
            Or try a suggestion
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Suggestion onClick={() => {}}>Why is AHT trending up?</Suggestion>
            <Suggestion onClick={() => {}}>Top call drivers today</Suggestion>
            <Suggestion onClick={() => {}}>Compare week over week</Suggestion>
          </div>
        </div>
      </div>

      {/* Text fallback */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-t p-4">
        <PromptInput placeholder="Or type your question here..." />
      </div>
    </div>
  ),
};

export const TextMode: Story = {
  name: "Text Mode Active",
  render: () => (
    <div className="border-[var(--salt-container-borderColor,theme(colors.border))] bg-[var(--salt-container-primary-background,theme(colors.background))] w-[480px] rounded-xl border shadow-lg">
      {/* Header */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] border-b px-5 pt-4 pb-0">
        <h2 className="text-[var(--salt-content-primary-foreground,theme(colors.foreground))] mb-3 text-sm font-semibold">
          Ask TorqueAI
        </h2>
        <div className="flex gap-1">
          <ModeTab icon={<Mic className="h-3.5 w-3.5" />} label="Voice" />
          <ModeTab
            icon={<Keyboard className="h-3.5 w-3.5" />}
            label="Text"
            active
          />
        </div>
      </div>

      {/* Text input */}
      <div className="space-y-4 p-5">
        <PromptInput placeholder="Ask a question about your data..." />
        <div>
          <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] mb-2 text-[10px] font-medium tracking-wider uppercase">
            Suggestions
          </p>
          <div className="flex flex-wrap gap-2">
            <Suggestion onClick={() => {}}>Why is AHT trending up?</Suggestion>
            <Suggestion onClick={() => {}}>Top call drivers today</Suggestion>
            <Suggestion onClick={() => {}}>Compare week over week</Suggestion>
          </div>
        </div>
      </div>

      {/* Voice fallback */}
      <div className="border-[var(--salt-container-borderColor,theme(colors.border))] flex items-center justify-center border-t py-4">
        <VoiceQueryMode onTranscript={() => {}} onSubmit={() => {}} />
      </div>
    </div>
  ),
};
