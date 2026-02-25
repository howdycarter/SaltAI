import type { Meta, StoryObj } from "@storybook/nextjs";
import { ExternalLink, Quote } from "lucide-react";

const meta = {
  title: "Patterns/Evidence Excerpt",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ExcerptProps = {
  callId: string;
  timestamp: string;
  speaker: "Customer" | "Agent";
  text: string;
  topic: string;
};

function EvidenceExcerpt({
  callId,
  timestamp,
  speaker,
  text,
  topic,
}: ExcerptProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Quote className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-medium">{callId}</span>
          <span className="text-muted-foreground text-xs">{timestamp}</span>
        </div>
        <button className="text-blue-600 hover:underline">
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm leading-relaxed">
        <span className="font-medium">{speaker}:</span> {text}
      </p>
      <div className="mt-2">
        <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
          {topic}
        </span>
      </div>
    </div>
  );
}

export const Single: Story = {
  render: () => (
    <div className="max-w-lg">
      <EvidenceExcerpt
        callId="CRD-0147832"
        timestamp="2:14"
        speaker="Customer"
        text="I've been trying to log in for the past hour. Every time I enter my password it says it's incorrect, but I know it's right. I just changed it yesterday."
        topic="Login Failures"
      />
    </div>
  ),
};

export const ExcerptList: Story = {
  name: "Multiple Excerpts",
  render: () => (
    <div className="max-w-lg space-y-3">
      <EvidenceExcerpt
        callId="CRD-0147832"
        timestamp="2:14"
        speaker="Customer"
        text="I've been trying to log in for the past hour. Every time I enter my password it says it's incorrect."
        topic="Login Failures"
      />
      <EvidenceExcerpt
        callId="CRD-0147836"
        timestamp="1:03"
        speaker="Agent"
        text="I can see that your account was flagged by our fraud detection system. Let me verify your identity and we can resolve this."
        topic="Fraud Alerts"
      />
      <EvidenceExcerpt
        callId="CRD-0147834"
        timestamp="5:22"
        speaker="Customer"
        text="I was charged twice for the same transaction. One charge on the 15th and another on the 16th for the exact same amount."
        topic="Fee Disputes"
      />
    </div>
  ),
};
