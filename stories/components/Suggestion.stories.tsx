import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Suggestion,
  SuggestionGroup,
} from "@/components/salt-extended/suggestion";

const meta = {
  title: "Components/AI/Suggestion",
  component: Suggestion,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Suggestion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SuggestionGroup>
      <Suggestion>Tell me about this call</Suggestion>
      <Suggestion>Summarize key points</Suggestion>
      <Suggestion>What were the action items?</Suggestion>
      <Suggestion>Identify sentiment changes</Suggestion>
    </SuggestionGroup>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <SuggestionGroup>
      <Suggestion icon={<span>💡</span>}>Suggest improvements</Suggestion>
      <Suggestion icon={<span>📊</span>}>Show analytics</Suggestion>
      <Suggestion icon={<span>🔍</span>}>Deep dive</Suggestion>
    </SuggestionGroup>
  ),
};

export const Single: Story = {
  render: () => <Suggestion>What happened in this call?</Suggestion>,
};
