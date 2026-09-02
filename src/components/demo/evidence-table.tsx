"use client";

import { useMemo, useState } from "react";
import { SourceBadge } from "@/components/status-badge";
import type { Evidence, EvidenceSource } from "@/lib/demo-data";

const filters: { id: "All" | EvidenceSource; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Email", label: "Email" },
  { id: "Meeting", label: "Meetings" },
  { id: "Task", label: "Tasks" },
  { id: "Slack", label: "Slack" },
];

export function EvidenceTable({ evidence }: { evidence: Evidence[] }) {
  const [filter, setFilter] = useState<"All" | EvidenceSource>("All");
  const rows = useMemo(
    () => evidence.filter((item) => (filter === "All" ? true : item.source === filter)),
    [evidence, filter],
  );

  return (
    <section id="evidence" className="scroll-mt-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold text-ink">What Radar found in their emails and calls</h2>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                filter === item.id ? "bg-navy text-white" : "bg-white text-ink-muted ring-1 ring-line"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-page text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3">Message or meeting</th>
              <th className="px-4 py-3">Came from</th>
              <th className="px-4 py-3">What happened</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                  No matching emails, calls or messages.
                </td>
              </tr>
            ) : (
              rows.map((item) => (
                <tr key={`${item.title}-${item.when}`} className="border-t border-line">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{item.title}</p>
                    {item.from ? (
                      <p className="text-[12px] text-ink-faint">
                        {item.source === "Meeting" ? "With" : "From"}: {item.from}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <SourceBadge source={item.source} />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{item.whatHappened}</td>
                  <td className="px-4 py-3 text-ink-faint">{item.when}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="border-t border-line px-4 py-3 text-[12px] text-ink-faint">
          Showing 1 to {rows.length} of {rows.length} results
        </p>
      </div>
    </section>
  );
}
