import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CURRENCIES, type CurrencyInfo } from "../data/site";
import type { CurrencyCode } from "../types";

const KEY = "lr-currency";
const RATES_KEY = "lr-rates-v1";
const RATES_TTL = 12 * 60 * 60 * 1000; // 12 hours

type Rates = Record<CurrencyCode, number>;

const fallbackRates = (): Rates =>
  CURRENCIES.reduce((acc, c) => ({ ...acc, [c.code]: c.perInr }), {} as Rates);

function readCurrency(): CurrencyCode {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "INR" || v === "USD" || v === "EUR" || v === "GBP") return v;
  } catch {
    /* ignore */
  }
  return "INR";
}

interface CurrencyCtx {
  currency: CurrencyInfo;
  setCurrency: (c: CurrencyCode) => void;
  /** Formats an INR amount in the selected currency. Converted values are prefixed with "≈". */
  format: (inr: number) => string;
  /** Formats without the approximation prefix (for the base INR price). */
  isApproximate: boolean;
}

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<CurrencyCode>(readCurrency);
  const [rates, setRates] = useState<Rates>(fallbackRates);

  // Try a free, key-less exchange-rate endpoint; silently keep fallback rates on failure.
  useEffect(() => {
    let cancelled = false;
    try {
      const cached = localStorage.getItem(RATES_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as { at: number; rates: Rates };
        if (Date.now() - parsed.at < RATES_TTL) {
          setRates(parsed.rates);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6000);
    fetch("https://open.er-api.com/v6/latest/INR", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: { result?: string; rates?: Record<string, number> }) => {
        if (cancelled || data.result !== "success" || !data.rates) return;
        const next = fallbackRates();
        (["USD", "EUR", "GBP"] as const).forEach((c) => {
          const r = data.rates?.[c];
          if (typeof r === "number" && r > 0) next[c] = r;
        });
        setRates(next);
        try {
          localStorage.setItem(RATES_KEY, JSON.stringify({ at: Date.now(), rates: next }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* keep fallback */
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCode(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];

  const value = useMemo<CurrencyCtx>(() => {
    const format = (inr: number) => {
      if (currency.code === "INR") {
        return `${currency.symbol}${Math.round(inr).toLocaleString("en-IN")}`;
      }
      const converted = inr * rates[currency.code];
      const rounded = converted >= 100 ? Math.round(converted / 5) * 5 : Math.round(converted);
      return `≈ ${currency.symbol}${rounded.toLocaleString(currency.locale)}`;
    };
    return { currency, setCurrency, format, isApproximate: currency.code !== "INR" };
  }, [currency, rates, setCurrency]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCurrency must be used inside CurrencyProvider");
  return c;
}
