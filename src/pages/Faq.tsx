import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CtaBand from "../components/ui/CtaBand";
import FaqAssistant from "../components/faq/FaqAssistant";
import { FAQS } from "../data/faq";
import { useSeo } from "../lib/useSeo";

export default function Faq() {
  useSeo("FAQ", "Answers to common questions about L&R Web Technologies' services, pricing, process, payments, revisions, timelines, hosting and maintenance.");
  const [open, setOpen] = useState<string | null>(FAQS[0].id);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Quick answers about our services, pricing and process. Ask our automated assistant or browse the list."
      />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <FaqAssistant />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-3">
              {FAQS.map((f) => {
                const isOpen = open === f.id;
                return (
                  <div key={f.id} className="card overflow-hidden">
                    <h2>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-${f.id}`}
                        onClick={() => setOpen(isOpen ? null : f.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                      >
                        <span>
                          <span className="block text-xs font-bold uppercase tracking-widest text-brand">{f.category}</span>
                          {f.q}
                        </span>
                        <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </h2>
                    {isOpen && (
                      <div id={`faq-${f.id}`} className="border-t border-line px-5 py-4 text-sm leading-relaxed text-soft">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand title="Still have a question?" description="Send us a message and we will be happy to help." />
    </>
  );
}
