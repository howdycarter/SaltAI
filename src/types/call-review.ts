export type CallMetadata = {
  callId: string;
  dateTime: string;
  duration: number; // seconds
  lob: string;
  queueGroup: string;
  queueSegment: string;
  taxonomyL1: string;
  taxonomyL2: string;
  lobTopics: string[];
  agentId?: string;
  transferFlag: boolean;
  escalationFlag: boolean;
  fcrFlag: boolean;
  handleTime: number; // seconds
  afterCallWorkTime: number; // seconds
};

export type TranscriptSegment = {
  id: string;
  speaker: "customer" | "agent" | "system";
  timestamp: number; // seconds from call start
  text: string;
};

export type KeyMoment = {
  timestamp: number;
  type: "escalation" | "resolution" | "friction" | "coaching" | "compliance";
  description: string;
};

export type CallInsights = {
  summary: string;
  customerProblem: string;
  customerActions: string[];
  agentActions: string[];
  resolutionStatus: "resolved" | "unresolved" | "partial" | "transferred";
  keyMoments: KeyMoment[];
  sentiment?: "positive" | "negative" | "neutral";
};

export type SampleSet = {
  callIds: string[];
  totalCalls: number;
  sliceDescription: string;
  samplingMethod: string;
  sourceModule: string;
};
