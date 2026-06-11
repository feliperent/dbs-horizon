// Single switch-point for AI generation. Default is mocked, deterministic, offline-safe.
// To plug Anthropic later: replace the implementations below with real SDK calls.
// All functions are pure and synchronous so the UI never blocks.

import { mirrorMessages } from "./mockData";

export function generateMirrorMessage(saveSliderSgd: number): { text: string; gapClosedPct: number; mood: "content" | "worried" | "proud" } {
  // Deterministic interpolation. Higher save => more comfortable future.
  const clamped = Math.max(0, Math.min(1500, saveSliderSgd));
  const pct = Math.round(38 + (clamped / 1500) * 48);
  if (pct < 50) {
    return {
      text:
        "Eh future-me here. At this pace I retire okay but Kopi Studio still small. Push more in lah, your 65-year-old me got more story to tell.",
      gapClosedPct: pct,
      mood: "worried",
    };
  }
  if (pct < 75) {
    return {
      text:
        "Future-me here. Comfortable retirement on track, Kopi Studio paying its way. Not bad ah, just keep the rhythm.",
      gapClosedPct: pct,
      mood: "content",
    };
  }
  return {
    text:
      "Future-me reporting. Last 12 months you ran the plan, you topped up SRS, you funded Kopi Studio. I retire comfortable and Kopi Studio is a real thing. Solid lah.",
    gapClosedPct: pct,
    mood: "proud",
  };
}

export function explainStep(stepTitle: string): string {
  // Plain-language paraphrase. Deterministic by title.
  const map: Record<string, string> = {
    "FX sweep SGD to GBP":
      "You told me to keep your GBP account above 800. The live rate just beat your trigger of 0.578, so I am moving SGD 1,200 across now. Reversible.",
    "Pay DBS Altitude card in full":
      "Your statement closed, your main account has enough buffer, and paying in full saves 26 percent APR. One tap to confirm.",
    "Kopi Studio inventory advance":
      "The Founder pipeline approved a tranche, your Shopify receivables look strong, no chargebacks. Releasing working capital to your business account.",
    "SRS top-up by 31 Dec":
      "Your taxable income is high enough to make this worth around SGD 2,295 in tax saved. The cap is SGD 15,300 and the calendar deadline is real. Biometric because it is irreversible until next tax year.",
    "Sweep above emergency floor to digiPortfolio":
      "Anything above your SGD 12,000 floor moves into digiPortfolio Growth Plus. Auto because it is reversible inside one business day.",
    "Parents allowance to mum":
      "Your standing rule. Day 28, SGD 800 to your mum's POSB account. One tap to confirm, never auto for family.",
  };
  return map[stepTitle] ?? "I am following the rule you wrote for this card. Tap to see the evidence.";
}

export const mirrorBaseline = mirrorMessages.base;
