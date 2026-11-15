import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Purple header band used at the top of every inner page. */
export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="scope-hero hero-bg relative overflow-hidden text-ink">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-light">{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-soft">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
