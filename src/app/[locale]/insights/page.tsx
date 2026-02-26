import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, type Locale, withLocale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

const hubCtaCopy: Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
    cta: string;
  }
> = {
  en: {
    label: "Dialogue Intelligence Hub",
    title: "Ask the AI assistant and follow real-time Sudan updates in one place.",
    description:
      "Use our combined intelligence hub to chat with the assistant and monitor verified, time-ordered Sudan updates with source links.",
    cta: "Open Intelligence Hub",
  },
  no: {
    label: "Dialog Intelligenshub",
    title: "Spør AI-assistenten og følg sanntidsoppdateringer om Sudan på ett sted.",
    description:
      "Bruk vår samlede intelligenshub for å chatte med assistenten og følge verifiserte, tidsordnede oppdateringer om Sudan med kilder.",
    cta: "Åpne Intelligenshub",
  },
  ar: {
    label: "مركز الذكاء الحواري",
    title: "اسأل المساعد الذكي وتابع تحديثات السودان المباشرة في مكان واحد.",
    description:
      "استخدم مركز الذكاء المتكامل للدردشة مع المساعد ومتابعة التحديثات الموثوقة عن السودان مرتبة زمنياً مع روابط المصادر.",
    cta: "فتح مركز الذكاء",
  },
};

export default function InsightsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const hubCta = hubCtaCopy[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_70%,#f2a33a_122%)]">
          <Image
            src={mediaLibrary.heroes.insights}
            alt="Dialogue notes and participant materials"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.insights }}
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

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card bg-[linear-gradient(150deg,#0b3657_0%,#1a5a77_62%,#f2a33a_140%)] p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{hubCta.label}</p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-tight">{hubCta.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90">{hubCta.description}</p>
            <Link
              href={withLocale(locale, "/news")}
              className="mt-6 inline-flex rounded-full border border-white/35 bg-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {hubCta.cta}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
