import Image from "next/image";
import type { Metadata } from "next";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";

export const metadata: Metadata = {
  title: "Dialogues",
  description:
    "Structured dialogue formats for trust-building, conflict-sensitive engagement, and better decision-making.",
};

const dialogueFormats = [
  {
    title: "Public Assemblies",
    description:
      "Large-group forums for legitimacy-building, shared understanding, and public trust around complex issues.",
  },
  {
    title: "Targeted Working Groups",
    description:
      "Focused sessions where institutions and stakeholders test options and identify practical pathways.",
  },
  {
    title: "Youth and Community Dialogues",
    description:
      "Inclusive formats designed to engage voices that are often missing from formal decision arenas.",
  },
  {
    title: "Cross-Institution Labs",
    description:
      "Collaborative working spaces that align departments and partners around coordinated action.",
  },
];

export default function DialoguesPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[#163842]">
          <Image
            src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?auto=format&fit=crop&w=2000&q=80"
            alt="Group discussion and facilitation"
            fill
            className="object-cover"
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">Dialogue Formats</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
                Structured dialogues designed for inclusion, trust, and concrete outcomes.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-2">
          {dialogueFormats.map((format, index) => (
            <HoverCard key={format.title} delay={index * 0.07}>
              <article className="surface-card h-full p-6">
                <h2 className="text-2xl text-text-primary">{format.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{format.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <h2 className="text-3xl text-text-primary sm:text-4xl">What participants can expect</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>Clear purpose and boundaries for each session.</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>Facilitation practices that protect respectful disagreement.</span>
              </li>
              <li className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>Transparent documentation linking dialogue insights to institutional action.</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
