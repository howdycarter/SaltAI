import type { Meta, StoryObj } from "@storybook/nextjs";

import { TaskList } from "@/components/salt-extended/task-item";

const meta = {
  title: "Components/AI/TaskList",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <TaskList
        tasks={[
          { id: "1", label: "Parse call transcript", status: "completed" },
          { id: "2", label: "Extract key entities", status: "completed" },
          {
            id: "3",
            label: "Analyze sentiment",
            status: "in_progress",
            description: "Processing 47 utterances...",
          },
          { id: "4", label: "Generate summary", status: "pending" },
          { id: "5", label: "Create action items", status: "pending" },
        ]}
      />
    </div>
  ),
};

export const WithFailure: Story = {
  name: "With Failed Task",
  render: () => (
    <div className="w-[400px]">
      <TaskList
        tasks={[
          { id: "1", label: "Connect to API", status: "completed" },
          {
            id: "2",
            label: "Fetch data",
            status: "failed",
            description: "Timeout after 30s",
          },
          { id: "3", label: "Process results", status: "pending" },
        ]}
      />
    </div>
  ),
};
