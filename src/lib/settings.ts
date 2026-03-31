export type AppSettings = {
  industryCategory?: string; // CoinGecko category_id
  vsCurrency: string;
};

const KEY = "lasarvision.settings.v1";

export const DEFAULT_SETTINGS: AppSettings = {
  industryCategory: "decentralized-finance-defi",
  vsCurrency: "usd",
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    } as AppSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: AppSettings) {
  localStorage.setItem(KEY, JSON.stringify(s));
}
