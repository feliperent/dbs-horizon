"use client";
import { useMemo } from "react";
import EnvelopeBar from "@/components/EnvelopeBar";
import ScenarioCard from "@/components/ScenarioCard";
import ViewSwitcher from "@/components/ViewSwitcher";
import { envelopes, scenarios, divergenceFlag } from "@/lib/mockData";
import { useCouple } from "@/lib/state";

export default function PlanPage() {
  const { view, setView } = useCouple();

  const visible = useMemo(() => {
    if (view === "joint") return envelopes.filter((e) => e.scope === "joint");
    if (view === "aaron") return envelopes.filter((e) => e.scope === "joint" || e.scope === "aaron");
    return envelopes.filter((e) => e.scope === "joint" || e.scope === "linwei");
  }, [view]);

  const headerNote =
    view === "joint"
      ? "Shared by both. Joint envelopes only."
      : view === "aaron"
      ? "Aaron's view. Joint envelopes (category-level visible to Lin Wei) plus Aaron's private envelopes (line items not visible to Lin Wei)."
      : "Lin Wei's view. Joint envelopes (category-level visible to Aaron) plus Lin Wei's private envelopes (line items not visible to Aaron).";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Horizon Plan</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">Joint envelopes, private envelopes, three live scenarios.</h1>
          <p className="text-sm text-dbsGray mt-1 max-w-2xl">
            Switch the view to see what each partner sees. Atlas only commits a change when both partners tap confirm.
          </p>
        </div>
        <ViewSwitcher value={view} onChange={setView} />
      </div>

      <div className="bg-dbsRedLight border border-dbsRed/20 rounded-xl p-3 text-xs text-dbsInk">
        <span className="font-bold text-dbsRedDark uppercase tracking-widest text-[10px] mr-2">View note</span>
        {headerNote}
      </div>

      <section className="grid md:grid-cols-3 gap-3">
        {visible.map((e) => (
          <EnvelopeBar key={e.id} env={e} />
        ))}
      </section>

      {divergenceFlag.triggered && view === "joint" && (
        <section className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Goal divergence flag</div>
          <div className="mt-1 text-sm text-dbsInk">
            <strong>{divergenceFlag.metric}</strong>: Aaron at <strong className="text-sky-700">{divergenceFlag.aaron}</strong>, Lin Wei at <strong className="text-rose-700">{divergenceFlag.linwei}</strong>. Gap {divergenceFlag.gap}.
          </div>
          <div className="text-xs text-dbsGray mt-1">{divergenceFlag.threshold}. Atlas surfaces this as a conversation prompt, not a verdict.</div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-dbsInk">Three scenarios Atlas is holding for you</h2>
        <p className="text-sm text-dbsGray mt-1">Atlas surfaces options and trade-offs. Both partners tap to commit. Atlas does not pick.</p>
        <div className="space-y-4 mt-4">
          {scenarios.map((s) => (
            <ScenarioCard key={s.id} scenario={s} />
          ))}
        </div>
      </section>

      <div className="bg-white border border-dbsLine rounded-2xl p-4 text-xs text-dbsGray flex flex-wrap items-center gap-2 justify-between">
        <span>Atlas extends to any couple decision: weddings, parent care, sabbaticals, redundancy, inheritance, charitable giving, divorce contingency.</span>
        <a href="/atlas" className="font-semibold text-dbsRed hover:text-dbsRedDark">Talk to Atlas →</a>
      </div>
    </div>
  );
}
