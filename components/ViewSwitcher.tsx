"use client";
import { aaron, linwei } from "@/lib/mockData";
import type { Partner } from "@/lib/types";

interface Props {
  value: Partner;
  onChange: (p: Partner) => void;
  compact?: boolean;
}

export default function ViewSwitcher({ value, onChange, compact = false }: Props) {
  const opts: { id: Partner; label: string; sub: string; cls: string }[] = [
    { id: "joint", label: "Joint", sub: "shared by both", cls: "bg-dbsRed text-white" },
    { id: "aaron", label: "Aaron", sub: aaron.role, cls: "bg-sky-600 text-white" },
    { id: "linwei", label: "Lin Wei", sub: linwei.role, cls: "bg-rose-600 text-white" },
  ];
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 bg-white border border-dbsLine rounded-full p-1">
        {opts.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={
              "text-[11px] font-semibold px-3 py-1 rounded-full transition-colors " +
              (value === o.id ? o.cls : "text-dbsInk hover:bg-dbsSurface")
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="bg-white border border-dbsLine rounded-2xl p-2 inline-flex items-center gap-1 shadow-soft">
      {opts.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={
              "flex flex-col items-start text-left px-3 py-2 rounded-xl transition-colors min-w-[110px] " +
              (active ? o.cls : "text-dbsInk hover:bg-dbsSurface")
            }
          >
            <span className="text-xs font-bold uppercase tracking-wide">{o.label}</span>
            <span className="text-[10px] opacity-80 truncate w-full">{o.sub}</span>
          </button>
        );
      })}
    </div>
  );
}
