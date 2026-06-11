"use client";
import { useMemo, useState } from "react";
import MirrorPortrait from "@/components/MirrorPortrait";
import { customer } from "@/lib/mockData";
import { generateMirrorMessage } from "@/lib/ai";

export default function MirrorPage() {
  const [save, setSave] = useState(300);
  const [age, setAge] = useState(65);
  const msg = useMemo(() => generateMirrorMessage(save), [save]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-widest text-dbsRed">Horizon Mirror</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-dbsInk">
          Your future self, grounded in your real cashflow.
        </h1>
        <p className="text-sm text-dbsGray mt-1 max-w-2xl">
          Built on Hershfield 2011 future-self continuity research. The portrait, parlance, and gap meter
          update as you change behaviour. This is the pre-use surface of the customer journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Today</div>
          <div className="text-base font-bold text-dbsInk">{customer.name}, {customer.age}</div>
          <div className="aspect-square mt-3 bg-dbsSurface rounded-xl overflow-hidden border border-dbsLine">
            <MirrorPortrait age={customer.age} mood="content" />
          </div>
          <div className="mt-4 text-xs text-dbsGray">
            Salary SGD {customer.salaryMonthly.toLocaleString()} per month · side SGD {customer.sideMonthly.toLocaleString()} per month
          </div>
        </div>

        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Future you</div>
              <div className="text-base font-bold text-dbsInk">{customer.name}, age {age}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Comfort gap closed</div>
              <div
                className={
                  "text-2xl font-extrabold " +
                  (msg.gapClosedPct >= 75
                    ? "text-dbsGreen"
                    : msg.gapClosedPct >= 50
                    ? "text-dbsAmber"
                    : "text-dbsRed")
                }
              >
                {msg.gapClosedPct}%
              </div>
            </div>
          </div>
          <div className="aspect-square mt-3 bg-dbsSurface rounded-xl overflow-hidden border border-dbsLine">
            <MirrorPortrait age={age} mood={msg.mood} />
          </div>
          <div className="mt-3 p-3 rounded-lg bg-dbsRedLight border border-dbsRed/20 text-sm text-dbsInk italic">
            “{msg.text}”
            <div className="text-[11px] mt-1 not-italic text-dbsGray">Future you, in Singlish</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">
            What if I save this much more per month
          </div>
          <div className="text-2xl font-extrabold text-dbsInk mt-1">SGD {save.toLocaleString()}</div>
          <input
            type="range"
            min={0}
            max={1500}
            step={50}
            value={save}
            onChange={(e) => setSave(parseInt(e.target.value))}
            className="w-full accent-dbsRed mt-2"
          />
          <div className="flex justify-between text-[10px] text-dbsGray mt-1">
            <span>0</span>
            <span>750</span>
            <span>1500</span>
          </div>
          <div className="text-xs text-dbsGray mt-3">
            Pull the slider. The portrait updates in real time, the parlance changes, the comfort gap
            shrinks. No abstract chart can do this.
          </div>
        </div>

        <div className="bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">
            See yourself at a different age
          </div>
          <div className="text-2xl font-extrabold text-dbsInk mt-1">{age}</div>
          <input
            type="range"
            min={40}
            max={80}
            step={1}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full accent-dbsRed mt-2"
          />
          <div className="flex justify-between text-[10px] text-dbsGray mt-1">
            <span>40</span>
            <span>60</span>
            <span>80</span>
          </div>
          <div className="text-xs text-dbsGray mt-3">
            The Mirror does not invent numbers. It projects your real cashflow forward and renders a face,
            not a chart.
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white border border-dbsLine rounded-2xl p-5 shadow-soft">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">Petals</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {["Information", "Consultation", "Hospitality"].map((p) => (
                <span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dbsRedLight text-dbsRedDark">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-dbsGray">AISAQUAL</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {["Anthropomorphism", "Tangibility", "Personalisation", "Transparency"].map((a) => (
                <span key={a} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dbsInk text-white">
                  {a}
                </span>
              ))}
            </div>
          </div>
          <a
            href="/plan"
            className="text-sm font-semibold px-4 py-2 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark"
          >
            Set your rules in Plan →
          </a>
        </div>
      </div>
    </div>
  );
}
