import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-32">
        <h1 className="text-5xl sm:text-6xl font-normal text-text-primary leading-tight mb-6">
          Designing public dialogue as a governance and learning system.
        </h1>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl">
          The Dialogue Platform is an institutional infrastructure for municipalities, universities, and public organisations that need to convene complex conversations, generate shared understanding, and translate dialogue into durable decisions and stewardship.
        </p>
        <Link
          href="/about"
          className="text-accent text-sm hover:underline inline-block"
        >
          Learn about the platform
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-8 py-24 border-t border-white/5">
        <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
          The platform treats dialogue as a structured, intentional practice rather than a single event. It provides a shared language for clarifying mandates, surfacing assumptions, and articulating the boundaries of what a given dialogue can and cannot decide. Rather than optimising for participation metrics alone, the platform focuses on the quality of questions, the diversity of perspectives invited, and the traceability between dialogue inputs and institutional decisions.
        </p>
      </section>
    </>
  );
}
