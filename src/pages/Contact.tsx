import { Instagram, Mail, Video } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import ContactForm from "../components/contact/ContactForm";
import { SITE } from "../data/site";
import { waGeneral, waLink } from "../lib/whatsapp";
import { useSeo } from "../lib/useSeo";

export default function Contact() {
  useSeo("Contact Us", "Contact L&R Web Technologies by form, WhatsApp, email or Google Meet to discuss your website, e-commerce, web app or AI project.");
  const item = "card flex items-start gap-4 p-5 transition hover:border-brand";
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project"
        description="Send us your requirements and we will get back to you using your preferred method: WhatsApp, email or Google Meet."
      />
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4">
              <a href={`mailto:${SITE.email}`} className={item}>
                <Mail className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="block font-bold">Email</span>
                  <span className="break-all text-sm text-soft">{SITE.email}</span>
                </span>
              </a>
              <a href={waLink(waGeneral, "primary")} target="_blank" rel="noopener noreferrer" className={item}>
                <WhatsAppIcon className="mt-1 h-6 w-6 shrink-0 text-[#25D366]" />
                <span>
                  <span className="block font-bold">Chat on WhatsApp</span>
                  <span className="text-sm text-soft">
                    {SITE.contacts.primary.display} · {SITE.contacts.primary.display}
                  </span>
                </span>
              </a>
              <a href={waLink(waGeneral, "alternative")} target="_blank" rel="noopener noreferrer" className={item}>
                <WhatsAppIcon className="mt-1 h-6 w-6 shrink-0 text-[#25D366]" />
                <span>
                  <span className="block font-bold">Alternative Contact</span>
                  <span className="text-sm text-soft">
                    {SITE.contacts.alternative.display} · {SITE.contacts.alternative.display}
                  </span>
                </span>
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={item}>
                <Instagram className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="block font-bold">Instagram</span>
                  <span className="text-sm text-soft">{SITE.instagramHandle}</span>
                </span>
              </a>
              <div className="card flex items-start gap-4 p-5">
                <Video className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="block font-bold">Google Meet</span>
                  <span className="text-sm text-soft">
                    Prefer a video call? Choose “Google Meet” in the form and we will arrange a time with you.
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
