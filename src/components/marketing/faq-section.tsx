import { ChevronDown } from "lucide-react";
import { Container } from "@/components/marketing/primitives";

const items = [
  {
    q: "What does Radar do?",
    a: "It reads your client emails, meetings and Slack (with your permission). Then it tells you who might leave, who might buy more work, and what you promised but haven’t done.",
  },
  {
    q: "Who is it for?",
    a: "Agencies, consultancies and freelancers looking after about 5–30 clients they can’t afford to lose.",
  },
  {
    q: "Does it email my clients?",
    a: "No. Radar only reads. It can draft a message; you send it if you want.",
  },
  {
    q: "How long is the pilot?",
    a: "Around 6–8 weeks. We’ll agree the exact dates before you start.",
  },
  {
    q: "What if I want out?",
    a: "Disconnect your tools anytime. We delete your pilot data within 30 days.",
  },
  {
    q: "Which tools work today?",
    a: "Gmail, Outlook, Slack, Zoom and Google Meet. The rest are being built or on the list.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-line bg-white">
      <Container className="py-16">
        <h2 className="font-heading text-[32px] tracking-tight text-ink">Questions</h2>
        <div className="mt-6 divide-y divide-line overflow-hidden rounded-[20px] border border-line">
          {items.map((item) => (
            <details key={item.q} className="group bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="size-4 shrink-0 text-ink-faint transition group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-4 text-[14px] leading-relaxed text-ink-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
