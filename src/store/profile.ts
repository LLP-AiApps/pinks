import { create } from "zustand";
import { DEFAULT_PROFILE, type Profile } from "@/lib/personal";

type ProfileState = {
  profile: Profile;
  hydrate: () => void;
  set: (patch: Partial<Profile>) => void;
};

const KEY = "pinks-profile-v1";

function load(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export const useProfile = create<ProfileState>()((set, get) => ({
  profile: DEFAULT_PROFILE,
  hydrate: () => set({ profile: load() }),
  set: (patch) => {
    const profile = { ...get().profile, ...patch };
    try {
      localStorage.setItem(KEY, JSON.stringify(profile));
    } catch {
      /* quota */
    }
    set({ profile });
  },
}));
