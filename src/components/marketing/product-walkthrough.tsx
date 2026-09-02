import Link from "next/link";
import { GmailLogo, SlackLogo, ZoomLogo } from "@/components/marketing/tool-logos";
import { Container } from "@/components/marketing/primitives";

const steps = [
  {
    n: "1",
    title: "Connect the tools you already use",
    body: "Gmail or Outlook, Slack, Zoom or Google Meet. Radar only reads. It never emails your clients.",
  },
  {
    n: "2",
    title: "Radar watches overnight",
    body: "It looks for people going quiet, extra work being asked for, and promises that slipped.",
  },
  {
    n: "3",
    title: "You get a short list in the morning",
    body: "Who might leave. Who might buy more. What you said you’d send. Each one has the proof and a next step.",
  },
];

export function ProductWalkthrough() {
  return (
    <section className="bg-page">
      <Container className="py-16 sm:py-20">
        <p className="text-[13px] font-medium text-ink-muted">How you use it</p>
        <h2 className="mt-2 max-w-2xl font-heading text-[32px] tracking-tight text-ink sm:text-[40px]">
          You don’t get a score. You get the story, the proof, and what to do.
        </h2>

        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-[20px] border border-line bg-white p-5">
              <p className="text-[12px] font-semibold text-brand">{step.n}</p>
              <p className="mt-2 text-[17px] font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <Link
          href="/demo/clients/brightpath/insight"
          className="mt-8 block overflow-hidden rounded-[22px] border border-line bg-white shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-lift)]"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8">
              <p className="text-[12px] font-semibold text-ink">An email Radar drafted for you</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">Hi James,</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                I wanted to pick up the reporting issue you raised after the Q2 review. We still owe you clarity on the
                numbers, and I don’t want that hanging over the renewal conversation. Could we grab 20 minutes this week
                to resolve it?
              </p>
              <p className="mt-3 text-[15px] text-ink">Sarah</p>
              <p className="mt-6 text-[13px] text-ink-faint">
                Radar never sends this. You copy it, edit it, and send it yourself.
              </p>
            </div>
            <div className="border-t border-line bg-page p-6 lg:border-l lg:border-t-0 sm:p-8">
              <p className="text-[12px] font-semibold text-ink">Pulled from</p>
              <ul className="mt-3 space-y-3 text-[14px] text-ink-muted">
                <li className="flex gap-3">
                  <GmailLogo className="mt-0.5 size-5 shrink-0" />
                  James’s email about the Q2 report, still unanswered
                </li>
                <li className="flex gap-3">
                  <ZoomLogo className="mt-0.5 size-5 shrink-0" />
                  The review call where two people didn’t show
                </li>
                <li className="flex gap-3">
                  <SlackLogo className="mt-0.5 size-5 shrink-0" />
                  Priya saying the numbers don’t match
                </li>
              </ul>
              <p className="mt-8 text-[13px] font-semibold text-brand">Open the full BrightPath brief →</p>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
