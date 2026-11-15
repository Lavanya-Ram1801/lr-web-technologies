import { Info } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

/** Shown wherever converted prices may appear. */
export default function CurrencyNote({ className = "" }: { className?: string }) {
  const { isApproximate, currency } = useCurrency();
  if (!isApproximate) return null;
  return (
    <p className={`flex items-start gap-2 text-xs text-soft ${className}`} role="note">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Prices shown in {currency.code} are approximate conversions from INR and are not guaranteed quotations. The
        confirmed quotation is agreed with you directly.
      </span>
    </p>
  );
}
