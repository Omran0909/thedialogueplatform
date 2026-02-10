import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialogues | The Dialogue Platform",
  description:
    "Dialogue formats and outcomes supported by The Dialogue Platform."
};

export default function DialoguesPage() {
  return (
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          Dialogues
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Purpose-built formats for serious public conversations.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          Dialogues in the platform are defined by their purpose, composition,
          and relationship to decision-making. Each format is documented so that
          participants, facilitators, and institutional sponsors share a clear
          understanding of why they are meeting and what can be expected from
          the process.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
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
      </section>

      <section className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 max-w-5xl space-y-4">
        <h2 className="text-sm sm:text-base font-semibold text-text-primary">
          Outcomes and learning
        </h2>
        <p className="text-sm text-text-secondary">
          For each dialogue, the platform specifies expected outputs: decision
          recommendations, tensions to hold open, hypotheses to test, and
          questions that require further work. These are not produced as generic
          summaries; they are structured so that they can be traced back to
          specific sessions and participants while respecting privacy and
          ethical commitments.
        </p>
        <p className="text-sm text-text-secondary">
          This structure allows institutions to compare dialogues across time
          and context, identify recurring themes, and understand where dialogue
          is influencing policy, planning, or program delivery—and where gaps
          remain.
        </p>
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
    <article className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 space-y-3">
      <h2 className="text-sm sm:text-base font-semibold text-text-primary">
        {name}
      </h2>
      <p className="text-sm text-text-secondary">{description}</p>
      <p className="text-xs text-text-muted">{focus}</p>
    </article>
  );
}

