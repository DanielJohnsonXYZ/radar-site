export function gbp(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatMrr(amount: number) {
  return `${gbp(amount)} MRR`;
}

export function formatConfidence(label: "High" | "Medium" | "Low") {
  return `${label} confidence`;
}

export function formatRiskImpact(mrrExposed: number, riskWeightedMrr: number) {
  return {
    mrrExposed: formatMrr(mrrExposed),
    riskWeightedMrr: `${gbp(riskWeightedMrr)} risk-weighted MRR`,
  };
}

export function formatEngagementTrend(trend: "down" | "stable" | "up", amount?: number) {
  if (trend === "stable") return "Replies and meetings are about the same";
  if (trend === "up") return "They’re talking to you more than usual";
  return amount ? `Replies and meetings are down ${amount}%` : "They’re talking to you less";
}
