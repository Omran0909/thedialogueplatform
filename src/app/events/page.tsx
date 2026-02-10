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
    <main className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">
          Events
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          A calendar of assemblies, forums, and working groups.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
          This section will surface upcoming and past activities hosted through
          The Dialogue Platform. It is intentionally sparse at this stage: the
          structure is in place so that events can be added with consistent
          metadata as institutional partners come on board.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {placeholderEvents.map((event) => (
          <article
            key={event.title}
            className="flex flex-col rounded-xl border border-border/70 bg-surface/60 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-text-primary">
                {event.title}
              </h2>
              <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                {event.type}
              </span>
            </div>
            <p className="mt-2 text-xs text-text-muted">{event.meta}</p>
            <p className="mt-3 text-sm text-text-secondary flex-1">
              {event.description}
            </p>
            <p className="mt-4 text-xs text-text-muted">
              Status: <span className="text-text-secondary">{event.status}</span>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

