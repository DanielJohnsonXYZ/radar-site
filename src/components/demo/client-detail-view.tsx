import Link from "next/link";
import { EvidenceTable } from "@/components/demo/evidence-table";
import { Avatar, StateBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import type { Client } from "@/lib/demo-data";
import { getOwner } from "@/lib/demo-data";
import { formatConfidence, formatEngagementTrend, formatMrr, gbp } from "@/lib/format";

export function ClientDetailView({ client, lastSynced }: { client: Client; lastSynced: string }) {
  const owner = getOwner(client.ownerId);

  return (
    <div className="px-4 py-6 md:px-8">
      <p className="text-[12px] font-medium text-ink-faint">This client</p>
      <div className="mt-1 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
            {client.code}
          </span>
          <div>
            <h1 className="text-[32px] font-semibold tracking-tight text-ink">{client.name}</h1>
            <StateBadge state={client.state} />
          </div>
        </div>
        <p className="text-[12px] text-ink-faint">Last synced {lastSynced}</p>
      </div>

      {client.statusChange ? (
        <div className="mt-5 rounded-[var(--radius-card)] border border-risk/20 bg-risk-soft p-4">
          <p className="text-[14px] font-semibold text-risk">
            Radar moved this client from {client.statusChange.from} to {client.statusChange.to}
          </p>
          <p className="mt-1 text-[13px] text-ink-muted">
            {client.statusChange.changedAgo} · {client.statusChange.signalsThisWeek} new things showed up this week
          </p>
        </div>
      ) : null}

      {client.accountWarnings?.length ? (
        <div className="mt-3 rounded-[var(--radius-card)] border border-warn/30 bg-warn-soft p-4">
          {client.accountWarnings.map((warning) => (
            <p key={warning} className="text-[13px] text-ink">
              {warning}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard label="Owner">
          <span className="flex items-center gap-2">
            <Avatar name={owner.name} size="sm" />
            <span>
              <span className="block font-semibold">{owner.name}</span>
              <span className="text-[12px] font-normal text-ink-faint">{owner.role}</span>
            </span>
          </span>
        </InfoCard>
        <InfoCard label="Renewal date">
          <span className="block font-semibold">{client.renewal}</span>
          <span className="text-[12px] font-normal text-ink-faint">{client.daysToRenewal} days</span>
        </InfoCard>
        <InfoCard label="Revenue">
          <span className="block font-semibold">{gbp(client.retainer)}/mo</span>
          <span className="text-[12px] font-normal text-ink-faint">{gbp(client.retainer * 12)}/yr</span>
        </InfoCard>
        <InfoCard label="Financial context">
          <FinancialSummary client={client} />
        </InfoCard>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {client.health.map((metric) => (
          <div key={metric.label} className="rounded-[var(--radius-card)] border border-line bg-white p-4">
            <p className="text-[12px] text-ink-faint">{metric.label}</p>
            <p className="mt-1 text-[16px] font-bold text-ink">{metric.value}</p>
            <p className="text-[12px] text-ink-faint">{metric.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 rounded-[var(--radius-card)] border border-line bg-white p-6">
        <h2 className="text-[20px] font-bold text-ink">{client.recommendedAction.title}</h2>
        <p className="mt-2 max-w-2xl text-[14.5px] text-ink-muted">{client.recommendedAction.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild className="rounded-full bg-brand px-4 hover:bg-brand-deep">
            <Link href={client.insight ? `/demo/clients/${client.slug}/insight` : `#evidence`}>
              {client.recommendedAction.primaryCta}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#evidence">{client.recommendedAction.secondaryCta}</Link>
          </Button>
        </div>
        <p className="mt-5 text-[12px] font-semibold text-ink">Why Radar is suggesting this</p>
        <ul className="mt-2 space-y-1 text-[13.5px] text-ink-muted">
          {client.recommendedAction.why.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">What changed</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {client.changes.map((change) => (
            <article key={change.title} className="rounded-[var(--radius-card)] border border-line bg-white p-4">
              <h3 className="font-semibold text-ink">{change.title}</h3>
              <p className="mt-1 text-[13.5px] text-ink-muted">{change.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8" id="evidence">
        <EvidenceTable evidence={client.evidence} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["Draft a meeting invite", "Create a task", "Assign someone", "Mark as handled"].map((label) => (
          <Button key={label} variant="outline" size="sm" className="h-8">
            {label}
          </Button>
        ))}
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-[18px] font-bold text-ink">Key contacts</h2>
          <ul className="mt-3 space-y-2">
            {client.contacts.map((contact) => (
              <li key={contact.name} className="rounded-[var(--radius-card)] border border-line bg-white px-4 py-3">
                <div className="flex items-start gap-3">
                  <Avatar name={contact.name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">
                      {contact.name}
                      {contact.primary ? <span className="ml-2 text-[11px] font-semibold text-brand">Primary</span> : null}
                      {contact.renewalInfluence ? (
                        <span className="ml-2 text-[11px] font-semibold text-renewal">Has a say on renewal</span>
                      ) : null}
                    </p>
                    <p className="text-[12px] text-ink-faint">{contact.role}</p>
                    {contact.relationshipRole ? (
                      <p className="mt-1 text-[12px] text-ink-muted">{contact.relationshipRole}</p>
                    ) : null}
                    {contact.engagementTrend ? (
                      <p className="text-[12px] text-ink-muted">
                        {formatEngagementTrend(contact.engagementTrend, contact.engagementChange)}
                      </p>
                    ) : null}
                    <p className="text-[12px] text-ink-faint">{contact.lastInteraction}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-ink">Client details</h2>
          <dl className="mt-3 space-y-2 rounded-[var(--radius-card)] border border-line bg-white p-4 text-[13.5px]">
            <Row label="Company" value={client.name} />
            <Row label="Industry" value={client.industry} />
            <Row label="Contract value" value={`${gbp(client.retainer * 12)} / year`} />
            <Row label="Contract end date" value={client.renewal} />
            <Row label="Time as client" value={client.tenure} />
          </dl>
        </div>
      </section>
    </div>
  );
}

function FinancialSummary({ client }: { client: Client }) {
  const { financials } = client;
  if (financials.mrrExposed && financials.riskWeightedMrr) {
    return (
      <>
        <span className="block font-semibold">{formatMrr(financials.mrrExposed)} exposed</span>
        <span className="text-[12px] font-normal text-risk">{gbp(financials.riskWeightedMrr)} risk-weighted</span>
        <span className="text-[12px] font-normal text-ink-faint">{formatConfidence(financials.confidenceLabel)}</span>
      </>
    );
  }
  if (financials.expansionOpportunity) {
    return (
      <>
        <span className="block font-semibold text-good">{gbp(financials.expansionOpportunity)} opportunity</span>
        <span className="text-[12px] font-normal text-ink-faint">{formatConfidence(financials.confidenceLabel)}</span>
      </>
    );
  }
  if (financials.renewalValue) {
    return (
      <>
        <span className="block font-semibold">{gbp(financials.renewalValue)} renewal value</span>
        <span className="text-[12px] font-normal text-ink-faint">{formatConfidence(financials.confidenceLabel)}</span>
      </>
    );
  }
  return <StateBadge state={client.state} />;
}

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
      <p className="text-[12px] text-ink-faint">{label}</p>
      <div className="mt-1 text-[14px] text-ink">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2 last:border-0">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}
