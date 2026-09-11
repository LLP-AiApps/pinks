import { create } from "zustand";
import { PRESETS } from "@/data/parlays";

type TicketState = {
  selected: string[];
  stake: number;
  toggle: (id: string) => void;
  applyPreset: (legs: number) => void;
  clear: () => void;
  setStake: (n: number) => void;
};

export const useTicket = create<TicketState>()((set, get) => ({
  selected: PRESETS[0].gameIds,
  stake: 50,
  toggle: (id) => {
    const cur = get().selected;
    set({
      selected: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    });
  },
  applyPreset: (legs) => {
    const p = PRESETS.find((x) => x.legs === legs);
    if (p) set({ selected: [...p.gameIds] });
  },
  clear: () => set({ selected: [] }),
  setStake: (n) => set({ stake: Math.max(1, Math.min(10000, n)) }),
}));
