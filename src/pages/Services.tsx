import PageHero from "../components/ui/PageHero";
import CtaBand from "../components/ui/CtaBand";
import ServiceCard from "../components/services/ServiceCard";
import Button from "../components/ui/Button";
import { SERVICES } from "../data/services";
import { useSeo } from "../lib/useSeo";

export default function Services() {
  useSeo("Services", "Business websites, e-commerce, portfolios, landing pages, custom web apps, AI applications, chatbots, UI/UX design, redesign and API integration.");
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything you need to build your digital presence"
        description="From a simple landing page to a custom web application with AI features, choose the service that fits your goals."
      >
        <Button to="/estimator" variant="hero">
          Estimate Your Project Cost
        </Button>
        <Button to="/contact" variant="outline">
          Get a Free Consultation
        </Button>
      </PageHero>
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
