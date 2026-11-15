import { ArrowRight, Check } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import type { Service } from "../../types";
import { waForService, waLink } from "../../lib/whatsapp";

interface Props {
  service: Service;
  index?: number;
  /** Show benefits and suitable-for lists (full card) or only features (compact). */
  detailed?: boolean;
}

export default function ServiceCard({ service, index = 0, detailed = true }: Props) {
  const Icon = service.icon;
  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)} className="h-full">
      <article className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/60">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark to-brand text-white shadow-glow">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-soft">{service.short}</p>

        <div className="mt-5">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Key features</h4>
          <ul className="space-y-1.5">
            {service.features.slice(0, detailed ? 4 : 3).map((f) => (
              <li key={f} className="flex gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {detailed && (
          <>
            <div className="mt-5">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Benefits</h4>
              <p className="text-sm text-soft">{service.benefits.join(" · ")}</p>
            </div>
            <div className="mt-5">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">Suitable for</h4>
              <div className="flex flex-wrap gap-1.5">
                {service.suitableFor.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Button to={`/services/${service.slug}`} variant="outline" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
            Learn More
          </Button>
          <Button
            href={waLink(waForService(service.title))}
            size="sm"
            ariaLabel={`Get a quote for ${service.title} on WhatsApp`}
          >
            Get a Quote
          </Button>
        </div>
      </article>
    </Reveal>
  );
}
