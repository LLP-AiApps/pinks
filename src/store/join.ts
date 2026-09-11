import { create } from "zustand";
import { LEGAL_VERSION } from "@/data/legal";

export const MAILER_STATUS = "dark" as const;

export type JoinRecord = {
  at: string;
  name: string;
  email: string;
  phone: string;
  channel: "email" | "sms" | "both" | "app";
  version: string;
  mailer: typeof MAILER_STATUS;
};

type JoinState = {
  record: JoinRecord | null;
  hydrate: () => void;
  sign: (input: Omit<JoinRecord, "at" | "version" | "mailer">) => JoinRecord;
  leave: () => void;
};

const KEY = "pinks-join-v1";

function load(): JoinRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JoinRecord;
  } catch {
    return null;
  }
}

export const useJoin = create<JoinState>()((set) => ({
  record: null,
  hydrate: () => set({ record: load() }),
  sign: (input) => {
    const record: JoinRecord = {
      ...input,
      at: new Date().toISOString(),
      version: LEGAL_VERSION,
      mailer: MAILER_STATUS,
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(record));
    } catch {
      /* quota */
    }
    set({ record });
    return record;
  },
  leave: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* */
    }
    set({ record: null });
  },
}));
