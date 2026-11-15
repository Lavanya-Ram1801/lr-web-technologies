import type { CurrencyCode } from "../types";

/**
 * Central, editable business information.
 * Change values here and they update across the whole website.
 */
export const SITE = {
  name: "L&R Web Technologies",
  shortName: "L&R",
  tagline: "Your Vision. Our Creation.",
  description:
    "L&R Web Technologies helps businesses, startups, and individuals transform their ideas into modern digital experiences.",
  email: "lrwebtechnologies@gmail.com",
  instagramHandle: "@lrweb_technologies",
  instagramUrl: "https://www.instagram.com/lrweb_technologies/",
  contacts: {
    primary: {  wa: "917845201409", display: "+91 78452 01409" },
    alternative: { wa: "919043062799", display: "+91 90430 62799" },
  },
  freeRevisions: 3,
  pricingDisclaimer:
    "Domain registration, hosting, paid third-party services, and applicable additional costs are charged separately.",
} as const;

export interface CurrencyInfo {
  code: CurrencyCode;
  label: string;
  symbol: string;
  locale: string;
  /**
   * Approximate units of this currency per 1 INR.
   * These are manual fallback values - update them occasionally.
   * The site also tries a free exchange-rate endpoint (no API key) and
   * always labels converted prices as approximate.
   */
  perInr: number;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "INR", label: "INR – Indian Rupee", symbol: "₹", locale: "en-IN", perInr: 1 },
  { code: "USD", label: "USD – US Dollar", symbol: "$", locale: "en-US", perInr: 0.0113 },
  { code: "EUR", label: "EUR – Euro", symbol: "€", locale: "de-DE", perInr: 0.0097 },
  { code: "GBP", label: "GBP – British Pound", symbol: "£", locale: "en-GB", perInr: 0.0086 },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/process", label: "Our Process" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact Us" },
] as const;

export const PAYMENT_METHODS = [
  "UPI",
  "Google Pay",
  "PhonePe",
  "Bank Transfer",
  "PayPal (or another international provider, subject to account availability and eligibility)",
];
