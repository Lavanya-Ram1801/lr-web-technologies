import { MessageSquareQuote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../../data/testimonials";

/** Shows genuine testimonials from src/data/testimonials.ts, or an honest empty state. */
export default function Testimonials() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client feedback"
          title="What clients say"
          description="We only publish genuine feedback from real clients."
        />
        {TESTIMONIALS.length === 0 ? (
          <Reveal>
            <div className="card mx-auto flex max-w-2xl flex-col items-center p-8 text-center sm:p-12">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                <MessageSquareQuote className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold">Client testimonials will appear here</h3>
              <p className="mt-3 text-soft">
                Genuine client feedback will be shared here as it becomes available. In the meantime, explore our
                in-house projects to see how we work.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button to="/portfolio" variant="outline">
                  View Our Work
                </Button>
                <Button to="/contact">Start Your Project</Button>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <figure className="card h-full p-6">
                  <blockquote className="text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-soft">
                    <span className="font-semibold text-ink">{t.name}</span>
                    {(t.role || t.company) && <> · {[t.role, t.company].filter(Boolean).join(", ")}</>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
