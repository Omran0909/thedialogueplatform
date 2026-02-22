import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, withLocale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";
import { formatPartners } from "@/lib/i18n/helpers";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function HomePage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;
  const localized = getContent(locale);
  const partners = formatPartners(locale);

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
            <div className="float-ornament inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {localized.home.heroBadge}
            </div>

            <div className="max-w-3xl">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                  {localized.home.collaborationLine} {partners}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{localized.home.title}</h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{localized.home.description}</p>
              </Reveal>
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
          <div className="surface-card overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
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
