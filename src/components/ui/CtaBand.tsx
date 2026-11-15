import Button from "./Button";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { waGeneral, waLink } from "../../lib/whatsapp";

interface Props {
  title?: string;
  description?: string;
}

export default function CtaBand({
  title = "Ready to start your project?",
  description = "Tell us about your idea. We will discuss your requirements and send a clear proposal and quotation.",
}: Props) {
  return (
    <section className="scope-dark relative overflow-hidden bg-bg py-16 text-ink sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(139_92_246/0.35),transparent)]"
        aria-hidden="true"
      />
      <Reveal className="container-x relative text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-soft">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/contact" variant="hero" size="lg">
            Get a Free Consultation
          </Button>
          <Button to="/estimator" variant="outline" size="lg">
            Estimate Your Project Cost
          </Button>
          <Button href={waLink(waGeneral)} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
            Chat on WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
