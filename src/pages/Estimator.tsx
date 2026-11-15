import PageHero from "../components/ui/PageHero";
import CostEstimator from "../components/tools/CostEstimator";
import { useSeo } from "../lib/useSeo";

export default function Estimator() {
  useSeo("Project Cost Estimator", "Get an indicative price range for your website, e-commerce store, web app or AI project with the L&R Web Technologies cost estimator.");
  return (
    <>
      <PageHero
        eyebrow="Free tool"
        title="Project Cost Estimator"
        description="Select your requirements to see an indicative price range. It is a guide only; your final quotation depends on project complexity and a discussion with us."
      />
      <section className="section">
        <div className="container-x">
          <CostEstimator />
        </div>
      </section>
    </>
  );
}
