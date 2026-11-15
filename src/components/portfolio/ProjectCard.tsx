import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../../types";

export default function ProjectCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-colors hover:border-brand/70"
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          width={1200}
          height={576}
          className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${
            project.imageHover && hover ? "opacity-0" : "opacity-100"
          } group-hover:scale-[1.03]`}
        />
        {project.imageHover && (
          <img
            src={project.imageHover}
            alt={`${project.name} product listing screenshot`}
            loading="lazy"
            width={1200}
            height={576}
            className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${
              hover ? "opacity-100" : "opacity-0"
            } group-hover:scale-[1.03]`}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-brand/40 bg-bg/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-light backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-soft">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-light">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {project.live && (
            <a
              href={project.live.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {project.live.label}
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          )}
          <a
            href={project.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:bg-brand/10"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {project.github.label}
            <span className="sr-only"> for {project.name} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
