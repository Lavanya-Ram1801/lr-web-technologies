import {
  MessageSquare,
  Users,
  ClipboardList,
  FileText,
  Handshake,
  Palette,
  Code2,
  Eye,
  PencilLine,
  ShieldCheck,
  PackageCheck,
  LifeBuoy,
} from "lucide-react";
import type { ProcessStep } from "../types";

export const PROCESS_STEPS: ProcessStep[] = [
  { title: "Initial Enquiry", description: "You contact us by form, WhatsApp or email with a short description of what you need.", icon: MessageSquare },
  { title: "Project Discussion", description: "We talk through your goals, audience and ideas by WhatsApp, email or Google Meet.", icon: Users },
  { title: "Requirements Collection", description: "We gather the details: pages, features, content, design preferences and timeline.", icon: ClipboardList },
  { title: "Proposal and Quotation", description: "You receive a written scope and quotation. Payment milestones and delivery dates are agreed here.", icon: FileText },
  { title: "Project Confirmation", description: "Once you approve the proposal and the agreed milestone is arranged, the project is confirmed.", icon: Handshake },
  { title: "UI/UX Design", description: "We plan the layout and visual style and share the design direction for your feedback.", icon: Palette },
  { title: "Development", description: "We build your website or application with clean, maintainable code and regular progress updates.", icon: Code2 },
  { title: "Client Review", description: "You review the working result and tell us what you would like adjusted.", icon: Eye },
  { title: "Revisions", description: "We apply up to three free revisions within the agreed project scope.", icon: PencilLine },
  { title: "Testing and Deployment", description: "We test on different devices and screen sizes, then deploy the website.", icon: ShieldCheck },
  { title: "Final Delivery", description: "You receive the finished project according to the agreed scope, with handover support.", icon: PackageCheck },
  { title: "Optional Maintenance", description: "If you want ongoing support, we agree a separate maintenance plan.", icon: LifeBuoy },
];
