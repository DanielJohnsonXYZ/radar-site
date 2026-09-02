import { ToolLogo } from "@/components/marketing/tool-logos";
import { cn } from "@/lib/utils";
import { STATE_LABEL, TYPE_LABEL, type ClientState, type FindingType, type Urgency } from "@/lib/demo-data";

const stateClass: Record<ClientState, string> = {
  "at-risk": "bg-risk-soft text-risk",
  opportunity: "bg-good-soft text-good",
  "needs-attention": "bg-warn-soft text-warn",
  healthy: "bg-brand-soft text-brand-deep",
};

const typeClass: Record<FindingType, string> = {
  risk: "bg-risk-soft text-risk",
  opportunity: "bg-good-soft text-good",
  commitment: "bg-warn-soft text-warn",
  renewal: "bg-renewal-soft text-renewal",
};

const urgencyClass: Record<Urgency, string> = {
  High: "text-risk",
  Medium: "text-warn",
  Low: "text-ink-muted",
};

export function StateBadge({ state, className }: { state: ClientState; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", stateClass[state], className)}>
      {STATE_LABEL[state]}
    </span>
  );
}

export function TypeBadge({ type, className }: { type: FindingType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold", typeClass[type], className)}>
      {TYPE_LABEL[type]}
    </span>
  );
}

export function UrgencyText({ urgency }: { urgency: Urgency }) {
  return <span className={cn("font-semibold", urgencyClass[urgency])}>{urgency}</span>;
}

export function SourceBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-page px-1.5 py-0.5 text-[11px] font-medium text-ink">
      <ToolLogo name={source} className="size-3.5" />
      {source}
    </span>
  );
}

export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-navy font-semibold text-white",
        size === "sm" ? "size-6 text-[10px]" : "size-8 text-[11px]",
      )}
    >
      {initials}
    </span>
  );
}
