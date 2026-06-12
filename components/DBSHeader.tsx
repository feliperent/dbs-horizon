"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import TodayStrip from "./TodayStrip";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/mirror", label: "Mirror" },
  { href: "/plan", label: "Plan" },
  { href: "/founder", label: "Founder" },
];

export default function DBSHeader() {
  const path = usePathname();
  return (
    <header className="bg-white border-b border-dbsLine sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" aria-label="DBS Horizon home" className="flex items-center">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.href || (n.href !== "/" && path?.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors " +
                  (active
                    ? "bg-dbsRed text-white"
                    : "text-dbsInk hover:bg-dbsRedLight hover:text-dbsRedDark")
                }
              >
                {n.label}
              </Link>
            );
          })}
          <div className="ml-3 pl-3 border-l border-dbsLine flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-dbsRed text-white flex items-center justify-center text-xs font-bold">
              MT
            </div>
            <span className="text-sm font-medium text-dbsInk hidden sm:inline">Mei Tan</span>
          </div>
        </nav>
      </div>
      <TodayStrip />
    </header>
  );
}
