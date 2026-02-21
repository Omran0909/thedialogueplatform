import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialogues",
  description:
    "Structured dialogue formats including assemblies, working groups, interviews, and synthesis forums.",
};

const dialogueFormats = [
  {
    title: "Public Assemblies",
    description:
      "Broad-group forums for agenda setting, value tensions, and legitimacy-building around strategic questions.",
  },
  {
    title: "Targeted Working Groups",
    description:
      "Smaller sessions that test options, map implementation constraints, and stress-test policy pathways.",
  },
  {
    title: "Stakeholder Interviews",
    description:
      "Structured one-to-one or micro-group conversations to surface hidden dependencies and practical risk.",
  },
  {
    title: "Cross-Institution Labs",
    description:
      "Joint workshops that align departments, partners, and external actors around shared operating assumptions.",
  },
];

const outcomes = [
  "Mandate map with defined authority and escalation points",
  "Participant architecture with rationale and representation choices",
  "Decision-ready synthesis linked to policy, programme, or operational action",
];

export default function DialoguesPage() {
  return (
    <div className="mx-auto max-w-content px-6 section-padding">
      <span className="eyebrow">Dialogue Formats</span>
      <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
        Structured formats designed around decision value, not event volume.
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-text-secondary">
        Each dialogue format is selected for a specific institutional purpose. We define what each session should
        produce, how it connects to governance, and who is accountable for next-step decisions.
      </p>

      <section className="section-padding border-t border-line/80 mt-16">
        <div className="grid gap-4 md:grid-cols-2">
          {dialogueFormats.map(({ title, description }) => (
            <article key={title} className="surface-card p-6">
              <h2 className="text-2xl text-text-primary">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <h2 className="text-3xl text-text-primary sm:text-4xl">Typical engagement outcomes</h2>
        <div className="surface-card mt-8 p-8">
          <ul className="space-y-4">
            {outcomes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
