import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";
import { formatPartners } from "@/lib/i18n/helpers";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

const accessCopy = {
  en: {
    title: "Verified access to funding and scholarships",
    description:
      "We now surface direct-source opportunities for organisations and for academic applicants, designed to reduce dependency on intermediaries and help people apply at the original source.",
    fundingTitle: "Funding routes",
    fundingDescription:
      "Official calls and portals for grassroots groups, civil society organisations, and local initiatives seeking direct access to legitimate funding.",
    scholarshipsTitle: "Scholarship routes",
    scholarshipsDescription:
      "Verified scholarship and education pathways for students, lecturers, researchers, and refugee academics seeking credible opportunities.",
    fundingCta: "Open funding",
    scholarshipsCta: "Open scholarships",
  },
  no: {
    title: "Verifisert tilgang til finansiering og stipender",
    description:
      "Vi samler nå direkte muligheter både for organisasjoner og akademiske søkere, for å redusere avhengigheten av mellomledd og hjelpe folk å søke direkte ved kilden.",
    fundingTitle: "Finansieringsveier",
    fundingDescription:
      "Offisielle utlysninger og portaler for grasrotgrupper, sivilsamfunnsorganisasjoner og lokale initiativer som søker legitim finansiering direkte.",
    scholarshipsTitle: "Stipendveier",
    scholarshipsDescription:
      "Verifiserte stipend og utdanningsveier for studenter, forelesere, forskere og flyktningakademikere som søker troverdige muligheter.",
    fundingCta: "Åpne finansiering",
    scholarshipsCta: "Åpne stipender",
  },
  ar: {
    title: "وصول موثق إلى التمويل والمنح الدراسية",
    description:
      "نقوم الآن بجمع فرص مباشرة للمنظمات وللمتقدمين الأكاديميين بهدف تقليل الاعتماد على الوسطاء ومساعدة الناس على التقديم مباشرة من المصدر الأصلي.",
    fundingTitle: "مسارات التمويل",
    fundingDescription:
      "دعوات وبوابات رسمية للمبادرات المجتمعية ومنظمات المجتمع المدني والمجموعات المحلية التي تبحث عن تمويل شرعي مباشر.",
    scholarshipsTitle: "مسارات المنح الدراسية",
    scholarshipsDescription:
      "منح ومسارات تعليم موثقة للطلاب والمحاضرين والباحثين والأكاديميين من اللاجئين الباحثين عن فرص موثوقة.",
    fundingCta: "افتح التمويل",
    scholarshipsCta: "افتح المنح",
  },
} as const;

export default function HomePage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const partners = formatPartners(locale);
  const accessSection = accessCopy[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media noise-mask min-h-[540px] bg-[linear-gradient(135deg,#0b3657_0%,#134a66_60%,#f2a33a_120%)]">
          <Image
            src={mediaLibrary.heroes.home}
            alt="Dialogue participants in a seminar setting"
            fill
            priority
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.home }}
          />

          <div className="relative flex min-h-[540px] flex-col justify-between p-8 sm:p-12">
            <div className="hero-copy-pill float-ornament">
              {localized.home.heroBadge}
            </div>

            <div className="hero-copy-panel max-w-4xl">
              <Reveal>
                <p className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/95">
                  {localized.home.collaborationLine} {partners}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{localized.home.title}</h1>
              </Reveal>
              {localized.home.description ? (
                <Reveal delay={0.2}>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{localized.home.description}</p>
                </Reveal>
              ) : null}
              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={withLocale(locale, "/dialogues")}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b3a5d] shadow-[0_10px_24px_-16px_rgba(6,39,67,0.95)] transition hover:bg-[#fff5e7]"
                >
                  {localized.home.primaryCta}
                </Link>
                <Link
                  href={withLocale(locale, "/about")}
                  className="rounded-full border border-[#f6bf63]/80 bg-[#f6bf63]/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f6bf63]/30"
                >
                  {localized.home.secondaryCta}
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.home.trustSectionTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{localized.home.trustSectionDescription}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {localized.home.trustPillars.map((pillar, index) => (
            <HoverCard key={pillar.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{pillar.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.home.capabilitiesTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {localized.home.capabilities.map((item, index) => (
            <HoverCard key={item.title} delay={index * 0.07}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.home.examplesTitle}</h2>
          <p className="mt-4 max-w-prose text-base text-text-secondary">{localized.home.examplesDescription}</p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {siteConfig.exampleDialogues.map((video, index) => (
            <HoverCard key={video.href} delay={index * 0.08}>
              <a href={video.href} target="_blank" rel="noreferrer" className="surface-card group block overflow-hidden">
                <div className="relative h-52">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#183740]">
                    <span className="h-2 w-2 rounded-full bg-red-600" aria-hidden />
                    {localized.home.watchOnYoutube}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold text-text-primary">{video.title}</p>
                  <p className="mt-2 text-sm text-text-secondary">{localized.home.exampleCardDescription}</p>
                </div>
              </a>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{accessSection.title}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{accessSection.description}</p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card h-full p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{accessSection.fundingTitle}</p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{accessSection.fundingDescription}</p>
              <Link
                href={withLocale(locale, "/funding")}
                className="mt-6 inline-flex rounded-full bg-[#0b3a5d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d456e]"
              >
                {accessSection.fundingCta}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-card h-full p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">{accessSection.scholarshipsTitle}</p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{accessSection.scholarshipsDescription}</p>
              <Link
                href={withLocale(locale, "/scholarships")}
                className="mt-6 inline-flex rounded-full bg-[#0b3a5d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d456e]"
              >
                {accessSection.scholarshipsCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
              <Image src={mediaLibrary.backgrounds.sections} alt="" fill className="object-cover" sizes="(min-width: 1024px) 1200px, 100vw" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.88)_20%,rgba(255,245,225,0.78)_100%)]" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
              <div>
                <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.home.channelsTitle}</h2>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">{localized.home.channelsDescription}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {siteConfig.socialChannels.map((channel) => (
                    <a
                      key={channel.href}
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#0b3a5d] px-5 py-2 text-sm font-semibold text-[#0b3a5d] transition hover:bg-[#0b3a5d] hover:text-white"
                    >
                      {channel.label}
                    </a>
                  ))}
                  <Link
                    href={withLocale(locale, "/contact")}
                    className="rounded-full bg-[#f2a33a] px-5 py-2 text-sm font-semibold text-[#0f2940] transition hover:bg-[#f8b75b]"
                  >
                    {localized.home.contactCta}
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-[#d8c8ad] bg-[linear-gradient(165deg,#edf5fb_0%,#fff4df_100%)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.home.directContactTitle}</p>
                <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 block text-lg font-semibold text-accent hover:underline">
                  {siteConfig.contactEmail}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{localized.home.directContactDescription}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
