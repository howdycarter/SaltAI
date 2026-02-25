import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/salt-extended/data-table";

const meta = {
  title: "Components/Data Display/Data Table",
  component: Table,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const calls = [
  {
    id: "CRD-0147832",
    topic: "Login Failures",
    duration: "4:32",
    lob: "Card Services",
    sentiment: "Negative",
    date: "2025-12-18",
  },
  {
    id: "CRD-0147833",
    topic: "Balance Inquiry",
    duration: "2:15",
    lob: "Card Services",
    sentiment: "Neutral",
    date: "2025-12-18",
  },
  {
    id: "CRD-0147834",
    topic: "Fee Dispute",
    duration: "8:47",
    lob: "Card Services",
    sentiment: "Negative",
    date: "2025-12-17",
  },
  {
    id: "CRD-0147835",
    topic: "Card Activation",
    duration: "1:58",
    lob: "Banking",
    sentiment: "Positive",
    date: "2025-12-17",
  },
  {
    id: "CRD-0147836",
    topic: "Fraud Alert",
    duration: "6:12",
    lob: "Card Services",
    sentiment: "Negative",
    date: "2025-12-16",
  },
  {
    id: "CRD-0147837",
    topic: "Reward Points",
    duration: "3:44",
    lob: "Card Services",
    sentiment: "Positive",
    date: "2025-12-16",
  },
  {
    id: "CRD-0147838",
    topic: "Payment Processing",
    duration: "5:01",
    lob: "Banking",
    sentiment: "Neutral",
    date: "2025-12-15",
  },
];

const sentimentColor: Record<string, string> = {
  Positive: "text-green-600",
  Neutral: "text-yellow-600",
  Negative: "text-red-600",
};

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent call records — Card Services & Banking</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Call ID</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>LOB</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.id}</TableCell>
            <TableCell>{c.topic}</TableCell>
            <TableCell>{c.duration}</TableCell>
            <TableCell>{c.lob}</TableCell>
            <TableCell className={sentimentColor[c.sentiment]}>
              {c.sentiment}
            </TableCell>
            <TableCell className="text-right">{c.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  name: "Compact (3 rows)",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Call ID</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.slice(0, 3).map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.id}</TableCell>
            <TableCell>{c.topic}</TableCell>
            <TableCell className="text-right">{c.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  name: "Empty State",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Call ID</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Sentiment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={4}
            className="text-muted-foreground h-24 text-center"
          >
            No call records match your filters.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
