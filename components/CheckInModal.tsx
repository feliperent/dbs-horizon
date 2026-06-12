"use client";
import { useState } from "react";
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

  if (!open) return null;
  const q = questions[step];
  const completedPartners =
    Object.values(checkIn.aaron).filter((v) => v !== null).length === 10
      ? Object.values(checkIn.linwei).filter((v) => v !== null).length === 10
        ? 2
        : 1
      : 0;

  function pick(v: number) {
    const next = { ...answers, [q.key]: v } as Answers;
    setAnswers(next);
    if (step < 9) {
      setStep(step + 1);
    } else {
      const updated = { ...checkIn, [partner]: next };
      const otherDone = Object.values(updated[partner === "aaron" ? "linwei" : "aaron"]).every(
        (v) => v !== null
      );
      const meDone = Object.values(next).every((v) => v !== null);
      updated.complete = otherDone && meDone;
      if (updated.complete) updated.completedAt = new Date().toLocaleString();
      setCheckIn(updated);
      notify(
        otherDone && meDone
          ? "Both partners finished the Q4 check-in. Atlas has the patterns. New nudges in 24 hours."
          : `${partner === "aaron" ? "Aaron" : "Lin Wei"} finished the Q4 check-in. Atlas is waiting on the other partner.`
      );
      setStep(0);
      // Switch partner if other not done
      if (!otherDone) {
        const next2 = partner === "aaron" ? "linwei" : "aaron";
        setPartner(next2);
        setAnswers(updated[next2]);
      } else {
        onClose();
      }
    }
  }

  function switchPartner(p: "aaron" | "linwei") {
    setPartner(p);
    setAnswers(checkIn[p]);
    setStep(0);
  }

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
              <PartnerAvatar who="aaron" size={18} /> Aaron
            </button>
            <button
              onClick={() => switchPartner("linwei")}
              className={
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold " +
                (partner === "linwei" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700")
              }
            >
              <PartnerAvatar who="linwei" size={18} /> Lin Wei
            </button>
          </div>
          <div className="text-dbsGray">Question {step + 1} of 10 · neither of you sees the other's answers</div>
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
            Atlas surfaces patterns only. Your raw answers are never shown to your partner.
          </div>
          <div className="font-semibold text-dbsInk">
            {completedPartners}/2 partners finished
          </div>
        </div>
      </div>
    </div>
  );
}
