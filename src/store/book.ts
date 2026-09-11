import { create } from "zustand";
import type { BookId } from "@/data/slate";

export type SlipLeg = {
  gameId: string;
  pick: string;
  ml: number;
  line: string;
};

export type SavedSlip = {
  id: string;
  rot: string;
  at: string;
  stake: number;
  book: BookId;
  bookName: string;
  bookPlace: string;
  legs: SlipLeg[];
};

type BookState = {
  slips: SavedSlip[];
  hydrate: () => void;
  save: (slip: Omit<SavedSlip, "id" | "rot" | "at">) => SavedSlip | null;
  remove: (id: string) => void;
};

const KEY = "pinks-slips-v1";
const MAX = 16;

function load(): SavedSlip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedSlip[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

function persist(slips: SavedSlip[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slips));
  } catch {
    /* quota */
  }
}

function rot() {
  return String(Date.now()).slice(-3);
}

export const useBook = create<BookState>()((set, get) => ({
  slips: [],
  hydrate: () => set({ slips: load() }),
  save: (input) => {
    if (!input.legs.length) return null;
    const slip: SavedSlip = {
      ...input,
      id: `slip-${Date.now()}`,
      rot: rot(),
      at: new Date().toISOString(),
    };
    const slips = [slip, ...get().slips].slice(0, MAX);
    persist(slips);
    set({ slips });
    return slip;
  },
  remove: (id) => {
    const slips = get().slips.filter((s) => s.id !== id);
    persist(slips);
    set({ slips });
  },
}));
