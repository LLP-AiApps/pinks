export type Swatch = { name: string; hex: string; role: string };

export type Palette = {
  id: string;
  name: string;
  verdict: "live" | "option" | "no";
  note: string;
  swatches: Swatch[];
  preview: {
    bg: string;
    surface: string;
    fg: string;
    muted: string;
    accent: string;
    rule: string;
  };
};

export const PALETTES: Palette[] = [
  {
    id: "ford",
    name: "Ford Field night",
    verdict: "live",
    note: "On the desk now. Honolulu is the accent, not the uniform.",
    swatches: [
      { name: "Night", hex: "#07090d", role: "Field" },
      { name: "Steel", hex: "#12161c", role: "Cards" },
      { name: "Honolulu", hex: "#4aa3d8", role: "Accent" },
      { name: "Silver", hex: "#f4f6f8", role: "Type" },
      { name: "Turf", hex: "#4db87a", role: "Hit" },
      { name: "Crimson", hex: "#d24a4a", role: "Miss" },
    ],
    preview: {
      bg: "#07090d",
      surface: "#12161c",
      fg: "#f4f6f8",
      muted: "#8b96a3",
      accent: "#4aa3d8",
      rule: "#e8b4b0",
    },
  },
  {
    id: "ticket",
    name: "Pink Ticket",
    verdict: "option",
    note: "Salmon is the stub, never the field. Same night. Different object.",
    swatches: [
      { name: "Night", hex: "#07090d", role: "Field" },
      { name: "Steel", hex: "#12161c", role: "Cards" },
      { name: "Salmon", hex: "#e8b4b0", role: "Stub" },
      { name: "Honolulu", hex: "#4aa3d8", role: "Teams" },
      { name: "Silver", hex: "#f4f6f8", role: "Type" },
      { name: "Crimson", hex: "#d24a4a", role: "Miss" },
    ],
    preview: {
      bg: "#1a1014",
      surface: "#2a1c22",
      fg: "#f4f6f8",
      muted: "#c4a8ad",
      accent: "#e8b4b0",
      rule: "#e8b4b0",
    },
  },
  {
    id: "crimson",
    name: "Black / crimson",
    verdict: "option",
    note: "Sportsbook. No team. A little meaner. Good if we ever drop Honolulu.",
    swatches: [
      { name: "Black", hex: "#0a0a0a", role: "Field" },
      { name: "Raised", hex: "#171717", role: "Cards" },
      { name: "Crimson", hex: "#d24a4a", role: "Accent" },
      { name: "Bone", hex: "#f3efe6", role: "Type" },
      { name: "Ash", hex: "#8a8a8a", role: "Mute" },
      { name: "Gold", hex: "#c9a227", role: "Hit" },
    ],
    preview: {
      bg: "#0a0a0a",
      surface: "#171717",
      fg: "#f3efe6",
      muted: "#8a8a8a",
      accent: "#d24a4a",
      rule: "#c9a227",
    },
  },
  {
    id: "maize",
    name: "Navy / maize",
    verdict: "no",
    note: "Michigan in a bottle. You already said you don’t want another team’s site. Shown so we remember why.",
    swatches: [
      { name: "Navy", hex: "#00274c", role: "Field" },
      { name: "Maize", hex: "#ffcb05", role: "Accent" },
      { name: "Bone", hex: "#f4f6f8", role: "Type" },
      { name: "Deep", hex: "#001e38", role: "Cards" },
    ],
    preview: {
      bg: "#00274c",
      surface: "#001e38",
      fg: "#f4f6f8",
      muted: "#9db0c4",
      accent: "#ffcb05",
      rule: "#ffcb05",
    },
  },
];

export const MATERIALS = [
  {
    id: "turf",
    name: "Turf",
    use: "A strip or a footer. Never the whole page.",
    cls: "sample-turf",
  },
  {
    id: "pigskin",
    name: "Pigskin",
    use: "One panel. Laces, pebble, done.",
    cls: "sample-pigskin",
  },
  {
    id: "leather",
    name: "Leather",
    use: "Already on the pool card.",
    cls: "card-leather",
  },
  {
    id: "stub",
    name: "Ticket stock",
    use: "The mark. Salmon thermal, not a pink site.",
    cls: "sample-stub",
  },
] as const;
