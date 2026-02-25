import type { Meta, StoryObj } from "@storybook/nextjs";

import { ModelSelector } from "@/components/salt-extended/model-selector";

const meta = {
  title: "Components/AI/ModelSelector",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const models = [
  { id: "insight-pro", name: "Insight Pro", provider: "SaltAI" },
  {
    id: "insight-fast",
    name: "Insight Fast",
    provider: "SaltAI",
  },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gemini-2-pro", name: "Gemini 2 Pro", provider: "Google" },
];

export const Default: Story = {
  render: () => <ModelSelector models={models} />,
};

export const WithSelection: Story = {
  name: "With Selection",
  render: () => <ModelSelector models={models} value="insight-pro" />,
};
