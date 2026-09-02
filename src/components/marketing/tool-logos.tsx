import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type LogoProps = { className?: string; title?: string };

export function GmailLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <path fill="#EA4335" d="M1.5 6.5v11A2.5 2.5 0 0 0 4 20h2.2V9.7L12 13.8l5.8-4.1V20H20a2.5 2.5 0 0 0 2.5-2.5v-11L12 14.2 1.5 6.5Z" />
      <path fill="#34A853" d="M20 4h-2.2v5.6L12 13.8 6.2 9.6V4H4A2.5 2.5 0 0 0 1.5 6.5L12 14.2l10.5-7.7A2.5 2.5 0 0 0 20 4Z" />
      <path fill="#FBBC04" d="M1.5 6.5A2.5 2.5 0 0 1 4 4h2.2v5.6L1.5 6.5Z" />
      <path fill="#4285F4" d="M20 4a2.5 2.5 0 0 1 2.5 2.5L17.8 9.6V4H20Z" />
    </svg>
  );
}

export function OutlookLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect x="8" y="5" width="13" height="14" rx="1.5" fill="#0078D4" />
      <path fill="#28A8EA" d="M8 9.2 21 5.8v3.8L8 13V9.2Z" />
      <rect x="2.5" y="6.5" width="10" height="11" rx="1.2" fill="#0A5A9C" />
      <circle cx="7.5" cy="12" r="2.4" fill="#fff" />
    </svg>
  );
}

export function SlackLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <path fill="#36C5F0" d="M8.2 12.9a1.6 1.6 0 1 1-1.6-1.6h1.6v1.6Z" />
      <path fill="#2EB67D" d="M11.1 8.2a1.6 1.6 0 1 1 1.6-1.6v1.6h-1.6Z" />
      <path fill="#ECB22E" d="M15.8 11.1a1.6 1.6 0 1 1 1.6 1.6h-1.6v-1.6Z" />
      <path fill="#E01E5A" d="M12.9 15.8a1.6 1.6 0 1 1-1.6 1.6v-1.6h1.6Z" />
      <path fill="#36C5F0" d="M8.2 9.3h3.1a1.6 1.6 0 0 1 0 3.2H8.2a1.6 1.6 0 0 1 0-3.2Z" />
      <path fill="#2EB67D" d="M14.7 8.2v3.1a1.6 1.6 0 0 1-3.2 0V8.2a1.6 1.6 0 0 1 3.2 0Z" />
      <path fill="#ECB22E" d="M15.8 14.7h-3.1a1.6 1.6 0 0 1 0-3.2h3.1a1.6 1.6 0 0 1 0 3.2Z" />
      <path fill="#E01E5A" d="M9.3 15.8v-3.1a1.6 1.6 0 1 1 3.2 0v3.1a1.6 1.6 0 0 1-3.2 0Z" />
    </svg>
  );
}

export function ZoomLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#2D8CFF" />
      <path fill="#fff" d="M6.2 9.2h6.4c.9 0 1.6.7 1.6 1.6v4.4H7.8c-.9 0-1.6-.7-1.6-1.6V9.2Zm8.4 2 3.2-1.5v4.6l-3.2-1.5v-1.6Z" />
    </svg>
  );
}

export function MeetLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <path fill="#00832D" d="M12 12 3.5 7.2V12H12Z" />
      <path fill="#0066DA" d="M12 12H3.5v4.8L12 12Z" />
      <path fill="#E37400" d="M12 12 20.5 7.2 17 12h-5Z" />
      <path fill="#2684FC" d="M17 12 20.5 7.2V16.8L17 12Z" />
      <path fill="#00AC47" d="M12 12 3.5 16.8 12 21.5 20.5 16.8 12 12Z" />
    </svg>
  );
}

export function TeamsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect x="4" y="6" width="11" height="13" rx="2" fill="#5059C9" />
      <circle cx="9.5" cy="9.2" r="1.8" fill="#fff" />
      <rect x="6.6" y="12" width="5.8" height="4.2" rx="1.8" fill="#fff" />
      <circle cx="16.5" cy="9.6" r="1.5" fill="#7B83EB" />
      <rect x="14.6" y="12.2" width="5" height="3.6" rx="1.6" fill="#7B83EB" />
    </svg>
  );
}

export function NotionLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#fff" stroke="#111" strokeWidth="1.2" />
      <path fill="#111" d="M8.2 7.2h2.1l3.6 6.4V7.2h2V16.8h-2.1L10.2 10.4v6.4h-2V7.2Z" />
    </svg>
  );
}

export function ClickUpLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#7B68EE" />
      <path fill="#fff" d="M6.2 13.4 12 8.2l5.8 5.2-1.6 1.8L12 11.6 7.8 15.2 6.2 13.4Z" />
    </svg>
  );
}

export function AsanaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <circle cx="12" cy="7.4" r="3.1" fill="#F06A6A" />
      <circle cx="7.4" cy="15.4" r="3.1" fill="#F06A6A" />
      <circle cx="16.6" cy="15.4" r="3.1" fill="#F06A6A" />
    </svg>
  );
}

export function MondayLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#111" />
      <circle cx="7" cy="12" r="2" fill="#FF3D57" />
      <circle cx="12" cy="12" r="2" fill="#FFCC00" />
      <circle cx="17" cy="12" r="2" fill="#00CA72" />
    </svg>
  );
}

export function HubSpotLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#FF7A59" />
      <circle cx="12" cy="12" r="3.2" fill="#fff" />
      <circle cx="17.2" cy="6.8" r="1.6" fill="#fff" />
      <path stroke="#fff" strokeWidth="1.6" d="M14.4 10.2 16.4 7.8" />
    </svg>
  );
}

export function PaymentsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#071536" />
      <rect x="5" y="8" width="14" height="9" rx="1.5" fill="#fff" />
      <rect x="5" y="10" width="14" height="2" fill="#1262ff" />
    </svg>
  );
}

const byName: Record<string, ComponentType<LogoProps>> = {
  Gmail: GmailLogo,
  Outlook: OutlookLogo,
  Slack: SlackLogo,
  Zoom: ZoomLogo,
  "Google Meet": MeetLogo,
  "Microsoft Teams": TeamsLogo,
  Notion: NotionLogo,
  ClickUp: ClickUpLogo,
  Asana: AsanaLogo,
  "monday.com": MondayLogo,
  HubSpot: HubSpotLogo,
  "Payments & contracts": PaymentsLogo,
  Email: GmailLogo,
  Meeting: ZoomLogo,
  Task: ClickUpLogo,
};

export function ToolLogo({ name, className }: { name: string; className?: string }) {
  const Logo = byName[name] ?? SlackLogo;
  return <Logo className={className} />;
}

export const PILOT_TOOLS = ["Gmail", "Outlook", "Slack", "Zoom", "Google Meet"] as const;
