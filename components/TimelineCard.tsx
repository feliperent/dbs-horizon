"use client";
import type { TimelineStep } from "@/lib/types";

const colorByReversibility: Record<TimelineStep["reversibility"], string> = {
  auto: "border-dbsGreen bg-dbsGreen/5",
  oneTap: "border-dbsAmber bg-dbsAmber/5",
  biometric: "border-dbsRed bg-dbsRedLight",
};

const labelByReversibility: Record<TimelineStep["reversibility"], string> = {
  auto: "auto-execute",
  oneTap: "one-tap",
  biometric: "biometric",
};

interface Props {
  step: TimelineStep;
  onWhy: () => void;
  onConfirm: () => void;
}

export default function TimelineCard({ step, onWhy, onConfirm }: Props) {
  const executed = step.status === "executed";
  return (
    <div
      className={
        "border-l-4 rounded-r-lg pl-4 pr-3 py-3 bg-white shadow-soft " +
        colorByReversibility[step.reversibility]
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="text-xs font-bold text-dbsGray">D+{String(step.day).padStart(2, "0")}</div>
            <div
              className={
                "text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full " +
                (step.reversibility === "auto"
                  ? "bg-dbsGreen/15 text-dbsGreen"
                  : step.reversibility === "oneTap"
                  ? "bg-dbsAmber/15 text-dbsAmber"
                  : "bg-dbsRed text-white")
              }
            >
              {labelByReversibility[step.reversibility]}
            </div>
            {executed && (
              <div className="text-[10px] font-bold uppercase tracking-wide bg-dbsInk text-white px-2 py-0.5 rounded-full">
                receipt
              </div>
            )}
          </div>
          <div className="text-sm font-bold text-dbsInk mt-1">{step.title}</div>
          <div className="text-xs text-dbsGray mt-0.5">
            {step.amount} <span className="opacity-60">to</span> {step.destination}
          </div>
          <div className="text-xs text-dbsGray italic mt-1">Rule: {step.triggerRule}</div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <button
            onClick={onWhy}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-dbsLine text-dbsRedDark hover:bg-dbsRedLight"
          >
            why this step ›
          </button>
          {!executed && step.reversibility !== "auto" && (
            <button
              onClick={onConfirm}
              className={
                "text-[11px] font-semibold px-2.5 py-1 rounded-md " +
                (step.reversibility === "biometric"
                  ? "bg-dbsRed text-white hover:bg-dbsRedDark"
                  : "bg-dbsAmber text-white hover:opacity-90")
              }
            >
              {step.reversibility === "biometric" ? "biometric" : "one-tap"}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {step.petals.map((p) => (
          <span key={p} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark">
            {p}
          </span>
        ))}
        {step.aisaqual.map((a) => (
          <span key={a} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-dbsInk text-white">
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
