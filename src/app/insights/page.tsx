import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | The Dialogue Platform",
  description:
    "Knowledge outputs and patterns emerging from dialogues hosted on The Dialogue Platform."
};

const insightCategories = [
  {
    title: "Patterns and tensions",
    description:
      "Recurring themes and productive disagreements that surface across dialogues, documented in a way that respects context and nuance."
  },
  {
    title: "Institutional questions",
    description:
      "Questions that institutions need to keep open, refine, or revisit as they navigate complex transitions and policy choices."
  },
  {
    title: "Practice notes",
    description:
      "Reflections on facilitation, governance, and design choices that shape the quality and integrity of dialogue processes."
  }
];

export default function InsightsPage() {
  return (
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          Insights
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Knowledge outputs, not marketing content.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          Insights generated through The Dialogue Platform are written for
          practitioners, researchers, and decision-makers. They are grounded in
          specific dialogues, traceable to the questions that shaped them, and
          explicit about what is known, what is contested, and what requires
          further work.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {insightCategories.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 space-y-3"
          >
            <h2 className="text-sm sm:text-base font-semibold text-text-primary">
              {item.title}
            </h2>
            <p className="text-sm text-text-secondary">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-border/70 bg-muted/60 p-5 sm:p-6 max-w-5xl space-y-3">
        <h2 className="text-sm sm:text-base font-semibold text-text-primary">
          Publication approach
        </h2>
        <p className="text-sm text-text-secondary">
          As institutional partnerships develop, this space will host working
          notes, synthesis documents, and pattern libraries. The emphasis will
          be on clarity and traceability rather than polished narratives:
          readers should be able to see how insights relate back to specific
          dialogues and institutional contexts.
        </p>
      </section>
    </main>
  );
}

