export type AgentStatus = "idle" | "thinking" | "working" | "error" | "done";

export interface AISource {
  title: string;
  url: string;
  snippet?: string;
}

export interface AICitation {
  id: string;
  text: string;
  sourceIndex: number;
}

export interface AIResponse {
  id: string;
  answer: string;
  reasoning: string;
  sources: AISource[];
  citations: AICitation[];
  confidence: number;
  generatedAt: string;
}

export interface AgentState {
  status: AgentStatus;
  name: string;
  currentTask: string | null;
  tools: { name: string; status: "idle" | "active" | "done" }[];
}

export interface PageContext {
  page: string;
  title: string;
  filters?: Record<string, unknown>;
  selectedItem?: string;
  metadata?: Record<string, unknown>;
}

export interface Highlight {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  category: "key_moment" | "issue" | "resolution" | "sentiment_shift";
  confidence: number;
}

export interface BookmarkSuggestion {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  tag: string;
  reason: string;
  confidence: number;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: AISource[];
  reasoning?: string;
}
