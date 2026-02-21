import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Dialogue events and public convenings that build trust, peace, and shared responsibility.",
};

const eventTypes = [
  {
    title: "Community Trust Forums",
    description: "Structured open dialogues where institutions and residents engage around shared local concerns.",
  },
  {
    title: "Facilitator Practice Labs",
    description: "Capacity-building sessions for teams running dialogue in conflict-sensitive contexts.",
  },
  {
    title: "Institutional Briefings",
    description: "Decision-focused presentations translating dialogue outcomes into practical next steps.",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[#163842]">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2000&q=80"
            alt="Public event with collaborative discussion"
            fill
            className="object-cover"
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">Events</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
                Convenings designed to strengthen relationships and civic confidence.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-3">
          {eventTypes.map((eventType, index) => (
            <HoverCard key={eventType.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h2 className="text-xl text-text-primary">{eventType.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{eventType.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Calendar status</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">
              New event dates are published as partner schedules are confirmed. If your institution wants to host a
              trust-focused dialogue workshop, we can scope it with you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
            >
              Discuss an event
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
