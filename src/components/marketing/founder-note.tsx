import { Container } from "@/components/marketing/primitives";

export function FounderNote() {
  return (
    <section>
      <Container className="py-16">
        <blockquote className="max-w-3xl">
          <p className="font-heading text-[26px] leading-[1.25] tracking-tight text-ink sm:text-[32px]">
            “Agencies don’t usually lose a client in a spreadsheet. They lose them in an unanswered email. I built Radar
            to catch that while you can still do something about it.”
          </p>
          <footer className="mt-6 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-navy font-heading text-sm text-white">
              DJ
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-ink">Daniel Johnson</span>
              <span className="text-[13px] text-ink-muted">Founder, We Scale Startups</span>
            </span>
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}
