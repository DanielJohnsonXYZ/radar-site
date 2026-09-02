import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto max-w-6xl px-6", className)}>{children}</div>;
}

export function SectionKicker({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase",
        onDark ? "bg-white/10 text-white/80" : "bg-brand-soft text-brand-deep",
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <h2
      className={cn(
        "mt-4 max-w-2xl font-heading text-[32px] leading-[1.12] tracking-tight sm:text-[40px]",
        onDark ? "text-white" : "text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-deep",
        className,
      )}
    >
      Demo data
    </span>
  );
}
