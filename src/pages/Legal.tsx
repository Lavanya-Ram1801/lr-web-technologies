import type { ReactNode } from "react";
import PageHero from "../components/ui/PageHero";
import { SITE } from "../data/site";
import { useSeo } from "../lib/useSeo";

const UPDATED = "November 2026";

function Page({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <section className="section">
        <div className="container-x max-w-3xl space-y-8 leading-relaxed text-soft [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-6">
          <p className="text-sm">Last updated: {UPDATED}</p>
          {children}
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  useSeo("Privacy Policy", "How L&R Web Technologies collects, uses and protects the information you share through this website.");
  return (
    <Page title="Privacy Policy" intro="How we handle the information you share with us through this website.">
      <section>
        <h2>1. Who we are</h2>
        <p>
          This website is operated by {SITE.name}. You can contact us at{" "}
          <a className="text-brand underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          about any privacy question.
        </p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <ul>
          <li>
            <strong className="text-ink">Enquiry form:</strong> your name, email address, WhatsApp number, company name
            (optional), service required, project description, budget range and preferred communication method.
          </li>
          <li>
            <strong className="text-ink">Tools:</strong> the cost estimator and project brief generator run in your
            browser. Their content is only sent to us if you choose to submit it through the contact form or WhatsApp.
          </li>
          <li>
            <strong className="text-ink">Preferences:</strong> your chosen theme and currency are stored in your
            browser&apos;s local storage so the site remembers them. This is not shared with us.
          </li>
        </ul>
      </section>
      <section>
        <h2>3. How we use your information</h2>
        <p>
          We use your information to respond to your enquiry, discuss and quote your project, and communicate with you
          through your preferred method. We do not sell your information.
        </p>
      </section>
      <section>
        <h2>4. Who can see it</h2>
        <p>
          Enquiries are delivered to our business email and stored securely on our server so they are not lost. They are
          accessible only to the people at {SITE.name} who need them to respond to you. Our email provider processes
          messages on our behalf.
        </p>
      </section>
      <section>
        <h2>5. Third-party services</h2>
        <ul>
          <li>Google Fonts is used to load typefaces.</li>
          <li>A free exchange-rate service may be contacted by your browser to show approximate converted prices.</li>
          <li>
            WhatsApp, Instagram, GitHub and Vercel links open third-party sites with their own privacy policies.
          </li>
        </ul>
      </section>
      <section>
        <h2>6. Retention and your rights</h2>
        <p>
          We keep enquiry details only as long as needed to handle your enquiry and any resulting project. You may ask
          us to access, correct or delete your information by emailing {SITE.email}.
        </p>
      </section>
      <section>
        <h2>7. Changes</h2>
        <p>We may update this policy from time to time. The date above shows the latest revision.</p>
      </section>
    </Page>
  );
}

export function Terms() {
  useSeo("Terms and Conditions", "The terms that apply to enquiries, quotations, payments, revisions and projects with L&R Web Technologies.");
  return (
    <Page title="Terms and Conditions" intro="The general terms that apply when you enquire about or work with us.">
      <section>
        <h2>1. About these terms</h2>
        <p>
          These terms apply to your use of this website and to enquiries and projects with {SITE.name}. Each project
          is also governed by the written proposal and quotation agreed with you.
        </p>
      </section>
      <section>
        <h2>2. Prices and quotations</h2>
        <p>
          Prices on this website, and results from the cost estimator, are indicative and provisional. They are not
          confirmed quotations. The final price depends on project scope and complexity and is confirmed in writing
          before development begins. Prices shown in other currencies are approximate conversions.
        </p>
      </section>
      <section>
        <h2>3. Additional costs</h2>
        <p>{SITE.pricingDisclaimer}</p>
      </section>
      <section>
        <h2>4. Payment</h2>
        <p>
          Payment milestones and delivery dates are agreed before development begins. Payments are coordinated manually
          using the methods we agree with you. We never publish payment account details on this website.
        </p>
      </section>
      <section>
        <h2>5. Scope and revisions</h2>
        <p>
          Each project includes {SITE.freeRevisions} free revisions, subject to the agreed project scope. Requests that
          go beyond the agreed scope are discussed and quoted separately. We do not offer unlimited revisions or
          unlimited work.
        </p>
      </section>
      <section>
        <h2>6. Client responsibilities</h2>
        <ul>
          <li>Provide content, images and feedback in good time.</li>
          <li>Make sure you have the right to use any material you supply to us.</li>
          <li>Pay for your own domain, hosting and third-party services.</li>
        </ul>
      </section>
      <section>
        <h2>7. Third-party services</h2>
        <p>
          Projects may rely on third-party services (for example hosting, payment providers or AI providers). Their
          availability, pricing and terms are outside our control and are charged separately.
        </p>
      </section>
      <section>
        <h2>8. Portfolio projects</h2>
        <p>
          Projects shown on this website are our own in-house demonstration projects and are not paid client projects.
        </p>
      </section>
      <section>
        <h2>9. Maintenance</h2>
        <p>Ongoing maintenance is optional and provided only under a separately agreed plan.</p>
      </section>
      <section>
        <h2>10. Limitation of liability</h2>
        <p>
          We work carefully to deliver reliable results, but we cannot guarantee uninterrupted or error-free operation
          of websites that depend on third-party services. To the extent permitted by law, our liability is limited to
          the amount paid for the relevant project.
        </p>
      </section>
      <section>
        <h2>11. Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a className="text-brand underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </Page>
  );
}
