"use client";
import { useMemo, useState } from "react";
import CouplePortrait from "@/components/CouplePortrait";
import { aaron, linwei, couple } from "@/lib/mockData";

function gapMessage(save: number): { text: string; pct: number; mood: "content" | "worried" | "proud" } {
  const pct = Math.round(34 + (Math.min(1500, save) / 1500) * 52);
  if (pct < 50) {
    return {
      text:
        "Aaron and Lin Wei, future-you here. At this pace, retirement is okay but the BTO timeline slips and Baby Bonus doesn't stretch as far as you think. Push more into the joint fund.",
      pct,
      mood: "worried",
    };
  }
  if (pct < 75) {
    return {
      text:
        "Aaron and Lin Wei, comfortable retirement on track. The BTO is paid down on schedule. There is room for one year of unpaid leave when the time comes.",
      pct,
      mood: "content",
    };
  }
  return {
    text:
      "Aaron and Lin Wei, future-us is comfortable. The flat is paid earlier. The CPF top-ups in your 30s are doing the heavy lifting. Keep the rhythm.",
    pct,
    mood: "proud",
  };
}

export default function MirrorPage() {
  const [save, setSave] = useState(500);
  const [age, setAge] = useState(65);
  const msg = useMemo(() => gapMessage(save), [save]);
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Horizon Mirror · Joint view</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">See yourselves at 65. Side by side.</h1>
        <p className="text-sm text-dbsGray mt-1 max-w-2xl">
          Built from your joint CPF, account balances, and the goals you both ticked. Pull the slider,
          the portraits update, the comfort meter moves. Based on Hershfield 2011, applied to the couple
          rather than the individual.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsGray">Today</div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">{aaron.initials}</div>
            <div className="font-semibold text-sm text-dbsInk">{aaron.name}, {aaron.age}</div>
            <div className="opacity-60">·</div>
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">{linwei.initials}</div>
            <div className="font-semibold text-sm text-dbsInk">{linwei.name}, {linwei.age}</div>
          </div>
          <div className="aspect-[14/10] mt-3 bg-dbsSurface rounded-xl border border-dbsLine overflow-hidden">
            <CouplePortrait age={28} mood="content" />
          </div>
          <div className="text-xs text-dbsGray mt-3">
            Joint savings rate this quarter: <strong>17.6%</strong> · joint emergency floor: SGD {couple.jointEmergencyFloor.toLocaleString()}
          </div>
        </div>

        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-dbsGray">Future-us at {age}</div>
              <div className="text-sm font-semibold text-dbsInk mt-1">Comfort gap closed</div>
            </div>
            <div
              className={
                "text-3xl font-extrabold " +
                (msg.pct >= 75 ? "text-emerald-600" : msg.pct >= 50 ? "text-amber-600" : "text-dbsRed")
              }
            >
              {msg.pct}%
            </div>
          </div>
          <div className="aspect-[14/10] mt-3 bg-dbsSurface rounded-xl border border-dbsLine overflow-hidden">
            <CouplePortrait age={age} mood={msg.mood} />
          </div>
          <div className="mt-3 p-3 rounded-lg bg-dbsRedLight border border-dbsRed/20 text-sm text-dbsInk italic">
            "{msg.text}"
            <div className="not-italic text-[11px] mt-1 text-dbsGray">Atlas, addressing both</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsGray">Joint monthly save</div>
          <div className="text-2xl font-extrabold text-dbsInk mt-1">SGD {save.toLocaleString()}</div>
          <input
            type="range" min={0} max={1500} step={50} value={save}
            onChange={(e) => setSave(parseInt(e.target.value))}
            className="w-full accent-dbsRed mt-2"
          />
          <div className="flex justify-between text-[10px] text-dbsGray mt-1">
            <span>0</span><span>750</span><span>1500</span>
          </div>
        </div>
        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-bold uppercase tracking-widest text-dbsGray">See yourselves at age</div>
          <div className="text-2xl font-extrabold text-dbsInk mt-1">{age}</div>
          <input
            type="range" min={40} max={80} step={1} value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full accent-dbsRed mt-2"
          />
          <div className="flex justify-between text-[10px] text-dbsGray mt-1">
            <span>40</span><span>60</span><span>80</span>
          </div>
        </div>
      </div>
    </div>
  );
}
