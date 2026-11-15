import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { CurrencySelector, ThemeSelector } from "./Selectors";
import { NAV_LINKS } from "../../data/site";

const desktopLinks = NAV_LINKS.filter((l) => l.to !== "/contact");

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-brand/15 text-brand" : "text-soft hover:bg-brand/10 hover:text-ink"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent bg-bg/60 backdrop-blur-md"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Main navigation">
        <Logo size={46} />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {desktopLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} className={linkCls}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <ThemeSelector />
            <CurrencySelector />
          </div>
          <Button to="/contact" size="sm" className="hidden sm:inline-flex">
            Contact Us
          </Button>
          <button
            type="button"
            className="rounded-full border border-line p-2.5 text-ink transition hover:border-brand xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-bg xl:hidden"
          >
            <div className="container-x max-h-[calc(100vh-72px)] space-y-4 overflow-y-auto py-4">
              <ul className="grid gap-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-medium ${
                          isActive ? "bg-brand/15 text-brand" : "text-ink hover:bg-brand/10"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 sm:hidden">
                <ThemeSelector align="left" />
                <CurrencySelector align="left" />
              </div>
              <Button to="/contact" fullWidth>
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
