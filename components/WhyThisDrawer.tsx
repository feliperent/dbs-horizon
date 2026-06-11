"use client";
import type { PetalTag, AisaqualTag } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  paraphrase: string;
  contributions: { label: string; weight: number }[];
  confidence: number;
  counterfactual: string;
  petals: PetalTag[];
  aisaqual: AisaqualTag[];
}

export default function WhyThisDrawer({
  open,
  onClose,
  title,
  paraphrase,
  contributions,
  confidence,
  counterfactual,
  petals,
  aisaqual,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl shadow-soft border border-dbsLine"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-4 pb-2 flex items-start justify-between border-b border-dbsLine">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsRed">Why this step</div>
            <div className="text-lg font-bold text-dbsInk">{title}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full w-8 h-8 hover:bg-dbsRedLight text-dbsInk text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-dbsInk leading-relaxed">{paraphrase}</p>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-2">
              Top factors
            </div>
            <ul className="space-y-2">
              {contributions.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <span className="text-sm text-dbsInk w-44 truncate">{c.label}</span>
                  <div className="flex-1 h-2 bg-dbsLine rounded-full overflow-hidden">
                    <div
                      className="h-full bg-dbsRed"
                      style={{ width: `${c.weight}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-dbsGray w-10 text-right">{c.weight}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Confidence</div>
            <div className="px-2 py-1 rounded-full bg-dbsGreen/10 text-dbsGreen text-xs font-bold">
              {confidence}%
            </div>
          </div>

          <div className="text-xs text-dbsGray bg-dbsSurface border border-dbsLine rounded-lg p-3">
            <span className="font-semibold text-dbsInk">Counterfactual: </span>
            {counterfactual}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-1">Flower petals</div>
              <div className="flex flex-wrap gap-1">
                {petals.map((p) => (
                  <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-1">AISAQUAL</div>
              <div className="flex flex-wrap gap-1">
                {aisaqual.map((a) => (
                  <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dbsInk text-white">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-dbsLine">
            <button className="text-sm font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsInk hover:bg-dbsSurface">
              Override with reason
            </button>
            <button className="text-sm font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsInk hover:bg-dbsSurface">
              Talk to RM
            </button>
            <button className="text-sm font-semibold px-3 py-1.5 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
