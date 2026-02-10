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
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                Insights
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                Knowledge outputs, not marketing content.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              Insights generated through The Dialogue Platform are written for
              practitioners, researchers, and decision-makers. They are grounded in
              specific dialogues, traceable to the questions that shaped them, and
              explicit about what is known, what is contested, and what requires
              further work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {insightCategories.map((item) => (
              <article
                key={item.title}
                className="card-elevated"
              >
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="card-elevated max-w-5xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Publication approach
            </h2>
            <div className="space-y-5 text-base text-text-secondary leading-relaxed">
              <p>
                As institutional partnerships develop, this space will host working
                notes, synthesis documents, and pattern libraries. The emphasis will
                be on clarity and traceability rather than polished narratives:
                readers should be able to see how insights relate back to specific
                dialogues and institutional contexts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
