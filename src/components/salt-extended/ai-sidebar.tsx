"use client";

import { MessageSquare, X } from "lucide-react";
import * as React from "react";

import { useAI } from "@/lib/ai-context";
import { analyzeQuery, getPageSuggestions } from "@/lib/mock/ai-service";
import { cn } from "@/lib/utils";
import type { ConversationMessage } from "@/types/ai";

import { AgentDisplay } from "./agent-display";
import { ChainOfThought } from "./chain-of-thought";
import { Loader } from "./loader";
import { PromptInput } from "./prompt-input";
import { Reasoning } from "./reasoning";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Sources } from "./sources";
import { Suggestion } from "./suggestion";

function AISidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    pageContext,
    conversation,
    addMessage,
    agentState,
    setAgentState,
  } = useAI();

  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isThinking, setIsThinking] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (sidebarOpen) {
      getPageSuggestions(pageContext.page, pageContext).then(setSuggestions);
    }
  }, [sidebarOpen, pageContext]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = React.useCallback(
    async (query: string) => {
      const userMsg: ConversationMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content: query,
        timestamp: new Date().toISOString(),
      };
      addMessage(userMsg);
      setInputValue("");
      setIsThinking(true);

      setAgentState({
        ...agentState,
        status: "thinking",
        currentTask: `Analyzing: "${query}"`,
      });

      const response = await analyzeQuery(query, pageContext);

      const assistantMsg: ConversationMessage = {
        id: `msg-${Date.now()}-resp`,
        role: "assistant",
        content: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sources,
        reasoning: response.reasoning,
      };
      addMessage(assistantMsg);
      setIsThinking(false);

      setAgentState({
        ...agentState,
        status: "idle",
        currentTask: null,
      });
    },
    [addMessage, agentState, pageContext, setAgentState],
  );

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent
        side="right"
        className="flex w-[420px] flex-col sm:w-[480px]"
      >
        <SheetHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              TorqueAI Assistant
            </SheetTitle>
            <SheetClose className="ring-offset-background rounded-sm opacity-70 transition-opacity hover:opacity-100">
              <X className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Agent Status */}
        <div className="shrink-0 px-1">
          <AgentDisplay
            name={agentState.name}
            status={
              agentState.status === "thinking" ? "working" : agentState.status
            }
            currentTask={agentState.currentTask ?? undefined}
            tools={agentState.tools}
          />
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto px-1 py-2"
        >
          {conversation.length === 0 && (
            <div className="space-y-3 pt-4">
              <p className="text-[var(--salt-content-secondary-foreground,theme(colors.muted.foreground))] text-center text-base">
                Ask TorqueAI about your {pageContext.title.toLowerCase()} data
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <Suggestion key={s} onClick={() => handleSubmit(s)}>
                    {s}
                  </Suggestion>
                ))}
              </div>
            </div>
          )}

          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "rounded-lg px-3 py-2 text-base",
                msg.role === "user"
                  ? "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))] text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))] ml-8"
                  : "bg-[var(--salt-container-secondary-background,theme(colors.muted.DEFAULT))] mr-8",
              )}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.reasoning && (
                <Reasoning title="Reasoning" className="mt-2">
                  <p>{msg.reasoning}</p>
                </Reasoning>
              )}
              {msg.sources && msg.sources.length > 0 && (
                <Sources sources={msg.sources} className="mt-2" />
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 px-3 py-2">
              <Loader variant="dots" size="sm" />
              <ChainOfThought
                steps={[
                  { label: "Analyzing query", status: "completed" },
                  { label: "Searching data sources", status: "active" },
                  { label: "Generating response", status: "pending" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-[var(--salt-container-borderColor,theme(colors.border))] shrink-0 border-t pt-3">
          <PromptInput
            placeholder={`Ask about ${pageContext.title.toLowerCase()}...`}
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AISidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useAI();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(
        "fixed right-6 bottom-20 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105",
        "bg-[var(--salt-palette-interact-background,theme(colors.primary.DEFAULT))]",
        "text-[var(--salt-palette-interact-foreground,theme(colors.primary.foreground))]",
        className,
      )}
      aria-label="Open AI assistant"
    >
      <MessageSquare className="h-5 w-5" />
    </button>
  );
}

export { AISidebar, AISidebarTrigger };
