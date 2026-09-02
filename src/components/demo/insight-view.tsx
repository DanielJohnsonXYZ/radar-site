"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Client } from "@/lib/demo-data";
import { gbp } from "@/lib/format";

export function InsightView({ client, ownerName }: { client: Client; ownerName: string }) {
  const insight = client.insight;
  const [copied, setCopied] = useState(false);
  if (!insight) return null;
  const draft = insight.draft;

  async function copyDraft() {
    const text = `${draft.greeting}\n\n${draft.body}\n\n${draft.signoff}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <p className="text-[12px] text-ink-faint">
        <Link href="/demo/clients" className="hover:text-brand">
          Clients
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/demo/clients/${client.slug}`} className="hover:text-brand">
          {client.name}
        </Link>
        <span className="mx-1.5">/</span>
        Insight
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight text-ink">{insight.heading}</h1>
          <p className="mt-1 max-w-2xl text-[14.5px] text-ink-muted">{insight.kicker}</p>
        </div>
        <p className="text-[12px] text-ink-faint">Last synced 12 min ago</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
          <p className="text-[12px] text-ink-faint">Client</p>
          <p className="mt-1 font-semibold text-ink">{client.name}</p>
          <p className="text-[12px] text-ink-faint">Retainer {gbp(client.retainer)}/mo</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
          <p className="text-[12px] text-ink-faint">What’s going on</p>
          <p className="mt-1 font-semibold text-ink">{insight.typeLabel}</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
          <p className="text-[12px] text-ink-faint">{insight.impactLabel}</p>
          <p className="mt-1 font-semibold text-ink">{insight.impactValue}</p>
          <p className="text-[12px] text-ink-faint">{insight.impactHint}</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
          <p className="text-[12px] text-ink-faint">How sure Radar is</p>
          <p className="mt-1 font-semibold text-ink">{insight.confidenceLabel}</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-4">
          <p className="text-[12px] text-ink-faint">Owner</p>
          <p className="mt-1 font-semibold text-ink">{ownerName}</p>
          <p className="text-[12px] text-ink-faint">{insight.due}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">How Radar spotted this</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {insight.steps.map((step, index) => (
            <li key={step.title} className="rounded-[var(--radius-card)] border border-line bg-white p-4">
              <p className="text-[11px] font-bold text-brand">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-[13px] text-ink-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-[var(--radius-card)] border border-line bg-white p-6">
        <h2 className="text-[18px] font-bold text-ink">What Radar noticed</h2>
        <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-ink-muted">{insight.noticed}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {insight.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-page p-4">
              <p className="text-[22px] font-bold text-ink">{stat.value}</p>
              <p className="text-[12px] text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-ink">What happened, in order</h2>
        <ol className="mt-4 space-y-3">
          {insight.timeline.map((item, index) => (
            <li key={item.title} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-white p-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="text-[12px] text-ink-faint">{item.when}</p>
                <p className="mt-1 text-[13.5px] text-ink-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href={`/demo/clients/${client.slug}#evidence`} className="mt-4 inline-flex text-[13px] font-semibold text-brand">
          View the emails, calls and Slack →
        </Link>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
          <h2 className="text-[18px] font-bold text-ink">Why it matters</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">{insight.why}</p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
          <h2 className="text-[18px] font-bold text-ink">What to do next</h2>
          <ol className="mt-3 space-y-3">
            {insight.actions.map((action, index) => (
              <li key={action.title} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand-deep">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{action.title}</span>
                  <span className="text-[13px] text-ink-muted">{action.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-8 rounded-[var(--radius-card)] border border-line bg-white p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[18px] font-bold text-ink">A message you can send</h2>
            <p className="mt-1 text-[13px] text-ink-muted">Radar wrote this. It will not send it. You copy it if you want.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={copyDraft}>
            {copied ? "Copied" : "Copy message"}
          </Button>
        </div>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-[14.5px] leading-relaxed text-ink">
          {insight.draft.greeting}

          {insight.draft.body}

          {insight.draft.signoff}
        </pre>
      </section>
    </div>
  );
}
