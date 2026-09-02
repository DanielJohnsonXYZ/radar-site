import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccountBriefVisual } from "@/components/marketing/account-brief-visual";
import { GmailLogo, MeetLogo, OutlookLogo, SlackLogo, ZoomLogo } from "@/components/marketing/tool-logos";
import { Button } from "@/components/ui/button";

const tools = [
  { name: "Gmail", Logo: GmailLogo },
  { name: "Outlook", Logo: OutlookLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Zoom", Logo: ZoomLogo },
  { name: "Google Meet", Logo: MeetLogo },
];

export function MarketingHero() {
  return (
    <section className="navy-mesh relative overflow-hidden pb-8 pt-14 text-white sm:pb-4 lg:pt-16">
      <div className="radar-rings pointer-events-none absolute inset-0 [--rings-x:50%] [--rings-y:18%]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-[13px] font-medium text-blue-200">For agencies and freelancers</p>
        <h1 className="font-heading text-[36px] leading-[1.06] tracking-tight sm:text-[52px]">
          The world’s best always-on account manager.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">
          It identifies upsells, churn risks, and everything else — by reading your client emails, meetings and Slack.
          Then it tells you who might leave, who might buy more, and what you promised but haven’t done.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="h-11 rounded-full bg-brand px-5 text-[14px] font-semibold text-white shadow-[0_10px_28px_rgb(18_98_255/0.45)] hover:bg-brand-deep"
          >
            <Link href="/demo">
              See how it works
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Link
            href="/#pilot"
            className="inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-[14px] font-semibold text-white transition hover:bg-white/10"
          >
            Try it with your clients
          </Link>
        </div>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[12px] text-white/90"
            >
              <tool.Logo className="size-3.5" />
              {tool.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:mt-14">
        <div className="hero-glow pointer-events-none absolute inset-x-10 -top-8 h-40 blur-3xl" />
        <div className="hero-rise relative">
          <AccountBriefVisual />
        </div>
      </div>
    </section>
  );
}
