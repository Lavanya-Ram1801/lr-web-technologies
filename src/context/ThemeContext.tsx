import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeId } from "../types";

export const THEMES: { id: ThemeId; label: string; swatch: string }[] = [
  { id: "purple", label: "Purple Premium", swatch: "linear-gradient(135deg,#6d28d9,#a78bfa)" },
  { id: "dark", label: "Dark Technology", swatch: "linear-gradient(135deg,#0a0916,#38bdf8)" },
  { id: "minimal", label: "Minimal White", swatch: "linear-gradient(135deg,#ffffff,#d4d4d8)" },
];

const KEY = "lr-theme";

function readStored(): ThemeId {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "purple" || v === "dark" || v === "minimal") return v;
  } catch {
    /* storage unavailable */
  }
  return "purple";
}

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readStored);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
}
