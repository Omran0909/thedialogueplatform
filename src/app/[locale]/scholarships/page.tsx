import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/AnimatedBlock";
import { OpportunityFeed } from "@/components/OpportunityFeed";
import { isLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { mediaLibrary } from "@/lib/media";
import { getScholarshipOpportunities, opportunitiesSnapshotAt } from "@/lib/opportunities";
import { getScholarshipsPageCopy } from "@/lib/opportunity-page-copy";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function ScholarshipsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = getScholarshipsPageCopy(locale);
  const items = getScholarshipOpportunities(locale);

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[380px] bg-[linear-gradient(145deg,#0b3657_0%,#1c5774_72%,#f2a33a_125%)]">
          <Image
            src={mediaLibrary.heroes.scholarships}
            alt="Verified scholarships and academic pathways"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.scholarships }}
          />
          <div className="relative flex min-h-[380px] flex-col justify-end p-8 sm:p-10">
            <div className="hero-copy-panel max-w-3xl">
              <Reveal>
                <span className="eyebrow hero-copy-eyebrow">{copy.badge}</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{copy.title}</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">{copy.description}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <OpportunityFeed
        locale={locale}
        items={items}
        snapshotAt={opportunitiesSnapshotAt}
        copy={copy.feed}
        livePath={`/api/opportunities/scholarships?locale=${locale}`}
      />

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{copy.supportTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.supportCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card bg-[linear-gradient(150deg,#0b3657_0%,#1a5a77_62%,#f2a33a_140%)] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">{copy.crossLink.title}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88">{copy.crossLink.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={withLocale(locale, copy.crossLink.href)}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0b3657] transition hover:bg-[#fff5e7]"
              >
                {copy.crossLink.cta}
              </Link>
              <Link
                href={withLocale(locale, "/contact")}
                className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {locale === "ar" ? "تواصل معنا" : locale === "no" ? "Kontakt oss" : "Contact us"}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
