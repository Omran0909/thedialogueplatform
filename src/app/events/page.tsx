import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past dialogue events, workshops, and convenings hosted by The Dialogue Platform and partner institutions.",
};

const whatToExpect = [
  "Public workshops co-designed with institutional partners",
  "Practice labs for facilitation teams and programme leads",
  "Briefings that translate dialogue outputs into implementation actions",
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-content px-6 section-padding">
      <span className="eyebrow">Events</span>
      <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
        Convenings designed for institutional learning and coordinated action.
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-text-secondary">
        Our events are built with partner institutions to test dialogue methods, build shared language, and accelerate
        decision quality. A public calendar will be published as upcoming sessions are confirmed.
      </p>

      <section className="section-padding border-t border-line/80 mt-16">
        <h2 className="text-3xl text-text-primary sm:text-4xl">What to expect</h2>
        <div className="surface-card mt-8 p-8">
          <ul className="space-y-4">
            {whatToExpect.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="surface-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Calendar status</p>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Event listings will appear here once partner timelines are finalized. If your institution wants to host a
            workshop or co-design a dialogue session, you can use the contact page to share initial context.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
          >
            Discuss an event
          </Link>
        </div>
      </section>
    </div>
  );
}
