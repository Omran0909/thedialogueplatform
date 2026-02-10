import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | The Dialogue Platform",
  description:
    "A structured view of assemblies, forums, and working groups hosted through The Dialogue Platform."
};

const placeholderEvents = [
  {
    title: "Urban transitions assembly",
    type: "Assembly",
    status: "In design",
    description:
      "A city-wide dialogue process exploring energy, housing, and mobility transitions from the perspective of residents and institutions.",
    meta: "Multi-session | Residents, practitioners, municipal teams"
  },
  {
    title: "Neighbourhood governance laboratory",
    type: "Working group series",
    status: "Planned",
    description:
      "A sequence of working groups examining how neighbourhood-level governance can share responsibility between residents and institutions.",
    meta: "Longitudinal | Mixed institutional and community representation"
  },
  {
    title: "Health and care listening series",
    type: "Listening & inquiry",
    status: "Scoping",
    description:
      "Interviews and small group conversations with residents, frontline workers, and system leaders to inform future assemblies.",
    meta: "Foundational | Lived experience and system navigation"
  }
];

export default function EventsPage() {
  return (
    <main>
      <section className="section-padding border-b border-border/20">
        <div className="page-container">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
                Events
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                A calendar of assemblies, forums, and working groups.
              </h1>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-text-secondary max-w-3xl">
              This section will surface upcoming and past activities hosted through
              The Dialogue Platform. It is intentionally sparse at this stage: the
              structure is in place so that events can be added with consistent
              metadata as institutional partners come on board.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {placeholderEvents.map((event) => (
              <article
                key={event.title}
                className="card-elevated flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-xl font-semibold text-text-primary">
                    {event.title}
                  </h2>
                  <span className="rounded-full border border-border/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-text-muted whitespace-nowrap flex-shrink-0">
                    {event.type}
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-4">{event.meta}</p>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed flex-1 mb-4">
                  {event.description}
                </p>
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-text-muted">
                    Status: <span className="text-text-secondary font-medium">{event.status}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
