import type { Meta, StoryObj } from "@storybook/nextjs";

import { InlineCitation } from "@/components/salt-extended/inline-citation";

const meta = {
  title: "Components/AI/InlineCitation",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <p className="max-w-md text-sm">
      Large language models have shown remarkable capabilities in natural
      language understanding
      <InlineCitation
        index={1}
        title="Attention Is All You Need"
        description="Vaswani et al., 2017"
        url="https://arxiv.org/abs/1706.03762"
      />{" "}
      and generation tasks
      <InlineCitation
        index={2}
        title="Language Models are Few-Shot Learners"
        description="Brown et al., 2020"
      />
      .
    </p>
  ),
};

export const NumberOnly: Story = {
  name: "Number Only",
  render: () => (
    <p className="text-sm">
      This claim needs a source
      <InlineCitation index={3} />.
    </p>
  ),
};

export const MultipleCitations: Story = {
  name: "Multiple Citations",
  render: () => (
    <p className="max-w-md text-sm">
      Studies show improved performance
      <InlineCitation
        index={1}
        title="Study A"
        description="Results from 2024 analysis"
      />
      <InlineCitation
        index={2}
        title="Study B"
        description="Confirmatory findings"
      />
      <InlineCitation
        index={3}
        title="Study C"
        description="Meta-analysis overview"
      />{" "}
      across all benchmarks.
    </p>
  ),
};
