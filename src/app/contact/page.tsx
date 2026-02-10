import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | The Dialogue Platform",
  description:
    "Contact details for institutions interested in working with The Dialogue Platform."
};

export default function ContactPage() {
  return (
    <main className="space-y-10 max-w-2xl">
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          Contact
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          A simple, direct channel for institutional enquiries.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          At this stage, The Dialogue Platform is oriented towards
          collaborations with public institutions, research bodies, and
          foundations who are exploring long-term approaches to dialogue and
          public engagement.
        </p>
      </section>

      <section className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 space-y-4 text-sm text-text-secondary">
        <p>
          A formal contact form will be introduced once institutional
          partnerships are public. In the interim, enquiries can be directed to
          the project team via email.
        </p>
        <p>
          Please include a brief description of your organisation, the context
          in which you are considering dialogue work, and any time constraints
          or decision points you are working towards.
        </p>
        <div className="border-t border-border/70 pt-4 text-sm">
          <p className="text-text-primary font-medium">Interim contact</p>
          <p className="mt-1 text-text-secondary">
            Email:{" "}
            <span className="font-mono">
              contact@thedialogueplatform.com
            </span>
          </p>
          <p className="mt-2 text-xs text-text-muted">
            You can also connect via your preferred institutional channel once
            integration with platforms such as Vercel and related services is
            configured.
          </p>
        </div>
      </section>

      <section className="text-xs text-text-muted space-y-1">
        <p>
          No mailing lists, marketing funnels, or automated campaigns are in
          place. All correspondence is handled deliberately and in line with the
          ethos of the platform.
        </p>
        <p>
          If you are a researcher or practitioner interested in methodological
          collaboration, you may also reference existing work or publications
          when reaching out.
        </p>
      </section>
    </main>
  );
}

