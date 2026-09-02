import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/marketing/primitives";
import { clientBySlug } from "@/lib/demo-data";
import { gbp } from "@/lib/format";

const stories = [
  {
    slug: "brightpath",
    href: "/demo/clients/brightpath",
    kind: "Might leave",
    kindClass: "text-risk",
    title: "This client has gone quiet",
    body: "The Q2 report is still wrong. James hasn’t replied in 11 days. Renewal is in 61 days.",
    metric: `${gbp(5000)} / month`,
    metricLabel: "you could lose",
  },
  {
    slug: "northstar",
    href: "/demo/clients/northstar",
    kind: "Might buy more",
    kindClass: "text-good",
    title: "This client asked for extra work",
    body: "They’re hiring, expanding into new markets, and asked you for a pricing proposal.",
    metric: gbp(6000),
    metricLabel: "of extra work on the table",
  },
  {
    slug: "motive-labs",
    href: "/demo/commitments",
    kind: "You promised this",
    kindClass: "text-warn",
    title: "Two things you said you’d send are late",
    body: "Brand guidelines and the Q3 media plan. They already asked where they are.",
    metric: "2",
    metricLabel: "promises overdue",
  },
];

export function WhatRadarFinds() {
  return (
    <section id="product" className="scroll-mt-24 bg-white">
      <Container className="py-16 sm:py-20">
        <p className="text-[13px] font-medium text-ink-muted">What Radar actually does</p>
        <h2 className="mt-2 max-w-2xl font-heading text-[32px] leading-[1.12] tracking-tight text-ink sm:text-[40px]">
          It finds churn risk, upsells, and the emails you said you’d send.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-ink-muted">
          Click a client to see the emails, calls and Slack messages behind it. Everything here is a demo.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stories.map((story) => {
            const client = clientBySlug(story.slug);
            return (
              <Link
                key={story.slug}
                href={story.href}
                className="group flex flex-col rounded-[20px] border border-line bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <p className={`text-[12px] font-semibold ${story.kindClass}`}>{story.kind}</p>
                <p className="mt-3 text-[18px] font-semibold text-ink">{client.name}</p>
                <p className="mt-1 text-[15px] font-medium text-ink">{story.title}</p>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">{story.body}</p>
                <p className="mt-5 font-heading text-[28px] leading-none text-ink">{story.metric}</p>
                <p className="mt-1 text-[13px] text-ink-muted">{story.metricLabel}</p>
                <p className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
                  See the proof
                  <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
