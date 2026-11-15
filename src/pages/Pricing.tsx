import { Check, CreditCard, Minus, Video } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import CtaBand from "../components/ui/CtaBand";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import PackageCard from "../components/pricing/PackageCard";
import CurrencyNote from "../components/pricing/CurrencyNote";
import { PACKAGES, MAINTENANCE_PLANS, MAINTENANCE_CAN_INCLUDE } from "../data/pricing";
import { PAYMENT_METHODS, SITE } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { useSeo } from "../lib/useSeo";

type Cell = string | boolean;
const COMPARE: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Best for", values: ["Landing pages & simple sites", "Business sites & portfolios", "Stores, apps & custom features"] },
  { label: "Website size", values: ["Single page / very small", "Multi-page", "Larger, as scoped"] },
  { label: "Responsive design", values: [true, true, true] },
  { label: "Contact / WhatsApp button", values: [true, true, true] },
  { label: "Contact form with email delivery", values: [false, true, true] },
  { label: "SEO", values: ["Basic setup", "On-page + performance", "As scoped"] },
  { label: "Animations & interactions", values: [false, true, "Advanced"] },
  { label: "E-commerce / custom functionality", values: [false, false, "As scoped"] },
  { label: "Back-end / API work", values: [false, false, "As scoped"] },
  { label: "Free revisions", values: [`${SITE.freeRevisions}`, `${SITE.freeRevisions}`, `${SITE.freeRevisions}`] },
];

function CellView({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-brand" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-soft/60" aria-label="Not included" />;
  return <span>{v}</span>;
}

export default function Pricing() {
  useSeo("Pricing", "Transparent indicative website prices from ₹1,499, package comparison, custom quotations, maintenance options and payment information.");
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing, tailored quotations"
        description="Choose a package as your starting point, or request a custom quotation for your exact requirements."
      >
        <Button to="/estimator" variant="hero">
          Estimate Your Project Cost
        </Button>
        <Button to="/contact" variant="outline" state={{ source: "Pricing – Custom quote", message: "I would like to request a custom quote." }}>
          Request a Custom Quote
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3 text-center text-sm text-soft">
            <p className="font-semibold text-ink">{SITE.pricingDisclaimer}</p>
            <p>
              Prices shown are provisional, indicative starting prices. Each package includes {SITE.freeRevisions} free
              revisions, subject to the agreed project scope. We do not offer unlimited work or unlimited revisions.
            </p>
            <CurrencyNote className="justify-center" />
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Compare" title="Package comparison" />
          <Reveal>
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">Comparison of the Starter, Professional and Advanced website packages</caption>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="p-4 font-semibold text-soft">
                      Feature
                    </th>
                    {PACKAGES.map((p) => (
                      <th key={p.id} scope="col" className="p-4 text-center font-display text-base font-bold">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.label} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="p-4 font-medium">
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 text-center text-soft">
                          <CellView v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Custom quotation"
            title="Need something different?"
            description="Many projects do not fit a package exactly. Tell us what you need and we will prepare a custom quotation after discussing your requirements."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/contact" state={{ source: "Pricing – Custom quote", message: "I would like to request a custom quote." }} size="lg">
              Request a Custom Quote
            </Button>
            <Button to="/project-brief" variant="outline" size="lg">
              Generate a Project Brief
            </Button>
            <Button href={waLink("Hello L&R Web Technologies, I would like a custom quotation for my project.")} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
              WhatsApp Enquiry
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="After launch"
            title="One-time development or monthly maintenance"
            description="Choose the model that suits you. Maintenance is optional and agreed separately."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7">
                <h3 className="text-xl font-bold">One-time development</h3>
                <p className="mt-3 text-soft">
                  You receive the completed website according to the agreed project scope, including up to{" "}
                  {SITE.freeRevisions} free revisions within that scope.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card h-full p-7">
                <h3 className="text-xl font-bold">Monthly maintenance</h3>
                <p className="mt-3 text-soft">
                  Optional ongoing support, updates and maintenance through a separately agreed plan. It can include:
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                  {MAINTENANCE_CAN_INCLUDE.map((m) => (
                    <li key={m} className="flex gap-2 text-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {MAINTENANCE_PLANS.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.06}>
                <div className="card flex h-full flex-col p-6">
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm text-soft">{m.description}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {m.includes.map((x) => (
                      <li key={x} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-brand">Price agreed separately</p>
                  <div className="mt-auto pt-4">
                    <Button
                      to="/contact"
                      state={{ service: "Maintenance plan", source: `Maintenance – ${m.name}`, message: `I am interested in the ${m.name} maintenance plan.` }}
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Ask About This Plan
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <CreditCard className="h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-bold">Payment</h3>
              <p className="mt-2 text-sm text-soft">
                Payments are coordinated manually, and payment milestones are agreed before development begins. Payment
                methods we intend to support:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {PAYMENT_METHODS.map((p) => (
                  <li key={p} className="flex gap-2 text-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-soft">
                Account details are shared directly with confirmed clients and are never published on this website.
                Domain and hosting costs are paid separately by the client.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <Video className="h-8 w-8 text-brand" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-bold">Communication</h3>
              <p className="mt-2 text-sm text-soft">
                We work with you through WhatsApp, email and Google Meet, whichever you prefer, from the first
                discussion to final delivery.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button to="/contact" size="sm">
                  Get a Free Consultation
                </Button>
                <Button to="/faq" variant="outline" size="sm">
                  Read the FAQ
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
