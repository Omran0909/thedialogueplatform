import Image from "next/image";
import type { Metadata } from "next";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about The Dialogue Platform and our collaboration with Nansen Peace Center and Lillestrom Municipality.",
};

const principles = [
  {
    title: "Dialogue with clear purpose",
    description:
      "Each process is designed with explicit intent, scope, and shared expectations from the start.",
  },
  {
    title: "Inclusion with dignity",
    description:
      "We create conditions where people can participate safely, especially where trust has been damaged.",
  },
  {
    title: "Peace-focused practice",
    description:
      "We prioritize social cohesion, mutual respect, and constructive collaboration across differences.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[360px] bg-[#173c46]">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80"
            alt="Dialogue facilitators working together"
            fill
            className="object-cover"
          />
          <div className="relative flex min-h-[360px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">About</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
                A dialogue platform dedicated to building trust and peace in public life.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <p className="max-w-prose text-base leading-relaxed text-text-secondary">
            The Dialogue Platform exists to help institutions navigate difficult conversations with legitimacy,
            transparency, and care. In collaboration with {siteConfig.partners.join(" and ")}, our focus is to build
            civic trust, support peaceful coexistence, and strengthen the quality of democratic dialogue across
            communities.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <HoverCard key={principle.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h2 className="text-xl text-text-primary">{principle.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">Collaboration partners</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {siteConfig.partners.map((partner, index) => (
            <HoverCard key={partner} delay={index * 0.1}>
              <article className="surface-card h-full p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Partner</p>
                <h3 className="mt-3 text-2xl text-text-primary">{partner}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  This collaboration supports practical, inclusive dialogue work that bridges communities and informs
                  institutional decision-making.
                </p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>
    </div>
  );
}
