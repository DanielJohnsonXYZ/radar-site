import Link from "next/link";
import { Check } from "lucide-react";
import { PilotForm } from "@/components/marketing/pilot-form";
import { Container } from "@/components/marketing/primitives";

const terms = [
  "Free if you’re in the first group",
  "About 6–8 weeks",
  "Read-only — Radar never emails your clients",
  "You can leave anytime; we delete data within 30 days",
];

export function PilotSection() {
  return (
    <section id="pilot" className="scroll-mt-24 border-t border-line bg-page">
      <Container className="grid gap-8 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-[13px] font-medium text-brand">Founding pilot</p>
          <h2 className="mt-2 font-heading text-[32px] leading-[1.12] tracking-tight text-ink sm:text-[40px]">
            Try Radar on a handful of your real clients.
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-ink-muted">
            We’ll connect the tools you choose, show you what it finds, and check the first results with you before
            anything looks automatic.
          </p>
          <ul className="mt-6 space-y-2.5">
            {terms.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[14px] text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/demo" className="mt-8 inline-flex text-[13px] font-semibold text-brand hover:text-brand-deep">
            I’d rather click around the demo first →
          </Link>
        </div>
        <div className="rounded-[22px] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <PilotForm />
        </div>
      </Container>
    </section>
  );
}
