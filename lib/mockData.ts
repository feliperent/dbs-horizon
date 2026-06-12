import type { Envelope, Scenario, AtlasMessage, DivergenceFlag } from "./types";

export const aaron = {
  name: "Aaron Lim",
  age: 28,
  role: "Software engineer at Grab",
  salaryMonthly: 9400,
  city: "Singapore",
  initials: "AL",
  accentClass: "text-sky-600",
  accentBg: "bg-sky-50",
};

export const linwei = {
  name: "Lin Wei",
  age: 27,
  role: "Freelance illustrator",
  salaryMonthly: 3800,
  city: "Singapore",
  initials: "LW",
  accentClass: "text-rose-600",
  accentBg: "bg-rose-50",
};

export const couple = {
  marriedMonths: 14,
  marriedSince: "April 2025",
  jointGoal: "First HDB and first child within the next 24 months",
  living: "Lin Wei's family flat, Tampines",
  yearsTogether: 4,
  jointSavings: 38400,
  jointEmergencyFloor: 18000,
};

export const envelopes: Envelope[] = [
  { id: "e1", name: "Groceries", scope: "joint", budget: 800, used: 612, category: "Living" },
  { id: "e2", name: "Dining out", scope: "joint", budget: 500, used: 487, category: "Living" },
  { id: "e3", name: "Utilities + Telco", scope: "joint", budget: 320, used: 305, category: "Living" },
  { id: "e4", name: "BTO down-payment", scope: "joint", budget: 125000, used: 38400, category: "Goals" },
  { id: "e5", name: "Baby fund (start Q3 2027)", scope: "joint", budget: 22000, used: 4100, category: "Goals" },
  { id: "e6", name: "Aaron discretionary", scope: "aaron", budget: 1400, used: 1820, category: "Personal" },
  { id: "e7", name: "Aaron SRS top-up", scope: "aaron", budget: 7300, used: 0, category: "Goals" },
  { id: "e8", name: "Lin Wei discretionary", scope: "linwei", budget: 900, used: 540, category: "Personal" },
  { id: "e9", name: "Lin Wei studio supplies", scope: "linwei", budget: 480, used: 412, category: "Work" },
];

export const scenarios: Scenario[] = [
  {
    id: "hdb",
    title: "HDB resale vs BTO",
    tension: "Aaron wants a Punggol BTO (longer wait, cheaper). Lin Wei wants a Bishan resale (closer to her parents, available now).",
    options: [
      {
        label: "Punggol BTO Standard, 4-room",
        cost: "SGD 380k indicative · 3-4 year wait",
        tradeoff: "Down-payment fully covered by joint CPF OA. No cash gap. Lin Wei moves further from parents.",
      },
      {
        label: "Bishan resale, 4-room",
        cost: "SGD 830k median (HDB 2024) · move within 6 months",
        tradeoff: "SGD 207k down-payment, joint CPF OA covers SGD 165k, cash gap SGD 42k. Closer to Lin Wei's parents.",
      },
      {
        label: "Parallel path: ballot Punggol, save for Bishan",
        cost: "Cost of the ballot is SGD 0. Goal is SGD 42k in 12 months.",
        tradeoff: "Atlas-proposed compromise. Ballot Punggol as a no-cost option. Build the Bishan cash gap in parallel.",
      },
    ],
    atlasNote:
      "Aaron and Lin Wei, both paths are financially feasible. The non-money variable you each named matters here: Lin Wei's parent proximity, Aaron's wait-time anxiety. I will not pick. Talk for 15 minutes, I will check in next week.",
    petals: ["Information", "Consultation", "Exceptions"],
    aisaqual: ["Personalisation", "Transparency", "Anthropomorphism"],
  },
  {
    id: "child",
    title: "First child cost runway",
    tension: "Lin Wei is considering a year of unpaid leave after the birth. Aaron is worried about cashflow but does not want to be the one who tells her no.",
    options: [
      {
        label: "Full year unpaid leave",
        cost: "Household income drop SGD 81k (gross + CPF, MOM median, directional)",
        tradeoff: "Liquid reserves fall to SGD 11k by month 9, below the joint emergency floor.",
      },
      {
        label: "Six months unpaid, then Anchor infant-care",
        cost: "Income drop SGD 41k. Net infant-care SGD 675/month after subsidy (ECDA 2024).",
        tradeoff: "Reserves stay above floor. Lin Wei flagged career identity in the Q4 check-in.",
      },
      {
        label: "Return at month 4, parent-and-Anchor split",
        cost: "Income drop SGD 27k. Mum-in-law helps 2 days a week.",
        tradeoff: "Best on numbers, hardest on Lin Wei's preference. Atlas does not recommend.",
      },
    ],
    atlasNote:
      "Aaron and Lin Wei, here is what each option costs and here is what each of you said matters. The decision is yours. Baby Bonus, CDA First Step, and the MediSave Grant are applied in all three.",
    petals: ["Information", "Consultation", "Safekeeping"],
    aisaqual: ["Reliability", "Personalisation", "Transparency"],
  },
  {
    id: "envelope",
    title: "Envelope mediator: the SGD 4,000 espresso machine",
    tension:
      "Aaron bought a SGD 4,000 espresso machine from his individual account. The shared appliance budget category ticks down. Lin Wei feels blindsided about whether this was joint or individual.",
    options: [
      {
        label: "Re-categorise as individual",
        cost: "Aaron absorbs from his discretionary over 3 months (SGD 1,333/month).",
        tradeoff: "Lin Wei's joint appliance envelope stays whole. Aaron tight on discretionary till Apr.",
      },
      {
        label: "Re-categorise as joint",
        cost: "Both absorb from joint appliance envelope. Goal pushed by 2 months.",
        tradeoff: "Symmetric burden. BTO down-payment timeline shifts by 2 months.",
      },
      {
        label: "Joint plus update rule to SGD 1,000",
        cost: "Same as joint. Going forward, appliances above SGD 1,000 are flagged.",
        tradeoff: "Atlas-proposed. Lowers the threshold so this surprise does not recur.",
      },
    ],
    atlasNote:
      "Aaron and Lin Wei, the rule you set at onboarding was SGD 500 flagged for joint review, but the espresso machine was on Aaron's individual account so it did not trigger the flag in time. Three options, you both confirm.",
    petals: ["Order-taking", "Consultation", "Exceptions"],
    aisaqual: ["Transparency", "Anthropomorphism", "Personalisation"],
  },
];

export const atlasJointThread: AtlasMessage[] = [
  {
    id: "m1",
    speaker: "atlas",
    audience: "joint",
    text:
      "Aaron and Lin Wei, good evening. The shared groceries envelope is at 77 percent with 6 days left in the month. No action needed.",
  },
  {
    id: "m2",
    speaker: "atlas",
    audience: "joint",
    text:
      "Quarterly check-in is due on the 20th. Ten questions each, separately. I will read both answers, neither of you will see the other's words. I will surface the patterns only.",
  },
  {
    id: "m3",
    speaker: "aaron",
    audience: "joint",
    text: "Atlas, can you pull the HDB side-by-side? Lin Wei and I are stuck on this again.",
  },
  {
    id: "m4",
    speaker: "atlas",
    audience: "joint",
    text:
      "Aaron, Lin Wei, here are the two paths and a third I want to propose. I will not pick. The non-money variables you each named in October are also on this card.",
  },
];

export const divergenceFlag: DivergenceFlag = {
  metric: "Quarterly savings rate",
  aaron: "14% of net income",
  linwei: "22% of net income",
  gap: "8 percentage points",
  threshold: "Atlas flags when sustained above 6 percentage points for 3 months",
  triggered: true,
};

export const aisaqualGlossary: Record<string, string> = {
  Reliability: "Atlas does what it said it would do, on the rules the couple set.",
  Personalisation: "Grounded in the couple's actual accounts and their stated values.",
  Anthropomorphism: "Atlas has a name, an avatar, a voice that always names both partners.",
  Tangibility: "Visual, scannable, two-partner side-by-sides on every decision.",
  Transparency: "Every Atlas suggestion shows the rule, the data, the rejected alternative.",
  Security: "Joint visibility is category-level by default. Line-item disclosure is opt-in.",
};

export const petalGlossary: Record<string, string> = {
  Information: "Curated, contextual data shown before a decision.",
  "Order-taking": "Couple states the intent. Atlas confirms.",
  Billing: "Statements, receipts, fee schedules visible to both.",
  Payment: "Money moves only on a rule both partners confirmed.",
  Consultation: "Advice grounded in the couple's data and the dyadic check-in.",
  Hospitality: "Tone, parlance, warmth. Atlas names both partners, never 'you' alone.",
  Safekeeping: "Custody of joint and individual funds, with category-level disclosure default.",
  Exceptions: "Overrides, envelope mediator, freeze, dispute escalation to human RM.",
};
