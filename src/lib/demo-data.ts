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

export const CLIENTS: Client[] = [
  {
    slug: "brightpath",
    code: "BP",
    name: "BrightPath",
    industry: "Healthcare Technology",
    state: "at-risk",
    ownerId: "sarah",
    retainer: 5000,
    renewal: "30 Oct 2026",
    daysToRenewal: 61,
    tenure: "1 year, 8 months",
    health: [
      { label: "Relationship", value: "Weakening", note: "Trend over last 30 days" },
      { label: "Delivery", value: "Needs attention", note: "Trend over last 30 days" },
      { label: "Commercial", value: "At risk", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Fix the reporting issue, then talk about renewal",
      body: "James asked for the Q2 numbers to be fixed and is still waiting. Don't open with renewal. Sort the report first, then book the call.",
      primaryCta: "See the full brief",
      secondaryCta: "See the emails and calls",
      why: [
        "James hasn't had a proper reply in 11 days",
        "Two people skipped the last review call",
        "Renewal is in 61 days and nobody has said they're staying",
        "Fixing the report first makes the renewal conversation easier",
      ],
    },
    changes: [
      { title: "Replies are slower", detail: "It now takes more than twice as long to get a reply from them." },
      { title: "Fewer people on calls", detail: "Only 3 of 5 showed up to the last review." },
      { title: "The report is still wrong", detail: "James asked for a fix 11 days ago. It's still open." },
      { title: "Two people have gone quiet", detail: "James and Tom haven't had a proper conversation in two weeks." },
    ],
    evidence: [
      {
        title: "Re: Q2 performance report",
        from: "James Lee",
        source: "Email",
        whatHappened: "James asked for changes to the report and hasn't replied since.",
        when: "2d ago",
      },
      {
        title: "Q2 Performance Review",
        from: "James Lee, Priya Nair",
        source: "Meeting",
        whatHappened: "Only 3 of 5 people showed up. The call was shorter than usual.",
        when: "4d ago",
      },
      {
        title: "#client-updates",
        from: "Priya Nair",
        source: "Slack",
        whatHappened: "Priya said the numbers in the weekly update don't match.",
        when: "7d ago",
      },
      {
        title: "Reporting data validation",
        source: "Task",
        whatHappened: "Still blocked - waiting on BrightPath to confirm the numbers.",
        when: "11d ago",
      },
    ],
    contacts: [
      {
        name: "James Lee",
        role: "Head of Growth",
        primary: true,
        relationshipRole: "Main contact",
        engagementTrend: "down",
        engagementChange: 43,
        lastInteraction: "Last real conversation: 11 days ago",
      },
      {
        name: "Priya Nair",
        role: "Marketing Manager",
        engagementTrend: "stable",
        lastInteraction: "Last real conversation: 2 days ago",
      },
      {
        name: "Tom Richards",
        role: "Finance Manager",
        renewalInfluence: true,
        relationshipRole: "Renewal influence",
        engagementTrend: "down",
        lastInteraction: "Last meeting attended: 38 days ago",
      },
    ],
    statusChange: { from: "Going well", to: "Might leave", changedAgo: "2 days ago", signalsThisWeek: 4 },
    accountWarnings: ["Almost all emails go to one person (James). That's risky if he leaves or goes quiet."],
    financials: {
      mrrExposed: 5000,
      riskWeightedMrr: 3000,
      confidenceLabel: "High",
    },
    insight: {
      kind: "risk",
      heading: "BrightPath might leave",
      kicker: "They've gone quiet, and a reporting issue from the Q2 review is still open. Here's the proof, and what to do next.",
      typeLabel: "Might leave",
      impactLabel: "Monthly fee at risk",
      impactValue: "GBP 5,000",
      impactHint: "GBP 3,000 if you weight it by how likely they are to go",
      confidenceLabel: "Medium",
      due: "Do this today",
      steps: [
        { title: "Fewer people on calls", detail: "Meetings attended dropped from 5 to 3 this month" },
        { title: "An open complaint", detail: "The reporting fix James asked for is 11 days old" },
        { title: "Renewal is close", detail: "61 days left, and nobody has said they're staying" },
        { title: "This looks serious", detail: "High confidence this needs a conversation this week" },
      ],
      noticed:
        "BrightPath's team is less engaged than a month ago. James still hasn't got the reporting fix he asked for. Renewal is in 61 days and nobody has said they're staying.",
      stats: [
        { value: "24%", label: "Drop in engagement vs prior 30 days" },
        { value: "2", label: "People who've gone quiet in the last 2 weeks" },
        { value: "2", label: "Open concerns over 14 days" },
      ],
      timeline: [
        {
          title: "Engagement dropped 24%",
          when: "2 days ago",
          detail: "Meetings attended down from 5 to 3 in the last 30 days",
        },
        {
          title: "Open concern not updated",
          when: "5 days ago",
          detail: "Data integration issue has been open for 18 days",
        },
        {
          title: "Renewal approaching",
          when: "6 days ago",
          detail: "No commitment recorded with 61 days until renewal",
        },
      ],
      why: "If you leave this, BrightPath may not renew. That's GBP 5,000 a month. Radar is fairly sure - not certain - so treat it as a conversation to have this week, not a panic.",
      actions: [
        {
          title: "Re-engage key stakeholders",
          detail: "Book a check-in with James and Priya to understand current priorities and concerns.",
        },
        {
          title: "Resolve open concerns",
          detail: "Address the data integration issue and confirm resolution to rebuild confidence.",
        },
        {
          title: "Secure renewal commitment",
          detail: "Propose renewal options and confirm value plan before the 30 October deadline.",
        },
      ],
      draft: {
        greeting: "Hi James,",
        body: "I wanted to pick up the reporting issue you raised after the Q2 review. We still owe you clarity on the data validation changes, and I don't want that hanging over the renewal conversation. Could we grab 20 minutes this week to resolve it?",
        signoff: "Sarah",
      },
    },
  },
];

export const FINDINGS: Finding[] = [
  {
    id: "f1",
    clientSlug: "brightpath",
    type: "risk",
    title: "Might leave",
    whyNow: "James asked to fix the report. Nobody has replied in 11 days.",
    detected: "2h ago",
    impactKind: "at-risk",
    mrrExposed: 5000,
    riskWeightedMrr: 3000,
    confidenceLabel: "High",
    urgency: "High",
    due: "Do this today",
    nextStep: "See why",
    nextHref: "/demo/clients/brightpath/insight",
    signals: 8,
  },
];

export const COMMITMENTS: Commitment[] = [
  { id: "c1", title: "Send revised reporting dashboard", clientSlug: "brightpath", ownerId: "sarah", promised: "19 Aug", due: "Overdue 8 days", status: "overdue", source: "Zoom" },
];

export function getClient(slug: string) {
  return CLIENTS.find((client) => client.slug === slug);
}

export function getBrightPathClient() {
  return clientBySlug("brightpath");
}

export function clientBySlug(slug: string) {
  const client = getClient(slug);
  if (!client) throw new Error(`Unknown client ${slug}`);
  return client;
}

export const STATE_LABEL: Record<ClientState, string> = {
  "at-risk": "Might leave",
  opportunity: "Might buy more",
  "needs-attention": "Needs a nudge",
  healthy: "Going well",
};

export const TYPE_LABEL: Record<FindingType, string> = {
  risk: "Might leave",
  opportunity: "Might buy more",
  commitment: "You promised this",
  renewal: "Renewal coming up",
};
