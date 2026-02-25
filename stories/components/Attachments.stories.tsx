import type { Meta, StoryObj } from "@storybook/nextjs";

import { Attachments } from "@/components/salt-extended/attachments";

const meta = {
  title: "Components/AI/Attachments",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Attachments
        files={[
          { id: "1", name: "report.pdf", size: 245000 },
          { id: "2", name: "data.csv", size: 12400 },
          { id: "3", name: "screenshot.png", size: 890000 },
        ]}
        onRemove={(id) => console.log("remove", id)}
      />
    </div>
  ),
};

export const WithProgress: Story = {
  name: "With Upload Progress",
  render: () => (
    <div className="w-[500px]">
      <Attachments
        files={[
          { id: "1", name: "large-file.zip", size: 52000000, progress: 65 },
          { id: "2", name: "done.txt", size: 1200, progress: 100 },
        ]}
        onRemove={(id) => console.log("remove", id)}
      />
    </div>
  ),
};
