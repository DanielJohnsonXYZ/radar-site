import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for Radar by We Scale Startups.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand-deep uppercase">Privacy notice · updated 5 August 2026</p>
        <h1 className="mt-4 font-heading text-[42px] tracking-tight text-ink">How we handle your data</h1>
        <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-muted">
          <p>
            Radar is an early-stage product operated by We Scale Startups. Its job is to help client teams notice
            developing risks, opportunities and unresolved commitments in their client relationships — not to make
            decisions about individuals or monitor employee performance.
          </p>
          <h2 className="text-[22px] font-bold text-ink">What this website processes today</h2>
          <p>
            This site is a marketing page and a read-only product demo. The marketing page includes a founding-pilot
            application form. Demo pages have no user accounts. The site does not set advertising cookies or use
            third-party trackers. Standard, short-lived infrastructure logs (such as request timestamps and IP addresses)
            are processed by our hosting provider to serve and protect the site.
          </p>
          <h2 className="text-[22px] font-bold text-ink">The demo is fictional</h2>
          <p>
            Every client, company, person, message and number in the demo is invented. The demo does not query, contain
            or reveal any real customer data, and nothing you view in it is stored about you beyond the standard hosting
            logs above.
          </p>
          <h2 className="text-[22px] font-bold text-ink">If you apply for the founding pilot</h2>
          <p>
            The pilot application form collects your name, work email, primary engagement model, number of client
            relationships you manage, and an optional note about what you want Radar to catch first. We use this
            information to assess fit, reply to your enquiry and coordinate onboarding. We do not add you to marketing
            lists.
          </p>
          <p>
            Applications are retained for up to 12 months unless you ask us to delete them sooner. To request deletion,
            email{" "}
            <a className="font-medium text-brand" href="mailto:daniel@wescalestartups.com">
              daniel@wescalestartups.com
            </a>
            .
          </p>
          <h2 className="text-[22px] font-bold text-ink">When the pilot product launches</h2>
          <p>
            The pilot version of Radar will process selected client communications on behalf of pilot customers under a
            data processing agreement, with the pilot customer as controller and We Scale Startups as processor.
            Communication content will not be used to train models. The full pilot privacy pack — including the draft DPA,
            retention policy and sub-processor list — is prepared and will be shared with pilot customers before any data
            is processed.
          </p>
          <h2 className="text-[22px] font-bold text-ink">Your rights</h2>
          <p>
            Depending on context, you may have rights to access, correct, erase, restrict or object to processing of your
            personal data, and to receive portable data. You may also complain to the UK Information Commissioner&apos;s
            Office at ico.org.uk.
          </p>
          <p>
            Questions:{" "}
            <a className="font-medium text-brand" href="mailto:daniel@wescalestartups.com">
              daniel@wescalestartups.com
            </a>
          </p>
        </div>
        <p className="mt-10 text-[14px] text-ink-muted">
          <Link href="/security" className="text-brand hover:text-brand-deep">
            Read the security note
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
