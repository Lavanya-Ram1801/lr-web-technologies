import type { FaqItem } from "../types";
import { SITE } from "./site";

export const FAQS: FaqItem[] = [
  {
    id: "services",
    category: "Services",
    q: "What services do you offer?",
    a: "We offer business, e-commerce, portfolio and landing page websites, custom web applications, AI-powered applications, AI chatbots, UI/UX design, website redesign, and API development and integration. See the Services page for details.",
    keywords: ["service", "offer", "do you do", "build", "what can", "website", "ecommerce", "e-commerce", "chatbot", "ai", "design"],
  },
  {
    id: "pricing",
    category: "Pricing",
    q: "How much does a website cost?",
    a: "Our indicative starting prices are ₹1,499 (Starter), ₹2,999 (Professional) and ₹5,999 (Advanced). These are provisional starting prices; the final quotation depends on your scope and is confirmed after discussion. You can also use the Project Cost Estimator for an indicative figure.",
    keywords: ["price", "pricing", "cost", "how much", "charge", "rate", "quote", "quotation", "package", "budget"],
  },
  {
    id: "extra-costs",
    category: "Pricing",
    q: "What is not included in the price?",
    a: SITE.pricingDisclaimer,
    keywords: ["included", "extra", "additional", "not included", "separate", "third-party", "third party"],
  },
  {
    id: "process",
    category: "Process",
    q: "How does your development process work?",
    a: "We follow twelve steps: enquiry, discussion, requirements, proposal and quotation, confirmation, UI/UX design, development, client review, revisions, testing and deployment, final delivery, and optional maintenance. See the Our Process page for the full timeline.",
    keywords: ["process", "how do you work", "steps", "workflow", "stages", "start", "begin"],
  },
  {
    id: "payment",
    category: "Payment",
    q: "Which payment methods do you accept?",
    a: "We intend to support UPI, Google Pay, PhonePe and bank transfer, and PayPal or another international provider subject to account availability and eligibility. Payments are coordinated manually, and payment milestones are agreed before development begins. We do not publish account details on this website.",
    keywords: ["payment", "pay", "upi", "gpay", "google pay", "phonepe", "paypal", "bank", "transfer", "advance", "milestone"],
  },
  {
    id: "revisions",
    category: "Revisions",
    q: "How many revisions are included?",
    a: `Each project includes ${SITE.freeRevisions} free revisions, subject to the agreed project scope. Work beyond the agreed scope is discussed and quoted separately. We do not offer unlimited revisions.`,
    keywords: ["revision", "revisions", "changes", "edit", "modify", "unlimited", "amend"],
  },
  {
    id: "timeline",
    category: "Timelines",
    q: "How long will my project take?",
    a: "Timelines depend on scope. A simple landing page is usually much quicker than a store or web application. We agree delivery dates with you in the proposal before development begins.",
    keywords: ["time", "timeline", "long", "delivery", "deadline", "days", "weeks", "when", "fast", "urgent"],
  },
  {
    id: "domain-hosting",
    category: "Domain & hosting",
    q: "Is domain and hosting included?",
    a: "No. Domain registration and hosting are paid separately by the client. We can guide you through choosing and setting them up, and help deploy your website.",
    keywords: ["domain", "hosting", "host", "server", "deploy", "deployment", "dns", "ssl"],
  },
  {
    id: "maintenance",
    category: "Maintenance",
    q: "Do you offer website maintenance?",
    a: "Yes, as an optional, separately agreed monthly plan. It can include website updates, bug fixes, content updates, technical support, performance improvements and security updates. Maintenance prices are agreed individually.",
    keywords: ["maintenance", "support", "update", "updates", "bug", "fix", "monthly", "after launch"],
  },
  {
    id: "contact",
    category: "Contact",
    q: "How can I contact you?",
    a: `You can use the Contact page form, email ${SITE.email}, or WhatsApp ${SITE.contacts.primary.display} on ${SITE.contacts.primary.display} (alternative: ${SITE.contacts.alternative.display}, ${SITE.contacts.alternative.display}). We can also arrange a Google Meet call.`,
    keywords: ["contact", "reach", "email", "whatsapp", "phone", "call", "meet", "talk", "instagram", "speak"],
  },
  {
    id: "clients",
    category: "About",
    q: "Are the projects in your portfolio client projects?",
    a: "No. The projects shown in our portfolio are our own in-house demonstration projects, built to show our approach and technical capabilities.",
    keywords: ["portfolio", "projects", "clients", "client", "work", "examples", "demo", "github"],
  },
];

export const SUGGESTED_QUESTIONS = [
  "How much does a website cost?",
  "How many revisions are included?",
  "Is domain and hosting included?",
  "Which payment methods do you accept?",
  "How long will my project take?",
  "How can I contact you?",
];
