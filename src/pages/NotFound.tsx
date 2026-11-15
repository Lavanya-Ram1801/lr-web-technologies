import Button from "../components/ui/Button";
import { useSeo } from "../lib/useSeo";

export default function NotFound() {
  useSeo("Page not found", "The page you are looking for could not be found.");
  return (
    <section className="section">
      <div className="container-x text-center">
        <p className="font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-soft">The page you are looking for does not exist or may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to Home</Button>
          <Button to="/services" variant="outline">
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
