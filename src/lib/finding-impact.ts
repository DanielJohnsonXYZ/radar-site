import type { Finding } from "@/lib/demo-data";
import { formatConfidence, formatMrr, gbp } from "@/lib/format";

export function findingImpactValue(finding: Finding): number {
  return (
    finding.riskWeightedMrr ??
    finding.expansionOpportunity ??
    finding.renewalValue ??
    finding.mrrExposed ??
    0
  );
}

export function formatFindingImpact(finding: Finding): {
  primary: string;
  label: string;
  secondary?: string;
  tone: "risk" | "good" | "renewal" | "muted";
} {
  if (finding.impactKind === "none") {
    return { primary: "—", label: "No money attached", tone: "muted" };
  }

  if (finding.impactKind === "at-risk") {
    return {
      primary: finding.riskWeightedMrr ? gbp(finding.riskWeightedMrr) : gbp(finding.mrrExposed ?? 0),
      label: finding.riskWeightedMrr ? "Risk-weighted MRR" : "MRR exposed",
      secondary: finding.mrrExposed ? formatMrr(finding.mrrExposed) : undefined,
      tone: "risk",
    };
  }

  if (finding.impactKind === "opportunity") {
    return {
      primary: gbp(finding.expansionOpportunity ?? 0),
      label: "Expansion opportunity",
      tone: "good",
    };
  }

  return {
    primary: gbp(finding.renewalValue ?? finding.mrrExposed ?? 0),
    label: "Renewal value",
    tone: "renewal",
  };
}

export function findingConfidenceLine(finding: Finding): string | null {
  return finding.confidenceLabel ? formatConfidence(finding.confidenceLabel) : null;
}
