"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Avatar, TypeBadge, UrgencyText } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  FINDINGS,
  LAST_SYNCED,
  OWNERS,
  PRIORITY_BRIEFING,
  TODAY_STATS,
  clientBySlug,
  getOwner,
  type Finding,
  type FindingType,
} from "@/lib/demo-data";
import { findingConfidenceLine, findingImpactValue, formatFindingImpact } from "@/lib/finding-impact";
import { gbp } from "@/lib/format";
import { cn } from "@/lib/utils";

const filters: { id: "all" | FindingType; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "risk", label: "Might leave" },
  { id: "opportunity", label: "Might buy more" },
  { id: "commitment", label: "You promised" },
  { id: "renewal", label: "Renewal coming" },
];

type SortKey = "priority" | "impact" | "client";

export function TodayBoard() {
  const [filter, setFilter] = useState<"all" | FindingType>("all");
  const [ownerId, setOwnerId] = useState("all");
  const [sort, setSort] = useState<SortKey>("priority");
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = FINDINGS.filter((finding) => (filter === "all" ? true : finding.type === filter));
    if (ownerId !== "all") {
      rows = rows.filter((finding) => clientBySlug(finding.clientSlug).ownerId === ownerId);
    }
    const priorityRank = { High: 0, Medium: 1, Low: 2 };
    rows = [...rows].sort((a, b) => {
      if (sort === "client") return clientBySlug(a.clientSlug).name.localeCompare(clientBySlug(b.clientSlug).name);
      if (sort === "impact") return findingImpactValue(b) - findingImpactValue(a);
      return priorityRank[a.urgency] - priorityRank[b.urgency];
    });
    return rows;
  }, [filter, ownerId, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold text-ink-faint">Today · this is a demo with made-up clients</p>
          <h1 className="mt-1 text-[32px] font-semibold tracking-tight text-ink">Here’s what needs you today</h1>
          <p className="mt-1 max-w-xl text-[14px] text-ink-muted">
            Radar read the emails, meetings and Slack in this fictional agency. Start with the three cards, then scan the rest.
          </p>
        </div>
        <p className="text-[12px] text-ink-faint">Last synced {LAST_SYNCED}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard value={gbp(TODAY_STATS.atRisk.amount)} label="might leave" hint={`Across ${TODAY_STATS.atRisk.clients} clients`} tone="risk" />
        <StatCard value={gbp(TODAY_STATS.opportunity.amount)} label="might buy more" hint={`Across ${TODAY_STATS.opportunity.clients} clients`} tone="good" />
        <StatCard value={String(TODAY_STATS.commitments.count)} label="promises still open" hint={`Across ${TODAY_STATS.commitments.clients} clients`} tone="warn" />
      </div>

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">Do these first</h2>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {PRIORITY_BRIEFING.map((item) => {
            const client = clientBySlug(item.clientSlug);
            const financials = client.financials;
            return (
              <article key={item.clientSlug} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                    {client.code}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{client.name}</p>
                    <p className="text-[13px] text-ink-muted">{item.title}</p>
                  </div>
                </div>
                {financials.mrrExposed ? (
                  <p className="mt-3 text-[13px] text-ink">
                    {gbp(financials.mrrExposed)} MRR exposed
                    {financials.confidenceLabel ? ` · ${financials.confidenceLabel} confidence` : ""}
                  </p>
                ) : financials.expansionOpportunity ? (
                  <p className="mt-3 text-[13px] text-good">{gbp(financials.expansionOpportunity)} opportunity</p>
                ) : null}
                <ul className="mt-2 flex-1 space-y-1 text-[12px] text-ink-muted">
                  {item.whyNow.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
                <Button asChild size="sm" className="mt-4 h-8 w-fit rounded-full bg-brand px-3 hover:bg-brand-deep">
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <h2 className="mt-8 text-[18px] font-bold text-ink">Everything Radar found</h2>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {filters.map((item) => {
          const count = item.id === "all" ? FINDINGS.length : FINDINGS.filter((finding) => finding.type === item.id).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                setPage(1);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] font-semibold",
                active ? "bg-navy text-white" : "bg-white text-ink-muted ring-1 ring-line hover:text-ink",
              )}
            >
              {item.label}
              <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
        <select
          value={ownerId}
          onChange={(event) => {
            setOwnerId(event.target.value);
            setPage(1);
          }}
          className="ml-auto h-8 rounded-md border border-line bg-white px-2 text-[12px] text-ink"
        >
          <option value="all">All owners</option>
          {OWNERS.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          className="h-8 rounded-md border border-line bg-white px-2 text-[12px] text-ink"
        >
          <option value="priority">Sort: Priority</option>
          <option value="impact">Sort: Impact</option>
          <option value="client">Sort: Client</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[13px]">
            <thead className="bg-page text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">What’s going on</th>
                <th className="px-4 py-3">Money</th>
                <th className="px-4 py-3">Who owns it</th>
                <th className="px-4 py-3">Do this</th>
                <th className="px-4 py-3">Proof</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-muted">
                    No rows match these filters. Try “Everything”.
                  </td>
                </tr>
              ) : (
                visible.map((finding, index) => <FindingRow key={finding.id} finding={finding} index={(safePage - 1) * pageSize + index + 1} />)
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[12px] text-ink-muted">
          <p>
            Showing {visible.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to {(safePage - 1) * pageSize + visible.length} of {filtered.length} results
          </p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={safePage <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-md border border-line px-2 py-1 disabled:opacity-40">
              Prev
            </button>
            <span>{safePage}</span>
            <button type="button" disabled={safePage >= pageCount} onClick={() => setPage((value) => value + 1)} className="rounded-md border border-line px-2 py-1 disabled:opacity-40">
              Next
            </button>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="h-8 rounded-md border border-line bg-white px-2"
            >
              <option value={6}>Rows per page 6</option>
              <option value={12}>Rows per page 12</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, hint, tone }: { value: string; label: string; hint: string; tone: "risk" | "good" | "warn" }) {
  const color = tone === "risk" ? "text-risk" : tone === "good" ? "text-good" : "text-warn";
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-card)]">
      <p className={`text-[24px] font-bold ${color}`}>{value}</p>
      <p className="text-[13px] font-medium text-ink">{label}</p>
      <p className="text-[12px] text-ink-faint">{hint}</p>
    </div>
  );
}

function FindingRow({ finding, index }: { finding: Finding; index: number }) {
  const client = clientBySlug(finding.clientSlug);
  const owner = getOwner(client.ownerId);
  return (
    <tr className="border-t border-line transition hover:bg-page/70">
      <td className="px-4 py-3 text-ink-faint">{index}</td>
      <td className="px-4 py-3">
        <Link href={`/demo/clients/${client.slug}`} className="flex items-center gap-3 hover:text-brand">
          <span className="flex size-8 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
            {client.code}
          </span>
          <span>
            <span className="block font-semibold text-ink">{client.name}</span>
            <span className="flex items-center gap-2">
              <TypeBadge type={finding.type} />
              <span className="text-[12px] text-ink-faint">Retainer {gbp(client.retainer)}/mo</span>
            </span>
          </span>
        </Link>
      </td>
      <td className="px-4 py-3">
        <p className="text-ink">{finding.whyNow}</p>
        <p className="text-[12px] text-ink-faint">Detected {finding.detected}</p>
      </td>
      <td className="px-4 py-3">
        <Impact finding={finding} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar name={owner.name} size="sm" />
          <div>
            <p className="font-medium text-ink">{owner.name}</p>
            <p className="text-[12px] text-ink-muted">
              <UrgencyText urgency={finding.urgency} /> · {finding.due}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Button asChild size="sm" className="h-8 rounded-full bg-brand px-3 hover:bg-brand-deep">
          <Link href={finding.nextHref}>{finding.nextStep}</Link>
        </Button>
      </td>
      <td className="px-4 py-3 font-semibold text-ink">{finding.signals}</td>
    </tr>
  );
}

function Impact({ finding }: { finding: Finding }) {
  const impact = formatFindingImpact(finding);
  const confidence = findingConfidenceLine(finding);
  const color =
    impact.tone === "risk" ? "text-risk" : impact.tone === "good" ? "text-good" : impact.tone === "renewal" ? "text-renewal" : "text-ink-muted";

  return (
    <div>
      <p className={`font-bold ${color}`}>{impact.primary}</p>
      {impact.label ? <p className="text-[12px] text-ink-faint">{impact.label}</p> : null}
      {impact.secondary ? <p className="text-[12px] text-ink-muted">{impact.secondary}</p> : null}
      {confidence ? <p className="text-[12px] text-ink-muted">{confidence}</p> : null}
    </div>
  );
}
