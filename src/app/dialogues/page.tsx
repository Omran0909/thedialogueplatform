import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialogues | The Dialogue Platform",
  description:
    "Dialogue formats and outcomes supported by The Dialogue Platform."
};

export default function DialoguesPage() {
  return (
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                Dialogues
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                Purpose-built formats for serious public conversations.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              Dialogues in the platform are defined by their purpose, composition,
              and relationship to decision-making. Each format is documented so that
              participants, facilitators, and institutional sponsors share a clear
              understanding of why they are meeting and what can be expected from
              the process.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-3">
            <DialogueFormat
              name="Assemblies"
              description="Time-bound gatherings that bring together a diverse cross-section of residents or stakeholders to interrogate a clearly framed question."
              focus="Used when institutions need a wide range of perspectives and a public record of how issues were discussed."
            />
            <DialogueFormat
              name="Working groups"
              description="Smaller, recurring groups that carry responsibility for exploring options, drafting proposals, and testing ideas emerging from broader dialogues."
              focus="Used when issues require technical, organisational, or place-based expertise over multiple sessions."
            />
            <DialogueFormat
              name="Listening and inquiry"
              description="Interviews, small group conversations, and field visits that surface lived experience and institutional reality."
              focus="Used to inform the design of larger dialogues and to understand how policies and programs are experienced on the ground."
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="card-elevated max-w-5xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Outcomes and learning
            </h2>
            <div className="space-y-5 text-base text-text-secondary leading-relaxed">
              <p>
                For each dialogue, the platform specifies expected outputs: decision
                recommendations, tensions to hold open, hypotheses to test, and
                questions that require further work. These are not produced as generic
                summaries; they are structured so that they can be traced back to
                specific sessions and participants while respecting privacy and
                ethical commitments.
              </p>
              <p>
                This structure allows institutions to compare dialogues across time
                and context, identify recurring themes, and understand where dialogue
                is influencing policy, planning, or program delivery—and where gaps
                remain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface DialogueFormatProps {
  name: string;
  description: string;
  focus: string;
}

function DialogueFormat({ name, description, focus }: DialogueFormatProps) {
  return (
    <article className="card-elevated">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        {name}
      </h2>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">{description}</p>
      <p className="text-xs text-text-muted leading-relaxed border-l-2 border-accent-soft/30 pl-3">{focus}</p>
    </article>
  );
}
