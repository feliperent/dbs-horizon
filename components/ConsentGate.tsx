"use client";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirmed: () => void;
  title: string;
  amount: string;
  destination: string;
}

export default function ConsentGate({ open, onCancel, onConfirmed, title, amount, destination }: Props) {
  const [phase, setPhase] = useState<"idle" | "biometric" | "cooloff" | "done">("idle");
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    if (!open) {
      setPhase("idle");
      setRemaining(10);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== "cooloff") return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setPhase("done");
          setTimeout(() => onConfirmed(), 400);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, onConfirmed]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-soft border border-dbsLine overflow-hidden">
        <div className="px-5 py-3 bg-dbsRed text-white">
          <div className="text-[11px] uppercase tracking-wide font-semibold opacity-80">Consent gate</div>
          <div className="text-base font-bold">Irreversible action</div>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <div className="text-xs font-semibold text-dbsGray uppercase tracking-wide">Action</div>
            <div className="text-sm font-semibold text-dbsInk">{title}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-semibold text-dbsGray uppercase tracking-wide">Amount</div>
              <div className="text-sm font-bold text-dbsInk">{amount}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-dbsGray uppercase tracking-wide">Destination</div>
              <div className="text-sm font-semibold text-dbsInk">{destination}</div>
            </div>
          </div>

          {phase === "idle" && (
            <div className="space-y-3">
              <p className="text-xs text-dbsGray">
                This action cannot be reversed until next tax year. Confirm with biometric.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="text-sm font-semibold px-3 py-2 rounded-md border border-dbsLine text-dbsInk hover:bg-dbsSurface"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  className="text-sm font-semibold px-4 py-2 rounded-md bg-dbsRed text-white hover:bg-dbsRedDark"
                  onClick={() => setPhase("biometric")}
                >
                  Use Touch ID
                </button>
              </div>
            </div>
          )}

          {phase === "biometric" && (
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="w-14 h-14 rounded-full bg-dbsRedLight flex items-center justify-center pulse-ring">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-dbsRed" fill="currentColor">
                  <path d="M12 1C7 1 3 5 3 10v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-3.86 3.14-7 7-7s7 3.14 7 7v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-5-4-9-9-9zm0 4c-2.76 0-5 2.24-5 5v5c0 .55.45 1 1 1s1-.45 1-1v-5c0-1.66 1.34-3 3-3s3 1.34 3 3v6.5c0 1.93-1.57 3.5-3.5 3.5S8 18.93 8 17v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 3.03 2.47 5.5 5.5 5.5S17 19.03 17 16V10c0-2.76-2.24-5-5-5z" />
                </svg>
              </div>
              <div className="text-sm font-semibold text-dbsInk">Touch the sensor</div>
              <button
                className="text-xs underline text-dbsGray"
                onClick={() => setPhase("cooloff")}
              >
                Simulate biometric pass
              </button>
            </div>
          )}

          {phase === "cooloff" && (
            <div className="flex flex-col items-center gap-2 py-3">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <circle cx="50" cy="50" r="45" stroke="#E5E5E5" strokeWidth="6" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#C8102E"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="282.74"
                  strokeDashoffset={(282.74 * (10 - remaining)) / 10}
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
                <text
                  x="50"
                  y="56"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontWeight="800"
                  fontSize="22"
                  fill="#C8102E"
                >
                  {remaining}
                </text>
              </svg>
              <div className="text-sm font-semibold text-dbsInk">Cool-off, tap to abort</div>
              <button
                className="text-sm font-semibold px-3 py-1.5 rounded-md border border-dbsLine text-dbsRed hover:bg-dbsRedLight"
                onClick={onCancel}
              >
                Abort
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center gap-2 py-3 text-dbsGreen">
              <div className="w-12 h-12 rounded-full bg-dbsGreen/15 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="text-sm font-semibold">Executed. Receipt ready.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
