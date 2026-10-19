"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { GoalMetric, LevelKey } from "@/app/lib/onboarding-data";
import { blankWeek, buildDemoWeek, todayKey, type Day } from "@/app/lib/week";
import type { DCarte } from "@/app/lib/parcourir-data";

function genUserId(): string {
  return "DM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

const LS_KEY = "dmarche-v1";

export type TextSize = "normal" | "large" | "xlarge";

type PersistedState = {
  level: LevelKey | null;
  goalMetric: GoalMetric;
  locAuth: boolean;
  notif1: boolean;
  notif2: boolean;
  onboarded: boolean;
  isNew: boolean;
  name: string;
  walksDone: number;
  todayMinutes: number;
  todayKey: string | null;
  textSize: TextSize;
  contrast: boolean;
  motion: boolean;
  pedo: string | null;
  lastSync: string | null;
  syncCount: number;
  defisValides: Record<string, boolean>;
  balDone: number;
  balJoined: string[];
  phone: string;
  userId: string | null;
  dcMine: DCarte[];
};

const DEFAULT_STATE: PersistedState = {
  level: null,
  goalMetric: "duree",
  locAuth: false,
  notif1: false,
  notif2: false,
  onboarded: false,
  isNew: true,
  name: "",
  walksDone: 0,
  todayMinutes: 0,
  todayKey: null,
  textSize: "normal",
  contrast: false,
  motion: false,
  pedo: null,
  lastSync: null,
  syncCount: 0,
  defisValides: {},
  balDone: 0,
  balJoined: [],
  phone: "",
  userId: null,
  dcMine: [],
};

type AppStateContextValue = Omit<PersistedState, "todayMinutes" | "todayKey"> & {
  hydrated: boolean;
  week: Day[];
  setLevel: (level: LevelKey) => void;
  setGoalMetric: (metric: GoalMetric) => void;
  setLocAuth: (value: boolean) => void;
  setNotif1: (value: boolean) => void;
  setNotif2: (value: boolean) => void;
  setTextSize: (value: TextSize) => void;
  setContrast: (value: boolean) => void;
  setMotion: (value: boolean) => void;
  finishOnboarding: () => void;
  addWalkMinutes: (minutes: number) => void;
  setPedo: (device: string | null) => void;
  recordSync: () => void;
  toggleDefi: (id: string) => void;
  recordWalkStart: () => void;
  joinCreneau: (id: string) => void;
  leaveCreneau: (id: string) => void;
  completeSignup: (name: string, phone: string) => void;
  completeLogin: (name: string, phone: string) => void;
  setPhone: (phone: string) => void;
  logout: () => void;
  deleteAccount: () => void;
  clearData: () => void;
  submitDCarte: (title: string, theme: string, text: string) => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [week, setWeek] = useState<Day[]>(() => blankWeek());

  useEffect(() => {
    let loaded = DEFAULT_STATE;
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) loaded = { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch {
      // localStorage indisponible : on reste sur l'état par défaut
    }
    setState(loaded);
    const freshWeek = blankWeek();
    if (loaded.todayKey === todayKey()) {
      freshWeek[6] = { ...freshWeek[6], min: loaded.todayMinutes };
    }
    setWeek(freshWeek);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      // localStorage indisponible : rien à persister
    }
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.dataset.text = state.textSize;
    root.dataset.contrast = state.contrast ? "high" : "normal";
    root.dataset.motion = state.motion ? "reduce" : "normal";
  }, [hydrated, state.textSize, state.contrast, state.motion]);

  function bumpToday(minutes: number) {
    setWeek((w) => {
      const next = [...w];
      next[6] = { ...next[6], min: next[6].min + minutes };
      return next;
    });
    setState((s) => ({
      ...s,
      todayMinutes: s.todayKey === todayKey() ? s.todayMinutes + minutes : minutes,
      todayKey: todayKey(),
    }));
  }

  const value: AppStateContextValue = {
    ...state,
    hydrated,
    week,
    setLevel: (level) => setState((s) => ({ ...s, level })),
    setGoalMetric: (goalMetric) => setState((s) => ({ ...s, goalMetric })),
    setLocAuth: (locAuth) => setState((s) => ({ ...s, locAuth })),
    setNotif1: (notif1) => setState((s) => ({ ...s, notif1 })),
    setNotif2: (notif2) => setState((s) => ({ ...s, notif2 })),
    setTextSize: (textSize) => setState((s) => ({ ...s, textSize })),
    setContrast: (contrast) => setState((s) => ({ ...s, contrast })),
    setMotion: (motion) => setState((s) => ({ ...s, motion })),
    finishOnboarding: () => setState((s) => ({ ...s, onboarded: true })),
    addWalkMinutes: (minutes) => {
      bumpToday(minutes);
      setState((s) => ({ ...s, walksDone: s.walksDone + 1 }));
    },
    setPedo: (pedo) => setState((s) => ({ ...s, pedo, lastSync: pedo ? s.lastSync : null })),
    recordSync: () => {
      bumpToday(12);
      setState((s) => ({
        ...s,
        syncCount: s.syncCount + 1,
        lastSync: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }));
    },
    toggleDefi: (id) =>
      setState((s) => ({ ...s, defisValides: { ...s.defisValides, [id]: !s.defisValides[id] } })),
    recordWalkStart: () => setState((s) => ({ ...s, balDone: s.balDone + 1 })),
    joinCreneau: (id) => setState((s) => (s.balJoined.includes(id) ? s : { ...s, balJoined: [...s.balJoined, id] })),
    leaveCreneau: (id) => setState((s) => ({ ...s, balJoined: s.balJoined.filter((x) => x !== id) })),
    completeSignup: (name, phone) => {
      setWeek(blankWeek());
      setState((s) => ({ ...s, name, phone, isNew: true, userId: s.userId || genUserId() }));
    },
    completeLogin: (name, phone) => {
      setWeek(buildDemoWeek());
      setState((s) => ({ ...s, name, phone, isNew: false, onboarded: true, userId: s.userId || genUserId() }));
    },
    setPhone: (phone) => setState((s) => ({ ...s, phone })),
    logout: () => setState((s) => ({ ...s, onboarded: false, phone: "" })),
    deleteAccount: () => {
      setWeek(blankWeek());
      setState(DEFAULT_STATE);
    },
    clearData: () => {
      setWeek(blankWeek());
      setState((s) => ({ ...s, todayMinutes: 0, todayKey: null }));
    },
    submitDCarte: (title, theme, text) =>
      setState((s) => ({
        ...s,
        dcMine: [{ id: "d" + Date.now(), title, theme, text, status: "En relecture" }, ...s.dcMine],
      })),
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState doit être utilisé sous AppStateProvider");
  return ctx;
}
