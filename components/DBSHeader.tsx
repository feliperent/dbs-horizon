"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import AtlasAvatar from "./AtlasAvatar";
import PartnerAvatar from "./PartnerAvatar";
import { accounts } from "@/lib/mockData";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/plan", label: "Plan" },
  { href: "/atlas", label: "Atlas" },
  { href: "/accounts", label: "Accounts" },
];

export default function DBSHeader() {
  const path = usePathname();
  const jointBalance = accounts
    .filter((a) => a.owner === "joint")
    .reduce((s, a) => s + a.balance, 0);
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
            <div className="hidden sm:flex items-center -space-x-2">
              <PartnerAvatar who="aaron" size={28} ring />
              <PartnerAvatar who="linwei" size={28} ring />
            </div>
            <span className="text-xs font-semibold text-dbsInk hidden lg:inline">A + LW joint</span>
          </div>
        </nav>
      </div>
      <div className="bg-dbsSurface border-b border-dbsLine">
        <div className="max-w-6xl mx-auto px-6 py-1.5 flex items-center gap-3 text-[11px] text-dbsGray flex-wrap">
          <span className="font-bold uppercase tracking-widest text-dbsRed">Atlas pulse</span>
          <span>Joint balance <strong className="text-dbsInk">SGD {jointBalance.toLocaleString()}</strong></span>
          <span className="opacity-60">·</span>
          <span>Groceries 77% · 6 days left</span>
          <span className="opacity-60">·</span>
          <span>Savings rate gap <span className="text-dbsRedDark font-semibold">8 pts</span> (Goal Divergence Flag)</span>
          <span className="opacity-60">·</span>
          <span>Q4 check-in due 20 Jul</span>
        </div>
      </div>
    </header>
  );
}
