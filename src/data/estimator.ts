/** Pricing rules for the Project Cost Estimator (all amounts in INR). Edit freely. */

export interface Option {
  id: string;
  label: string;
  price: number;
  hint?: string;
}

export const BUSINESS_TYPES = [
  "Startup",
  "Small business",
  "Retail / online store",
  "Professional / freelancer",
  "Education / non-profit",
  "Individual / personal",
  "Other",
];

export interface WebsiteTypeOption extends Option {
  includedPages: number;
  service: string;
}

export const WEBSITE_TYPES: WebsiteTypeOption[] = [
  { id: "landing", label: "Landing page", price: 1499, includedPages: 1, service: "Landing Page Development", hint: "One focused page" },
  { id: "portfolio", label: "Portfolio website", price: 1499, includedPages: 3, service: "Portfolio Website Development", hint: "Showcase your work" },
  { id: "business", label: "Business website", price: 2999, includedPages: 5, service: "Business Website Development", hint: "Multi-page company site" },
  { id: "ecommerce", label: "E-commerce store", price: 5999, includedPages: 8, service: "E-commerce Website Development", hint: "Sell products online" },
  { id: "webapp", label: "Web application", price: 5999, includedPages: 5, service: "Custom Web Applications", hint: "Custom software" },
  { id: "redesign", label: "Website redesign", price: 1999, includedPages: 5, service: "Website Redesign", hint: "Refresh an existing site" },
];

export const EXTRA_PAGE_PRICE = 100;
export const MAX_PAGES = 30;

export const DESIGN_OPTIONS: Option[] = [
  { id: "template", label: "Clean & simple", price: 0, hint: "Tidy modern layout" },
  { id: "custom", label: "Custom design", price: 300, hint: "Tailored look and feel" },
  { id: "premium", label: "Premium design", price: 800, hint: "Rich animations & visuals" },
];

export const FEATURES: Option[] = [
  { id: "contact", label: "Contact form with email delivery", price: 150 },
  { id: "seo", label: "SEO setup", price: 300 },
  { id: "animations", label: "Scroll animations", price: 250 },
  { id: "blog", label: "Blog / news section", price: 500 },
  { id: "auth", label: "User login / accounts", price: 900 },
  { id: "admin", label: "Admin dashboard", price: 1200 },
  { id: "booking", label: "Booking / appointments", price: 900 },
  { id: "analytics", label: "Analytics setup", price: 150 },
  { id: "newsletter", label: "Newsletter sign-up", price: 200 },
];

export const ECOMMERCE_PRODUCTS: Option[] = [
  { id: "p20", label: "Up to 20 products", price: 0 },
  { id: "p100", label: "21 – 100 products", price: 500 },
  { id: "p100plus", label: "100+ products", price: 1000 },
];

export const ECOMMERCE_FEATURES: Option[] = [
  { id: "gateway", label: "Payment gateway integration", price: 700 },
  { id: "orders", label: "Order management", price: 900 },
  { id: "inventory", label: "Inventory tracking", price: 500 },
  { id: "coupons", label: "Coupons & discounts", price: 300 },
  { id: "wishlist", label: "Wishlist & reviews area", price: 250 },
];

export const AI_OPTIONS: Option[] = [
  { id: "none", label: "No AI features", price: 0 },
  { id: "faq-bot", label: "FAQ chatbot (predefined answers)", price: 600 },
  { id: "ai-bot", label: "AI chatbot (provider API)", price: 1500, hint: "AI usage fees paid separately" },
  { id: "ai-feature", label: "AI-powered feature", price: 2000, hint: "AI usage fees paid separately" },
  { id: "ai-custom", label: "Custom AI workflow", price: 3500, hint: "Scoped after discussion" },
];

export const ADDITIONAL: Option[] = [
  { id: "content", label: "Content writing help", price: 300 },
  { id: "branding", label: "Logo / branding help", price: 500 },
  { id: "api", label: "Third-party API integration", price: 500 },
  { id: "handover", label: "Handover walkthrough session", price: 200 },
];

export const BUDGETS = [
  "Under ₹2,000",
  "₹2,000 – ₹4,000",
  "₹4,000 – ₹8,000",
  "₹8,000 – ₹15,000",
  "₹15,000+",
  "Not sure yet",
];

export interface TimelineOption {
  id: string;
  label: string;
  multiplier: number;
}

export const TIMELINES: TimelineOption[] = [
  { id: "flexible", label: "Flexible (4+ weeks)", multiplier: 1 },
  { id: "standard", label: "Standard (2–4 weeks)", multiplier: 1 },
  { id: "urgent", label: "Urgent (under 2 weeks)", multiplier: 1.1 },
];

/** Range shown around the calculated figure to stress that it is indicative. */
export const RANGE_LOW = 0.95;
export const RANGE_HIGH = 1.1;
