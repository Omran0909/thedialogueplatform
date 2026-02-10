import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto px-6">
      <section className="pt-32 pb-24">
        <h1 className="text-5xl sm:text-6xl font-normal text-text-primary leading-[1.1] mb-8">
          Designing public dialogue as a governance and learning system.
        </h1>
        <p className="text-lg text-text-secondary mb-10 max-w-[600px]">
          The Dialogue Platform is an institutional infrastructure for municipalities, universities, and public organisations that need to convene complex conversations, generate shared understanding, and translate dialogue into durable decisions and stewardship.
        </p>
        <Link
          href="/about"
          className="text-accent text-sm hover:underline"
        >
          Learn about the platform
        </Link>
      </section>

      <section className="pt-24 pb-32 border-t border-white/5">
        <p className="text-base text-text-secondary leading-relaxed max-w-[600px]">
          The platform treats dialogue as a structured, intentional practice rather than a single event. It provides a shared language for clarifying mandates, surfacing assumptions, and articulating the boundaries of what a given dialogue can and cannot decide. Rather than optimising for participation metrics alone, the platform focuses on the quality of questions, the diversity of perspectives invited, and the traceability between dialogue inputs and institutional decisions.
        </p>
      </section>
    </div>
  );
}
