import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | The Dialogue Platform",
  description:
    "Upcoming and past dialogue events, workshops, and convenings hosted by The Dialogue Platform and partner institutions.",
};

export default function EventsPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-32">
      <h1 className="text-4xl sm:text-5xl font-normal text-text-primary leading-[1.1] mb-10">
        Events
      </h1>
      <p className="text-base text-text-secondary leading-relaxed max-w-[600px] mb-16">
        The Dialogue Platform convenes workshops, assemblies, and working sessions with institutional partners. Events are designed to surface shared questions, test formats, and build capacity for sustained dialogue practice. As partnerships develop, this space will list upcoming convenings and archive past sessions with summaries and outputs.
      </p>

      <div className="border border-white/10 rounded-lg p-8 bg-white/[0.02]">
        <p className="text-text-secondary text-sm mb-2">Coming soon</p>
        <p className="text-text-primary text-base">
          Event listings will appear here as institutional partnerships are confirmed. For early access or to propose a convening, please{" "}
          <Link href="/contact" className="text-accent hover:underline">
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
