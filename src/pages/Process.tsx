import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CtaBand from "../components/ui/CtaBand";
import Button from "../components/ui/Button";
import { PROCESS_STEPS } from "../data/process";
import { SITE } from "../data/site";
import { useSeo } from "../lib/useSeo";

export default function Process() {
  useSeo("Our Process", "Our 12-step development process, from enquiry and quotation to design, development, revisions, deployment and optional maintenance.");
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="A clear path from idea to launch"
        description="Twelve simple steps so you always know where your project stands and what happens next."
      >
        <Button to="/contact" variant="hero">
          Start Your Project
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x max-w-4xl">
          <ol className="relative space-y-6 before:absolute before:left-6 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line sm:before:left-1/2">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              const left = i % 2 === 0;
              return (
                <li key={step.title} className="relative">
                  <Reveal>
                    <div className={`flex items-start gap-5 sm:w-1/2 ${left ? "sm:pr-10" : "sm:ml-auto sm:pl-10"}`}>
                      <span
                        className={`absolute left-6 top-4 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-dark to-brand font-display font-bold text-white shadow-glow sm:left-1/2`}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div className="card ml-14 w-full p-5 sm:ml-0">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                          <h2 className="text-lg font-bold">
                            <span className="sr-only">Step {i + 1}: </span>
                            {step.title}
                          </h2>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-soft">{step.description}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <h2 className="text-xl font-bold">Payment milestones and delivery dates</h2>
              <p className="mt-3 text-soft">
                Before development begins, we agree payment milestones and delivery dates with you in writing as part
                of the proposal. Payments are coordinated manually, so you always know what is due and when.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <h2 className="text-xl font-bold">{SITE.freeRevisions} free revisions, within the agreed scope</h2>
              <p className="mt-3 text-soft">
                After your review, we apply up to {SITE.freeRevisions} free revisions to the work described in the
                agreed project scope. Changes that add new pages, features or functionality beyond that scope are
                discussed and quoted separately. We do not offer unlimited revisions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
