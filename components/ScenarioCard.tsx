"use client";
import { useState } from "react";
import type { Scenario } from "@/lib/types";
import AtlasAvatar from "./AtlasAvatar";

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
      <div className="flex items-start gap-3">
        <AtlasAvatar mode="joint" size={40} />
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsRed">{scenario.id} scenario</div>
          <h3 className="text-lg font-bold text-dbsInk">{scenario.title}</h3>
          <p className="text-sm text-dbsGray mt-1">{scenario.tension}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {scenario.options.map((o, i) => {
          const isPicked = picked === i;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={
                "text-left border rounded-xl p-3 transition-colors " +
                (isPicked
                  ? "border-dbsRed bg-dbsRedLight"
                  : "border-dbsLine bg-dbsSurface hover:bg-white")
              }
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

      {picked !== null && (
        <div className="mt-3 flex items-center justify-end gap-2 text-xs">
          <span className="text-dbsGray">Both must tap to commit:</span>
          <button className="bg-sky-600 text-white font-semibold px-3 py-1 rounded-md">Aaron confirms</button>
          <button className="bg-rose-600 text-white font-semibold px-3 py-1 rounded-md">Lin Wei confirms</button>
        </div>
      )}
    </div>
  );
}
