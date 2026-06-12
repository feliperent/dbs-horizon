// Deterministic, offline-safe Atlas replies.
// Voice rules: always names both partners, never says "you" alone in joint space,
// refuses values-laden recommendations.

import type { Partner } from "./types";

export interface PresetPrompt {
  id: string;
  label: string;
  prompt: string;
}

export const presetPrompts: PresetPrompt[] = [
  {
    id: "hdb",
    label: "We are stuck on BTO vs resale",
    prompt: "Atlas, we cannot finish the conversation about Punggol BTO vs Bishan resale. Can you lay it out?",
  },
  {
    id: "baby",
    label: "Planning for a baby in 2 years",
    prompt: "We want a child in about 2 years. What does the cashflow look like if Lin Wei takes a year off?",
  },
  {
    id: "envelope",
    label: "Set fair joint envelopes",
    prompt: "Aaron earns three times what Lin Wei does. How do we set joint envelopes that feel fair?",
  },
  {
    id: "gap",
    label: "Why does the savings gap matter?",
    prompt: "Aaron's savings rate is 14%, Lin Wei's is 22%. Why are you flagging this?",
  },
  {
    id: "parents",
    label: "Plan parent allowance and care",
    prompt: "Atlas, we want to plan for our parents' future care. Where do we start?",
  },
  {
    id: "sabbatical",
    label: "Sabbatical scenario",
    prompt: "Aaron is considering a 6-month sabbatical. Can we afford it?",
  },
];

export function atlasGreeting(partner: Partner): string {
  if (partner === "joint") {
    return "Aaron and Lin Wei, the joint dashboard is up to date. The shared groceries envelope is at 77 percent with 6 days left in the month.";
  }
  if (partner === "aaron") {
    return "Aaron, this is your private view. Lin Wei sees the joint envelopes only at category level, never line items.";
  }
  return "Lin Wei, this is your private view. Aaron sees the joint envelopes only at category level, never line items.";
}

export function atlasReply(prompt: string, audience: Partner): string {
  const p = prompt.toLowerCase();

  if (p.includes("bto") || p.includes("resale") || p.includes("flat") || p.includes("hdb") || p.includes("stuck")) {
    if (audience !== "joint") {
      return "I am holding this for the joint space. The numbers belong to both of you. Open the joint thread and I will surface the side-by-side.";
    }
    return "Aaron and Lin Wei, three paths. Path one: Punggol BTO Standard 4-room, indicative SGD 380,000, three to four year wait. Your joint CPF OA (SGD 165,000) fully covers the 25 percent down-payment. No cash gap. Path two: Bishan 4-room resale, median SGD 830,000 in 2024. Joint CPF covers SGD 165,000 of the SGD 207,500 down-payment, cash gap SGD 42,000. Path three I am proposing: ballot Punggol Tuesday at zero cost, set a 12-month SGD 42,000 goal in parallel. If you ballot in, you take it. If you do not, you have the Bishan cash ready. I will not pick.";
  }

  if (p.includes("baby") || p.includes("child") || p.includes("kid") || p.includes("leave") || p.includes("unpaid") || p.includes("maternity")) {
    if (audience !== "joint") {
      return "This is a joint decision. Tell me what you want to think through and I will run the cashflow in the joint thread so the other of you sees the same numbers.";
    }
    return "Aaron and Lin Wei, here are three durations. Full year unpaid leave for Lin Wei drops household income by roughly SGD 81,000 gross (Lin Wei full-year plus employer CPF, MOM median). Six months unpaid then Anchor infant-care: income drop SGD 41,000, net childcare SGD 675 per month after the working-mother subsidy (ECDA 2024). Return at month 4 with mum-in-law for two days a week: drop SGD 27,000. All three include Baby Bonus SGD 11,000, CDA First Step SGD 5,000, CDA co-match up to SGD 4,000, and MediSave Grant for Newborns SGD 4,000. I will not pick. Talk for fifteen minutes.";
  }

  if (p.includes("envelope") || p.includes("groceries") || p.includes("fair") || p.includes("split") || p.includes("three times") || p.includes("3 times") || p.includes("proportional")) {
    return "Aaron and Lin Wei, the unequal-income literature gives you three patterns: equal split (each contributes 50 percent of joint expenses, Lin Wei feels stretched), proportional split (Aaron contributes ~75 percent, mathematically fair, can feel patronising), or pooled (everything joint, individual discretionary on top). Right now you run the third pattern. Aaron's joint contribution this month is SGD 6,400, Lin Wei's is SGD 2,150, ratio 2.98 to 1. I can simulate any of the three. Both of you confirm to switch.";
  }

  if (p.includes("savings rate") || p.includes("divergence") || p.includes("flag") || p.includes("rate gap")) {
    return "Aaron at 14 percent, Lin Wei at 22 percent. The gap has been above 6 percentage points for 11 consecutive weeks. That triggers the Goal Divergence Flag. The flag is not a verdict. It is a conversation prompt. Three reasons it matters: (1) one partner is building a bigger private buffer faster, (2) over time this changes who controls discretionary choices, (3) couples who never address it report lower financial satisfaction (Britt 2010, directional). I propose we surface it at the next Quarterly Check-In.";
  }

  if (p.includes("parent") || p.includes("mother") || p.includes("father") || p.includes("allowance") || p.includes("filial")) {
    return "Aaron and Lin Wei, four variables I would need from both of you: monthly allowance amount per parent, expected first medical-event year, current Eldershield/CareShield coverage, and whether either of you would consider co-living. I have your current SGD 800 a month to Lin Wei's mum, no allowance to Aaron's parents yet. Want me to schedule the first parent-care check-in for next week?";
  }

  if (p.includes("sabbatical") || p.includes("career break") || p.includes("time off") || p.includes("quit")) {
    return "If Aaron takes 6 months off at zero income, your joint pool runs at SGD 4,200 net per month (Lin Wei after CPF and tax). Your joint cushion (SGD 68,950 including the flat fund) would absorb the gap but the flat-fund goal slips by 9 months. Two compromises: take 4 months instead of 6, or keep one freelance contract during the break for SGD 2,000 a month. I will not pick.";
  }

  if (p.includes("hi") || p.includes("hello") || p.includes("start") || p.length < 12) {
    return "Aaron and Lin Wei, I have your joint and private balances loaded. Joint cash SGD 68,950. Combined CPF OA SGD 165,000. Three scenarios are on the table: HDB, baby, envelope rules. Pick one or ask me something else.";
  }

  return "I will not give a single answer here. Tell me what each of you cares about most and I will lay out what each path costs.";
}
