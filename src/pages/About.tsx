import { Compass, Layers, Lightbulb, MessagesSquare, Palette, ShieldCheck, Target, Wrench } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import CtaBand from "../components/ui/CtaBand";
import Button from "../components/ui/Button";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site";
import { useSeo } from "../lib/useSeo";

const CAPABILITIES = [
  "React & TypeScript front ends",
  "Tailwind CSS & responsive design",
  "Python (FastAPI) back ends",
  "Node.js services",
  "Database integration",
  "AI integration through provider APIs",
  "UI/UX design",
  "API development and integration",
];

const WHY = [
  { icon: Lightbulb, title: "Requirement-first", text: "We start by understanding what you need and why, before writing any code." },
  { icon: Palette, title: "Thoughtful design", text: "Clean, modern interfaces that make your brand look professional." },
  { icon: Wrench, title: "Reliable development", text: "Maintainable code, tested on real devices and screen sizes." },
  { icon: MessagesSquare, title: "Clear communication", text: "WhatsApp, email or Google Meet, with agreed milestones and dates." },
  { icon: ShieldCheck, title: "Honest and transparent", text: "Clear scope, clear pricing and no unrealistic promises." },
  { icon: Layers, title: "Room to grow", text: "Optional maintenance and a foundation that can grow with your business." },
];

export default function About() {
  useSeo("About Us", "Learn about L&R Web Technologies: who we are, what we do, our capabilities, our approach and why clients choose us.");
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A technology and digital development company"
        description="L&R Web Technologies helps businesses, startups, and individuals transform their ideas into modern digital experiences. We create professional websites, e-commerce platforms, custom web applications, and AI-powered solutions designed to solve real-world problems."
      />

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <h2 className="text-2xl font-bold">Who We Are</h2>
              <p className="mt-4 leading-relaxed text-soft">
                {SITE.name} is a professional technology and digital development company serving startups, small
                businesses, entrepreneurs, retailers, professionals and individuals around the world. We work as one
                brand, focused on turning ideas into dependable, good-looking digital products.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-8">
              <h2 className="text-2xl font-bold">What We Do</h2>
              <ul className="mt-4 grid gap-2 text-soft sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug} className="flex gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Our capabilities" title="The technology behind our work" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c} delay={Math.min(i * 0.04, 0.25)}>
                <div className="card flex h-full items-center gap-3 p-4 text-sm font-medium">
                  <Wrench className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {c}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="scope-hero hero-bg h-full rounded-3xl p-8 text-ink sm:p-10">
              <Target className="h-9 w-9 text-brand-light" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
              <p className="mt-3 text-lg leading-relaxed text-soft">
                To help businesses establish a powerful digital presence through innovative, accessible, and reliable
                technology solutions.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-8 sm:p-10">
              <Compass className="h-9 w-9 text-brand" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold">Our Approach</h2>
              <p className="mt-3 leading-relaxed text-soft">
                We believe every business deserves a digital solution that reflects its vision. We focus on
                understanding client requirements, creating thoughtful designs, developing functional products, and
                delivering reliable digital experiences.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose us" title="Why choose L&R Web Technologies" />
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
          <div className="mt-10 text-center">
            <Button to="/portfolio" variant="outline">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
