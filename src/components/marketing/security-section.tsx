import Link from "next/link";
import { EyeOff, FileSearch, Lock, UserCheck } from "lucide-react";
import { Container } from "@/components/marketing/primitives";

const chips = [
  { icon: EyeOff, label: "Read-only — never emails clients" },
  { icon: FileSearch, label: "Every alert has proof" },
  { icon: Lock, label: "You choose which tools to connect" },
  { icon: UserCheck, label: "We check findings during the pilot" },
];

export function SecuritySection() {
  return (
    <section className="border-y border-line bg-page">
      <Container className="flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-[28px] tracking-tight text-ink sm:text-[32px]">
            It watches. It doesn’t act for you.
          </h2>
          <p className="mt-1 text-[14px] text-ink-muted">Disconnect anytime. We’ll delete your data within 30 days.</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {chips.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-medium text-ink"
            >
              <item.icon className="size-3.5 text-brand" />
              {item.label}
            </li>
          ))}
          <li>
            <Link href="/security" className="inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-semibold text-brand">
              How we keep it safe →
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
