import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import Loader from "./Loader";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
  return null;
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-[70vh]"
      >
        {children}
      </motion.main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
