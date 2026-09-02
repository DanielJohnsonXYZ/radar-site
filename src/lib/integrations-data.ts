export type IntegrationTier = "pilot" | "in-development" | "planned";

export type Integration = {
  name: string;
  category: string;
  detail: string;
  tier: IntegrationTier;
};

export const INTEGRATION_GROUPS: { title: string; items: Integration[] }[] = [
  {
    title: "Communication",
    items: [
      { name: "Gmail", category: "Email", detail: "Available in pilot", tier: "pilot" },
      { name: "Outlook", category: "Email", detail: "Available in pilot", tier: "pilot" },
      { name: "Slack", category: "Team chat", detail: "Available in pilot", tier: "pilot" },
      { name: "Microsoft Teams", category: "Team chat", detail: "In development", tier: "in-development" },
    ],
  },
  {
    title: "Meetings",
    items: [
      { name: "Zoom", category: "Video meetings", detail: "Available in pilot", tier: "pilot" },
      { name: "Google Meet", category: "Video meetings", detail: "Available in pilot", tier: "pilot" },
    ],
  },
  {
    title: "Delivery",
    items: [
      { name: "Notion", category: "Docs & knowledge", detail: "In development", tier: "in-development" },
      { name: "ClickUp", category: "Tasks & projects", detail: "In development", tier: "in-development" },
      { name: "Asana", category: "Tasks & projects", detail: "Planned", tier: "planned" },
      { name: "monday.com", category: "Work management", detail: "Planned", tier: "planned" },
    ],
  },
  {
    title: "Commercial",
    items: [
      { name: "HubSpot", category: "CRM", detail: "In development", tier: "in-development" },
      { name: "Payments & contracts", category: "Invoices, payments & contracts", detail: "Planned", tier: "planned" },
    ],
  },
];

export const INTEGRATION_TIER_LABEL: Record<IntegrationTier, string> = {
  pilot: "Available in pilot",
  "in-development": "In development",
  planned: "Planned",
};
