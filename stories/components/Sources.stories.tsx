import type { Meta, StoryObj } from "@storybook/nextjs";

import { Sources } from "@/components/salt-extended/sources";

const meta = {
  title: "Components/AI/Sources",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSources = [
  {
    title: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
    description: "The original transformer paper",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    url: "https://arxiv.org/abs/1810.04805",
    description: "Bidirectional encoder representations",
  },
  {
    title: "GPT-4 Technical Report",
    url: "https://openai.com/research/gpt-4",
    description: "OpenAI GPT-4 capabilities and limitations",
  },
];

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Sources sources={sampleSources} />
    </div>
  ),
};

export const OpenByDefault: Story = {
  name: "Open By Default",
  render: () => (
    <div className="w-[400px]">
      <Sources sources={sampleSources} defaultOpen />
    </div>
  ),
};

export const SingleSource: Story = {
  name: "Single Source",
  render: () => (
    <div className="w-[400px]">
      <Sources sources={[sampleSources[0]]} defaultOpen />
    </div>
  ),
};
