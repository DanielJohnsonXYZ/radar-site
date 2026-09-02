import Link from "next/link";
import { RadarWordmark } from "@/components/radar-mark";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/#product", label: "Product" },
  { href: "/demo", label: "Demo" },
  { href: "/#pilot", label: "Pilot" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Radar home" className="shrink-0">
          <RadarWordmark />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ink-muted transition hover:bg-page hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          className="h-9 rounded-full bg-brand px-4 text-[13px] font-semibold shadow-[0_1px_2px_rgb(18_98_255/0.35)] hover:bg-brand-deep"
        >
          <Link href="/#pilot">Try it with your clients</Link>
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <RadarWordmark onDark />
          <p className="mt-3 max-w-sm text-[13px] text-white/55">
            An always-on account manager that spots upsells, churn risks, and the promises hiding in your tools.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/70">
          <Link href="/demo" className="hover:text-white">
            Demo
          </Link>
          <Link href="/#pilot" className="hover:text-white">
            Founding pilot
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/security" className="hover:text-white">
            Security
          </Link>
          <a href="mailto:daniel@wescalestartups.com" className="hover:text-white">
            daniel@wescalestartups.com
          </a>
        </div>
      </div>
    </footer>
  );
}
