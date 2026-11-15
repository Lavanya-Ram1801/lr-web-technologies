import { Check } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { useCurrency } from "../../context/CurrencyContext";
import { waForPackage, waLink } from "../../lib/whatsapp";
import type { PricePackage } from "../../types";

export default function PackageCard({ pkg, index = 0 }: { pkg: PricePackage; index?: number }) {
  const { format } = useCurrency();
  const price = format(pkg.priceInr);
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        className={`card relative flex h-full flex-col p-7 ${
          pkg.highlighted ? "border-brand ring-2 ring-brand/40" : ""
        }`}
      >
        {pkg.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Most popular
          </span>
        )}
        <h3 className="text-xl font-bold">{pkg.name}</h3>
        <p className="mt-1 text-sm text-soft">{pkg.tagline}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-soft">Indicative starting price</p>
        <p className="mt-1 font-display text-4xl font-extrabold text-brand">{price}</p>
        <p className="mt-1 text-xs text-soft">Provisional · final quotation after discussion</p>

        <h4 className="mb-2 mt-6 text-xs font-bold uppercase tracking-widest text-brand">Suitable for</h4>
        <div className="flex flex-wrap gap-1.5">
          {pkg.suitableFor.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <h4 className="mb-2 mt-6 text-xs font-bold uppercase tracking-widest text-brand">Features included</h4>
        <ul className="space-y-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2 pt-7">
          <Button
            to="/contact"
            state={{ service: pkg.name, source: `Pricing – ${pkg.name}`, message: `I am interested in the ${pkg.name} package.` }}
            variant={pkg.highlighted ? "primary" : "outline"}
          >
            Request This Package
          </Button>
          <Button
            href={waLink(waForPackage(pkg.name, `₹${pkg.priceInr.toLocaleString("en-IN")}`))}
            variant="whatsapp"
            icon={<WhatsAppIcon />}
            ariaLabel={`Enquire about the ${pkg.name} package on WhatsApp`}
          >
            WhatsApp Enquiry
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
