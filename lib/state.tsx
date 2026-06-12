"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Partner } from "./types";

interface CheckInAnswers {
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
}

type CheckInStatus = {
  complete: boolean;
  completedAt?: string;
  aaron: CheckInAnswers;
  linwei: CheckInAnswers;
};

type ScenarioConfirms = Record<string, { aaron: boolean; linwei: boolean; picked: number | null }>;

interface CoupleState {
  view: Partner;
  setView: (p: Partner) => void;
  checkIn: CheckInStatus;
  setCheckIn: (s: CheckInStatus) => void;
  confirms: ScenarioConfirms;
  setConfirm: (id: string, partner: "aaron" | "linwei", picked: number) => void;
  resetConfirms: () => void;
  notifications: string[];
  notify: (msg: string) => void;
}

const emptyAnswers: CheckInAnswers = {
  longTermSecurity: null,
  proximityToParents: null,
  careerIdentity: null,
  spendingAlignment: null,
  transparencyComfort: null,
  riskAppetite: null,
  emergencyFloorOk: null,
  parentSupportPlans: null,
  childTimingHopes: null,
  fairnessPerception: null,
};

const initialCheckIn: CheckInStatus = {
  complete: false,
  aaron: { ...emptyAnswers },
  linwei: { ...emptyAnswers },
};

const Ctx = createContext<CoupleState | null>(null);

export function CoupleStateProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<Partner>("joint");
  const [checkIn, setCheckInState] = useState<CheckInStatus>(initialCheckIn);
  const [confirms, setConfirms] = useState<ScenarioConfirms>({});
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("atlas-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.view) setViewState(parsed.view);
        if (parsed.checkIn) setCheckInState(parsed.checkIn);
        if (parsed.confirms) setConfirms(parsed.confirms);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("atlas-state", JSON.stringify({ view, checkIn, confirms }));
    } catch {}
  }, [view, checkIn, confirms]);

  const setConfirm = (id: string, partner: "aaron" | "linwei", picked: number) => {
    setConfirms((prev) => {
      const existing = prev[id] ?? { aaron: false, linwei: false, picked: null };
      const next = { ...existing, picked, [partner]: true };
      if (next.aaron && next.linwei) {
        setNotifications((n) => [`Both partners confirmed ${id} option ${picked + 1}. Atlas committed the rule.`, ...n].slice(0, 5));
      }
      return { ...prev, [id]: next };
    });
  };

  const resetConfirms = () => setConfirms({});

  const notify = (msg: string) => setNotifications((n) => [msg, ...n].slice(0, 5));

  return (
    <Ctx.Provider
      value={{
        view,
        setView: setViewState,
        checkIn,
        setCheckIn: setCheckInState,
        confirms,
        setConfirm,
        resetConfirms,
        notifications,
        notify,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCouple(): CoupleState {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCouple must be used inside CoupleStateProvider");
  return c;
}
