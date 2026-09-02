"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/status-badge";
import { ToolLogo } from "@/components/marketing/tool-logos";
import { COMMITMENTS, COMMITMENT_SUMMARY, clientBySlug, getOwner, type CommitmentStatus } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const statusFilters: { id: "all" | CommitmentStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "overdue", label: "Overdue" },
  { id: "due-soon", label: "Due soon" },
  { id: "outstanding", label: "Outstanding" },
  { id: "completed", label: "Completed" },
];

const statusLabel: Record<CommitmentStatus, string> = {
  overdue: "Overdue",
  "due-soon": "Due soon",
  outstanding: "Outstanding",
  completed: "Completed",
};

export default function CommitmentsClient() {
  const [filter, setFilter] = useState<"all" | CommitmentStatus>("all");

  const rows = useMemo(() => {
    const list = filter === "all" ? COMMITMENTS : COMMITMENTS.filter((item) => item.status === filter);
    return [...list].sort((a, b) => {
      const order: CommitmentStatus[] = ["overdue", "due-soon", "outstanding", "completed"];
      return order.indexOf(a.status) - order.indexOf(b.status);
    });
  }, [filter]);

  const summary = COMMITMENT_SUMMARY;

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mb-6">
        <p className="text-[12px] font-semibold text-ink-faint">Promises · this is a demo with made-up clients</p>
        <h1 className="mt-1 text-[32px] font-bold tracking-tight text-ink">Things you told clients you’d do</h1>
        <p className="mt-1 text-[14px] text-ink-muted">
          Radar picks these up from calls, emails and tasks. Start with the overdue ones.
        </p>
      </div>

      <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
        <p className="text-[13px] text-ink-muted">
          <span className="font-semibold text-ink">{summary.detectedThisWeek} found this week</span>
          <span className="mx-2 text-ink-faint">·</span>
          {summary.completed} completed
          <span className="mx-2 text-ink-faint">·</span>
          {summary.outstanding} outstanding
          <span className="mx-2 text-ink-faint">·</span>
          <span className="font-semibold text-risk">{summary.overdue} overdue</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {statusFilters.map((item) => {
          const count = item.id === "all" ? COMMITMENTS.length : COMMITMENTS.filter((c) => c.status === item.id).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
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
      </div>

      <div className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="bg-page text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3">Commitment</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Promised</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Came from</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((commitment) => {
                const client = clientBySlug(commitment.clientSlug);
                const owner = getOwner(commitment.ownerId);
                return (
                  <tr key={commitment.id} className="border-t border-line transition hover:bg-page/70">
                    <td className="px-4 py-3 font-medium text-ink">{commitment.title}</td>
                    <td className="px-4 py-3">
                      <Link href={`/demo/clients/${client.slug}`} className="font-semibold text-ink hover:text-brand">
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={owner.name} size="sm" />
                        <span>{owner.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{commitment.promised}</td>
                    <td className="px-4 py-3 text-ink-muted">{commitment.due}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={commitment.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-ink">
                        <ToolLogo name={commitment.source} className="size-4" />
                        {commitment.source}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CommitmentStatus }) {
  const styles: Record<CommitmentStatus, string> = {
    overdue: "bg-risk-soft text-risk",
    "due-soon": "bg-warn-soft text-warn",
    outstanding: "bg-page text-ink-muted",
    completed: "bg-good-soft text-good",
  };
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", styles[status])}>
      {statusLabel[status]}
    </span>
  );
}
