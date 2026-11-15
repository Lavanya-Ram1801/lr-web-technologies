import type { Project, ProjectFilter } from "../types";

/** In-house demonstration projects - NOT paid client work. */
export const PROJECTS: Project[] = [
  {
    id: "velvet-bloom",
    name: "Velvet Bloom",
    category: "E-commerce Website",
    filter: "ecommerce",
    description:
      "A modern boutique e-commerce website featuring product browsing, category filtering, search, product details, shopping bag, wishlist, and an interactive checkout demonstration.",
    image: "/images/velvet-bloom-home.webp",
    imageHover: "/images/velvet-bloom-shop.webp",
    imageAlt: "Velvet Bloom e-commerce homepage screenshot",
    tech: ["E-commerce", "Product Filtering", "Search", "Wishlist", "Checkout Demo"],
    github: { label: "View on GitHub", url: "https://github.com/Lavanya-Ram1801/velvet-bloom-ecommerce" },
  },
  {
    id: "lunara-weather",
    name: "Lunara Weather",
    category: "Weather Application",
    filter: "webapps",
    description:
      "A responsive weather application with a clean, modern interface designed to provide users with an attractive and user-friendly weather information experience.",
    image: "/images/lunara.webp",
    imageAlt: "Lunara weather application screenshot",
    tech: ["Responsive UI", "Weather Data", "Web Application"],
    github: { label: "View on GitHub", url: "https://github.com/Lavanya-Ram1801/LUNARA-Weather" },
  },
  {
    id: "k-link-ai",
    name: "K-Link AI",
    category: "AI-Powered Application",
    filter: "ai",
    description:
      "A multilingual workplace intelligence platform designed to help people understand language, communication intent, tone, professionalism, and potential workplace misunderstandings.",
    image: "/images/k-link-ai.webp",
    imageAlt: "K-Link AI platform screenshot",
    tech: ["Python", "FastAPI", "React", "AI Integration"],
    github: { label: "View on GitHub", url: "https://github.com/Lavanya-Ram1801/k-link-ai" },
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    category: "Portfolio Website",
    filter: "portfolio",
    description:
      "A modern developer portfolio showcasing professional skills, technical projects, and development capabilities through an interactive and responsive interface.",
    image: "/images/personal-portfolio.webp",
    imageAlt: "Personal portfolio website screenshot",
    tech: ["Portfolio", "Responsive UI", "Interactive Design"],
    github: { label: "View on GitHub", url: "https://github.com/Lavanya-Ram1801" },
    live: { label: "Live Demo", url: "https://lavanya-portfolio-omega.vercel.app/" },
  },
];

export const PROJECT_FILTERS: { id: "all" | ProjectFilter; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "webapps", label: "Web Applications" },
  { id: "ai", label: "AI Projects" },
  { id: "portfolio", label: "Portfolio Websites" },
];
