import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/AnimatedBlock";
import { isLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { supportContent } from "@/lib/i18n/support-content";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: {
    locale: string;
  };
};

const brochureHref = "/downloads/The-Dialogue-Platform-Partnership-Brochure.pdf";
const eventImage = "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-panel.jpg";
const partnerImage = "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-audience-02.jpg";

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const copy = supportContent[params.locale];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${params.locale}/support`,
    },
  };
}

export default function SupportPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = supportContent[locale];
  const partnerSubject = encodeURIComponent(
    locale === "ar"
      ? "شراكة مع منصة الحوار"
      : locale === "no"
        ? "Partnerskap med The Dialogue Platform"
        : "Partnership with The Dialogue Platform",
  );

  return (
    <div className="pb-24">
      <section className="overflow-hidden bg-[#082f4c] text-white">
        <div className="mx-auto grid min-h-[620px] max-w-content gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="relative z-10">
            <Reveal>
              <span className="inline-flex rounded-full border border-white bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#082f4c]">
                {copy.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{copy.heroTitle}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{copy.heroDescription}</p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#partner"
                className="rounded-full bg-[#f2a33a] px-6 py-3 text-sm font-semibold text-[#082f4c] transition hover:bg-[#f8b75b]"
              >
                {copy.partnerCta}
              </a>
              <a
                href="#donate"
                className="rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#082f4c]"
              >
                {copy.donateCta}
              </a>
              <a
                href="#brochure"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {copy.brochureCta}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative min-h-[380px] overflow-hidden border border-white/15 lg:min-h-[500px]">
            <Image
              src={eventImage}
              alt="A public dialogue session with participants seated in a circle"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,76,0.04)_35%,rgba(8,47,76,0.82)_100%)]" />
            <p className="absolute bottom-6 left-6 right-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/90">
              {siteConfig.name} · Oslo
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f7f2e8]">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3a5d]">{copy.missionEyebrow}</p>
            <h2 className="mt-5 text-3xl leading-tight text-text-primary sm:text-4xl">{copy.missionTitle}</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{copy.missionDescription}</p>
            <blockquote className="mt-8 border-s-4 border-[#f2a33a] ps-6 font-heading text-2xl leading-snug text-[#0b3a5d] sm:text-3xl">
              “{copy.missionQuote}”
            </blockquote>
          </div>
        </div>
      </section>

      <section id="donate" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3a5d]">{copy.donateEyebrow}</p>
            <h2 className="mt-5 text-3xl text-text-primary sm:text-4xl">{copy.donateTitle}</h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{copy.donateDescription}</p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.donationOptions.map((option, index) => {
              const subject = encodeURIComponent(option.subject);
              return (
                <Reveal key={option.title} delay={index * 0.08}>
                  <article className="flex h-full flex-col border-t-4 border-[#f2a33a] bg-[#f7f2e8] p-6">
                    <p className="text-xs font-semibold text-[#0b3a5d]">0{index + 1}</p>
                    <h3 className="mt-5 text-2xl text-text-primary">{option.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">{option.description}</p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}?subject=${subject}`}
                      className="mt-6 inline-flex w-fit rounded-full bg-[#0b3a5d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d456e]"
                    >
                      {copy.donationButton}
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-text-secondary">{copy.donationNote}</p>
        </div>
      </section>

      <section id="partner" className="scroll-mt-28 bg-[#eaf2f6]">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
          <Reveal className="relative min-h-[380px] overflow-hidden lg:min-h-[560px]">
            <Image
              src={partnerImage}
              alt="Audience members taking part in a Dialogue Platform event"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,76,0.02)_45%,rgba(8,47,76,0.58)_100%)]" />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3a5d]">{copy.partnerEyebrow}</p>
              <h2 className="mt-5 text-3xl leading-tight text-text-primary sm:text-4xl">{copy.partnerTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">{copy.partnerDescription}</p>
            </Reveal>

            <div className="mt-8 border-t border-[#0b3a5d]/20">
              {copy.partnershipPaths.map((path, index) => (
                <Reveal key={path.title} delay={index * 0.06}>
                  <div className="grid gap-3 border-b border-[#0b3a5d]/20 py-5 sm:grid-cols-[48px_1fr]">
                    <span className="text-sm font-semibold text-[#f09a28]">0{index + 1}</span>
                    <div>
                      <h3 className="text-xl text-text-primary">{path.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{path.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${partnerSubject}`}
              className="mt-8 inline-flex rounded-full bg-[#f2a33a] px-6 py-3 text-sm font-semibold text-[#082f4c] transition hover:bg-[#f8b75b]"
            >
              {copy.partnerButton}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#082f4c] text-white">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f2a33a]">{copy.principlesEyebrow}</p>
            <h2 className="mt-5 text-3xl text-white sm:text-4xl">{copy.principlesTitle}</h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-3">
            {copy.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.08}>
                <article className="h-full bg-[#082f4c] p-7">
                  <span className="block h-1.5 w-12 bg-[#f2a33a]" aria-hidden />
                  <h3 className="mt-6 text-2xl text-white">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{principle.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="brochure" className="scroll-mt-28 bg-[#f7f2e8]">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-16 lg:grid-cols-[340px_1fr] lg:items-center lg:py-20">
          <Reveal className="relative mx-auto aspect-[595/842] w-full max-w-[340px] overflow-hidden border border-[#0b3a5d]/20 bg-white shadow-[0_28px_60px_-38px_rgba(8,47,76,0.9)]">
            <Image
              src="/assets/support-brochure-cover.png"
              alt="Cover of The Dialogue Platform partnership and support brochure"
              fill
              className="object-cover"
              sizes="340px"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b3a5d]">{copy.brochureEyebrow}</p>
            <h2 className="mt-5 text-3xl leading-tight text-text-primary sm:text-4xl">{copy.brochureTitle}</h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary">{copy.brochureDescription}</p>
            <a
              href={brochureHref}
              download
              className="mt-8 inline-flex rounded-full bg-[#0b3a5d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d456e]"
            >
              {copy.brochureButton}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-6 py-16 text-center sm:py-20">
          <Reveal>
            <h2 className="text-3xl text-text-primary sm:text-4xl">{copy.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">{copy.finalDescription}</p>
            <Link
              href={withLocale(locale, "/contact")}
              className="mt-8 inline-flex rounded-full bg-[#f2a33a] px-6 py-3 text-sm font-semibold text-[#082f4c] transition hover:bg-[#f8b75b]"
            >
              {copy.contactButton}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
