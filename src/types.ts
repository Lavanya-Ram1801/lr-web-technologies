import type { LucideIcon } from "lucide-react";

export type ThemeId = "purple" | "dark" | "minimal";
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  short: string;
  overview: string;
  features: string[];
  benefits: string[];
  suitableFor: string[];
  deliverables: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  filter: ProjectFilter;
  description: string;
  image: string;
  imageHover?: string;
  imageAlt: string;
  tech: string[];
  github: { label: string; url: string };
  live?: { label: string; url: string };
}

export type ProjectFilter = "ecommerce" | "webapps" | "ai" | "portfolio";

export interface PricePackage {
  id: string;
  name: string;
  /** Indicative starting price in INR. Edit in src/data/pricing.ts. */
  priceInr: number;
  tagline: string;
  suitableFor: string[];
  features: string[];
  highlighted?: boolean;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  description: string;
  includes: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FaqItem {
  id: string;
  category: string;
  q: string;
  a: string;
  keywords: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
}

/** State passed to /contact so the form can be pre-filled from other tools. */
export interface ContactPrefill {
  service?: string;
  budget?: string;
  message?: string;
  source?: string;
}
