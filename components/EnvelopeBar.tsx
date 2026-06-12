import type { Envelope } from "@/lib/types";

const scopeColor: Record<Envelope["scope"], { bar: string; chip: string; chipText: string }> = {
  joint: { bar: "bg-dbsRed", chip: "bg-dbsRedLight", chipText: "text-dbsRedDark" },
  aaron: { bar: "bg-sky-500", chip: "bg-sky-100", chipText: "text-sky-700" },
  linwei: { bar: "bg-rose-500", chip: "bg-rose-100", chipText: "text-rose-700" },
};

const scopeLabel: Record<Envelope["scope"], string> = {
  joint: "Joint",
  aaron: "Aaron",
  linwei: "Lin Wei",
};

export default function EnvelopeBar({ env }: { env: Envelope }) {
  const pct = Math.min(150, (env.used / env.budget) * 100);
  const over = pct > 100;
  const color = scopeColor[env.scope];
  return (
    <div className="bg-white border border-dbsLine rounded-lg p-3 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${color.chip} ${color.chipText}`}>
              {scopeLabel[env.scope]}
            </span>
            <span className="text-sm font-semibold text-dbsInk">{env.name}</span>
          </div>
          <div className="text-[11px] text-dbsGray mt-0.5">{env.category}</div>
        </div>
        <div className="text-right">
          <div className={"text-sm font-bold " + (over ? "text-dbsRedDark" : "text-dbsInk")}>
            SGD {env.used.toLocaleString()} <span className="opacity-60 font-normal">/ {env.budget.toLocaleString()}</span>
          </div>
          {over && <div className="text-[10px] font-semibold text-dbsRedDark">over by SGD {(env.used - env.budget).toLocaleString()}</div>}
        </div>
      </div>
      <div className="mt-2 h-2 bg-dbsLine rounded-full overflow-hidden relative">
        <div
          className={`h-full ${over ? "bg-dbsRedDark" : color.bar}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
        {over && (
          <div
            className="absolute top-0 h-full bg-dbsRedDark/40"
            style={{ left: "100%", width: `${pct - 100}%` }}
          />
        )}
      </div>
    </div>
  );
}
