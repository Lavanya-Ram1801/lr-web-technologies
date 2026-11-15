import { motion } from "framer-motion";
import { ArrowRight, Calculator, ClipboardList, Code2, Globe2, MessagesSquare, ShieldCheck, Smartphone, Tags } from "lucide-react";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CtaBand from "../components/ui/CtaBand";
import Testimonials from "../components/ui/Testimonials";
import HeroVisual from "../components/home/HeroVisual";
import ServiceCard from "../components/services/ServiceCard";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import PackageCard from "../components/pricing/PackageCard";
import CurrencyNote from "../components/pricing/CurrencyNote";
import { SERVICES } from "../data/services";
import { PACKAGES } from "../data/pricing";
import { PROCESS_STEPS } from "../data/process";
import { SITE } from "../data/site";
import { useSeo } from "../lib/useSeo";

const WHY = [
  { icon: Tags, title: "Transparent pricing", text: "Clear indicative prices, a cost estimator and written quotations before any work begins." },
  { icon: ClipboardList, title: "A visible process", text: "Twelve clear steps from enquiry to delivery, with milestones and dates agreed up front." },
  { icon: Smartphone, title: "Mobile-first builds", text: "Responsive, fast and accessible layouts that work well on every screen size." },
  { icon: Code2, title: "Modern technology", text: "React, TypeScript, Tailwind CSS, Python (FastAPI) and Node.js for maintainable code." },
  { icon: MessagesSquare, title: "Direct communication", text: "Talk to us on WhatsApp, email or Google Meet, whichever suits you best." },
  { icon: ShieldCheck, title: "Honest scope", text: `${SITE.freeRevisions} free revisions within the agreed scope. No unlimited promises, no surprises.` },
];

export default function Home() {
  useSeo(
    "L&R Web Technologies",
    "L&R Web Technologies builds professional websites, e-commerce stores, custom web applications and AI-powered solutions for clients worldwide."
  );

  return (
    <>
      {/* HERO */}
      <section className="scope-hero hero-bg relative overflow-hidden text-ink">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-light">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" /> {SITE.tagline}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              Building Digital Experiences That Move Your Business <span className="text-gradient">Forward.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
              From professional websites and powerful e-commerce platforms to intelligent AI solutions, we transform
              your ideas into modern digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="hero" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                Start Your Project
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Explore Our Services
              </Button>
              <Button to="/portfolio" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title="Digital solutions built around your goals"
            description="Websites, stores, custom applications and AI solutions, designed and developed with care."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} detailed={false} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/services" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              See All 10 Services
            </Button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* WHY */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose us" title="Why choose L&R Web Technologies" description="A professional, straightforward approach from the first message to final delivery." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={Math.min(i * 0.05, 0.25)}>
                <div className="card h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <w.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card flex h-full flex-col p-8">
              <Calculator className="h-9 w-9 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-bold">Project Cost Estimator</h3>
              <p className="mt-2 flex-1 text-soft">
                Choose your website type, pages, features and timeline to get an indicative price range instantly.
              </p>
              <div className="mt-6">
                <Button to="/estimator">Estimate Your Project Cost</Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col p-8">
              <ClipboardList className="h-9 w-9 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-bold">Project Brief Generator</h3>
              <p className="mt-2 flex-1 text-soft">
                Describe your idea and generate a structured project brief you can copy or send straight to us.
              </p>
              <div className="mt-6">
                <Button to="/project-brief" variant="outline">
                  Generate a Project Brief
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent starting prices"
            description="Indicative starting prices for our three website packages. Every project also receives a custom quotation."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-soft">{SITE.pricingDisclaimer}</p>
          <CurrencyNote className="mx-auto mt-3 max-w-2xl justify-center" />
          <div className="mt-8 text-center">
            <Button to="/pricing" variant="outline">
              Compare Packages & Request a Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Our process" title="From first message to final delivery" description="A clear, step-by-step process so you always know what happens next." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 3, 6, 10].map((idx, n) => {
              const s = PROCESS_STEPS[idx];
              return (
                <Reveal key={s.title} delay={n * 0.06}>
                  <div className="card h-full p-6">
                    <span className="font-display text-sm font-bold text-brand">Step {idx + 1}</span>
                    <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-soft">{s.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Button to="/process" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              See All 12 Steps
            </Button>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
