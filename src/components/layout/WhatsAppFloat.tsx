import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { SITE } from "../../data/site";
import { waGeneral, waLink } from "../../lib/whatsapp";

/** Floating WhatsApp quick-enquiry button shown on every page. */
export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="wa-panel"
            role="dialog"
            aria-label="WhatsApp quick enquiry"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-line bg-bg p-4 shadow-card"
          >
            <p className="font-display text-base font-bold text-ink">Quick enquiry</p>
            <p className="mt-1 text-sm text-soft">Message us on WhatsApp and tell us about your project.</p>
            <div className="mt-4 grid gap-2">
              <a
                href={waLink(waGeneral, "primary")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#053b1c] transition hover:brightness-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>
                  Chat on WhatsApp
                  <span className="block text-xs font-normal opacity-80">
                    {SITE.contacts.primary.name} · {SITE.contacts.primary.display}
                  </span>
                </span>
              </a>
              <a
                href={waLink(waGeneral, "alternative")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                <span>
                  Alternative Contact
                  <span className="block text-xs font-normal text-soft">
                    {SITE.contacts.alternative.name} · {SITE.contacts.alternative.display}
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="wa-panel"
        aria-label={open ? "Close WhatsApp enquiry" : "Open WhatsApp enquiry"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#053b1c] shadow-xl transition hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
