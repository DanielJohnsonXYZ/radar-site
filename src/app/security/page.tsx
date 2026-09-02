import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";

export const metadata: Metadata = {
  title: "Security",
  description: "Security posture for Radar by We Scale Startups.",
};

export default function SecurityPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand-deep uppercase">Trust centre · updated 5 August 2026</p>
        <h1 className="mt-4 font-heading text-[42px] tracking-tight text-ink">Radar only reads. It never acts for you.</h1>
        <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-muted">
          <p>
            Radar is operated by We Scale Startups. The public site you are reading is a marketing page plus a read-only
            fictional demo. This page describes how the site is secured today and the posture planned for the
            design-partner pilot.
          </p>
          <h2 className="text-[22px] font-bold text-ink">The site today</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Marketing and demo pages are statically generated. There is no login.</li>
            <li>The demo renders a typed, fictional dataset compiled into the site. It does not query private data because none exists.</li>
            <li>Pilot applications are accepted through a first-party form. No advertising cookies or third-party trackers are used.</li>
            <li>Every connection uses HTTPS with HSTS.</li>
          </ul>
          <h2 className="text-[22px] font-bold text-ink">Planned pilot posture</h2>
          <p>The pilot version of Radar will process selected client communications for pilot customers:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Radar is read-only. It never sends messages or changes client data.</li>
            <li>Every finding links to the messages, meetings or activity behind it.</li>
            <li>You choose exactly which sources connect.</li>
            <li>During the pilot, findings are human-reviewed before you see them.</li>
            <li>Workspaces isolated per customer with database row-level security.</li>
            <li>Communication content never used to train models.</li>
            <li>Defined retention: pilot workspace content deleted no later than 30 days after a pilot ends, sooner on request.</li>
          </ul>
          <p className="text-[14px] text-ink-faint">
            Data hosting region: UK/EU (placeholder — confirm with founder before ship).
          </p>
          <p>
            The pilot privacy pack — draft DPA, DPIA screening, retention policy and sub-processor list — is prepared and
            shared with pilot customers before onboarding.
          </p>
          <h2 className="text-[22px] font-bold text-ink">Reporting a vulnerability</h2>
          <p>
            Report a suspected vulnerability privately to{" "}
            <a className="font-medium text-brand" href="mailto:daniel@wescalestartups.com">
              daniel@wescalestartups.com
            </a>
            . Include the affected route, time and reproducible behaviour. We will acknowledge a credible report and
            coordinate remediation directly.
          </p>
        </div>
        <p className="mt-10 text-[14px] text-ink-muted">
          <Link href="/privacy" className="text-brand hover:text-brand-deep">
            Read the privacy notice
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
