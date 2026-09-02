export function RadarMark({
  className,
  onDark = false,
  size = 34,
}: {
  className?: string;
  onDark?: boolean;
  size?: number;
}) {
  const stroke = onDark ? "#ffffff" : "#071536";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="15" cy="19" r="4.5" stroke={stroke} strokeOpacity="1" strokeWidth="2" strokeLinecap="round" />
      <circle
        cx="15"
        cy="19"
        r="9.5"
        stroke={stroke}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeDasharray="22 8"
        strokeLinecap="round"
      />
      <circle
        cx="15"
        cy="19"
        r="14.5"
        stroke={stroke}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeDasharray="22 8"
        strokeLinecap="round"
      />
      <circle cx="15" cy="19" r="2" fill="#1262ff" />
    </svg>
  );
}

export function RadarWordmark({
  onDark = false,
  compact = false,
}: {
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <RadarMark onDark={onDark} size={compact ? 20 : 34} className="shrink-0" />
      <span className="leading-none">
        <span className={`block font-bold tracking-tight ${compact ? "text-[11px]" : "text-[22px]"} ${onDark ? "text-white" : "text-navy"}`}>
          Radar
        </span>
        <span className={`mt-0.5 block font-medium ${compact ? "text-[6.5px] text-white/60" : "text-[10.5px] text-ink-muted"}`}>
          by We Scale Startups
        </span>
      </span>
    </span>
  );
}
