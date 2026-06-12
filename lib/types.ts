export type Partner = "aaron" | "linwei" | "joint";

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

export interface Envelope {
  id: string;
  name: string;
  scope: "joint" | "aaron" | "linwei";
  budget: number;
  used: number;
  category: string;
}

export interface Scenario {
  id: "hdb" | "child" | "envelope";
  title: string;
  tension: string;
  options: { label: string; cost: string; tradeoff: string }[];
  atlasNote: string;
  petals: PetalTag[];
  aisaqual: AisaqualTag[];
}

export interface AtlasMessage {
  id: string;
  speaker: "atlas" | "aaron" | "linwei";
  text: string;
  audience: "joint" | "aaron" | "linwei";
}

export interface DivergenceFlag {
  metric: string;
  aaron: string;
  linwei: string;
  gap: string;
  threshold: string;
  triggered: boolean;
}
