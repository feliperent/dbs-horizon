"use client";
import { useState, useMemo } from "react";
import { useCouple } from "@/lib/state";
import AtlasAvatar from "./AtlasAvatar";
import PartnerAvatar from "./PartnerAvatar";

interface Q {
  key: keyof Answers;
  text: string;
}
type Answers = {
  longTermSecurity: number | null;
  proximityToParents: number | null;
  careerIdentity: number | null;
  spendingAlignment: number | null;
  transparencyComfort: number | null;
  riskAppetite: number | null;
  emergencyFloorOk: number | null;
  parentSupportPlans: number | null;
  childTimingHopes: number | null;
  fairnessPerception: number | null;
};

const questions: Q[] = [
  { key: "longTermSecurity", text: "Long-term financial security matters to me." },
  { key: "proximityToParents", text: "Living close to my parents matters to me." },
  { key: "careerIdentity", text: "My identity is closely tied to my career." },
  { key: "spendingAlignment", text: "My partner and I agree on what counts as a fair monthly spend." },
  { key: "transparencyComfort", text: "I am comfortable with my partner seeing my discretionary line items." },
  { key: "riskAppetite", text: "I am comfortable with investment risk for joint goals." },
  { key: "emergencyFloorOk", text: "Our joint emergency floor is at a level that lets me sleep at night." },
  { key: "parentSupportPlans", text: "We have a clear plan for supporting our parents if needed." },
  { key: "childTimingHopes", text: "I have a hoped-for window for having a first child that we have discussed." },
  { key: "fairnessPerception", text: "I feel my partner contributes fairly to our joint goals." },
];

const scale = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export default function CheckInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { checkIn, setCheckIn, notify } = useCouple();
  const [partner, setPartner] = useState<"aaron" | "linwei">("aaron");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(checkIn[partner]);
  const [forceSummary, setForceSummary] = useState(false);

  const aaronDone = Object.values(checkIn.aaron).every((v) => v !== null);
  const linWeiDone = Object.values(checkIn.linwei).every((v) => v !== null);
  const bothDone = aaronDone && linWeiDone;
  const showSummary = (forceSummary && bothDone) || (open && bothDone && step === 0);

  const summary = useMemo(() => {
    if (!bothDone) return [];
    return questions.map((q) => {
      const a = checkIn.aaron[q.key]!;
      const lw = checkIn.linwei[q.key]!;
      const gap = Math.abs(a - lw);
      return { q: q.text, key: q.key, aaron: a, linwei: lw, gap };
    });
  }, [bothDone, checkIn]);

  const topGaps = useMemo(() => {
    return [...summary].sort((a, b) => b.gap - a.gap).slice(0, 3);
  }, [summary]);

  if (!open) return null;
  const q = questions[step];

  function pick(v: number) {
    const next = { ...answers, [q.key]: v } as Answers;
    setAnswers(next);
    if (step < 9) {
      setStep(step + 1);
    } else {
      const updated = { ...checkIn, [partner]: next };
      const otherKey = partner === "aaron" ? "linwei" : "aaron";
      const otherFinished = Object.values(updated[otherKey]).every((v) => v !== null);
      const meFinished = Object.values(next).every((v) => v !== null);
      updated.complete = otherFinished && meFinished;
      if (updated.complete) updated.completedAt = new Date().toLocaleString();
      setCheckIn(updated);
      notify(
        otherFinished && meFinished
          ? "Both partners finished the Q4 check-in. Atlas has the patterns. Summary ready."
          : `${partner === "aaron" ? "Aaron" : "Lin Wei"} finished the Q4 check-in. Atlas is waiting on the other partner.`
      );
      setStep(0);
      if (otherFinished && meFinished) {
        setForceSummary(true);
      } else {
        setPartner(otherKey);
        setAnswers(updated[otherKey]);
      }
    }
  }

  function switchPartner(p: "aaron" | "linwei") {
    setPartner(p);
    setAnswers(checkIn[p]);
    setStep(0);
    setForceSummary(false);
  }

  // ===== SUMMARY VIEW =====
  if (showSummary) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-soft border border-dbsLine overflow-hidden flex flex-col" style={{ maxHeight: "90vh" }}>
          <div className="px-5 py-3 bg-dbsRed text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <AtlasAvatar mode="joint" size={28} />
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Quarterly check-in · summary</div>
                <div className="text-sm font-bold">Both partners finished · Atlas surfaces the patterns</div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/90 hover:text-white text-2xl leading-none">×</button>
          </div>

          <div className="px-5 py-4 overflow-y-auto flex-1">
            <div className="bg-dbsRedLight border border-dbsRed/20 rounded-xl p-3 flex items-start gap-3">
              <AtlasAvatar mode="joint" size={28} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-dbsRedDark">Atlas note</div>
                <p className="text-sm text-dbsInk italic mt-0.5">
                  "Aaron and Lin Wei, both of you finished. I am not showing the raw answers; I am surfacing the gap on each question and the three places we should talk first."
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-dbsGray mb-2">Top three gaps to talk about</div>
              <div className="grid md:grid-cols-3 gap-3">
                {topGaps.map((g, i) => (
                  <div key={g.key} className="bg-white border border-dbsLine rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-dbsRed text-white">#{i + 1}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${g.gap >= 3 ? "bg-dbsRedLight text-dbsRedDark" : g.gap === 2 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                        gap {g.gap}
                      </span>
                    </div>
                    <div className="text-xs text-dbsInk font-semibold">{g.q}</div>
                    <div className="flex items-center gap-3 mt-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <PartnerAvatar who="aaron" size={20} />
                        <span className="font-bold text-sky-700">{scale[g.aaron - 1]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PartnerAvatar who="linwei" size={20} />
                        <span className="font-bold text-rose-700">{scale[g.linwei - 1]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-dbsGray mb-2">All ten questions, side-by-side</div>
              <div className="border border-dbsLine rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-dbsSurface">
                    <tr className="text-left">
                      <th className="px-3 py-2 font-bold text-dbsInk">Question</th>
                      <th className="px-2 py-2 font-bold text-sky-700 text-center w-20">Aaron</th>
                      <th className="px-2 py-2 font-bold text-rose-700 text-center w-20">Lin Wei</th>
                      <th className="px-2 py-2 font-bold text-dbsRedDark text-center w-14">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.map((s, i) => (
                      <tr key={s.key} className={i % 2 === 0 ? "bg-white" : "bg-dbsSurface"}>
                        <td className="px-3 py-2 text-dbsInk">{s.q}</td>
                        <td className="px-2 py-2 text-center font-semibold text-sky-700">{s.aaron}</td>
                        <td className="px-2 py-2 text-center font-semibold text-rose-700">{s.linwei}</td>
                        <td className="px-2 py-2 text-center">
                          <span className={`inline-block min-w-[2rem] font-bold ${s.gap >= 3 ? "text-dbsRedDark" : s.gap === 2 ? "text-amber-700" : "text-emerald-700"}`}>
                            {s.gap}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-dbsGray italic">
              Scale: 1 strongly disagree → 5 strongly agree. Atlas treats gap ≥ 3 as a conversation prompt.
            </div>
          </div>

          <div className="px-5 py-3 bg-dbsSurface border-t border-dbsLine flex items-center justify-between text-[11px] shrink-0">
            <span className="text-dbsGray">Atlas surfaces patterns only. Raw answers are not shared with the partner.</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setForceSummary(false); switchPartner(partner); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsInk hover:bg-white"
              >
                Re-take
              </button>
              <button
                onClick={onClose}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== QUESTION VIEW =====
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-soft border border-dbsLine overflow-hidden">
        <div className="px-5 py-3 bg-dbsRed text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AtlasAvatar mode={partner} size={28} />
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Quarterly check-in</div>
              <div className="text-sm font-bold">Falconier dyadic-coping scales (directional)</div>
            </div>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="px-5 py-3 border-b border-dbsLine flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchPartner("aaron")}
              className={
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold " +
                (partner === "aaron" ? "bg-sky-600 text-white" : "bg-sky-50 text-sky-700")
              }
            >
              <PartnerAvatar who="aaron" size={18} /> Aaron {aaronDone ? "✓" : ""}
            </button>
            <button
              onClick={() => switchPartner("linwei")}
              className={
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold " +
                (partner === "linwei" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700")
              }
            >
              <PartnerAvatar who="linwei" size={18} /> Lin Wei {linWeiDone ? "✓" : ""}
            </button>
          </div>
          <div className="text-dbsGray">Question {step + 1} of 10</div>
        </div>

        <div className="px-5 py-6">
          <div className="text-sm text-dbsGray">Atlas is asking {partner === "aaron" ? "Aaron" : "Lin Wei"}</div>
          <div className="text-lg font-bold text-dbsInk mt-1">{q.text}</div>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {scale.map((label, i) => {
              const v = i + 1;
              const picked = answers[q.key] === v;
              return (
                <button
                  key={i}
                  onClick={() => pick(v)}
                  className={
                    "flex flex-col items-center gap-1 py-2 px-1 rounded-lg border transition-colors " +
                    (picked ? "border-dbsRed bg-dbsRedLight" : "border-dbsLine bg-white hover:bg-dbsSurface")
                  }
                >
                  <span className="font-bold text-dbsInk">{v}</span>
                  <span className="text-[10px] text-dbsGray text-center leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3 bg-dbsSurface border-t border-dbsLine flex items-center justify-between text-[11px]">
          <div className="text-dbsGray">
            Atlas surfaces patterns only. Neither partner sees the other's raw answers.
          </div>
          <div className="font-semibold text-dbsInk">
            {(aaronDone ? 1 : 0) + (linWeiDone ? 1 : 0)}/2 partners finished
          </div>
        </div>
      </div>
    </div>
  );
}
