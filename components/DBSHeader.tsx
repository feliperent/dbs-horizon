"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import AtlasAvatar from "./AtlasAvatar";
import { aaron, linwei } from "@/lib/mockData";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/mirror", label: "Mirror" },
  { href: "/plan", label: "Plan" },
  { href: "/atlas", label: "Atlas" },
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
            <AtlasAvatar mode="joint" size={28} />
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                {aaron.initials}
              </div>
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
                {linwei.initials}
              </div>
            </div>
            <span className="text-xs font-semibold text-dbsInk hidden lg:inline">A + LW joint</span>
          </div>
        </nav>
      </div>
      <div className="bg-dbsSurface border-b border-dbsLine">
        <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center gap-3 text-[11px] text-dbsGray flex-wrap">
          <span className="font-bold uppercase tracking-widest text-dbsRed">Today across Atlas</span>
          <span>Joint groceries 77% · 6 days left</span>
          <span className="opacity-60">·</span>
          <span>Aaron discretionary <span className="text-rose-600 font-semibold">over by SGD 420</span></span>
          <span className="opacity-60">·</span>
          <span>Lin Wei savings rate 22% vs Aaron 14%, <span className="text-dbsRedDark font-semibold">flag</span></span>
          <span className="opacity-60">·</span>
          <span>Q4 check-in due 20 Jul</span>
        </div>
      </div>
    </header>
  );
}
