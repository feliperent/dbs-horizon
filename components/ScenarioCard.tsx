"use client";
import { useCouple } from "@/lib/state";
import type { Scenario } from "@/lib/types";
import AtlasAvatar from "./AtlasAvatar";
import PartnerAvatar from "./PartnerAvatar";

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const { confirms, setConfirm } = useCouple();
  const state = confirms[scenario.id] ?? { aaron: false, linwei: false, picked: null };
  const committed = state.aaron && state.linwei && state.picked !== null;

  return (
    <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <AtlasAvatar mode="joint" size={40} />
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">{scenario.id} scenario</div>
          <h3 className="text-lg font-bold text-dbsInk">{scenario.title}</h3>
          <p className="text-sm text-dbsGray mt-1">{scenario.tension}</p>
        </div>
        {committed && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Committed</span>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {scenario.options.map((o, i) => {
          const isPicked = state.picked === i;
          return (
            <button
              key={i}
              onClick={() => setConfirm(scenario.id, "aaron", i)}
              className={
                "text-left border rounded-xl p-3 transition-colors " +
                (isPicked
                  ? "border-dbsRed bg-dbsRedLight"
                  : "border-dbsLine bg-dbsSurface hover:bg-white")
              }
              disabled={committed}
            >
              <div className="text-sm font-bold text-dbsInk">{o.label}</div>
              <div className="text-xs text-dbsRedDark font-semibold mt-1">{o.cost}</div>
              <div className="text-xs text-dbsGray mt-2">{o.tradeoff}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 bg-dbsRedLight border border-dbsRed/20 rounded-xl p-3 flex items-start gap-3">
        <AtlasAvatar mode="joint" size={32} />
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-dbsRedDark">Atlas note</div>
          <p className="text-sm text-dbsInk italic mt-0.5">"{scenario.atlasNote}"</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {scenario.petals.map((p) => (
              <span key={p} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white text-dbsRedDark">
                {p}
              </span>
            ))}
            {scenario.aisaqual.map((a) => (
              <span key={a} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-dbsInk text-white">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {state.picked !== null && !committed && (
        <div className="mt-3 flex items-center justify-end gap-2 text-xs">
          <span className="text-dbsGray">Both must tap to commit:</span>
          <button
            onClick={() => setConfirm(scenario.id, "aaron", state.picked!)}
            className={
              "flex items-center gap-1.5 font-semibold px-3 py-1 rounded-md " +
              (state.aaron ? "bg-sky-700 text-white" : "bg-sky-600 text-white hover:bg-sky-700")
            }
          >
            <PartnerAvatar who="aaron" size={18} />
            {state.aaron ? "Aaron confirmed" : "Aaron confirms"}
          </button>
          <button
            onClick={() => setConfirm(scenario.id, "linwei", state.picked!)}
            className={
              "flex items-center gap-1.5 font-semibold px-3 py-1 rounded-md " +
              (state.linwei ? "bg-rose-700 text-white" : "bg-rose-600 text-white hover:bg-rose-700")
            }
          >
            <PartnerAvatar who="linwei" size={18} />
            {state.linwei ? "Lin Wei confirmed" : "Lin Wei confirms"}
          </button>
        </div>
      )}

      {committed && (
        <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-md p-2 text-xs text-emerald-800">
          Rule committed. Atlas logged the why-this-not-that trace. Visible to both of you in Plan and in the Atlas thread.
        </div>
      )}
    </div>
  );
}
