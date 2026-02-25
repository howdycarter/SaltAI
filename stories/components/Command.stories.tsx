import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/salt-extended/command";

const meta = {
  title: "Components/Navigation & Layout/Command Palette",
  component: Command,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md" style={{ width: 400 }}>
      <CommandInput placeholder="Search modules, topics, or actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Modules">
          <CommandItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Discovery (TorqueAI)</span>
          </CommandItem>
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Call Review</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Export Report</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Empty: Story = {
  name: "No Results",
  render: () => (
    <Command className="rounded-lg border shadow-md" style={{ width: 400 }}>
      <CommandInput placeholder="Search..." value="xyznonexistent" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};
