import type { Meta, StoryObj } from "@storybook/nextjs";
import { FileSearch, Inbox, Search } from "lucide-react";

import { Button } from "@/components/salt-extended/button";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/salt-extended/empty-state";

const meta = {
  title: "Components/Feedback & Input/Empty State",
  component: EmptyState,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon>
        <Inbox />
      </EmptyStateIcon>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Your current filters returned no call records. Try adjusting the date
        range or LOB selection.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const WithAction: Story = {
  name: "With Action",
  render: () => (
    <EmptyState>
      <EmptyStateIcon>
        <Search />
      </EmptyStateIcon>
      <EmptyStateTitle>Start a new investigation</EmptyStateTitle>
      <EmptyStateDescription>
        Ask TorqueAI a question to begin exploring call data across Card
        Services, Banking, and more.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button>Open TorqueAI</Button>
        <Button variant="outline">Browse Topics</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const NoAlerts: Story = {
  name: "No Alerts",
  render: () => (
    <EmptyState className="min-h-[250px]">
      <EmptyStateIcon>
        <FileSearch />
      </EmptyStateIcon>
      <EmptyStateTitle>No alerts configured</EmptyStateTitle>
      <EmptyStateDescription>
        Set up threshold-based or emerging-topic alerts to get notified when
        call patterns change.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button size="sm">Create Alert</Button>
      </EmptyStateAction>
    </EmptyState>
  ),
};
