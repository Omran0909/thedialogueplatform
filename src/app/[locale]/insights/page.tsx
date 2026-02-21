import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function InsightsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const localized = getContent(params.locale);

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
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.insights.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.insights.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-3">
          {localized.insights.insightTypes.map((insight, index) => (
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
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.insights.publicationLabel}</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{localized.insights.publicationDescription}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
