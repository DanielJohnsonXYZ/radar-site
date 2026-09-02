import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-24 text-center">
        <p className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-brand-deep uppercase">404</p>
        <h1 className="mt-4 font-heading text-[42px] tracking-tight text-ink">This page isn’t here.</h1>
        <p className="mt-3 text-[15px] text-ink-muted">That link doesn’t exist, or that demo client isn’t in this made-up set.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild className="rounded-full bg-brand px-5 hover:bg-brand-deep">
            <Link href="/">Back to Radar</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/demo">Open the demo</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
