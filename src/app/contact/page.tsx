import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The Dialogue Platform",
  description:
    "Contact details for institutions interested in working with The Dialogue Platform."
};

export default function ContactPage() {
  return (
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                Contact
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                A simple, direct channel for institutional enquiries.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              At this stage, The Dialogue Platform is oriented towards
              collaborations with public institutions, research bodies, and
              foundations who are exploring long-term approaches to dialogue and
              public engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="max-w-3xl">
            <div className="card-elevated space-y-6">
              <div className="space-y-4 text-base text-text-secondary leading-relaxed">
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
              </div>
              <div className="border-t border-border/30 pt-6">
                <p className="text-text-primary font-semibold mb-2">Interim contact</p>
                <p className="text-base text-text-secondary">
                  Email:{" "}
                  <a
                    href="mailto:contact@thedialogueplatform.com"
                    className="font-mono text-accent-soft hover:text-accent transition-colors"
                  >
                    contact@thedialogueplatform.com
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 text-sm text-text-muted space-y-2 leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
