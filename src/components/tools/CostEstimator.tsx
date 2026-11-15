import { useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Info, RotateCcw, Send } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import CurrencyNote from "../pricing/CurrencyNote";
import { useCurrency } from "../../context/CurrencyContext";
import {
  ADDITIONAL,
  AI_OPTIONS,
  BUDGETS,
  BUSINESS_TYPES,
  DESIGN_OPTIONS,
  ECOMMERCE_FEATURES,
  ECOMMERCE_PRODUCTS,
  EXTRA_PAGE_PRICE,
  FEATURES,
  MAX_PAGES,
  RANGE_HIGH,
  RANGE_LOW,
  TIMELINES,
  WEBSITE_TYPES,
  type Option,
} from "../../data/estimator";
import { waLink } from "../../lib/whatsapp";
import type { ContactPrefill } from "../../types";

const roundTo50 = (n: number) => Math.round(n / 50) * 50;

/** Upper limit (INR) for each budget label, used for a gentle comparison note. */
const BUDGET_LIMIT: Record<string, number> = {
  "Under ₹2,000": 2000,
  "₹2,000 – ₹4,000": 4000,
  "₹4,000 – ₹8,000": 8000,
  "₹8,000 – ₹15,000": 15000,
};

interface Line {
  label: string;
  amount: number;
}

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="card p-5 sm:p-6">
      <legend className="px-1 font-display text-lg font-bold">{title}</legend>
      {hint && <p className="-mt-1 mb-4 text-sm text-soft">{hint}</p>}
      {children}
    </fieldset>
  );
}

const choiceCls =
  "flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg p-3 text-sm transition hover:border-brand/60 has-[:checked]:border-brand has-[:checked]:bg-brand/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40";

function Choice({
  type,
  name,
  checked,
  onChange,
  option,
  priceText,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  option: Option;
  priceText: string;
}) {
  return (
    <label className={choiceCls}>
      <input type={type} name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 accent-[rgb(var(--c-brand))]" />
      <span className="flex-1">
        <span className="block font-medium text-ink">{option.label}</span>
        {option.hint && <span className="block text-xs text-soft">{option.hint}</span>}
      </span>
      <span className="shrink-0 text-xs font-semibold text-brand">{priceText}</span>
    </label>
  );
}

export default function CostEstimator() {
  const { format } = useCurrency();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(BUSINESS_TYPES[1]);
  const [typeId, setTypeId] = useState("business");
  const [pages, setPages] = useState(5);
  const [design, setDesign] = useState("template");
  const [features, setFeatures] = useState<string[]>(["contact"]);
  const [products, setProducts] = useState("p20");
  const [ecoFeatures, setEcoFeatures] = useState<string[]>([]);
  const [ai, setAi] = useState("none");
  const [extras, setExtras] = useState<string[]>([]);
  const [budget, setBudget] = useState("Not sure yet");
  const [timeline, setTimeline] = useState("standard");

  const type = WEBSITE_TYPES.find((t) => t.id === typeId) ?? WEBSITE_TYPES[0];
  const isEcom = type.id === "ecommerce";

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const calc = useMemo(() => {
    const lines: Line[] = [];
    lines.push({ label: `${type.label} (includes ${type.includedPages} page${type.includedPages > 1 ? "s" : ""})`, amount: type.price });
    const extraPages = Math.max(0, pages - type.includedPages);
    if (extraPages > 0) lines.push({ label: `${extraPages} additional page${extraPages > 1 ? "s" : ""}`, amount: extraPages * EXTRA_PAGE_PRICE });
    const d = DESIGN_OPTIONS.find((o) => o.id === design);
    if (d && d.price > 0) lines.push({ label: d.label, amount: d.price });
    FEATURES.filter((f) => features.includes(f.id)).forEach((f) => lines.push({ label: f.label, amount: f.price }));
    if (isEcom) {
      const p = ECOMMERCE_PRODUCTS.find((o) => o.id === products);
      if (p && p.price > 0) lines.push({ label: `Catalogue: ${p.label}`, amount: p.price });
      ECOMMERCE_FEATURES.filter((f) => ecoFeatures.includes(f.id)).forEach((f) => lines.push({ label: f.label, amount: f.price }));
    }
    const a = AI_OPTIONS.find((o) => o.id === ai);
    if (a && a.price > 0) lines.push({ label: a.label, amount: a.price });
    ADDITIONAL.filter((e) => extras.includes(e.id)).forEach((e) => lines.push({ label: e.label, amount: e.price }));

    const subtotal = lines.reduce((s, l) => s + l.amount, 0);
    const t = TIMELINES.find((x) => x.id === timeline) ?? TIMELINES[1];
    if (t.multiplier > 1) lines.push({ label: "Urgent delivery surcharge", amount: Math.round(subtotal * (t.multiplier - 1)) });
    const total = roundTo50(subtotal * t.multiplier);
    return { lines, total, low: roundTo50(total * RANGE_LOW), high: roundTo50(total * RANGE_HIGH), timeline: t };
  }, [type, pages, design, features, products, ecoFeatures, ai, extras, timeline, isEcom]);

  const names = (list: Option[], ids: string[]) => list.filter((o) => ids.includes(o.id)).map((o) => o.label);

  const summaryText = useMemo(() => {
    const parts: string[] = [
      `Business type: ${business}`,
      `Website type: ${type.label}`,
      `Pages: ${pages}`,
      `Design: ${DESIGN_OPTIONS.find((o) => o.id === design)?.label ?? ""}`,
      `Features: ${names(FEATURES, features).join(", ") || "None selected"}`,
    ];
    if (isEcom) {
      parts.push(`Catalogue size: ${ECOMMERCE_PRODUCTS.find((o) => o.id === products)?.label ?? ""}`);
      parts.push(`E-commerce requirements: ${names(ECOMMERCE_FEATURES, ecoFeatures).join(", ") || "None selected"}`);
    }
    parts.push(`AI integration: ${AI_OPTIONS.find((o) => o.id === ai)?.label ?? "No AI features"}`);
    parts.push(`Additional: ${names(ADDITIONAL, extras).join(", ") || "None"}`);
    parts.push(`Budget: ${budget}`);
    parts.push(`Timeline: ${calc.timeline.label}`);
    parts.push(`Indicative estimate: ₹${calc.low.toLocaleString("en-IN")} – ₹${calc.high.toLocaleString("en-IN")} (not a confirmed quotation)`);
    return parts.join("\n");
  }, [business, type, pages, design, features, products, ecoFeatures, ai, extras, budget, calc, isEcom]);

  const budgetLimit = BUDGET_LIMIT[budget];
  const overBudget = budgetLimit !== undefined && calc.low > budgetLimit;

  const submitRequirements = () => {
    const state: ContactPrefill = {
      service: type.service,
      budget,
      source: "Project Cost Estimator",
      message: `Project requirements from the Cost Estimator:\n\n${summaryText}`,
    };
    navigate("/contact", { state });
  };

  const reset = () => {
    setBusiness(BUSINESS_TYPES[1]);
    setTypeId("business");
    setPages(5);
    setDesign("template");
    setFeatures(["contact"]);
    setProducts("p20");
    setEcoFeatures([]);
    setAi("none");
    setExtras([]);
    setBudget("Not sure yet");
    setTimeline("standard");
  };

  const waMessage = `Hello L&R Web Technologies, I used your Project Cost Estimator. Here are my requirements:\n\n${summaryText}\n\nCould we discuss this project?`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-6">
        <Group title="1. About your business">
          <label htmlFor="est-business" className="label">
            Business type
          </label>
          <select id="est-business" className="field" value={business} onChange={(e) => setBusiness(e.target.value)}>
            {BUSINESS_TYPES.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Group>

        <Group title="2. Website type" hint="Choose the closest match. Prices are indicative starting points.">
          <div className="grid gap-2 sm:grid-cols-2">
            {WEBSITE_TYPES.map((t) => (
              <Choice
                key={t.id}
                type="radio"
                name="website-type"
                checked={typeId === t.id}
                onChange={() => {
                  setTypeId(t.id);
                  setPages(t.includedPages);
                }}
                option={t}
                priceText={`from ${format(t.price)}`}
              />
            ))}
          </div>
        </Group>

        <Group title="3. Number of pages" hint={`${type.includedPages} page${type.includedPages > 1 ? "s" : ""} included. Each extra page adds about ${format(EXTRA_PAGE_PRICE)}.`}>
          <div className="flex items-center gap-4">
            <label htmlFor="est-pages" className="sr-only">
              Number of pages
            </label>
            <input
              id="est-pages"
              type="range"
              min={1}
              max={MAX_PAGES}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-[rgb(var(--c-brand))]"
            />
            <output htmlFor="est-pages" className="w-12 rounded-lg bg-brand/10 py-1.5 text-center font-bold text-brand">
              {pages}
            </output>
          </div>
        </Group>

        <Group title="4. Design preference">
          <div className="grid gap-2 sm:grid-cols-3">
            {DESIGN_OPTIONS.map((o) => (
              <Choice
                key={o.id}
                type="radio"
                name="design"
                checked={design === o.id}
                onChange={() => setDesign(o.id)}
                option={o}
                priceText={o.price ? `+${format(o.price)}` : "Included"}
              />
            ))}
          </div>
        </Group>

        <Group title="5. Required features" hint="Select everything you need.">
          <div className="grid gap-2 sm:grid-cols-2">
            {FEATURES.map((o) => (
              <Choice
                key={o.id}
                type="checkbox"
                name="features"
                checked={features.includes(o.id)}
                onChange={() => toggle(features, setFeatures, o.id)}
                option={o}
                priceText={`+${format(o.price)}`}
              />
            ))}
          </div>
        </Group>

        {isEcom && (
          <Group title="6. E-commerce requirements">
            <div className="grid gap-2 sm:grid-cols-3">
              {ECOMMERCE_PRODUCTS.map((o) => (
                <Choice
                  key={o.id}
                  type="radio"
                  name="products"
                  checked={products === o.id}
                  onChange={() => setProducts(o.id)}
                  option={o}
                  priceText={o.price ? `+${format(o.price)}` : "Included"}
                />
              ))}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {ECOMMERCE_FEATURES.map((o) => (
                <Choice
                  key={o.id}
                  type="checkbox"
                  name="eco-features"
                  checked={ecoFeatures.includes(o.id)}
                  onChange={() => toggle(ecoFeatures, setEcoFeatures, o.id)}
                  option={o}
                  priceText={`+${format(o.price)}`}
                />
              ))}
            </div>
          </Group>
        )}

        <Group title={`${isEcom ? "7" : "6"}. AI integration`} hint="AI provider usage fees are paid separately by the client.">
          <div className="grid gap-2 sm:grid-cols-2">
            {AI_OPTIONS.map((o) => (
              <Choice
                key={o.id}
                type="radio"
                name="ai"
                checked={ai === o.id}
                onChange={() => setAi(o.id)}
                option={o}
                priceText={o.price ? `+${format(o.price)}` : "—"}
              />
            ))}
          </div>
        </Group>

        <Group title={`${isEcom ? "8" : "7"}. Additional functionality`}>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADDITIONAL.map((o) => (
              <Choice
                key={o.id}
                type="checkbox"
                name="extras"
                checked={extras.includes(o.id)}
                onChange={() => toggle(extras, setExtras, o.id)}
                option={o}
                priceText={`+${format(o.price)}`}
              />
            ))}
          </div>
        </Group>

        <Group title={`${isEcom ? "9" : "8"}. Budget and timeline`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="est-budget" className="label">
                Estimated budget
              </label>
              <select id="est-budget" className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="est-timeline" className="label">
                Preferred delivery timeline
              </label>
              <select id="est-timeline" className="field" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                {TIMELINES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Group>
      </div>

      {/* Live summary */}
      <aside className="card p-6 lg:sticky lg:top-24" aria-label="Estimated project summary" aria-live="polite">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand">
          <Calculator className="h-4 w-4" aria-hidden="true" /> Indicative estimate
        </div>
        <p className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand sm:text-4xl">
          {format(calc.low)} – {format(calc.high)}
        </p>
        <p className="mt-1 text-xs text-soft">Calculated: about {format(calc.total)}</p>

        {overBudget && (
          <p className="mt-4 rounded-xl bg-amber-500/15 p-3 text-xs text-ink" role="status">
            This estimate may be above your selected budget. Contact us and we can discuss options to adjust the scope.
          </p>
        )}

        <h3 className="mb-2 mt-6 text-sm font-bold">Estimated project summary</h3>
        <ul className="space-y-1.5 border-t border-line pt-3 text-sm">
          {calc.lines.map((l, i) => (
            <li key={`${l.label}-${i}`} className="flex justify-between gap-3">
              <span className="text-soft">{l.label}</span>
              <span className="shrink-0 font-medium">{format(l.amount)}</span>
            </li>
          ))}
        </ul>

        <h3 className="mb-2 mt-6 text-sm font-bold">Your selected requirements</h3>
        <pre className="whitespace-pre-wrap rounded-xl bg-muted p-3 font-sans text-xs leading-relaxed text-soft">{summaryText}</pre>

        <div className="mt-5 flex gap-2 rounded-xl border border-brand/30 bg-brand/5 p-3 text-xs text-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <p>
            This is an indicative estimate only, not a confirmed quotation. The final quotation depends on project
            complexity and a discussion with you. Domain, hosting and paid third-party services are charged separately.
          </p>
        </div>
        <CurrencyNote className="mt-3" />

        <div className="mt-5 grid gap-2">
          <Button onClick={submitRequirements} icon={<Send className="h-4 w-4" />} fullWidth>
            Submit My Requirements
          </Button>
          <Button href={waLink(waMessage)} variant="whatsapp" icon={<WhatsAppIcon />} fullWidth>
            WhatsApp Enquiry
          </Button>
          <Button onClick={reset} variant="ghost" size="sm" icon={<RotateCcw className="h-4 w-4" />} fullWidth>
            Reset
          </Button>
        </div>
      </aside>
    </div>
  );
}
