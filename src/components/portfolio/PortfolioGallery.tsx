import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { PROJECTS, PROJECT_FILTERS } from "../../data/projects";
import type { ProjectFilter } from "../../types";

/** Filterable gallery of in-house projects. Render inside a `.scope-dark` section. */
export default function PortfolioGallery() {
  const [filter, setFilter] = useState<"all" | ProjectFilter>("all");
  const visible = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter)), [filter]);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
        {PROJECT_FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                active
                  ? "border-transparent bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] text-white shadow-glow"
                  : "border-line text-soft hover:border-brand hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-8 md:grid-cols-2" aria-live="polite">
        <AnimatePresence initial={false}>
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
