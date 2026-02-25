import type { Meta, StoryObj } from "@storybook/nextjs";

import { SchemaDisplay } from "@/components/salt-extended/schema-display";

const meta = {
  title: "Components/AI/SchemaDisplay",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <SchemaDisplay
        name="CallRecord"
        fields={[
          {
            name: "id",
            type: "string",
            required: true,
            description: "Unique identifier",
          },
          {
            name: "caller",
            type: "object",
            required: true,
            children: [
              { name: "name", type: "string", required: true },
              { name: "phone", type: "string" },
            ],
          },
          {
            name: "duration",
            type: "number",
            description: "Duration in seconds",
          },
          { name: "tags", type: "string[]" },
          {
            name: "metadata",
            type: "object",
            children: [
              { name: "source", type: "string" },
              {
                name: "priority",
                type: "enum",
                description: "low | medium | high",
              },
            ],
          },
        ]}
      />
    </div>
  ),
};
