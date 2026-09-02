export type ClientState =
  | "at-risk"
  | "opportunity"
  | "needs-attention"
  | "healthy";

export type FindingType = "risk" | "opportunity" | "commitment" | "renewal";
export type Urgency = "High" | "Medium" | "Low";
export type EvidenceSource = "Email" | "Meeting" | "Task" | "Slack";

export type Owner = {
  id: string;
  name: string;
  role: string;
};

export type ConfidenceLabel = "High" | "Medium" | "Low";

export type Contact = {
  name: string;
  role: string;
  primary?: boolean;
  relationshipRole?: string;
  engagementTrend?: "down" | "stable" | "up";
  engagementChange?: number;
  lastInteraction: string;
  renewalInfluence?: boolean;
};

export type ClientFinancials = {
  mrrExposed?: number;
  riskWeightedMrr?: number;
  expansionOpportunity?: number;
  renewalValue?: number;
  confidenceLabel: ConfidenceLabel;
};

export type Evidence = {
  title: string;
  from?: string;
  source: EvidenceSource;
  whatHappened: string;
  when: string;
};

export type HealthMetric = {
  label: string;
  value: string;
  note: string;
};

export type Client = {
  slug: string;
  code: string;
  name: string;
  industry: string;
  state: ClientState;
  ownerId: string;
  retainer: number;
  renewal: string;
  daysToRenewal: number;
  tenure: string;
  health: [HealthMetric, HealthMetric, HealthMetric];
  recommendedAction: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    why: string[];
  };
  changes: { title: string; detail: string }[];
  evidence: Evidence[];
  contacts: Contact[];
  insight?: Insight;
  statusChange?: { from: string; to: string; changedAgo: string; signalsThisWeek: number };
  accountWarnings?: string[];
  financials: ClientFinancials;
};

export type Insight = {
  kind: "risk" | "renewal";
  heading: string;
  kicker: string;
  typeLabel: string;
  impactLabel: string;
  impactValue: string;
  impactHint: string;
  confidenceLabel: ConfidenceLabel;
  due: string;
  steps: { title: string; detail: string }[];
  noticed: string;
  stats: { value: string; label: string }[];
  timeline: { title: string; when: string; detail: string }[];
  why: string;
  actions: { title: string; detail: string }[];
  draft: { greeting: string; body: string; signoff: string };
};

export type Finding = {
  id: string;
  clientSlug: string;
  type: FindingType;
  title: string;
  whyNow: string;
  detected: string;
  impactKind: "at-risk" | "opportunity" | "renewal" | "none";
  mrrExposed?: number;
  riskWeightedMrr?: number;
  expansionOpportunity?: number;
  renewalValue?: number;
  confidenceLabel?: ConfidenceLabel;
  urgency: Urgency;
  due: string;
  nextStep: string;
  nextHref: string;
  signals: number;
};

export const OWNERS: Owner[] = [
  { id: "sarah", name: "Sarah Mitchell", role: "Account Director" },
  { id: "james", name: "James Lee", role: "Account Manager" },
  { id: "priya", name: "Priya Nair", role: "Client Partner" },
  { id: "emily", name: "Emily Carter", role: "Account Manager" },
  { id: "tom", name: "Tom Richards", role: "Account Director" },
  { id: "alex", name: "Alex Chen", role: "Account Manager" },
];

export const CURRENT_USER = {
  ...OWNERS[0],
  title: "Client Services Director",
  agency: "Northline Studio",
};

export const LAST_SYNCED = "12 min ago";

export type CommitmentStatus = "overdue" | "due-soon" | "outstanding" | "completed";

export type Commitment = {
  id: string;
  title: string;
  clientSlug: string;
  ownerId: string;
  promised: string;
  due: string;
  status: CommitmentStatus;
  source: EvidenceSource | "Zoom" | "Gmail";
};

export const COMMITMENT_SUMMARY = {
  detectedThisWeek: 14,
  completed: 9,
  outstanding: 3,
  overdue: 2,
};

export const HOMEPAGE_STATS = {
  revenueAtRisk: 9500,
  expansionOpportunity: 14000,
  unresolvedCommitments: 6,
};

export const TODAY_STATS = {
  atRisk: { amount: HOMEPAGE_STATS.revenueAtRisk, clients: 4 },
  opportunity: { amount: HOMEPAGE_STATS.expansionOpportunity, clients: 4 },
  commitments: { count: HOMEPAGE_STATS.unresolvedCommitments, clients: 2 },
};

export const PRIORITY_BRIEFING = [
  {
    clientSlug: "brightpath",
    title: "This client might leave",
    whyNow: ["James still waiting on reporting", "Q2 review was half empty", "Replies have slowed a lot"],
    cta: "See why",
    href: "/demo/clients/brightpath/insight",
  },
  {
    clientSlug: "northstar",
    title: "This client might buy more",
    whyNow: ["They asked for a pricing proposal", "Team is hiring", "Talking about new markets"],
    cta: "See the upsell",
    href: "/demo/clients/northstar",
  },
  {
    clientSlug: "motive-labs",
    title: "You promised two things that are late",
    whyNow: ["Brand guidelines overdue 6 days", "Q3 media plan still unassigned", "They asked for a status update"],
    cta: "See the promises",
    href: "/demo/commitments",
  },
] as const;

function owner(id: string) {
  const found = OWNERS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown owner ${id}`);
  return found;
}

export function getOwner(id: string) {
  return owner(id);
}
