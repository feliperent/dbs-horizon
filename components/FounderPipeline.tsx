"use client";
import { useState } from "react";
import type { FounderStage } from "@/lib/types";

const statusStyle: Record<FounderStage["status"], string> = {
  pending: "bg-dbsLine text-dbsGray",
  drafting: "bg-dbsAmber/15 text-dbsAmber",
  review: "bg-dbsRedLight text-dbsRedDark",
  approved: "bg-dbsGreen/15 text-dbsGreen",
};

const statusLabel: Record<FounderStage["status"], string> = {
  pending: "queued",
  drafting: "drafting",
  review: "your review",
  approved: "approved",
};

export default function FounderPipeline({ stages }: { stages: FounderStage[] }) {
  const [openId, setOpenId] = useState<string | null>(stages[2]?.id ?? null);
  return (
    <ol className="space-y-3">
      {stages.map((s) => {
        const open = openId === s.id;
        return (
          <li key={s.id} className="bg-white border border-dbsLine rounded-lg overflow-hidden shadow-soft">
            <button
              onClick={() => setOpenId(open ? null : s.id)}
              className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-dbsSurface"
            >
              <div className="w-7 h-7 rounded-full bg-dbsRed text-white flex items-center justify-center text-xs font-bold">
                {s.index}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-dbsInk">{s.title}</div>
              </div>
              <span
                className={
                  "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full " + statusStyle[s.status]
                }
              >
                {statusLabel[s.status]}
              </span>
              <span className="text-dbsGray text-xs">{open ? "−" : "+"}</span>
            </button>

            {open && (
              <div className="px-4 pb-4 pt-1 border-t border-dbsLine bg-dbsSurface">
                <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mt-2">Drafted artifact</div>
                <p className="text-sm text-dbsInk mt-1">{s.artifact}</p>
                <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mt-3">Reasoning</div>
                <p className="text-sm text-dbsInk mt-1">{s.reasoning}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {s.petals.map((p) => (
                    <span key={p} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark">
                      {p}
                    </span>
                  ))}
                  {s.aisaqual.map((a) => (
                    <span key={a} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-dbsInk text-white">
                      {a}
                    </span>
                  ))}
                </div>
                {s.status === "review" && (
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsInk hover:bg-white">
                      Edit draft
                    </button>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark">
                      Approve and continue
                    </button>
                  </div>
                )}
                {s.status === "drafting" && (
                  <div className="mt-3 text-xs text-dbsGray italic">Agent is drafting this section now. You will review next.</div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
