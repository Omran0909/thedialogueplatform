import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Insights generated through The Dialogue Platform, grounded in specific dialogues and linked to decision contexts.",
};

const insightTypes = [
  {
    title: "Dialogue Briefs",
    description:
      "Short, decision-oriented summaries for leaders who need to understand key tensions quickly.",
  },
  {
    title: "Pattern Libraries",
    description:
      "Reusable patterns drawn from recurring institutional challenges across sectors and programmes.",
  },
  {
    title: "Practice Notes",
    description:
      "Method reflections for facilitators, strategists, and policy teams running complex conversations.",
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-content px-6 section-padding">
      <span className="eyebrow">Insights</span>
      <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
        Evidence-led insights for institutions shaping public decisions.
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-text-secondary">
        We publish insights that connect dialogue outputs to the real contexts where decisions are made. Each document
        is explicit about source inputs, contested assumptions, and implications for implementation.
      </p>

      <section className="section-padding border-t border-line/80 mt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {insightTypes.map(({ title, description }) => (
            <article key={title} className="surface-card p-6">
              <h2 className="text-2xl text-text-primary">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="surface-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Publication status</p>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">
            The first public insight set is in production and will be published here with clear references to dialogue
            context, methods, and decision implications.
          </p>
        </div>
      </section>
    </div>
  );
}
