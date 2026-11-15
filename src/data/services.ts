import {
  Globe,
  ShoppingCart,
  Briefcase,
  Rocket,
  LayoutDashboard,
  Brain,
  Bot,
  Palette,
  RefreshCw,
  Plug,
} from "lucide-react";
import type { Service } from "../types";

export const SERVICES: Service[] = [
  {
    slug: "business-website",
    title: "Business Website Development",
    icon: Globe,
    short: "Professional, responsive websites that present your business clearly and build trust.",
    overview:
      "A well-structured business website is often the first impression a customer has of you. We design and build fast, responsive, search-friendly websites that explain what you do and make it easy for visitors to contact you.",
    features: [
      "Multi-page, mobile-first layouts",
      "Contact form and WhatsApp enquiry button",
      "Basic on-page SEO setup",
      "Clean, maintainable React code",
    ],
    benefits: [
      "A credible online presence",
      "Easy for customers to reach you",
      "Works smoothly on phones, tablets and desktops",
    ],
    suitableFor: ["Small businesses", "Startups", "Service providers", "Local businesses"],
    deliverables: ["Designed and developed website", "Deployment support", "Handover of source files"],
  },
  {
    slug: "ecommerce-website",
    title: "E-commerce Website Development",
    icon: ShoppingCart,
    short: "Online stores with product browsing, search, cart, wishlist and checkout flows.",
    overview:
      "We build online stores that are easy to browse and easy to buy from. Our own Velvet Bloom demo store shows our approach: category filters, search, product pages, shopping bag, wishlist and an interactive checkout flow.",
    features: [
      "Product catalogue with categories and filters",
      "Search, wishlist and shopping bag",
      "Checkout flow design and development",
      "Payment gateway integration, subject to your gateway account and agreed scope",
    ],
    benefits: ["Sell your products online", "A shopping experience customers find easy", "Room to grow your catalogue"],
    suitableFor: ["Retail businesses", "Boutiques", "Online stores", "Entrepreneurs"],
    deliverables: ["Store front-end", "Product and category structure", "Checkout flow", "Deployment support"],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website Development",
    icon: Briefcase,
    short: "Personal and professional portfolios that showcase your work with a polished look.",
    overview:
      "A portfolio should present your skills and work in the best possible light. We create modern, interactive portfolios for professionals, freelancers and creatives.",
    features: ["Project showcase sections", "Responsive, animated interface", "Contact and social links", "Fast loading pages"],
    benefits: ["Stand out to employers and clients", "Show real work, not just a CV", "Easy to update later"],
    suitableFor: ["Professionals", "Freelancers", "Students", "Creatives"],
    deliverables: ["Custom portfolio design", "Responsive development", "Deployment support"],
  },
  {
    slug: "landing-page",
    title: "Landing Page Development",
    icon: Rocket,
    short: "Focused single-page sites designed to promote an offer and capture enquiries.",
    overview:
      "A landing page has one job: get the visitor to act. We build focused, fast pages with a clear message and a clear call to action.",
    features: ["Single-page conversion-focused layout", "Enquiry form or WhatsApp button", "Fast loading", "Mobile-first design"],
    benefits: ["Quick to launch", "Clear message for one product or offer", "Affordable starting point"],
    suitableFor: ["Startups", "Campaigns and events", "Individual professionals", "New product launches"],
    deliverables: ["Designed landing page", "Responsive development", "Deployment support"],
  },
  {
    slug: "web-applications",
    title: "Custom Web Applications",
    icon: LayoutDashboard,
    short: "Tailor-made web apps and dashboards built around your workflow.",
    overview:
      "When a standard website is not enough, we build custom web applications using React on the front end and Python (FastAPI) or Node.js on the back end, with a suitable database for your needs.",
    features: [
      "React and TypeScript front end",
      "FastAPI or Node.js back end",
      "Database integration",
      "User accounts and dashboards where required",
    ],
    benefits: ["Software shaped around your process", "A foundation that can grow", "Clear, maintainable code"],
    suitableFor: ["Startups", "Small businesses with custom needs", "Entrepreneurs validating an idea"],
    deliverables: ["Working web application", "API and database setup", "Deployment support"],
  },
  {
    slug: "ai-applications",
    title: "AI-Powered Applications",
    icon: Brain,
    short: "Applications that use AI to analyse text, assist users or automate tasks.",
    overview:
      "We build applications that integrate AI capabilities. Our K-Link AI project, a workplace communication intelligence platform built with Python, FastAPI and React, demonstrates this work. AI provider usage costs are paid separately by the client.",
    features: [
      "AI integration through provider APIs",
      "Python and FastAPI back end",
      "React interface",
      "Clear handling of API keys and secrets",
    ],
    benefits: ["Add intelligent features to your product", "Automate repetitive tasks", "Prototype AI ideas quickly"],
    suitableFor: ["Startups", "Product teams", "Entrepreneurs exploring AI ideas"],
    deliverables: ["Working AI-enabled application", "Documentation of setup", "Deployment support"],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    icon: Bot,
    short: "Chatbots for your website that answer common questions and guide visitors.",
    overview:
      "From simple FAQ assistants to chatbots connected to an AI provider, we build chat experiences that help your visitors find answers and reach you. Third-party AI usage fees are billed to the client.",
    features: ["Predefined FAQ assistants (no paid API needed)", "AI-provider-backed chatbots on request", "Clear hand-off to human contact", "Branded chat interface"],
    benefits: ["Answer common questions instantly", "Guide visitors to the right page", "Reduce repetitive enquiries"],
    suitableFor: ["Businesses with frequent questions", "Online stores", "Service providers"],
    deliverables: ["Chatbot interface", "Question and answer setup", "Website integration"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: Palette,
    short: "Thoughtful interface design that is attractive, clear and easy to use.",
    overview:
      "Good design is about clarity as much as looks. We plan page structure, visual style and user flows so your product feels natural to use on any screen.",
    features: ["Layout and user-flow planning", "Visual style and colour system", "Responsive screen designs", "Design reviewed with you before development"],
    benefits: ["A consistent, professional look", "Easier navigation for visitors", "Fewer changes during development"],
    suitableFor: ["Startups", "Businesses planning a new site or app", "Individuals who want a distinctive look"],
    deliverables: ["Design direction", "Key screen designs", "Review and feedback round"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    icon: RefreshCw,
    short: "Modernise an outdated website with a fresh design and better performance.",
    overview:
      "If your current website looks dated, loads slowly or is hard to use on mobile, we can redesign and rebuild it while keeping the content and goals that matter.",
    features: ["Review of your current website", "Modern, responsive redesign", "Performance and usability improvements", "Content carried over where suitable"],
    benefits: ["A fresher brand impression", "Better mobile experience", "Faster pages"],
    suitableFor: ["Existing businesses", "Online stores", "Professionals with older sites"],
    deliverables: ["Redesigned website", "Deployment support"],
  },
  {
    slug: "api-integration",
    title: "API Development and Integration",
    icon: Plug,
    short: "Build custom APIs or connect your website to third-party services.",
    overview:
      "We build REST APIs with Python (FastAPI) or Node.js and integrate third-party services into your website or application, with secrets kept safely on the server.",
    features: ["REST API development", "Third-party service integration", "Server-side handling of API keys", "Clear API documentation"],
    benefits: ["Connect your tools together", "Keep credentials secure", "A solid base for future features"],
    suitableFor: ["Businesses with existing systems", "Startups building products", "Web application projects"],
    deliverables: ["Working API or integration", "API documentation", "Deployment support"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
