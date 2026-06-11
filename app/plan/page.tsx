"use client";
import { useMemo, useState } from "react";
import TimelineCard from "@/components/TimelineCard";
import WhyThisDrawer from "@/components/WhyThisDrawer";
import ConsentGate from "@/components/ConsentGate";
import { timeline as seed } from "@/lib/mockData";
import { explainStep } from "@/lib/ai";
import type { TimelineStep } from "@/lib/types";

const initialRules = `keep emergency floor SGD 12,000
sweep anything above floor into digiPortfolio
keep GBP balance above 800, sweep SGD when rate beats 0.578
pay DBS Altitude card in full two days before due
top up SRS to the cap before 31 December
send mum SGD 800 on day 28, never auto
release Kopi Studio working capital when Founder approves a tranche`;

export default function PlanPage() {
  const [rules, setRules] = useState(initialRules);
  const [steps, setSteps] = useState<TimelineStep[]>(seed);
  const [frozen, setFrozen] = useState(false);
  const [day, setDay] = useState(0);
  const [whyId, setWhyId] = useState<string | null>(null);
  const [gateId, setGateId] = useState<string | null>(null);

  const whyStep = useMemo(() => steps.find((s) => s.id === whyId) ?? null, [steps, whyId]);
  const gateStep = useMemo(() => steps.find((s) => s.id === gateId) ?? null, [steps, gateId]);

  function advanceClock() {
    const next = Math.min(30, day + 7);
    setDay(next);
    setSteps((prev) =>
      prev.map((s) => {
        if (frozen) return s;
        if (s.day <= next && s.status === "scheduled" && s.reversibility === "auto") {
          return { ...s, status: "executed" };
        }
        return s;
      })
    );
  }

  function resetClock() {
    setDay(0);
    setSteps(seed);
  }

  function executeGate(id: string) {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "executed" } : s))
    );
    setGateId(null);
  }

  const rulesParaphrased = rules
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Horizon Plan</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">
            Tell DBS how your money should move. Watch it happen.
          </h1>
          <p className="text-sm text-dbsGray mt-1 max-w-2xl">
            The rules you wrote, paraphrased by the agent, executed on a 30-day timeline. A consent gate
            sits in front of every irreversible action.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetClock}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsInk hover:bg-dbsSurface"
          >
            Reset clock
          </button>
          <button
            onClick={advanceClock}
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-dbsInk text-white hover:opacity-90"
          >
            +7 days
          </button>
          <button
            onClick={() => setFrozen((f) => !f)}
            className={
              "text-xs font-semibold px-3 py-1.5 rounded-md " +
              (frozen
                ? "bg-dbsRedDark text-white"
                : "bg-dbsRed text-white hover:bg-dbsRedDark")
            }
          >
            {frozen ? "Plan frozen · tap to resume" : "Freeze plan"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-1">Your rules</div>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              rows={9}
              className="w-full text-sm font-mono text-dbsInk border border-dbsLine rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-dbsRed/30"
            />
            <div className="text-[11px] text-dbsGray mt-2 italic">
              Plain English. Edit any line. The agent re-paraphrases live below.
            </div>
          </div>

          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray mb-2">
              Agent paraphrase, tick to approve
            </div>
            <ul className="space-y-2">
              {rulesParaphrased.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <input type="checkbox" defaultChecked className="mt-1 accent-dbsRed" />
                  <span className="text-sm text-dbsInk">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-dbsRedLight border border-dbsRed/20 rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-dbsRedDark mb-1">Risk visible</div>
            <ul className="text-xs text-dbsInk space-y-1 list-disc ml-4">
              <li>Auto-execute only when the action is reversible inside one business day.</li>
              <li>One-tap when the action affects one party and is reversible within 48 hours.</li>
              <li>Biometric plus 10-second cool-off when the action cannot be reversed.</li>
              <li>Freeze switch above kills every queued action immediately.</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white border border-dbsLine rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">30-day plan</div>
                <div className="text-base font-bold text-dbsInk">
                  Day {day} of 30 {frozen && <span className="text-dbsRedDark"> · frozen</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                <span className="px-2 py-0.5 rounded-full bg-dbsGreen/15 text-dbsGreen">auto</span>
                <span className="px-2 py-0.5 rounded-full bg-dbsAmber/15 text-dbsAmber">one-tap</span>
                <span className="px-2 py-0.5 rounded-full bg-dbsRed text-white">biometric</span>
              </div>
            </div>

            <div className="space-y-3">
              {steps.map((s) => (
                <TimelineCard
                  key={s.id}
                  step={s}
                  onWhy={() => setWhyId(s.id)}
                  onConfirm={() => {
                    if (s.reversibility === "biometric") setGateId(s.id);
                    else
                      setSteps((prev) =>
                        prev.map((p) => (p.id === s.id ? { ...p, status: "executed" } : p))
                      );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhyThisDrawer
        open={!!whyStep}
        onClose={() => setWhyId(null)}
        title={whyStep?.title ?? ""}
        paraphrase={whyStep ? explainStep(whyStep.title) : ""}
        contributions={whyStep?.whyContributions ?? []}
        confidence={whyStep?.confidence ?? 0}
        counterfactual={whyStep?.counterfactual ?? ""}
        petals={whyStep?.petals ?? []}
        aisaqual={whyStep?.aisaqual ?? []}
      />

      <ConsentGate
        open={!!gateStep}
        onCancel={() => setGateId(null)}
        onConfirmed={() => gateStep && executeGate(gateStep.id)}
        title={gateStep?.title ?? ""}
        amount={gateStep?.amount ?? ""}
        destination={gateStep?.destination ?? ""}
      />
    </div>
  );
}
