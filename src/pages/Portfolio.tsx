import PageHero from "../components/ui/PageHero";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import CtaBand from "../components/ui/CtaBand";
import Button from "../components/ui/Button";
import { useSeo } from "../lib/useSeo";

export default function Portfolio() {
  useSeo("Portfolio", "Explore L&R Web Technologies' in-house projects: Velvet Bloom e-commerce, Lunara Weather, K-Link AI and a developer portfolio.");
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our work"
        description="Our independently developed projects show how we design and build modern digital solutions."
      >
        <Button to="/contact" variant="hero">
          Start Your Project
        </Button>
      </PageHero>
      <PortfolioSection />
      <CtaBand title="Want something like this for your business?" />
    </>
  );
}
