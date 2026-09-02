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
      body: "James asked for the Q2 numbers to be fixed and is still waiting. Don’t open with “shall we renew?” Sort the report first, then book the call.",
      primaryCta: "See the full brief",
      secondaryCta: "See the emails and calls",
      why: [
        "James hasn’t had a proper reply in 11 days",
        "Two people skipped the last review call",
        "Renewal is in 61 days and nobody has said they’re staying",
        "Fixing the report first makes the renewal conversation easier",
      ],
    },
    changes: [
      { title: "Replies are slower", detail: "It now takes more than twice as long to get a reply from them." },
      { title: "Fewer people on calls", detail: "Only 3 of 5 showed up to the last review." },
      { title: "The report is still wrong", detail: "James asked for a fix 11 days ago. It’s still open." },
      { title: "Two people have gone quiet", detail: "James and Tom haven’t had a proper conversation in two weeks." },
    ],
    evidence: [
      {
        title: "Re: Q2 performance report",
        from: "James Lee",
        source: "Email",
        whatHappened: "James asked for changes to the report and hasn’t replied since.",
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
        whatHappened: "Priya said the numbers in the weekly update don’t match.",
        when: "7d ago",
      },
      {
        title: "Reporting data validation",
        source: "Task",
        whatHappened: "Still blocked — waiting on BrightPath to confirm the numbers.",
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
    accountWarnings: ["Almost all emails go to one person (James). That’s risky if he leaves or goes quiet."],
    financials: {
      mrrExposed: 5000,
      riskWeightedMrr: 3000,
      confidenceLabel: "High",
    },
    insight: {
      kind: "risk",
      heading: "BrightPath might leave",
      kicker: "They’ve gone quiet, and a reporting issue from the Q2 review is still open. Here’s the proof, and what to do next.",
      typeLabel: "Might leave",
      impactLabel: "Monthly fee at risk",
      impactValue: "£5,000",
      impactHint: "£3,000 if you weight it by how likely they are to go",
      confidenceLabel: "Medium",
      due: "Do this today",
      steps: [
        { title: "Fewer people on calls", detail: "Meetings attended dropped from 5 to 3 this month" },
        { title: "An open complaint", detail: "The reporting fix James asked for is 11 days old" },
        { title: "Renewal is close", detail: "61 days left, and nobody has said they’re staying" },
        { title: "This looks serious", detail: "High confidence this needs a conversation this week" },
      ],
      noticed:
        "BrightPath’s team is less engaged than a month ago. James still hasn’t got the reporting fix he asked for. Renewal is in 61 days and nobody has said they’re staying.",
      stats: [
        { value: "24%", label: "Drop in engagement vs prior 30 days" },
        { value: "2", label: "People who’ve gone quiet in the last 2 weeks" },
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
      why: "If you leave this, BrightPath may not renew. That’s £5,000 a month. Radar is fairly sure — not certain — so treat it as a conversation to have this week, not a panic.",
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
  {
    slug: "northstar",
    code: "NS",
    name: "Northstar",
    industry: "B2B Software",
    state: "opportunity",
    ownerId: "james",
    retainer: 4000,
    renewal: "18 Feb 2027",
    daysToRenewal: 172,
    tenure: "2 years, 3 months",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Growing", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send them a proposal while they’re asking",
      body: "Northstar asked for extra work. They’re hiring and looking at new markets. Send a clear proposal while the interest is live.",
      primaryCta: "See the upsell",
      secondaryCta: "See the emails and calls",
      why: [
        "Dana asked for a pricing proposal",
        "The team is hiring, so they need more help",
        "Waiting usually means someone else writes the proposal",
      ],
    },
    changes: [
      { title: "More strategy meetings", detail: "Three growth-planning sessions booked this month" },
      { title: "Positive sentiment", detail: "Recent replies reference strong campaign results" },
      { title: "New stakeholders engaged", detail: "Two new team members joined recent calls" },
    ],
    evidence: [
      {
        title: "Re: Q3 growth planning",
        from: "Dana Whitfield",
        source: "Email",
        whatHappened: "Dana asked for a proposal covering lead generation in two new markets.",
        when: "1d ago",
      },
      {
        title: "Monthly performance review",
        from: "Dana Whitfield, Marcus Cole",
        source: "Meeting",
        whatHappened: "Full attendance. Discussion focused on scaling the current programme.",
        when: "3d ago",
      },
      {
        title: "#northstar-agency",
        from: "Marcus Cole",
        source: "Slack",
        whatHappened: "Marcus shared the new hiring plan and asked about extra capacity.",
        when: "5d ago",
      },
    ],
    contacts: [
      { name: "Dana Whitfield", role: "VP Marketing", primary: true, relationshipRole: "Main contact", engagementTrend: "up", lastInteraction: "Last real conversation: 1 day ago" },
      { name: "Marcus Cole", role: "Growth Lead", engagementTrend: "stable", lastInteraction: "Last real conversation: 3 days ago" },
    ],
    financials: { expansionOpportunity: 6000, confidenceLabel: "Medium" },
  },
  {
    slug: "motive-labs",
    code: "ML",
    name: "Motive Labs",
    industry: "Product Studio",
    state: "needs-attention",
    ownerId: "priya",
    retainer: 3500,
    renewal: "12 Jan 2027",
    daysToRenewal: 135,
    tenure: "11 months",
    health: [
      { label: "Relationship", value: "Stable", note: "Trend over last 30 days" },
      { label: "Delivery", value: "Commitments overdue", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Stable", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send the two things you promised",
      body: "Brand guidelines and the Q3 media plan are both late. Motive Labs already asked where they are. Send them this week.",
      primaryCta: "See the promises",
      secondaryCta: "See what’s still open",
      why: [
        "Two things you promised are past their due dates",
        "Nobody on your team is chasing them",
        "Late promises are how good clients start to lose trust",
      ],
    },
    changes: [
      { title: "Commitments overdue", detail: "2 agreed actions have passed their due dates" },
      { title: "Follow-ups unanswered", detail: "Two nudges on open items had no response" },
    ],
    evidence: [
      {
        title: "Deliver revised brand guidelines",
        source: "Task",
        whatHappened: "Due 6 days ago. No update since the kickoff note.",
        when: "6d ago",
      },
      {
        title: "Share Q3 media plan",
        source: "Task",
        whatHappened: "Due 3 days ago. Owner unassigned after handover.",
        when: "3d ago",
      },
      {
        title: "Sprint review",
        from: "Leo Barnes",
        source: "Meeting",
        whatHappened: "Leo asked when the outstanding items would land.",
        when: "5d ago",
      },
    ],
    contacts: [
      { name: "Leo Barnes", role: "Founder", primary: true, relationshipRole: "Main contact", engagementTrend: "stable", lastInteraction: "Last real conversation: 5 days ago" },
      { name: "Ana Sofia Ruiz", role: "Operations Lead", engagementTrend: "stable", lastInteraction: "Last real conversation: 6 days ago" },
    ],
    financials: { mrrExposed: 3500, confidenceLabel: "Medium" },
  },
  {
    slug: "clearview-fintech",
    code: "CF",
    name: "Clearview FinTech",
    industry: "Financial Services",
    state: "healthy",
    ownerId: "emily",
    retainer: 6000,
    renewal: "14 Oct 2026",
    daysToRenewal: 45,
    tenure: "2 years, 1 month",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Renewal window", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Start the renewal conversation",
      body: "Clearview FinTech renews in 45 days and they’re happy. Talk to them now, while it’s still easy.",
      primaryCta: "See the renewal",
      secondaryCta: "See the emails and calls",
      why: [
        "Renewal is in 45 days",
        "Recent sentiment is positive",
        "Early proposals shorten renewal cycles",
      ],
    },
    changes: [
      { title: "They scored you 9/10", detail: "Latest survey was 9/10 with a kind comment" },
      { title: "Consistent engagement", detail: "Full attendance across the last four check-ins" },
    ],
    evidence: [
      {
        title: "Re: quarterly survey",
        from: "Rachel Okafor",
        source: "Email",
        whatHappened: "Rachel praised campaign reporting and turnaround times.",
        when: "3d ago",
      },
      {
        title: "Quarterly business review",
        from: "Rachel Okafor, Sam Patel",
        source: "Meeting",
        whatHappened: "Roadmap agreed for next quarter. No open concerns.",
        when: "1w ago",
      },
    ],
    contacts: [
      { name: "Rachel Okafor", role: "Head of Marketing", primary: true, relationshipRole: "Main contact", engagementTrend: "stable", lastInteraction: "Last real conversation: 3 days ago" },
      { name: "Sam Patel", role: "Product Marketing", engagementTrend: "stable", lastInteraction: "Last real conversation: 1 week ago" },
    ],
    financials: { mrrExposed: 6000, renewalValue: 5000, confidenceLabel: "High" },
    insight: {
      kind: "renewal",
      heading: "Clearview’s renewal is in 45 days",
      kicker: "They’re happy, and the contract ends soon. Talk to them now — while it’s still a friendly conversation.",
      typeLabel: "Renewal coming up",
      impactLabel: "Business impact",
      impactValue: "£5,000",
      impactHint: "renewal value",
      confidenceLabel: "High",
      due: "Due in 7 days",
      steps: [
        { title: "Approaching renewal", detail: "Renewal in 45 days" },
        { title: "Engagement steady", detail: "Attendance and reply times on baseline" },
        { title: "No open concerns", detail: "Nothing unresolved is aging" },
        { title: "Strong renewal position", detail: "High confidence" },
      ],
      noticed:
        "Renewal is in 45 days and they’re happy. Talk to them now, while it’s still easy.",
      stats: [
        { value: "45", label: "Days until renewal" },
        { value: "£5,000", label: "What the renewal is worth" },
        { value: "0", label: "Open concerns" },
      ],
      timeline: [
        { title: "Renewal window opened", when: "3h ago", detail: "45 days until the contract end date" },
        { title: "No proposal shared yet", when: "2 days ago", detail: "Renewal options have not been discussed" },
      ],
      why: "Starting early keeps Clearview FinTech's renewal a value conversation instead of a price negotiation.",
      actions: [
        { title: "Prepare renewal options", detail: "Draft options that reflect what Clearview FinTech valued most this year." },
        { title: "Book the renewal conversation", detail: "Get time with Rachel Okafor while sentiment is strong." },
        { title: "Confirm the value plan", detail: "Agree scope and success measures for the next term." },
      ],
      draft: {
        greeting: "Hi Rachel,",
        body: "With your renewal coming up, I'd love to review what worked this year and share some thoughts for the next term. Would a short call next week suit?",
        signoff: "Emily",
      },
    },
  },
  {
    slug: "vertex-health",
    code: "VH",
    name: "Vertex Health",
    industry: "Digital Health",
    state: "at-risk",
    ownerId: "tom",
    retainer: 4500,
    renewal: "22 Dec 2026",
    daysToRenewal: 114,
    tenure: "1 year, 4 months",
    health: [
      { label: "Relationship", value: "Stable", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Budget pressure", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Book a reconnect call",
      body: "Vertex Health mentioned budget cuts. Book a short call this week before it turns into a cancellation.",
      primaryCta: "See why",
      secondaryCta: "See the emails and calls",
      why: [
        "They’ve been quieter over the last month",
        "Open items are waiting on client input",
        "Early action improves retention outcomes",
      ],
    },
    changes: [
      { title: "Budget review flagged", detail: "Board update mentioned cost controls across suppliers" },
      { title: "Slower sign-offs", detail: "Approvals are taking 2x longer than the previous quarter" },
    ],
    evidence: [
      {
        title: "Fwd: board update — H2 priorities",
        from: "Nadia Hassan",
        source: "Email",
        whatHappened: "Board update lists marketing spend among areas under review.",
        when: "6h ago",
      },
      {
        title: "Monthly check-in",
        from: "Nadia Hassan",
        source: "Meeting",
        whatHappened: "Nadia asked for options at a reduced monthly commitment.",
        when: "2d ago",
      },
    ],
    contacts: [{ name: "Nadia Hassan", role: "VP Marketing", primary: true, relationshipRole: "Main contact", engagementTrend: "down", lastInteraction: "Last real conversation: 6 hours ago" }],
    financials: { mrrExposed: 4500, riskWeightedMrr: 3375, confidenceLabel: "High" },
    insight: {
      kind: "risk",
      heading: "Vertex Health might leave",
      kicker: "They mentioned budget cuts. Here’s what Radar found, and what to do next.",
      typeLabel: "Might leave",
      impactLabel: "Business impact",
      impactValue: "£6,500",
      impactHint: "risk-weighted MRR",
      confidenceLabel: "High",
      due: "Due today",
      steps: [
        { title: "Budget review flagged", detail: "Board update mentioned cost controls across suppliers" },
        { title: "Slower sign-offs", detail: "Approvals are taking 2x longer than the previous quarter" },
        { title: "Value exposed", detail: "£4,500 MRR exposed" },
        { title: "Churn risk", detail: "High confidence" },
      ],
      noticed:
        "Budget constraints were raised in a board update and marketing spend is under review. Retainer value is exposed.",
      stats: [
        { value: "9", label: "Signals in the last 30 days" },
        { value: "£4,500", label: "Monthly retainer exposed" },
        { value: "114", label: "Days until renewal" },
      ],
      timeline: [
        {
          title: "Fwd: board update — H2 priorities",
          when: "6h ago",
          detail: "Board update lists marketing spend among areas under review.",
        },
        {
          title: "Monthly check-in",
          when: "2d ago",
          detail: "Nadia asked for options at a reduced monthly commitment.",
        },
      ],
      why: "If unaddressed, Vertex Health may reduce or end the engagement. With £4,500 MRR exposed, £3,375 in risk-weighted MRR is at stake.",
      actions: [
        { title: "Re-engage the relationship", detail: "Book time with Nadia Hassan to understand what has changed." },
        { title: "Close the open loops", detail: "Resolve anything waiting on your team the same week." },
        { title: "Agree the path forward", detail: "Confirm priorities and put the next milestones in writing." },
      ],
      draft: {
        greeting: "Hi Nadia,",
        body: "I saw the board update on H2 priorities and wanted to check in on how we can support a tighter plan without losing the work that is already paying off.",
        signoff: "Tom",
      },
    },
  },
  {
    slug: "apex-education",
    code: "AE",
    name: "Apex Education",
    industry: "Education",
    state: "opportunity",
    ownerId: "alex",
    retainer: 2500,
    renewal: "9 Mar 2027",
    daysToRenewal: 191,
    tenure: "9 months",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Growing", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send them a proposal while they’re asking",
      body: "Apex Education asked for more work. Send a proposal while they’re still asking.",
      primaryCta: "See the upsell",
      secondaryCta: "See the emails and calls",
      why: [
        "They asked for extra work in a recent email or call",
        "Engagement is above the client's usual baseline",
        "Timely proposals convert at a higher rate",
      ],
    },
    changes: [
      { title: "Campus launch confirmed", detail: "New site opens next term with a dedicated budget" },
      { title: "Planning sessions booked", detail: "Two launch-planning workshops added this month" },
    ],
    evidence: [
      {
        title: "Re: new campus launch",
        from: "Grace Adeyemi",
        source: "Email",
        whatHappened: "Grace confirmed the launch date and asked about campaign support.",
        when: "1d ago",
      },
      {
        title: "Launch planning workshop",
        from: "Grace Adeyemi, Owen Marsh",
        source: "Meeting",
        whatHappened: "Team discussed enrolment targets and channel mix.",
        when: "4d ago",
      },
    ],
    contacts: [
      { name: "Grace Adeyemi", role: "Marketing Director", primary: true, relationshipRole: "Main contact", engagementTrend: "up", lastInteraction: "Last real conversation: 1 day ago" },
      { name: "Owen Marsh", role: "Head of Enrolment", engagementTrend: "stable", lastInteraction: "Last real conversation: 4 days ago" },
    ],
    financials: { expansionOpportunity: 3000, confidenceLabel: "Medium" },
  },
  {
    slug: "lumen-retail",
    code: "LR",
    name: "Lumen Retail",
    industry: "Retail",
    state: "at-risk",
    ownerId: "james",
    retainer: 3000,
    renewal: "2 Feb 2027",
    daysToRenewal: 156,
    tenure: "1 year, 2 months",
    health: [
      { label: "Relationship", value: "Cooling", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Watch", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Book a reconnect call",
      body: "Reply times are slowing and meetings are slipping. Re-open the conversation before it becomes silence.",
      primaryCta: "See why",
      secondaryCta: "See the emails and calls",
      why: [
        "They’ve been quieter over the last month",
        "Two meetings declined without a new time",
        "Early action improves retention outcomes",
      ],
    },
    changes: [
      { title: "Slower replies", detail: "Average reply time is 1.8x slower vs previous 30 days" },
      { title: "Meetings declined", detail: "Two check-ins declined without a new time" },
    ],
    evidence: [
      {
        title: "Fortnightly check-in",
        from: "Hannah Cole",
        source: "Meeting",
        whatHappened: "Declined by the client. No reschedule proposed.",
        when: "2d ago",
      },
      {
        title: "Re: October campaign assets",
        from: "Hannah Cole",
        source: "Email",
        whatHappened: "Approval took six days against a usual same-week turnaround.",
        when: "5d ago",
      },
    ],
    contacts: [{ name: "Hannah Cole", role: "Brand Lead", primary: true, relationshipRole: "Main contact", engagementTrend: "down", lastInteraction: "Last real conversation: 5 days ago" }],
    financials: { mrrExposed: 3000, confidenceLabel: "Medium" },
    insight: {
      kind: "risk",
      heading: "Lumen Retail might leave",
      kicker: "They’re slower to reply and skipping meetings. Here’s the proof.",
      typeLabel: "Might leave",
      impactLabel: "Business impact",
      impactValue: "Trust at risk",
      impactHint: "trust and delivery impact",
      confidenceLabel: "Medium",
      due: "Due in 2 days",
      steps: [
        { title: "Slower replies", detail: "Average reply time is 1.8x slower vs previous 30 days" },
        { title: "Meetings declined", detail: "Two check-ins declined without a new time" },
        { title: "Value exposed", detail: "£3,000 MRR exposed" },
        { title: "Churn risk", detail: "Medium confidence" },
      ],
      noticed:
        "Reply times are slowing and two meetings were declined without rescheduling. Engagement is drifting below baseline.",
      stats: [
        { value: "4", label: "Signals in the last 30 days" },
        { value: "£3,000", label: "Monthly retainer exposed" },
        { value: "156", label: "Days until renewal" },
      ],
      timeline: [
        { title: "Fortnightly check-in", when: "2d ago", detail: "Declined by the client. No reschedule proposed." },
        {
          title: "Re: October campaign assets",
          when: "5d ago",
          detail: "Approval took six days against a usual same-week turnaround.",
        },
      ],
      why: "If unaddressed, trust in delivery weakens and Lumen Retail's £3,000/mo relationship becomes harder to defend.",
      actions: [
        { title: "Re-engage the relationship", detail: "Book time with Hannah Cole to understand what has changed." },
        { title: "Close the open loops", detail: "Resolve anything waiting on your team the same week." },
        { title: "Agree the path forward", detail: "Confirm priorities and put the next milestones in writing." },
      ],
      draft: {
        greeting: "Hi Hannah,",
        body: "I noticed the last two check-ins didn't land and wanted to make it easier to reconnect. Would a shorter 20-minute call this week work better?",
        signoff: "James",
      },
    },
  },
  {
    slug: "harbor-logistics",
    code: "HL",
    name: "Harbor Logistics",
    industry: "Logistics",
    state: "at-risk",
    ownerId: "priya",
    retainer: 3500,
    renewal: "26 Nov 2026",
    daysToRenewal: 88,
    tenure: "1 year, 6 months",
    health: [
      { label: "Relationship", value: "No active sponsor", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Stable", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Book a reconnect call",
      body: "Your main contact at Harbor Logistics changed jobs. Find who owns this now, then book a call.",
      primaryCta: "See why",
      secondaryCta: "See the emails and calls",
      why: [
        "They’ve been quieter over the last month",
        "Open items are waiting on client input",
        "Early action improves retention outcomes",
      ],
    },
    changes: [
      { title: "Sponsor changed roles", detail: "Primary contact moved teams with no handover" },
      { title: "Standing meeting lapsed", detail: "Monthly review has not been rebooked" },
    ],
    evidence: [
      {
        title: "Out of office — role change",
        from: "Isla Morton",
        source: "Email",
        whatHappened: "Auto-reply confirms Isla has moved to the operations team.",
        when: "4d ago",
      },
      {
        title: "Identify new sponsor",
        source: "Task",
        whatHappened: "Open. No replacement contact confirmed yet.",
        when: "3d ago",
      },
    ],
    contacts: [{ name: "Isla Morton", role: "Former sponsor", primary: true, relationshipRole: "Former sponsor", engagementTrend: "down", lastInteraction: "Last real conversation: 4 days ago" }],
    financials: { mrrExposed: 3500, confidenceLabel: "Medium" },
    insight: {
      kind: "risk",
      heading: "Harbor Logistics might leave",
      kicker: "Your main contact changed jobs. Nobody replaced them. Here’s what to do.",
      typeLabel: "Might leave",
      impactLabel: "Business impact",
      impactValue: "Trust at risk",
      impactHint: "trust and delivery impact",
      confidenceLabel: "Medium",
      due: "Due in 4 days",
      steps: [
        { title: "Sponsor changed roles", detail: "Primary contact moved teams with no handover" },
        { title: "Standing meeting lapsed", detail: "Monthly review has not been rebooked" },
        { title: "Value exposed", detail: "£3,500 MRR exposed" },
        { title: "Churn risk", detail: "Medium confidence" },
      ],
      noticed:
        "The key sponsor has changed roles with no handover in place. The relationship currently has no active champion.",
      stats: [
        { value: "3", label: "Signals in the last 30 days" },
        { value: "£3,500", label: "Monthly retainer exposed" },
        { value: "88", label: "Days until renewal" },
      ],
      timeline: [
        {
          title: "Out of office — role change",
          when: "4d ago",
          detail: "Auto-reply confirms Isla has moved to the operations team.",
        },
        { title: "Identify new sponsor", when: "3d ago", detail: "Open. No replacement contact confirmed yet." },
      ],
      why: "If unaddressed, trust in delivery weakens and Harbor Logistics's £3,500/mo relationship becomes harder to defend.",
      actions: [
        { title: "Re-engage the relationship", detail: "Book time with Isla Morton to understand what has changed." },
        { title: "Close the open loops", detail: "Resolve anything waiting on your team the same week." },
        { title: "Agree the path forward", detail: "Confirm priorities and put the next milestones in writing." },
      ],
      draft: {
        greeting: "Hi Isla,",
        body: "Congratulations on the move. I'd like to make the handover clean for Harbor — could you point me to the right person to keep the monthly review going?",
        signoff: "Priya",
      },
    },
  },
  {
    slug: "beacon-media",
    code: "BM",
    name: "Beacon Media",
    industry: "Media",
    state: "opportunity",
    ownerId: "sarah",
    retainer: 2000,
    renewal: "30 Apr 2027",
    daysToRenewal: 243,
    tenure: "8 months",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Growing", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send them a proposal while they’re asking",
      body: "Beacon Media asked for more work. Send a proposal while they’re still asking.",
      primaryCta: "See the upsell",
      secondaryCta: "See the emails and calls",
      why: [
        "They asked for extra work in a recent email or call",
        "Engagement is above the client's usual baseline",
        "Timely proposals convert at a higher rate",
      ],
    },
    changes: [{ title: "Paid social interest", detail: "Client asked for a paid social proposal directly" }],
    evidence: [
      {
        title: "Re: Q3 results",
        from: "Tobias Lang",
        source: "Email",
        whatHappened: "Tobias asked what a paid social add-on would look like.",
        when: "1d ago",
      },
    ],
    contacts: [{ name: "Tobias Lang", role: "Head of Content", primary: true, relationshipRole: "Main contact", engagementTrend: "up", lastInteraction: "Last real conversation: 1 day ago" }],
    financials: { expansionOpportunity: 4000, confidenceLabel: "Medium" },
  },
  {
    slug: "quill-partners",
    code: "QP",
    name: "Quill & Partners",
    industry: "Legal Services",
    state: "opportunity",
    ownerId: "emily",
    retainer: 1500,
    renewal: "15 Jun 2027",
    daysToRenewal: 289,
    tenure: "1 year, 1 month",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Referral potential", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send them a proposal while they’re asking",
      body: "Quill & Partners asked for more work. Send a proposal while they’re still asking.",
      primaryCta: "See the upsell",
      secondaryCta: "See the emails and calls",
      why: [
        "They asked for extra work in a recent email or call",
        "Engagement is above the client's usual baseline",
        "Timely proposals convert at a higher rate",
      ],
    },
    changes: [{ title: "Referrals offered", detail: "Two introductions mentioned across recent calls" }],
    evidence: [
      {
        title: "Monthly review",
        from: "Eleanor Voss",
        source: "Meeting",
        whatHappened: "Eleanor offered introductions to two firms in her network.",
        when: "2d ago",
      },
    ],
    contacts: [{ name: "Eleanor Voss", role: "Managing Partner", primary: true, relationshipRole: "Main contact", engagementTrend: "stable", lastInteraction: "Last real conversation: 2 days ago" }],
    financials: { expansionOpportunity: 1500, confidenceLabel: "Low" },
  },
  {
    slug: "fieldstone-consulting",
    code: "FC",
    name: "Fieldstone Consulting",
    industry: "Management Consulting",
    state: "needs-attention",
    ownerId: "tom",
    retainer: 2800,
    renewal: "8 Dec 2026",
    daysToRenewal: 100,
    tenure: "1 year, 3 months",
    health: [
      { label: "Relationship", value: "Stable", note: "Trend over last 30 days" },
      { label: "Delivery", value: "Commitments overdue", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Stable", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Send the things you promised",
      body: "Four things you promised Fieldstone are still open. Send them this week.",
      primaryCta: "See the promises",
      secondaryCta: "See what’s still open",
      why: [
        "Commitments have passed their agreed dates",
        "No owner is currently following up",
        "Unresolved promises erode client confidence",
      ],
    },
    changes: [{ title: "Commitments unresolved", detail: "4 agreed actions open across two projects" }],
    evidence: [
      {
        title: "Publish updated case studies",
        source: "Task",
        whatHappened: "Due last week. Draft awaiting internal review.",
        when: "7d ago",
      },
      {
        title: "Send revised measurement plan",
        source: "Task",
        whatHappened: "Due 4 days ago. Blocked on analytics access.",
        when: "4d ago",
      },
    ],
    contacts: [{ name: "Helen Park", role: "Partner", primary: true, relationshipRole: "Main contact", engagementTrend: "stable", lastInteraction: "Last real conversation: 4 days ago" }],
    financials: { mrrExposed: 2800, confidenceLabel: "Medium" },
  },
  {
    slug: "orchard-analytics",
    code: "OA",
    name: "Orchard Analytics",
    industry: "Data & Analytics",
    state: "healthy",
    ownerId: "alex",
    retainer: 4000,
    renewal: "29 Oct 2026",
    daysToRenewal: 60,
    tenure: "1 year, 10 months",
    health: [
      { label: "Relationship", value: "Strong", note: "Trend over last 30 days" },
      { label: "Delivery", value: "On track", note: "Trend over last 30 days" },
      { label: "Commercial", value: "Renewal window", note: "Trend over last 30 days" },
    ],
    recommendedAction: {
      title: "Start the renewal conversation",
      body: "Orchard Analytics renews in 60 days and things are going well. Start the conversation now.",
      primaryCta: "See the renewal",
      secondaryCta: "See the emails and calls",
      why: [
        "Renewal is in 60 days",
        "Recent sentiment is positive",
        "Early proposals shorten renewal cycles",
      ],
    },
    changes: [{ title: "Steady engagement", detail: "Attendance and reply times remain on baseline" }],
    evidence: [
      {
        title: "Monthly performance review",
        from: "Yusuf Osman",
        source: "Meeting",
        whatHappened: "On-track review. Yusuf asked about next year's roadmap.",
        when: "3d ago",
      },
    ],
    contacts: [{ name: "Yusuf Osman", role: "CEO", primary: true, relationshipRole: "Main contact", engagementTrend: "stable", lastInteraction: "Last real conversation: 3 days ago" }],
    financials: { mrrExposed: 4000, renewalValue: 4000, confidenceLabel: "Medium" },
    insight: {
      kind: "renewal",
      heading: "Orchard’s renewal is in 60 days",
      kicker: "Things are going well. Start the conversation now, while it’s still easy.",
      typeLabel: "Renewal coming up",
      impactLabel: "Business impact",
      impactValue: "£4,000",
      impactHint: "renewal value",
      confidenceLabel: "Medium",
      due: "Due in 14 days",
      steps: [
        { title: "Approaching renewal", detail: "Renewal in 60 days" },
        { title: "Engagement steady", detail: "Attendance and reply times on baseline" },
        { title: "No open concerns", detail: "Nothing unresolved is aging" },
        { title: "Strong renewal position", detail: "Medium confidence" },
      ],
      noticed:
        "Renewal is in 60 days with steady engagement and no open concerns. Well positioned for an early conversation.",
      stats: [
        { value: "60", label: "Days until renewal" },
        { value: "£4,000", label: "What the renewal is worth" },
        { value: "0", label: "Open concerns" },
      ],
      timeline: [
        { title: "Renewal window opened", when: "3d ago", detail: "60 days until the contract end date" },
        { title: "No proposal shared yet", when: "2 days ago", detail: "Renewal options have not been discussed" },
      ],
      why: "Starting early keeps Orchard Analytics's renewal a value conversation instead of a price negotiation.",
      actions: [
        { title: "Prepare renewal options", detail: "Draft options that reflect what Orchard Analytics valued most this year." },
        { title: "Book the renewal conversation", detail: "Get time with Yusuf Osman while sentiment is strong." },
        { title: "Confirm the value plan", detail: "Agree scope and success measures for the next term." },
      ],
      draft: {
        greeting: "Hi Yusuf,",
        body: "With renewal coming up in 60 days, I would like to walk through what worked this year and a few options for next. Are you free for 30 minutes next week?",
        signoff: "Alex",
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
  {
    id: "f2",
    clientSlug: "northstar",
    type: "opportunity",
    title: "Might buy more",
    whyNow: "They asked for a pricing proposal for two new markets.",
    detected: "5h ago",
    impactKind: "opportunity",
    expansionOpportunity: 6000,
    confidenceLabel: "Medium",
    urgency: "Medium",
    due: "In 2 days",
    nextStep: "See the upsell",
    nextHref: "/demo/clients/northstar",
    signals: 12,
  },
  {
    id: "f3",
    clientSlug: "motive-labs",
    type: "commitment",
    title: "You promised this",
    whyNow: "Brand guidelines and the media plan are both late.",
    detected: "1d ago",
    impactKind: "none",
    urgency: "Medium",
    due: "Do this today",
    nextStep: "See the promises",
    nextHref: "/demo/commitments",
    signals: 5,
  },
  {
    id: "f4",
    clientSlug: "clearview-fintech",
    type: "renewal",
    title: "Renewal coming up",
    whyNow: "Contract ends in 45 days. They’re happy — talk to them now.",
    detected: "3h ago",
    impactKind: "renewal",
    mrrExposed: 6000,
    renewalValue: 5000,
    confidenceLabel: "High",
    urgency: "Low",
    due: "In 7 days",
    nextStep: "See the renewal",
    nextHref: "/demo/clients/clearview-fintech/insight",
    signals: 7,
  },
  {
    id: "f5",
    clientSlug: "vertex-health",
    type: "risk",
    title: "Might leave",
    whyNow: "They mentioned budget cuts in a board update.",
    detected: "6h ago",
    impactKind: "at-risk",
    mrrExposed: 4500,
    riskWeightedMrr: 3375,
    confidenceLabel: "High",
    urgency: "High",
    due: "Do this today",
    nextStep: "See why",
    nextHref: "/demo/clients/vertex-health/insight",
    signals: 9,
  },
  {
    id: "f6",
    clientSlug: "apex-education",
    type: "opportunity",
    title: "Might buy more",
    whyNow: "New campus launch. They need more marketing help.",
    detected: "1d ago",
    impactKind: "opportunity",
    expansionOpportunity: 3000,
    confidenceLabel: "Medium",
    urgency: "Medium",
    due: "In 3 days",
    nextStep: "See the upsell",
    nextHref: "/demo/clients/apex-education",
    signals: 6,
  },
  {
    id: "f7",
    clientSlug: "lumen-retail",
    type: "risk",
    title: "Might leave",
    whyNow: "Replies are slower and they’ve started declining meetings.",
    detected: "8h ago",
    impactKind: "at-risk",
    mrrExposed: 3000,
    confidenceLabel: "Medium",
    urgency: "High",
    due: "In 2 days",
    nextStep: "See why",
    nextHref: "/demo/clients/lumen-retail/insight",
    signals: 4,
  },
  {
    id: "f8",
    clientSlug: "harbor-logistics",
    type: "risk",
    title: "Might leave",
    whyNow: "Your main contact changed jobs. Nobody replaced them.",
    detected: "4h ago",
    impactKind: "at-risk",
    mrrExposed: 3500,
    confidenceLabel: "Medium",
    urgency: "Medium",
    due: "In 4 days",
    nextStep: "See why",
    nextHref: "/demo/clients/harbor-logistics/insight",
    signals: 3,
  },
  {
    id: "f9",
    clientSlug: "beacon-media",
    type: "opportunity",
    title: "Might buy more",
    whyNow: "They asked you for a paid social proposal.",
    detected: "1d ago",
    impactKind: "opportunity",
    expansionOpportunity: 4000,
    confidenceLabel: "Medium",
    urgency: "Medium",
    due: "In 5 days",
    nextStep: "See the upsell",
    nextHref: "/demo/clients/beacon-media",
    signals: 4,
  },
  {
    id: "f10",
    clientSlug: "quill-partners",
    type: "opportunity",
    title: "Might buy more",
    whyNow: "They offered two introductions on recent calls.",
    detected: "2d ago",
    impactKind: "opportunity",
    expansionOpportunity: 1500,
    confidenceLabel: "Low",
    urgency: "Low",
    due: "In 10 days",
    nextStep: "See the upsell",
    nextHref: "/demo/clients/quill-partners",
    signals: 2,
  },
  {
    id: "f11",
    clientSlug: "fieldstone-consulting",
    type: "commitment",
    title: "You promised this",
    whyNow: "Four things you agreed to do are still open.",
    detected: "1d ago",
    impactKind: "none",
    urgency: "Medium",
    due: "Do this today",
    nextStep: "See the promises",
    nextHref: "/demo/commitments",
    signals: 4,
  },
  {
    id: "f12",
    clientSlug: "orchard-analytics",
    type: "renewal",
    title: "Renewal coming up",
    whyNow: "Contract ends in 60 days. Things are going well — start the conversation.",
    detected: "3d ago",
    impactKind: "renewal",
    mrrExposed: 4000,
    renewalValue: 4000,
    confidenceLabel: "Medium",
    urgency: "Low",
    due: "In 14 days",
    nextStep: "See the renewal",
    nextHref: "/demo/clients/orchard-analytics/insight",
    signals: 3,
  },
];

export const COMMITMENTS: Commitment[] = [
  { id: "c1", title: "Send revised reporting dashboard", clientSlug: "brightpath", ownerId: "sarah", promised: "19 Aug", due: "Overdue 8 days", status: "overdue", source: "Zoom" },
  { id: "c2", title: "Send pricing proposal", clientSlug: "northstar", ownerId: "james", promised: "28 Aug", due: "Due tomorrow", status: "due-soon", source: "Gmail" },
  { id: "c3", title: "Deliver revised brand guidelines", clientSlug: "motive-labs", ownerId: "priya", promised: "22 Aug", due: "Overdue 6 days", status: "overdue", source: "Task" },
  { id: "c4", title: "Share Q3 media plan", clientSlug: "motive-labs", ownerId: "priya", promised: "25 Aug", due: "Overdue 3 days", status: "overdue", source: "Task" },
  { id: "c5", title: "Publish updated case studies", clientSlug: "fieldstone-consulting", ownerId: "tom", promised: "20 Aug", due: "Overdue 7 days", status: "overdue", source: "Task" },
  { id: "c6", title: "Send revised measurement plan", clientSlug: "fieldstone-consulting", ownerId: "tom", promised: "24 Aug", due: "Overdue 4 days", status: "overdue", source: "Task" },
  { id: "c7", title: "Confirm renewal options", clientSlug: "clearview-fintech", ownerId: "emily", promised: "2 Sep", due: "Due in 3 days", status: "due-soon", source: "Email" },
  { id: "c8", title: "Share paid social proposal", clientSlug: "beacon-media", ownerId: "sarah", promised: "30 Aug", due: "Due in 2 days", status: "due-soon", source: "Email" },
  { id: "c9", title: "Identify new sponsor", clientSlug: "harbor-logistics", ownerId: "priya", promised: "27 Aug", due: "Outstanding", status: "outstanding", source: "Task" },
  { id: "c10", title: "Reporting data validation", clientSlug: "brightpath", ownerId: "sarah", promised: "18 Aug", due: "Outstanding", status: "outstanding", source: "Task" },
  { id: "c11", title: "Campus launch campaign brief", clientSlug: "apex-education", ownerId: "alex", promised: "1 Sep", due: "Completed", status: "completed", source: "Meeting" },
  { id: "c12", title: "Q3 performance report", clientSlug: "orchard-analytics", ownerId: "alex", promised: "28 Aug", due: "Completed", status: "completed", source: "Email" },
  { id: "c13", title: "Board update follow-up", clientSlug: "vertex-health", ownerId: "tom", promised: "29 Aug", due: "Outstanding", status: "outstanding", source: "Email" },
  { id: "c14", title: "Referral introduction email", clientSlug: "quill-partners", ownerId: "emily", promised: "30 Aug", due: "Completed", status: "completed", source: "Email" },
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
