import Link from "next/link";

const focusAreas = [
  {
    title: "Mandate Clarity",
    description:
      "Define exactly what each dialogue can influence, decide, and escalate inside your institution.",
  },
  {
    title: "Inclusive Architecture",
    description:
      "Design participant composition and facilitation structures that bring in useful diversity, not noise.",
  },
  {
    title: "Decision Traceability",
    description:
      "Create a transparent chain from dialogue input to concrete decisions, ownership, and follow-through.",
  },
];

const approachSteps = [
  {
    step: "01",
    title: "Diagnostic",
    description:
      "We map decision context, risk, and stakeholder landscape before any convening starts.",
  },
  {
    step: "02",
    title: "Dialogue Design",
    description:
      "We build a fit-for-purpose format mix: assemblies, sessions, interviews, and synthesis loops.",
  },
  {
    step: "03",
    title: "Institutional Integration",
    description:
      "Outputs are translated into clear recommendations, next actions, and governance responsibilities.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-content px-6">
      <section className="section-padding pt-20 sm:pt-24">
        <span className="eyebrow">Public Dialogue Practice</span>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h1 className="max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl lg:text-6xl">
              Building dialogue systems institutions can trust and operationalize.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-text-secondary">
              The Dialogue Platform helps municipalities, universities, and civic institutions turn complex public
              conversations into structured decisions. We combine strategy, facilitation design, and governance
              tooling so dialogue produces durable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dialogues"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
              >
                Explore dialogue formats
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-soft"
              >
                Learn our approach
              </Link>
            </div>
          </div>

          <aside className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
              Why institutions work with us
            </p>
            <ul className="mt-4 space-y-4">
              <li>
                <p className="text-sm font-semibold text-text-primary">Complex decision contexts</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Navigate contested issues without reducing participation to a checkbox exercise.
                </p>
              </li>
              <li>
                <p className="text-sm font-semibold text-text-primary">Cross-functional governance</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Align policy, operations, communications, and leadership around one dialogue architecture.
                </p>
              </li>
              <li>
                <p className="text-sm font-semibold text-text-primary">Evidence-led stewardship</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Document insights, decisions, and assumptions so they can be revisited responsibly.
                </p>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <h2 className="text-3xl text-text-primary sm:text-4xl">Core capabilities</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {focusAreas.map(({ title, description }) => (
            <article key={title} className="surface-card p-6">
              <h3 className="text-xl text-text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80 pb-24">
        <h2 className="text-3xl text-text-primary sm:text-4xl">How an engagement progresses</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {approachSteps.map(({ step, title, description }) => (
            <article key={title} className="surface-card p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent">{step}</p>
              <h3 className="mt-4 text-xl text-text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </div>

        <div className="surface-card mt-10 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <p className="text-xl text-text-primary">Planning your next institutional dialogue cycle?</p>
            <p className="mt-2 text-sm text-text-secondary">
              We can scope a pilot, governance model, or full multi-phase programme.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
