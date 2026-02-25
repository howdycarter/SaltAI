import type { Meta, StoryObj } from "@storybook/nextjs";

import { Persona } from "@/components/salt-extended/persona";

const meta = {
  title: "Components/AI/Persona",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[350px]">
      <Persona
        name="SaltAI"
        jobRole="Call Analysis Assistant"
        capabilities={[
          "Transcription",
          "Sentiment Analysis",
          "Summarization",
          "Action Items",
        ]}
      />
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="w-[350px]">
      <Persona name="Atlas" jobRole="General Assistant" />
    </div>
  ),
};
