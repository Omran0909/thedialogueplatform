import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | The Dialogue Platform",
  description:
    "How The Dialogue Platform structures mandates, dialogues, events, and insights as a coherent system."
};

export default function PlatformPage() {
  return (
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                Platform
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                A systems-oriented architecture for public dialogue.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              The Dialogue Platform models dialogue as a sequence of linked
              elements—mandates, questions, formats, events, and insights—rather
              than a single meeting. Each element carries explicit assumptions and
              responsibilities, so that institutions can reason about where a
              dialogue is strong, where it is fragile, and how it can evolve over
              time.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="card-elevated max-w-5xl">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Working with the platform over time
            </h2>
            <div className="space-y-5 text-base text-text-secondary leading-relaxed">
              <p>
                Institutions typically adopt the platform in phases. Initial work
                focuses on a specific mandate—a neighbourhood planning process, a
                thematic inquiry, a transition strategy—and then extends to adjacent
                domains as teams gain confidence in the methodology. The platform is
                intentionally light on technology and heavy on structure, so that it
                can be adapted to local contexts, facilitation traditions, and
                existing tools.
              </p>
              <p>
                Over successive cycles, a shared language develops around what
                constitutes a well-framed question, a rigorous dialogue process, and
                a credible insight. This is what allows dialogue work to be audited,
                learned from, and handed over between teams without losing context.
              </p>
            </div>
          </div>
        </div>
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
    <article className="card-elevated">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{body}</p>
    </article>
  );
}
