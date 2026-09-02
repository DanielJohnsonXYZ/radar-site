import Link from "next/link";
import { INTEGRATION_GROUPS } from "@/lib/integrations-data";
import { ToolLogo } from "@/components/marketing/tool-logos";
import { Container } from "@/components/marketing/primitives";

export function IntegrationsTeaser() {
  const tools = INTEGRATION_GROUPS.flatMap((group) => group.items);

  return (
    <section>
      <Container className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-[32px] tracking-tight text-ink">It reads Gmail, Slack, Zoom and the rest.</h2>
            <p className="mt-2 max-w-xl text-[15px] text-ink-muted">
              Start with the tools where client work already happens. Radar only reads. It never sends messages for you.
            </p>
          </div>
          <Link href="/demo/integrations" className="text-[13px] font-semibold text-brand hover:text-brand-deep">
            See what’s ready now →
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((item) => (
            <li key={item.name} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-3 py-3">
              <span className="flex size-9 items-center justify-center rounded-xl border border-line bg-page">
                <ToolLogo name={item.name} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-ink">{item.name}</span>
                <span className="text-[11px] text-ink-faint">
                  {item.tier === "pilot" ? "Ready in the pilot" : item.tier === "in-development" ? "We’re building this" : "On the list"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
