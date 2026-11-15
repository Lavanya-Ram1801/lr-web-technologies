import type { MaintenancePlan, PricePackage } from "../types";

/**
 * EDITABLE PACKAGES.
 * These prices are provisional "indicative starting prices" in INR and are
 * not final confirmed prices. Edit them here when you are ready.
 */
export const PACKAGES: PricePackage[] = [
  {
    id: "starter",
    name: "Starter Website",
    priceInr: 1499,
    tagline: "A simple, professional online presence.",
    suitableFor: ["Personal websites", "Basic business websites", "Simple landing pages"],
    features: [
      "Single-page or very small site",
      "Responsive design",
      "Contact / WhatsApp enquiry button",
      "Basic SEO setup",
      "3 free revisions within agreed scope",
    ],
  },
  {
    id: "professional",
    name: "Professional Website",
    priceInr: 2999,
    tagline: "A complete multi-page website for your business.",
    suitableFor: ["Business websites", "Multi-page websites", "Professional portfolios"],
    features: [
      "Multi-page website",
      "Custom design direction",
      "Contact form with email delivery",
      "On-page SEO and performance tuning",
      "Scroll animations and polished interactions",
      "3 free revisions within agreed scope",
    ],
    highlighted: true,
  },
  {
    id: "advanced",
    name: "Advanced Website",
    priceInr: 5999,
    tagline: "For larger sites, stores and custom functionality.",
    suitableFor: ["Advanced business websites", "E-commerce websites", "Custom functionality", "Web applications"],
    features: [
      "Everything in Professional",
      "E-commerce or custom features, as scoped",
      "Back-end / API work where required",
      "Advanced interactions",
      "Detailed scope agreed before development",
      "3 free revisions within agreed scope",
    ],
  },
];

/** EDITABLE maintenance packages. No prices are published - agreed separately. */
export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: "basic-care",
    name: "Basic Care",
    description: "Light-touch support to keep your website running smoothly.",
    includes: ["Bug fixes", "Minor content updates", "Technical support by message"],
  },
  {
    id: "standard-care",
    name: "Standard Care",
    description: "Regular updates and improvements for an active website.",
    includes: ["Everything in Basic Care", "Regular website updates", "Performance improvements", "Security updates"],
  },
  {
    id: "priority-care",
    name: "Priority Care",
    description: "Closer support for business-critical websites and applications.",
    includes: ["Everything in Standard Care", "Priority technical support", "Larger content and feature updates", "Monthly review"],
  },
];

export const MAINTENANCE_CAN_INCLUDE = [
  "Website updates",
  "Bug fixes",
  "Content updates",
  "Technical support",
  "Performance improvements",
  "Security updates",
];
