import PageHero from "../components/ui/PageHero";
import BriefGenerator from "../components/tools/BriefGenerator";
import { useSeo } from "../lib/useSeo";

export default function ProjectBrief() {
  useSeo("Project Brief Generator", "Describe your business idea and generate a professional project brief to copy or send to L&R Web Technologies by contact form or WhatsApp.");
  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title="Project Brief Generator"
        description="Describe your idea and choose your requirements. We will format them into a clear, professional project brief."
      />
      <section className="section">
        <div className="container-x">
          <BriefGenerator />
        </div>
      </section>
    </>
  );
}
