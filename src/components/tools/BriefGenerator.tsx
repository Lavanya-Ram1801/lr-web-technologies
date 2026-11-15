import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ClipboardCopy, FileText, Send, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { BUDGETS, BUSINESS_TYPES, FEATURES, TIMELINES, WEBSITE_TYPES } from "../../data/estimator";
import { waLink } from "../../lib/whatsapp";
import type { ContactPrefill } from "../../types";

const GOALS = [
  "Generate enquiries and leads",
  "Sell products online",
  "Showcase work or portfolio",
  "Provide information about my business",
  "Build trust and credibility",
  "Automate a task or process",
];
const STYLES = ["Modern & minimal", "Bold & colourful", "Elegant & premium", "Playful & friendly", "Dark & techy", "Clean & corporate"];
const EXTRA_FEATURES = ["WhatsApp chat button", "Image gallery", "Testimonials section", "AI chatbot", "Payment integration", "Admin panel"];
const FEATURE_CHOICES = Array.from(new Set([...FEATURES.map((f) => f.label), ...EXTRA_FEATURES]));

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max)}…\n[Brief shortened – I can share the full version]` : text);

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

const chipCls =
  "cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-sm transition hover:border-brand/60 has-[:checked]:border-brand has-[:checked]:bg-brand/15 has-[:checked]:font-semibold has-[:checked]:text-brand has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40";

export default function BriefGenerator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState(BUSINESS_TYPES[1]);
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [typeId, setTypeId] = useState("business");
  const [features, setFeatures] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [colors, setColors] = useState("");
  const [refs, setRefs] = useState("");
  const [timeline, setTimeline] = useState("standard");
  const [budget, setBudget] = useState("Not sure yet");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const type = WEBSITE_TYPES.find((t) => t.id === typeId) ?? WEBSITE_TYPES[0];

  const build = () => {
    const list = (items: string[], fallback: string) => (items.length ? items.map((i) => `  • ${i}`).join("\n") : `  • ${fallback}`);
    return [
      "PROJECT BRIEF",
      "Prepared with the L&R Web Technologies Project Brief Generator",
      `Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "",
      "1. PROJECT OVERVIEW",
      `  Project / business name: ${name.trim() || "Not specified"}`,
      `  Business type: ${business}`,
      `  Idea: ${idea.trim()}`,
      "",
      "2. BUSINESS REQUIREMENTS",
      `  Target audience: ${audience.trim() || "Not specified"}`,
      "  Main goals:",
      list(goals, "Not specified"),
      "",
      "3. WEBSITE TYPE",
      `  ${type.label}`,
      "",
      "4. MAIN FEATURES",
      list(features, "To be discussed"),
      "",
      "5. DESIGN PREFERENCES",
      `  Style: ${styles.length ? styles.join(", ") : "Open to suggestions"}`,
      `  Colours: ${colors.trim() || "Open to suggestions"}`,
      `  Reference websites: ${refs.trim() || "None provided"}`,
      "",
      "6. ESTIMATED TIMELINE",
      `  ${TIMELINES.find((t) => t.id === timeline)?.label ?? ""}`,
      "",
      "7. BUDGET RANGE",
      `  ${budget}`,
      "",
      "8. ADDITIONAL NOTES",
      `  ${notes.trim() || "None"}`,
      "",
      "This brief is a starting point for discussion and is not a confirmed quotation.",
    ].join("\n");
  };

  const onGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 20) {
      setError("Please describe your business idea in at least 20 characters so the brief is useful.");
      return;
    }
    setError("");
    setBrief(build());
    setCopied(false);
    window.setTimeout(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = brief;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const submit = () => {
    const state: ContactPrefill = {
      service: type.service,
      budget,
      source: "Project Brief Generator",
      message: brief,
    };
    navigate("/contact", { state });
  };

  const waText = `Hello L&R Web Technologies, I created a project brief using your generator:\n\n${clip(brief, 1500)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <form onSubmit={onGenerate} className="card space-y-6 p-5 sm:p-7" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="b-name" className="label">
              Project or business name
            </label>
            <input id="b-name" className="field" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
          </div>
          <div>
            <label htmlFor="b-biz" className="label">
              Business type
            </label>
            <select id="b-biz" className="field" value={business} onChange={(e) => setBusiness(e.target.value)}>
              {BUSINESS_TYPES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="b-idea" className="label">
            Describe your business idea <span className="text-brand">*</span>
          </label>
          <textarea
            id="b-idea"
            rows={5}
            className="field"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxLength={2000}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "b-error" : undefined}
            placeholder="What do you do, who is it for, and what do you want the website to achieve?"
          />
          {error && (
            <p id="b-error" className="mt-1.5 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="b-aud" className="label">
            Target audience
          </label>
          <input id="b-aud" className="field" value={audience} onChange={(e) => setAudience(e.target.value)} maxLength={200} />
        </div>

        <fieldset>
          <legend className="label">Main goals</legend>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <label key={g} className={chipCls}>
                <input type="checkbox" className="sr-only" checked={goals.includes(g)} onChange={() => setGoals(toggle(goals, g))} />
                {g}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="b-type" className="label">
            Website type
          </label>
          <select id="b-type" className="field" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            {WEBSITE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="label">Main features</legend>
          <div className="flex flex-wrap gap-2">
            {FEATURE_CHOICES.map((f) => (
              <label key={f} className={chipCls}>
                <input type="checkbox" className="sr-only" checked={features.includes(f)} onChange={() => setFeatures(toggle(features, f))} />
                {f}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Design preferences</legend>
          <div className="mb-3 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <label key={s} className={chipCls}>
                <input type="checkbox" className="sr-only" checked={styles.includes(s)} onChange={() => setStyles(toggle(styles, s))} />
                {s}
              </label>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="b-colors" className="sr-only">
                Preferred colours
              </label>
              <input id="b-colors" className="field" placeholder="Preferred colours" value={colors} onChange={(e) => setColors(e.target.value)} maxLength={120} />
            </div>
            <div>
              <label htmlFor="b-refs" className="sr-only">
                Reference websites
              </label>
              <input id="b-refs" className="field" placeholder="Websites you like (optional)" value={refs} onChange={(e) => setRefs(e.target.value)} maxLength={200} />
            </div>
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="b-time" className="label">
              Estimated timeline
            </label>
            <select id="b-time" className="field" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
              {TIMELINES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="b-budget" className="label">
              Budget range
            </label>
            <select id="b-budget" className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
              {BUDGETS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="b-notes" className="label">
            Additional notes
          </label>
          <textarea id="b-notes" rows={3} className="field" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1500} />
        </div>

        <Button type="submit" size="lg" fullWidth icon={<Sparkles className="h-5 w-5" />}>
          Generate Project Brief
        </Button>
      </form>

      <div ref={previewRef} className="lg:sticky lg:top-24">
        <div className="card p-5 sm:p-7">
          <div className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
            <FileText className="h-5 w-5 text-brand" aria-hidden="true" /> Brief preview
          </div>
          {brief ? (
            <>
              <pre
                className="max-h-[480px] overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-muted p-4 font-sans text-sm leading-relaxed text-ink"
                tabIndex={0}
                aria-label="Generated project brief"
              >
                {brief}
              </pre>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Button onClick={copy} variant="outline" icon={copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}>
                  {copied ? "Copied!" : "Copy Brief"}
                </Button>
                <Button onClick={submit} icon={<Send className="h-4 w-4" />}>
                  Submit via Contact Form
                </Button>
                <Button href={waLink(waText)} variant="whatsapp" icon={<WhatsAppIcon />} className="sm:col-span-2">
                  Send via WhatsApp
                </Button>
              </div>
              <p className="mt-4 text-xs text-soft" role="status" aria-live="polite">
                {copied ? "Brief copied to your clipboard." : "Your brief stays in your browser until you choose to send it."}
              </p>
            </>
          ) : (
            <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-soft">
              Fill in the form and choose <strong>Generate Project Brief</strong>. A professionally formatted brief will
              appear here, ready to copy or send to us.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
