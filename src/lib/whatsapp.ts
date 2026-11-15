import { SITE } from "../data/site";

type Who = "primary" | "alternative";

/** Builds a wa.me link using the international (India, +91) number format. */
export function waLink(message: string, who: Who = "primary"): string {
  const number = SITE.contacts[who].wa;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const waGeneral = `Hello L&R Web Technologies, I would like to discuss a project.`;

export const waForService = (title: string) =>
  `Hello L&R Web Technologies, I am interested in "${title}". I would like a quote. Could we discuss my requirements?`;

export const waForPackage = (name: string, priceLabel: string) =>
  `Hello L&R Web Technologies, I am interested in the ${name} package (indicative starting price ${priceLabel}). Could you share more details?`;
