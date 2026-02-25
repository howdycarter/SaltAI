"use client";

import * as React from "react";

import type { AgentState, ConversationMessage, PageContext } from "@/types/ai";

interface AIContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  nlqiOpen: boolean;
  setNlqiOpen: (open: boolean) => void;

  pageContext: PageContext;
  setPageContext: (ctx: PageContext) => void;

  conversation: ConversationMessage[];
  addMessage: (msg: ConversationMessage) => void;
  clearConversation: () => void;

  agentState: AgentState;
  setAgentState: (state: AgentState) => void;
}

const defaultAgentState: AgentState = {
  status: "idle",
  name: "TorqueAI",
  currentTask: null,
  tools: [],
};

const defaultPageContext: PageContext = {
  page: "dashboard",
  title: "Dashboard",
};

const AIContext = React.createContext<AIContextValue | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [nlqiOpen, setNlqiOpen] = React.useState(false);
  const [pageContext, setPageContext] =
    React.useState<PageContext>(defaultPageContext);
  const [conversation, setConversation] = React.useState<ConversationMessage[]>(
    [],
  );
  const [agentState, setAgentState] =
    React.useState<AgentState>(defaultAgentState);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const addMessage = React.useCallback((msg: ConversationMessage) => {
    setConversation((prev) => [...prev, msg]);
  }, []);

  const clearConversation = React.useCallback(() => {
    setConversation([]);
  }, []);

  const value = React.useMemo<AIContextValue>(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      nlqiOpen,
      setNlqiOpen,
      pageContext,
      setPageContext,
      conversation,
      addMessage,
      clearConversation,
      agentState,
      setAgentState,
    }),
    [
      sidebarOpen,
      toggleSidebar,
      nlqiOpen,
      pageContext,
      conversation,
      addMessage,
      clearConversation,
      agentState,
    ],
  );

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI(): AIContextValue {
  const ctx = React.useContext(AIContext);
  if (!ctx) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return ctx;
}
