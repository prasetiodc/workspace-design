export type RentalDurationId = "1w" | "1m" | "3m";
export type BuilderCategory = "desk" | "chair" | "accessory";
export type BuilderView = "builder" | "summary";
export type Setup = {
  deskId: string;
  chairId: string | null;
  accessories: Record<string, number>;
  duration: RentalDurationId;
};
export type PresetName = "developer" | "minimal" | "creative";
export type RentalDuration = { id: RentalDurationId; label: string; factor: number; note: string };

export const STORAGE_KEY = "monis-workspace-setup";
export const DEFAULT_SETUP: Setup = {
  deskId: "desk-adjustable",
  chairId: "chair-ergonomic",
  accessories: { "monitor-xiaomi": 1, "leaf-plant": 1 },
  duration: "1m",
};

export const RENTAL_DURATIONS: RentalDuration[] = [
  { id: "1w", label: "1 week", factor: 0.35, note: "Short stay" },
  { id: "1m", label: "1 month", factor: 1, note: "Flexible" },
  { id: "3m", label: "3 months", factor: 2.7, note: "Save 10%" },
];

export const CATEGORY_LABELS: Record<BuilderCategory, string> = {
  desk: "Desk",
  chair: "Chair",
  accessory: "Extras",
};

export const SETUP_PRESETS: Record<PresetName, Omit<Setup, "duration">> = {
  developer: {
    deskId: "desk-adjustable",
    chairId: "chair-ergonomic",
    accessories: { "monitor-xiaomi": 2, keyboard: 1, "leaf-plant": 1 },
  },
  minimal: {
    deskId: "desk-electrical",
    chairId: "chair-classic",
    accessories: { "desk-lamp": 1 },
  },
  creative: {
    deskId: "desk-adjustable",
    chairId: "chair-classic",
    accessories: { "monitor-studio": 1, "desk-lamp": 1, "leaf-plant": 1 },
  },
};
