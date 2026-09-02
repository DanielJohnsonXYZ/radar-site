import type { Metadata } from "next";
import { ToolLogo } from "@/components/marketing/tool-logos";
import { INTEGRATION_GROUPS } from "@/lib/integrations-data";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Gmail, Slack, Zoom and the rest.",
};

const tierStyles = {
  pilot: "bg-good-soft text-good",
  "in-development": "bg-warn-soft text-warn",
  planned: "bg-page text-ink-faint",
} as const;

const tierHelp = {
  pilot: "Works in the pilot",
  "in-development": "We’re building this",
  planned: "On the list",
} as const;

export default function IntegrationsPage() {
  const pilotCount = INTEGRATION_GROUPS.flatMap((g) => g.items).filter((i) => i.tier === "pilot").length;

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight text-ink">Connect Gmail, Slack, Zoom and more</h1>
          <p className="mt-1 text-[14px] text-ink-muted">
            Radar reads these tools. It never sends messages or changes anything.
          </p>
        </div>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-deep">Demo data</span>
      </div>
      <ol className="mb-8 flex flex-wrap gap-4 text-[13px] text-ink-muted">
        <li>
          <span className="mr-1 font-bold text-brand">1</span>Pick the tools you use
        </li>
        <li>
          <span className="mr-1 font-bold text-ink-faint">2</span>Check what Radar can read
        </li>
        <li>
          <span className="mr-1 font-bold text-ink-faint">3</span>Finish setup
        </li>
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-8">
          {INTEGRATION_GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-[16px] font-bold text-ink">{group.title}</h2>
              <ul className="mt-3 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-page">
                        <ToolLogo name={item.name} className="size-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-[12px] text-ink-faint">
                          {item.category} · {item.detail}
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tierStyles[item.tier]}`}>
                      {tierHelp[item.tier]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-5">
            <p className="text-[12px] font-semibold text-ink-faint">Ready in the pilot</p>
            <p className="mt-2 text-[28px] font-bold text-ink">{pilotCount}</p>
            <p className="text-[13px] text-ink-muted">tools you can connect today</p>
            <p className="mt-2 text-[12.5px] text-ink-faint">
              Gmail, Outlook, Slack, Zoom and Google Meet work in the pilot. The rest are being built or on the list.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-5">
            <p className="text-[12px] font-semibold text-ink-faint">What Radar can and can’t do</p>
            <ul className="mt-3 space-y-2 text-[13.5px] text-ink-muted">
              <li>It only reads. It never emails clients.</li>
              <li>You pick which tools to connect.</li>
              <li>Every alert links back to the original message.</li>
              <li>You can disconnect and we’ll delete the data.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
