import type { Meta, StoryObj } from "@storybook/nextjs";

import { AIQueryCard } from "@/components/salt-extended/ai-query-card";

const meta = {
  title: "Cards/AIQueryCard",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "With Suggestions",
  render: () => (
    <div className="w-[480px]">
      <AIQueryCard
        title="Ask about today's metrics"
        placeholder="Ask TorqueAI about your dashboard..."
        suggestions={[
          "Why is Transfer Rate up?",
          "Which LOB drives AHT?",
          "Show me FCR trends",
        ]}
        onSubmit={(query) => console.log("Submitted:", query)}
      />
    </div>
  ),
};

export const WithoutSuggestions: Story = {
  name: "Without Suggestions",
  render: () => (
    <div className="w-[480px]">
      <AIQueryCard
        title="Ask a question"
        placeholder="Type your question here..."
        suggestions={[]}
        onSubmit={(query) => console.log("Submitted:", query)}
      />
    </div>
  ),
};
