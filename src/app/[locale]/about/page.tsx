import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function AboutPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const localized = getContent(params.locale);

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
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.about.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.about.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <p className="max-w-prose text-base leading-relaxed text-text-secondary">{localized.about.intro}</p>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.about.principlesTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {localized.about.principles.map((principle, index) => (
            <HoverCard key={principle.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.about.partnersTitle}</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {siteConfig.partners.map((partner, index) => (
            <HoverCard key={partner} delay={index * 0.1}>
              <article className="surface-card h-full p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.about.partnerLabel}</p>
                <h3 className="mt-3 text-2xl text-text-primary">{partner}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{localized.about.partnerDescription}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>
    </div>
  );
}
