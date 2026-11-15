import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface MenuOption<T extends string> {
  id: T;
  label: string;
  leading?: ReactNode;
}

interface Props<T extends string> {
  ariaLabel: string;
  icon: ReactNode;
  value: T;
  options: MenuOption<T>[];
  onChange: (id: T) => void;
  /** What to show on the trigger button next to the icon. */
  triggerText?: string;
  align?: "left" | "right";
}

/** Small accessible dropdown used for the theme and currency selectors. */
export default function SelectMenu<T extends string>({
  ariaLabel,
  icon,
  value,
  options,
  onChange,
  triggerText,
  align = "right",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-2 text-sm font-medium text-ink transition hover:border-brand"
      >
        {icon}
        {triggerText && <span>{triggerText}</span>}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-bg p-1 shadow-card ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => (
            <li key={o.id} role="option" aria-selected={o.id === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-brand/10 ${
                  o.id === value ? "font-semibold text-brand" : "text-ink"
                }`}
              >
                {o.leading}
                <span className="flex-1">{o.label}</span>
                {o.id === value && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
