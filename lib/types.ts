export type Reversibility = "auto" | "oneTap" | "biometric";

export type PetalTag =
  | "Information"
  | "Order-taking"
  | "Billing"
  | "Payment"
  | "Consultation"
  | "Hospitality"
  | "Safekeeping"
  | "Exceptions";

export type AisaqualTag =
  | "Reliability"
  | "Personalisation"
  | "Anthropomorphism"
  | "Tangibility"
  | "Transparency"
  | "Security";

export interface TimelineStep {
  id: string;
  day: number;
  title: string;
  amount: string;
  destination: string;
  reversibility: Reversibility;
  triggerRule: string;
  whyContributions: { label: string; weight: number }[];
  confidence: number;
  counterfactual: string;
  status: "scheduled" | "executed" | "frozen";
  petals: PetalTag[];
  aisaqual: AisaqualTag[];
}

export interface FounderStage {
  id: string;
  index: number;
  title: string;
  status: "pending" | "drafting" | "review" | "approved";
  artifact: string;
  reasoning: string;
  petals: PetalTag[];
  aisaqual: AisaqualTag[];
}

export interface MirrorMessage {
  language: "Singlish" | "Mandarin" | "Bahasa";
  text: string;
  mood: "content" | "worried" | "proud";
  gapClosedPct: number;
}
