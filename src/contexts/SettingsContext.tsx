import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  type AppSettings,
} from "../lib/settings";

type SettingsContextValue = {
  settings: AppSettings;
  setSettings: (next: AppSettings) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettingsState(loadSettings());
  }, []);

  const setSettings = (next: AppSettings) => {
    setSettingsState(next);
    saveSettings(next);
  };

  const value = useMemo(() => ({ settings, setSettings }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
