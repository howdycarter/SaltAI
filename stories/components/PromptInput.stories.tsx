import type { Meta, StoryObj } from "@storybook/nextjs";

import { PromptInput } from "@/components/salt-extended/prompt-input";

const meta = {
  title: "Components/AI/PromptInput",
  component: PromptInput,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <PromptInput placeholder="Ask about this call..." />
    </div>
  ),
};

export const WithActions: Story = {
  name: "With Extra Actions",
  render: () => (
    <div className="w-[500px]">
      <PromptInput
        placeholder="Type a message..."
        actions={
          <button
            type="button"
            className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
            aria-label="Attach file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
        }
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[500px]">
      <PromptInput placeholder="AI is responding..." disabled />
    </div>
  ),
};
