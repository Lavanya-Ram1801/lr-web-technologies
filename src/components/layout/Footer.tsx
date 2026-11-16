import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import Logo from "../ui/Logo";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { SITE, NAV_LINKS } from "../../data/site";
import { SERVICES } from "../../data/services";
import { waGeneral, waLink } from "../../lib/whatsapp";

const linkCls = "text-sm text-soft transition hover:text-ink";

export default function Footer() {
  return (
    <footer className="scope-dark border-t border-line bg-bg text-ink">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo size={56} to="/" />
          <p className="mt-4 font-display text-lg font-bold text-gradient">{SITE.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-soft">
            {SITE.description} We create professional websites, e-commerce platforms, custom web applications, and
            AI-powered solutions.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-light">Navigation</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/estimator" className={linkCls}>
                Cost Estimator
              </Link>
            </li>
            <li>
              <Link to="/project-brief" className={linkCls}>
                Project Brief Generator
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-light">Services</h3>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className={`${linkCls} font-semibold text-brand-light`}>
                All services →
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className={linkCls}>
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-light">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className={`${linkCls} flex items-center gap-2`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={waLink(waGeneral, "primary")}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-center gap-2`}
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" /> {SITE.contacts.primary.display}: {SITE.contacts.primary.display}
              </a>
            </li>
            <li>
              <a
                href={waLink(waGeneral, "alternative")}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-center gap-2`}
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" /> {SITE.contacts.alternative.display}:{" "}
                {SITE.contacts.alternative.display}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} flex items-center gap-2`}
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" /> {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-soft sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-ink">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
