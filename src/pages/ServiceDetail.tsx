import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import CtaBand from "../components/ui/CtaBand";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import NotFound from "./NotFound";
import { SERVICES, getService } from "../data/services";
import { SITE } from "../data/site";
import { waForService, waLink } from "../lib/whatsapp";
import { useSeo } from "../lib/useSeo";

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card h-full p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = getService(slug);
  useSeo(service ? service.title : "Service not found", service ? service.short : "The requested service could not be found.");

  if (!service) return <NotFound />;
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.overview}>
        <Button
          to="/contact"
          state={{ service: service.title, source: `Service – ${service.title}`, message: `I would like a quote for ${service.title}.` }}
          variant="hero"
        >
          Get a Quote
        </Button>
        <Button href={waLink(waForService(service.title))} variant="outline" icon={<WhatsAppIcon />}>
          Chat on WhatsApp
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
          </Link>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className="h-full">
              <ListCard title="Key features" items={service.features} />
            </Reveal>
            <Reveal delay={0.05} className="h-full">
              <ListCard title="Benefits" items={service.benefits} />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <ListCard title="Suitable for" items={service.suitableFor} />
            </Reveal>
            <Reveal delay={0.15} className="h-full">
              <ListCard title="What you receive" items={service.deliverables} />
            </Reveal>
          </div>

          <Reveal>
            <div className="card mt-10 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark to-brand text-white">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Interested in {service.title}?</h2>
                  <p className="mt-1 text-sm text-soft">
                    Every project gets a written quotation. Includes {SITE.freeRevisions} free revisions within the agreed scope. {SITE.pricingDisclaimer}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/pricing" variant="outline">
                  View Pricing
                </Button>
                <Button to="/estimator">Estimate Your Project Cost</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <h2 className="mb-6 text-2xl font-bold">Other services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card flex items-center gap-3 p-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-brand">
                <s.icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" /> {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
