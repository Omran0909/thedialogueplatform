import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Dialogue Platform combines systems thinking, facilitation practice, and governance design for complex public dialogues.",
};

const principles = [
  {
    title: "Dialogue with mandate",
    description:
      "Every process starts by defining authority boundaries, decision owners, and the role of participants.",
  },
  {
    title: "Participation with structure",
    description:
      "We design formats that protect quality: clear prompts, purposeful diversity, and transparent synthesis.",
  },
  {
    title: "Learning with accountability",
    description:
      "Insights are tracked against decisions and assumptions so institutions can adapt without losing traceability.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 section-padding">
      <span className="eyebrow">About</span>
      <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
        A strategic practice for institutions that need dialogue to produce real decisions.
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-text-secondary">
        The Dialogue Platform supports organizations operating in complex public environments: city administrations,
        universities, research networks, and civic coalitions. We treat dialogue as institutional infrastructure, not
        one-off consultation. Our work combines systems thinking, facilitation design, and governance practice so each
        engagement is clear, inclusive, and operationally useful.
      </p>

      <section className="section-padding border-t border-line/80 mt-16">
        <h2 className="text-3xl text-text-primary sm:text-4xl">Principles</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map(({ title, description }) => (
            <article key={title} className="surface-card p-6">
              <h3 className="text-xl text-text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <h2 className="text-3xl text-text-primary sm:text-4xl">Who we support</h2>
        <div className="mt-8 surface-card p-8">
          <p className="max-w-prose text-base leading-relaxed text-text-secondary">
            We are typically engaged by institutions navigating contested policy questions, long-term transition
            agendas, cross-sector partnerships, or internal trust gaps. Assignments can range from designing one
            dialogue cycle to building a reusable framework that teams can apply across multiple programmes and years.
          </p>
        </div>
      </section>
    </div>
  );
}
