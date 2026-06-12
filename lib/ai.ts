// Deterministic, offline-safe mock generation for Atlas.
// Voice rules: always names both partners, never says "you" alone in joint space,
// refuses values-laden recommendations.

import type { Partner } from "./types";

export function atlasGreeting(partner: Partner): string {
  if (partner === "joint") {
    return "Aaron and Lin Wei, the joint dashboard is up to date. The shared groceries envelope is at 77 percent.";
  }
  if (partner === "aaron") {
    return "Aaron, this is your private view. Lin Wei sees the joint envelopes only at category level, never line items.";
  }
  return "Lin Wei, this is your private view. Aaron sees the joint envelopes only at category level, never line items.";
}

export function atlasReply(prompt: string, audience: Partner): string {
  const p = prompt.toLowerCase();
  if (p.includes("hdb") || p.includes("flat") || p.includes("bto") || p.includes("resale")) {
    return audience === "joint"
      ? "Aaron and Lin Wei, here are the two paths and a third I want to propose. I will not pick. The non-money variable each of you named in October is on the card."
      : "I am holding this conversation for the joint space. Both of you should be present when I surface the side-by-side.";
  }
  if (p.includes("baby") || p.includes("child") || p.includes("leave")) {
    return audience === "joint"
      ? "Aaron and Lin Wei, here is what each leave option costs and here is what each of you flagged. The decision is yours."
      : "Reach out to your partner. I will run the three-option cashflow in the joint space, not here.";
  }
  if (p.includes("espresso") || p.includes("envelope")) {
    return "I logged the espresso machine. Lin Wei, Aaron, the rule you set at onboarding was SGD 500. The buy was on Aaron's individual account so the joint flag did not trigger in time. Three options below.";
  }
  return "I will not give a single answer here. Tell me what each of you cares about most and I will lay out what each path costs.";
}
