import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Dialogue Platform",
  description:
    "Background and purpose of The Dialogue Platform as an institutional infrastructure for structured public dialogue."
};

export default function AboutPage() {
  return (
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                About
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                Treating dialogue as a deliberate, long-term capability.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              The Dialogue Platform was developed for institutions that are
              accountable to complex publics: city governments, universities,
              independent research centres, and multi-stakeholder coalitions. It is
              grounded in the belief that dialogue is not a single event or a
              generic consultation, but a structured practice that shapes how
              problems are defined, how options are surfaced, and how commitments
              are made.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="space-y-6 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed">
              <p>
                The platform brings together methods from systems thinking, dialogue
                theory, and institutional design. It provides a shared language for
                clarifying mandates, surfacing assumptions, and articulating the
                boundaries of what a given dialogue can and cannot decide.
              </p>
              <p>
                Rather than optimising for participation metrics alone, the platform
                focuses on the quality of questions, the diversity of perspectives
                invited, and the traceability between dialogue inputs and
                institutional decisions. This allows teams to move beyond ad-hoc
                engagement towards a more rigorous, cumulative practice.
              </p>
              <p>
                The Dialogue Platform is explicitly non-partisan. It is concerned
                with the conditions under which dialogue can be meaningful:
                transparent constraints, clearly framed issues, and the ability for
                participants to see how their contributions are interpreted and
                carried forward.
              </p>
            </div>

            <aside className="card-elevated">
              <h2 className="text-lg font-semibold text-text-primary mb-6">
                Design principles
              </h2>
              <ul className="space-y-5 text-sm leading-relaxed">
                <li>
                  <span className="font-semibold text-text-primary block mb-1">
                    Systems orientation
                  </span>
                  <span className="text-text-secondary">
                    Dialogues are located within wider social, political, and
                    ecological systems, not treated in isolation.
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-text-primary block mb-1">
                    Institutional realism
                  </span>
                  <span className="text-text-secondary">
                    Constraints, trade-offs, and decision pathways are made explicit
                    rather than hidden.
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-text-primary block mb-1">
                    Learning over time
                  </span>
                  <span className="text-text-secondary">
                    Insights accumulate across cycles of dialogue, instead of being
                    lost after each event.
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
