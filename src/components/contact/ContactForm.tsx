import { useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Button from "../ui/Button";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { SERVICES } from "../../data/services";
import { PACKAGES } from "../../data/pricing";
import { BUDGETS } from "../../data/estimator";
import { submitEnquiry } from "../../lib/api";
import { waGeneral, waLink } from "../../lib/whatsapp";
import type { ContactPrefill } from "../../types";

const METHODS = ["WhatsApp", "Email", "Google Meet"] as const;
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), ...PACKAGES.map((p) => p.name), "Maintenance plan", "Not sure yet / Other"];

interface FormState {
  fullName: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  contactMethod: string;
  consent: boolean;
  website: string; // honeypot
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  const digits = f.whatsapp.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(f.whatsapp.trim()) || digits.length < 8 || digits.length > 15)
    e.whatsapp = "Please enter a valid WhatsApp number, including the country code if outside India.";
  if (!f.service) e.service = "Please choose the service you need.";
  if (f.description.trim().length < 20) e.description = "Please describe your project in at least 20 characters.";
  if (!f.consent) e.consent = "Please accept the privacy consent so we can respond to your enquiry.";
  return e;
}

export default function ContactForm() {
  const location = useLocation();
  const prefill = (location.state ?? null) as ContactPrefill | null;
  const openedAt = useRef(Date.now());

  const initial = useMemo<FormState>(
    () => ({
      fullName: "",
      email: "",
      whatsapp: "",
      company: "",
      service: prefill?.service && SERVICE_OPTIONS.includes(prefill.service) ? prefill.service : "",
      description: prefill?.message ?? "",
      budget: prefill?.budget && BUDGETS.includes(prefill.budget) ? prefill.budget : "",
      contactMethod: "WhatsApp",
      consent: false,
      website: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    const result = await submitEnquiry({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      company: form.company.trim(),
      service: form.service,
      description: form.description.trim(),
      budget: form.budget,
      contactMethod: form.contactMethod,
      consent: form.consent,
      website: form.website,
      elapsedMs: Date.now() - openedAt.current,
    });
    if (result.ok) {
      setStatus("success");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ ...initial, service: "", description: "", budget: "", consent: false });
    setErrors({});
    setStatus("idle");
    openedAt.current = Date.now();
  };

  if (status === "success") {
    return (
      <div className="card p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Thank you – your enquiry has been sent</h3>
        <p className="mx-auto mt-3 max-w-md text-soft">
          Our team has received your message and will respond using your preferred method ({form.contactMethod}).
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="outline">
            Send another enquiry
          </Button>
          <Button to="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const err = (k: keyof FormState) => (errors[k] ? `c-${k}-err` : undefined);
  const FieldError = ({ k }: { k: keyof FormState }) =>
    errors[k] ? (
      <p id={`c-${k}-err`} className="mt-1.5 text-sm text-red-500" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-5 sm:p-8" aria-label="Contact form">
      {prefill?.source && (
        <p className="rounded-xl bg-brand/10 px-4 py-2.5 text-sm text-ink">
          Pre-filled from: <strong>{prefill.source}</strong>. You can edit anything before sending.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-fullName" className="label">
            Full Name <span className="text-brand">*</span>
          </label>
          <input id="c-fullName" className="field" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={100} aria-invalid={Boolean(errors.fullName)} aria-describedby={err("fullName")} />
          <FieldError k="fullName" />
        </div>
        <div>
          <label htmlFor="c-email" className="label">
            Email Address <span className="text-brand">*</span>
          </label>
          <input id="c-email" type="email" className="field" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={150} aria-invalid={Boolean(errors.email)} aria-describedby={err("email")} />
          <FieldError k="email" />
        </div>
        <div>
          <label htmlFor="c-whatsapp" className="label">
            WhatsApp Number <span className="text-brand">*</span>
          </label>
          <input id="c-whatsapp" type="tel" className="field" autoComplete="tel" placeholder="+91 98765 43210" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} maxLength={25} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={err("whatsapp")} />
          <FieldError k="whatsapp" />
        </div>
        <div>
          <label htmlFor="c-company" className="label">
            Company / Business Name
          </label>
          <input id="c-company" className="field" autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={120} />
        </div>
        <div>
          <label htmlFor="c-service" className="label">
            Service Required <span className="text-brand">*</span>
          </label>
          <select id="c-service" className="field" value={form.service} onChange={(e) => set("service", e.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={err("service")}>
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <FieldError k="service" />
        </div>
        <div>
          <label htmlFor="c-budget" className="label">
            Estimated Budget
          </label>
          <select id="c-budget" className="field" value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Select a budget range…</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="c-description" className="label">
          Project Description <span className="text-brand">*</span>
        </label>
        <textarea id="c-description" rows={7} className="field" value={form.description} onChange={(e) => set("description", e.target.value)} maxLength={4000} aria-invalid={Boolean(errors.description)} aria-describedby={err("description")} />
        <FieldError k="description" />
      </div>

      <fieldset>
        <legend className="label">Preferred Communication Method</legend>
        <div className="flex flex-wrap gap-2">
          {METHODS.map((m) => (
            <label
              key={m}
              className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition hover:border-brand/60 has-[:checked]:border-brand has-[:checked]:bg-brand/15 has-[:checked]:font-semibold has-[:checked]:text-brand has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40"
            >
              <input type="radio" name="contactMethod" value={m} className="sr-only" checked={form.contactMethod === m} onChange={() => set("contactMethod", m)} />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Leave this field empty</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            id="c-consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[rgb(var(--c-brand))]"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={err("consent")}
          />
          <span className="text-soft">
            I agree that L&amp;R Web Technologies may use the information I provide to respond to my enquiry, as
            described in the{" "}
            <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            . <span className="text-brand">*</span>
          </span>
        </label>
        <FieldError k="consent" />
      </div>

      {status === "error" && (
        <div className="flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
          <div>
            <p className="font-semibold text-ink">We could not send your enquiry.</p>
            <p className="mt-1 text-soft">{serverError}</p>
            <p className="mt-2 text-soft">You can try again, or reach us directly on WhatsApp or by email.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          icon={status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        >
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </Button>
        <Button href={waLink(waGeneral)} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
          Chat on WhatsApp instead
        </Button>
      </div>
    </form>
  );
}
