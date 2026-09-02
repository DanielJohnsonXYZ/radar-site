import type { Metadata } from "next";
import Link from "next/link";
import { Avatar, StateBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { CLIENTS, LAST_SYNCED, getOwner } from "@/lib/demo-data";
import { gbp } from "@/lib/format";

export const metadata: Metadata = {
  title: "Clients",
  description: "The made-up clients Radar is watching in this demo.",
};

export default function ClientsPage() {
  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight text-ink">Clients Radar is watching</h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            {CLIENTS.length} made-up clients. Open one to see the emails, calls and Slack behind the flag.
          </p>
        </div>
        <p className="text-[12px] text-ink-faint">Last synced {LAST_SYNCED}</p>
      </div>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="bg-page text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">What’s going on</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Retainer</th>
                <th className="px-4 py-3">Renewal</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {CLIENTS.map((client) => {
                const owner = getOwner(client.ownerId);
                return (
                  <tr key={client.slug} className="border-t border-line transition hover:bg-page/70">
                    <td className="px-4 py-3">
                      <Link href={`/demo/clients/${client.slug}`} className="flex items-center gap-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                          {client.code}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">{client.name}</span>
                          <span className="text-[12px] text-ink-faint">{client.industry}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StateBadge state={client.state} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <Avatar name={owner.name} size="sm" />
                        {owner.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{gbp(client.retainer)}/mo</td>
                    <td className="px-4 py-3">
                      <p>{client.renewal}</p>
                      <p className="text-[12px] text-ink-faint">in {client.daysToRenewal} days</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button asChild variant="outline" size="sm" className="h-8 rounded-full">
                        <Link href={`/demo/clients/${client.slug}`}>Open {client.name}</Link>
                      </Button>
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
