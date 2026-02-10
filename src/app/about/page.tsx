import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Dialogue Platform",
  description:
    "Background and purpose of The Dialogue Platform as an institutional infrastructure for structured public dialogue."
};

export default function AboutPage() {
  return (
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          About
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Treating dialogue as a deliberate, long-term capability.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          The Dialogue Platform was developed for institutions that are
          accountable to complex publics: city governments, universities,
          independent research centres, and multi-stakeholder coalitions. It is
          grounded in the belief that dialogue is not a single event or a
          generic consultation, but a structured practice that shapes how
          problems are defined, how options are surfaced, and how commitments
          are made.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-5 text-sm sm:text-base text-text-secondary max-w-3xl">
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

        <aside className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 text-xs sm:text-sm text-text-secondary space-y-3">
          <h2 className="text-sm font-semibold text-text-primary">
            Design principles
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium text-text-secondary">
                Systems orientation:
              </span>{" "}
              dialogues are located within wider social, political, and
              ecological systems, not treated in isolation.
            </li>
            <li>
              <span className="font-medium text-text-secondary">
                Institutional realism:
              </span>{" "}
              constraints, trade-offs, and decision pathways are made explicit
              rather than hidden.
            </li>
            <li>
              <span className="font-medium text-text-secondary">
                Learning over time:
              </span>{" "}
              insights accumulate across cycles of dialogue, instead of being
              lost after each event.
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

