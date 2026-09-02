import Link from "next/link";
import { RadarWordmark } from "@/components/radar-mark";
import {
  GmailLogo,
  MeetLogo,
  OutlookLogo,
  SlackLogo,
  ToolLogo,
  ZoomLogo,
} from "@/components/marketing/tool-logos";
import { gbp } from "@/lib/format";

const watching = [
  { name: "Gmail", Logo: GmailLogo },
  { name: "Outlook", Logo: OutlookLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Zoom", Logo: ZoomLogo },
  { name: "Google Meet", Logo: MeetLogo },
];

const messages = [
  {
    source: "Gmail",
    from: "James Lee",
    when: "11 days ago",
    subject: "The Q2 report is still wrong",
    quote: "Can someone actually fix the numbers this week? We’re making decisions on this.",
  },
  {
    source: "Zoom",
    from: "Q2 review call",
    when: "4 days ago",
    subject: "Only 3 of 5 people showed up",
    quote: "James and Tom skipped. The call ended 18 minutes early.",
  },
  {
    source: "Slack",
    from: "Priya Nair",
    when: "7 days ago",
    subject: "#client-updates",
    quote: "These numbers don’t match what we were sent.",
  },
];

export function AccountBriefVisual() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-page text-ink shadow-[0_24px_80px_rgb(0_0_0/0.45)] ring-1 ring-white/15">
      <div className="flex items-center gap-3 border-b border-white/10 bg-navy px-4 py-3 text-white sm:px-5">
        <RadarWordmark onDark compact />
        <p className="text-[13px] font-medium text-white/80">This morning’s brief</p>
        <span className="ml-auto hidden rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80 sm:inline">
          Demo with made-up clients
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-4 py-3 sm:px-5">
        <p className="text-[12px] font-semibold text-ink">Radar read last night’s</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {watching.map((tool) => (
            <span
              key={tool.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-2 py-1 text-[11px] font-medium text-ink"
            >
              <tool.Logo className="size-3.5" />
              {tool.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold text-risk">This client might leave</p>
              <p className="mt-1 text-[22px] font-semibold tracking-tight">BrightPath</p>
              <p className="text-[13px] text-ink-muted">
                {gbp(5000)} a month · they haven’t said they’re staying
              </p>
            </div>
            <span className="rounded-full bg-risk-soft px-2.5 py-1 text-[11px] font-semibold text-risk">
              Do this first
            </span>
          </div>

          <p className="mt-5 text-[12px] font-semibold text-ink">Radar found this in their emails and calls</p>
          <ul className="mt-2 space-y-2">
            {messages.map((item) => (
              <li key={item.source} className="rounded-xl border border-line bg-page/80 p-3">
                <div className="flex items-center gap-2">
                  <ToolLogo name={item.source} className="size-4 shrink-0" />
                  <p className="min-w-0 flex-1 truncate text-[12px] font-semibold text-ink">{item.subject}</p>
                  <p className="shrink-0 text-[11px] text-ink-faint">{item.when}</p>
                </div>
                <p className="mt-1 text-[11px] text-ink-faint">
                  {item.source} · {item.from}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-ink">“{item.quote}”</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between bg-navy p-5 text-white sm:p-6">
          <div>
            <p className="text-[12px] font-semibold text-blue-300">What Radar wants you to do</p>
            <p className="mt-3 font-heading text-[26px] leading-tight sm:text-[28px]">
              Fix the report. Then talk about staying.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              Don’t open with “shall we renew?” James is still waiting on the numbers. Sort that, then book the call.
              Radar can draft the email — you send it.
            </p>
          </div>
          <Link
            href="/demo/clients/brightpath/insight"
            className="mt-6 inline-flex h-10 w-fit items-center rounded-full bg-brand px-4 text-[13px] font-semibold hover:bg-brand-deep"
          >
            Open this brief
          </Link>
        </div>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        <Link href="/demo/clients/northstar" className="flex items-start gap-3 bg-white px-4 py-3.5 hover:bg-page sm:px-5">
          <span className="mt-0.5 rounded-full bg-good-soft px-2 py-0.5 text-[10px] font-semibold text-good">
            Might buy more
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-ink">Northstar asked for extra work</span>
            <span className="text-[12px] text-ink-muted">They want a proposal for two new markets · {gbp(6000)}</span>
          </span>
        </Link>
        <Link href="/demo/commitments" className="flex items-start gap-3 bg-white px-4 py-3.5 hover:bg-page sm:px-5">
          <span className="mt-0.5 rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold text-warn">
            You promised this
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-ink">Motive Labs is waiting on two things</span>
            <span className="text-[12px] text-ink-muted">Brand guidelines and the Q3 media plan are late</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
