import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | The Dialogue Platform",
  description:
    "How The Dialogue Platform structures mandates, dialogues, events, and insights as a coherent system."
};

export default function PlatformPage() {
  return (
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          Platform
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          A systems-oriented architecture for public dialogue.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          The Dialogue Platform models dialogue as a sequence of linked
          elements—mandates, questions, formats, events, and insights—rather
          than a single meeting. Each element carries explicit assumptions and
          responsibilities, so that institutions can reason about where a
          dialogue is strong, where it is fragile, and how it can evolve over
          time.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <PlatformBlock
          title="Mandates and frames"
          body="Every dialogue begins with a mandate: what is at stake, who is responsible, and what kinds of outcomes are possible. The platform captures this as structured data, making constraints and expectations visible to all participants."
        />
        <PlatformBlock
          title="Formats and sequences"
          body="Dialogues are designed as sequences of sessions, not stand-alone events. The platform supports assemblies, working groups, interviews, and online sessions as coherent parts of a single architecture."
        />
        <PlatformBlock
          title="Insights and stewardship"
          body="Outputs are not just reports or minutes. They are structured insights—patterns, tensions, and hypotheses—that can be revisited, contested, and connected to policy and program work."
        />
      </section>

      <section className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 space-y-4 max-w-5xl">
        <h2 className="text-sm sm:text-base font-semibold text-text-primary">
          Working with the platform over time
        </h2>
        <p className="text-sm text-text-secondary">
          Institutions typically adopt the platform in phases. Initial work
          focuses on a specific mandate—a neighbourhood planning process, a
          thematic inquiry, a transition strategy—and then extends to adjacent
          domains as teams gain confidence in the methodology. The platform is
          intentionally light on technology and heavy on structure, so that it
          can be adapted to local contexts, facilitation traditions, and
          existing tools.
        </p>
        <p className="text-sm text-text-secondary">
          Over successive cycles, a shared language develops around what
          constitutes a well-framed question, a rigorous dialogue process, and
          a credible insight. This is what allows dialogue work to be audited,
          learned from, and handed over between teams without losing context.
        </p>
      </section>
    </main>
  );
}

interface PlatformBlockProps {
  title: string;
  body: string;
}

function PlatformBlock({ title, body }: PlatformBlockProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6 space-y-3">
      <h2 className="text-sm sm:text-base font-semibold text-text-primary">
        {title}
      </h2>
      <p className="text-sm text-text-secondary">{body}</p>
    </article>
  );
}

