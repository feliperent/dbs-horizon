"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Signal {
  surface: "mirror" | "plan" | "founder";
  href: string;
  label: string;
  value: string;
  trend?: string;
}

const signals: Signal[] = [
  {
    surface: "mirror",
    href: "/mirror",
    label: "Mirror",
    value: "Comfort gap 38%",
    trend: "down 4 pts vs last week",
  },
  {
    surface: "plan",
    href: "/plan",
    label: "Plan",
    value: "6 cards queued · D+02 next",
    trend: "1 biometric pending (SRS)",
  },
  {
    surface: "founder",
    href: "/founder",
    label: "Founder",
    value: "Stage 3 of 8 · drafting",
    trend: "Tokyo pop-up SGD 35k",
  },
];

const surfaceColor: Record<Signal["surface"], string> = {
  mirror: "bg-dbsRedLight text-dbsRedDark",
  plan: "bg-dbsAmber/15 text-dbsAmber",
  founder: "bg-dbsGreen/15 text-dbsGreen",
};

export default function TodayStrip() {
  const path = usePathname() ?? "/";
  const others = signals.filter((s) => !path.startsWith(s.href));

  if (others.length === 0) return null;

  return (
    <div className="bg-dbsSurface border-b border-dbsLine">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4 overflow-x-auto">
        <div className="text-[10px] font-bold uppercase tracking-widest text-dbsGray shrink-0">
          Today across Horizon
        </div>
        {others.map((s) => (
          <Link
            key={s.surface}
            href={s.href}
            className="flex items-center gap-2 shrink-0 hover:opacity-80"
          >
            <span
              className={
                "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full " +
                surfaceColor[s.surface]
              }
            >
              {s.label}
            </span>
            <span className="text-xs font-semibold text-dbsInk">{s.value}</span>
            {s.trend && <span className="text-[11px] text-dbsGray">· {s.trend}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
