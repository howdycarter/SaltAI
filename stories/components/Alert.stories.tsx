import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertCircle, CheckCircle, Info, TriangleAlert } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/salt-extended/alert";

const meta = {
  title: "Components/Feedback & Input/Alert",
  component: Alert,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Info",
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>New data available</AlertTitle>
      <AlertDescription>
        Call volume data for Card Services has been refreshed as of 9:15 AM EST.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Investigation saved</AlertTitle>
      <AlertDescription>
        Your TorqueAI investigation &quot;Login Failure Spike — Dec 2025&quot;
        has been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Emerging topic detected</AlertTitle>
      <AlertDescription>
        &quot;Mobile App Crash — iOS 18.2&quot; has risen 240% in the past 24
        hours across Card Services.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  name: "Error",
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Data pipeline failure</AlertTitle>
      <AlertDescription>
        Transcription pipeline for queue &quot;Fraud Alerts&quot; has been down
        since 7:42 AM. Contact MLIO support.
      </AlertDescription>
    </Alert>
  ),
};
