import PortfolioGallery from "./PortfolioGallery";
import SectionHeading from "../ui/SectionHeading";

/** Dark "Our Own Projects" section, reused on the home page and the portfolio page. */
export default function PortfolioSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="scope-dark relative overflow-hidden bg-bg py-16 text-ink sm:py-20 lg:py-24" id="our-projects">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        {withHeading && (
          <SectionHeading
            badge="IN-HOUSE PROJECTS"
            title="Our Own Projects"
            description="Explore our independently developed projects. Each project demonstrates our creativity, technical capabilities, and approach to building modern digital solutions."
          />
        )}
        <PortfolioGallery />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-soft">
          These are our own demonstration and development projects, not paid client projects.
        </p>
      </div>
    </section>
  );
}
