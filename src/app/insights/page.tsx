import Image from "next/image";
import type { Metadata } from "next";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Dialogue insights focused on trust-building, social cohesion, and institutional accountability.",
};

const insightTypes = [
  {
    title: "Dialogue Briefs",
    description:
      "Short synthesis briefs that help leaders understand major themes, tensions, and opportunities quickly.",
  },
  {
    title: "Trust and Peace Notes",
    description:
      "Reflections on what helps communities move from conflict and mistrust toward constructive engagement.",
  },
  {
    title: "Practice Playbooks",
    description:
      "Reusable process guides for institutions working with complex and sensitive public conversations.",
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[#183d49]">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
            alt="Research and dialogue insights workspace"
            fill
            className="object-cover"
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">Insights</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
                Practical knowledge for institutions working to build trust through dialogue.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-3">
          {insightTypes.map((insight, index) => (
            <HoverCard key={insight.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h2 className="text-xl text-text-primary">{insight.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{insight.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Publication status</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">
              Current insight publications are being prepared with transparent references to dialogue contexts,
              participants, and decision implications.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
