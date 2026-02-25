import type { Meta, StoryObj } from "@storybook/nextjs";

import { EnvironmentVariables } from "@/components/salt-extended/environment-variables";

const meta = {
  title: "Components/AI/EnvironmentVariables",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <EnvironmentVariables
        variables={[
          { name: "NODE_ENV", value: "production" },
          {
            name: "DATABASE_URL",
            value: "postgres://user:pass@host/db",
            masked: true,
          },
          { name: "API_KEY", value: "sk-1234567890abcdef", masked: true },
          { name: "PORT", value: "3000" },
          { name: "LOG_LEVEL", value: "info" },
        ]}
      />
    </div>
  ),
};
