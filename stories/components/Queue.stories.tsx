import type { Meta, StoryObj } from "@storybook/nextjs";

import { Queue } from "@/components/salt-extended/queue";

const meta = {
  title: "Components/AI/Queue",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Queue
        items={[
          { id: "1", label: "Transcribe audio file", status: "completed" },
          { id: "2", label: "Extract speaker segments", status: "completed" },
          {
            id: "3",
            label: "Process NLP pipeline",
            status: "processing",
            progress: 67,
          },
          { id: "4", label: "Generate insights report", status: "queued" },
          { id: "5", label: "Send email notification", status: "queued" },
        ]}
      />
    </div>
  ),
};
