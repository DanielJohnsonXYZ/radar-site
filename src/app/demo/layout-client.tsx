"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { CheckSquare, LayoutGrid, PanelsTopLeft, Plug, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { RadarWordmark } from "@/components/radar-mark";
import { Avatar } from "@/components/status-badge";
import { CURRENT_USER } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const BANNER_KEY = "radar-pilot-banner-dismissed";

const BANNER_EVENT = "radar-banner-dismiss";

function subscribe(callback: () => void) {
  window.addEventListener(BANNER_EVENT, callback);
  return () => window.removeEventListener(BANNER_EVENT, callback);
}

function getBannerDismissed() {
  return sessionStorage.getItem(BANNER_KEY) === "1";
}

function getServerBannerDismissed() {
  return false;
}

function useBannerDismissed() {
  return useSyncExternalStore(subscribe, getBannerDismissed, getServerBannerDismissed);
}

const links = [
  { href: "/demo", label: "Today", icon: LayoutGrid },
  { href: "/demo/clients", label: "Clients", icon: PanelsTopLeft, match: "/demo/clients" },
  { href: "/demo/commitments", label: "Commitments", icon: CheckSquare, match: "/demo/commitments" },
  { href: "/demo/integrations", label: "Integrations", icon: Plug },
];

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const bannerDismissed = useBannerDismissed();

  function dismissBanner() {
    sessionStorage.setItem(BANNER_KEY, "1");
    window.dispatchEvent(new Event(BANNER_EVENT));
  }

  return (
    <div className="flex min-h-full bg-page">
      <aside
        className={cn(
          "radar-rings relative hidden shrink-0 flex-col bg-navy text-white md:flex [--rings-x:30%] [--rings-y:110%]",
          collapsed ? "w-[72px] px-2 py-4" : "w-[220px] px-3 py-4",
        )}
      >
        <Link href="/" className={cn("px-1", collapsed && "flex justify-center")} aria-label="Radar home">
          {collapsed ? (
            <span className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-[11px] font-bold">R</span>
          ) : (
            <RadarWordmark onDark compact />
          )}
        </Link>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {links.map((link) => {
            const active =
              link.href === "/demo"
                ? pathname === "/demo"
                : pathname === link.href || (link.match ? pathname.startsWith(link.match) : false);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition",
                  active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
                  collapsed && "justify-center px-0",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {collapsed ? null : link.label}
              </Link>
            );
          })}
        </nav>
        <div className={cn("mt-auto border-t border-white/10 pt-3", collapsed && "flex flex-col items-center")}>
          <div className="flex items-center gap-2 px-1">
            <Avatar name={CURRENT_USER.name} size="sm" />
            {collapsed ? null : (
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold">{CURRENT_USER.name}</p>
                <p className="truncate text-[10px] text-white/60">{CURRENT_USER.title}</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-white/60 hover:bg-white/5 hover:text-white"
          >
            {collapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
            {collapsed ? null : "Collapse"}
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        {!bannerDismissed ? (
          <div className="flex items-center justify-between gap-3 border-b border-brand/20 bg-brand-soft px-4 py-2 text-[13px] text-brand-deep md:px-6">
            <p>
              Like what you see? This is a demo with made-up clients.{" "}
              <Link href="/#pilot" className="font-semibold underline-offset-4 hover:underline">
                Try it with your real clients →
              </Link>
            </p>
            <button type="button" onClick={dismissBanner} className="rounded-md p-1 hover:bg-brand/10" aria-label="Dismiss banner">
              <X className="size-4" />
            </button>
          </div>
        ) : null}
        <header className="flex h-12 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-2 text-[12px] text-ink-muted">
            <span className="rounded-full bg-brand-soft px-2 py-0.5 font-semibold text-brand-deep">Demo data</span>
            <span>{CURRENT_USER.agency}</span>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] font-medium text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
