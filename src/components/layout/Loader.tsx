import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "../ui/Logo";

const KEY = "lr-loaded";

/** A brief branded loading transition, shown once per browser session. */
export default function Loader() {
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
    }, 900);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="scope-dark fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="status"
          aria-label="Loading"
        >
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <LogoMark size={96} />
          </motion.div>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand-light"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
