export type ClientState =
  | "at-risk"
  | "opportunity"
  | "needs-attention"
  | "healthy";

export type FindingType = "risk" | "opportunity" | "commitment" | "renewal";
export type Urgency = "High" | "Medium" | "Low";
export type EvidenceSource = "Email" | "Meeting" | "Task" | "Slack";
