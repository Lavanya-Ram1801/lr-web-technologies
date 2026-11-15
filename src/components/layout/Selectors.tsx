import { Coins, Palette } from "lucide-react";
import SelectMenu from "../ui/SelectMenu";
import { THEMES, useTheme } from "../../context/ThemeContext";
import { useCurrency } from "../../context/CurrencyContext";
import { CURRENCIES } from "../../data/site";
import type { CurrencyCode, ThemeId } from "../../types";

export function ThemeSelector({ align = "right" }: { align?: "left" | "right" }) {
  const { theme, setTheme } = useTheme();
  return (
    <SelectMenu<ThemeId>
      ariaLabel="Select website theme"
      icon={<Palette className="h-4 w-4" aria-hidden="true" />}
      value={theme}
      align={align}
      onChange={setTheme}
      options={THEMES.map((t) => ({
        id: t.id,
        label: t.label,
        leading: (
          <span
            className="h-4 w-4 shrink-0 rounded-full border border-line"
            style={{ background: t.swatch }}
            aria-hidden="true"
          />
        ),
      }))}
    />
  );
}

export function CurrencySelector({ align = "right" }: { align?: "left" | "right" }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <SelectMenu<CurrencyCode>
      ariaLabel="Select display currency"
      icon={<Coins className="h-4 w-4" aria-hidden="true" />}
      triggerText={currency.code}
      value={currency.code}
      align={align}
      onChange={setCurrency}
      options={CURRENCIES.map((c) => ({ id: c.code, label: c.label, leading: <span className="w-4 text-center">{c.symbol}</span> }))}
    />
  );
}
